import { CheckCircle2, Award, Users, MapPin, BookOpen, Building } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import CTASection from '@/components/sections/CTASection'
import PartnersSection from '@/components/sections/PartnersSection'

const keyFacts = [
  { label: 'Established',        value: '1977',   icon: Building },
  { label: 'Trainees Certified', value: '5,488+', icon: Users    },
  { label: 'Districts Covered',  value: '12',     icon: MapPin   },
  { label: 'Programmes Offered', value: '15+',    icon: BookOpen },
  { label: 'Govt Mandates',      value: '4',      icon: Award    },
  { label: 'Training Centers',   value: '20',     icon: Building },
]

const milestones = [
  { year: '1977', event: "MUET established as Sindh's premier engineering university in Jamshoro." },
  { year: '2013', event: 'ORIC set up to manage industry & government partnerships.' },
  { year: '2023', event: 'MUET engaged as executing partner for BBSHRRDB for vocational and technical training across Sindh.' },
  { year: '2024', event: 'MUET designated as implementing university for PITP Phase I across 8 Sindh districts.' },
  { year: '2024', event: "MUET becomes official NFTP center for Sindh under PITB's National Freelance Training Programme." },
  { year: '2025', event: 'PITP Phase I concludes with 4,484 certified graduates and PKR 19M+ in freelance earnings.' },
  { year: '2025', event: 'PITP Phase II launched — expanded to 12 districts, 20 centers, 12 IT specializations.' },
]

const highlights = [
  'Designated implementing university for PITP — Government of Sindh mandate',
  'Official executing partner for BBSHRRDB skills development programmes',
  'PITB-selected NFTP center for Sindh — National Freelance Training Programme',
  'MUET-issued certificates with government endorsement and online verification',
  'End-to-end programme management: centers, instructors, curriculum, assessment, reporting',
  'Multi-district delivery capacity — 20 centers across 12 districts simultaneously',
  '82.1% programme completion rate — verified government KPI',
  'PKR 19M+ graduate earnings in Phase I alone — measurable economic impact',
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 border border-gray-100 shadow-sm bg-white">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                <Building size={20} className="text-brand-green" />
              </div>
              <h2 className="text-xl font-bold text-brand-forest mb-3">Institutional Role</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Established in 1977, MUET is Sindh&apos;s leading public university for engineering and
                technology. Through its Office of Research, Innovation &amp; Commercialization (ORIC), MUET
                serves as an implementing partner for large-scale training mandates — managing
                centre operations, instructor deployment, curriculum delivery, certification, and
                programme reporting at scale across Sindh.
              </p>
            </div>
            <div className="rounded-2xl p-8" style={{ background: '#064e3b' }}>
              <div className="w-10 h-10 rounded-xl bg-brand-light/15 flex items-center justify-center mb-4">
                <Award size={20} className="text-brand-light" />
              </div>
              <h2 className="text-xl font-bold text-brand-light mb-3">Execution Capacity</h2>
              <p className="text-white/65 leading-relaxed text-sm">
                MUET has demonstrated the ability to manage complex, multi-district government training
                mandates simultaneously — operating 20 training centers across 12 districts, deploying
                52+ qualified instructors, and maintaining the quality assurance, reporting, and
                certification standards required by funding bodies including BBSHRRDB, the Government
                of Sindh, and the Government of Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-16 relative overflow-hidden" style={{ background: '#059669' }}>
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/70 text-xs uppercase tracking-widest mb-10 font-bold">
            By The Numbers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {keyFacts.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{value}</p>
                <p className="text-white/65 text-xs font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MUET */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-4 px-3 py-1 rounded-full bg-brand-green/10">
            Our Credentials
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-forest mb-8">
            Why Government Bodies Choose MUET
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(point => (
              <div key={point} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all">
                <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" style={{ background: '#f0fdf4' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-forest mb-10 text-center">Key Milestones</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #059669, #34d399)' }} />
            <div className="space-y-8">
              {milestones.map(({ year, event }) => (
                <div key={year + event} className="flex gap-6">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-brand-green font-bold text-sm">{year}</span>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-brand-green border-2 border-white shadow-md" />
                    <p className="text-gray-600 text-sm leading-relaxed">{event}</p>
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
