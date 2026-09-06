import { cssr, styles as sharedStyles } from 'dsh-tauri-ui/client'
/**
 * styles/index.ts — 定时任务面板样式（官方控件样式复刻 + 布局补充）。
 *
 * 控件外观复刻官方 dsh 面板的样式值：ModelsSection.module.css 的
 * input / selectInput / iconButton / field / 36px 胶囊按钮，与
 * LanguageRow.module.css 的 selector（pill 触发按钮，下拉走 primitives `Menu`）。
 * 全部基于 --dsw-alias-* 令牌（浅色/深色主题自动适配），以本插件前缀类名承载，
 * 不依赖生成的 CSS module hash（docs/AGENTS.plugins.md:223 禁止）。
 * 本文件仅做布局 / 边框 / 圆角 / 填充补充，mount 只在 apply() 里经 ctx.effect 调用。
 */

const { c } = cssr

const {
  primary,
  secondary,
  tertiary,
  dimmed,
  borderL2: border,
  borderL3,
  borderL4,
  brand,
  business,
  layer1,
  layer3,
  modulePlatform,
  hover,
  hoverSolid,
  hoverDanger,
  error,
  success,
  primaryFill,
  primaryHover,
  primaryFg,
  font,
  chevronSelectSvg: chevronSvg,
  focusRing,
} = sharedStyles

export default c([
  // —— 面板外壳 / 页头 ——
  c(`.dshp-scheduler__shell`, { boxSizing: 'border-box', maxWidth: '1080px', width: '100%', margin: '0 auto', padding: '0 0 32px', color: primary, fontFamily: font, fontSize: '13px', lineHeight: '1.5' }),
  c(`.dshp-scheduler__top`, { display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '12px' }),
  c(`.dshp-scheduler__heading h1`, { margin: '0', fontSize: '20px', lineHeight: '28px', fontWeight: '650', letterSpacing: '-.2px' }),
  c(`.dshp-scheduler__heading p`, { margin: '4px 0 0', color: tertiary, fontSize: '13px', lineHeight: '1.5' }),
  c(`.dshp-scheduler__toolbar`, { display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '8px' }),
  c(`.dshp-scheduler__toolbar-spacer`, { flex: '1' }),

  // —— 搜索框（官方 input 类 + 插件补的图标定位）——
  c(`.dshp-scheduler__search-wrap`, { position: 'relative', display: 'inline-flex', flex: '1', minWidth: '0', maxWidth: '280px' }),
  c(`.dshp-scheduler__search-wrap .dshp-scheduler__input`, { width: '100%', paddingLeft: '32px' }),
  c(`.dshp-scheduler__search-icon`, { position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: tertiary }),

  // —— Tabs ——
  c(`.dshp-scheduler__tabs`, { display: 'flex', alignItems: 'center', gap: '16px', margin: '4px 0 14px', borderBottom: `1px solid ${border}` }),
  c(`.dshp-scheduler__tab`, { padding: '8px 0', border: '0', borderBottom: '2px solid transparent', background: 'transparent', color: secondary, font: 'inherit', fontSize: '13px', cursor: 'pointer' }),
  c(`.dshp-scheduler__tab:hover`, { color: primary }),
  c(`.dshp-scheduler__tab--active`, { borderBottomColor: 'currentColor', color: primary, fontWeight: '650' }),

  c(`.dshp-scheduler__modal`, { width: 'min(640px,100%) !important' }),

  // —— 任务卡片（单列；容器样式与推荐项 recs-item 一致，点击=编辑）——
  c(`.dshp-scheduler__cards`, { display: 'flex', flexDirection: 'column', gap: '8px', margin: '0', padding: '0', listStyle: 'none' }),
  c('@media (max-width: 680px)', [c(`.dshp-scheduler__search-wrap`, { maxWidth: '160px' })]),
  c(`.dshp-scheduler__card`, { boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', width: '100%', minWidth: '0', height: '60px', padding: '10px 12px', border: `1px solid ${border}`, borderRadius: '10px', background: 'transparent', color: 'inherit', font: 'inherit', fontSize: '13px', lineHeight: '20px', textAlign: 'left', cursor: 'pointer', overflow: 'hidden' }),
  c(`.dshp-scheduler__card:hover`, { background: hover }),
  c(`.dshp-scheduler__card--paused`, { opacity: '.6' }),
  c(`.dshp-scheduler__card-title`, { display: 'flex', alignItems: 'center', gap: '8px', margin: '0', fontSize: '13px', lineHeight: '18px', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__card-icon`, { flex: 'none', width: '16px', height: '16px', color: business }),
  c(`.dshp-scheduler__task-toggle`, { flex: 'none', display: 'inline-flex', marginTop: '2px', fontSize: '16px', color: tertiary, cursor: 'pointer' }),
  c(`.dshp-scheduler__task-toggle:hover`, { color: secondary }),
  c(`.dshp-scheduler__card-meta`, { display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }),
  c(`.dshp-scheduler__card-meta-text`, { flex: '1', minWidth: '0', color: tertiary, fontSize: '12px', lineHeight: '18px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__card-meta-text strong`, { color: secondary, fontWeight: '600' }),

  // —— 官方控件复刻：input / selectInput / textarea ——
  c(`.dshp-scheduler__input`, { boxSizing: 'border-box', border: `.5px solid ${borderL4}`, width: '100%', height: '32px', font: 'inherit', background: layer1, color: primary, borderRadius: '8px', padding: '0 10px', fontSize: '14px', lineHeight: '22px' }),
  c(`select.dshp-scheduler__input`, { cursor: 'pointer', maxWidth: '240px' }),
  c(`.dshp-scheduler__input:focus`, { borderColor: brand, outline: 'none' }),
  c(`.dshp-scheduler__input::placeholder`, { color: dimmed }),
  c(`.dshp-scheduler__input:disabled`, { opacity: '.6', cursor: 'default' }),
  c(`.dshp-scheduler__select-input`, { appearance: 'none', backgroundImage: chevronSvg, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '12px 12px', paddingRight: '32px' }),
  c(`.dshp-scheduler__textarea`, { boxSizing: 'border-box', border: `.5px solid ${borderL4}`, width: '100%', height: 'auto', minHeight: '240px', font: 'inherit', background: layer1, color: primary, borderRadius: '8px', padding: '10px', paddingBottom: '46px', fontSize: '14px', lineHeight: '1.55', resize: 'vertical', outline: 'none' }),
  c(`.dshp-scheduler__textarea:focus`, { borderColor: brand }),
  c(`.dshp-scheduler__textarea::placeholder`, { color: dimmed }),
  // —— 官方控件复刻：iconButton ——
  c(`.dshp-scheduler__icon-button:focus-visible`, focusRing),
  c(`.dshp-scheduler__icon-button`, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    padding: 0,
    border: 'none',
    borderRadius: '6px',
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary)',
    cursor: 'pointer',
    fontSize: '18px',
    lineHeight: '1',
  }, [
    c('&:hover', { background: 'var(--dsw-alias-interactive-bg-hover)' }),
  ]),

  // —— 官方控件复刻：36px 胶囊按钮（primary / secondary / danger）——
  c(`.dshp-scheduler__btn,.dshp-scheduler__btn--primary,.dshp-scheduler__btn--danger`, { boxSizing: 'border-box', height: '36px', font: 'inherit', cursor: 'pointer', border: 'none', borderRadius: '18px', justifyContent: 'center', alignItems: 'center', gap: '4px', padding: '0 14px', fontSize: '14px', lineHeight: '22px', display: 'inline-flex', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__btn`, { border: `.5px solid ${borderL3}`, color: primary, background: 'transparent' }),
  c(`.dshp-scheduler__btn:not(:disabled):hover`, { background: hoverSolid }),
  c(`.dshp-scheduler__btn--primary`, { background: primaryFill, color: primaryFg, borderColor: 'transparent' }),
  c(`.dshp-scheduler__btn--primary:not(:disabled):hover`, { background: primaryHover, borderColor: 'transparent' }),
  c(`.dshp-scheduler__btn--danger`, { color: error }),
  c(`.dshp-scheduler__btn--danger:not(:disabled):hover`, { background: hoverDanger }),
  c(`.dshp-scheduler__btn:disabled,.dshp-scheduler__btn--primary:disabled,.dshp-scheduler__btn--danger:disabled`, { opacity: '.4', cursor: 'default' }),
  c(`.dshp-scheduler__btn:focus-visible,.dshp-scheduler__btn--primary:focus-visible,.dshp-scheduler__btn--danger:focus-visible`, focusRing),

  // —— 官方控件复刻：字段 / 下拉 pill selector（LanguageRow selector，配 primitives Menu）——
  c(`.dshp-scheduler__field`, { flexDirection: 'column', gap: '2px', display: 'flex', minWidth: '0', fontSize: '13px' }),
  c(`.dshp-scheduler__field-label`, { color: secondary, alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '500', lineHeight: '18px', display: 'inline-flex' }),
  c(`.dshp-scheduler__inline`, { display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }),
  c(`.dshp-scheduler__inline-select`, { flex: '1', minWidth: '120px' }),
  c(`.dshp-scheduler__inline-select--auto`, { flex: 'none', width: 'auto', minWidth: '120px' }),
  c(`.dshp-scheduler__composer`, { position: 'absolute', left: '10px', bottom: '10px', display: 'flex', gap: '8px', alignItems: 'center', right: '10px' }),
  c(`.dshp-scheduler__prompt-wrap`, { position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }),
  c(`.dshp-scheduler__selector`, { background: modulePlatform, height: '36px', font: 'inherit', color: primary, cursor: 'pointer', border: 'none', borderRadius: '18px', alignItems: 'center', gap: '12px', padding: '0 14px', fontSize: '14px', lineHeight: '22px', display: 'inline-flex', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__selector:hover`, { background: hover }),
  c(`.dshp-scheduler__selector-chevron`, { flex: 'none' }),
  c(`.dshp-scheduler__selector-effort`, { color: tertiary, fontSize: '12px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }),

  // —— ModelPicker（照搬 dsh-automation create-modal ModelPicker 样式值）——
  c(`.dshp-scheduler__model-select`, { position: 'relative', zIndex: '1', minWidth: '0', flex: 'none', height: '28px' }),
  c(`.dshp-scheduler__model-select--open`, { zIndex: '30' }),
  c(`.dshp-scheduler__model-trigger`, { display: 'flex', alignItems: 'center', gap: '4px', minWidth: '0', maxWidth: '260px', height: '28px', padding: '0 4px 0 8px', border: '0', borderRadius: '24px', background: 'transparent', color: secondary, fontSize: '13px', fontWeight: '500', lineHeight: '20px', cursor: 'pointer' }),
  c(`.dshp-scheduler__model-trigger:hover`, { background: hover, color: primary }),
  c(`.dshp-scheduler__model-trigger > span:first-child`, { minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__model-trigger-effort`, { flex: 'none', color: tertiary, whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__model-trigger-chevron`, { flex: 'none', transition: 'transform .16s ease' }),
  c(`.dshp-scheduler__model-trigger-chevron--open`, { transform: 'rotate(180deg)' }),
  c(`.dshp-scheduler__model-select-menu`, { zIndex: '30', width: 'min(240px, calc(100vw - 32px))', maxHeight: 'min(360px, calc(100vh - 96px))', overflowY: 'auto', padding: '4px', border: `1px solid ${border}`, borderRadius: '12px', background: 'var(--dsw-specific-menu, var(--dsw-alias-bg-base))', boxShadow: 'var(--dsw-shadow-lv3)' }),
  c(`.dshp-scheduler__model-select-menu-float`, { position: 'absolute', zIndex: '1200', boxSizing: 'border-box' }),
  c(`.dshp-scheduler__model-select-menu .dshp-scheduler__menu-row`, { minHeight: '40px', padding: '0 10px', borderRadius: '10px', fontSize: '14px' }),
  c(`.dshp-scheduler__model-select-menu .dshp-scheduler__menu-row.is-kv .dshp-scheduler__menu-row-side`, { fontSize: '13px', color: tertiary }),
  c(`.dshp-scheduler__model-group + .dshp-scheduler__model-group`, { marginTop: '4px' }),
  c(`.dshp-scheduler__model-group-title`, { position: 'sticky', top: '0', zIndex: '1', padding: '5px 8px 3px', background: 'var(--dsw-specific-menu, var(--dsw-alias-bg-base))', color: tertiary, fontSize: '12px', fontWeight: '500', lineHeight: '18px' }),
  c(`.dshp-scheduler__model-option`, { display: 'flex', width: '100%', minHeight: '38px', alignItems: 'center', gap: '8px', padding: '6px 8px', border: '0', borderRadius: '10px', background: 'transparent', color: primary, textAlign: 'left', cursor: 'pointer' }),
  c(`.dshp-scheduler__model-option:hover, .dshp-scheduler__model-option:focus-visible`, { background: hover, outline: 'none' }),
  c(`.dshp-scheduler__model-option-copy`, { display: 'flex', minWidth: '0', flex: '1', flexDirection: 'column' }),
  c(`.dshp-scheduler__model-name`, { overflow: 'hidden', fontSize: '14px', fontWeight: '500', lineHeight: '20px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__model-description`, { overflow: 'hidden', color: tertiary, fontSize: '12px', lineHeight: '18px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__model-check`, { display: 'grid', flex: '0 0 18px', placeItems: 'center', color: primary }),
  c(`.dshp-scheduler__model-warning`, { margin: '4px', padding: '8px', borderRadius: '8px', background: 'var(--dsw-alias-interactive-bg-hover-danger, rgba(248,81,73,.1))', color: 'var(--dsw-alias-state-error-primary, #f85149)', fontSize: '12px', lineHeight: '18px' }),
  c(`.dshp-scheduler__model-empty`, { padding: '14px 12px', color: tertiary, fontSize: '12px', textAlign: 'center' }),

  // —— menu 基础设施（照搬 dsh-automation menu 样式值）——
  c(`.dshp-scheduler__menu-row`, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', width: '100%', padding: '8px 10px', border: '0', borderRadius: '10px', background: 'transparent', color: 'inherit', textAlign: 'left', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__menu-row:hover, .dshp-scheduler__menu-row.is-on`, { background: 'var(--dsw-alias-interactive-bg-hover, rgba(255,255,255,.06))' }),
  c(`.dshp-scheduler__menu-row.is-kv .dshp-scheduler__menu-row-main`, { flex: 'none' }),
  c(`.dshp-scheduler__menu-row.is-kv .dshp-scheduler__menu-row-side`, { flex: '1', justifyContent: 'flex-end', minWidth: '0' }),
  c(`.dshp-scheduler__menu-row-main`, { display: 'inline-flex', alignItems: 'center', gap: '8px', minWidth: '0' }),
  c(`.dshp-scheduler__menu-row-side`, { display: 'inline-flex', alignItems: 'center', gap: '8px', color: secondary, fontSize: '12px' }),
  c(`.dshp-scheduler__menu-tick, .dshp-scheduler__menu-next`, { width: '7px', height: '11px', borderRight: '1.6px solid currentColor', borderBottom: '1.6px solid currentColor', flex: 'none' }),
  c(`.dshp-scheduler__menu-tick`, { height: '12px', width: '6px', transform: 'rotate(45deg) translateY(-2px)', borderRightColor: '#7aa2ff', borderBottomColor: '#7aa2ff' }),
  c(`.dshp-scheduler__menu-next`, { height: '7px', transform: 'rotate(-45deg)', opacity: '.55' }),
  c(`.dshp-scheduler__menu-float`, { position: 'absolute', zIndex: '1200' }),
  c(`.dshp-scheduler__menu-select`, { position: 'relative', minWidth: '108px', zIndex: '1' }),
  c(`.dshp-scheduler__menu-select.is-open`, { zIndex: '30' }),
  c(`.dshp-scheduler__menu-select-btn`, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', minHeight: '36px', width: '100%', padding: '0 12px', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: '12px', background: 'rgba(255,255,255,.04)', color: 'inherit', cursor: 'pointer' }),
  c(`.dshp-scheduler__menu-select-btn em, .dshp-scheduler__chip-btn em`, { width: '6px', height: '6px', marginLeft: '2px', opacity: '.55', borderRight: '1.5px solid currentColor', borderBottom: '1.5px solid currentColor', transform: 'rotate(45deg) translateY(-2px)' }),
  c(`.dshp-scheduler__menu-select.is-pill`, { width: 'auto', minWidth: '0', flex: 'none' }),
  c(`.dshp-scheduler__menu-select.is-pill .dshp-scheduler__menu-select-btn`, { width: 'auto', minHeight: '28px', height: '28px', padding: '0 8px', border: '0', borderRadius: '8px', background: 'transparent', color: secondary, fontSize: '13px', fontWeight: '500', gap: '6px', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__menu-select.is-pill .dshp-scheduler__menu-select-btn:hover`, { background: 'rgba(255,255,255,.06)', color: primary }),
  c(`.dshp-scheduler__menu-select-menu`, { position: 'absolute', top: 'calc(100% + 6px)', left: '0', zIndex: '30', minWidth: '196px', maxHeight: '280px', overflow: 'auto', padding: '6px', border: '1px solid rgba(255,255,255,.08)', borderRadius: '14px', background: 'var(--dsw-alias-bg-base, #2a2c31)', boxShadow: '0 16px 40px rgba(0,0,0,.42)' }),
  c(`.dshp-scheduler__menu-select-menu.is-up`, { top: 'auto', bottom: 'calc(100% + 6px)' }),
  c(`.dshp-scheduler__menu-select-menu.is-end`, { left: 'auto', right: '0' }),
  c(`.dshp-scheduler__chip-btn`, { display: 'inline-flex', alignItems: 'center', gap: '6px', minHeight: '28px', height: '28px', padding: '0 8px', border: '0', borderRadius: '8px', background: 'transparent', color: secondary, fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap', cursor: 'pointer' }),
  c(`.dshp-scheduler__chip-btn:hover`, { background: 'rgba(255,255,255,.06)', color: primary }),
  c(`.dshp-scheduler__flyout-root`, { position: 'absolute', inset: '0', zIndex: '1200', overflow: 'visible', pointerEvents: 'none' }),
  c(`.dshp-scheduler__flyout-root .dshp-scheduler__menu-select-menu, .dshp-scheduler__flyout-root .dshp-scheduler__model-select-menu`, { pointerEvents: 'auto' }),

  // —— 状态文案 ——
  c(`.dshp-scheduler__error`, { color: error, margin: '0', fontSize: '12px', lineHeight: '18px' }),
  c(`.dshp-scheduler__empty`, { margin: '0', padding: '48px 0', color: tertiary, fontSize: '13px', textAlign: 'center' }),
  c(`.dshp-scheduler__muted`, { margin: '0', color: secondary, fontSize: '12px' }),

  // —— 执行记录 ——
  c(`.dshp-scheduler__runs-toolbar`, { display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }),
  c(`.dshp-scheduler__runs-list`, { display: 'flex', flexDirection: 'column', gap: '8px', margin: '0', padding: '0', listStyle: 'none' }),
  c(`.dshp-scheduler__run-row`, { boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', width: '100%', minWidth: '0', minHeight: '60px', padding: '10px 12px', border: `1px solid ${border}`, borderRadius: '10px', background: 'transparent', color: 'inherit', fontSize: '13px', lineHeight: '20px', textAlign: 'left', overflow: 'hidden' }),
  c(`.dshp-scheduler__run-main`, { display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0', overflow: 'hidden' }),
  c(`.dshp-scheduler__run-meta`, { display: 'flex', alignItems: 'center', gap: '4px', minWidth: '0', flexShrink: '0' }),
  c(`.dshp-scheduler__run-name`, { display: 'block', minWidth: '0', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__run-time`, { color: tertiary, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__run-delete`, { border: 'none', background: 'transparent', color: tertiary, cursor: 'pointer', font: 'inherit', fontSize: '12px', padding: '2px 4px' }),
  c(`.dshp-scheduler__run-delete:hover`, { color: error }),
  c(`.dshp-scheduler__run-error`, { width: '100%', margin: '0', color: error, fontSize: '12px', lineHeight: '16px', whiteSpace: 'pre-wrap' }),
  c(`.dshp-scheduler__chip`, { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px', borderRadius: '999px', background: layer3, color: secondary, fontSize: '12px', whiteSpace: 'nowrap' }),
  c(`.dshp-scheduler__chip[data-status='succeeded']`, { background: `color-mix(in srgb,${success} 12%,transparent)`, color: success }),
  c(`.dshp-scheduler__chip[data-status='failed']`, { background: `color-mix(in srgb,${error} 12%,transparent)`, color: error }),
  c(`.dshp-scheduler__chip[data-status='running'],.dshp-scheduler__chip[data-status='queued']`, { background: `color-mix(in srgb,${business} 12%,transparent)`, color: business }),

  // —— 推荐（预置）定时任务 ——
  c(`.dshp-scheduler__recs`, { marginTop: '24px' }),
  c(`.dshp-scheduler__recs-title`, { margin: '0 0 10px', fontSize: '13px', lineHeight: '18px', fontWeight: '600', color: secondary }),
  c(`.dshp-scheduler__recs-list`, { display: 'flex', flexDirection: 'column', gap: '8px', margin: '0', padding: '0', listStyle: 'none' }),
  c(`.dshp-scheduler__recs-item`, { boxSizing: 'border-box', display: 'flex', alignItems: 'flex-start', gap: '10px', width: '100%', minWidth: '0', padding: '10px 12px', border: `1px solid ${border}`, borderRadius: '10px', background: 'transparent', color: 'inherit', font: 'inherit', fontSize: '13px', lineHeight: '20px', textAlign: 'left', cursor: 'pointer' }),
  c(`.dshp-scheduler__recs-item:hover`, { background: hover }),

  c(`.dshp-scheduler__recs-icon`, { flex: 'none', display: 'inline-flex', marginTop: '2px', fontSize: '16px' }),
  c(`.dshp-scheduler__recs-body`, { display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }),
  c(`.dshp-scheduler__recs-name`, { color: primary, fontSize: '13px', lineHeight: '18px', fontWeight: '500' }),
  c(`.dshp-scheduler__recs-name strong`, { color: secondary, fontWeight: '600' }),
  c(`.dshp-scheduler__recs-prompt`, { color: tertiary, fontSize: '12px', lineHeight: '18px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
])
