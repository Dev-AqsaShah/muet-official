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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 md:hidden overflow-hidden"
            style={{ background: '#064e3b' }}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
          >
            {/* Top dot pattern */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />

            <div className="relative">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-white font-bold text-sm">MUET Training</p>
                  <p className="text-brand-light text-xs">Mehran University</p>
                </div>
                <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col py-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center px-5 py-3.5 text-sm font-medium transition-all',
                        pathname === link.href
                          ? 'text-brand-light bg-white/10 border-l-2 border-brand-light'
                          : 'text-white/75 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-5 py-4 border-t border-white/10 flex gap-3">
                <Link href="/auth/signin" className="flex-1 py-2.5 text-center text-sm font-medium text-white border border-white/25 rounded-lg hover:bg-white/10 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="flex-1 py-2.5 text-center text-sm font-semibold text-white bg-brand-green hover:bg-brand-mid rounded-lg transition-colors">
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
