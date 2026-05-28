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
      <header className={cn(
        'fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 transition-all duration-300',
        scrolled && 'shadow-lg shadow-brand-green/10'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm ring-1 ring-brand-green/20 group-hover:ring-brand-green/50 transition-all shrink-0">
                <Image
                  src="/images/logos/muet-official.svg"
                  alt="MUET"
                  width={38}
                  height={38}
                  className="object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div className="hidden sm:block lg:hidden">
                <p className="text-brand-forest font-bold text-sm leading-tight">Mehran University</p>
                <p className="text-brand-green text-xs leading-tight">of Engineering &amp; Technology</p>
              </div>
              <div className="hidden lg:block">
                <p className="text-brand-forest font-bold text-sm leading-snug">Mehran University of Engineering &amp; Technology</p>
                <p className="text-brand-green text-xs leading-tight tracking-wide">Jamshoro, Sindh, Pakistan</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-brand-green bg-brand-green/10 font-semibold'
                      : 'text-gray-600 hover:text-brand-forest hover:bg-gray-50'
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
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-brand-forest border border-brand-forest/20 hover:border-brand-green hover:text-brand-green transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-brand-green hover:bg-brand-mid text-white transition-all shadow-sm shadow-brand-green/30"
              >
                Register
              </Link>
              <button
                className="md:hidden text-gray-600 hover:text-brand-forest p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
