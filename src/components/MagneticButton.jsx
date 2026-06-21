import { motion } from 'framer-motion'
import { useMagnetic } from '../hooks/useMagnetic'

// Wraps any clickable content and gives it a magnetic pull toward the cursor.
// Render as a link by passing `href`, otherwise it's a <button>.
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  intensity = 5,
  ...rest
}) {
  const { ref, t, onMouseMove, onMouseLeave } = useMagnetic(intensity)
  const Comp = motion[href ? 'a' : 'button']

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: t.x, y: t.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}
