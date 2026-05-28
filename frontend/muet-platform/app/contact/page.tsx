import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
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
        subtitle="Have a question about our programmes or want to partner with us? We're here to help."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14">

            {/* Form */}
            <div>
              <div className="mb-8">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-3 py-1 rounded-full bg-brand-green/10">
                  Send a Message
                </span>
                <h2 className="text-2xl font-bold text-brand-forest">We&apos;ll respond within 1–2 business days</h2>
              </div>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Info card */}
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <div className="p-7 text-white" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #052e16 100%)' }}>
                  <p className="text-brand-light font-bold text-xs uppercase tracking-widest mb-5">Contact Information</p>
                  <ul className="space-y-5">
                    {contactDetails.map(({ icon: Icon, label, value }) => (
                      <li key={label} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl bg-brand-green/25 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={15} className="text-brand-light" />
                        </div>
                        <div>
                          <p className="text-white/40 text-xs mb-0.5 font-medium">{label}</p>
                          <p className="text-white text-sm font-semibold leading-snug">{value}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Application note */}
              <div className="rounded-2xl p-5 border border-brand-green/20 bg-brand-green/5">
                <p className="font-bold text-brand-forest text-sm mb-2">Programme Applications</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Include the programme name and your district in your message. We&apos;ll share eligibility details and next steps within 48 hours.
                </p>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:text-brand-mid transition-colors">
                  Email directly <ArrowRight size={13} />
                </a>
              </div>

              {/* Location */}
              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <div className="h-32 relative" style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
                  <div className="absolute inset-0 opacity-[0.08]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={28} className="text-brand-light mx-auto mb-1" />
                      <p className="text-white font-bold text-sm">MUET — Jamshoro</p>
                      <p className="text-brand-light text-xs">Sindh, Pakistan</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-600 text-xs leading-relaxed">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
