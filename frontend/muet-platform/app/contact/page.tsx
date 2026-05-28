import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import ContactForm from '@/components/forms/ContactForm'
import { siteConfig } from '@/data/site'

const contactDetails = [
  { icon: MapPin, label: 'Address',      value: siteConfig.address },
  { icon: Phone,  label: 'Phone',        value: siteConfig.phone },
  { icon: Mail,   label: 'Email',        value: siteConfig.email },
  { icon: Clock,  label: 'Office Hours', value: 'Mon – Fri, 9:00 AM – 5:00 PM PKT' },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question about our programmes or want to apply? Get in touch with the MUET training team."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            {/* Form */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Send a Message</h2>
              <ContactForm />
            </div>

            {/* Info card */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              <div className="rounded-2xl p-6 text-white mb-5" style={{ background: '#064e3b' }}>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  For programme applications, eligibility queries, and general enquiries about
                  MUET&apos;s training initiatives and programmes.
                </p>
                <ul className="space-y-4">
                  {contactDetails.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-brand-green/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={15} className="text-brand-light" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-0.5">{label}</p>
                        <p className="text-white text-sm font-medium">{value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-green/10 border border-brand-green/25 rounded-xl p-5 text-sm">
                <p className="font-semibold mb-1 text-brand-forest">Programme Applications</p>
                <p className="leading-relaxed text-gray-600">
                  To apply for a training programme, please include the programme name and your
                  district in your message. We&apos;ll share eligibility details and next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
