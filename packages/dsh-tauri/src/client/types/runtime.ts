/**
 * 官方 controller 客户端类型统一出口。
 * 【来源】@deepseek-ai/dsh-api-session-controller/client 与
 * @deepseek-ai/dsh-api-workspace-controller/client。
 * 【版本】当前 lockfile 解析版本 0.1.2-alpha.3。
 * 【修订】2026-01：删除重复快照接口；startSession 仅保留为兼容扩展。
 */
import type { ISessions, SessionListState, SessionSummary } from '@deepseek-ai/dsh-api-session-controller/client'
import type { IWorkspaces, WorkspaceSnapshot, WorkspaceSource, WorkspaceView } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type { SlotRegistry } from '@deepseek-ai/dsh-client-ui-renderer/client'
import type { WorkspaceId as WorkspaceIdType } from './json'

export type { ISessions, IWorkspaces, SessionListState, SessionSummary, SlotRegistry, WorkspaceSnapshot, WorkspaceSource, WorkspaceView }
export type SessionsRuntime = ISessions
export type WorkspacesRuntime = IWorkspaces & { startSession?: (workspaceId?: WorkspaceIdType) => void }
