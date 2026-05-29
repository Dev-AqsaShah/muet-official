import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Award, BookOpen, Briefcase, ChevronRight } from 'lucide-react'
import { getInstructorBySlug, instructors } from '@/data/instructors'
import { programs } from '@/data/programs'
import HoverLink from '@/components/shared/HoverLink'

export function generateStaticParams() {
  return instructors.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ins = getInstructorBySlug(slug)
  if (!ins) return {}
  return {
    title: `${ins.name} | MUET Instructors`,
    description: ins.bio.slice(0, 155),
  }
}

const roleAccent: Record<string, string> = {
  head:       '#fbbf24',
  senior:     '#38bdf8',
  instructor: '#00e5c8',
}

const roleLabel: Record<string, string> = {
  head:       'Director',
  senior:     'Senior Instructor',
  instructor: 'Instructor',
}

export default async function InstructorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ins = getInstructorBySlug(slug)
  if (!ins) notFound()

  const accent = roleAccent[ins.role] ?? '#00e5c8'
  const taughtPrograms = programs.filter(p => ins.programSlugs.includes(p.slug))

  return (
    <div className="min-h-screen" style={{ background: '#020b18' }}>

      {/* Hero */}
      <div className="relative pt-28 pb-14 px-4 overflow-hidden" style={{ background: '#020b18', borderBottom: '1px solid rgba(0,229,200,0.12)' }}>
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full"
          style={{ background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00e5c8 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto">
          <Link href="/instructors" className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors" style={{ color: '#607896' }}>
            <ArrowLeft size={14} /> All Instructors
          </Link>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Avatar */}
            <div
              className="shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center font-display font-extrabold text-3xl"
              style={{ background: `${accent}15`, border: `2px solid ${accent}30`, color: accent, textShadow: `0 0 20px ${accent}` }}
            >
              {ins.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold px-3 py-0.5 rounded-full"
                  style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}>
                  {roleLabel[ins.role]}
                </span>
                <span className="text-xs px-3 py-0.5 rounded-full" style={{ border: '1px solid rgba(0,229,200,0.2)', color: '#607896' }}>
                  {ins.experience} experience
                </span>
              </div>
              <h1 className="font-display font-extrabold leading-tight mb-1"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em', color: '#e8f4ff' }}>
                {ins.name}
              </h1>
              <p className="text-base mb-4" style={{ color: 'rgba(232,244,255,0.55)' }}>{ins.title}</p>

              <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#607896' }}>
                <a href={`mailto:${ins.email}`} className="flex items-center gap-1.5 transition-colors hover:text-[#00e5c8]">
                  <Mail size={14} style={{ color: accent }} /> {ins.email}
                </a>
                <span className="flex items-center gap-1.5">
                  <Award size={14} style={{ color: accent }} /> {ins.qualification}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

          {/* Left */}
          <div className="space-y-6">

            {/* Bio */}
            <section className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
              <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                <span className="w-1 h-4 rounded-full" style={{ background: accent }} />
                About
              </h2>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(232,244,255,0.6)' }}>{ins.bio}</p>
            </section>

            {/* Programmes taught */}
            {taughtPrograms.length > 0 && (
              <section className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h2 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                  <span className="w-1 h-4 rounded-full" style={{ background: accent }} />
                  Programmes Taught
                </h2>
                <div className="space-y-3">
                  {taughtPrograms.map(p => (
                    <HoverLink
                      key={p.slug}
                      href={`/programs/${p.slug}`}
                      accent={accent}
                      borderBase="rgba(0,229,200,0.08)"
                      borderHover={`${accent}30`}
                      bgBase="#020b18"
                      bgHover={`${accent}05`}
                      className="group flex items-center justify-between p-4 rounded-xl transition-all"
                    >
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#e8f4ff' }}>{p.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#607896' }}>{p.duration} · {p.seats} seats</p>
                      </div>
                      <ChevronRight size={15} style={{ color: accent }} />
                    </HoverLink>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-5">

            {/* Specializations */}
            <div className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                <Briefcase size={14} style={{ color: accent }} /> Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {ins.specialization.map(s => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: '#e8f4ff' }}>Quick Info</h3>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                <div className="flex items-center gap-2">
                  <Award size={14} style={{ color: accent }} className="shrink-0" />
                  <span>{ins.experience} experience</span>
                </div>
                {taughtPrograms.length > 0 && (
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} style={{ color: accent }} className="shrink-0" />
                    <span>{taughtPrograms.length} programme{taughtPrograms.length > 1 ? 's' : ''}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accent }} className="shrink-0" />
                  <a href={`mailto:${ins.email}`} className="hover:underline break-all" style={{ color: accent }}>{ins.email}</a>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <a
              href={`mailto:${ins.email}`}
              className="block w-full text-center py-3 rounded-xl font-bold text-sm transition-all"
              style={{ background: `linear-gradient(135deg, ${accent}, #38bdf8)`, color: '#020b18', boxShadow: `0 0 20px ${accent}30` }}
            >
              Send Email
            </a>
          </aside>
        </div>
      </div>
    </div>
  )
}
