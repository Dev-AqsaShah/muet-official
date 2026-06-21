'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-28 text-center relative overflow-hidden" style={{ background: '#020b18', borderTop: '1px solid rgba(0,229,200,0.12)' }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,200,0.06), transparent 70%)' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-6" style={{ color: '#00e5c8' }}>Admissions Open</p>

          <h2
            className="font-display font-extrabold leading-none mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.04em', color: '#e8f4ff' }}
          >
            Your Seat at{' '}
            <span
              style={{
                background: 'linear-gradient(120deg, #00e5c8, #38bdf8, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MUET
            </span>
            {' '}is Waiting
          </h2>

          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto font-light" style={{ color: 'rgba(232,244,255,0.55)' }}>
            Free certified IT training with a monthly stipend at MUET Main Campus, Jamshoro.
            Apply in the current BBSHRRDB admission phase — seats are limited per batch.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm transition-all"
              style={{ background: 'linear-gradient(135deg, #00e5c8, #38bdf8)', color: '#020b18', boxShadow: '0 0 30px rgba(0,229,200,0.35)' }}
            >
              Apply for Admission <ArrowRight size={16} />
            </Link>
            <Link
              href="/course"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-medium text-sm transition-all"
              style={{ border: '1px solid rgba(0,229,200,0.3)', color: '#e8f4ff', background: 'rgba(0,229,200,0.04)' }}
            >
              Explore the Course
            </Link>
          </div>
        </motion.div>

        {/* Contact info band */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-12 mt-16 pt-12"
          style={{ borderTop: '1px solid rgba(0,229,200,0.1)' }}
        >
          {[
            { label: 'Phone', value: '+92 22 2772250' },
            { label: 'Email', value: 'oric@muet.edu.pk' },
            { label: 'Address', value: 'MUET, Jamshoro, Sindh' },
          ].map(item => (
            <div key={item.label}>
              <strong className="block text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#00e5c8', letterSpacing: '0.12em' }}>{item.label}</strong>
              <span className="text-sm" style={{ color: 'rgba(232,244,255,0.7)' }}>{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
