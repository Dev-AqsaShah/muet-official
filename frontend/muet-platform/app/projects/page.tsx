'use client'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { projects } from '@/data/projects'
import PageHeader from '@/components/shared/PageHeader'
import ProjectCard from '@/components/cards/ProjectCard'
import EmptyState from '@/components/shared/EmptyState'
import type { ProjectStatus, FundingBody } from '@/types'

type FilterValue = 'all' | ProjectStatus | FundingBody

const filters: { label: string; value: FilterValue }[] = [
  { label: 'All',                value: 'all' },
  { label: 'Active',             value: 'active' },
  { label: 'Completed',          value: 'completed' },
  { label: 'Sindh Government',   value: 'Sindh Government' },
  { label: 'Govt of Pakistan',   value: 'Government of Pakistan' },
]

export default function ProjectsPage() {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState<FilterValue>('all')

  const shown = useMemo(() => {
    return projects.filter(p => {
      const matchesFilter =
        active === 'all' ||
        p.status === active ||
        p.fundingBody === active
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
        title="Government Projects"
        subtitle="MUET-administered projects funded by the Government of Sindh and Government of Pakistan — delivering digital skills training across Sindh's districts."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />

      <section className="py-12" style={{ background: '#f0fdf4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/25 focus:border-brand-green bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    active === f.value
                      ? 'bg-brand-green text-white border-brand-green shadow-sm shadow-brand-green/30'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-brand-green hover:text-brand-green'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {shown.length === 0 ? (
            <EmptyState title="No projects found" description="Try a different filter or search term." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map(project => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
