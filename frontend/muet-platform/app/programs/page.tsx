'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Clock, Users, ArrowRight, ChevronRight } from 'lucide-react'
import { programs } from '@/data/programs'
import type { ProgramMode, ProgramStatus } from '@/types'

type FilterValue = 'all' | ProgramMode | ProgramStatus

const filters: { label: string; value: FilterValue }[] = [
  { label: 'All',      value: 'all'      },
  { label: 'Open',     value: 'open'     },
  { label: 'Ongoing',  value: 'ongoing'  },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Physical', value: 'physical' },
  { label: 'Online',   value: 'online'   },
  { label: 'Hybrid',   value: 'hybrid'   },
]

const accents: Record<string, string> = {
  'web-development':               '#00e5c8',
  'graphic-designing-ui-ux':       '#818cf8',
  'digital-marketing-seo':         '#fbbf24',
  'social-media-management':       '#38bdf8',
  'e-commerce':                    '#00e5c8',
  'python-development':            '#fbbf24',
  'mobile-app-development':        '#38bdf8',
  'java-development':              '#818cf8',
  'technical-freelancing':         '#00e5c8',
  'content-marketing-advertising': '#fbbf24',
  'creative-design-freelancing':   '#818cf8',
  'data-science':                  '#38bdf8',
  'database-management':           '#00e5c8',
  'cloud-computing':               '#38bdf8',
  'cyber-security':                '#818cf8',
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

const modeLabel: Record<string, string> = { physical: 'In-Person', online: 'Online', hybrid: 'Hybrid' }

const statusStyle: Record<string, { bg: string; color: string }> = {
  open:      { bg: 'rgba(0,229,200,0.1)',   color: '#00e5c8' },
  ongoing:   { bg: 'rgba(56,189,248,0.1)',   color: '#38bdf8' },
  upcoming:  { bg: 'rgba(251,191,36,0.1)',   color: '#fbbf24' },
  completed: { bg: 'rgba(129,140,248,0.1)',  color: '#818cf8' },
}

export default function ProgramsPage() {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState<FilterValue>('all')

  const shown = useMemo(() => programs.filter(p => {
    const matchFilter = active === 'all' || p.status === active || p.mode === active
    const matchSearch = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.shortDesc.toLowerCase().includes(query.toLowerCase())
    return matchFilter && matchSearch
  }), [query, active])

  return (
    <div className="min-h-screen" style={{ background: '#020b18' }}>

      {/* Header */}
      <div className="relative pt-28 pb-16 px-4 overflow-hidden" style={{ background: '#020b18', borderBottom: '1px solid rgba(0,229,200,0.12)' }}>
        <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,229,200,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(0,229,200,0.1)', color: '#00e5c8', border: '1px solid rgba(0,229,200,0.2)' }}>
            Programme Catalogue
          </span>
          <h1 className="font-display font-extrabold leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.03em', color: '#e8f4ff' }}>
            All 15 Programmes
          </h1>
          <p className="max-w-lg leading-relaxed" style={{ color: 'rgba(232,244,255,0.5)', fontSize: '16px' }}>
            Free, certified IT and digital skills programmes for Sindh youth. Government-approved, zero cost — apply today.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-20 backdrop-blur-xl" style={{ background: 'rgba(2,11,24,0.92)', borderBottom: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative w-full sm:w-60">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#607896' }} />
              <input
                type="text"
                placeholder="Search programmes…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder-[#607896] focus:outline-none focus:ring-1 transition-all"
                style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)', color: '#e8f4ff' }}
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
                  style={active === f.value
                    ? { background: 'rgba(0,229,200,0.1)', color: '#00e5c8', borderColor: 'rgba(0,229,200,0.4)', boxShadow: '0 0 12px rgba(0,229,200,0.12)' }
                    : { background: 'transparent', color: '#607896', borderColor: 'rgba(0,229,200,0.12)' }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="text-xs sm:ml-auto shrink-0 font-medium" style={{ color: '#607896' }}>{shown.length} / 15</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {shown.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-semibold mb-1" style={{ color: '#607896' }}>No programmes found</p>
            <p className="text-sm" style={{ color: '#607896' }}>Try a different filter or search term.</p>
          </div>
        ) : (
          <motion.div
            key={active + query}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {shown.map((program, i) => {
              const accent = accents[program.slug] ?? '#00e5c8'
              const emoji  = emojis[program.slug]  ?? '💡'
              const st = statusStyle[program.status] ?? statusStyle.upcoming
              return (
                <motion.div
                  key={program.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <Link
                    href={`/programs/${program.slug}`}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden relative transition-all duration-300"
                    style={{ background: '#061224', border: `1px solid ${accent}20` }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${accent}40`; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${accent}08` }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = `${accent}20`; el.style.transform = ''; el.style.boxShadow = '' }}
                  >
                    {/* Bottom glow on hover */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

                    <div className="h-0.5 shrink-0" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                        >
                          {emoji}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full capitalize"
                            style={{ background: st.bg, color: st.color }}>
                            {program.status}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}>
                            {modeLabel[program.mode] ?? program.mode}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-base leading-snug mb-2" style={{ color: '#e8f4ff' }}>
                        {program.title}
                      </h3>
                      <p className="text-sm leading-relaxed line-clamp-2 flex-1 mb-5" style={{ color: 'rgba(232,244,255,0.5)' }}>
                        {program.shortDesc}
                      </p>

                      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
                        <div className="flex items-center gap-3 text-xs" style={{ color: '#607896' }}>
                          <span className="flex items-center gap-1.5"><Clock size={11} style={{ color: accent }} />{program.duration}</span>
                          <span className="flex items-center gap-1.5"><Users size={11} style={{ color: accent }} />{program.seats}</span>
                        </div>
                        <ChevronRight size={15} style={{ color: accent }} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}
