import { cssr } from '../cssr'
import { styles as sharedStyles } from '../theme'

const { c, bem: { b, m } } = cssr
const { primary, secondary, hover, modulePlatform } = sharedStyles

/** 共享 MenuSelect 触发按钮（default 36px 胶囊；pill 28px 浅触发）。 */
export default b('menu-select', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  minHeight: '36px',
  padding: '0 14px',
  border: 'none',
  borderRadius: '18px',
  background: modulePlatform,
  color: primary,
  cursor: 'pointer',
  font: 'inherit',
  whiteSpace: 'nowrap',
}, [
  c('&:hover', { background: hover }),
  c('& > span', {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  c('& > svg', { flex: 'none' }),
  m('pill', {
    minHeight: '28px',
    height: '28px',
    padding: '0 8px',
    borderRadius: '8px',
    background: 'transparent',
    color: secondary,
    fontSize: '13px',
    fontWeight: '500',
    gap: '6px',
  }, [
    c('&:hover', {
      background: hover,
      color: primary,
    }),
  ]),
])
