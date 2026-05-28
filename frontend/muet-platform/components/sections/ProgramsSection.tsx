'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Users, ChevronRight } from 'lucide-react'
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

const emojis: Record<string, string> = {
  'web-development':               '🌐',
  'graphic-designing-ui-ux':       '🎨',
  'digital-marketing-seo':         '📈',
  'social-media-management':       '📱',
  'e-commerce':                    '🛒',
  'python-development':            '🐍',
  'mobile-app-development':        '📲',
  'java-development':              '☕',
  'technical-freelancing':         '💼',
  'content-marketing-advertising': '✍️',
  'creative-design-freelancing':   '🖌️',
  'data-science':                  '📊',
  'database-management':           '🗄️',
  'cloud-computing':               '☁️',
  'cyber-security':                '🔒',
}

const preview = programs.slice(0, 6)

export default function ProgramsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/15">
              Programme Catalogue
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-forest leading-tight">
              15 Certified IT Programmes
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-lg leading-relaxed">
              Free government-approved specializations in digital skills, applied technology, and advanced computing — for Sindh youth.
            </p>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-brand-green font-semibold text-sm hover:text-brand-mid transition-colors shrink-0 mb-1"
          >
            All 15 Programmes <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {preview.map((program, i) => {
            const accent = accents[program.slug] ?? '#34d399'
            const emoji  = emojis[program.slug] ?? '💡'
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-2xl hover:shadow-brand-green/8 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Accent top bar */}
                  <div className="h-1 w-full shrink-0" style={{ background: accent }} />

                  <div className="flex flex-col flex-1 p-6">
                    {/* Icon + status row */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                        style={{ background: accent + '18', border: `1px solid ${accent}30` }}
                      >
                        {emoji}
                      </div>
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full capitalize"
                        style={{ background: accent + '18', color: accent }}
                      >
                        {program.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-brand-forest text-base leading-snug mb-2 group-hover:text-brand-green transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
                      {program.shortDesc}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock size={11} style={{ color: accent }} />{program.duration}</span>
                        <span className="flex items-center gap-1"><Users size={11} style={{ color: accent }} />{program.seats}</span>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-gray-300 group-hover:translate-x-1 transition-transform duration-300"
                        style={{ color: accent }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-green hover:bg-brand-mid text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-brand-green/25 text-sm"
          >
            View All 15 Programmes <ArrowRight size={15} />
          </Link>
          <span className="text-gray-400 text-xs">+9 more specializations</span>
        </motion.div>

      </div>
    </section>
  )
}
