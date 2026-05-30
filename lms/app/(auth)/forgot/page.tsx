'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, KeyRound, CheckCircle2, Eye, EyeOff } from 'lucide-react'

type Phase = 'email' | 'otp' | 'done'

export default function ForgotPage() {
  const [phase, setPhase] = useState<Phase>('email')
  const [email, setEmail]     = useState('')
  const [otp, setOtp]         = useState('')
  const [pw, setPw]           = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const inputStyle = {
    width: '100%', background: '#020B18', border: '1px solid rgba(0,229,200,0.15)',
    borderRadius: '10px', padding: '11px 14px', color: '#E8F4FF', fontSize: '14px', outline: 'none',
  }

  const handleSendOTP = async () => {
    setError(''); setLoading(true)
    const res = await fetch('/api/auth/forgot', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setLoading(false)
    if (res.ok) setPhase('otp')
    else setError((await res.json()).error ?? 'Email not found.')
  }

  const handleReset = async () => {
    if (pw !== confirm) { setError('Passwords do not match.'); return }
    setError(''); setLoading(true)
    const res = await fetch('/api/auth/reset', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, password: pw }),
    })
    setLoading(false)
    if (res.ok) setPhase('done')
    else setError((await res.json()).error ?? 'Invalid or expired OTP.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#020B18' }}>
      <div className="w-full max-w-md mx-4">
        <div className="rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>

          {phase === 'done' ? (
            <div className="text-center">
              <CheckCircle2 size={52} className="mx-auto mb-4" style={{ color: '#00E5C8' }} />
              <h2 className="font-display font-bold text-lg mb-2" style={{ color: '#E8F4FF' }}>Password Reset!</h2>
              <p className="text-sm mb-6" style={{ color: '#607896' }}>Your password has been updated. You can now sign in.</p>
              <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="font-display font-bold text-lg mb-1" style={{ color: '#E8F4FF' }}>
                  {phase === 'email' ? 'Forgot Password' : 'Enter OTP & New Password'}
                </h1>
                <p className="text-xs" style={{ color: '#607896' }}>
                  {phase === 'email' ? 'Enter your registered email to receive an OTP.' : `OTP sent to ${email}. It expires in 10 minutes.`}
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl mb-4 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                  {error}
                </div>
              )}

              {phase === 'email' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Email Address</label>
                    <div className="relative">
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@email.com"
                        style={{ ...inputStyle, paddingLeft: '40px' }}
                        onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#607896' }} />
                    </div>
                  </div>
                  <button onClick={handleSendOTP} disabled={!email || loading}
                    className="w-full py-3 rounded-xl font-bold text-sm"
                    style={{ background: email && !loading ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.2)', color: email && !loading ? '#020B18' : '#607896' }}>
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              )}

              {phase === 'otp' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>OTP Code</label>
                    <div className="relative">
                      <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit code" maxLength={6}
                        style={{ ...inputStyle, paddingLeft: '40px' }}
                        onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                      <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#607896' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>New Password</label>
                    <div className="relative">
                      <input type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 8 characters"
                        style={{ ...inputStyle, paddingRight: '40px' }}
                        onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                      <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#607896' }}>
                        {show ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Confirm Password</label>
                    <input type={show ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                  </div>
                  <button onClick={handleReset} disabled={!otp || pw.length < 8 || pw !== confirm || loading}
                    className="w-full py-3 rounded-xl font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              )}

              <p className="text-center text-xs mt-4" style={{ color: '#607896' }}>
                <Link href="/login" style={{ color: '#00E5C8' }}>Back to Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
