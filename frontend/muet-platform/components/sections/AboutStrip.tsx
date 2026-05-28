'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Building2, Award, Globe } from 'lucide-react'

const credentials = [
  { icon: Award,     text: 'Designated implementing university for PITP — Government of Sindh' },
  { icon: Globe,     text: 'Official NFTP training center under PITB — Government of Pakistan' },
  { icon: Building2, text: 'Institutional partner for BBSHRRDB skills development programmes' },
  { icon: CheckCircle2, text: 'MUET-issued certificates with government endorsement + online verification' },
  { icon: CheckCircle2, text: '82.1% programme completion rate and PKR 19M+ graduate earnings (Phase I)' },
  { icon: CheckCircle2, text: 'Capacity to manage multi-district, multi-batch government training at scale' },
]

const overlayStats = [
  { value: '5,488+', label: 'Certified' },
  { value: '82.1%',  label: 'Completion' },
  { value: '20',     label: 'Centers' },
]

const belowStats = [
  { value: '1977', label: 'Est.' },
  { value: '20+',  label: 'Instructors' },
  { value: '4',    label: 'Projects' },
]

export default function AboutStrip() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: '#064e3b' }}>
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #34d399 1px, transparent 0)', backgroundSize: '36px 36px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-light mb-5 px-3 py-1 rounded-full bg-brand-light/10 border border-brand-light/20">
              Why Partner With MUET
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold leading-tight mb-5">
              Sindh&apos;s Premier Institution for Government Programme Execution
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-lg">
              Established in 1977, MUET is Sindh&apos;s leading public university for engineering
              and technology. Through ORIC, MUET manages complex, multi-district government training
              mandates — from centre operations to certification and quality assurance.
            </p>

            <ul className="space-y-3 mb-10">
              {credentials.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-brand-light/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={12} className="text-brand-light" />
                  </div>
                  <span className="text-white/65 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-brand-light/50 text-white font-semibold rounded-xl transition-all hover:bg-white/6 text-sm"
              >
                About MUET
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-brand-mid text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-brand-green/30"
              >
                Partner With Us <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-light/15 aspect-[4/3]">
              <Image
                src="/images/hero/muet-gate-header.jpg"
                alt="Mehran University of Engineering & Technology — Jamshoro Campus"
                fill
                className="object-cover object-right"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#052e16]/85 via-[#052e16]/10 to-transparent" />

              {/* Overlay stat cards */}
              <div className="absolute bottom-0 left-0 right-0 p-4 grid grid-cols-3 gap-2">
                {overlayStats.map(stat => (
                  <div key={stat.label} className="bg-black/55 backdrop-blur-md border border-white/12 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/55 text-[10px] mt-0.5 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Below-image stat row */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {belowStats.map(stat => (
                <div key={stat.label} className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/45 text-xs mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
