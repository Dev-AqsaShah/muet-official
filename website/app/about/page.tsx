import { CheckCircle2, Award, Users, MapPin, BookOpen, Building, TrendingUp, Globe, Shield } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import CTASection from '@/components/sections/CTASection'
import PartnersSection from '@/components/sections/PartnersSection'

const keyFacts = [
  { label: 'Established',        value: '1977',    color: '#00e5c8' },
  { label: 'Trainees Certified', value: '5,488+',  color: '#fbbf24' },
  { label: 'Districts Covered',  value: '12',      color: '#38bdf8' },
  { label: 'IT Programs',        value: '8',       color: '#818cf8' },
  { label: 'Free + Stipend',     value: '100%',    color: '#00e5c8' },
  { label: 'Campus',             value: 'Jamshoro', color: '#fbbf24' },
]

const milestones = [
  { year: '1977', event: "MUET established as Sindh's premier engineering university in Jamshoro." },
  { year: '2013', event: 'BBSHRRDB established by an Act of the Sindh Assembly to develop human resources in Sindh.' },
  { year: '2023', event: 'MUET engaged as an implementing partner for the BBSHRRDB Skills Development Programme.' },
  { year: '2025', event: 'IT training tracks launched at MUET Main Campus with stipend-supported batches.' },
  { year: '2026', event: 'Batch 5 running at Main Campus — 8 certified IT programs with online-verifiable certificates.' },
]

const highlights = [
  { icon: Building,    text: 'Official implementing partner for the BBSHRRDB Skills Development Programme' },
  { icon: Award,       text: 'Government of Sindh × MUET co-certified credentials with online verification' },
  { icon: Globe,       text: 'Modern IT labs and qualified faculty at the Main Campus, Jamshoro' },
  { icon: Shield,      text: 'Digitally verified admissions — FMIS and NADRA Verisys integration' },
  { icon: TrendingUp,  text: 'End-to-end programme management: curriculum, attendance, assessment, certification' },
  { icon: MapPin,      text: 'All classes at MUET Main Campus — Indus Highway, Jamshoro' },
  { icon: Users,       text: 'Monthly stipend paid to every selected trainee — training is 100% free' },
  { icon: CheckCircle2, text: 'Freelance career-launch support in the final month of every batch' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About MUET"
        subtitle="Mehran University of Engineering & Technology — Sindh's leading public university for engineering, technology, and certified training programmes."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Mission & Vision */}
      <section className="py-20 relative" style={{ background: '#020b18', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00e5c8)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>Our Institution</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(270deg, transparent, #00e5c8)' }} />
            </div>
            <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
              Built to Deliver at Scale
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-8 transition-all duration-300"
              style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(0,229,200,0.1)', border: '1px solid rgba(0,229,200,0.2)' }}>
                <Building size={22} style={{ color: '#00e5c8' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#e8f4ff' }}>Institutional Role</h3>
              <p className="leading-relaxed text-sm" style={{ color: 'rgba(232,244,255,0.55)' }}>
                Established in 1977, MUET is Sindh&apos;s leading public university for engineering and
                technology. Through its Office of Research, Innovation &amp; Commercialization (ORIC), MUET
                serves as an implementing partner for the Government of Sindh's BBSHRRDB programme —
                managing instructor deployment, curriculum delivery, certification, and programme
                reporting for stipend-supported IT training at the Main Campus.
              </p>
            </div>
            <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,229,200,0.12) 0%, rgba(56,189,248,0.08) 100%)', border: '1px solid rgba(0,229,200,0.2)' }}>
              <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00e5c8 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(0,229,200,0.15)', border: '1px solid rgba(0,229,200,0.3)' }}>
                <Award size={22} style={{ color: '#00e5c8' }} />
              </div>
              <h3 className="relative text-xl font-bold mb-3" style={{ color: '#00e5c8' }}>Execution Capacity</h3>
              <p className="relative leading-relaxed text-sm" style={{ color: 'rgba(232,244,255,0.65)' }}>
                For the BBSHRRDB Skills Development Programme, MUET delivers the complete training
                cycle at its Main Campus in Jamshoro — qualified instructors, structured curriculum,
                digital attendance and assessment through the MUET LMS, and co-certified credentials
                meeting the quality standards of BBSHRRDB and the Government of Sindh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#061224', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00e5c8 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00e5c8)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: '#00e5c8' }}>By The Numbers</span>
            <div className="w-8 h-px" style={{ background: 'linear-gradient(270deg, transparent, #00e5c8)' }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {keyFacts.map(({ label, value, color }) => (
              <div
                key={label}
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={{ background: '#020b18', border: '1px solid rgba(0,229,200,0.1)' }}
              >
                <p className="font-display font-extrabold text-4xl mb-1 leading-none"
                  style={{ color, textShadow: `0 0 24px ${color}50` }}>{value}</p>
                <p className="text-sm font-medium" style={{ color: '#607896' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MUET */}
      <section className="py-20 relative" style={{ background: '#020b18', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00e5c8)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>Our Credentials</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(270deg, transparent, #00e5c8)' }} />
            </div>
            <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
              Why Government Bodies Choose MUET
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300"
                style={{ border: '1px solid rgba(0,229,200,0.08)', background: 'rgba(0,229,200,0.02)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,229,200,0.1)', border: '1px solid rgba(0,229,200,0.2)' }}>
                  <Icon size={18} style={{ color: '#00e5c8' }} />
                </div>
                <p className="text-sm leading-relaxed pt-1" style={{ color: 'rgba(232,244,255,0.65)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 relative" style={{ background: '#061224', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00e5c8)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>Our Journey</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(270deg, transparent, #00e5c8)' }} />
            </div>
            <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
              Key Milestones
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #00e5c8, #38bdf8, transparent)' }} />
            <div className="space-y-8">
              {milestones.map(({ year, event }, i) => (
                <div key={year + i} className="flex gap-6 group">
                  <div className="w-[72px] shrink-0 text-right pt-0.5">
                    <span className="font-bold text-sm font-display" style={{ color: '#00e5c8' }}>{year}</span>
                  </div>
                  <div className="relative pl-7 pb-2">
                    <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: '#061224', border: '2px solid rgba(0,229,200,0.4)' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00e5c8' }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,244,255,0.6)' }}>{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PartnersSection />
      <CTASection />
    </>
  )
}
