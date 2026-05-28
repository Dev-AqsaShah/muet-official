'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, FolderKanban } from 'lucide-react'
import { projects } from '@/data/projects'
import PageHeader from '@/components/shared/PageHeader'
import ProjectCard from '@/components/cards/ProjectCard'
import EmptyState from '@/components/shared/EmptyState'
import type { ProjectStatus, FundingBody } from '@/types'

type FilterValue = 'all' | ProjectStatus | FundingBody

const filters: { label: string; value: FilterValue }[] = [
  { label: 'All',              value: 'all' },
  { label: 'Active',           value: 'active' },
  { label: 'Completed',        value: 'completed' },
  { label: 'Govt of Sindh',    value: 'Sindh Government' },
  { label: 'Govt of Pakistan', value: 'Government of Pakistan' },
]

export default function ProjectsPage() {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState<FilterValue>('all')

  const shown = useMemo(() => {
    return projects.filter(p => {
      const matchesFilter = active === 'all' || p.status === active || p.fundingBody === active
      const matchesSearch = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.shortDesc.toLowerCase().includes(query.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [query, active])

  return (
    <>
      <PageHeader
        title="Government Projects"
        subtitle="MUET-administered projects funded by the Government of Sindh and Government of Pakistan — delivering certified digital skills across Sindh's districts."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />

      <section className="py-16" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-steel/25 focus:border-brand-steel bg-gray-50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    active === f.value
                      ? 'text-white border-transparent shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-brand-steel hover:text-brand-steel'
                  }`}
                  style={active === f.value ? { background: '#4682B4' } : {}}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-sm sm:ml-auto shrink-0">
              <FolderKanban size={14} />
              {shown.length} project{shown.length !== 1 ? 's' : ''}
            </div>
          </div>

          {shown.length === 0 ? (
            <EmptyState title="No projects found" description="Try a different filter or search term." />
          ) : (
            <motion.div
              key={active + query}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {shown.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
