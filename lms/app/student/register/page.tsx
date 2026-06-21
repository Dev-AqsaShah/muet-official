'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Eye, EyeOff } from 'lucide-react'

const DISTRICTS = [
  'Jamshoro','Hyderabad','Matiari','Thatta','Sujawal','Badin',
  'Tando Allahyar','Tando Mohammad Khan','Mirpur Khas','Umerkot',
  'Sanghar','Shaheed Benazirabad','Dadu','Larkana','Sukkur',
  'Khairpur','Ghotki','Shikarpur','Jacobabad','Kashmore',
  'Kambar Shahdadkot','Naushahro Feroze','Other',
]
const QUALIFICATIONS = ['Matric','Intermediate','Bachelor','Master','Other']
const BBSHRRDB_COURSES = [
  'Web Development',
  'Python Development',
  'Graphic Designing & UI/UX',
  'Digital Marketing & SEO',
  'Database Management',
  'Mobile App Development',
  'E-Commerce',
  'Technical Freelancing',
]

type Step = 1 | 2 | 3

interface FormData {
  fullName: string; cnic: string; dob: string; gender: string; mobile: string; email: string
  district: string; qualification: string; programme: string; course: string
  password: string; confirm: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState(false)
  const [show, setShow]       = useState(false)

  const [form, setForm] = useState<FormData>({
    fullName: '', cnic: '', dob: '', gender: '', mobile: '', email: '',
    district: '', qualification: '', programme: 'BBSHRRDB', course: '',
    password: '', confirm: '',
  })

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const ageOk = () => {
    if (!form.dob) return true
    const age = Math.floor((Date.now() - new Date(form.dob).getTime()) / 31557600000)
    return age >= 18 && age <= 35
  }

  const canNext1 = form.fullName && form.cnic && form.dob && form.gender && form.mobile && form.email && ageOk()
  const canNext2 = form.district && form.qualification && form.course
  const canSubmit = form.password.length >= 8 && form.password === form.confirm

  const handleSubmit = async () => {
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/student/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Registration failed.'); setLoading(false); return }
      setSuccess(true)
    } catch { setError('Network error. Please try again.') }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', background: '#020B18', border: '1px solid rgba(0,229,200,0.15)',
    borderRadius: '10px', padding: '11px 14px', color: '#E8F4FF', fontSize: '14px', outline: 'none',
  }
  const label = (t: string) => <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>{t}</label>

  if (success) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#020B18' }}>
      <div className="max-w-md w-full mx-4 rounded-2xl p-10 text-center"
        style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>
        <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: '#00E5C8' }} />
        <h2 className="font-display font-bold text-xl mb-2" style={{ color: '#E8F4FF' }}>Registration Submitted!</h2>
        <p className="text-sm mb-6" style={{ color: '#607896' }}>
          Your application is under review. You will receive an email once the admin approves your account.
          This usually takes 1–2 business days.
        </p>
        <Link href="/student/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
          Back to Login
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center py-10" style={{ background: '#020B18' }}>
      <div className="w-full max-w-lg mx-4">
        <div className="rounded-2xl overflow-hidden"
          style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)', boxShadow: '0 0 60px rgba(0,229,200,0.06)' }}>

          {/* Progress bar */}
          <div className="h-1" style={{ background: '#0C1E35' }}>
            <div className="h-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%`, background: 'linear-gradient(90deg, #00E5C8, #38BDF8)' }} />
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <h1 className="font-display font-bold text-lg" style={{ color: '#E8F4FF' }}>
                  {step === 1 ? 'Personal Information' : step === 2 ? 'Academic & Eligibility' : 'Set Password'}
                </h1>
                <span className="text-xs" style={{ color: '#607896' }}>Step {step} of 3</span>
              </div>
              <p className="text-xs" style={{ color: '#607896' }}>
                {step === 1 ? 'Fill in your basic details' : step === 2 ? 'Select your programme and course' : 'Create a secure password'}
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl mb-4 text-sm"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                <AlertCircle size={15} className="shrink-0 mt-0.5" />{error}
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    {label('Full Name (as per CNIC)')}
                    <input type="text" value={form.fullName} onChange={set('fullName')} placeholder="Muhammad Ali Khan" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                  </div>
                  <div>
                    {label('CNIC Number')}
                    <input type="text" value={form.cnic} onChange={set('cnic')} placeholder="4220112345679" maxLength={13} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                  </div>
                  <div>
                    {label('Date of Birth')}
                    <input type="date" value={form.dob} onChange={set('dob')} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                    {form.dob && !ageOk() && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>Age must be between 18 and 35 to be eligible.</p>}
                  </div>
                  <div>
                    {label('Gender')}
                    <select value={form.gender} onChange={set('gender')} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
                      <option value="">Select gender</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    {label('Mobile Number')}
                    <input type="tel" value={form.mobile} onChange={set('mobile')} placeholder="03001234567" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                  </div>
                  <div className="sm:col-span-2">
                    {label('Email Address')}
                    <input type="email" value={form.email} onChange={set('email')} placeholder="student@email.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  {label('District (must be an eligible Sindh district)')}
                  <select value={form.district} onChange={set('district')} style={inputStyle}
                    onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
                    <option value="">Select district</option>
                    {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  {label('Highest Qualification')}
                  <select value={form.qualification} onChange={set('qualification')} style={inputStyle}
                    onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
                    <option value="">Select qualification</option>
                    {QUALIFICATIONS.map(q => <option key={q}>{q}</option>)}
                  </select>
                </div>
                <div>
                  {label('Programme')}
                  <div style={{ ...inputStyle, color: '#00E5C8', fontWeight: 600, cursor: 'default' }}>
                    BBSHRRDB — Skills Development Programme
                  </div>
                </div>
                <div>
                  {label('Course Track')}
                  <select value={form.course} onChange={set('course')} style={inputStyle}
                    onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
                    <option value="">Select your IT course</option>
                    {BBSHRRDB_COURSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  {label('Password (minimum 8 characters)')}
                  <div className="relative">
                    <input type={show ? 'text' : 'password'} value={form.password} onChange={set('password')}
                      placeholder="Create a strong password"
                      style={{ ...inputStyle, paddingRight: '44px' }}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                    <button type="button" onClick={() => setShow(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#607896' }}>
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  {label('Confirm Password')}
                  <input type={show ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')}
                    placeholder="Re-enter your password"
                    style={{ ...inputStyle, borderColor: form.confirm && form.confirm !== form.password ? '#EF4444' : 'rgba(0,229,200,0.15)' }}
                    onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor= form.confirm && form.confirm !== form.password ? '#EF4444' : 'rgba(0,229,200,0.15)')} />
                  {form.confirm && form.confirm !== form.password && (
                    <p className="text-xs mt-1" style={{ color: '#EF4444' }}>Passwords do not match.</p>
                  )}
                </div>

                {/* Summary */}
                <div className="rounded-xl p-4 mt-2 text-xs space-y-1.5"
                  style={{ background: 'rgba(0,229,200,0.04)', border: '1px solid rgba(0,229,200,0.12)' }}>
                  <p style={{ color: '#607896' }}>Registration summary:</p>
                  <p style={{ color: '#E8F4FF' }}><span style={{ color: '#607896' }}>Name: </span>{form.fullName}</p>
                  <p style={{ color: '#E8F4FF' }}><span style={{ color: '#607896' }}>CNIC: </span>{form.cnic}</p>
                  <p style={{ color: '#E8F4FF' }}><span style={{ color: '#607896' }}>Programme: </span>{form.programme} — {form.course}</p>
                  <p style={{ color: '#E8F4FF' }}><span style={{ color: '#607896' }}>District: </span>{form.district}</p>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button onClick={() => setStep(s => (s - 1) as Step)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.15)', color: '#607896' }}>
                  <ChevronLeft size={15} /> Back
                </button>
              )}
              <div className="flex-1" />
              {step < 3 ? (
                <button onClick={() => { setError(''); setStep(s => (s + 1) as Step) }}
                  disabled={step === 1 ? !canNext1 : !canNext2}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: (step === 1 ? canNext1 : canNext2) ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.2)',
                    color: (step === 1 ? canNext1 : canNext2) ? '#020B18' : '#607896',
                    cursor: (step === 1 ? canNext1 : canNext2) ? 'pointer' : 'not-allowed',
                  }}>
                  Next <ChevronRight size={15} />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!canSubmit || loading}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: canSubmit && !loading ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.2)',
                    color: canSubmit && !loading ? '#020B18' : '#607896',
                    cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
                  }}>
                  {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : 'Submit Registration'}
                </button>
              )}
            </div>

            <p className="text-center text-xs mt-4" style={{ color: '#607896' }}>
              Already registered? <Link href="/student/login" style={{ color: '#00E5C8' }}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
