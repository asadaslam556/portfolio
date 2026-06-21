import Icon from './Icons'
import { profile } from '../data/content'

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-sky-400/40 bg-sky-400/10 font-display text-lg font-bold gradient-text">
                A
              </span>
              <span className="font-display text-base font-semibold text-white">{profile.name}</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-slate-500">
              AI Data Engineer building production pipelines and Gen AI systems.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="link-muted text-sm">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
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
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p>Built with React, Three.js &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
