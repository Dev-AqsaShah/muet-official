'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Clock, Users, ArrowRight, SlidersHorizontal, ChevronRight } from 'lucide-react'
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

const modeLabel: Record<string, string> = { physical: 'In-Person', online: 'Online', hybrid: 'Hybrid' }

export default function ProgramsPage() {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState<FilterValue>('all')

  const shown = useMemo(() => programs.filter(p => {
    const matchFilter = active === 'all' || p.status === active || p.mode === active
    const matchSearch = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.shortDesc.toLowerCase().includes(query.toLowerCase())
    return matchFilter && matchSearch
  }), [query, active])

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>

      {/* Header */}
      <div className="relative pt-28 pb-16 px-4 overflow-hidden" style={{ background: '#1B3A6B' }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #89CFF0 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full blur-[90px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(70,130,180,0.35) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-baby mb-4 px-3 py-1 rounded-full bg-brand-baby/10 border border-brand-baby/20">
            Programme Catalogue
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            All 15 Programmes
          </h1>
          <p className="text-white/50 text-base max-w-lg leading-relaxed">
            Free, certified IT and digital skills programmes for Sindh youth. Government-approved, zero cost — apply today.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-20 bg-white/96 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative w-full sm:w-60">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search programmes…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-steel/25 focus:border-brand-steel transition-all"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <SlidersHorizontal size={12} className="text-gray-400 mr-1 shrink-0" />
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active === f.value
                      ? 'text-white shadow-sm'
                      : 'text-gray-500 border border-gray-200 hover:border-brand-steel hover:text-brand-steel bg-white'
                  }`}
                  style={active === f.value ? { background: '#4682B4' } : {}}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="text-gray-400 text-xs sm:ml-auto shrink-0 font-medium">{shown.length} / 15</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {shown.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-semibold text-gray-500 mb-1">No programmes found</p>
            <p className="text-sm text-gray-400">Try a different filter or search term.</p>
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
              const accent = accents[program.slug] ?? '#34d399'
              const emoji  = emojis[program.slug]  ?? '💡'
              return (
                <motion.div
                  key={program.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <Link
                    href={`/programs/${program.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white hover:border-brand-steel/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    style={{ boxShadow: '0 2px 8px rgba(70,130,180,0.06)' }}
                  >
                    <div className="h-1 w-full shrink-0" style={{ background: 'linear-gradient(90deg, #4682B4, #89CFF0)' }} />

                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                          style={{ background: '#dbeafe', border: '1px solid #bfdbfe' }}
                        >
                          {emoji}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full capitalize" style={{ background: '#dbeafe', color: '#1B3A6B' }}>
                            {program.status}
                          </span>
                          <span className="text-[10px] text-gray-400 border border-gray-100 px-2 py-0.5 rounded-full">
                            {modeLabel[program.mode] ?? program.mode}
                          </span>
                        </div>
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
                          <span className="flex items-center gap-1.5"><Users size={11} className="text-brand-steel" />{program.seats}</span>
                        </div>
                        <ChevronRight size={15} className="text-brand-steel group-hover:translate-x-1 transition-transform duration-300" />
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
