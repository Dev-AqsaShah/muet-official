'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#4682B4' }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(27,58,107,0.4) 0%, transparent 70%)' }} />
      </div>
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-widest mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
            Interested in Our Programmes?
          </div>

          <h2 className="font-display text-3xl md:text-5xl text-white font-bold mb-5 leading-tight">
            Partner With MUET for Your Next Training Initiative
          </h2>

          <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Government departments, funding bodies, and institutions can engage MUET as their implementing
            partner for large-scale, multi-district certified training programmes across Sindh and Pakistan.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white font-semibold rounded-xl transition-all hover:scale-[1.03] text-sm shadow-xl"
              style={{ color: '#1B3A6B' }}
            >
              Contact Us <ArrowRight size={17} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/35 hover:border-white/65 hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
            >
              View Our Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
