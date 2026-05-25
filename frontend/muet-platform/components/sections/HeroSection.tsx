'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/muet-campus.jpg')" }}
      />
      {/* Fallback gradient when image not loaded */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-steel" />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-navy/80" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.p
            {...fadeUp(0)}
            className="text-brand-baby text-sm font-medium uppercase tracking-widest mb-4"
          >
            Mehran University of Engineering &amp; Technology — Jamshoro
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6"
          >
            A Trusted University Partner for{' '}
            <span className="text-brand-baby">Government Training Initiatives</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-white/75 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl"
          >
            MUET manages and executes government-funded training programmes across Sindh
            — partnering with BBSHRRDB, the Government of Sindh, and the Government of Pakistan
            to deliver certified digital skills training to over 5,000 graduates.
          </motion.p>

          <motion.p
            {...fadeUp(0.25)}
            className="text-white/55 text-sm leading-relaxed mb-8 max-w-xl"
          >
            Implementing institution for PITP, NFTP, and BBSHRRDB programmes across 12 districts.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-steel hover:bg-brand-steel/90 text-white font-semibold rounded-lg transition-all hover:scale-[1.02]"
            >
              View Our Projects <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-all hover:bg-white/10"
            >
              About MUET
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <ChevronDown size={28} className="text-white/40" />
      </motion.div>
    </section>
  )
}
