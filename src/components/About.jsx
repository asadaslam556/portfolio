import { motion } from 'framer-motion'
import Section from './Section'
import SpotlightCard from './SpotlightCard'
import { about, profile } from '../data/content'

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="Turning messy data into systems people trust.">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* text + stats */}
        <div>
          <div className="space-y-5 text-base leading-relaxed text-slate-300/90 sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {about.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <SpotlightCard className="card-hairline h-full p-4">
                  <div className="font-display text-2xl font-bold gradient-text whitespace-nowrap tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-slate-400">{s.label}</div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ rotateY: -6, rotateX: 4, scale: 1.03, transition: { type: 'spring', stiffness: 220, damping: 18 } }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-violet-500/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10">
            <img
              src={profile.portrait}
              alt={profile.name}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
              <p className="text-sm text-sky-300">{profile.role}</p>
            </div>
          </div>
          {/* floating accent badge */}
          <div className="absolute -right-3 -top-3 animate-float rounded-2xl border border-white/10 bg-panel/80 px-4 py-3 backdrop-blur">
            <p className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Based in
            </p>
            <p className="text-sm font-semibold text-white">Nürnberg, DE</p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
