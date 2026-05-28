'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import { navLinks } from '@/config/navigation'
import { cn } from '@/lib/utils'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled  = useScrolled(60)
  const pathname  = usePathname()

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
        scrolled ? 'shadow-xl shadow-brand-navy/20' : 'shadow-md shadow-brand-navy/10'
      )} style={{ background: '#4682B4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md shrink-0 ring-2 ring-white/30 group-hover:ring-white/60 transition-all">
                <Image
                  src="/images/logos/muet-official.svg"
                  alt="MUET"
                  width={38}
                  height={38}
                  className="object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm leading-tight">Mehran University of Engineering &amp; Technology</p>
                <p className="text-brand-baby text-[11px] leading-tight font-medium tracking-wide">Jamshoro, Sindh, Pakistan</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-lg',
                    pathname === link.href
                      ? 'text-white bg-white/15 font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white/85 border border-white/30 hover:border-white/60 hover:text-white transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-white text-brand-steel hover:bg-brand-baby/10 hover:text-brand-navy transition-all shadow-sm"
              >
                Register
              </Link>
              <button
                className="md:hidden text-white/85 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
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
