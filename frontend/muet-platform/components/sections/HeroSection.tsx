'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#1a3560] to-brand-steel/80" />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <div>
            <motion.p
              {...fadeUp(0)}
              className="text-brand-baby text-sm font-bold uppercase tracking-widest mb-4"
            >
              Mehran University of Engineering &amp; Technology — Jamshoro
            </motion.p>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-display text-4xl md:text-5xl lg:text-5xl text-white font-bold leading-tight mb-6"
            >
              Where Ambition Meets{' '}
              <span className="text-brand-baby">Certified Excellence</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-white/75 text-lg leading-relaxed mb-4 max-w-xl"
            >
              MUET manages and executes certified training programmes across Sindh
              — partnering with BBSHRRDB, the Government of Sindh, and the Government of Pakistan
              to deliver certified digital skills training to over 5,000 graduates.
            </motion.p>

            <motion.p
              {...fadeUp(0.25)}
              className="text-white/50 text-sm leading-relaxed mb-8 max-w-lg"
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

          {/* ── Right: Gate Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/images/hero/gate.jpeg"
                alt="Mehran University of Engineering & Technology — Main Gate, Jamshoro"
                width={700}
                height={460}
                className="object-cover w-full"
                priority
              />
              {/* Bottom caption bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-navy/90 to-transparent px-5 py-4">
                <p className="text-white font-semibold text-sm">Mehran University of Engineering &amp; Technology</p>
                <p className="text-brand-baby text-xs">Jamshoro, Sindh — Est. 1977</p>
              </div>
            </div>
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
