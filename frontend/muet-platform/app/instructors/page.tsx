import { instructors } from '@/data/instructors'
import InstructorCard from '@/components/instructors/InstructorCard'

export const metadata = {
  title: 'Our Instructors | MUET Training Programs',
  description: 'Meet the expert faculty delivering certified IT training programmes at MUET.',
}

export default function InstructorsPage() {
  const head   = instructors.filter(i => i.role === 'head')
  const senior = instructors.filter(i => i.role === 'senior')
  const rest   = instructors.filter(i => i.role === 'instructor')

  return (
    <div className="min-h-screen bg-brand-offwhite">

      {/* Header */}
      <div className="relative pt-28 pb-16 px-4 overflow-hidden" style={{ background: '#1B3A6B' }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #89CFF0 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[90px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(70,130,180,0.35) 0%, transparent 70%)' }} />
        <div className="relative max-w-5xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-baby mb-4 px-3 py-1 rounded-full bg-brand-baby/10 border border-brand-baby/20">
            Our Faculty
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Meet the Instructors</h1>
          <p className="text-white/50 text-base max-w-xl leading-relaxed">
            Experienced professionals and certified educators delivering MUET&apos;s 15 government-approved IT training programmes across Sindh.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-14">

        {/* Director */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#4682B4' }}>Programme Leadership</p>
          <div className="grid grid-cols-1 gap-5">
            {head.map((ins, i) => <InstructorCard key={ins.slug} instructor={ins} index={i} />)}
          </div>
        </section>

        {/* Senior */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#4682B4' }}>Senior Faculty</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {senior.map((ins, i) => <InstructorCard key={ins.slug} instructor={ins} index={i} />)}
          </div>
        </section>

        {/* Instructors */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#4682B4' }}>Programme Instructors</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((ins, i) => <InstructorCard key={ins.slug} instructor={ins} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
