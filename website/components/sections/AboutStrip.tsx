'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const credentials = [
  'Designated implementing university for PITP — Government of Sindh',
  'Official NFTP training center under PITB — Government of Pakistan',
  'Institutional partner for BBSHRRDB skills development programmes',
  'MUET-issued certificates with government endorsement and online verification',
  '82.1% programme completion rate and PKR 19M+ graduate earnings (Phase I)',
  'Capacity to manage multi-district, multi-batch government training at scale',
]

const funders = [
  { name: 'BBSHRRDB', sub: 'Benazir Bhutto Shaheed HRRDB', color: '#fbbf24' },
  { name: 'Govt of Sindh', sub: 'PITP — Provincial Initiative', color: '#00e5c8' },
  { name: 'PITB', sub: 'National Freelance Training Programme', color: '#38bdf8' },
]

export default function AboutStrip() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#020b18', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '36px 36px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — credentials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #00e5c8, transparent)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>Why Partner With MUET</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(270deg, #00e5c8, transparent)' }} />
            </div>

            <h2 className="font-display font-extrabold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
              Sindh&apos;s Premier Institution for Government Programme Execution
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(232,244,255,0.5)' }}>
              Established in 1977, MUET is Sindh&apos;s leading public university. Through ORIC, MUET manages
              complex, multi-district government training mandates — from centre operations to certification at scale.
            </p>

            <ul className="space-y-3 mb-10">
              {credentials.map((point) => (
                <li key={point} className="flex items-start gap-3 p-3 rounded-xl border transition-all duration-300"
                  style={{ border: '1px solid rgba(0,229,200,0.08)', background: 'rgba(0,229,200,0.02)' }}>
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: '#00e5c8' }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'rgba(232,244,255,0.65)' }}>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all"
                style={{ border: '1px solid rgba(0,229,200,0.25)', color: '#e8f4ff', background: 'rgba(0,229,200,0.04)' }}
              >
                About MUET
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #00e5c8, #38bdf8)', color: '#020b18', boxShadow: '0 0 24px rgba(0,229,200,0.3)' }}
              >
                Partner With Us <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Right — funders + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="space-y-5"
          >
            <div className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)', boxShadow: '0 0 80px rgba(0,229,200,0.06)' }}>
              <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#e8f4ff' }}>Government Funders &amp; Mandates</h3>
              <p className="text-sm mb-6" style={{ color: '#607896' }}>Institutional mandates from three government bodies</p>

              <div className="space-y-3">
                {funders.map(f => (
                  <div
                    key={f.name}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                    style={{ border: '1px solid rgba(0,229,200,0.1)', background: 'rgba(6,18,36,0.5)' }}
                  >
                    <div className="w-12 h-10 rounded-lg flex items-center justify-center shrink-0 font-display font-bold text-xs"
                      style={{ background: `${f.color}15`, color: f.color, border: `1px solid ${f.color}30` }}>
                      {f.name.split(' ')[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#e8f4ff' }}>{f.name}</p>
                      <p className="text-xs" style={{ color: '#607896' }}>{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '1977', label: 'Established', color: '#00e5c8' },
                { value: '52+',  label: 'Instructors',  color: '#fbbf24' },
                { value: '4',    label: 'Mandates',     color: '#38bdf8' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}
                >
                  <p className="font-display font-extrabold text-2xl" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}50` }}>{stat.value}</p>
                  <p className="text-xs mt-1" style={{ color: '#607896' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
