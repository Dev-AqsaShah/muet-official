'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#052e16' }}>
      {/* Animated gradient orb */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.3) 0%, transparent 70%)' }} />
      </div>
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #34d399 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-light text-xs font-bold uppercase tracking-widest mb-6">
            <Mail size={12} />
            Commission a Project
          </div>

          <h2 className="font-display text-3xl md:text-5xl text-white font-bold mb-5 leading-tight">
            Partner With MUET for Your Next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-green">
              Training Initiative
            </span>
          </h2>

          <p className="text-white/55 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Government departments, funding bodies, and institutions can engage MUET as their implementing
            partner for large-scale, multi-district training programmes across Sindh and Pakistan.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-mid text-white font-semibold rounded-xl transition-all hover:scale-[1.03] shadow-xl shadow-brand-green/30 text-sm"
            >
              Get In Touch <ArrowRight size={18} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 hover:border-brand-light/60 text-white font-semibold rounded-xl transition-all hover:bg-white/8 text-sm"
            >
              View Our Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
