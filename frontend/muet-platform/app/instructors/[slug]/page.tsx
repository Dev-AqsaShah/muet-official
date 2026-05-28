import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Award, BookOpen, Briefcase, ChevronRight } from 'lucide-react'
import { getInstructorBySlug, instructors } from '@/data/instructors'
import { programs } from '@/data/programs'

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

const roleColor: Record<string, string> = {
  head:       '#059669',
  senior:     '#34d399',
  instructor: '#047857',
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

  const accent = roleColor[ins.role]
  const taughtPrograms = programs.filter(p => ins.programSlugs.includes(p.slug))

  return (
    <div className="min-h-screen" style={{ background: '#f0fdf4' }}>

      {/* Hero */}
      <div className="relative pt-28 pb-14 px-4 overflow-hidden" style={{ background: '#064e3b' }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #34d399 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5" style={{ background: accent }} />
        <div className="relative max-w-5xl mx-auto">
          <Link href="/instructors" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> All Instructors
          </Link>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Avatar */}
            <div
              className="shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-md"
              style={{ background: accent }}
            >
              {ins.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-3 py-0.5 rounded-full text-white"
                  style={{ background: accent }}
                >
                  {roleLabel[ins.role]}
                </span>
                <span className="text-xs text-white/40 border border-white/20 px-3 py-0.5 rounded-full">
                  {ins.experience} experience
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{ins.name}</h1>
              <p className="text-white/55 text-base mb-4">{ins.title}</p>

              <div className="flex flex-wrap gap-4 text-sm text-white/50">
                <a href={`mailto:${ins.email}`} className="flex items-center gap-1.5 hover:text-brand-light transition-colors">
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
          <div className="space-y-8">

            {/* Bio */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-base font-bold text-brand-forest mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full" style={{ background: accent }} />
                About
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{ins.bio}</p>
            </section>

            {/* Programmes taught */}
            {taughtPrograms.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-base font-bold text-brand-forest mb-5 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full" style={{ background: accent }} />
                  Programmes Taught
                </h2>
                <div className="space-y-3">
                  {taughtPrograms.map(p => (
                    <Link
                      key={p.slug}
                      href={`/programs/${p.slug}`}
                      className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div>
                        <p className="font-semibold text-brand-forest text-sm group-hover:text-brand-green transition-colors">{p.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{p.duration} · {p.seats} seats</p>
                      </div>
                      <ChevronRight size={15} className="text-gray-300 group-hover:text-brand-green transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-5">

            {/* Specializations */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2">
                <Briefcase size={14} style={{ color: accent }} /> Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {ins.specialization.map(s => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: accent + '15', color: accent, border: `1px solid ${accent}30` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-brand-navy mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm text-gray-600">
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
                  <a href={`mailto:${ins.email}`} className="text-brand-steel hover:underline break-all">{ins.email}</a>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <a
              href={`mailto:${ins.email}`}
              className="block w-full text-center py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: accent }}
            >
              Send Email
            </a>
          </aside>
        </div>
      </div>
    </div>
  )
}
