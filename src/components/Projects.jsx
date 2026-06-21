import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section'
import SpotlightCard from './SpotlightCard'
import { projects, projectCategories } from '../data/content'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section id="projects" index="03" eyebrow="Selected Work" title="Projects that moved the needle.">
      {/* filter pills */}
      <div className="mb-10 flex flex-wrap gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
              filter === cat
                ? 'border-sky-400/50 bg-sky-400/15 text-sky-100'
                : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={p.featured ? 'md:col-span-2' : ''}
            >
              <SpotlightCard tilt className="glass-strong h-full p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-sky-200">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-violet-200">
                        Featured
                      </span>
                    )}
                  </div>
                  <span className="whitespace-nowrap font-mono text-xs text-slate-500">
                    {p.period}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white sm:text-2xl">{p.title}</h3>
                <p className="mt-1 text-sm font-medium text-sky-300/90">{p.org}</p>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{p.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.detail}</p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-emerald-200">{p.impact}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
