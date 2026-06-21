'use client'
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

const iconColors = [
  '#00e5c8', '#38bdf8', '#fbbf24', '#818cf8',
  '#00e5c8', '#38bdf8', '#fbbf24', '#818cf8',
]

const statusStyle: Record<string, { bg: string; color: string }> = {
  open:      { bg: 'rgba(0,229,200,0.1)',   color: '#00e5c8' },
  ongoing:   { bg: 'rgba(56,189,248,0.1)',   color: '#38bdf8' },
  upcoming:  { bg: 'rgba(251,191,36,0.1)',   color: '#fbbf24' },
  completed: { bg: 'rgba(129,140,248,0.1)',  color: '#818cf8' },
}

const preview = programs.slice(0, 8)

export default function ProgramsSection() {
  return (
    <section className="py-24 relative" style={{ background: 'linear-gradient(180deg, #020b18 0%, #061224 50%, #020b18 100%)', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00e5c8)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>BBSHRRDB Course Tracks</span>
            <div className="w-8 h-px" style={{ background: 'linear-gradient(270deg, transparent, #00e5c8)' }} />
          </div>
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 54px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
            Programs at Main Campus
          </h2>
          <p className="max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(232,244,255,0.5)', fontSize: '16px' }}>
            Eight certified IT tracks under the BBSHRRDB programme — all taught at MUET Main Campus, Jamshoro, all free with monthly stipend.
          </p>
        </motion.div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {preview.map((program, i) => {
            const emoji = emojis[program.slug] ?? '💡'
            const iconColor = iconColors[i % iconColors.length]
            const st = statusStyle[program.status] ?? statusStyle.upcoming
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden relative transition-all duration-300"
                  style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.25)'; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(0,229,200,0.08)' }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.1)'; el.style.transform = ''; el.style.boxShadow = '' }}
                >
                  {/* Bottom glow on hover */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${iconColor}, transparent)` }} />

                  <div className="p-6 pb-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 relative"
                      style={{ background: `${iconColor}18`, border: `1px solid ${iconColor}30` }}>
                      {emoji}
                    </div>
                    <h4 className="font-display font-bold text-sm leading-snug mb-2" style={{ color: '#e8f4ff' }}>
                      {program.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: '#607896' }}>
                      {program.shortDesc}
                    </p>
                  </div>

                  <div className="mt-auto p-5 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#607896' }}>
                      <span className="flex items-center gap-1"><Clock size={10} style={{ color: iconColor }} />{program.duration.split(' (')[0]}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                      style={{ background: st.bg, color: st.color }}>{program.status}</span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
            style={{ background: 'linear-gradient(135deg, #00e5c8, #38bdf8)', color: '#020b18', boxShadow: '0 0 24px rgba(0,229,200,0.3)' }}
          >
            Explore the Full Course <ArrowRight size={15} />
          </Link>
          
        </div>
      </div>
    </section>
  )
}
