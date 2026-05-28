'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Shield, Users, MapPin } from 'lucide-react'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, delay } },
})

const pills = [
  { icon: Shield,  label: '100% Free' },
  { icon: Users,   label: '5,488+ Certified' },
  { icon: MapPin,  label: '12 Districts' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#052e16' }}>

      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.25) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.055]"
        style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #34d399 1.5px, transparent 0)', backgroundSize: '36px 36px' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            {/* Pills */}
            <motion.div {...fade(0)} className="flex flex-wrap gap-2 mb-6">
              {pills.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-light/30 text-brand-light bg-brand-light/10">
                  <Icon size={11} />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.p {...fade(0.05)} className="text-brand-light text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Mehran University of Engineering &amp; Technology — Jamshoro
            </motion.p>

            <motion.h1 {...fade(0.12)} className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.1] mb-6">
              Where Ambition Meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-green">
                Certified Excellence
              </span>
            </motion.h1>

            <motion.p {...fade(0.2)} className="text-white/65 text-lg leading-relaxed mb-3 max-w-xl">
              MUET manages certified training programmes across Sindh — partnering with BBSHRRDB,
              the Government of Sindh, and Pakistan to deliver digital skills to over 5,000 graduates.
            </motion.p>

            <motion.p {...fade(0.25)} className="text-white/40 text-sm leading-relaxed mb-9 max-w-lg">
              Implementing institution for PITP, NFTP, and BBSHRRDB programmes across 12 districts.
            </motion.p>

            <motion.div {...fade(0.3)} className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-green hover:bg-brand-mid text-white font-semibold rounded-xl transition-all hover:scale-[1.03] shadow-lg shadow-brand-green/30"
              >
                View Our Projects <ArrowRight size={18} />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-brand-light/60 text-white font-semibold rounded-xl transition-all hover:bg-white/8"
              >
                Browse Programmes
              </Link>
            </motion.div>
          </div>

          {/* Right — Campus image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-green/30">
              <Image
                src="/images/hero/gate.jpeg"
                alt="Mehran University of Engineering & Technology — Main Gate, Jamshoro"
                width={700}
                height={460}
                className="object-cover w-full"
                priority
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#052e16]/90 via-transparent to-transparent" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
                <p className="text-white font-bold text-sm">Mehran University of Engineering &amp; Technology</p>
                <p className="text-brand-light text-xs mt-0.5">Jamshoro, Sindh — Est. 1977</p>
              </div>

              {/* Floating stat chips */}
              <motion.div
                className="absolute top-5 right-5 flex flex-col gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {[
                  { value: '5,488+', label: 'Graduates' },
                  { value: '15', label: 'Programmes' },
                ].map(s => (
                  <div key={s.label} className="bg-black/40 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 text-center">
                    <p className="text-white font-bold text-lg leading-none">{s.value}</p>
                    <p className="text-white/60 text-[10px] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-white/25 text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="text-white/30" />
      </motion.div>
    </section>
  )
}
