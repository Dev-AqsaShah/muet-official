'use client'
import Link from 'next/link'
import Image from 'next/image'
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

export default function AboutStrip() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: '#1B3A6B' }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #89CFF0 1px, transparent 0)', backgroundSize: '36px 36px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-baby mb-5 px-3 py-1 rounded-full bg-brand-baby/10 border border-brand-baby/20">
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
              {credentials.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-brand-baby shrink-0 mt-0.5" />
                  <span className="text-white/65 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 hover:border-brand-baby/50 text-white font-semibold rounded-xl transition-all hover:bg-white/8 text-sm"
              >
                About MUET
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all text-sm shadow-lg"
                style={{ background: '#4682B4', boxShadow: '0 6px 20px rgba(70,130,180,0.35)' }}
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-baby/15 aspect-[4/3]">
              <Image
                src="/images/hero/muet-gate-header.jpg"
                alt="Mehran University of Engineering & Technology — Jamshoro Campus"
                fill
                className="object-cover object-right"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,58,107,0.85), transparent)' }} />

              {/* Overlay stats */}
              <div className="absolute bottom-0 left-0 right-0 p-4 grid grid-cols-3 gap-2">
                {[
                  { value: '5,488+', label: 'Certified' },
                  { value: '82.1%',  label: 'Completion' },
                  { value: '20',     label: 'Centers' },
                ].map(stat => (
                  <div key={stat.label} className="bg-black/50 backdrop-blur-md border border-white/12 rounded-xl p-3 text-center">
                    <p className="font-bold text-brand-amber text-xl">{stat.value}</p>
                    <p className="text-white/55 text-[10px] mt-0.5 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Below stat row */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { value: '1977', label: 'Established' },
                { value: '20+',  label: 'Instructors' },
                { value: '4',    label: 'Projects' },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl p-4 text-center border border-white/10 bg-white/6">
                  <p className="font-bold text-brand-amber text-xl">{stat.value}</p>
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
