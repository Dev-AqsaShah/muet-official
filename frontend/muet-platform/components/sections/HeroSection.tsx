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
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-navy/75" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.p
            {...fadeUp(0)}
            className="text-brand-baby text-sm font-medium uppercase tracking-widest mb-4"
          >
            Government of Sindh Initiative
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6"
          >
            Empowering Sindh&apos;s Youth Through{' '}
            <span className="text-brand-baby">Digital Skills Training</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
          >
            Mehran University of Engineering &amp; Technology delivers free, certified IT training
            programs across 12 Sindh districts — bridging the digital divide for over 5,000 graduates.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-steel hover:bg-brand-steel/90 text-white font-semibold rounded-lg transition-all hover:scale-[1.02]"
            >
              Explore Programs <ArrowRight size={18} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-all hover:bg-white/10"
            >
              View Projects
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
