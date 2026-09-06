import type { PetStatus } from './use-pet'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'
import { toast } from '@/utils/toast'

export interface BubbleSession {
  [key: string]: unknown
  id: string
}

export interface BubbleHandle {
  readonly status: PetStatus | undefined
}

type SessionAction = 'create' | 'remove' | 'update'

const FAILED_BUBBLE_TIMEOUT = 4000
const REVIEW_BUBBLE_TIMEOUT = 2500
const SUCCESS_TOAST_TIMEOUT = 3000
const FAILED_PULSE_TTL = 1800

/** 状态优先级映射，数值越大优先级越高 */
const STATUS_PRIORITY = {
  'waiting': 4,
  'review': 3,
  'failed': 2,
  'running': 1,
  'idle': 0,
  'turn': 0,
  'moving-left': 0,
  'moving-right': 0,
  'waving': 0,
}

/** 桌宠窗口的会话气泡：DSH 发送原始会话快照，本 hook 私有管理会话→toast key 映射，仅暴露聚合宠物状态。 */
export function useBubble(): BubbleHandle {
  const [status, setStatus] = useState<PetStatus | undefined>(undefined)

  useEffect(() => {
    const sessions = new Map<string, BubbleSession>()
    const toastKeys = new Map<string, string>()
    const hideTimers = new Map<string, number>()
    const previousStatus = new Map<string, PetStatus | undefined>()
    const failedUntil = new Map<string, number>()
    const pulseTimers = new Map<string, number>()
    const consumedFailed = new Set<string>()
    const dismissed = new Set<string>()
    let disposed = false

    const clearTimer = (map: Map<string, number>, id: string) => {
      const timer = map.get(id)
      if (timer !== undefined) {
        window.clearTimeout(timer)
        map.delete(id)
      }
    }

    const closeToast = (id: string) => {
      clearTimer(hideTimers, id)
      const key = toastKeys.get(id)
      if (key !== undefined) {
        toast.close(key)
        toastKeys.delete(id)
      }
    }

    const scheduleHide = (id: string, current: PetStatus) => {
      clearTimer(hideTimers, id)
      const timeout = current === 'failed' ? FAILED_BUBBLE_TIMEOUT : current === 'review' ? REVIEW_BUBBLE_TIMEOUT : undefined
      const key = toastKeys.get(id)
      if (timeout === undefined || key === undefined)
        return

      const timer = window.setTimeout(() => {
        if (toastKeys.get(id) === key) {
          dismissed.add(id)
          closeToast(id)
        }
      }, timeout)
      hideTimers.set(id, timer)
    }

    const trackFailedPulse = (session: BubbleSession) => {
      const current = sessionStatus(session)
      const previous = previousStatus.get(session.id)

      if (current === 'failed') {
        if (previous === 'failed' || consumedFailed.has(session.id))
          return

        const deadline = Date.now() + FAILED_PULSE_TTL
        failedUntil.set(session.id, deadline)
        clearTimer(pulseTimers, session.id)

        const timer = window.setTimeout(() => {
          if (disposed || failedUntil.get(session.id) !== deadline)
            return
          failedUntil.delete(session.id)
          clearTimer(pulseTimers, session.id)
          consumedFailed.add(session.id)
          setStatus(statusOf(sessions, failedUntil, Date.now()))
        }, FAILED_PULSE_TTL)

        pulseTimers.set(session.id, timer)
      }
      else {
        failedUntil.delete(session.id)
        clearTimer(pulseTimers, session.id)
        consumedFailed.delete(session.id)
      }
    }

    const syncToast = (session: BubbleSession) => {
      const current = sessionStatus(session)
      const previous = previousStatus.get(session.id)
      previousStatus.set(session.id, current)
      const key = toastKeys.get(session.id)

      if (current === undefined) {
        const completed = previous === 'running'
        if (key !== undefined)
          closeToast(session.id)
        if (completed) {
          const title = [session.title, session.displayTitle, session.name, session.id]
            .find(v => typeof v === 'string' && v.trim()) as string || '会话'
          toast(title.trim(), {
            description: '已完成',
            placement: 'top end',
            variant: 'success',
            timeout: SUCCESS_TOAST_TIMEOUT,
          })
        }
        return
      }

      const isTerminal = current === 'failed' || current === 'review'
      if (!isTerminal)
        dismissed.delete(session.id)

      const content = toastContent(session, current)
      if (key === undefined) {
        if (dismissed.has(session.id) || (previous !== undefined && previous === current))
          return

        let createdKey = ''
        createdKey = toast(content.title, {
          isLoading: content.isLoading,
          description: content.description,
          placement: 'top end',
          variant: content.variant,
          timeout: 0,
          onClose: () => {
            if (toastKeys.get(session.id) === createdKey) {
              toastKeys.delete(session.id)
              clearTimer(hideTimers, session.id)
            }
          },
        })
        toastKeys.set(session.id, createdKey)
      }
      else {
        toast.update(key, content)
      }

      if (previous !== current && isTerminal) {
        scheduleHide(session.id, current)
      }
    }

    const apply = (payload: unknown, action: SessionAction) => {
      const session = rawSession(payload)
      if (!session)
        return

      if (action === 'remove') {
        sessions.delete(session.id)
        previousStatus.delete(session.id)
        dismissed.delete(session.id)
        failedUntil.delete(session.id)
        consumedFailed.delete(session.id)
        clearTimer(pulseTimers, session.id)
        clearTimer(hideTimers, session.id)
        closeToast(session.id)
      }
      else {
        sessions.set(session.id, session)
        trackFailedPulse(session)
        syncToast(session)
      }

      if (!disposed)
        setStatus(statusOf(sessions, failedUntil, Date.now()))
    }

    let unlisteners: Array<() => void> = []
    void Promise.all([
      listen('session:create', e => apply(e.payload, 'create')),
      listen('session:update', e => apply(e.payload, 'update')),
      listen('session:remove', e => apply(e.payload, 'remove')),
    ]).then((listeners) => {
      if (disposed)
        listeners.forEach(u => u())
      else unlisteners = listeners
    }).catch(() => {})

    return () => {
      disposed = true
      unlisteners.forEach(u => u())
      hideTimers.forEach(t => window.clearTimeout(t))
      hideTimers.clear()
      pulseTimers.forEach(t => window.clearTimeout(t))
      pulseTimers.clear()
      toastKeys.forEach(k => toast.close(k))
      toastKeys.clear()
    }
  }, [])

  return { status }
}

/** 统一解析原始会话对象 */
function rawSession(payload: unknown): BubbleSession | undefined {
  if (!payload || typeof payload !== 'object')
    return undefined
  const value = payload as Record<string, unknown>
  const session = (value.session && typeof value.session === 'object' ? value.session : value) as Record<string, unknown>
  const id = session.id ?? session.sessionId
  return typeof id === 'string' && id.length > 0 ? { ...session, id } : undefined
}

/** 提取单个会话的状态（忽略底层恢复逻辑） */
function sessionStatus(session: BubbleSession, ignoreError = false): PetStatus | undefined {
  const value = session.status ?? session.activity ?? session.phase
  if (!ignoreError && (value === 'failed' || value === 'error' || session.lastAgentError))
    return 'failed'
  if (value === 'review' || value === 'reviewing' || value === 'plan-review')
    return 'review'

  const hasInteraction = session.pendingInteraction !== undefined && session.pendingInteraction !== null && session.pendingInteraction !== false
  const hasPending = Array.isArray(session.pending) ? session.pending.length > 0 : session.pending !== undefined && session.pending !== null
  if (value === 'waiting' || value === 'pending' || value === 'blocked' || hasInteraction || hasPending)
    return 'waiting'

  if (value === 'running' || value === 'working' || value === 'thinking' || session.running === true)
    return 'running'
  return undefined
}

/** 零内存分配计算聚合最高优先级状态 */
function statusOf(
  sessions: ReadonlyMap<string, BubbleSession>,
  failedUntil: ReadonlyMap<string, number>,
  now: number,
): PetStatus | undefined {
  let highestStatus: PetStatus | undefined
  let maxPriority = 0

  for (const session of sessions.values()) {
    let status = sessionStatus(session)
    if (status === 'failed') {
      const deadline = failedUntil.get(session.id)
      if (deadline === undefined || now >= deadline) {
        status = sessionStatus(session, true) // 底层恢复状态
      }
    }

    if (status) {
      const priority = STATUS_PRIORITY[status]
      if (priority > maxPriority) {
        maxPriority = priority
        highestStatus = status
        if (maxPriority === 4)
          break // 已是最高优先级 waiting，可提前结束循环
      }
    }
  }
  return highestStatus
}

/** 生成 Toast 渲染数据（内置工具/思考标签提取） */
function toastContent(session: BubbleSession, status: PetStatus) {
  const getFirstString = (...items: unknown[]) => {
    for (const item of items) {
      if (typeof item === 'string' && item.trim().length > 0)
        return item.trim()
    }
    return undefined
  }

  const getLiveActivity = (): string | undefined => {
    if (status !== 'running' || !session.liveActivity || typeof session.liveActivity !== 'object')
      return undefined
    const { kind, text, name, args } = session.liveActivity as Record<string, unknown>

    if (kind === 'reasoning' && typeof text === 'string' && text.trim()) {
      return `思考 · ${text.replace(/\s+/g, ' ').trim()}`
    }
    if (kind === 'tool' && typeof name === 'string' && name) {
      let detail: string | undefined
      if (typeof args === 'string' && args) {
        try {
          const parsed = JSON.parse(args)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const keys = name === 'pwsh' || name === 'bash' ? ['command'] : name === 'str_replace_editor' ? ['path'] : ['file_path', 'path']
            for (const k of keys) {
              if (typeof parsed[k] === 'string' && parsed[k].trim()) {
                detail = parsed[k].replace(/\s+/g, ' ').trim()
                break
              }
            }
          }
        }
        catch {}
      }
      if (name === 'pwsh' || name === 'bash')
        return `${name === 'pwsh' ? 'Pwsh' : 'Bash'} · ${detail ?? '命令执行'}`
      if (name === 'str_replace_editor' || name === 'edit' || name === 'write')
        return `编辑 · ${detail ?? name}`
      return `工具调用 · ${name}`
    }
    return undefined
  }

  const title = getFirstString(session.title, session.displayTitle, session.name, session.id) ?? '会话'
  const statusText = status === 'failed' ? '失败' : status === 'review' ? '待审阅' : status === 'waiting' ? '等待中' : status === 'running' ? '思考中' : '空闲'
  const description = getFirstString(
    session.description,
    session.message,
    session.lastAgentError ? `失败：${String(session.lastAgentError)}` : undefined,
    getLiveActivity(),
    statusText,
  ) ?? '会话'

  return {
    title,
    description,
    isLoading: status === 'running',
    variant: (status === 'failed' ? 'danger' : 'default') as 'danger' | 'default',
  }
}
