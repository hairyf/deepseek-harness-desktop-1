import type * as Types from './index.type'
import { createJsonClient } from 'dsh-tauri/client'
import { API_PREFIX } from '../constants'

export const baseURL = API_PREFIX

/** 绑定 API 前缀的 JSON 客户端（错误归一由 dsh-tauri 统一承担）。 */
const json = createJsonClient(baseURL, {
  errorMessage: (status, body) => {
    const error = body && typeof body === 'object' && typeof (body as { error?: unknown }).error === 'string'
      ? (body as { error: string }).error
      : ''
    return error || `HTTP ${status}`
  },
})

/** @method get 查询任务列表。 */
export function getTasks(query?: Types.GetTasksQuery): Promise<Types.TasksResponse> {
  return json.request(`/tasks${query?.search ? `?search=${encodeURIComponent(query.search)}` : ''}`)
}

/** @method post 新建任务。 */
export function postTasksCreate(body: Types.PostTasksCreateBody): Promise<Types.TaskActionResult> {
  return json.post('/tasks/create', body)
}

/** @method post 更新任务。 */
export function postTasksUpdate(body: Types.PostTasksUpdateBody): Promise<Types.TaskActionResult> {
  return json.post('/tasks/update', { id: body.id, ...body.input })
}

/** @method post 暂停/恢复任务。 */
export function postTasksToggle(body: Types.PostTasksToggleBody): Promise<Types.TaskActionResult> {
  return json.post('/tasks/toggle', body)
}

/** @method post 删除任务。 */
export function postTasksDelete(body: Types.PostIdBody): Promise<Types.SimpleActionResult> {
  return json.post('/tasks/delete', body)
}

/** @method post 立即运行任务。 */
export function postTasksRun(body: Types.PostIdBody): Promise<Types.SimpleActionResult> {
  return json.post('/tasks/run', body)
}

/** @method get 查询执行记录。 */
export function getHistory(query?: Types.GetHistoryQuery): Promise<Types.RunsResponse> {
  return json.request(`/history${query?.taskId ? `?taskId=${encodeURIComponent(query.taskId)}` : ''}`)
}

/** @method post 删除执行记录。 */
export function postHistoryDelete(body: Types.PostIdBody): Promise<Types.SimpleActionResult> {
  return json.post('/history/delete', body)
}

/** @method get 查询面板选项。 */
export function getOptions(): Promise<Types.SchedulerOptions> {
  return json.request('/options')
}

/** @method post 触发宿主自愈恢复。 */
export function postRecover(): Promise<unknown> {
  return json.post('/recover', {})
}
