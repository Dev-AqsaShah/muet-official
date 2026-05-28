import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { navLinks } from '@/config/navigation'

const programLinks = [
  { label: 'Web Development',    href: '/programs/web-development' },
  { label: 'Graphic Designing',  href: '/programs/graphic-designing-ui-ux' },
  { label: 'Digital Marketing',  href: '/programs/digital-marketing-seo' },
  { label: 'Python Development', href: '/programs/python-development' },
  { label: 'Data Science',       href: '/programs/data-science' },
  { label: 'Cyber Security',     href: '/programs/cyber-security' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#1B3A6B' }} className="text-white">
      {/* Top accent */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #4682B4, #89CFF0, #4682B4)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center overflow-hidden shadow ring-2 ring-brand-baby/30 shrink-0">
                <Image src="/images/logos/muet-official.svg" alt="MUET" width={40} height={40} className="object-contain" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">{siteConfig.name}</p>
                <p className="text-brand-baby text-xs">Training Platform</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              {siteConfig.tagline}. Empowering Sindh youth through certified digital skills training.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border border-brand-baby/30 text-brand-baby hover:bg-brand-baby/10 transition-colors"
            >
              Partner With Us
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-brand-baby mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-brand-baby mb-5">Programmes</h3>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-brand-baby mb-5">Contact</h3>
            <ul className="space-y-3.5 text-sm text-white/50">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-baby" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0 text-brand-baby" />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-brand-baby" />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p>Funded by the Government of Sindh &amp; Government of Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
