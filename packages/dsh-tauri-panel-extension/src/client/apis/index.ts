import type * as Types from './index.type'
import { createJsonClient } from 'dsh-tauri/client'
import { API_PREFIX } from '../../shared/constants'

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

/** @method get 查询技能列表。 */
export function getSkills(): Promise<Types.SkillsResponse> {
  return json.request('/skills')
}

/** @method post 强制宿主重扫全部技能根。 */
export function postSkillsRefresh(): Promise<Types.SkillsResponse> {
  return json.post('/skills/refresh', {})
}

/** @method get 读取单个技能内容。 */
export function getSkill(name: string): Promise<Types.SkillContentResponse> {
  return json.request(`/skill?name=${encodeURIComponent(name)}`)
}

/** @method post 保存技能。 */
export function postSkillSave(body: Types.PostSkillSaveBody): Promise<Types.ActionResult> {
  return json.post('/skill/save', body)
}

/** @method post 删除技能。 */
export function postSkillDelete(body: Types.PostSkillDeleteBody): Promise<Types.ActionResult> {
  return json.post('/skill/delete', body)
}

/** @method post 切换技能加载策略。 */
export function postSkillPolicy(body: Types.PostSkillPolicyBody): Promise<Types.ActionResult> {
  return json.post('/skill/policy', body)
}

/** @method post 打开用户技能目录或某技能。 */
export function postOpen(target: { target: 'user-skills' | 'skill', name?: string }): Promise<Types.ActionResult> {
  return json.post('/open', target)
}

/** @method post 导入 GitHub 技能仓库。 */
export function postRootsAdd(url: string): Promise<Types.ActionResult> {
  return json.post('/roots/add', { kind: 'git', url })
}

/** @method get 查询 MCP 服务器列表。 */
export function getMcp(): Promise<Types.McpListResponse> {
  return json.request('/mcp')
}

/** @method post 保存 MCP 服务器。 */
export function postMcpSave(body: Record<string, unknown>): Promise<Types.McpSaveResponse> {
  return json.post('/mcp/save', body)
}

/** @method post 启用/禁用 MCP 服务器。 */
export function postMcpToggle(body: Types.PostMcpToggleBody): Promise<Types.ActionResult> {
  return json.post('/mcp/toggle', body)
}

/** @method post 移除 MCP 服务器。 */
export function postMcpRemove(body: Types.PostMcpRemoveBody): Promise<Types.ActionResult> {
  return json.post('/mcp/remove', body)
}

/** @method get 扫描可导入的 MCP 配置。 */
export function getMcpImportScan(): Promise<Types.McpImportScanResponse> {
  return json.request('/import/scan')
}

/** @method post 应用 MCP 导入项。 */
export function postMcpImportApply(body: Types.PostMcpApplyImportBody): Promise<Types.McpApplyImportResponse> {
  return json.post('/import/apply', body)
}

/** @method post 请求宿主重启（连接会断开）。 */
export function postRestart(): Promise<unknown> {
  return json.post('/restart', {})
}
