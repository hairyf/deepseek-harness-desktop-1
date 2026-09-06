import type { ClientContext } from 'dsh-tauri/client'
import type { PetStatus, SessionLiveActivity } from '../types'
import { createLifecycleController } from 'dsh-tauri/client'
import { PET_ACTIVITY_THROTTLE_MS, PET_SESSION_UPDATE_THROTTLE_MS } from '../constants'
import { beginPetStatusFetch, commitPetStatusFetch, getPetUiSnapshot, subscribePetUi } from '../store'
import { foldSessionActivity } from '../utils/activity'
import { deepEqual, projectPetPayload } from '../utils/projection'
import { toTransferable } from '../utils/transferable'
import { fetchPetStatus, pushPetSession } from './pet'

type SessionAction = 'create' | 'update' | 'remove'

/**
 * rc.2+ 会话 binding 附带的事件窗口（MutableSessionEventSource，service.js 组装
 * binding 时挂在 eventSource 字段）；alpha 运行时缺失，必须探测使用。
 */
interface RawSessionEventSource {
  getSnapshot: () => { entries: readonly unknown[] }
  subscribe: (listener: () => void) => () => void
}

interface RawSessionBinding {
  sessionId: string
  eventSource?: RawSessionEventSource
  session: {
    getSnapshot: () => unknown
    subscribe: (listener: () => void) => () => void
    open?: () => Promise<unknown>
  }
}

interface RawSessions {
  list: {
    getSnapshot: () => {
      byId?: Record<string, Record<string, unknown>>
      ids: readonly string[]
    }
    subscribe: (listener: () => void) => () => void
  }
  binding: (id: string) => RawSessionBinding | undefined
}

/** 每个已绑定会话的观察状态：订阅清理 + 折叠出的实时活动 + 节流定时器 + 变化检测缓存。 */
interface SessionWatch {
  disposers: Array<() => void>
  /** 事件窗口折叠结果；undefined 表示该会话无事件窗口（alpha），null 表示当前无活动 */
  activity?: SessionLiveActivity | null
  activityTimer?: ReturnType<typeof setTimeout>
  /** 上次已推送的投影载荷（用于深比较去重，避免无变化空转发）。 */
  lastPayload?: Record<string, unknown>
  /** 上次计算载荷时的输入引用（summary / snapshot / activity）。引用不变 ⇒ 载荷必不变。 */
  lastInput?: {
    summary?: Record<string, unknown>
    snapshot: unknown
    activity?: SessionLiveActivity | null
  }
}

/**
 * 把 DSH 会话原始快照投影后按建议推送给桌宠窗口，不做宠物专用 projection，但做三件事收敛：
 *  - 门控：仅宠物启用（PetStatus.enabled）时才转发，窗口隐藏与否不改变转发；
 *  - 变化检测：summary/snapshot/activity 引用不变则跳过；投影经白名单 + 深比较后才推送；
 *  - 合并背压：会话订阅事件进共享节流队列，一次突发只批量 flush 一帧，避免 250ms 高频空转发。
 * rc.2+ 会话额外订阅事件窗口（binding.eventSource）：流式 delta 逐 token 触发，按会话做
 * trailing 节流，到期时按当前窗口重算实时活动（进行中的工具调用 / 思考流）并以
 * liveActivity 字段并入快照；alpha 缺失事件窗口时退级为纯快照转发。
 */
export function registerPetSessionForwarder(ctx: ClientContext): void {
  ctx.effect(() => {
    const controller = createLifecycleController()
    const watches = new Map<string, SessionWatch>()
    const known = new Set<string>()
    // 门控：只读共享 store 里的 enabled（store 未初始化时保守关闭，转发停止而不是误发）。
    let enabled = getPetUiSnapshot().status?.enabled ?? false
    const pendingUpdates = new Set<string>()
    let flushCancel: (() => void) | undefined
    let disposed = false

    function emit(action: SessionAction, session: Record<string, unknown>): void {
      if (disposed)
        return
      const payload = toTransferable(session) as Record<string, unknown>
      void pushPetSession(action, payload).catch((error) => {
        if (!disposed)
          console.error(`[dsh-tauri-pet] session ${action} push failed:`, error)
      })
    }

    const sessions = ctx.sessions as unknown as RawSessions

    /** 合并 list summary 与 binding 快照，并按需附带 liveActivity。 */
    function mergeSnapshot(
      binding: RawSessionBinding,
      summary: Record<string, unknown> | undefined,
      snapshot: unknown,
      activity: SessionLiveActivity | null | undefined,
    ): Record<string, unknown> {
      const value = snapshot && typeof snapshot === 'object'
        ? snapshot as Record<string, unknown>
        : { value: snapshot }
      const merged: Record<string, unknown> = { id: binding.sessionId, ...(summary ?? {}), ...value }
      // 仅在探测到事件窗口的会话上附带 liveActivity；null 也是有效值（清除过期活动展示）
      if (activity !== undefined)
        merged.liveActivity = activity
      return merged
    }

    /**
     * 变化检测转发：输入引用不变 ⇒ 载荷必不变，直接跳过（免 toTransferable/深比较）；
     * 引用变了 ⇒ 投影到白名单并深比较，投影结果一致（如仅非白名单字段变化）则只更新签名
     * 不转发，真正变化才 pushPetSession。
     */
    function emitIfChanged(id: string, binding: RawSessionBinding, action: SessionAction): void {
      if (disposed || !enabled)
        return
      const watch = watches.get(id)
      if (watch === undefined)
        return
      const list = sessions.list.getSnapshot()
      const summary = list.byId?.[id]
      const snapshot = binding.session.getSnapshot()
      const activity = watch.activity
      if (watch.lastInput !== undefined
        && watch.lastInput.summary === summary
        && watch.lastInput.snapshot === snapshot
        && watch.lastInput.activity === activity) {
        return
      }
      const merged = mergeSnapshot(binding, summary, snapshot, activity)
      const projected = projectPetPayload(merged)
      const payload = toTransferable(projected) as Record<string, unknown>
      if (watch.lastPayload !== undefined && deepEqual(payload, watch.lastPayload)) {
        watch.lastInput = { summary, snapshot, activity }
        return
      }
      watch.lastPayload = payload
      watch.lastInput = { summary, snapshot, activity }
      emit(action, payload)
    }

    /** 订阅事件窗口：这里只做 trailing 节流，到期时按当前窗口整体重算一次，一次突发只推送一帧。 */
    function attachEventSource(id: string, binding: RawSessionBinding, watch: SessionWatch): void {
      const source = binding.eventSource
      if (source === undefined || typeof source.getSnapshot !== 'function' || typeof source.subscribe !== 'function')
        return
      // 绑定即折叠一次，create 帧就携带已运行会话的实时活动
      const initial = source.getSnapshot()
      watch.activity = foldSessionActivity(initial.entries)
      watch.disposers.push(source.subscribe(() => {
        if (disposed || watches.get(id) !== watch || watch.activityTimer !== undefined)
          return
        watch.activityTimer = globalThis.setTimeout(() => {
          watch.activityTimer = undefined
          const current = source.getSnapshot()
          watch.activity = foldSessionActivity(current.entries)
          emitIfChanged(id, binding, 'update')
        }, PET_ACTIVITY_THROTTLE_MS)
      }))
      // dsh 只在会话被选中（open）时才建立事件流；子代理等未选中会话的
      // 窗口保持空窗，折叠恒为 null。主动打开会话流（幂等，UI 已开的会话
      // 直接返回），让任何选中状态下的事件都能进入窗口并触发上面的订阅。
      if (typeof binding.session.open === 'function') {
        void binding.session.open().catch((error: unknown) => {
          if (!disposed)
            console.warn(`[dsh-tauri-pet] open event stream for ${id} failed:`, error)
        })
      }
      watch.disposers.push(() => {
        if (watch.activityTimer !== undefined) {
          globalThis.clearTimeout(watch.activityTimer)
          watch.activityTimer = undefined
        }
      })
    }

    function bind(id: string, action: SessionAction): void {
      const binding = sessions.binding(id)
      if (binding === undefined) {
        emit(action, { id })
        return
      }
      const watch: SessionWatch = { disposers: [] }
      watches.set(id, watch)
      attachEventSource(id, binding, watch)
      emitIfChanged(id, binding, action)
      watch.disposers.push(binding.session.subscribe(() => scheduleUpdate(id)))
    }

    function unbind(id: string): void {
      const watch = watches.get(id)
      if (watch === undefined)
        return
      for (const dispose of watch.disposers)
        dispose()
      watches.delete(id)
    }

    /** 会话订阅事件合并：进 pending 队列，由共享节流定时器一次批量 flush。 */
    function scheduleUpdate(id: string): void {
      if (disposed || !enabled)
        return
      pendingUpdates.add(id)
      if (flushCancel !== undefined)
        return
      flushCancel = controller.timeout(() => {
        flushCancel = undefined
        for (const pendingId of pendingUpdates) {
          const binding = sessions.binding(pendingId)
          const watch = watches.get(pendingId)
          if (binding !== undefined && watch !== undefined)
            emitIfChanged(pendingId, binding, 'update')
          pendingUpdates.delete(pendingId)
        }
      }, PET_SESSION_UPDATE_THROTTLE_MS)
    }

    function applyEnabled(next: boolean): void {
      if (next === enabled)
        return
      enabled = next
      pendingUpdates.clear()
      if (enabled) {
        // 重新启用：对当前全部会话补发 create，桌宠窗口重建状态
        sync()
      }
      else {
        // 关闭宠物：对每个已知会话（含无 binding 仅发过 {id} 的）补发 remove，清空桌宠窗口展示，再释放观察者
        for (const id of [...known]) {
          if (watches.has(id))
            unbind(id)
          emit('remove', { id })
        }
        known.clear()
      }
    }

    function sync(): void {
      // 宠物未启用时不重建观察者、不转发任何会话状态（避免高频空转发）
      if (disposed || !enabled)
        return
      const list = sessions.list.getSnapshot()
      const ids = new Set(list.ids)
      for (const id of known) {
        if (!ids.has(id)) {
          unbind(id)
          emit('remove', { id })
        }
      }
      for (const id of ids) {
        const binding = sessions.binding(id)
        if (binding === undefined) {
          if (!known.has(id))
            bind(id, 'create')
          continue
        }
        if (watches.has(id)) {
          const watch = watches.get(id)
          // activity 保持 undefined 说明事件窗口此前不可用；运行中补挂一次（成功 attach 后值为 null，不会重复订阅）
          if (watch !== undefined && watch.activity === undefined && binding.eventSource !== undefined)
            attachEventSource(id, binding, watch)
          emitIfChanged(id, binding, 'update')
        }
        else {
          bind(id, known.has(id) ? 'update' : 'create')
        }
      }
      known.clear()
      for (const id of ids)
        known.add(id)
    }

    // 门控来源：订阅共享 store 的 enabled 变化（侧栏图标 / 设置页写入）
    controller.add(subscribePetUi(() => {
      applyEnabled(getPetUiSnapshot().status?.enabled ?? false)
    }))
    // 门控兜底：共享 store 可能尚未被任何消费方初始化，主动拉取一次并入 store
    const revision = beginPetStatusFetch()
    void fetchPetStatus().then((status: PetStatus) => {
      if (disposed)
        return
      commitPetStatusFetch(revision, status)
      applyEnabled(status.enabled)
    }).catch((error: unknown) => {
      if (!disposed)
        console.warn('[dsh-tauri-pet] fetch pet status failed:', error)
    })

    controller.add(sessions.list.subscribe(sync))
    controller.interval(sync, 250)
    controller.add(() => {
      disposed = true
      pendingUpdates.clear()
      for (const id of [...watches.keys()])
        unbind(id)
      known.clear()
    })
    sync()
    return () => controller.dispose()
  }, 'dsh-tauri-pet: raw session events')
}
