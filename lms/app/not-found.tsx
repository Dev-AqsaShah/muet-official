import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#020B18' }}>
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,229,200,0.06), transparent)', filter: 'blur(80px)' }} />
      <div className="relative text-center">
        <p className="font-display font-bold text-8xl mb-2" style={{ color: 'rgba(0,229,200,0.15)' }}>404</p>
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: '#E8F4FF' }}>Page Not Found</h1>
        <p className="text-sm mb-8" style={{ color: '#607896' }}>
          The page you're looking for doesn't exist or you don't have access to it.
        </p>
        <Link href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
          <Home size={14} /> Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
