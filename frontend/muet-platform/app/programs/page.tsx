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

const modeLabel: Record<string, string> = {
  physical: 'In-Person',
  online:   'Online',
  hybrid:   'Hybrid',
}


export default function ProgramsPage() {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState<FilterValue>('all')

  const shown = useMemo(() => programs.filter(p => {
    const matchFilter = active === 'all' || p.status === active || p.mode === active
    const matchSearch = !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(query.toLowerCase())
    return matchFilter && matchSearch
  }), [query, active])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white pt-28 pb-12 px-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <p className="text-brand-steel text-xs font-semibold uppercase tracking-widest mb-3">
            Programme Catalogue
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            All 15 Programmes
          </h1>
          <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
            Free, certified IT and digital skills programmes for Sindh youth. Government-approved, zero cost.
          </p>
        </div>
      </div>

      {/* Sticky filters */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3.5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programmes…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-steel/20 focus:border-brand-steel transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal size={13} className="text-gray-400 mr-1 shrink-0" />
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  active === f.value
                    ? 'bg-brand-steel text-white'
                    : 'text-gray-500 border border-gray-200 hover:border-brand-steel hover:text-brand-steel'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-gray-400 text-xs sm:ml-auto shrink-0">
            {shown.length} / 15
          </span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((program, i) => {
              const accent = accents[program.slug] ?? '#2563eb'
              return (
                <motion.div
                  key={program.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Link
                    href={`/programs/${program.slug}`}
                    className="group flex flex-col h-full rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                    style={{ backgroundColor: '#1B3A6B' }}
                  >
                    <div className="h-1 w-full" style={{ background: accent }} />
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize text-white/80 bg-white/10">
                          {program.status}
                        </span>
                        <span className="text-[11px] text-white/50 border border-white/15 px-2 py-0.5 rounded-full">
                          {modeLabel[program.mode] ?? program.mode}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-brand-baby transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
                        {program.shortDesc}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/35">
                          <span className="flex items-center gap-1"><Clock size={11} />{program.duration}</span>
                          <span className="flex items-center gap-1"><Users size={11} />{program.seats} seats</span>
                        </div>
                        <ArrowRight
                          size={15}
                          className="text-white/20 group-hover:text-brand-baby group-hover:translate-x-1 transition-all duration-300"
                        />
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
