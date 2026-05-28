'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Users, ChevronRight } from 'lucide-react'
import { programs } from '@/data/programs'

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

const statusColors: Record<string, React.CSSProperties> = {
  open:      { background: '#dcfce7', color: '#166534' },
  ongoing:   { background: '#dbeafe', color: '#1e40af' },
  upcoming:  { background: '#fef3c7', color: '#92400e' },
  completed: { background: '#f1f5f9', color: '#475569' },
}

const preview = programs.slice(0, 6)

export default function ProgramsSection() {
  return (
    <section className="py-24" style={{ background: '#F8FAFC' }}>
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
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1B3A6B' }}>
              Programme Catalogue
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#1B3A6B' }}>
              15 Certified IT Programmes
            </h2>
            <p className="text-brand-gray text-sm mt-2 max-w-lg leading-relaxed">
              Free, government-approved specializations in digital skills, applied technology, and advanced computing for Sindh youth.
            </p>
          </div>
          <Link href="/programs" className="inline-flex items-center gap-1.5 font-semibold text-sm hover:underline shrink-0 mb-1" style={{ color: '#4682B4' }}>
            All 15 Programmes <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((program, i) => {
            const emoji  = emojis[program.slug] ?? '💡'
            const status = statusColors[program.status] ?? statusColors.upcoming
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
                  className="group flex flex-col h-full bg-white rounded-2xl border border-gray-200 hover:border-brand-steel/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  style={{ boxShadow: '0 2px 8px rgba(70,130,180,0.06)' }}
                >
                  {/* Top accent */}
                  <div className="h-1 w-full shrink-0" style={{ background: '#4682B4' }} />

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-brand-offwhite border border-gray-100">
                        {emoji}
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full capitalize" style={status}>
                        {program.status}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base leading-snug mb-2 group-hover:text-brand-steel transition-colors" style={{ color: '#1B3A6B' }}>
                      {program.title}
                    </h3>
                    <p className="text-brand-gray text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
                      {program.shortDesc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5"><Clock size={11} className="text-brand-steel" />{program.duration}</span>
                        <span className="flex items-center gap-1.5"><Users size={11} className="text-brand-steel" />{program.seats} seats</span>
                      </div>
                      <ChevronRight size={15} className="text-gray-300 group-hover:text-brand-steel group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] text-sm shadow-lg"
            style={{ background: '#4682B4', boxShadow: '0 6px 20px rgba(70,130,180,0.3)' }}
          >
            View All 15 Programmes <ArrowRight size={15} />
          </Link>
          <span className="text-gray-400 text-xs">+9 more specializations</span>
        </motion.div>

      </div>
    </section>
  )
}
