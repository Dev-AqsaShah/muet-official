import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <p className="text-7xl font-bold text-brand-steel mb-4">404</p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 text-sm max-w-xs mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-steel text-white font-medium rounded-lg hover:bg-brand-steel/90 transition-colors text-sm"
        >
          <Home size={16} /> Go Home
        </Link>
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:border-brand-steel hover:text-brand-steel transition-colors text-sm"
        >
          View Programs <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
