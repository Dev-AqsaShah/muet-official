'use client'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'

function SignInForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl  = searchParams.get('callbackUrl') ?? '/'

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [show,    setShow]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', { email: form.email, password: form.password, redirect: false, callbackUrl })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password. Please try again.')
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div className="rounded-3xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)', boxShadow: '0 0 60px rgba(0,229,200,0.06)' }}>
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl text-sm mb-6"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
          <AlertCircle size={15} className="shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: '#e8f4ff' }}>Email address</label>
          <input
            type="email" required value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder-[#607896]"
            style={{ background: '#020b18', border: '1px solid rgba(0,229,200,0.15)', color: '#e8f4ff' }}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: '#e8f4ff' }}>Password</label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'} required value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none transition-all placeholder-[#607896]"
              style={{ background: '#020b18', border: '1px solid rgba(0,229,200,0.15)', color: '#e8f4ff' }}
            />
            <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: '#607896' }}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full py-3.5 font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #00e5c8, #38bdf8)', color: '#020b18', boxShadow: '0 0 24px rgba(0,229,200,0.3)' }}
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-sm mt-6" style={{ color: '#607896' }}>
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="font-semibold hover:underline" style={{ color: '#00e5c8' }}>Create one</Link>
      </p>
    </div>
  )
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative" style={{ background: '#020b18' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,229,200,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center justify-center mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(0,229,200,0.1)', border: '1px solid rgba(0,229,200,0.25)', boxShadow: '0 0 20px rgba(0,229,200,0.15)' }}>
                <img src="/images/logos/muet-logo-official.png" alt="MUET" className="w-9 h-9 object-contain" />
              </div>
            </div>
          </Link>
          <h1 className="font-display font-extrabold text-2xl" style={{ color: '#e8f4ff', letterSpacing: '-0.03em' }}>Welcome back</h1>
          <p className="text-sm mt-1" style={{ color: '#607896' }}>Sign in to your MUET Training account</p>
        </div>

        <Suspense fallback={<div className="rounded-3xl p-8 animate-pulse h-72" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }} />}>
          <SignInForm />
        </Suspense>

        <p className="text-center text-xs mt-6">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors" style={{ color: '#607896' }}>
            <ArrowLeft size={12} /> Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
