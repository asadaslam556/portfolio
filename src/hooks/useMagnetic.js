import { useRef, useState, useCallback } from 'react'

// Returns ref + handlers that pull an element toward the cursor (magnetic effect).
// intensity: higher = subtler. A value around 4 is a good default.
export function useMagnetic(intensity = 4) {
  const ref = useRef(null)
  const [t, setT] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) / intensity
      const y = (e.clientY - (rect.top + rect.height / 2)) / intensity
      setT({ x, y })
    },
    [intensity]
  )

  const onMouseLeave = useCallback(() => setT({ x: 0, y: 0 }), [])

  return { ref, t, onMouseMove, onMouseLeave }
}
