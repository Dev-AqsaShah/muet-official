'use client'
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
    <footer style={{ background: '#020b18', borderTop: '1px solid rgba(0,229,200,0.12)' }}>
      {/* Top glow line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #00e5c8, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0,229,200,0.35))' }}
              >
                <Image src="/images/logos/muet-logo-official.png" alt="MUET" width={44} height={44} className="object-contain" />
              </div>
              <div>
                <p className="font-display font-bold text-sm" style={{ color: '#00e5c8', letterSpacing: '0.04em' }}>MUET</p>
                <p className="text-xs" style={{ color: 'rgba(232,244,255,0.35)' }}>Training Platform</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(232,244,255,0.45)' }}>
              {siteConfig.tagline}. Empowering Sindh youth through certified digital skills training.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ border: '1px solid rgba(0,229,200,0.3)', color: '#00e5c8' }}
            >
              Partner With Us
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-5" style={{ color: '#00e5c8', letterSpacing: '0.15em' }}>Navigation</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:translate-x-0.5 inline-block"
                    style={{ color: 'rgba(232,244,255,0.45)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#00e5c8' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,244,255,0.45)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-5" style={{ color: '#00e5c8', letterSpacing: '0.15em' }}>Programmes</h3>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:translate-x-0.5 inline-block"
                    style={{ color: 'rgba(232,244,255,0.45)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#00e5c8' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,244,255,0.45)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-5" style={{ color: '#00e5c8', letterSpacing: '0.15em' }}>Contact</h3>
            <ul className="space-y-3.5 text-sm" style={{ color: 'rgba(232,244,255,0.45)' }}>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#00e5c8' }} />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0" style={{ color: '#00e5c8' }} />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0" style={{ color: '#00e5c8' }} />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ borderTop: '1px solid rgba(0,229,200,0.1)', color: 'rgba(232,244,255,0.25)' }}>
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p>Funded by the Government of Sindh &amp; Government of Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
