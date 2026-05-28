'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

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
    <section className="py-20 overflow-hidden" style={{ background: '#064e3b' }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #34d399 1px, transparent 0)', backgroundSize: '36px 36px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-light mb-4 px-3 py-1 rounded-full bg-brand-light/10 border border-brand-light/20">
              Why Partner With MUET
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold leading-tight mb-5">
              Sindh&apos;s Premier Institution for Government Programme Execution
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              Established in 1977, MUET is Sindh&apos;s leading public university for engineering
              and technology. Through ORIC, MUET manages complex, multi-district government training
              mandates — from centre operations to certification and quality assurance.
            </p>

            <ul className="space-y-3 mb-8">
              {credentials.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/70 text-sm">
                  <CheckCircle2 size={16} className="text-brand-light shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 hover:border-brand-light/60 text-white font-semibold rounded-xl transition-all hover:bg-white/8 text-sm"
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

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-light/20 aspect-[4/3]">
              <Image
                src="/images/hero/muet-gate-header.jpg"
                alt="Mehran University of Engineering & Technology — Jamshoro Campus"
                fill
                className="object-cover object-right"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#052e16]/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 grid grid-cols-3 gap-2">
                {[
                  { value: '5,488+', label: 'Certified' },
                  { value: '82.1%',  label: 'Completion' },
                  { value: '20',     label: 'Centers' },
                ].map(stat => (
                  <div key={stat.label} className="bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/65 text-[10px] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { value: '1977', label: 'Established' },
                { value: '20+',  label: 'Instructors' },
                { value: '4',    label: 'Projects' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/8 border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
