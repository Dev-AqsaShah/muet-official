'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Shield, CheckCircle, Zap } from 'lucide-react'

const trust = [
  { icon: Shield,       label: '100% Free' },
  { icon: CheckCircle,  label: 'Govt-Certified' },
  { icon: Zap,          label: '5,488+ Graduates' },
]

const miniStats = [
  { value: '5,488+', label: 'Certified Graduates' },
  { value: '82.1%',  label: 'Completion Rate' },
  { value: '20',     label: 'Training Centers' },
  { value: 'PKR 19M+', label: 'Freelance Earnings' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#052e16' }}>

      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #34d399 1.5px, transparent 0)', backgroundSize: '36px 36px' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-2 mb-7"
            >
              {trust.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-brand-light/25 text-brand-light bg-brand-light/8">
                  <Icon size={11} className="shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Institution */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-brand-light/70 text-xs font-bold uppercase tracking-[0.22em] mb-4"
            >
              Mehran University of Engineering &amp; Technology — Jamshoro
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.04] mb-6"
            >
              Sindh&apos;s{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] via-[#6ee7b7] to-[#4ade80]">
                Digital Skills
              </span>
              Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl"
            >
              MUET delivers government-certified IT training across 12 districts of Sindh — transforming 5,488+ graduates through free, accredited programmes funded by BBSHRRDB and the Government of Sindh.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-green hover:bg-brand-mid text-white font-semibold rounded-xl transition-all hover:scale-[1.03] shadow-xl shadow-brand-green/30 text-sm"
              >
                Explore Projects <ArrowRight size={17} />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/20 hover:border-brand-light/50 text-white font-semibold rounded-xl transition-all hover:bg-white/6 text-sm"
              >
                Browse Programmes
              </Link>
            </motion.div>

            {/* Mini stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-5"
            >
              {miniStats.map((s, i) => (
                <div key={s.label} className={i < miniStats.length - 1 ? 'sm:border-r sm:border-white/10 sm:pr-5' : ''}>
                  <p className="text-2xl font-bold text-white leading-none">{s.value}</p>
                  <p className="text-white/40 text-xs mt-1.5 leading-snug">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-1 ring-brand-green/25 aspect-[4/3]">
                <Image
                  src="/images/hero/gate.jpeg"
                  alt="Mehran University of Engineering & Technology — Main Gate, Jamshoro"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 0vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052e16]/85 via-[#052e16]/15 to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
                  <p className="text-white font-bold text-sm">Mehran University of Engineering &amp; Technology</p>
                  <p className="text-brand-light text-xs mt-0.5 font-medium">Jamshoro, Sindh — Est. 1977</p>
                </div>
              </div>

              {/* Floating: Live badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 left-6 bg-black/50 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-2.5"
              >
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1">Active Programme</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <p className="text-white font-bold text-sm">PITP Phase II — 2025</p>
                </div>
              </motion.div>

              {/* Floating: Completion stat */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -right-5 top-1/3 -translate-y-1/2"
              >
                <div className="rounded-2xl p-4 text-center shadow-2xl" style={{ background: '#059669' }}>
                  <p className="text-white font-black text-3xl leading-none">82.1%</p>
                  <p className="text-white/70 text-[10px] mt-1.5 font-medium uppercase tracking-wide">Completion</p>
                </div>
              </motion.div>

              {/* Floating: Graduates */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -left-5 bottom-10"
              >
                <div className="bg-black/55 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3">
                  <p className="text-white font-black text-2xl leading-none">5,488+</p>
                  <p className="text-brand-light text-[10px] mt-1 font-medium">Certified Graduates</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-white/20 text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <ChevronDown size={18} className="text-white/25" />
      </motion.div>
    </section>
  )
}
