import { cssr } from 'dsh-tauri-ui/client'

const { c, bem: { b, e } } = cssr

/**
 * 内容宽度拖拽手柄（width-handle.tsx）：绝对定位在内容列两侧 24px 外，
 * 宽度自适应（列宽 − 内容宽的一半再减两个 24px inset，最多 40px）；
 * hover/拖动时发光条跟随指针 Y（--dsh-width-handle-pointer-y）。
 */
export default b('panel', [
  e('width-handle', {
    zIndex: 8,
    width: 'min(40px, calc((100% - var(--dsh-chat-content-width)) / 2 - 24px - 24px))',
    cursor: 'col-resize',
    position: 'absolute',
    top: 0,
    bottom: 0,
  }, [
    c('&[data-side="left"]', { right: 'calc(50% + var(--dsh-chat-content-width) / 2 + 24px)' }),
    c('&[data-side="right"]', { left: 'calc(50% + var(--dsh-chat-content-width) / 2 + 24px)' }),
    c('&:after', {
      content: '""',
      background: 'linear-gradient(to bottom, transparent calc(var(--dsh-width-handle-pointer-y, 50%) - 52px), var(--dsw-alias-scrollbar-hover-l1) calc(var(--dsh-width-handle-pointer-y, 50%) - 12px), var(--dsw-alias-scrollbar-hover-l1) calc(var(--dsh-width-handle-pointer-y, 50%) + 12px), transparent calc(var(--dsh-width-handle-pointer-y, 50%) + 52px))',
      opacity: 0,
      pointerEvents: 'none',
      borderRadius: '3px',
      width: '3px',
      position: 'absolute',
      top: 0,
      bottom: 0,
    }),
    c('&[data-side="left"]:after', { right: '16px' }),
    c('&[data-side="right"]:after', { left: '16px' }),
    c('&:hover:after, &[data-dragging]:after', { opacity: 1 }),
  ]),
])
