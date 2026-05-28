'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const stagger = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background: full-width campus photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/muet-gate-header.jpg"
          alt="MUET Campus"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark navy overlay — 75% opacity per doc */}
        <div className="absolute inset-0" style={{ background: 'rgba(27,58,107,0.78)' }} />
        {/* Subtle gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, transparent, rgba(27,58,107,0.5))' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.p {...stagger(0)} className="text-brand-baby text-xs font-bold uppercase tracking-[0.22em] mb-5">
            Government of Sindh &nbsp;·&nbsp; Mehran University of Engineering &amp; Technology
          </motion.p>

          {/* H1 — Playfair Display */}
          <motion.h1 {...stagger(0.12)} className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
            Empowering Sindh&apos;s Youth Through Certified Digital Skills
          </motion.h1>

          <motion.p {...stagger(0.22)} className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            MUET delivers government-approved IT training across 12 districts of Sindh —
            partnering with BBSHRRDB, the Government of Sindh, and PITB to transform over 5,488 graduates.
          </motion.p>

          {/* CTAs */}
          <motion.div {...stagger(0.32)} className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold rounded-xl transition-all hover:scale-[1.03] text-white text-sm shadow-xl"
              style={{ background: '#4682B4', boxShadow: '0 8px 32px rgba(70,130,180,0.35)' }}
            >
              Explore Projects <ArrowRight size={17} />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-white/35 hover:border-white/70 hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
            >
              Browse Programmes
            </Link>
          </motion.div>

          {/* Stat row */}
          <motion.div {...stagger(0.45)} className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '5,488+', label: 'Certified Graduates' },
              { value: '82.1%',  label: 'Completion Rate' },
              { value: '20',     label: 'Training Centers' },
              { value: '12',     label: 'Districts Covered' },
            ].map((s, i) => (
              <div key={s.label} className={i < 3 ? 'sm:border-r sm:border-white/12 sm:pr-6' : ''}>
                <p className="font-display text-3xl font-bold text-brand-amber leading-none">{s.value}</p>
                <p className="text-white/50 text-xs mt-1.5 font-medium leading-snug">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-white/25 text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} className="text-white/30" />
      </motion.div>
    </section>
  )
}
