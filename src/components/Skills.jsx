import { motion } from 'framer-motion'
import Section from './Section'
import SpotlightCard from './SpotlightCard'
import Icon from './Icons'
import { skillGroups } from '../data/content'

export default function Skills() {
  return (
    <Section id="skills" index="04" eyebrow="Toolkit" title="The stack I build with.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className={i === 0 ? 'lg:row-span-1' : ''}
          >
            <SpotlightCard className="card-hairline h-full p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
                  <Icon name={group.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
