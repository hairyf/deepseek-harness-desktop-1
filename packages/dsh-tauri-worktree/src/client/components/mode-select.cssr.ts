import { cssr } from 'dsh-tauri-ui/client'

const { c, bem: { b, e, m } } = cssr

/** 会话工作模式选择器（mode-select.tsx）：trigger + host 定位。 */
export default b('mode-select', [
  e('trigger', {
    boxSizing: 'border-box',
    maxWidth: '240px',
    minHeight: '28px',
    padding: '0 8px',
    border: 'none',
    borderRadius: '16px',
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary)',
    fontFamily: 'var(--dsw-font-family, inherit)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '20px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',
  }, [
    c('&:hover', { background: 'var(--dsw-alias-interactive-bg-hover)' }),
    m('open', { background: 'var(--dsw-alias-interactive-bg-hover)' }),
  ]),
  e('icon', { color: 'var(--dsw-alias-label-primary)', display: 'inline-flex', flex: 'none' }),
  e('chevron', { color: 'var(--dsw-alias-label-caption)', flex: 'none' }),
  // host 现在是 .tools 的直接 flex 子元素（gap 16px）；flex:none 防止长文案触发被压缩、
  // 以及部分浏览器对 inline-flex 的收缩行为导致控件宽度塌陷。
  e('host', { display: 'inline-flex', alignItems: 'center', flex: 'none' }),
  e('anchor', { display: 'none' }),
])
