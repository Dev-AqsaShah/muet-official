'use client'
import Link from 'next/link'
import Image from 'next/image'
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

          {/* Campus image panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/hero/muet-gate-header.jpg"
                alt="Mehran University of Engineering & Technology — Jamshoro Campus"
                fill
                className="object-cover object-right"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />

              {/* Stats row overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 grid grid-cols-3 gap-2">
                {[
                  { value: '5,488+', label: 'Certified' },
                  { value: '82.1%',  label: 'Completion' },
                  { value: '20',     label: 'Centers' },
                ].map(stat => (
                  <div key={stat.label} className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/70 text-xs font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra stats below image */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { value: '1977', label: 'Established' },
                { value: '20+',  label: 'Instructors' },
                { value: '4',    label: 'Active Projects' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/8 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/55 text-xs font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
