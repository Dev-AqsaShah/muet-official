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

      <section className="py-20 relative" style={{ background: '#020b18' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14">

            {/* Form */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #00e5c8, transparent)' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>Send a Message</span>
                </div>
                <h2 className="font-display font-bold text-2xl" style={{ color: '#e8f4ff' }}>
                  We&apos;ll respond within 1–2 business days
                </h2>
              </div>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Info card */}
              <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(0,229,200,0.15)', boxShadow: '0 0 60px rgba(0,229,200,0.06)' }}>
                <div className="p-7 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,229,200,0.12) 0%, rgba(56,189,248,0.08) 100%)' }}>
                  <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00e5c8 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                  <p className="relative font-bold text-xs uppercase tracking-widest mb-5" style={{ color: '#00e5c8' }}>Contact Information</p>
                  <ul className="relative space-y-5">
                    {contactDetails.map(({ icon: Icon, label, value }) => (
                      <li key={label} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: 'rgba(0,229,200,0.15)', border: '1px solid rgba(0,229,200,0.25)' }}>
                          <Icon size={15} style={{ color: '#00e5c8' }} />
                        </div>
                        <div>
                          <p className="text-xs mb-0.5 font-medium" style={{ color: 'rgba(232,244,255,0.4)' }}>{label}</p>
                          <p className="text-sm font-semibold leading-snug" style={{ color: '#e8f4ff' }}>{value}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Application note */}
              <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <p className="font-bold text-sm mb-2" style={{ color: '#e8f4ff' }}>Programme Applications</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(232,244,255,0.55)' }}>
                  Include the programme name and your district in your message. We&apos;ll share eligibility details and next steps within 48 hours.
                </p>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: '#00e5c8' }}>
                  Email directly <ArrowRight size={13} />
                </a>
              </div>

              {/* Location */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,229,200,0.1)' }}>
                <div className="h-32 relative" style={{ background: 'linear-gradient(135deg, rgba(0,229,200,0.1), rgba(56,189,248,0.06))' }}>
                  <div className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00e5c8 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={28} className="mx-auto mb-1" style={{ color: '#00e5c8' }} />
                      <p className="font-bold text-sm" style={{ color: '#e8f4ff' }}>MUET — Jamshoro</p>
                      <p className="text-xs" style={{ color: '#00e5c8' }}>Sindh, Pakistan</p>
                    </div>
                  </div>
                </div>
                <div className="p-4" style={{ background: '#061224' }}>
                  <p className="text-xs leading-relaxed" style={{ color: '#607896' }}>{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
