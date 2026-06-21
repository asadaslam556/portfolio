import { useEffect } from 'react'

// Fixed, full-viewport decorative background that sits behind everything.
export default function BackgroundFX() {
  useEffect(() => {
    let raf = 0
    let nx = 0
    let ny = 0
    const onMove = (e) => {
      nx = e.clientX
      ny = e.clientY
      if (!raf) {
        raf = requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mx', `${nx}px`)
          document.documentElement.style.setProperty('--my', `${ny}px`)
          raf = 0
        })
      }
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base color */}
      <div className="absolute inset-0 bg-void" />

      {/* dotted grid */}
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* aurora glows: radial gradients instead of huge blur() filters.
          Same soft look, but no costly blur compositing (smooth on mobile/iOS). */}
      <div
        className="absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.20), transparent 70%)' }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.20), transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)' }}
      />

      {/* cursor-following spotlight */}
      <div className="absolute inset-0 spotlight" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,4,10,0.9)_100%)]" />
    </div>
  )
}
