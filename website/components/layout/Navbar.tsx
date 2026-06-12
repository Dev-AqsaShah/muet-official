'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown, LayoutDashboard } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import { navLinks, portalLinks } from '@/config/navigation'
import { cn } from '@/lib/utils'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [portalsOpen, setPortalsOpen] = useState(false)
  const portalsRef = useRef<HTMLDivElement>(null)
  const scrolled  = useScrolled(60)
  const pathname  = usePathname()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (portalsRef.current && !portalsRef.current.contains(e.target as Node)) setPortalsOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          scrolled ? 'shadow-lg' : ''
        )}
        style={{
          background: 'rgba(2,11,24,0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,229,200,0.12)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0 transition-all"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0,229,200,0.35))' }}
              >
                <Image
                  src="/images/logos/muet-logo-official.png"
                  alt="MUET"
                  width={44}
                  height={44}
                  className="object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div className="hidden sm:flex flex-col gap-0">
                <span
                  className="font-display text-base font-800 leading-tight"
                  style={{ color: '#00e5c8', fontWeight: 800, letterSpacing: '0.04em', textShadow: '0 0 16px rgba(0,229,200,0.4)' }}
                >
                  MUET
                </span>
                <span className="text-[10px] leading-tight" style={{ color: 'rgba(232,244,255,0.45)', letterSpacing: '0.04em' }}>
                  Mehran University of Engineering &amp; Technology
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-colors duration-200',
                    pathname === link.href
                      ? 'font-semibold'
                      : ''
                  )}
                  style={{
                    color: pathname === link.href ? '#00e5c8' : 'rgba(232,244,255,0.55)',
                  }}
                  onMouseEnter={e => { if (pathname !== link.href) (e.currentTarget as HTMLAnchorElement).style.color = '#00e5c8' }}
                  onMouseLeave={e => { if (pathname !== link.href) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,244,255,0.55)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <div ref={portalsRef} className="relative hidden sm:block">
                <button
                  onClick={() => setPortalsOpen(o => !o)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    color: portalsOpen ? '#00e5c8' : 'rgba(232,244,255,0.6)',
                    border: `1px solid rgba(0,229,200,${portalsOpen ? 0.5 : 0.2})`,
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#00e5c8'; el.style.borderColor = 'rgba(0,229,200,0.5)' }}
                  onMouseLeave={e => { if (!portalsOpen) { const el = e.currentTarget; el.style.color = 'rgba(232,244,255,0.6)'; el.style.borderColor = 'rgba(0,229,200,0.2)' } }}
                >
                  <LayoutDashboard size={14} />
                  Portals
                  <ChevronDown size={14} style={{ transform: portalsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {portalsOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 rounded-xl overflow-hidden shadow-2xl"
                    style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.2)' }}
                  >
                    {portalLinks.items.map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-3 transition-colors"
                        style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,200,0.06)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                      >
                        <p className="text-sm font-semibold" style={{ color: '#00e5c8' }}>{item.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(232,244,255,0.45)' }}>{item.desc}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/programs"
                className="hidden sm:inline-flex items-center px-5 py-2 rounded-lg text-sm font-bold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #00e5c8, #38bdf8)',
                  color: '#020b18',
                  boxShadow: '0 0 24px rgba(0,229,200,0.3)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(0,229,200,0.5)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(0,229,200,0.3)' }}
              >
                Explore Programmes
              </Link>
              <button
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: 'rgba(232,244,255,0.7)' }}
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
