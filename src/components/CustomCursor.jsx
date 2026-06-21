import { useEffect, useRef, useState } from 'react'

// A small dot cursor with a trailing ring. Disabled on touch devices.
export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // only on devices with a fine pointer (mouse)
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let raf

    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      }
    }

    const hoverable = 'a, button, [data-cursor="hover"]'
    const over = (e) => {
      if (e.target.closest(hoverable) && ring.current) {
        ring.current.classList.add('cursor-ring--active')
      }
    }
    const out = (e) => {
      if (e.target.closest(hoverable) && ring.current) {
        ring.current.classList.remove('cursor-ring--active')
      }
    }

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerout', out)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerout', out)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <style>{`
        .cursor-dot, .cursor-ring {
          position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
          margin-left: -4px; margin-top: -4px; will-change: transform;
        }
        .cursor-dot { width: 8px; height: 8px; border-radius: 999px;
          background: #7dd3fc; box-shadow: 0 0 12px rgba(56,189,248,0.9); }
        .cursor-ring { width: 38px; height: 38px; margin-left: -19px; margin-top: -19px;
          border-radius: 999px; border: 1px solid rgba(125,211,252,0.5);
          transition: width .25s, height .25s, margin .25s, border-color .25s, background .25s; }
        .cursor-ring--active { width: 64px; height: 64px; margin-left: -32px; margin-top: -32px;
          border-color: rgba(129,140,248,0.8); background: rgba(56,189,248,0.06); }
        /* hide the native cursor only while the custom one is active */
        html { cursor: none; }
        input, textarea, select, [contenteditable="true"] { cursor: auto; }
        @media (pointer: coarse) { .cursor-dot, .cursor-ring { display: none; } html { cursor: auto; } }
      `}</style>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
