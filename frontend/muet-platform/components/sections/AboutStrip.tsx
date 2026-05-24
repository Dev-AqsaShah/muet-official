'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const highlights = [
  'Implementing partner for Government of Sindh IT initiatives',
  'MUET-verified certificates recognised nationwide',
  'Training centers across 12 Sindh districts',
  'Free of cost for all eligible Sindh youth',
]

export default function AboutStrip() {
  return (
    <section className="bg-brand-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-baby text-sm font-medium uppercase tracking-widest mb-3">About MUET</p>
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold leading-tight mb-5">
              Mehran University — Sindh&apos;s Premier Engineering Institution
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-6">
              Established in 1977, Mehran University of Engineering &amp; Technology (MUET) is Sindh&apos;s
              leading public university for engineering and technology education. Through its Office of
              Research, Innovation, and Commercialization (ORIC), MUET administers government-funded
              training programs that directly empower thousands of Sindh youth each year.
            </p>
            <ul className="space-y-3 mb-8">
              {highlights.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/75 text-sm">
                  <CheckCircle2 size={18} className="text-brand-baby shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-white/30 hover:border-white/70 text-white font-semibold rounded-lg transition-all hover:bg-white/10"
            >
              About MUET
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative h-80 lg:h-96 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/images/hero/muet-campus.jpg"
              alt="MUET Campus, Jamshoro"
              fill
              className="object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold text-sm">MUET Main Campus</p>
              <p className="text-white/60 text-xs">Jamshoro, Sindh — Est. 1977</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
