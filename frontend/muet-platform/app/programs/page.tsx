'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Clock, Users, ArrowRight, SlidersHorizontal } from 'lucide-react'
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
    <div className="min-h-screen" style={{ background: '#f0fdf4' }}>

      {/* Header */}
      <div className="relative pt-28 pb-14 px-4 overflow-hidden" style={{ background: '#064e3b' }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #34d399 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.3) 0%, transparent 70%)' }} />
        <div className="relative max-w-5xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-light mb-3 px-3 py-1 rounded-full bg-brand-light/10 border border-brand-light/20">
            Programme Catalogue
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">All 15 Programmes</h1>
          <p className="text-white/50 text-sm max-w-lg leading-relaxed">
            Free, certified IT and digital skills programmes for Sindh youth. Government-approved, zero cost.
          </p>
        </div>
      </div>

      {/* Sticky filters */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programmes…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/25 focus:border-brand-green transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal size={13} className="text-gray-400 mr-1 shrink-0" />
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  active === f.value
                    ? 'bg-brand-green text-white shadow-sm shadow-brand-green/30'
                    : 'text-gray-500 border border-gray-200 hover:border-brand-green hover:text-brand-green bg-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-gray-400 text-xs sm:ml-auto shrink-0">{shown.length} / 15</span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {shown.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium mb-1">No programmes found</p>
            <p className="text-sm">Try a different filter or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shown.map((program, i) => {
              const accent = accents[program.slug] ?? '#34d399'
              return (
                <motion.div
                  key={program.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <Link
                    href={`/programs/${program.slug}`}
                    className="group flex flex-col h-full rounded-2xl hover:shadow-2xl hover:shadow-brand-green/15 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    style={{ background: '#064e3b' }}
                  >
                    {/* Accent bar */}
                    <div className="h-1 w-full" style={{ background: accent }} />

                    {/* Hover glow */}
                    <div className="relative flex flex-col flex-1 p-5 overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `radial-gradient(ellipse at top left, ${accent}12 0%, transparent 60%)` }} />

                      <div className="relative flex items-center gap-2 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize text-white/80 bg-white/10">
                          {program.status}
                        </span>
                        <span className="text-[11px] text-white/40 border border-white/15 px-2.5 py-0.5 rounded-full">
                          {modeLabel[program.mode] ?? program.mode}
                        </span>
                      </div>

                      <h3 className="relative text-white font-semibold text-base leading-snug mb-2 group-hover:text-brand-light transition-colors">
                        {program.title}
                      </h3>
                      <p className="relative text-white/45 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
                        {program.shortDesc}
                      </p>

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/30">
                          <span className="flex items-center gap-1"><Clock size={11} />{program.duration}</span>
                          <span className="flex items-center gap-1"><Users size={11} />{program.seats} seats</span>
                        </div>
                        <ArrowRight size={15} className="text-white/20 group-hover:text-brand-light group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
