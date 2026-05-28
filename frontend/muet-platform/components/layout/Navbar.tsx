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
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg shadow-brand-green/8'
          : 'bg-white border-b border-gray-100'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md ring-2 ring-brand-green/15 group-hover:ring-brand-green/40 transition-all shrink-0">
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
                <p className="text-brand-forest font-bold text-sm leading-tight">Mehran University of Engineering &amp; Technology</p>
                <p className="text-brand-green text-[11px] leading-tight font-medium tracking-wide">Jamshoro, Sindh, Pakistan</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                    pathname === link.href
                      ? 'text-brand-green'
                      : 'text-gray-600 hover:text-brand-green'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-brand-green" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-brand-forest border border-gray-200 hover:border-brand-green hover:text-brand-green transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="hidden sm:inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-green hover:bg-brand-mid text-white transition-all shadow-md shadow-brand-green/25 hover:scale-[1.02]"
              >
                Register
              </Link>
              <button
                className="md:hidden text-gray-600 hover:text-brand-forest p-2 rounded-xl hover:bg-gray-50 transition-colors"
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
