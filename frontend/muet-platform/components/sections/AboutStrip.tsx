'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

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
    <section className="bg-brand-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-baby text-sm font-medium uppercase tracking-widest mb-3">
              Why Partner With MUET
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold leading-tight mb-5">
              Mehran University — Sindh&apos;s Premier Institution for Government Programme Execution
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-4">
              Established in 1977, MUET is Sindh&apos;s leading public university for engineering
              and technology. Through its Office of Research, Innovation &amp; Commercialization (ORIC),
              MUET has developed the institutional capacity to manage complex, multi-district
              government training mandates — from centre operations and instructor management
              to certification, reporting, and quality assurance.
            </p>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Government departments and funding bodies choose MUET because of its proven execution record,
              accredited academic standing, and the credibility that a university-issued certificate
              carries for programme graduates.
            </p>
            <ul className="space-y-2.5 mb-8">
              {credentials.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/75 text-sm">
                  <CheckCircle2 size={16} className="text-brand-baby shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 border border-white/30 hover:border-white/70 text-white font-semibold rounded-lg transition-all hover:bg-white/10 text-sm"
              >
                About MUET
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-brand-steel hover:bg-brand-steel/90 text-white font-semibold rounded-lg transition-all text-sm"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '1977',    label: 'Year Established' },
              { value: '12',      label: 'Districts Covered' },
              { value: '5,488+',  label: 'Trainees Certified' },
              { value: '4',       label: 'Active Govt Projects' },
              { value: '82.1%',   label: 'Completion Rate' },
              { value: '20',      label: 'Training Centers' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/8 border border-white/10 rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/55 text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
