'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, AlertCircle, CheckCircle2, ArrowLeft, Eye, EyeOff } from 'lucide-react'

const ACCENT = '#FBBF24'

export default function AdminRegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', adminCode: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const res = await fetch('/api/admin/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setDone(true)
      setTimeout(() => router.push('/admin/login'), 2500)
    } else {
      setError(data.error ?? 'Registration failed.')
    }
  }

  const inputStyle = {
    width: '100%', background: '#020B18', border: `1px solid ${ACCENT}26`,
    borderRadius: '12px', padding: '12px 16px', color: '#E8F4FF', fontSize: '14px',
    outline: 'none', transition: 'border-color .2s',
  } as const

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10" style={{ background: '#020B18' }}>
      <div className="pointer-events-none absolute top-0 right-1/4 w-80 h-80 rounded-full"
        style={{ background: `${ACCENT}0d`, filter: 'blur(100px)' }} />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-xs mb-4" style={{ color: '#607896' }}>
          <ArrowLeft size={13} /> Admin login
        </Link>

        <div className="rounded-2xl p-8" style={{ background: 'rgba(6,18,36,0.92)', border: `1px solid ${ACCENT}26` }}>
          <div className="flex flex-col items-center mb-7">
            <div className="w-14 h-14 rounded-2xl mb-3 flex items-center justify-center overflow-hidden"
              style={{ border: `1px solid ${ACCENT}4d` }}>
              <Image src="/muet-logo.png" alt="MUET" width={56} height={56} className="object-contain" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 px-3 py-1 rounded-full"
              style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}33`, color: ACCENT }}>
              Admin Registration
            </span>
            <p className="text-xs text-center" style={{ color: '#607896' }}>
              Restricted — requires the admin setup code held by MUET IT administration
            </p>
          </div>

          {done ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 size={36} style={{ color: ACCENT }} />
              <p className="text-sm font-semibold" style={{ color: '#E8F4FF' }}>Admin account created!</p>
              <p className="text-xs" style={{ color: '#607896' }}>Redirecting you to admin login…</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl mb-5 text-sm"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Email Address</label>
                  <input type="email" value={form.email} onChange={set('email')}
                    placeholder="admin@muet.edu.pk" required style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Admin Setup Code</label>
                  <input type="password" value={form.adminCode} onChange={set('adminCode')}
                    placeholder="Held by IT administration" required style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Password</label>
                  <div className="relative">
                    <input type={show ? 'text' : 'password'} value={form.password} onChange={set('password')}
                      placeholder="Minimum 8 characters" required minLength={8}
                      style={{ ...inputStyle, paddingRight: '44px' }} />
                    <button type="button" onClick={() => setShow(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#607896' }}>
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: loading ? `${ACCENT}33` : `linear-gradient(135deg, ${ACCENT}, #F59E0B)`,
                    color: loading ? '#607896' : '#020B18',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}>
                  {loading
                    ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    : <><ShieldCheck size={16} /> Create Admin Account</>}
                </button>
              </form>

              <p className="text-center text-xs mt-6" style={{ color: '#607896' }}>
                Already registered? <Link href="/admin/login" style={{ color: ACCENT }}>Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
