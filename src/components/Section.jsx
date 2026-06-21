import { motion } from 'framer-motion'

// Section wrapper with an anchor, a numbered heading, and a subtle 3D
// rise-and-tilt as it scrolls in (disabled when reduced motion is on).
export default function Section({ id, index, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-24 sm:py-32 ${className}`}>
      <div className="container-x [perspective:1600px]">
        <motion.div
          initial={{ opacity: 0, y: 56, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
        >
          <div className="mb-14 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-sm text-sky-400/80">{index}</span>
              <span className="h-px w-8 bg-sky-400/40" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h2>
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
