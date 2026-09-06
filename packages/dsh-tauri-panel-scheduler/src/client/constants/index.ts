/** client/constants/index.ts — 客户端共享常量（跨 half 协议常量见 shared/constants.ts）。 */

import { SCHEDULER_PLUGIN_NAME } from '../../shared/constants'

export { SCHEDULER_API_PREFIX as API_PREFIX, SCHEDULER_PLUGIN_NAME as PLUGIN_ID } from '../../shared/constants'

export const LOCALE_NAMESPACE = SCHEDULER_PLUGIN_NAME

export const PANEL_PROTOCOL_NAME = 'panel.protocol'
export const PANEL_SLOT_NAME = 'sidebar.panel.action'
export const PANEL_ID = 'dsh-tauri-panel-scheduler'
export const PANEL_ACTION_ID = 'dsh-tauri-panel-scheduler.action'
export const PANEL_ACTION_ORDER = 30
export const PANEL_ACTION_PRIORITY = 0

/** 「通过 Chat 创建」草稿预填桥：conversation.input.left 槽（照搬 dsh-automation）。 */
export const CONVERSATION_INPUT_LEFT_SLOT = 'conversation.input.left'
export const INPUT_PREFILL_ID = 'dsh-tauri-panel-scheduler.prefill'
export const INPUT_PREFILL_ORDER = 40
export const INPUT_PREFILL_PRIORITY = 0

export const STYLE_ID = 'dsh-tauri-panel-scheduler-styles'

export const STYLES_EFFECT = `${SCHEDULER_PLUGIN_NAME}: styles`
export const PANEL_EFFECT = `${SCHEDULER_PLUGIN_NAME}: panel slot`
export const SESSION_ICONS_EFFECT = `${SCHEDULER_PLUGIN_NAME}: session clock icons`

/** 会话行时钟图标补丁的 css-render 样式 id（防重复挂载）。 */
export const SESSION_ICON_STYLE_ID = '@deepseek-ai/dsh-tauri-panel-scheduler/SessionClockIcon.module.css'
/** 会话行内注入的时钟图标 span 的标记属性。 */
export const SESSION_ICON_ATTRIBUTE = 'data-dsh-scheduler-icon'
/** 官方侧边栏容器（应用晚挂载时的轮询锚点）。 */
export const SIDEBAR_SELECTOR = '[data-slot="sidebar"]'

/** 客户端轮询刷新间隔（执行记录 / 下次运行时间跟随）。 */
export const REFRESH_INTERVAL_MS = 5_000
/** 协议未就绪时的重试间隔。 */
export const PROTOCOL_RETRY_MS = 50

/**
 * css-render class 前缀（值仅用于样式命名，不作为协议）。
 *
 * 遵循 dsh-tauri-session 的 SESSION_CLASSES 约定：插件前缀 + 语义名，
 * 控件类（input / select-input / icon-button / selector / btn / field）复刻
 * 官方 ModelsSection.module.css 与 LanguageRow.module.css 的样式值，
 * 全部基于 --dsw-alias-* 令牌（浅色/深色主题自动适配），不依赖生成的
 * CSS module hash（docs/AGENTS.plugins.md 禁止）。
 */
export const SCHEDULER_CLASSES = {
  // —— 面板外壳 / 页头 ——
  shell: 'dshp-scheduler__shell',
  top: 'dshp-scheduler__top',
  heading: 'dshp-scheduler__heading',
  toolbar: 'dshp-scheduler__toolbar',
  toolbarSpacer: 'dshp-scheduler__toolbar-spacer',
  searchWrap: 'dshp-scheduler__search-wrap',
  searchIcon: 'dshp-scheduler__search-icon',
  banner: 'dshp-scheduler__banner',

  // —— Tabs ——
  tabs: 'dshp-scheduler__tabs',
  tab: 'dshp-scheduler__tab',
  tabActive: 'dshp-scheduler__tab--active',

  // —— 任务卡片 ——
  cards: 'dshp-scheduler__cards',
  card: 'dshp-scheduler__card',
  cardPaused: 'dshp-scheduler__card--paused',
  cardTitle: 'dshp-scheduler__card-title',
  cardIcon: 'dshp-scheduler__card-icon',
  taskToggle: 'dshp-scheduler__task-toggle',
  cardMeta: 'dshp-scheduler__card-meta',
  cardMetaText: 'dshp-scheduler__card-meta-text',

  // —— 执行记录 ——
  runsList: 'dshp-scheduler__runs-list',
  runsToolbar: 'dshp-scheduler__runs-toolbar',
  runRow: 'dshp-scheduler__run-row',
  runMain: 'dshp-scheduler__run-main',
  runMeta: 'dshp-scheduler__run-meta',
  runName: 'dshp-scheduler__run-name',
  runTime: 'dshp-scheduler__run-time',
  runDelete: 'dshp-scheduler__run-delete',
  runError: 'dshp-scheduler__run-error',
  chip: 'dshp-scheduler__chip',

  // —— 文案状态 ——
  empty: 'dshp-scheduler__empty',
  muted: 'dshp-scheduler__muted',
  error: 'dshp-scheduler__error',

  // —— 推荐列表 ——
  recs: 'dshp-scheduler__recs',
  recTitle: 'dshp-scheduler__recs-title',
  recList: 'dshp-scheduler__recs-list',
  recItem: 'dshp-scheduler__recs-item',
  recIcon: 'dshp-scheduler__recs-icon',
  recBody: 'dshp-scheduler__recs-body',
  recName: 'dshp-scheduler__recs-name',
  recPrompt: 'dshp-scheduler__recs-prompt',

  // —— 官方控件复刻（ModelsSection / LanguageRow 样式值）——
  field: 'dshp-scheduler__field',
  fieldLabel: 'dshp-scheduler__field-label',
  inline: 'dshp-scheduler__inline',
  inlineSelect: 'dshp-scheduler__inline-select',
  inlineSelectAuto: 'dshp-scheduler__inline-select--auto',
  composer: 'dshp-scheduler__composer',
  promptWrap: 'dshp-scheduler__prompt-wrap',
  input: 'dshp-scheduler__input',
  selectInput: 'dshp-scheduler__select-input',
  textarea: 'dshp-scheduler__textarea',
  iconButton: 'dshp-scheduler__icon-button',
  iconButtonDanger: 'dshp-scheduler__icon-button--danger',
  btn: 'dshp-scheduler__btn',
  btnPrimary: 'dshp-scheduler__btn--primary',
  btnDanger: 'dshp-scheduler__btn--danger',
  selector: 'dshp-scheduler__selector',
  selectorChevron: 'dshp-scheduler__selector-chevron',
  selectorEffort: 'dshp-scheduler__selector-effort',

  // —— ModelPicker（照搬 dsh-automation create-modal.tsx 的 ModelPicker）——
  modelSelect: 'dshp-scheduler__model-select',
  modelSelectOpen: 'dshp-scheduler__model-select--open',
  modelTrigger: 'dshp-scheduler__model-trigger',
  modelTriggerEffort: 'dshp-scheduler__model-trigger-effort',
  modelTriggerChevron: 'dshp-scheduler__model-trigger-chevron',
  modelTriggerChevronOpen: 'dshp-scheduler__model-trigger-chevron--open',
  modelSelectMenu: 'dshp-scheduler__model-select-menu',
  modelSelectMenuFloat: 'dshp-scheduler__model-select-menu-float',
  menuRow: 'dshp-scheduler__menu-row',
  menuRowOn: 'dshp-scheduler__menu-row--on',
  menuRowKv: 'dshp-scheduler__menu-row--kv',
  menuRowMain: 'dshp-scheduler__menu-row-main',
  menuRowSide: 'dshp-scheduler__menu-row-side',
  menuTick: 'dshp-scheduler__menu-tick',
  menuNext: 'dshp-scheduler__menu-next',
  menuFloat: 'dshp-scheduler__menu-float',
  menuSelect: 'dshp-scheduler__menu-select',
  menuSelectBtn: 'dshp-scheduler__menu-select-btn',
  menuSelectMenu: 'dshp-scheduler__menu-select-menu',
  chipBtn: 'dshp-scheduler__chip-btn',
  modelWarning: 'dshp-scheduler__model-warning',
  modelGroup: 'dshp-scheduler__model-group',
  modelGroupTitle: 'dshp-scheduler__model-group-title',
  modelOption: 'dshp-scheduler__model-option',
  modelOptionCopy: 'dshp-scheduler__model-option-copy',
  modelName: 'dshp-scheduler__model-name',
  modelDescription: 'dshp-scheduler__model-description',
  modelCheck: 'dshp-scheduler__model-check',
  modelEmpty: 'dshp-scheduler__model-empty',
  flyoutRoot: 'dshp-scheduler__flyout-root',

  modal: 'dshp-scheduler__modal',
} as const
