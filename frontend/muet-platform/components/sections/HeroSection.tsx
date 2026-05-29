'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const stats = [
  { n: '5,488+', label: 'Certified Graduates' },
  { n: '82.1%',  label: 'Completion Rate'     },
  { n: '20',     label: 'Training Centers'     },
  { n: 'PKR 19M+', label: 'Graduate Earnings' },
  { n: '12',     label: 'Districts Covered'    },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden" style={{ background: '#020b18' }}>

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-[200px] -left-[100px] w-[600px] h-[600px] rounded-full"
        style={{ background: 'rgba(0,229,200,0.07)', filter: 'blur(120px)', animation: 'orbFloat 12s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute top-[40%] -right-[150px] w-[500px] h-[500px] rounded-full"
        style={{ background: 'rgba(56,189,248,0.05)', filter: 'blur(120px)', animation: 'orbFloat 12s ease-in-out infinite', animationDelay: '-4s' }} />
      <div className="pointer-events-none absolute -bottom-[100px] left-[30%] w-[400px] h-[400px] rounded-full"
        style={{ background: 'rgba(129,140,248,0.06)', filter: 'blur(120px)', animation: 'orbFloat 12s ease-in-out infinite', animationDelay: '-8s' }} />

      {/* Dot grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32">

        {/* Chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-xs font-bold uppercase tracking-widest"
          style={{
            background: 'rgba(0,229,200,0.08)',
            border: '1px solid rgba(0,229,200,0.3)',
            color: '#00e5c8',
            letterSpacing: '0.12em',
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: '#00e5c8', animation: 'blink 1.8s ease-in-out infinite', boxShadow: '0 0 8px #00e5c8' }}
          />
          Sindh&apos;s Premier IT Training Institution
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold leading-none mb-7"
          style={{ fontSize: 'clamp(52px, 8vw, 100px)', letterSpacing: '-0.04em', color: '#e8f4ff' }}
        >
          Powering<br />
          Sindh&apos;s{' '}
          <span
            style={{
              background: 'linear-gradient(120deg, #00e5c8 0%, #38bdf8 40%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(0,229,200,0.4))',
            }}
          >
            Digital Future
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light"
          style={{ color: 'rgba(232,244,255,0.6)', fontSize: '18px' }}
        >
          Mehran University of Engineering &amp; Technology delivers government-certified IT training
          across 12 districts — executing large-scale mandates for federal and provincial funding bodies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm transition-all"
            style={{
              background: 'linear-gradient(135deg, #00e5c8, #38bdf8)',
              color: '#020b18',
              boxShadow: '0 0 30px rgba(0,229,200,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            Explore Projects <ArrowRight size={16} />
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-medium text-sm transition-all"
            style={{
              border: '1px solid rgba(0,229,200,0.3)',
              color: '#e8f4ff',
              background: 'rgba(0,229,200,0.04)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Browse Programmes
          </Link>
        </motion.div>

        {/* Stats band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(0,229,200,0.12)',
            background: 'rgba(6,18,36,0.7)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 80px rgba(0,229,200,0.12)',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex-1 min-w-[120px] px-8 py-7 text-center relative"
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(0,229,200,0.1)' : 'none' }}
            >
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,200,0.05), transparent 70%)', pointerEvents: 'none' }} />
              <p
                className="font-display font-extrabold leading-none mb-1.5"
                style={{ fontSize: '34px', color: '#00e5c8', textShadow: '0 0 20px rgba(0,229,200,0.5)' }}
              >
                {s.n}
              </p>
              <p className="text-xs font-medium" style={{ color: '#607896', letterSpacing: '0.05em' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
