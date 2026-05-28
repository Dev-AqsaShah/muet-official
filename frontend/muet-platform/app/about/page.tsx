import { CheckCircle2, Award, Users, MapPin, BookOpen, Building, TrendingUp, Globe, Shield } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import CTASection from '@/components/sections/CTASection'
import PartnersSection from '@/components/sections/PartnersSection'

const keyFacts = [
  { label: 'Established',        value: '1977',    icon: Building  },
  { label: 'Trainees Certified', value: '5,488+',  icon: Users     },
  { label: 'Districts Covered',  value: '12',      icon: MapPin    },
  { label: 'Programmes Offered', value: '15+',     icon: BookOpen  },
  { label: 'Govt Mandates',      value: '4',       icon: Award     },
  { label: 'Training Centers',   value: '20',      icon: Building  },
]

const milestones = [
  { year: '1977', event: "MUET established as Sindh's premier engineering university in Jamshoro." },
  { year: '2013', event: 'ORIC set up to manage industry & government partnerships.' },
  { year: '2023', event: 'MUET engaged as executing partner for BBSHRRDB across Sindh.' },
  { year: '2024', event: 'MUET designated as implementing university for PITP Phase I across 8 districts.' },
  { year: '2024', event: "MUET becomes official NFTP center for Sindh under PITB." },
  { year: '2025', event: 'PITP Phase I concludes with 4,484 certified graduates and PKR 19M+ freelance earnings.' },
  { year: '2025', event: 'PITP Phase II launched — expanded to 12 districts, 20 centers, 12 IT specializations.' },
]

const highlights = [
  { icon: Award,       text: 'Designated implementing university for PITP — Government of Sindh mandate' },
  { icon: Building,    text: 'Official executing partner for BBSHRRDB skills development programmes' },
  { icon: Globe,       text: 'PITB-selected NFTP center for Sindh — National Freelance Training Programme' },
  { icon: Shield,      text: 'MUET-issued certificates with government endorsement and online verification' },
  { icon: TrendingUp,  text: 'End-to-end programme management: centers, instructors, curriculum, assessment' },
  { icon: MapPin,      text: 'Multi-district delivery — 20 centers across 12 districts simultaneously' },
  { icon: Users,       text: '82.1% programme completion rate — verified government KPI' },
  { icon: CheckCircle2, text: 'PKR 19M+ graduate earnings in Phase I alone — measurable economic impact' },
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1B3A6B' }}>
              Our Institution
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#1B3A6B' }}>
              Built to Deliver at Scale
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-8 border border-gray-200 bg-white hover:shadow-lg hover:border-brand-steel/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#dbeafe' }}>
                <Building size={22} style={{ color: '#4682B4' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1B3A6B' }}>Institutional Role</h3>
              <p className="text-brand-gray leading-relaxed text-sm">
                Established in 1977, MUET is Sindh&apos;s leading public university for engineering and
                technology. Through its Office of Research, Innovation &amp; Commercialization (ORIC), MUET
                serves as an implementing partner for large-scale training mandates — managing
                centre operations, instructor deployment, curriculum delivery, certification, and
                programme reporting at scale across Sindh.
              </p>
            </div>
            <div className="rounded-3xl p-8 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #4682B4 100%)' }}>
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                <Award size={22} className="text-brand-baby" />
              </div>
              <h3 className="text-xl font-bold text-brand-baby mb-3">Execution Capacity</h3>
              <p className="text-white/65 leading-relaxed text-sm">
                MUET manages complex, multi-district government training mandates simultaneously —
                operating 20 training centers across 12 districts, deploying 52+ qualified instructors,
                and maintaining quality assurance, reporting, and certification standards required by
                BBSHRRDB, the Government of Sindh, and the Government of Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#1B3A6B' }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #89CFF0 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-baby/50 text-xs uppercase tracking-[0.22em] mb-12 font-bold">By The Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {keyFacts.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="group rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300 border border-white/10 bg-white/6"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-brand-baby/12">
                  <Icon size={22} className="text-brand-baby" />
                </div>
                <p className="font-display text-4xl font-bold text-brand-amber mb-1 leading-none">{value}</p>
                <p className="text-sm font-medium text-brand-baby/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MUET */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1B3A6B' }}>
              Our Credentials
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#1B3A6B' }}>
              Why Government Bodies Choose MUET
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-brand-steel/30 hover:bg-brand-steel/4 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-steel/15 transition-colors" style={{ background: '#dbeafe' }}>
                  <Icon size={18} style={{ color: '#4682B4' }} />
                </div>
                <p className="text-brand-gray text-sm leading-relaxed pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: '#F8FAFC' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1B3A6B' }}>
              Our Journey
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: '#1B3A6B' }}>Key Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #4682B4, #89CFF0)' }} />
            <div className="space-y-8">
              {milestones.map(({ year, event }, i) => (
                <div key={year + i} className="flex gap-6 group">
                  <div className="w-[72px] shrink-0 text-right pt-0.5">
                    <span className="font-bold text-sm" style={{ color: '#4682B4' }}>{year}</span>
                  </div>
                  <div className="relative pl-7 pb-2">
                    <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center" style={{ background: '#4682B4' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <p className="text-brand-gray text-sm leading-relaxed group-hover:text-gray-800 transition-colors">{event}</p>
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
