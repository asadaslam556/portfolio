import { motion } from 'framer-motion'
import Section from './Section'
import SpotlightCard from './SpotlightCard'
import { education } from '../data/content'

export default function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Academic foundation.">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((ed, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <SpotlightCard className="glass-strong h-full p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-sky-400/90">{ed.period}</span>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {ed.grade}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">{ed.degree}</h3>
              <p className="mt-1 text-sky-200">{ed.school}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{ed.detail}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
