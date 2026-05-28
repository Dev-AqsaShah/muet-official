'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProjects } from '@/data/projects'
import ProjectCard from '@/components/cards/ProjectCard'
import type { FundingBody } from '@/types'

const filters: { label: string; value: FundingBody | 'all' }[] = [
  { label: 'All',              value: 'all'                },
  { label: 'BBSHRRDB',         value: 'BBSHRRDB'           },
  { label: 'Govt of Sindh',    value: 'Sindh Government'   },
  { label: 'Govt of Pakistan', value: 'Government of Pakistan' },
]

export default function FeaturedProjects() {
  const [active, setActive] = useState<FundingBody | 'all'>('all')
  const all   = getFeaturedProjects()
  const shown = active === 'all' ? all : all.filter(p => p.fundingBody === active)

  return (
    <section className="py-20" style={{ background: '#f0fdf4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-3 py-1 rounded-full bg-brand-green/10">
              Project Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-forest leading-tight">
              MUET&apos;s Active Projects
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl leading-relaxed">
              Serving as implementing institution for large-scale training programmes across Sindh.
            </p>
          </motion.div>
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-brand-green font-semibold text-sm hover:text-brand-mid transition-colors shrink-0 mb-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                active === f.value
                  ? 'bg-brand-green text-white border-brand-green shadow-sm shadow-brand-green/30'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-green hover:text-brand-green'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {shown.map(project => (
            <motion.div
              key={project.slug}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
