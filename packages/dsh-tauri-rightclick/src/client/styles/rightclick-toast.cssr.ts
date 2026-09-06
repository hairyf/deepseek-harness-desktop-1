import { cssr } from 'dsh-tauri-ui/client'

const { bem: { b } } = cssr

/** 右键动作反馈 toast（固定定位，底部居中）。 */
export default b('toast', {
  position: 'fixed',
  zIndex: 2147483647,
  left: '50%',
  bottom: '28px',
  transform: 'translateX(-50%)',
  padding: '7px 12px',
  borderRadius: '7px',
  background: '#222',
  color: '#fff',
  font: '13px/18px system-ui, sans-serif',
  boxShadow: '0 6px 20px #0003',
})
