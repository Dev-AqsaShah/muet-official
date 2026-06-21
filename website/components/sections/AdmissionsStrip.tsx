'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MonitorCheck, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react'

const AMBER = '#fbbf24'

const steps = [
  {
    icon: MonitorCheck,
    title: '1. Apply Online',
    desc: 'Submit your application during the announced admission phase — 15 days per phase, one course per candidate.',
  },
  {
    icon: ShieldCheck,
    title: '2. Get Verified',
    desc: 'Applications are verified digitally through FMIS and NADRA Verisys. Selected candidates are placed on merit.',
  },
  {
    icon: GraduationCap,
    title: '3. Train & Certify',
    desc: 'Attend classes at MUET Main Campus with a monthly stipend, and graduate with a Govt × MUET verified certificate.',
  },
]

export default function AdmissionsStrip() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#061224', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute -top-20 right-0 w-96 h-96 rounded-full"
        style={{ background: `${AMBER}08`, filter: 'blur(100px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: AMBER }}>Admissions</span>
          <h2 className="font-display font-extrabold mt-3 mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
            Three Steps to a Funded Seat
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: 'rgba(232,244,255,0.5)', fontSize: '15px' }}>
            Eligibility: unemployed Sindh youth, aged 18–35, valid CNIC and Sindh domicile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl p-7 relative"
              style={{ background: '#020b18', border: `1px solid ${AMBER}1f` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${AMBER}12`, border: `1px solid ${AMBER}30` }}>
                <Icon size={22} style={{ color: AMBER }} />
              </div>
              <h3 className="font-display font-bold text-base mb-2" style={{ color: '#e8f4ff' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,244,255,0.55)' }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
            style={{ background: `linear-gradient(135deg, ${AMBER}, #f59e0b)`, color: '#020b18', boxShadow: `0 0 28px ${AMBER}40` }}
          >
            Read the Full Admission Guide <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
