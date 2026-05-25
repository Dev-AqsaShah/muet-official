import { CheckCircle2, Award, Users, MapPin, BookOpen, Building } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import CTASection from '@/components/sections/CTASection'
import PartnersSection from '@/components/sections/PartnersSection'

const keyFacts = [
  { label: 'Established',       value: '1977',   icon: Building },
  { label: 'Trainees Certified', value: '5,488+', icon: Users },
  { label: 'Districts Covered', value: '12',     icon: MapPin },
  { label: 'Programmes Offered', value: '15+',   icon: BookOpen },
  { label: 'Govt Mandates',     value: '4',      icon: Award },
  { label: 'Training Centers',  value: '20',     icon: Building },
]

const milestones = [
  { year: '1977', event: "MUET established as Sindh's premier engineering university in Jamshoro." },
  { year: '2013', event: 'ORIC (Office of Research, Innovation & Commercialization) set up to manage industry & government partnerships.' },
  { year: '2023', event: 'MUET engaged as executing partner for BBSHRRDB — Benazir Bhutto Shaheed Human Resource Research & Development Board — for vocational and technical training across Sindh.' },
  { year: '2024', event: 'MUET designated as the implementing university for the Presidential Initiative for Artificial Intelligence & Computing (PITP) Phase I across 8 Sindh districts.' },
  { year: '2024', event: 'MUET becomes the official NFTP center for Sindh under the Punjab Information Technology Board\'s National Freelance Training Programme.' },
  { year: '2025', event: 'PITP Phase I concludes with 4,484 certified graduates and PKR 19M+ in cumulative freelance earnings.' },
  { year: '2025', event: 'Presidential Initiative for Artificial Intelligence & Computing (PITP) Phase II launched — expanded to 12 districts, 20 centers, and 12 IT specializations.' },
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
        subtitle="Mehran University of Engineering & Technology — Sindh's leading public university for engineering, technology, and government-funded training programs."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-slate-50 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-brand-navy mb-3">Institutional Role</h2>
              <p className="text-gray-600 leading-relaxed">
                Established in 1977, MUET is Sindh&apos;s leading public university for engineering and
                technology. Through its Office of Research, Innovation &amp; Commercialization (ORIC), MUET
                serves as an implementing partner for government-funded training mandates — managing
                centre operations, instructor deployment, curriculum delivery, certification, and
                programme reporting at scale across Sindh.
              </p>
            </div>
            <div className="bg-brand-navy rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-brand-baby mb-3">Execution Capacity</h2>
              <p className="text-white/70 leading-relaxed">
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
      <section className="py-16 bg-brand-steel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/70 text-sm uppercase tracking-widest mb-10 font-medium">
            By The Numbers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {keyFacts.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{value}</p>
                <p className="text-white/65 text-xs font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MUET */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
            Why Government Bodies Choose MUET
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(point => (
              <div key={point} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <CheckCircle2 size={18} className="text-brand-steel shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10 text-center">
            Key Milestones
          </h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-brand-baby/40" />
            <div className="space-y-8">
              {milestones.map(({ year, event }) => (
                <div key={year + event} className="flex gap-6">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-brand-steel font-bold text-sm">{year}</span>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-brand-steel border-2 border-white shadow" />
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
