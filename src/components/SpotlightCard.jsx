import { useRef, useState } from 'react'

// Card that shows a cursor-following glow and an optional 3D tilt on hover.
export default function SpotlightCard({
  children,
  className = '',
  tilt = false,
  glowColor = 'rgba(56,189,248,0.15)',
}) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setGlow({ x: px * 100, y: py * 100, on: true })
    if (tilt) {
      const rx = (py - 0.5) * -10
      const ry = (px - 0.5) * 10
      setStyle({
        transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
      })
    }
  }

  const onLeave = () => {
    setGlow((g) => ({ ...g, on: false }))
    if (tilt) setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)' })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, transition: 'transform 0.25s ease-out' }}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, ${glowColor}, transparent 45%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
