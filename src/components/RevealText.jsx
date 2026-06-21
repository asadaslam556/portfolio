import { motion } from 'framer-motion'

// Reveals text word-by-word when it scrolls into view.
export default function RevealText({ text, className = '', delay = 0, once = true }) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.045, delayChildren: delay },
    },
  }
  const word = {
    hidden: { opacity: 0, y: '0.5em' },
    visible: {
      opacity: 1,
      y: '0em',
      transition: { type: 'spring', damping: 16, stiffness: 140 },
    },
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px' }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={word} className="inline-block" aria-hidden="true">
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
