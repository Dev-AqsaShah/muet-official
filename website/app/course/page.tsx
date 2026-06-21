import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2, Award, CalendarDays, Clock, MapPin,
  BookOpen, ArrowRight, Banknote, ShieldCheck, Users,
} from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import { course } from '@/data/course'
import { programs } from '@/data/programs'

export const metadata = {
  title: 'BBSHRRDB Skills Development Programme | MUET',
  description: course.tagline,
}

const TEAL = '#00e5c8'
const AMBER = '#fbbf24'

const statusStyle: Record<string, { label: string; color: string }> = {
  ongoing:  { label: 'Batch Running',     color: TEAL },
  open:     { label: 'Open',              color: '#38bdf8' },
  upcoming: { label: 'Next Batch',        color: AMBER },
  closed:   { label: 'Closed',            color: '#607896' },
  completed:{ label: 'Completed',         color: '#607896' },
}

export default function CoursePage() {
  return (
    <>
      <PageHeader
        title="BBSHRRDB Skills Development Programme"
        subtitle={course.tagline}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'The Course' }]}
      />

      {/* Campus hero image */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden" style={{ background: '#061224' }}>
        <Image src={course.heroImage} alt="MUET Main Campus, Jamshoro" fill className="object-cover opacity-70" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #020b18 0%, transparent 70%)' }} />
        <div className="absolute bottom-5 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(2,11,24,0.8)', border: `1px solid ${TEAL}40`, color: TEAL }}>
            <MapPin size={12} /> MUET Main Campus, Jamshoro
          </span>
        </div>
      </div>

      <div className="relative" style={{ background: '#020b18' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
            {course.highlights.map(h => (
              <div key={h.label} className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.12)' }}>
                <CheckCircle2 size={18} className="mb-2.5" style={{ color: TEAL }} />
                <p className="font-display font-bold text-sm mb-1" style={{ color: '#e8f4ff' }}>{h.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#607896' }}>{h.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 mb-16">
            {/* About */}
            <section className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
                <span className="w-1 h-5 rounded-full inline-block" style={{ background: AMBER }} />
                About the Programme
              </h2>
              <div className="leading-relaxed whitespace-pre-line text-sm mb-6" style={{ color: 'rgba(232,244,255,0.6)' }}>
                {course.about}
              </div>
              <div className="rounded-xl p-4" style={{ background: '#020b18', border: `1px solid ${AMBER}25` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: AMBER }}>Who can apply</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,244,255,0.6)' }}>{course.eligibilitySummary}</p>
                <Link href="/admissions" className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold" style={{ color: AMBER }}>
                  Full admission guide <ArrowRight size={14} />
                </Link>
              </div>
            </section>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-sm" style={{ color: '#e8f4ff' }}>
                  <CalendarDays size={16} style={{ color: TEAL }} /> Schedule
                </h3>
                <div className="space-y-3 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                  <p className="flex items-start gap-2"><Clock size={14} className="shrink-0 mt-0.5" style={{ color: TEAL }} />{course.schedule.format}</p>
                  <p className="flex items-start gap-2"><Clock size={14} className="shrink-0 mt-0.5" style={{ color: TEAL }} />{course.schedule.weekendFormat}</p>
                  <div className="pt-2 space-y-1.5" style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
                    <p className="text-xs"><span style={{ color: TEAL }}>● </span>{course.schedule.currentBatch}</p>
                    <p className="text-xs"><span style={{ color: AMBER }}>● </span>{course.schedule.nextBatch}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-sm" style={{ color: '#e8f4ff' }}>
                  <Award size={16} style={{ color: AMBER }} /> Certification
                </h3>
                <div className="space-y-2.5 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                  <p className="flex items-start gap-2"><ShieldCheck size={14} className="shrink-0 mt-0.5" style={{ color: AMBER }} />{course.certification.requirement}</p>
                  <p className="flex items-start gap-2"><Award size={14} className="shrink-0 mt-0.5" style={{ color: AMBER }} />Issued by {course.certification.issuer}</p>
                  <p className="flex items-start gap-2"><CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: AMBER }} />{course.certification.verification}</p>
                </div>
              </div>

              <div className="rounded-2xl p-6 text-center"
                style={{ background: `linear-gradient(135deg, ${TEAL}14, transparent)`, border: `1px solid ${TEAL}30` }}>
                <Banknote size={22} className="mx-auto mb-2" style={{ color: TEAL }} />
                <p className="font-display font-bold text-sm mb-1" style={{ color: '#e8f4ff' }}>Free + Monthly Stipend</p>
                <p className="text-xs mb-4" style={{ color: '#607896' }}>Selected candidates pay nothing — and get paid to learn.</p>
                <Link href="/admissions"
                  className="block py-2.5 rounded-lg text-sm font-bold"
                  style={{ background: `linear-gradient(135deg, ${TEAL}, #38bdf8)`, color: '#020b18' }}>
                  Apply for Admission
                </Link>
              </div>
            </aside>
          </div>

          {/* Programs grid */}
          <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-display text-2xl font-extrabold flex items-center gap-2.5" style={{ color: '#e8f4ff' }}>
                <BookOpen size={22} style={{ color: TEAL }} />
                Programs at Main Campus
              </h2>
              <p className="text-sm mt-1.5" style={{ color: '#607896' }}>
                Every track is taught at MUET Main Campus, Jamshoro — pick one per admission phase.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: `${TEAL}10`, border: `1px solid ${TEAL}25`, color: TEAL }}>
              {programs.length} Programs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {programs.map(p => {
              const st = statusStyle[p.status] ?? statusStyle.open
              return (
                <Link key={p.slug} href={`/programs/${p.slug}`}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                  <div className="relative h-36 overflow-hidden" style={{ background: '#020b18' }}>
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(2,11,24,0.85)', border: `1px solid ${st.color}40`, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-base mb-1.5" style={{ color: '#e8f4ff' }}>{p.title}</h3>
                    <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: '#607896' }}>{p.shortDesc}</p>
                    <div className="flex items-center justify-between text-xs" style={{ color: '#607896' }}>
                      <span className="flex items-center gap-1"><Clock size={11} />{p.duration.split(' (')[0]}</span>
                      <span className="flex items-center gap-1"><Users size={11} />{p.seats} seats</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Board stats */}
          <div className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-6 text-center" style={{ color: AMBER }}>
              The Board Behind the Programme — BBSHRRDB
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {course.boardStats.map(s => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-extrabold" style={{ color: '#e8f4ff' }}>{s.value}</p>
                  <p className="text-xs mt-1" style={{ color: '#607896' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
