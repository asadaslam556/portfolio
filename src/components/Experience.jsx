import { motion } from 'framer-motion'
import Section from './Section'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <Section id="experience" index="02" eyebrow="Experience" title="Where I've shipped real work.">
      <div className="relative">
        {/* vertical rail */}
        <div className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-sky-400/60 via-white/10 to-transparent sm:left-2" />

        <div className="space-y-12">
          {experience.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-8 sm:pl-12"
            >
              {/* dot */}
              <span className="absolute left-[-5px] top-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.8)] sm:left-[3px]" />

              <p className="font-mono text-xs text-sky-400/90">{job.period}</p>
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                {job.role}
              </h3>
              <p className="mt-0.5 text-sky-200">
                {job.company} <span className="text-slate-500">· {job.location}</span>
              </p>
              <p className="mt-3 max-w-2xl text-sm text-slate-400">{job.blurb}</p>

              <ul className="mt-4 space-y-2">
                {job.points.map((pt, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky-400/70" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
