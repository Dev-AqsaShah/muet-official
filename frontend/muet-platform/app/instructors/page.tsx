import Link from 'next/link'
import { instructors } from '@/data/instructors'
import { BookOpen, Mail, Award, Users } from 'lucide-react'

const roleLabel: Record<string, string> = {
  head:       'Director',
  senior:     'Senior Instructor',
  instructor: 'Instructor',
}

const roleBadge: Record<string, string> = {
  head:       'bg-amber-50 text-amber-700 border-amber-200',
  senior:     'bg-blue-50 text-blue-700 border-blue-200',
  instructor: 'bg-gray-50 text-gray-600 border-gray-200',
}

export const metadata = {
  title: 'Our Instructors | MUET Training Programs',
  description: 'Meet the expert faculty delivering certified IT training programmes at MUET.',
}

export default function InstructorsPage() {
  const head   = instructors.filter(i => i.role === 'head')
  const senior = instructors.filter(i => i.role === 'senior')
  const rest   = instructors.filter(i => i.role === 'instructor')

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white pt-28 pb-14 px-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <p className="text-brand-steel text-xs font-semibold uppercase tracking-widest mb-3">Our Faculty</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">Meet the Instructors</h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            Experienced professionals and certified educators delivering MUET's 15 government-approved IT training programmes across Sindh.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">

        {/* Director */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-steel mb-6">Programme Leadership</h2>
          <div className="grid grid-cols-1 gap-5">
            {head.map(ins => (
              <InstructorCard key={ins.slug} instructor={ins} />
            ))}
          </div>
        </section>

        {/* Senior Faculty */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-steel mb-6">Senior Faculty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {senior.map(ins => (
              <InstructorCard key={ins.slug} instructor={ins} />
            ))}
          </div>
        </section>

        {/* Instructors */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-steel mb-6">Programme Instructors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(ins => (
              <InstructorCard key={ins.slug} instructor={ins} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

function InstructorCard({ instructor: ins }: { instructor: typeof instructors[0] }) {
  return (
    <Link
      href={`/instructors/${ins.slug}`}
      className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Top accent */}
      <div className="h-1 w-full bg-brand-steel" />

      <div className="p-6 flex gap-5 flex-1">
        {/* Avatar */}
        <div className="shrink-0 w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-xl">
          {ins.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${roleBadge[ins.role]}`}>
              {roleLabel[ins.role]}
            </span>
          </div>
          <h3 className="font-bold text-brand-navy text-base leading-snug group-hover:text-brand-steel transition-colors">
            {ins.name}
          </h3>
          <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">{ins.title}</p>

          <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Award size={11} />{ins.experience}</span>
            {ins.programSlugs.length > 0 && (
              <span className="flex items-center gap-1"><BookOpen size={11} />{ins.programSlugs.length} programme{ins.programSlugs.length > 1 ? 's' : ''}</span>
            )}
            <span className="flex items-center gap-1"><Mail size={11} />{ins.email.split('@')[0]}@…</span>
          </div>

          {/* Specialization tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {ins.specialization.slice(0, 3).map(s => (
              <span key={s} className="text-[10px] bg-brand-navy/5 text-brand-navy px-2 py-0.5 rounded-full border border-brand-navy/10">
                {s}
              </span>
            ))}
            {ins.specialization.length > 3 && (
              <span className="text-[10px] text-gray-400">+{ins.specialization.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
