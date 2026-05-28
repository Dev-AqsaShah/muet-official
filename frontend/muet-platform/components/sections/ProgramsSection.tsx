'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Users } from 'lucide-react'
import { programs } from '@/data/programs'

const accents: Record<string, string> = {
  'web-development':               '#2563eb',
  'graphic-designing-ui-ux':       '#7c3aed',
  'digital-marketing-seo':         '#ea580c',
  'social-media-management':       '#9333ea',
  'e-commerce':                    '#16a34a',
  'python-development':            '#d97706',
  'mobile-app-development':        '#059669',
  'java-development':              '#dc2626',
  'technical-freelancing':         '#0d9488',
  'content-marketing-advertising': '#b45309',
  'creative-design-freelancing':   '#be185d',
  'data-science':                  '#6d28d9',
  'database-management':           '#0891b2',
  'cloud-computing':               '#0284c7',
  'cyber-security':                '#475569',
}

const preview = programs.slice(0, 4)

export default function ProgramsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-brand-steel text-xs font-semibold uppercase tracking-widest mb-3">
            Programme Curriculum
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight mb-3">
            Certified IT Programmes
          </h2>
          <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
            15 government-approved specializations across digital skills, applied technology, and advanced computing.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {preview.map((program, i) => {
            const accent = accents[program.slug] ?? '#2563eb'
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group relative flex items-center gap-5 rounded-2xl px-6 py-5 shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-110"
                  style={{ backgroundColor: '#1B3A6B' }}
                >
                  <div
                    className="shrink-0 w-2.5 h-2.5 rounded-full"
                    style={{ background: accent }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base mb-1 group-hover:text-brand-baby transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-1">
                      {program.shortDesc}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-white/40 shrink-0">
                    <span className="flex items-center gap-1.5"><Clock size={11} />{program.duration}</span>
                    <span className="flex items-center gap-1.5"><Users size={11} />{program.seats} seats</span>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-white/25 group-hover:text-brand-baby group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex items-center gap-4"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-7 py-3 bg-brand-steel hover:bg-brand-navy text-white font-semibold rounded-lg transition-colors text-sm"
          >
            View All 15 Programmes <ArrowRight size={15} />
          </Link>
          <span className="text-gray-400 text-xs">+11 more specializations</span>
        </motion.div>

      </div>
    </section>
  )
}
