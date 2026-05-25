'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="bg-brand-steel py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-3">Commission a Project</p>
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-4">
            Partner With MUET for Your Next Training Initiative
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8">
            Government departments, funding bodies, and institutions can engage MUET as their implementing partner for large-scale, multi-district training programmes across Sindh and Pakistan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-brand-steel font-semibold rounded-lg hover:bg-white/90 transition-all hover:scale-[1.02]"
            >
              Get In Touch <ArrowRight size={18} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white/40 hover:border-white/80 text-white font-semibold rounded-lg transition-all hover:bg-white/10"
            >
              View Our Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
