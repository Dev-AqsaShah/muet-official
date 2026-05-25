'use client'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { programs } from '@/data/programs'
import PageHeader from '@/components/shared/PageHeader'
import ProgramCard from '@/components/cards/ProgramCard'
import EmptyState from '@/components/shared/EmptyState'
import type { ProgramMode, ProgramStatus } from '@/types'

type FilterValue = 'all' | ProgramMode | ProgramStatus

const filters: { label: string; value: FilterValue }[] = [
  { label: 'All',       value: 'all' },
  { label: 'Open',      value: 'open' },
  { label: 'Ongoing',   value: 'ongoing' },
  { label: 'Upcoming',  value: 'upcoming' },
  { label: 'Physical',  value: 'physical' },
  { label: 'Online',    value: 'online' },
  { label: 'Hybrid',    value: 'hybrid' },
]

export default function ProgramsPage() {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState<FilterValue>('all')

  const shown = useMemo(() => {
    return programs.filter(p => {
      const matchesFilter =
        active === 'all' || p.status === active || p.mode === active
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(query.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [query, active])

  return (
    <>
      <PageHeader
        title="Training Programs"
        subtitle="Free, certified IT and digital skills programs for Sindh youth aged 18–28. Apply for the next available batch."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Programs' }]}
      />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-steel/30 focus:border-brand-steel"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    active === f.value
                      ? 'bg-brand-steel text-white border-brand-steel'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-brand-steel hover:text-brand-steel'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="text-sm text-gray-400 mb-6">
            {shown.length} program{shown.length !== 1 ? 's' : ''} found
          </p>

          {shown.length === 0 ? (
            <EmptyState title="No programs found" description="Try a different filter or search term." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map(program => (
                <ProgramCard key={program.slug} {...program} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
