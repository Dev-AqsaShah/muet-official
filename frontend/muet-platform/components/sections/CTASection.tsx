'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, Building } from 'lucide-react'

const contactPoints = [
  { icon: Mail,     label: 'Email',   value: 'oric@muet.edu.pk' },
  { icon: Phone,    label: 'Phone',   value: '+92 22 2772320' },
  { icon: Building, label: 'Office',  value: 'ORIC, MUET, Jamshoro' },
]

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#052e16' }}>
      {/* Glow orb */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(5,150,105,0.25) 0%, transparent 70%)' }} />
      </div>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #34d399 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-light text-xs font-bold uppercase tracking-widest mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-light animate-pulse" />
              Commission a Project
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6 leading-tight">
              Partner With MUET for Your Next{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-green">
                Training Initiative
              </span>
            </h2>

            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Government departments, funding bodies, and institutions can engage MUET as their implementing
              partner for large-scale, multi-district training programmes across Sindh and Pakistan.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-green hover:bg-brand-mid text-white font-semibold rounded-xl transition-all hover:scale-[1.03] shadow-xl shadow-brand-green/30 text-sm"
              >
                Get In Touch <ArrowRight size={16} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/20 hover:border-brand-light/50 text-white font-semibold rounded-xl transition-all hover:bg-white/6 text-sm"
              >
                View Our Projects
              </Link>
            </div>
          </motion.div>

          {/* Right — Contact card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="rounded-3xl p-8 border border-white/10" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
              <p className="text-brand-light font-bold text-xs uppercase tracking-widest mb-6">Direct Contact</p>

              <div className="space-y-5 mb-8">
                {contactPoints.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-brand-light" />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs mb-0.5">{label}</p>
                      <p className="text-white font-semibold text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-white/40 text-sm mb-1 font-medium">Office Hours</p>
                <p className="text-white text-sm">Monday – Friday &nbsp;·&nbsp; 9:00 AM – 5:00 PM PKT</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
