import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Icon from './Icons'
import { profile } from '../data/content'

// Heavy 3D scene (three.js) is code-split so page content paints first,
// then the canvas streams in. Keeps mobile from stalling on first load.
const KnowledgeGraph = lazy(() => import('../three/KnowledgeGraph'))

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ ready }) {
  const reduced = useReducedMotion()

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden md:py-24">
      {/* 3D layer */}
      <div className="absolute inset-0">
        {ready && (
          <Suspense fallback={null}>
            <KnowledgeGraph reducedMotion={!!reduced} />
          </Suspense>
        )}
        {/* fade the canvas into the page at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/30 to-transparent" />
      </div>

      {/* content */}
      <motion.div
        className="container-x relative z-10"
        variants={container}
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
      >
        <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs text-slate-300">Open to Data / AI Engineer roles</span>
        </motion.div>

        <motion.p variants={item} className="eyebrow mb-5 flex items-center gap-2">
          <Icon name="mapPin" className="h-4 w-4" />
          {profile.location}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-2xl font-semibold sm:text-4xl"
        >
          <span className="gradient-text-animated">{profile.role}</span>
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="#projects" className="btn-primary" intensity={6}>
            View Projects
            <Icon name="arrowRight" className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href={profile.cv} className="btn-ghost" intensity={6} download>
            <Icon name="download" className="h-4 w-4" />
            Download CV
          </MagneticButton>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex items-center gap-5">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-muted" aria-label="LinkedIn">
            <Icon name="linkedin" className="h-5 w-5" />
          </a>
          {profile.showGithub && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-muted" aria-label="GitHub">
              <Icon name="github" className="h-5 w-5" />
            </a>
          )}
          <a href={`mailto:${profile.email}`} className="link-muted" aria-label="Email">
            <Icon name="mail" className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-sky-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
