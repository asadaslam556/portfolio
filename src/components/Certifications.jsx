import { motion } from 'framer-motion'
import Section from './Section'
import SpotlightCard from './SpotlightCard'
import Icon from './Icons'
import { certifications } from '../data/content'

export default function Certifications() {
  return (
    <Section
      id="certifications"
      index="06"
      eyebrow={`${certifications.length} Credentials`}
      title="Certifications & credentials."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => {
          const hasLink = c.url && c.url.trim() !== ''
          const Wrapper = hasLink ? 'a' : 'div'
          const linkProps = hasLink
            ? { href: c.url, target: '_blank', rel: 'noreferrer' }
            : {}

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
            >
              <Wrapper {...linkProps} className={`block h-full ${hasLink ? 'group' : ''}`}>
                <SpotlightCard className="card-hairline flex h-full items-start gap-4 p-5">
                  <span className="mt-0.5 grid h-10 w-10 flex-none place-items-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
                    <Icon name="award" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-sky-400/90">
                      {c.issuer}
                      {c.year ? ` · ${c.year}` : ''}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-white">{c.name}</p>
                  </div>
                  {hasLink && (
                    <Icon
                      name="external"
                      className="mt-0.5 h-4 w-4 flex-none text-slate-500 transition-colors group-hover:text-sky-300"
                    />
                  )}
                </SpotlightCard>
              </Wrapper>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
