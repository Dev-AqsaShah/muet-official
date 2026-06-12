'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, Presentation, ShieldCheck, ArrowRight } from 'lucide-react'
import { portalLinks } from '@/config/navigation'

const portalCards = [
  {
    icon: GraduationCap,
    accent: '#00e5c8',
    title: 'Student Portal',
    desc: 'Track attendance, submit assignments, attempt quizzes, view grades, and download your verified certificate.',
    href: portalLinks.items[0].href,
  },
  {
    icon: Presentation,
    accent: '#38bdf8',
    title: 'Teacher Portal',
    desc: 'Manage your classes, mark attendance, upload course materials, build quizzes, and grade submissions.',
    href: portalLinks.items[1].href,
  },
  {
    icon: ShieldCheck,
    accent: '#fbbf24',
    title: 'Admin Dashboard',
    desc: 'Approve students, manage batches and centres, issue certificates, and generate programme reports.',
    href: portalLinks.items[2].href,
  },
]

export default function PortalsSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#020b18', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#00e5c8' }}>
            Learning Management System
          </p>
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em', color: '#e8f4ff' }}>
            One Platform. Three Portals.
          </h2>
          <p className="text-base max-w-2xl mx-auto font-light" style={{ color: 'rgba(232,244,255,0.55)' }}>
            Every trainee, instructor, and administrator gets a dedicated workspace —
            attendance, assignments, quizzes, grading, and certification, all in one system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portalCards.map(({ icon: Icon, accent, title, desc, href }, i) => (
            <motion.a
              key={title}
              href={href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#061224', border: `1px solid ${accent}22` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${accent}12`, border: `1px solid ${accent}30` }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#e8f4ff' }}>{title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(232,244,255,0.55)' }}>{desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5" style={{ color: accent }}>
                Open Portal <ArrowRight size={15} />
              </span>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm mt-10"
          style={{ color: '#607896' }}
        >
          New trainee?{' '}
          <Link href="/admissions" className="font-semibold" style={{ color: '#00e5c8' }}>
            See how admissions work →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
