import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Users, MapPin, CheckCircle2, Tag, ArrowLeft, CalendarDays } from 'lucide-react'
import { getProgramBySlug, programs } from '@/data/programs'
import { getProjectBySlug } from '@/data/projects'
import { getInstructorsByProgram } from '@/data/instructors'
import { formatDate, cn } from '@/lib/utils'
import StatusBadge from '@/components/shared/StatusBadge'

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

  const project     = getProjectBySlug(program.projectSlug)
  const cta         = statusCTA[program.status] ?? { label: 'Contact Us', disabled: false }
  const accent      = accents[program.slug] ?? '#2563eb'
  const instructors = getInstructorsByProgram(program.slug)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div className="relative pt-24 pb-12 px-4" style={{ background: '#1B3A6B' }}>
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-1"
          style={{ background: accent }}
        />

        <div className="max-w-5xl mx-auto">
          <Link href="/programs" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> All Programmes
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full text-white"
              style={{ background: accent }}
            >
              {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
            </span>
            <span className="text-xs text-white/50 border border-white/20 px-3 py-1 rounded-full">
              {modeLabel[program.mode] ?? program.mode}
            </span>
            {project && (
              <Link
                href={`/projects/${project.slug}`}
                className="text-xs text-white/40 hover:text-white border border-white/15 px-3 py-1 rounded-full transition-colors"
              >
                ↗ {project.title}
              </Link>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {program.title}
          </h1>
          <p className="text-white/60 text-base max-w-2xl leading-relaxed">
            {program.shortDesc}
          </p>

          <div className="flex flex-wrap gap-6 mt-8 text-sm text-white/50">
            <span className="flex items-center gap-2"><Clock size={14} style={{ color: accent }} />{program.duration}</span>
            <span className="flex items-center gap-2"><Users size={14} style={{ color: accent }} />{program.seats} seats per batch</span>
            {program.location && <span className="flex items-center gap-2"><MapPin size={14} style={{ color: accent }} />{program.location}</span>}
            {program.startDate && <span className="flex items-center gap-2"><CalendarDays size={14} style={{ color: accent }} />Next batch: {formatDate(program.startDate)}</span>}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* Left — content */}
          <div className="space-y-10">

            {/* About */}
            <section className="rounded-2xl p-8 shadow-sm" style={{ background: '#1B3A6B' }}>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                About the Programme
              </h2>
              <div className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                {program.description}
              </div>
            </section>

            {/* Topics */}
            {program.topics && program.topics.length > 0 && (
              <section className="rounded-2xl p-8 shadow-sm" style={{ background: '#1B3A6B' }}>
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  Topics Covered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {program.topics.map(topic => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ background: accent + '15', color: accent, border: `1px solid ${accent}33` }}
                    >
                      <Tag size={11} />
                      {topic}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Eligibility */}
            {program.eligibility && (
              <section className="rounded-2xl p-8 shadow-sm" style={{ background: '#1B3A6B' }}>
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  Eligibility
                </h2>
                <div className="flex items-start gap-3 p-4 rounded-xl text-sm" style={{ background: accent + '11', border: `1px solid ${accent}22` }}>
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" style={{ color: accent }} />
                  <span className="text-white/75">{program.eligibility}</span>
                </div>
              </section>
            )}
            {/* Instructors */}
            {instructors.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-lg font-bold text-brand-navy mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  {instructors.length === 1 ? 'Your Instructor' : 'Instructors'}
                </h2>
                <div className="space-y-4">
                  {instructors.map(ins => (
                    <Link
                      key={ins.slug}
                      href={`/instructors/${ins.slug}`}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div
                        className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ background: accent }}
                      >
                        {ins.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-brand-navy text-sm group-hover:text-brand-steel transition-colors">{ins.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{ins.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{ins.experience} experience</p>
                      </div>
                      <ArrowLeft size={14} className="text-gray-300 group-hover:text-brand-steel rotate-180 transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right — sticky apply card */}
          <aside>
            <div className="rounded-2xl shadow-sm sticky top-24 overflow-hidden" style={{ background: '#1B3A6B' }}>
              <div className="h-1.5" style={{ background: accent }} />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: accent }}>
                  Programme Details
                </p>

                <div className="space-y-3.5 mb-6">
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Clock size={15} style={{ color: accent }} className="shrink-0" />
                    <span><strong className="text-white">Duration:</strong> {program.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Users size={15} style={{ color: accent }} className="shrink-0" />
                    <span><strong className="text-white">Seats:</strong> {program.seats} per batch</span>
                  </div>
                  {program.location && (
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <MapPin size={15} style={{ color: accent }} className="shrink-0" />
                      <span><strong className="text-white">Location:</strong> {program.location}</span>
                    </div>
                  )}
                  {program.startDate && (
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <CalendarDays size={15} style={{ color: accent }} className="shrink-0" />
                      <span><strong className="text-white">Next Batch:</strong> {formatDate(program.startDate)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-xs text-white/40 mb-4 text-center">100% free — no fee, no hidden costs</p>
                  <Link
                    href={cta.disabled ? '#' : '/contact'}
                    className={cn(
                      'block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all',
                      cta.disabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                        : 'text-white hover:opacity-90'
                    )}
                    style={!cta.disabled ? { background: accent } : {}}
                  >
                    {cta.label}
                  </Link>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
