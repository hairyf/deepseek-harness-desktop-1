import { cssr, styles as sharedStyles } from 'dsh-tauri-ui/client'

const { c, bem: { b, e } } = cssr
const { primary, secondary, tertiary, borderL2: border, business, layer3, hover } = sharedStyles

/** 技能列表（skills-tab.tsx）：头部 + 横幅 + 刷新。 */
export default b('extension', [
  e('head', {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  }, [
    c('& h3', { margin: '0', fontSize: '13px', lineHeight: '20px', fontWeight: '600' }),
    c('& > svg', { flex: 'none', color: tertiary }),
  ]),
  e('list-head', {
    display: 'flex',
    alignItems: 'baseline',
    gap: '7px',
    padding: '0 2px',
    marginTop: '2px',
  }, [
    c('& h3', { margin: '0', fontSize: '13px', lineHeight: '20px', fontWeight: '600' }),
  ]),
  e('count', { fontSize: '12px', lineHeight: '18px', color: tertiary, fontVariantNumeric: 'tabular-nums' }),
  e('refresh', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '26px',
    height: '26px',
    border: '0',
    borderRadius: '6px',
    background: 'transparent',
    color: tertiary,
    cursor: 'pointer',
    textDecoration: 'none',
  }, [
    c('&:hover', { background: hover, color: primary }),
    c('&:focus-visible', { outline: `2px solid ${business}`, outlineOffset: '-2px' }),
  ]),
  e('icon-link', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '26px',
    height: '26px',
    border: '0',
    borderRadius: '6px',
    background: 'transparent',
    color: tertiary,
    cursor: 'pointer',
    textDecoration: 'none',
  }, [
    c('&:hover', { background: hover, color: primary }),
    c('&:focus-visible', { outline: `2px solid ${business}`, outlineOffset: '-2px' }),
  ]),
  e('banner', {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    border: `1px solid ${border}`,
    borderRadius: '8px',
    padding: '10px 12px',
    background: layer3,
    fontSize: '13px',
    lineHeight: '20px',
  }, [
    c('&[data-kind="ok"]', {
      borderColor: 'color-mix(in srgb,var(--dsw-alias-state-success-primary) 35%,transparent)',
      background: 'color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent)',
    }),
    c('&[data-kind="error"]', {
      borderColor: 'color-mix(in srgb,var(--dsw-alias-state-error-primary) 35%,transparent)',
      background: 'color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent)',
    }),
    c('&[data-kind="info"]', {
      borderColor: `color-mix(in srgb,${business} 35%,transparent)`,
      background: `color-mix(in srgb,${business} 8%,transparent)`,
    }),
  ]),
  e('banner-body', { flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '4px' }),
  e('banner-hint', {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    color: secondary,
    fontSize: '12px',
    lineHeight: '18px',
  }),
])
