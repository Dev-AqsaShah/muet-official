import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, MapPin, CheckCircle2, Tag } from 'lucide-react'
import { getProgramBySlug, getProgramsByProject, programs } from '@/data/programs'
import { getProjectBySlug } from '@/data/projects'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import PageHeader from '@/components/shared/PageHeader'
import StatusBadge from '@/components/shared/StatusBadge'
import ProgramCard from '@/components/cards/ProgramCard'

export function generateStaticParams() {
  return programs.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) return {}
  return {
    title: `${program.title} | MUET Training Programs`,
    description: program.shortDesc,
  }
}

const modeStyle: Record<string, string> = {
  physical: 'bg-purple-100 text-purple-700',
  online:   'bg-teal-100 text-teal-700',
  hybrid:   'bg-orange-100 text-orange-700',
}

const statusCTA: Record<string, { label: string; disabled: boolean }> = {
  open:      { label: 'Apply Now — Contact Us',  disabled: false },
  ongoing:   { label: 'Batch in Progress',        disabled: true  },
  upcoming:  { label: 'Notify Me When Open',      disabled: false },
  full:      { label: 'Batch Full',               disabled: true  },
  completed: { label: 'Programme Completed',      disabled: true  },
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) notFound()

  const project = getProjectBySlug(program.projectSlug)
  const related = getProgramsByProject(program.projectSlug).filter(p => p.slug !== slug).slice(0, 2)
  const cta = statusCTA[program.status] ?? { label: 'Contact Us', disabled: false }

  return (
    <>
      <PageHeader
        title={program.title}
        subtitle={program.shortDesc}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Programs', href: '/programs' },
          { label: program.title },
        ]}
      />

      {/* Cover image */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-brand-navy">
        <Image
          src={program.coverImage}
          alt={program.title}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <StatusBadge status={program.status} />
          <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize', modeStyle[program.mode] ?? 'bg-gray-100 text-gray-700')}>
            {program.mode}
          </span>
          {project && (
            <Link href={`/projects/${project.slug}`} className="text-xs text-brand-steel hover:underline font-medium">
              ↗ {project.title}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* ── Main ── */}
          <div>
            {/* Description */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Programme</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {program.description}
              </div>
            </section>

            {/* Topics */}
            {program.topics && program.topics.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Topics Covered</h2>
                <div className="flex flex-wrap gap-2">
                  {program.topics.map(topic => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-baby/15 text-brand-navy text-sm font-medium rounded-full"
                    >
                      <Tag size={12} />
                      {topic}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Eligibility */}
            {program.eligibility && (
              <section className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Eligibility</h2>
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-amber-500" />
                  {program.eligibility}
                </div>
              </section>
            )}

            {/* Related programs */}
            {related.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Related Programs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {related.map(p => <ProgramCard key={p.slug} {...p} />)}
                </div>
              </section>
            )}
          </div>

          {/* ── Application sidebar ── */}
          <aside className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm sticky top-24">
              <StatusBadge status={program.status} className="mb-4" />

              <div className="space-y-3 mb-5 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-brand-steel shrink-0" />
                  <span><strong className="text-gray-800">Duration:</strong> {program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-brand-steel shrink-0" />
                  <span><strong className="text-gray-800">Seats:</strong> {program.seats} per batch</span>
                </div>
                {program.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-brand-steel shrink-0" />
                    <span><strong className="text-gray-800">Location:</strong> {program.location}</span>
                  </div>
                )}
                {program.startDate && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-brand-steel shrink-0" />
                    <span><strong className="text-gray-800">Next Batch:</strong> {formatDate(program.startDate)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 mb-3 text-center">
                  100% free — no fee, no hidden costs
                </p>
                <Link
                  href={cta.disabled ? '#' : '/contact'}
                  className={cn(
                    'block w-full text-center py-3 rounded-lg text-sm font-semibold transition-colors',
                    cta.disabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                      : 'bg-brand-steel hover:bg-brand-steel/90 text-white'
                  )}
                >
                  {cta.label}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
