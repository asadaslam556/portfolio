import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Counts 0 -> 100, then wipes away to reveal the page.
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    let current = 0
    let timer
    const tick = () => {
      // ease toward 100 with a little randomness
      const step = Math.max(1, Math.round((100 - current) * 0.06) + Math.random() * 4)
      current = Math.min(100, current + step)
      setCount(current)
      if (current < 100) {
        timer = setTimeout(tick, 90)
      } else {
        timer = setTimeout(() => {
          setShow(false)
          onDoneRef.current?.()
        }, 450)
      }
    }
    timer = setTimeout(tick, 250)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative w-full max-w-6xl px-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow mb-3">Loading</p>
                <p className="font-display text-2xl text-white/90">Asad Aslam</p>
              </div>
              <div className="font-display text-6xl font-extrabold gradient-text sm:text-8xl">
                {count}
                <span className="text-white/30">%</span>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-white/10">
              <motion.div
                className="h-px bg-gradient-to-r from-sky-400 to-violet-400"
                animate={{ width: `${count}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
