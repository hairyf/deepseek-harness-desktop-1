/**
 * styles/index.ts — 桌宠侧栏入口 + 设置分区样式（css-render，apply() effect 内 mount）。
 *
 * 侧栏入口按钮复刻官方 `.rtSEdW_iconButton`（appearance/color/border-radius/
 * padding/hover/focus-visible 与 data-tip 气泡），并叠加右上角绿色激活圆点；
 * 设置行布局复刻新版 dsh 客户端 SettingsRoot 的 triggerRow（flex 行 + gap，
 * 齿轮与行内图标同一行）——规则全部拆成单选择器（不依赖 data-slot 包裹层，
 * 由补丁直接给宿主加 .dshp-pet__settings-row 并同步内联样式兜底）；
 * 设置分区遵循 issue #308 规范稿：页签 + 工具栏 + 描述 + 卡片列表，全部走
 * `--dsw-alias-*` 主题变量，明暗主题自适应。
 */
import { cssr } from 'dsh-tauri-ui/client'

const { c } = cssr

export default c([
  // ── 侧栏入口：官方 iconButton 复刻（插在 .dshp-settings-trigger 右侧）──
  c('.dshp-pet__icon-button', {
    appearance: 'none',
    color: 'var(--dsw-alias-label-tertiary)',
    cursor: 'pointer',
    background: '0 0',
    border: '0',
    borderRadius: '7px',
    alignItems: 'center',
    padding: '6px',
    display: 'inline-flex',
    position: 'relative',
    pointerEvents: 'auto',
  }, [
    c('&:disabled', { opacity: '0.4', cursor: 'default' }),
    c('&:hover:not(:disabled)', {
      background: 'var(--dsw-alias-bg-layer-1)',
      color: 'var(--dsw-alias-label-primary)',
    }),
    c('&:focus-visible', {
      outline: '2px solid var(--dsw-alias-brand-primary)',
      outlineOffset: '-1px',
    }),
  ]),
  // data-tip 气泡（同官方 iconButton 的 :after 提示位）。
  c('.dshp-pet__icon-button::after', {
    content: 'attr(data-tip)',
    position: 'absolute',
    bottom: 'calc(100% + 6px)',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--dsw-alias-label-primary)',
    color: 'var(--dsw-alias-bg-layer-3, #fff)',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.15s ease',
    zIndex: '10',
  }),
  c('.dshp-pet__icon-button:hover::after, .dshp-pet__icon-button:focus-visible::after', { opacity: '1' }),
  // 未选择宠物提示：点击时短暂强制显示气泡（与 hover 共用同一 data-tip 气泡）。
  c('.dshp-pet__icon-button.dshp-pet__icon-hint::after', { opacity: '1' }),
  // 激活态绿色小圆点（右上角），未激活时隐藏。
  c('.dshp-pet__icon-dot', {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--dsw-alias-state-success-primary, #3ddc84)',
    display: 'none',
  }),
  c('.dshp-pet__icon-button.dshp-pet__icon--on .dshp-pet__icon-dot', { display: 'block' }),

  // ── 设置行布局：复刻新版 dsh 客户端 SettingsRoot 的 triggerRow（flex 行）──
  // 旧版客户端 sidebar.settings 是通栏块级触发器，图标按钮直接插会被挤到下
  // 一行；补丁给触发器宿主加 .dshp-pet__settings-row（并同步内联 display:flex 兜
  // 底），触发器占满剩余宽度、图标排右侧，行内 gap 对齐官方排布。
  c('.dshp-pet__settings-row', {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
  }),
  c('.dshp-pet__settings-row > .dshp-settings-trigger:not(.dshp-settings-trigger--rail)', {
    flex: '1 1 auto',
    width: 'auto',
    minWidth: '0',
  }),
  c('.dshp-pet__settings-row > .dshp-pet__icon-button', {
    flex: 'none',
    marginRight: '2px',
  }),

  // ── 设置分区（settings.section）：页签 + 工具栏 + 描述 + 卡片，不自设宽度 ──
  c('.dshp-pet__page', {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    color: 'var(--dsw-alias-label-primary)',
  }),
  c('.dshp-pet__tabs', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
    margin: '4px 0 14px',
    borderBottom: '1px solid var(--dsw-alias-border-l2)',
  }),
  c('.dshp-pet__tab-list', { display: 'flex', alignItems: 'center', gap: '16px' }),
  c('.dshp-pet__tab-btn', {
    appearance: 'none',
    background: 'transparent',
    color: 'var(--dsw-alias-label-secondary)',
    font: 'inherit',
    fontSize: '13px',
    lineHeight: '1.5',
    border: '0',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    padding: '8px 0',
  }, [
    c('&:hover', { color: 'var(--dsw-alias-label-primary)' }),
  ]),
  c('.dshp-pet__tab-btn.dshp-pet__tab-btnActive', {
    borderBottomColor: 'currentColor',
    color: 'var(--dsw-alias-label-primary)',
    fontWeight: '650',
  }),
  c('.dshp-pet__tab-tools', { display: 'flex', alignItems: 'center', gap: '6px' }),
  // —— 工具栏按钮：小型 secondary（与 .dshp-pet__card-action 小号按钮一致的几何/令牌）——
  // 官方 `.zGbnIq_secondaryButton`（36px 胶囊）在本工具栏过大会挤压页签行，故取
  // 与卡片操作按钮同尺寸的小号 secondary（28px，radius 8px，12px/18px 字体），
  // 仍走 `--dsw-*` 令牌使浅/深色自适应，并保留官方共用焦点环。
  c('.dshp-pet__tool-btn', {
    flex: 'none',
    appearance: 'none',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '8px',
    border: '1px solid var(--dsw-alias-border-weak, rgba(127,127,127,0.2))',
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary)',
    fontSize: '12px',
    lineHeight: '18px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',
  }, [
    c('&:hover:not(:disabled)', { background: 'var(--dsw-alias-interactive-bg-hover)' }),
    c('&:disabled', { opacity: '0.4', cursor: 'default' }),
    c('&:focus-visible', {
      boxShadow: '0 0 0 2px var(--dsw-alias-border-l3)',
      outline: 'none',
    }),
  ]),
  c('.dshp-pet__tab-desc', {
    margin: '0',
    fontSize: '13px',
    lineHeight: '20px',
    color: 'var(--dsw-alias-label-secondary, var(--dsw-alias-label-primary))',
  }),
  c('.dshp-pet__divider', {
    border: '0',
    borderTop: '1px solid var(--dsw-alias-border-weak, rgba(127,127,127,0.2))',
  }),
  c('.dshp-pet__size-row', { display: 'flex', alignItems: 'center', gap: '12px' }),
  c('.dshp-pet__size-label', { flex: 'none', fontWeight: '500' }),
  c('.dshp-pet__size-slider', {
    flex: '1',
    accentColor: 'var(--dsw-alias-brand-primary)',
    cursor: 'pointer',
  }),
  c('.dshp-pet__hint', {
    margin: '0',
    fontSize: '12px',
    lineHeight: '18px',
    color: 'var(--dsw-alias-label-secondary, var(--dsw-alias-label-primary))',
  }),
  c('.dshp-pet__cards', { display: 'flex', flexDirection: 'column', gap: '12px' }),
  c('.dshp-pet__card-item', {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid var(--dsw-alias-border-weak, rgba(127,127,127,0.2))',
    background: 'var(--dsw-alias-bg-base)',
  }),
  c('.dshp-pet__card-thumb', {
    flex: 'none',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    borderRadius: '10px',
    background: 'var(--dsw-alias-bg-layer-1)',
    overflow: 'hidden',
    objectFit: 'cover',
  }),
  c('.dshp-pet__card-thumb > img', {
    display: 'block',
    width: '100%',
    height: '100%',
  }),
  c('.dshp-pet__card-thumbSprite', {
    position: 'relative',
  }, [
    c('& > img', {
      position: 'absolute',
      width: '800%',
      height: '1100%',
      maxWidth: 'none',
      objectFit: 'fill',
      left: '0',
      top: '0',
    }),
  ]),
  c('.dshp-pet__card-body', {
    flex: '1',
    minWidth: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  }),
  c('.dshp-pet__card-nameRow', {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    minWidth: '0',
  }),
  c('.dshp-pet__card-name', { fontWeight: '600', fontSize: '14px', lineHeight: '20px', minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  // 名字旁的下载尺寸标签（`[number]mb`）。
  c('.dshp-pet__cardsize', {
    flex: 'none',
    fontSize: '11px',
    lineHeight: '16px',
    padding: '0 6px',
    borderRadius: '999px',
    border: '1px solid var(--dsw-alias-border-weak, rgba(127,127,127,0.2))',
    color: 'var(--dsw-alias-label-secondary, var(--dsw-alias-label-primary))',
    background: 'var(--dsw-alias-bg-layer-1)',
  }),
  c('.dshp-pet__card-desc', {
    fontSize: '12px',
    lineHeight: '18px',
    color: 'var(--dsw-alias-label-secondary, var(--dsw-alias-label-primary))',
  }),
  // 描述下方的下载进度条（预设宠物下载/解压中显示）。
  c('.dshp-pet__card-progress', {
    display: 'block',
    width: '100%',
    height: '4px',
    borderRadius: '999px',
    background: 'var(--dsw-alias-bg-layer-1)',
    overflow: 'hidden',
    marginTop: '4px',
  }),
  c('.dshp-pet__card-progressFill', {
    display: 'block',
    height: '100%',
    borderRadius: '999px',
    background: 'var(--dsw-alias-brand-primary)',
    transition: 'width 0.15s ease',
  }),
  c('.dshp-pet__card-progressIndeterminate', {
    width: '40%',
    animation: 'dshp-pet__progress-indeterminate 1.2s ease-in-out infinite',
  }),
  c('@keyframes dshp-pet__progress-indeterminate', {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(250%)' },
  }),
  c('.dshp-pet__card-action', {
    flex: 'none',
    appearance: 'none',
    cursor: 'pointer',
    padding: '5px 14px',
    borderRadius: '8px',
    border: '1px solid var(--dsw-alias-border-weak, rgba(127,127,127,0.2))',
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary)',
    fontSize: '12px',
    lineHeight: '18px',
  }, [
    c('&:hover:not(:disabled)', { background: 'var(--dsw-alias-interactive-bg-hover)' }),
    c('&:disabled', { opacity: '0.4', cursor: 'default' }),
  ]),
  c('.dshp-pet__card-action.dshp-pet__card-actionActive', {
    borderColor: 'var(--dsw-alias-brand-primary)',
    color: 'var(--dsw-alias-brand-primary)',
    background: 'var(--dsw-alias-interactive-bg-hover)',
  }),
  c('.dshp-pet__empty', {
    padding: '24px 16px',
    textAlign: 'center',
    fontSize: '13px',
    lineHeight: '20px',
    borderRadius: '12px',
    border: '1px dashed var(--dsw-alias-border-weak, rgba(127,127,127,0.2))',
    color: 'var(--dsw-alias-label-secondary, var(--dsw-alias-label-primary))',
  }),
  // 初次加载占位（首次打开设置页、清单尚未到达时显示，避免空卡片闪烁）。
  c('.dshp-pet__loading', {
    padding: '24px 16px',
    textAlign: 'center',
    fontSize: '13px',
    lineHeight: '20px',
    color: 'var(--dsw-alias-label-secondary, var(--dsw-alias-label-primary))',
  }),
  c('.dshp-pet__error', {
    fontSize: '12px',
    lineHeight: '18px',
    color: 'var(--dsw-alias-state-error-primary, var(--dsw-alias-danger-text, #ff7a7a))',
  }),
])
