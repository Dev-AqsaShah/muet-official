'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [show, setShow] = useState({ password: false, confirm: false })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  const strength = (p: string) => {
    if (!p.length) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }
  const s = strength(form.password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][s]
  const strengthColor = ['', '#f87171', '#fbbf24', '#38bdf8', '#00e5c8'][s]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
    const res  = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, password: form.password }) })
    const data = await res.json()

    if (!res.ok) { setError(data.error ?? 'Something went wrong.'); setLoading(false); return }

    await signIn('credentials', { email: form.email, password: form.password, redirect: false })
    setSuccess(true)
    setTimeout(() => router.push('/'), 1500)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative" style={{ background: '#020b18' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(0,229,200,0.1)', border: '2px solid rgba(0,229,200,0.3)', boxShadow: '0 0 40px rgba(0,229,200,0.2)' }}>
            <CheckCircle2 size={40} style={{ color: '#00e5c8' }} />
          </div>
          <h2 className="font-display font-extrabold text-2xl mb-2" style={{ color: '#e8f4ff', letterSpacing: '-0.03em' }}>Account Created!</h2>
          <p className="text-sm" style={{ color: '#607896' }}>Redirecting you to the homepage…</p>
        </div>
      </div>
    )
  }

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
          <h1 className="font-display font-extrabold text-2xl" style={{ color: '#e8f4ff', letterSpacing: '-0.03em' }}>Create your account</h1>
          <p className="text-sm mt-1" style={{ color: '#607896' }}>Join MUET&apos;s training platform</p>
        </div>

        <div className="rounded-3xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)', boxShadow: '0 0 60px rgba(0,229,200,0.06)' }}>
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl text-sm mb-6"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              <AlertCircle size={15} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#e8f4ff' }}>Full Name</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Muhammad Ali"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder-[#607896]"
                style={{ background: '#020b18', border: '1px solid rgba(0,229,200,0.15)', color: '#e8f4ff' }} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#e8f4ff' }}>Email address</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder-[#607896]"
                style={{ background: '#020b18', border: '1px solid rgba(0,229,200,0.15)', color: '#e8f4ff' }} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#e8f4ff' }}>Password</label>
              <div className="relative">
                <input type={show.password ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none transition-all placeholder-[#607896]"
                  style={{ background: '#020b18', border: '1px solid rgba(0,229,200,0.15)', color: '#e8f4ff' }} />
                <button type="button" onClick={() => setShow(v => ({ ...v, password: !v.password }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: '#607896' }}>
                  {show.password ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all"
                        style={{ background: i <= s ? strengthColor : 'rgba(96,120,150,0.3)' }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#e8f4ff' }}>Confirm Password</label>
              <div className="relative">
                <input type={show.confirm ? 'text' : 'password'} required value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Repeat password"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none transition-all placeholder-[#607896]"
                  style={{
                    background: '#020b18',
                    border: form.confirm && form.confirm !== form.password ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,229,200,0.15)',
                    color: '#e8f4ff'
                  }} />
                <button type="button" onClick={() => setShow(v => ({ ...v, confirm: !v.confirm }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: '#607896' }}>
                  {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #00e5c8, #38bdf8)', color: '#020b18', boxShadow: '0 0 24px rgba(0,229,200,0.3)' }}>
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#607896' }}>
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-semibold hover:underline" style={{ color: '#00e5c8' }}>Sign in</Link>
          </p>
        </div>

        <p className="text-center text-xs mt-6">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors" style={{ color: '#607896' }}>
            <ArrowLeft size={12} /> Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
