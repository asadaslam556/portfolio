import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Icon from './Icons'
import { profile } from '../data/content'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  // idle | submitting | success | error | invalid
  const [status, setStatus] = useState('idle')

  // Used when no form key is configured: open the visitor's email app.
  const openMailApp = () => {
    const subject = encodeURIComponent(`Portfolio message from ${name || 'someone'}`)
    const body = encodeURIComponent(`${msg}\n\n${name}${email ? ` (${email})` : ''}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !msg.trim()) {
      setStatus('invalid')
      return
    }

    // No access key set yet -> fall back to opening the email app.
    if (!profile.contactFormKey) {
      openMailApp()
      return
    }

    try {
      setStatus('submitting')
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.contactFormKey,
          name,
          email,
          message: msg,
          subject: `Portfolio message from ${name}`,
          from_name: 'Portfolio Website',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMsg('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-sky-400/50'

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-panel/70 to-void/40 p-8 backdrop-blur-xl sm:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr]">
            {/* left: invite */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-sm text-sky-400/80">08</span>
                <span className="h-px w-8 bg-sky-400/40" />
                <span className="eyebrow">Contact</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Let&apos;s build something{' '}
                <span className="gradient-text">data-driven</span>.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300/90">
                I&apos;m open to full-time Data Engineer, AI Engineer, and Analytics Engineer
                roles across Germany. Send a message below or reach me directly by email.
              </p>

              <div className="mt-8 space-y-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-slate-300 transition-colors hover:text-sky-300">
                  <Icon name="mail" className="h-5 w-5 text-sky-400" />
                  {profile.email}
                </a>
                <p className="flex items-center gap-3 text-slate-300">
                  <Icon name="mapPin" className="h-5 w-5 text-sky-400" />
                  {profile.location}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <MagneticButton href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost" intensity={6}>
                  <Icon name="linkedin" className="h-4 w-4" />
                  LinkedIn
                </MagneticButton>
                {profile.showGithub && (
                  <MagneticButton href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost" intensity={6}>
                    <Icon name="github" className="h-4 w-4" />
                    GitHub
                  </MagneticButton>
                )}
              </div>
            </div>

            {/* right: form OR thank-you confirmation */}
            <div>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-8 text-center"
                  >
                    <span className="mb-4 grid h-14 w-14 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-300">
                      <Icon name="check" className="h-7 w-7" />
                    </span>
                    <h3 className="text-xl font-semibold text-white">Message sent</h3>
                    <p className="mt-2 max-w-xs text-sm text-slate-300">
                      Thanks for reaching out. I&apos;ll get back to you as soon as I can.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-5 text-sm font-medium text-sky-300 transition-colors hover:text-sky-200"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        value={name}
                        onChange={(e) => { setName(e.target.value); if (status !== 'idle') setStatus('idle') }}
                        placeholder="Your name"
                        className={inputClass}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle') }}
                        placeholder="Your email"
                        className={inputClass}
                      />
                    </div>
                    <textarea
                      value={msg}
                      onChange={(e) => { setMsg(e.target.value); if (status !== 'idle') setStatus('idle') }}
                      rows={5}
                      placeholder="A short message..."
                      className={`${inputClass} resize-none`}
                    />

                    <button
                      onClick={handleSubmit}
                      disabled={status === 'submitting'}
                      className="btn-primary w-full disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <>
                          Sending
                          <Icon name="spinner" className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <Icon name="arrowUpRight" className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {status === 'invalid' && (
                      <p className="text-center text-xs text-amber-300/90">
                        Please fill in your name, email, and a message.
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="text-center text-xs text-rose-300/90">
                        Something went wrong. Please email me directly at{' '}
                        <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>.
                      </p>
                    )}
                    {status !== 'invalid' && status !== 'error' && (
                      <p className="text-center text-xs text-slate-500">
                        {profile.contactFormKey
                          ? 'Your message comes straight to my inbox.'
                          : 'This opens your email app. References available on request.'}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
