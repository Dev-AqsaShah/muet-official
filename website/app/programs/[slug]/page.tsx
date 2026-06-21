import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Users, MapPin, CheckCircle2, Tag, ArrowLeft, CalendarDays } from 'lucide-react'
import { getProgramBySlug, programs } from '@/data/programs'
import { getInstructorsByProgram } from '@/data/instructors'
import { formatDate, cn } from '@/lib/utils'
import HoverLink from '@/components/shared/HoverLink'

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
  'web-development':               '#00e5c8',
  'graphic-designing-ui-ux':       '#818cf8',
  'digital-marketing-seo':         '#fbbf24',
  'social-media-management':       '#38bdf8',
  'e-commerce':                    '#00e5c8',
  'python-development':            '#fbbf24',
  'mobile-app-development':        '#38bdf8',
  'java-development':              '#818cf8',
  'technical-freelancing':         '#00e5c8',
  'content-marketing-advertising': '#fbbf24',
  'creative-design-freelancing':   '#818cf8',
  'data-science':                  '#38bdf8',
  'database-management':           '#00e5c8',
  'cloud-computing':               '#38bdf8',
  'cyber-security':                '#818cf8',
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

  const cta         = statusCTA[program.status] ?? { label: 'Contact Us', disabled: false }
  const accent      = accents[program.slug] ?? '#00e5c8'
  const instructors = getInstructorsByProgram(program.slug)

  return (
    <div className="min-h-screen" style={{ background: '#020b18' }}>

      {/* Hero */}
      <div className="relative pt-28 pb-14 px-4 overflow-hidden" style={{ background: '#020b18', borderBottom: '1px solid rgba(0,229,200,0.12)' }}>
        <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full"
          style={{ background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00e5c8 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-5xl mx-auto">
          <Link href="/programs" className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors" style={{ color: '#607896' }}>
            <ArrowLeft size={14} /> All Programmes
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded"
              style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, animation: program.status === 'ongoing' || program.status === 'open' ? 'blink 1.8s infinite' : 'none' }} />
              {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
            </span>
            <span className="text-xs px-3 py-1 rounded-full" style={{ border: '1px solid rgba(0,229,200,0.2)', color: '#607896' }}>
              {modeLabel[program.mode] ?? program.mode}
            </span>
            {true && (
              <Link
                href="/course"
                className="text-xs px-3 py-1 rounded-full transition-colors"
                style={{ border: '1px solid rgba(0,229,200,0.15)', color: '#607896' }}
              >
                ↗ BBSHRRDB Skills Development Programme
              </Link>
            )}
          </div>

          <h1 className="font-display font-extrabold leading-tight mb-4"
            style={{ fontSize: 'clamp(28px, 5vw, 52px)', letterSpacing: '-0.03em', color: '#e8f4ff' }}>
            {program.title}
          </h1>
          <p className="max-w-2xl leading-relaxed" style={{ color: 'rgba(232,244,255,0.55)', fontSize: '16px' }}>
            {program.shortDesc}
          </p>

          <div className="flex flex-wrap gap-6 mt-8 text-sm" style={{ color: '#607896' }}>
            <span className="flex items-center gap-2"><Clock size={14} style={{ color: accent }} />{program.duration}</span>
            <span className="flex items-center gap-2"><Users size={14} style={{ color: accent }} />{program.seats} seats per batch</span>
            {program.location && <span className="flex items-center gap-2"><MapPin size={14} style={{ color: accent }} />{program.location}</span>}
            {program.startDate && <span className="flex items-center gap-2"><CalendarDays size={14} style={{ color: accent }} />Next batch: {formatDate(program.startDate)}</span>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* Left — content */}
          <div className="space-y-6">

            {/* About */}
            <section className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                About the Programme
              </h2>
              <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(232,244,255,0.6)' }}>
                {program.description}
              </div>
            </section>

            {/* Topics */}
            {program.topics && program.topics.length > 0 && (
              <section className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  Topics Covered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {program.topics.map(topic => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}25` }}
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
              <section className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  Eligibility
                </h2>
                <div className="flex items-start gap-3 p-4 rounded-xl text-sm"
                  style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" style={{ color: accent }} />
                  <span style={{ color: 'rgba(232,244,255,0.65)' }}>{program.eligibility}</span>
                </div>
              </section>
            )}

            {/* Instructors */}
            {instructors.length > 0 && (
              <section className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
                  {instructors.length === 1 ? 'Your Instructor' : 'Instructors'}
                </h2>
                <div className="space-y-4">
                  {instructors.map(ins => (
                    <HoverLink
                      key={ins.slug}
                      href={`/instructors/${ins.slug}`}
                      accent={accent}
                      borderBase="rgba(0,229,200,0.08)"
                      borderHover={`${accent}30`}
                      bgBase="#020b18"
                      bgHover={`${accent}05`}
                      className="group flex items-center gap-4 p-4 rounded-xl transition-all"
                    >
                      <div
                        className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg"
                        style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent }}
                      >
                        {ins.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: '#e8f4ff' }}>{ins.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#607896' }}>{ins.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#607896' }}>{ins.experience} experience</p>
                      </div>
                      <ArrowLeft size={14} style={{ color: accent }} className="rotate-180 shrink-0" />
                    </HoverLink>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right — sticky apply card */}
          <aside>
            <div className="rounded-2xl sticky top-24 overflow-hidden" style={{ background: '#061224', border: `1px solid ${accent}25`, boxShadow: `0 0 40px ${accent}08` }}>
              <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: accent }}>
                  Programme Details
                </p>

                <div className="space-y-3.5 mb-6">
                  <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                    <Clock size={15} style={{ color: accent }} className="shrink-0" />
                    <span><strong style={{ color: '#e8f4ff' }}>Duration:</strong> {program.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                    <Users size={15} style={{ color: accent }} className="shrink-0" />
                    <span><strong style={{ color: '#e8f4ff' }}>Seats:</strong> {program.seats} per batch</span>
                  </div>
                  {program.location && (
                    <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                      <MapPin size={15} style={{ color: accent }} className="shrink-0" />
                      <span><strong style={{ color: '#e8f4ff' }}>Location:</strong> {program.location}</span>
                    </div>
                  )}
                  {program.startDate && (
                    <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                      <CalendarDays size={15} style={{ color: accent }} className="shrink-0" />
                      <span><strong style={{ color: '#e8f4ff' }}>Next Batch:</strong> {formatDate(program.startDate)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-5" style={{ borderTop: '1px solid rgba(0,229,200,0.1)' }}>
                  <p className="text-xs mb-4 text-center" style={{ color: '#607896' }}>100% free — no fee, no hidden costs</p>
                  <Link
                    href={cta.disabled ? '#' : '/contact'}
                    className={cn(
                      'block w-full text-center py-3 rounded-xl text-sm font-bold transition-all',
                      cta.disabled ? 'cursor-not-allowed pointer-events-none' : ''
                    )}
                    style={!cta.disabled
                      ? { background: `linear-gradient(135deg, ${accent}, #38bdf8)`, color: '#020b18', boxShadow: `0 0 24px ${accent}30` }
                      : { background: 'rgba(96,120,150,0.15)', color: '#607896', border: '1px solid rgba(96,120,150,0.2)' }
                    }
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
