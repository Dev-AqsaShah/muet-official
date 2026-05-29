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
    <div className="min-h-screen" style={{ background: '#020b18' }}>

      {/* Header */}
      <div className="relative pt-28 pb-16 px-4 overflow-hidden" style={{ background: '#020b18', borderBottom: '1px solid rgba(0,229,200,0.12)' }}>
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,229,200,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(0,229,200,0.1)', color: '#00e5c8', border: '1px solid rgba(0,229,200,0.2)' }}>
            Our Faculty
          </span>
          <h1 className="font-display font-extrabold leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.03em', color: '#e8f4ff' }}>
            Meet the Instructors
          </h1>
          <p className="max-w-xl leading-relaxed" style={{ color: 'rgba(232,244,255,0.5)', fontSize: '16px' }}>
            Experienced professionals and certified educators delivering MUET&apos;s 15 government-approved IT training programmes across Sindh.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-14">

        {/* Director */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#fbbf24' }}>Programme Leadership</p>
          <div className="grid grid-cols-1 gap-5">
            {head.map((ins, i) => <InstructorCard key={ins.slug} instructor={ins} index={i} />)}
          </div>
        </section>

        {/* Senior */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#38bdf8' }}>Senior Faculty</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {senior.map((ins, i) => <InstructorCard key={ins.slug} instructor={ins} index={i} />)}
          </div>
        </section>

        {/* Instructors */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#00e5c8' }}>Programme Instructors</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((ins, i) => <InstructorCard key={ins.slug} instructor={ins} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
