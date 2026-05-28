import { CheckCircle2, Award, Users, MapPin, BookOpen, Building, TrendingUp, Globe, Shield } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import CTASection from '@/components/sections/CTASection'
import PartnersSection from '@/components/sections/PartnersSection'

const keyFacts = [
  { label: 'Established',        value: '1977',    icon: Building,   accent: '#34d399' },
  { label: 'Trainees Certified', value: '5,488+',  icon: Users,      accent: '#4ade80' },
  { label: 'Districts Covered',  value: '12',      icon: MapPin,     accent: '#6ee7b7' },
  { label: 'Programmes Offered', value: '15+',     icon: BookOpen,   accent: '#34d399' },
  { label: 'Govt Mandates',      value: '4',       icon: Award,      accent: '#86efac' },
  { label: 'Training Centers',   value: '20',      icon: Building,   accent: '#4ade80' },
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
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-3 py-1 rounded-full bg-brand-green/10">
              Our Institution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-forest leading-tight">
              Built to Deliver at Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-8 border border-gray-100 shadow-sm bg-white hover:shadow-lg hover:border-brand-green/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-5">
                <Building size={22} className="text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-brand-forest mb-3">Institutional Role</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Established in 1977, MUET is Sindh&apos;s leading public university for engineering and
                technology. Through its Office of Research, Innovation &amp; Commercialization (ORIC), MUET
                serves as an implementing partner for large-scale training mandates — managing
                centre operations, instructor deployment, curriculum delivery, certification, and
                programme reporting at scale across Sindh.
              </p>
            </div>
            <div className="rounded-3xl p-8 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #052e16 100%)' }}>
              <div className="w-12 h-12 rounded-2xl bg-brand-light/15 flex items-center justify-center mb-5">
                <Award size={22} className="text-brand-light" />
              </div>
              <h3 className="text-xl font-bold text-brand-light mb-3">Execution Capacity</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                MUET manages complex, multi-district government training mandates simultaneously —
                operating 20 training centers across 12 districts, deploying 52+ qualified instructors,
                and maintaining quality assurance, reporting, and certification standards required by
                BBSHRRDB, the Government of Sindh, and the Government of Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts — Bento grid on dark bg */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#064e3b' }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #34d399 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-light/50 text-xs uppercase tracking-[0.22em] mb-12 font-bold">
            By The Numbers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {keyFacts.map(({ label, value, icon: Icon, accent }, i) => (
              <div
                key={label}
                className="group rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                >
                  <Icon size={22} style={{ color: accent }} />
                </div>
                <p className="text-4xl font-black text-white mb-1 leading-none">{value}</p>
                <p className="text-sm font-medium" style={{ color: `${accent}99` }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MUET — Icon + text cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-3 py-1 rounded-full bg-brand-green/10">
              Our Credentials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-forest leading-tight">
              Why Government Bodies Choose MUET
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-brand-green/30 hover:bg-brand-green/4 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green/15 transition-colors">
                  <Icon size={18} className="text-brand-green" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: '#f0fdf4' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-3 py-1 rounded-full bg-brand-green/10">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-forest">Key Milestones</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #059669 0%, #34d399 50%, #d1fae5 100%)' }} />

            <div className="space-y-8">
              {milestones.map(({ year, event }, i) => (
                <div key={year + i} className="flex gap-6 group">
                  <div className="w-[72px] shrink-0 text-right pt-0.5">
                    <span className="text-brand-green font-bold text-sm leading-none">{year}</span>
                  </div>
                  <div className="relative pl-7 pb-2">
                    <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-brand-green border-2 border-white shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">{event}</p>
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
