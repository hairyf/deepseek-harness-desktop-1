import { cssr, styles as sharedStyles } from 'dsh-tauri-ui/client'

const { c, bem: { b, e } } = cssr
const { primary, secondary, tertiary, borderL2: border, business, layer1, hover } = sharedStyles

/** MCP 列表（mcp-tab.tsx）：格式分段 + 标签 chips + 开关 + 链接。 */
export default b('extension', [
  e('segments', {
    display: 'inline-flex',
    gap: '4px',
    border: `1px solid ${border}`,
    borderRadius: '8px',
    padding: '3px',
    background: layer1,
  }),
  e('segment', {
    border: '0',
    borderRadius: '6px',
    padding: '4px 14px',
    background: 'transparent',
    color: secondary,
    font: 'inherit',
    fontSize: '12px',
    cursor: 'pointer',
  }, [
    c('&[data-active="true"]', { background: hover, color: primary, fontWeight: '600' }),
  ]),
  e('format', {
    border: `1px solid ${border}`,
    borderRadius: '8px',
    padding: '8px 12px',
    background: layer1,
  }, [
    c('& summary', { fontSize: '12px', color: secondary, cursor: 'pointer' }),
  ]),
  e('format-hint', { margin: '2px 0 0', fontSize: '12px', color: tertiary }),
  e('chips', { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }),
  e('chip', {
    border: `1px solid ${border}`,
    borderRadius: '999px',
    padding: '2px 10px',
    background: 'transparent',
    color: secondary,
    font: 'inherit',
    fontSize: '12px',
    cursor: 'pointer',
  }, [
    c('&:hover, &[data-active="true"]', { color: business, background: hover }),
  ]),
  e('switch', {
    position: 'relative',
    flex: 'none',
    width: '30px',
    height: '18px',
    border: '0',
    borderRadius: '999px',
    background: layer1,
    boxShadow: `inset 0 0 0 1px ${border}`,
    cursor: 'pointer',
  }, [
    c('&[aria-checked="true"]', {
      background: `color-mix(in srgb,${business} 55%,transparent)`,
      boxShadow: 'none',
    }),
    c('&[aria-checked="true"] .dshp-extension__switch-knob', { left: '14px', background: '#fff' }),
  ]),
  e('switch-knob', {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: primary,
    transition: 'left .15s',
  }),
  e('link', {
    border: '0',
    padding: '0',
    background: 'transparent',
    font: 'inherit',
    fontSize: '12px',
    lineHeight: '18px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: business,
  }, [
    c('&:hover', { textDecoration: 'underline' }),
  ]),
])
