import { cssr } from 'dsh-tauri-ui/client'

const { bem: { b, e } } = cssr

/** 会话区替换视图（conversation-seat.tsx）：内容列居中。 */
export default b('panel', [
  e('panel-view', {
    'height': '100%',
    'boxSizing': 'border-box',
    'minWidth': 0,
    'overflowY': 'auto',
    'scrollbarGutter': 'stable',
    'position': 'relative',
    // 内容宽度派生（自给自足镜像 alpha）：有拖拽偏好用偏好，否则自适应
    // clamp(680px, col*0.64, 920px)；列宽与偏好由 width 控制器发布。
    '--dsh-chat-content-width': 'var(--dsh-chat-user-width, clamp(680px, calc(var(--dsh-conversation-column-width, 0px) * .64), 920px))',
  }),
  e('panel-view-column', {
    maxWidth: 'var(--dsh-chat-content-width,780px)',
    minHeight: '100%',
    width: '100%',
    margin: '0 auto',
    flexDirection: 'column',
    gap: '16px',
    display: 'flex',
  }),
])
