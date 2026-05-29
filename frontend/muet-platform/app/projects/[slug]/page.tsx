import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin, Calendar, Users, CheckCircle2,
  TrendingUp, FileText, Share2,
} from 'lucide-react'
import { getProjectBySlug, projects } from '@/data/projects'
import { getProgramsByProject } from '@/data/programs'
import { formatDate } from '@/lib/utils'
import PageHeader from '@/components/shared/PageHeader'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} | MUET Training Programs`,
    description: project.shortDesc,
  }
}

const accentByFunder: Record<string, string> = {
  'BBSHRRDB':               '#fbbf24',
  'Sindh Government':       '#00e5c8',
  'Government of Pakistan': '#38bdf8',
  'MUET':                   '#818cf8',
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const relatedPrograms = getProgramsByProject(project.slug)
  const accent = accentByFunder[project.fundingBody] ?? '#00e5c8'
  const isActive = project.status === 'active'

  return (
    <>
      <PageHeader
        title={project.title}
        subtitle={project.shortDesc}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
      />

      {/* Hero image */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden" style={{ background: '#061224' }}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #020b18 0%, transparent 60%)' }} />
      </div>

      <div className="relative" style={{ background: '#020b18' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded"
              style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, animation: isActive ? 'blink 1.8s infinite' : 'none' }} />
              {isActive ? 'Active' : 'Completed'}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider" style={{ color: accent }}>
              {project.fundingBody}
            </span>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: '#607896' }}>
              <Calendar size={14} />
              {formatDate(project.startDate)}
              {project.endDate && ` — ${formatDate(project.endDate)}`}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* Main content */}
            <div>
              {/* Description */}
              <section className="mb-8 rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  About the Project
                </h2>
                <div className="leading-relaxed whitespace-pre-line text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                  {project.description}
                </div>
              </section>

              {/* Objectives */}
              <section className="mb-8 rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  Key Objectives
                </h2>
                <ul className="space-y-3">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: accent }} />
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Districts */}
              <section className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  Districts Covered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.district.map(d => (
                    <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full"
                      style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}25` }}>
                      <MapPin size={12} />
                      {d}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Impact Metrics */}
              <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-sm" style={{ color: '#e8f4ff' }}>
                  <TrendingUp size={16} style={{ color: accent }} />
                  Impact Metrics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map(m => (
                    <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: '#020b18', border: '1px solid rgba(0,229,200,0.08)' }}>
                      <p className="text-lg font-bold font-display" style={{ color: accent, textShadow: `0 0 16px ${accent}50` }}>{m.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#607896' }}>{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Funding Info */}
              <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h3 className="font-bold mb-3 flex items-center gap-2 text-sm" style={{ color: '#e8f4ff' }}>
                  <FileText size={16} style={{ color: accent }} />
                  Funding Details
                </h3>
                <div className="space-y-2 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                  <div className="flex justify-between">
                    <span style={{ color: '#607896' }}>Funded by</span>
                    <span className="font-medium text-right" style={{ color: '#e8f4ff' }}>{project.fundingBody}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#607896' }}>Source</span>
                    <span className="font-medium text-right max-w-[180px]" style={{ color: '#e8f4ff' }}>{project.fundingSource}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#607896' }}>Implemented by</span>
                    <span className="font-medium" style={{ color: '#e8f4ff' }}>MUET</span>
                  </div>
                </div>
              </div>

              {/* Programs count */}
              {relatedPrograms.length > 0 && (
                <div className="rounded-2xl p-5 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${accent}12, transparent)`, border: `1px solid ${accent}25` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} style={{ color: accent }} />
                    <span className="font-semibold text-sm" style={{ color: '#e8f4ff' }}>Training Programs</span>
                  </div>
                  <p className="text-3xl font-bold font-display mb-1" style={{ color: accent, textShadow: `0 0 20px ${accent}50` }}>{relatedPrograms.length}</p>
                  <p className="text-xs mb-4" style={{ color: '#607896' }}>Programs under this project</p>
                  <Link
                    href="/programs"
                    className="block text-center py-2 rounded-lg text-sm font-medium transition-all"
                    style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent }}
                  >
                    View All Programs
                  </Link>
                </div>
              )}

              {/* Share */}
              <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                  <Share2 size={16} style={{ color: accent }} />
                  Learn More
                </h3>
                <Link
                  href="/contact"
                  className="block w-full text-center py-2.5 rounded-lg text-sm font-bold transition-all"
                  style={{ background: `linear-gradient(135deg, ${accent}, #38bdf8)`, color: '#020b18', boxShadow: `0 0 20px ${accent}30` }}
                >
                  Contact to Learn More
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
