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
  const strengthColor = ['', '#f87171', '#fbbf24', '#34d399', '#059669'][s]

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
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#F8FAFC' }}>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#dbeafe' }}>
            <CheckCircle2 size={40} className="text-brand-steel" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: '#1B3A6B' }}>Account Created!</h2>
          <p className="text-gray-500 text-sm">Redirecting you to the homepage…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: '#F8FAFC' }}>
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center justify-center mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1B3A6B, #4682B4)' }}>
                <img src="/images/logos/muet-logo-official.png" alt="MUET" className="w-9 h-9 object-contain" />
              </div>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold" style={{ color: '#1B3A6B' }}>Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Join MUET&apos;s training platform</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-brand-steel/10 border border-gray-100 p-8">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm mb-6">
              <AlertCircle size={15} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Muhammad Ali"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-steel/30 focus:border-brand-steel transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-steel/30 focus:border-brand-steel transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={show.password ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-steel/30 focus:border-brand-steel transition-all" />
                <button type="button" onClick={() => setShow(v => ({ ...v, password: !v.password }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                  {show.password ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all"
                        style={{ background: i <= s ? strengthColor : '#e5e7eb' }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input type={show.confirm ? 'text' : 'password'} required value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Repeat password"
                  className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-steel/30 transition-all ${
                    form.confirm && form.confirm !== form.password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-brand-steel'
                  }`} />
                <button type="button" onClick={() => setShow(v => ({ ...v, confirm: !v.confirm }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                  {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 text-white font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
              style={{ background: '#4682B4', boxShadow: '0 4px 14px rgba(70,130,180,0.3)' }}>
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-semibold hover:underline" style={{ color: '#4682B4' }}>Sign in</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand-steel transition-colors">
            <ArrowLeft size={12} /> Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
