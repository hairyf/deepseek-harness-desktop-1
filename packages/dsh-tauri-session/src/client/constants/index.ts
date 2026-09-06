/** Shared protocol and UI constants for the dsh-tauri-session client plugin. */

import { SESSION_PLUGIN_NAME } from '../../shared/constants'

export { SESSION_API_PREFIX, SESSION_PLUGIN_NAME, SESSION_SECTION_ORDER } from '../../shared/constants'

export const SESSION_CLIENT_NS = SESSION_PLUGIN_NAME
export const SESSION_REGISTRANT = SESSION_PLUGIN_NAME

export const SETTINGS_SECTION_SLOT = 'settings.section'
export const SESSION_SECTION_ID = 'dsh-tauri-session-archive'

export const SESSION_STYLE_ID = 'dsh-tauri-session-styles'

/** Effects / lifecycle ids (诊断元数据). */
export const SESSION_STYLES_EFFECT = `${SESSION_PLUGIN_NAME}: styles`
export const SESSION_ARCHIVE_PATCH_EFFECT = `${SESSION_PLUGIN_NAME}: workspace archive patch`
export const SESSION_ARCHIVE_SECTION_EFFECT = `${SESSION_PLUGIN_NAME}: archive section`

/** css-render class prefix (value 仅用于样式命名，不作为协议). */
export const SESSION_CLASSES = {
  page: 'dshp-session__page',
  header: 'dshp-session__header',
  title: 'dshp-session__title',
  deleteAll: 'dshp-session__delete-all',
  toolbar: 'dshp-session__toolbar',
  search: 'dshp-session__search',
  menuSelect: 'dshp-session__menu-select',
  menuSelectLabel: 'dshp-session__menu-select-label',
  menuSelectChevron: 'dshp-session__menu-select-chevron',
  groups: 'dshp-session__groups',
  group: 'dshp-session__group',
  groupHeader: 'dshp-session__group-header',
  groupTitle: 'dshp-session__group-title',
  groupCount: 'dshp-session__group-count',
  groupMenu: 'dshp-session__group-menu',
  groupMenuTrigger: 'dshp-session__group-menu-trigger',
  list: 'dshp-session__list',
  row: 'dshp-session__row',
  rowMain: 'dshp-session__row-main',
  rowTitle: 'dshp-session__row-title',
  rowTime: 'dshp-session__row-time',
  rowActions: 'dshp-session__row-actions',
  rowDelete: 'dshp-session__row-delete',
  unarchive: 'dshp-session__unarchive',
  deleteBtn: 'dshp-session__delete-btn',
  deleteBtnText: 'dshp-session__delete-btn-text',
  empty: 'dshp-session__empty',
  error: 'dshp-session__error',
  toastView: 'dshp-session__toast-view',
  archiveMenuItem: 'dshp-session__archive-menu-item',
} as const

/**
 * Sync strings for matching the official workspace-row menu's delete item
 * (zh/en). The item is a primitives `Menu` row rendered in a portal, so the
 * patch scans `document.body`, not the sidebar.
 */
export const DELETE_WORKSPACE_LABELS: readonly string[] = ['删除工作区', 'Delete workspace']

/** Official primitives menu row selector (portal). */
export const MENU_ITEM_SELECTOR = 'button[role="menuitem"]'

/** Sidebar shell seat holding the official WorkspaceBrowser. */
export const SIDEBAR_SELECTOR = '[data-slot="sidebar"]'

/** Attribute marking a project-row ellipsis whose click records the open menu's workspace. */
export const WORKSPACE_MENU_ANCHOR_ATTRIBUTE = 'data-dsh-tauri-session-menu-anchor'
/** Attribute marking a portal workspace menu already patched with the archive item. */
export const WORKSPACE_MENU_PATCH_ATTRIBUTE = 'data-dsh-tauri-session-archive-menu-patched'
