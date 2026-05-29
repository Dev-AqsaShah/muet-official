'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { navLinks } from '@/config/navigation'

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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 md:hidden overflow-hidden"
            style={{ background: '#020b18', borderBottom: '1px solid rgba(0,229,200,0.15)' }}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
          >
            <div className="relative">
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(0,229,200,0.1)' }}>
                <div>
                  <p className="font-display font-bold text-sm" style={{ color: '#00e5c8' }}>MUET Training</p>
                  <p className="text-xs" style={{ color: 'rgba(232,244,255,0.4)' }}>Mehran University</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: 'rgba(232,244,255,0.5)' }}
                >
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
                      className="flex items-center px-5 py-3.5 text-sm font-medium transition-all"
                      style={{
                        color: pathname === link.href ? '#00e5c8' : 'rgba(232,244,255,0.6)',
                        borderLeft: pathname === link.href ? '2px solid #00e5c8' : '2px solid transparent',
                        background: pathname === link.href ? 'rgba(0,229,200,0.05)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-5 py-4 flex gap-3" style={{ borderTop: '1px solid rgba(0,229,200,0.1)' }}>
                <Link
                  href="/auth/signin"
                  className="flex-1 py-2.5 text-center text-sm font-medium rounded-lg transition-colors"
                  style={{ color: 'rgba(232,244,255,0.7)', border: '1px solid rgba(0,229,200,0.25)' }}
                >
                  Sign In
                </Link>
                <Link
                  href="/programs"
                  className="flex-1 py-2.5 text-center text-sm font-bold rounded-lg transition-colors"
                  style={{ background: 'linear-gradient(135deg, #00e5c8, #38bdf8)', color: '#020b18' }}
                >
                  Programmes
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
