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
  const scrolled = useScrolled(60)
  const pathname = usePathname()

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 bg-brand-navy transition-shadow duration-300',
          scrolled && 'shadow-lg shadow-black/20'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logos/muet.svg"
                  alt="MUET"
                  width={32}
                  height={32}
                  className="object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-sm leading-tight">MUET</p>
                <p className="text-brand-baby text-xs leading-tight">Training Programs</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-white bg-white/15'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-brand-steel hover:bg-brand-steel/90 text-white transition-colors"
              >
                Apply Now
              </Link>
              <button
                className="md:hidden text-white/80 hover:text-white p-2 rounded-md hover:bg-white/10 transition-colors"
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
