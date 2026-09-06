/** client/constants.ts — 客户端共享常量（跨 half 协议常量见 shared/constants.ts）。 */

import { WORKTREE_PLUGIN_NAME } from '../../shared/constants'

export { WORKTREE_API_PREFIX, WORKTREE_PLUGIN_NAME } from '../../shared/constants'

export const WORKTREE_LOCALE_NAMESPACE = WORKTREE_PLUGIN_NAME

export const INPUT_DOCK_SLOT = 'conversation.input.dock'
export const SHELL_OVERLAY_SLOT = 'shell.overlay'
export const MODE_SELECT_ID = `${WORKTREE_PLUGIN_NAME}-mode`
export const MODE_SELECT_ORDER = -20
export const SURFACE_ID = `${WORKTREE_PLUGIN_NAME}-surface`
export const SURFACE_ORDER = -10
export const DIALOG_ID = `${WORKTREE_PLUGIN_NAME}-dialog`

export const STYLES_EFFECT = `${WORKTREE_PLUGIN_NAME}: styles`
export const MODE_SELECT_EFFECT = `${WORKTREE_PLUGIN_NAME}: mode select slot`
export const SURFACE_EFFECT = `${WORKTREE_PLUGIN_NAME}: surface slot`
export const DIALOG_EFFECT = `${WORKTREE_PLUGIN_NAME}: dialog`
export const HYDRATION_EFFECT = `${WORKTREE_PLUGIN_NAME}: hydrate session bindings`
export const SESSION_ICONS_EFFECT = `${WORKTREE_PLUGIN_NAME}: session branch icons`

export const SESSION_SWITCH_RETRY_DELAY_MS = 100
export const SESSION_SWITCH_MAX_ATTEMPTS = 30

/** hydration 失败/未知状态的重试间隔与上限（1.5s × 30 ≈ 45s，成功后立即停止）。 */
export const HYDRATION_RETRY_DELAY_MS = 1500
export const HYDRATION_MAX_RETRIES = 30
/** Discard job polling cadence and retry limit. */
export const DISCARD_POLL_DELAY_MS = 500
export const DISCARD_MAX_POLLS = 120

/**
 * create_worktree 自动交接的时效窗口：只有「本次运行期间新出现」且出现不超过该时长的
 * 工作树会话才允许自动打开。启动时已存在的历史工作树、以及用户事后回到源会话的场景
 * 一律不抢焦点（否则点击新建会话会被误跳转到工作树会话）。
 * 60s 覆盖 hydration 的完整重试链（45s），避免慢速首查把真实交接误判为过期。
 */
export const HANDOFF_WINDOW_MS = 60_000

export const MODE_SELECT_STYLE_ID = '@deepseek-ai/dsh-tauri-worktree/ModeSelect.module.css'
export const WORKTREE_STYLE_ID = '@deepseek-ai/dsh-tauri-worktree/SurfaceDialog.module.css'
export const SESSION_ICON_STYLE_ID = '@deepseek-ai/dsh-tauri-worktree/SessionBranchIcon.module.css'

export const MODE_SELECT_CLASSES = {
  anchor: 'dshp-mode-select__anchor',
  chevron: 'dshp-mode-select__chevron',
  host: 'dshp-mode-select__host',
  icon: 'dshp-mode-select__icon',
  trigger: 'dshp-mode-select__trigger',
  triggerOpen: 'dshp-mode-select__trigger--open',
} as const

export const worktreeStyles = {
  surface: 'dshp-worktree__surface',
  surfaceBar: 'dshp-worktree__surface-bar',
  surfaceContent: 'dshp-worktree__surface-content',
  surfaceLabel: 'dshp-worktree__surface-label',
  action: 'dshp-worktree__action',
  actionLog: 'dshp-worktree__action--log',
  actionDanger: 'dshp-worktree__action--danger',
  spacer: 'dshp-worktree__spacer',
  logs: 'dshp-worktree__logs',
  logsOpen: 'dshp-worktree__logs--open',
  logsInner: 'dshp-worktree__logs-inner',
  logsPanel: 'dshp-worktree__logs-panel',
  logLine: 'dshp-worktree__log-line',
  modal: 'dshp-worktree__modal',
  card: 'dshp-worktree__dialog-card',
  title: 'dshp-worktree__dialog-title',
  body: 'dshp-worktree__dialog-body',
  field: 'dshp-worktree__dialog-field',
  fieldLabel: 'dshp-worktree__dialog-field-label',
  inputWrap: 'dshp-worktree__dialog-input-wrap',
  input: 'dshp-worktree__dialog-input',
  pathRow: 'dshp-worktree__dialog-path-row',
  pathKey: 'dshp-worktree__dialog-path-key',
  pathValue: 'dshp-worktree__dialog-path-value',
  error: 'dshp-worktree__dialog-error',
  footer: 'dshp-worktree__dialog-footer',
  button: 'dshp-worktree__dialog-button',
  buttonGhost: 'dshp-worktree__dialog-button--ghost',
  buttonPrimary: 'dshp-worktree__dialog-button--primary',
  buttonDanger: 'dshp-worktree__dialog-button--danger',
  buttonDisabled: 'dshp-worktree__dialog-button--disabled',
} as const

export const SESSION_ICON_ATTRIBUTE = 'data-dsh-worktree-icon'
export const SIDEBAR_SELECTOR = '[data-slot="sidebar"]'
export const COMPOSER_SEAT_SELECTOR = '[data-composer-seat]'
export const COMPOSER_CARD_SELECTOR = '[data-composer-card="true"]'
export const HERO_PRESET_SLOT_SELECTOR = '[data-slot="conversation.hero.agentPreset"]'
/** 输入条内的「规划」计划槽位，用于定位访问模式右侧的 .modes 分组（见 utils/worktree.ts）。 */
export const COMPOSER_PLAN_SLOT_SELECTOR = '[data-slot="conversation.input.plan"]'
/**
 * rc.2/alpha 共用的稳定「访问模式」按钮定位。aria-label 由官方
 * input.accessMode 文案提供（`.uV2eYG_modes` 是生成 hash，绝不依赖）。
 * 模式选择器始终锚到此按钮右侧的 .modes 分组，而非 hero 的 Agent 预设槽位。
 */
export const COMPOSER_MODE_BUTTON_SELECTOR = `${COMPOSER_CARD_SELECTOR} button[aria-label*="访问模式"], ${COMPOSER_CARD_SELECTOR} button[aria-label*="Access mode"]`
export const MODE_ANCHOR_ATTRIBUTE = 'data-dsh-tauri-worktree-mode-anchor'
