import { useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Check, Sparkles, ArrowRight, Mail } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20">
      <Sparkles size={14} /> {children}
    </span>
  )
}

function Hero({ onCTA }) {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(59,130,246,0.25),rgba(0,0,0,0))]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 sm:pt-28 lg:pt-36">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <Badge>Glassmorphic Fintech Experience</Badge>
          <Badge>AI-Powered Workflows</Badge>
        </div>

        <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-6xl">
          Neo‑Modern AI Platform for B2B Finance
        </h1>
        <p className="mt-5 max-w-2xl text-center text-slate-300">
          Automate onboarding, risk, and reconciliation with a secure AI engine. Built for modern finance teams and designed with clarity.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button onClick={onCTA} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 px-5 py-3 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur transition hover:bg-white">
            Join the waitlist <ArrowRight className="transition group-hover:translate-x-0.5" size={18} />
          </button>
          <a href="#features" className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur transition hover:bg-white/15">Explore features</a>
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm text-slate-300">
          <Check size={16} className="text-emerald-400" /> SOC2-ready
          <span className="mx-1 opacity-30">•</span>
          <Check size={16} className="text-emerald-400" /> SSO & RBAC
          <span className="mx-1 opacity-30">•</span>
          <Check size={16} className="text-emerald-400" /> API-first
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur transition hover:bg-white/10">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </div>
  )
}

function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard title="Smart Onboarding" desc="AI validates KYB docs and syncs with your CRM automatically." />
        <FeatureCard title="Risk Insights" desc="Real-time anomaly detection across transactions and accounts." />
        <FeatureCard title="Reconciliations" desc="Automated matching across ledgers with audit-ready trails." />
      </div>
    </section>
  )
}

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: 'Submitting…' })
    try {
      const res = await fetch(`${BACKEND_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, role, notes })
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus({ state: 'success', message: 'You\'re on the list! We\'ll be in touch.' })
      setEmail(''); setCompany(''); setRole(''); setNotes('')
    } catch (err) {
      setStatus({ state: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <section id="waitlist" className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
      <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
        <div className="mb-5 flex items-center gap-2 text-white">
          <div className="rounded-lg bg-emerald-400/20 p-2 ring-1 ring-emerald-400/30"><Mail className="text-emerald-300" size={18} /></div>
          <div>
            <h2 className="text-xl font-semibold">Get early access</h2>
            <p className="text-sm text-slate-300">We’ll onboard a limited number of teams each month.</p>
          </div>
        </div>
        <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="email" required placeholder="Work email" value={email} onChange={(e)=>setEmail(e.target.value)} className="col-span-1 sm:col-span-2 rounded-xl border border-white/15 bg-white/80 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-400" />
          <input type="text" placeholder="Company" value={company} onChange={(e)=>setCompany(e.target.value)} className="rounded-xl border border-white/15 bg-white/70 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-400" />
          <input type="text" placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)} className="rounded-xl border border-white/15 bg-white/70 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-400" />
          <textarea placeholder="What are you solving?" value={notes} onChange={(e)=>setNotes(e.target.value)} rows={3} className="sm:col-span-2 rounded-xl border border-white/15 bg-white/70 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-400" />
          <div className="flex items-center gap-3 sm:col-span-2">
            <button disabled={status.state==='loading'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-emerald-950 shadow-[0_8px_30px_rgb(16,185,129,0.35)] transition hover:bg-emerald-300 disabled:opacity-60">
              {status.state==='loading' ? 'Submitting…' : 'Join waitlist'}
              <ArrowRight size={18} />
            </button>
            {status.state==='success' && <span className="text-emerald-300">{status.message}</span>}
            {status.state==='error' && <span className="text-rose-300">{status.message}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default function App() {
  const waitlistRef = useRef(null)
  const scrollToForm = () => {
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className="min-h-screen w-full bg-slate-950">
      <Hero onCTA={scrollToForm} />
      <Features />
      <WaitlistForm ref={waitlistRef} />
      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-10 text-center text-slate-500">
        © {new Date().getFullYear()} NovaPay AI — All rights reserved.
      </footer>
    </div>
  )
}
