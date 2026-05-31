'use client'
import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#020B18' }}>
      <div className="max-w-md w-full rounded-2xl p-8 text-center"
        style={{ background: '#061224', border: '1px solid rgba(239,68,68,0.2)' }}>
        <AlertTriangle size={48} className="mx-auto mb-4" style={{ color: '#EF4444' }} />
        <h2 className="font-display font-bold text-xl mb-2" style={{ color: '#E8F4FF' }}>Something went wrong</h2>
        <p className="text-sm mb-6" style={{ color: '#607896' }}>
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button onClick={reset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm mx-auto"
          style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
          <RefreshCw size={14} /> Try Again
        </button>
      </div>
    </div>
  )
}
