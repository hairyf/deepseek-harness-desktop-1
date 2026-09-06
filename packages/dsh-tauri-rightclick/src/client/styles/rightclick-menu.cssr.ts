import { cssr } from 'dsh-tauri-ui/client'

const { c, bem: { b, e, m } } = cssr

/** 右键菜单：固定定位浮层 + 行项/快捷键/分隔线（DOM 结构见 dom/menu-item.ts）。 */
export default b('menu', {
  position: 'fixed',
  zIndex: 2147483647,
  width: 'max-content',
  minWidth: '148px',
  maxWidth: '260px',
  padding: '4px',
  background: 'var(--dsw-alias-bg-layer-2, #fff)',
  color: 'var(--dsw-alias-label-primary, #161616)',
  border: '1px solid var(--dsw-alias-border-l2, #ddd)',
  borderRadius: '7px',
  boxShadow: '0 5px 16px #00000029',
  font: '13px/18px system-ui, sans-serif',
}, [
  e('item', {
    boxSizing: 'border-box',
    width: '100%',
    height: '30px',
    padding: '0 8px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    color: 'inherit',
    background: 'transparent',
    border: '0',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, [
    c('&:hover, &:focus-visible', {
      background: 'var(--dsw-alias-interactive-bg-hover, #0000000f)',
      outline: 'none',
    }),
    m('danger', {
      color: 'var(--dsw-alias-state-error-primary, #d93025)',
    }),
  ]),
  e('shortcut', {
    color: 'var(--dsw-alias-label-tertiary, #777)',
    fontSize: '11px',
  }),
  e('separator', {
    height: '1px',
    margin: '4px -4px',
    background: 'var(--dsw-alias-border-l2, #ddd)',
  }),
])
