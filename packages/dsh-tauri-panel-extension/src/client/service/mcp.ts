/**
 * service/mcp.ts — MCP 服务器管理注入面组装（桌面重启降级）。
 *
 * 错误归一由 dsh-tauri 的 JSON 客户端统一承担，apis/ 直接返回解析后的类型；
 * 本文件只做 McpInjected 组装与 `window.dshDesktop` 重启优先、HTTP 兜底。
 */
import type { McpInjected } from '../types'
import {
  getMcp,
  getMcpImportScan,
  postMcpImportApply,
  postMcpRemove,
  postMcpSave,
  postMcpToggle,
  postRestart,
} from '../apis'

export function createMcpInjected(): McpInjected {
  return {
    list: () => getMcp(),
    save: input => postMcpSave(input),
    toggle: (id, disabled) => postMcpToggle({ id, disabled }),
    remove: id => postMcpRemove({ id }),
    scanImport: () => getMcpImportScan(),
    applyImport: items => postMcpImportApply({ items }),
    restart: async () => {
      if (window.dshDesktop !== undefined) {
        window.dshDesktop.restartSidecar?.()
        return
      }
      try {
        await postRestart()
      }
      catch { /* The connection normally closes while the host restarts. */ }
    },
    desktop: typeof window !== 'undefined' && window.dshDesktop !== undefined,
  }
}
