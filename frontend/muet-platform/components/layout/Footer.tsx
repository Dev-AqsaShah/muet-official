import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { navLinks } from '@/config/navigation'

const programLinks = [
  { label: 'Web Development',        href: '/programs/web-development' },
  { label: 'Graphic Designing',      href: '/programs/graphic-designing-ui-ux' },
  { label: 'Digital Marketing',      href: '/programs/digital-marketing-seo' },
  { label: 'Python Development',     href: '/programs/python-development' },
  { label: 'Data Science',           href: '/programs/data-science' },
  { label: 'Cyber Security',         href: '/programs/cyber-security' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center overflow-hidden shadow">
                <Image
                  src="/images/logos/muet-official.svg"
                  alt="MUET"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{siteConfig.name}</p>
                <p className="text-white/50 text-xs">{siteConfig.fullName}</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {siteConfig.tagline}. Empowering Sindh youth through certified digital skills programmes.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-brand-baby uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs + Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-brand-baby uppercase tracking-wider">Programs</h3>
            <ul className="space-y-2 mb-6">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-sm mb-3 text-brand-baby uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-baby" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-brand-baby" />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-brand-baby" />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p>Funded by the Government of Sindh &amp; Government of Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
