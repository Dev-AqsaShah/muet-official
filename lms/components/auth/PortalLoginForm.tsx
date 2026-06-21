'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, LogIn, AlertCircle, ArrowLeft } from 'lucide-react'

const ERROR_MESSAGES: { [k: string]: string } = {
  PENDING:      'Your account is pending approval. You will be notified by email.',
  REJECTED:     'Your registration was rejected. Contact MUET for more information.',
  SUSPENDED:    'Your account has been suspended. Contact the admin.',
  WRONG_PORTAL: 'This account does not belong to this portal. Use the correct portal to sign in.',
  CredentialsSignin: 'Invalid email/CNIC or password.',
}

export interface PortalConfig {
  portal: 'student' | 'teacher' | 'admin'
  title: string
  subtitle: string
  accent: string
  dashboardUrl: string
  registerUrl?: string
  registerLabel?: string
  identifierLabel?: string
  identifierPlaceholder?: string
}

export default function PortalLoginForm(props: PortalConfig) {
  return <Suspense><LoginForm {...props} /></Suspense>
}

function LoginForm({
  portal, title, subtitle, accent, dashboardUrl,
  registerUrl, registerLabel,
  identifierLabel = 'Email or CNIC Number',
  identifierPlaceholder = 'email@example.com or 4220112345679',
}: PortalConfig) {
  const router      = useRouter()
  const params      = useSearchParams()
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const errParam = params.get('error')
  useEffect(() => {
    if (errParam) setError(ERROR_MESSAGES[errParam] ?? 'Login failed.')
  }, [errParam])

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const N = 80
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
    }))

    const hexToRgb = (hex: string) => {
      const m = hex.replace('#', '')
      return `${parseInt(m.slice(0, 2), 16)},${parseInt(m.slice(2, 4), 16)},${parseInt(m.slice(4, 6), 16)}`
    }
    const rgb = hexToRgb(accent)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height)  p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},0.5)`
        ctx.fill()
      })
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
        if (d < 120) {
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(${rgb},${0.12 * (1 - d / 120)})`
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [accent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const res = await signIn('credentials', {
      identifier: id, password: pw, portal, redirect: false,
    })
    setLoading(false)
    if (res?.ok) {
      router.push(dashboardUrl)
    } else {
      setError(ERROR_MESSAGES[res?.error ?? ''] ?? 'Login failed. Please try again.')
    }
  }

  const inputStyle = {
    width: '100%', background: '#020B18', border: `1px solid ${accent}26`,
    borderRadius: '12px', padding: '12px 16px', color: '#E8F4FF', fontSize: '14px',
    outline: 'none', transition: 'border-color .2s',
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{ background: '#020B18' }}>
      <canvas ref={canvasRef} id="particle-canvas" />

      <div className="pointer-events-none absolute top-0 left-1/4 w-80 h-80 rounded-full"
        style={{ background: `${accent}10`, filter: 'blur(100px)' }} />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-64 h-64 rounded-full"
        style={{ background: 'rgba(56,189,248,0.05)', filter: 'blur(80px)' }} />

      <div className="relative z-10 w-full max-w-md px-4 py-10">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-xs mb-4 transition-colors"
          style={{ color: '#607896' }}>
          <ArrowLeft size={13} /> All portals
        </Link>

        <div className="rounded-2xl p-8" style={{ background: 'rgba(6,18,36,0.92)', border: `1px solid ${accent}26`, boxShadow: `0 0 60px ${accent}14` }}>

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
              style={{ border: `1px solid ${accent}4d`, filter: `drop-shadow(0 0 12px ${accent}4d)` }}>
              <Image src="/muet-logo.png" alt="MUET" width={64} height={64} className="object-contain" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 px-3 py-1 rounded-full"
              style={{ background: `${accent}14`, border: `1px solid ${accent}33`, color: accent }}>
              {title}
            </span>
            <h1 className="font-display font-bold text-xl mb-1" style={{ color: '#E8F4FF' }}>MUET LMS</h1>
            <p className="text-xs text-center" style={{ color: '#607896' }}>{subtitle}</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl mb-5 text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>
                {identifierLabel}
              </label>
              <input
                type="text" value={id} onChange={e => setId(e.target.value)}
                placeholder={identifierPlaceholder}
                required autoComplete="username"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = accent)}
                onBlur={e  => (e.target.style.borderColor = `${accent}26`)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)}
                  placeholder="Enter your password"
                  required autoComplete="current-password"
                  style={{ ...inputStyle, paddingRight: '44px' }}
                  onFocus={e => (e.target.style.borderColor = accent)}
                  onBlur={e  => (e.target.style.borderColor = `${accent}26`)}
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#607896' }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link href="/forgot" className="text-xs transition-colors" style={{ color: '#607896' }}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
              style={{
                background: loading ? `${accent}33` : `linear-gradient(135deg, ${accent}, #38BDF8)`,
                color: loading ? '#607896' : '#020B18',
                boxShadow: loading ? 'none' : `0 0 24px ${accent}4d`,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>

          {registerUrl && (
            <p className="text-center text-xs mt-6" style={{ color: '#607896' }}>
              {registerLabel ?? 'New here?'}{' '}
              <Link href={registerUrl} style={{ color: accent }}>Register Now</Link>
            </p>
          )}

          <p className="text-center text-[10px] mt-4" style={{ color: 'rgba(96,120,150,0.6)' }}>
            Government of Sindh Funded Programme — BBSHRRDB × MUET
          </p>
        </div>
      </div>
    </div>
  )
}
