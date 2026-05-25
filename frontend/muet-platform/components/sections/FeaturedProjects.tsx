'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProjects } from '@/data/projects'
import SectionHeading from '@/components/shared/SectionHeading'
import ProjectCard from '@/components/cards/ProjectCard'
import type { FundingBody } from '@/types'

const filters: { label: string; value: FundingBody | 'all' }[] = [
  { label: 'All',              value: 'all' },
  { label: 'BBSHRRDB',         value: 'BBSHRRDB' },
  { label: 'Govt of Sindh',    value: 'Sindh Government' },
  { label: 'Govt of Pakistan', value: 'Government of Pakistan' },
]

export default function FeaturedProjects() {
  const [active, setActive] = useState<FundingBody | 'all'>('all')
  const all = getFeaturedProjects()
  const shown = active === 'all' ? all : all.filter(p => p.fundingBody === active)

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="MUET's Project Portfolio"
          title="MUET's Active Projects"
          description="MUET serves as the implementing institution for large-scale training programmes across Sindh — managing operations, instructor deployment, and certified programme delivery."
          action={
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-brand-steel font-medium text-sm hover:underline shrink-0">
              View All <ArrowRight size={16} />
            </Link>
          }
        />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
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
