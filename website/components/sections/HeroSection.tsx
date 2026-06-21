'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

const stats = [
  { n: '100%',     label: 'Free Training',        accent: '#00e5c8' },
  { n: 'Monthly',  label: 'Stipend Paid',          accent: '#fbbf24' },
  { n: '8',        label: 'IT Programs',           accent: '#38bdf8' },
  { n: '120 hrs',  label: 'Per Course',            accent: '#818cf8' },
  { n: 'Govt × MUET', label: 'Verified Certificate', accent: '#00e5c8' },
  { n: '18–35',    label: 'Age Eligibility',       accent: '#fbbf24' },
]

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#020b18' }}
    >
      {/* Real campus photo background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/muet-campus.jpg"
          alt="MUET Main Campus, Jamshoro"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, #020b18 35%, rgba(2,11,24,0.75) 70%, rgba(2,11,24,0.55) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(to top, #020b18, transparent)' }} />
      </div>

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-40 -left-24 w-[560px] h-[560px] rounded-full"
        style={{ background: 'rgba(0,229,200,0.07)', filter: 'blur(120px)', animation: 'orbFloat 12s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-[480px] h-[480px] rounded-full"
        style={{ background: 'rgba(251,191,36,0.04)', filter: 'blur(120px)', animation: 'orbFloat 12s ease-in-out infinite', animationDelay: '-4s' }} />

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[11px] font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(251,191,36,0.08)',
                border: '1px solid rgba(251,191,36,0.3)',
                color: '#fbbf24',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: '#fbbf24', animation: 'blink 1.8s ease-in-out infinite', boxShadow: '0 0 6px #fbbf24' }}
              />
              BBSHRRDB × MUET — Government of Sindh
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(38px, 5vw, 68px)', letterSpacing: '-0.03em', color: '#e8f4ff' }}
            >
              Learn IT Skills.<br />
              <span
                style={{
                  background: 'linear-gradient(120deg, #00e5c8 0%, #38bdf8 50%, #fbbf24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 24px rgba(0,229,200,0.35))',
                }}
              >
                Get Paid
              </span>
              {' '}to Learn.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="leading-relaxed mb-10 max-w-xl"
              style={{ color: 'rgba(232,244,255,0.6)', fontSize: '16px', fontWeight: 400 }}
            >
              The BBSHRRDB Skills Development Programme at Mehran University of Engineering &amp; Technology —
              free, certified IT training with a monthly stipend at the Main Campus, Jamshoro.
              For unemployed Sindh youth aged 18–35.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, #00e5c8, #38bdf8)',
                  color: '#020b18',
                  boxShadow: '0 0 28px rgba(0,229,200,0.3)',
                }}
              >
                Apply for Admission <ArrowRight size={15} />
              </Link>
              <Link
                href="/course"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-all"
                style={{
                  border: '1px solid rgba(0,229,200,0.25)',
                  color: '#e8f4ff',
                  background: 'rgba(0,229,200,0.04)',
                }}
              >
                Explore the Course <ChevronRight size={15} />
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 text-xs"
              style={{ color: '#607896' }}
            >
              Funded by the Government of Sindh &nbsp;·&nbsp; Established by Sindh Assembly Act 2013 &nbsp;·&nbsp; Implemented by MUET
            </motion.p>
          </div>

          {/* ── Right column — stats grid ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="grid grid-cols-2 gap-3"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{
                  background: 'rgba(6,18,36,0.85)',
                  border: `1px solid ${s.accent}20`,
                  boxShadow: `0 0 24px ${s.accent}08`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="pointer-events-none absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${s.accent}08, transparent 70%)` }} />
                <p
                  className="font-display font-semibold leading-none mb-1.5"
                  style={{ fontSize: '24px', color: s.accent, textShadow: `0 0 16px ${s.accent}60` }}
                >
                  {s.n}
                </p>
                <p className="text-xs font-medium" style={{ color: '#8aa2c0', letterSpacing: '0.04em' }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
