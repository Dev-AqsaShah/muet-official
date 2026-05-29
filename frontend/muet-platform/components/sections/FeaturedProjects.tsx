'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, CalendarDays } from 'lucide-react'
import { getFeaturedProjects } from '@/data/projects'
import type { FundingBody } from '@/types'

const filters: { label: string; value: FundingBody | 'all' }[] = [
  { label: 'All',              value: 'all'                },
  { label: 'BBSHRRDB',         value: 'BBSHRRDB'           },
  { label: 'Govt of Sindh',    value: 'Sindh Government'   },
  { label: 'Govt of Pakistan', value: 'Government of Pakistan' },
]

const projectAccent: Record<string, string> = {
  'pitp':                         '#00e5c8',
  'bbshrrdb-skills-development':  '#fbbf24',
  'nftp-muet':                    '#38bdf8',
}

export default function FeaturedProjects() {
  const [active, setActive] = useState<FundingBody | 'all'>('all')
  const all   = getFeaturedProjects()
  const shown = active === 'all' ? all : all.filter(p => p.fundingBody === active)

  return (
    <section className="py-24 relative" style={{ background: '#061224', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #00e5c8, transparent)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>Active Projects</span>
            </div>
            <h2 className="font-display font-extrabold leading-tight mb-3" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
              Executing Government<br />Training Mandates
            </h2>
          </motion.div>
          <p className="leading-relaxed" style={{ color: 'rgba(232,244,255,0.5)', fontSize: '15px' }}>
            MUET serves as the designated implementing institution for federal and provincial
            programmes — managing centres, instructors, certification and quality assurance at scale.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
              style={active === f.value
                ? { background: 'rgba(0,229,200,0.1)', color: '#00e5c8', borderColor: 'rgba(0,229,200,0.4)', boxShadow: '0 0 16px rgba(0,229,200,0.12)' }
                : { background: 'transparent', color: '#607896', borderColor: 'rgba(0,229,200,0.12)' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project cards — horizontal layout */}
        <div className="flex flex-col gap-6">
          {shown.map((project, i) => {
            const accent = projectAccent[project.slug] ?? '#00e5c8'
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[320px_1fr] rounded-3xl overflow-hidden transition-all duration-400"
                  style={{ border: `1px solid ${accent}20`, background: '#020b18' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${accent}40`; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 24px 80px rgba(0,0,0,0.5), 0 0 60px ${accent}10` }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = `${accent}20`; el.style.transform = ''; el.style.boxShadow = '' }}
                >
                  {/* Visual panel */}
                  <div className="relative min-h-[180px] md:min-h-0 flex items-center justify-center p-8" style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }}>
                    <div className="absolute inset-0 opacity-[0.05]"
                      style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                    <div className="absolute inset-0 hidden md:block" style={{ background: `linear-gradient(90deg, transparent 60%, #020b18 100%)` }} />
                    <div
                      className="relative w-28 h-28 rounded-full flex items-center justify-center font-display font-extrabold text-2xl"
                      style={{ border: `2px solid ${accent}40`, background: `${accent}10`, color: accent, textShadow: `0 0 20px ${accent}` }}
                    >
                      {project.title.split(' ').map(w => w[0]).join('').slice(0, 4)}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{project.fundingBody}</span>
                      <span
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded"
                        style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, animation: 'blink 1.8s infinite' }} />
                        {project.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl leading-snug mb-3" style={{ color: '#e8f4ff' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(232,244,255,0.55)' }}>{project.shortDesc}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {[`${project.district.length} Districts`, `${project.metrics?.[0]?.value ?? ''} ${project.metrics?.[0]?.label ?? ''}`.trim()].filter(Boolean).map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-lg" style={{ border: '1px solid rgba(232,244,255,0.1)', color: 'rgba(232,244,255,0.45)' }}>{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: accent }}>
                      View Project <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ border: '1px solid rgba(0,229,200,0.3)', color: '#00e5c8', background: 'rgba(0,229,200,0.04)' }}
          >
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
