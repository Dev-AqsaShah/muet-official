'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { navLinks } from '@/config/navigation'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => { onClose() }, [pathname])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-brand-navy shadow-xl md:hidden"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <span className="text-white font-semibold text-sm tracking-wide">MUET Training</span>
              <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-5 py-3 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-brand-baby bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
