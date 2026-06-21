import Link from 'next/link'
import {
  CheckCircle2, FileText, UserCheck, MonitorCheck, MapPin,
  Banknote, CalendarDays, GraduationCap, ClipboardList,
  ShieldCheck, HelpCircle, ArrowRight,
} from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import { portalLinks } from '@/config/navigation'

export const metadata = {
  title: 'Admissions & Registration | MUET Training Programs',
  description:
    'How to apply for free government-funded BBSHRRDB and PITP training at MUET — eligibility, required documents, registration steps, stipend, and batch schedule.',
}

const AMBER = '#fbbf24'
const TEAL = '#00e5c8'

const eligibility = [
  { label: 'Age 18–35 years', detail: 'At the time of registration (PITP tracks: max 28 years)' },
  { label: 'Valid CNIC', detail: 'Verified through NADRA Verisys during application processing' },
  { label: 'Sindh domicile / PRC', detail: 'Required for BBSHRRDB-funded seats' },
  { label: 'Currently unemployed', detail: 'BBSHRRDB training is reserved for unemployed youth' },
  { label: 'First-time applicant', detail: 'Only one BBSHRRDB training per candidate, ever' },
  { label: 'Qualification per course', detail: 'Matric, Intermediate, or Graduate — varies by course' },
]

const documents = [
  'CNIC (or B-Form for younger applicants)',
  'Sindh domicile / PRC',
  'Recent passport-size photograph',
  'Last educational certificate (Matric / Inter / Degree)',
  'Valid email address and mobile number',
]

const steps = [
  {
    icon: MonitorCheck,
    title: 'Apply Online',
    desc: 'Submit the online application form during the announced admission phase. Each phase stays open for 15 days from the advertisement date. Choose one course only.',
  },
  {
    icon: ShieldCheck,
    title: 'Digital Verification',
    desc: 'Your application is verified through the web-based FMIS system and NADRA Verisys — no manual paperwork chasing.',
  },
  {
    icon: ClipboardList,
    title: 'Merit & Placement',
    desc: 'Selected candidates are placed on merit through a digital selection process and allotted a seat in their chosen course at MUET Main Campus.',
  },
  {
    icon: UserCheck,
    title: 'Enrollment & Orientation',
    desc: 'Selected candidates confirm enrollment at MUET Main Campus, Jamshoro and attend an orientation session before classes begin.',
  },
  {
    icon: GraduationCap,
    title: 'Train, Certify, Earn',
    desc: 'Complete your training with 90% attendance, pass the assessments, and receive a Govt. of Sindh × MUET co-certified credential with online verification.',
  },
]

const faqs = [
  {
    q: 'Is the training really free?',
    a: 'Yes. BBSHRRDB training is fully funded by the Government of Sindh. There is no tuition fee — and trainees receive a monthly stipend during training, plus a dislocation allowance where applicable.',
  },
  {
    q: 'When do admissions open?',
    a: 'Admissions open in phases announced through public advertisement (currently Phase-XV). Each phase accepts applications for 15 days from the advertisement date. MUET runs rolling batches through the year — typically starting September, November, January, and March, plus a weekend batch.',
  },
  {
    q: 'How long is the training?',
    a: 'BBSHRRDB vocational courses run from 2 to 24 months depending on the trade. MUET IT tracks are typically 120 hours over ~2 months (Mon–Fri, 3 hrs/day) or ~3.5 months for weekend batches (Sat–Sun, 4 hrs/day).',
  },
  {
    q: 'Can I apply for more than one course?',
    a: 'No. You may apply for one course per phase, and BBSHRRDB allows only one completed training per candidate in total.',
  },
  {
    q: 'What do I get at the end?',
    a: 'A Government of Sindh × MUET co-certified credential with a verifiable certificate ID. Certificates can be verified online by any employer.',
  },
  {
    q: 'Where are the classes held?',
    a: "At MUET Main Campus, Indus Highway, Jamshoro — in the university's modern IT labs. Regular batches run Mon–Fri mornings; weekend batches run Sat–Sun.",
  },
]

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="rounded-2xl p-8 mb-8"
      style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}
    >
      {children}
    </section>
  )
}

function SectionTitle({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#e8f4ff' }}>
      <span className="w-1 h-5 rounded-full inline-block" style={{ background: accent }} />
      {children}
    </h2>
  )
}

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        title="Admissions & Registration"
        subtitle="Free, government-funded training with a monthly stipend — here is exactly how to get in."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Admissions' },
        ]}
      />

      <div className="relative" style={{ background: '#020b18' }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Highlight strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Banknote, label: 'Monthly Stipend', value: '100% Free + Paid' },
              { icon: CalendarDays, label: 'Application Window', value: '15 Days / Phase' },
              { icon: MapPin, label: 'Venue', value: 'MUET Main Campus' },
              { icon: GraduationCap, label: 'Certification', value: 'Govt. × MUET' },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl p-5 text-center"
                style={{ background: '#061224', border: `1px solid ${AMBER}25` }}
              >
                <Icon size={22} className="mx-auto mb-2" style={{ color: AMBER }} />
                <p className="font-display font-bold text-sm" style={{ color: '#e8f4ff' }}>{value}</p>
                <p className="text-xs mt-1" style={{ color: '#607896' }}>{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            <div>
              {/* Eligibility */}
              <SectionCard>
                <SectionTitle accent={AMBER}>Who Can Apply — Eligibility</SectionTitle>
                <ul className="space-y-4">
                  {eligibility.map(item => (
                    <li key={item.label} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: AMBER }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#e8f4ff' }}>{item.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#607896' }}>{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Steps */}
              <SectionCard>
                <SectionTitle accent={TEAL}>How Registration Works — 5 Steps</SectionTitle>
                <ol className="space-y-6">
                  {steps.map(({ icon: Icon, title, desc }, i) => (
                    <li key={title} className="flex items-start gap-4">
                      <div
                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)' }}
                      >
                        <Icon size={18} style={{ color: TEAL }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: '#e8f4ff' }}>
                          <span style={{ color: TEAL }}>Step {i + 1}.</span> {title}
                        </p>
                        <p className="text-sm mt-1 leading-relaxed" style={{ color: 'rgba(232,244,255,0.6)' }}>{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </SectionCard>

              {/* FAQs */}
              <SectionCard>
                <SectionTitle accent={AMBER}>Frequently Asked Questions</SectionTitle>
                <div className="space-y-5">
                  {faqs.map(faq => (
                    <div key={faq.q}>
                      <p className="text-sm font-semibold flex items-start gap-2" style={{ color: '#e8f4ff' }}>
                        <HelpCircle size={16} className="shrink-0 mt-0.5" style={{ color: AMBER }} />
                        {faq.q}
                      </p>
                      <p className="text-sm mt-1.5 ml-6 leading-relaxed" style={{ color: 'rgba(232,244,255,0.6)' }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Documents */}
              <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-sm" style={{ color: '#e8f4ff' }}>
                  <FileText size={16} style={{ color: AMBER }} />
                  Documents You Need
                </h3>
                <ul className="space-y-2.5">
                  {documents.map(doc => (
                    <li key={doc} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: AMBER }} />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Batch schedule */}
              <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-sm" style={{ color: '#e8f4ff' }}>
                  <CalendarDays size={16} style={{ color: TEAL }} />
                  Rolling Batch Model
                </h3>
                <div className="space-y-2 text-sm" style={{ color: 'rgba(232,244,255,0.6)' }}>
                  {[
                    ['Batch 1', 'September start'],
                    ['Batch 2', 'November start'],
                    ['Batch 3', 'January start'],
                    ['Batch 4', 'March start'],
                    ['Weekend', 'Sat–Sun batch'],
                  ].map(([batch, when]) => (
                    <div key={batch} className="flex justify-between">
                      <span style={{ color: '#607896' }}>{batch}</span>
                      <span className="font-medium" style={{ color: '#e8f4ff' }}>{when}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply CTA */}
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${AMBER}14, transparent)`, border: `1px solid ${AMBER}30` }}
              >
                <h3 className="font-display font-bold text-base mb-2" style={{ color: '#e8f4ff' }}>
                  Ready to Apply?
                </h3>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: '#607896' }}>
                  Create your student account on the MUET Student Portal to register for the current admission phase.
                </p>
                <a
                  href={`${portalLinks.lmsUrl}/student/register`}
                  className="flex items-center justify-center gap-2 w-full text-center py-2.5 rounded-lg text-sm font-bold transition-all"
                  style={{ background: `linear-gradient(135deg, ${AMBER}, #f59e0b)`, color: '#020b18', boxShadow: `0 0 20px ${AMBER}30` }}
                >
                  Apply Now <ArrowRight size={15} />
                </a>
                <Link
                  href="/projects/bbshrrdb-skills-development"
                  className="block text-center mt-3 text-xs font-medium transition-colors"
                  style={{ color: AMBER }}
                >
                  Learn more about BBSHRRDB →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
