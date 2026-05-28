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
import StatusBadge from '@/components/shared/StatusBadge'
import FundingBadge from '@/components/shared/FundingBadge'

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

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const relatedPrograms = getProgramsByProject(project.slug)

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
      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-brand-navy">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <StatusBadge status={project.status} />
          <FundingBadge fundingBody={project.fundingBody} />
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar size={14} />
            {formatDate(project.startDate)}
            {project.endDate && ` — ${formatDate(project.endDate)}`}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* ── Main content ── */}
          <div>
            {/* Description */}
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#1B3A6B' }}>About the Project</h2>
              <div className="text-brand-gray leading-relaxed whitespace-pre-line text-sm">
                {project.description}
              </div>
            </section>

            {/* Objectives */}
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#1B3A6B' }}>Key Objectives</h2>
              <ul className="space-y-3">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-gray text-sm">
                    <CheckCircle2 size={18} className="text-brand-steel shrink-0 mt-0.5" />
                    {obj}
                  </li>
                ))}
              </ul>
            </section>

            {/* Districts */}
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#1B3A6B' }}>Districts Covered</h2>
              <div className="flex flex-wrap gap-2">
                {project.district.map(d => (
                  <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full" style={{ background: '#dbeafe', color: '#1B3A6B' }}>
                    <MapPin size={12} />
                    {d}
                  </span>
                ))}
              </div>
            </section>

          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* Impact Metrics */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-sm" style={{ color: '#1B3A6B' }}>
                <TrendingUp size={16} className="text-brand-steel" />
                Impact Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map(m => (
                  <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: '#F8FAFC' }}>
                    <p className="text-lg font-bold font-display" style={{ color: '#D97706' }}>{m.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold mb-3 flex items-center gap-2 text-sm" style={{ color: '#1B3A6B' }}>
                <FileText size={16} className="text-brand-steel" />
                Funding Details
              </h3>
              <div className="space-y-2 text-sm text-brand-gray">
                <div className="flex justify-between">
                  <span className="text-gray-400">Funded by</span>
                  <span className="font-medium text-right">{project.fundingBody}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Source</span>
                  <span className="font-medium text-right max-w-[180px]">{project.fundingSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Implemented by</span>
                  <span className="font-medium">MUET</span>
                </div>
              </div>
            </div>

            {/* Programs count */}
            {relatedPrograms.length > 0 && (
              <div className="bg-brand-navy rounded-xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-brand-baby" />
                  <span className="font-semibold text-sm">Training Programs</span>
                </div>
                <p className="text-3xl font-bold mb-1">{relatedPrograms.length}</p>
                <p className="text-white/60 text-xs mb-4">Programs under this project</p>
                <Link
                  href="/programs"
                  className="block text-center py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View All Programs
                </Link>
              </div>
            )}

            {/* Share */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Share2 size={16} className="text-brand-steel" />
                Share
              </h3>
              <Link
                href="/contact"
                className="block w-full text-center py-2.5 bg-brand-steel hover:bg-brand-steel/90 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Contact to Learn More
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
