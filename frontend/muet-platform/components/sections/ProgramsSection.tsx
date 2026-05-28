'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Users } from 'lucide-react'
import { programs } from '@/data/programs'

const accents: Record<string, string> = {
  'web-development':               '#34d399',
  'graphic-designing-ui-ux':       '#a78bfa',
  'digital-marketing-seo':         '#fb923c',
  'social-media-management':       '#c084fc',
  'e-commerce':                    '#4ade80',
  'python-development':            '#fbbf24',
  'mobile-app-development':        '#34d399',
  'java-development':              '#f87171',
  'technical-freelancing':         '#2dd4bf',
  'content-marketing-advertising': '#fcd34d',
  'creative-design-freelancing':   '#f472b6',
  'data-science':                  '#818cf8',
  'database-management':           '#38bdf8',
  'cloud-computing':               '#60a5fa',
  'cyber-security':                '#94a3b8',
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
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-3 py-1 rounded-full bg-brand-green/10">
            Programme Curriculum
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-forest leading-tight mb-3">
            Certified IT Programmes
          </h2>
          <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
            15 government-approved specializations across digital skills, applied technology, and advanced computing.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {preview.map((program, i) => {
            const accent = accents[program.slug] ?? '#34d399'
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group relative flex items-center gap-5 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden"
                  style={{ background: '#064e3b' }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.15) 0%, transparent 60%)' }} />

                  <div className="relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent + '22', border: `1px solid ${accent}44` }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
                  </div>

                  <div className="relative flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base mb-0.5 group-hover:text-brand-light transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed line-clamp-1">
                      {program.shortDesc}
                    </p>
                  </div>

                  <div className="relative hidden sm:flex items-center gap-5 text-xs text-white/35 shrink-0">
                    <span className="flex items-center gap-1.5"><Clock size={11} />{program.duration}</span>
                    <span className="flex items-center gap-1.5"><Users size={11} />{program.seats} seats</span>
                  </div>

                  <ArrowRight size={16} className="relative shrink-0 text-white/20 group-hover:text-brand-light group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex items-center gap-4"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-green hover:bg-brand-mid text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-brand-green/25 text-sm"
          >
            View All 15 Programmes <ArrowRight size={15} />
          </Link>
          <span className="text-gray-400 text-xs">+11 more specializations</span>
        </motion.div>

      </div>
    </section>
  )
}
