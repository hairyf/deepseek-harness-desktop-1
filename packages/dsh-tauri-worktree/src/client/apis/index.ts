import type * as Types from './index.type'
import { createJsonClient } from 'dsh-tauri/client'
import { WORKTREE_API_PREFIX } from '../../shared/constants'

export const baseURL = WORKTREE_API_PREFIX

/** 绑定 API 前缀的 JSON 客户端（错误归一由 dsh-tauri 统一承担）。 */
const json = createJsonClient(baseURL)

/** @method get 查询某会话的工作树状态。 */
export function getStatus(query: Types.GetStatusQuery): Promise<Types.WorktreeStatus> {
  const jobId = query.jobId ? `&jobId=${encodeURIComponent(query.jobId)}` : ''
  return json.request(`/status?sessionId=${encodeURIComponent(query.sessionId)}${jobId}`)
}

/** @method post 为预分配的新会话创建工作树。 */
export function postCreate(body: Types.PostCreateBody): Promise<Types.WorktreeCreate> {
  return json.post('/create', body)
}

/** @method post 将已创建的 worktree 会话归属到源项目 Workspace。 */
export function postAttach(body: Types.PostAttachBody): Promise<{ ok: boolean, workspaceId: string }> {
  return json.post('/attach', body)
}

/** @method post 检出本地（分支名客户端已 trimmed）。 */
export function postCheckout(body: Types.PostCheckoutBody): Promise<Types.WorktreeCheckout> {
  return json.post('/checkout', body)
}

/** @method post 放弃更改：删除工作树并解除绑定，会话保留。 */
export function postDiscard(body: Types.PostDiscardBody): Promise<Types.WorktreeDiscard> {
  return json.post('/discard', body)
}
