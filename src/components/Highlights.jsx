import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section'
import SpotlightCard from './SpotlightCard'
import Icon from './Icons'
import { gallery, volunteering } from '../data/content'

export default function Highlights() {
  const [openEvent, setOpenEvent] = useState(null) // index of the open event, or null
  const [photo, setPhoto] = useState(0) // photo index within the open event
  const isOpen = openEvent !== null
  const photos = isOpen ? gallery[openEvent].images : []

  const close = useCallback(() => setOpenEvent(null), [])
  const next = useCallback(
    () => setPhoto((p) => (photos.length ? (p + 1) % photos.length : 0)),
    [photos.length]
  )
  const prev = useCallback(
    () => setPhoto((p) => (photos.length ? (p - 1 + photos.length) % photos.length : 0)),
    [photos.length]
  )
  const openAt = (i) => {
    setOpenEvent(i)
    setPhoto(0)
  }

  // keyboard controls + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, next, prev])

  return (
    <Section id="highlights" index="07" eyebrow="Beyond the work" title="Moments & community.">
      {/* grid: one tile per EVENT */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {gallery.map((ev, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => openAt(i)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative block overflow-hidden rounded-2xl border border-white/10 text-left"
            aria-label={`Open event: ${ev.title}`}
          >
            <img
              src={ev.images[0]}
              alt={ev.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* multi-photo count badge (only when more than one photo) */}
            {ev.images.length > 1 && (
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-void/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                <Icon name="images" className="h-3.5 w-3.5" />
                {ev.images.length}
              </span>
            )}

            {/* expand hint */}
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-void/60 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              <Icon name="external" className="h-4 w-4" />
            </span>

            <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {ev.title}
            </span>
          </motion.button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">
        Click any event to browse its photos.
      </p>

      {/* volunteering */}
      <div className="mt-14">
        <h3 className="mb-6 font-display text-lg font-semibold text-white">Volunteering</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {volunteering.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="card-hairline h-full p-6">
                <p className="font-mono text-xs text-sky-400/90">{v.period}</p>
                <h4 className="mt-2 text-base font-semibold text-white">{v.role}</h4>
                <p className="mt-0.5 text-sm text-sky-200">{v.org}</p>
                <p className="mt-3 text-sm text-slate-400">{v.detail}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* lightbox rendered on document.body so the section's 3D transform can't offset it */}
      {createPortal(
        <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-void/90 p-4 backdrop-blur-md sm:p-8"
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
              aria-label="Close"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>

            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 sm:left-6"
                aria-label="Previous photo"
              >
                <Icon name="arrowRight" className="h-5 w-5 rotate-180" />
              </button>
            )}

            <motion.figure
              key={photo}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-3xl"
            >
              <img
                src={photos[photo]}
                alt={gallery[openEvent].title}
                className="mx-auto max-h-[78vh] w-auto rounded-2xl border border-white/10 object-contain"
              />
              <figcaption className="mt-4 text-center text-sm text-slate-300">
                {gallery[openEvent].title}
                {photos.length > 1 && (
                  <span className="ml-3 font-mono text-xs text-slate-500">
                    {photo + 1} / {photos.length}
                  </span>
                )}
              </figcaption>
            </motion.figure>

            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 sm:right-6"
                aria-label="Next photo"
              >
                <Icon name="arrowRight" className="h-5 w-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>,
        document.body
      )}
    </Section>
  )
}
