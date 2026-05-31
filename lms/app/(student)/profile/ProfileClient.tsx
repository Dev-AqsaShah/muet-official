'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Shield, BookOpen, Bell, Eye, EyeOff, CheckCircle2, Sun, Moon, Camera } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import StatusBadge from '@/components/ui/StatusBadge'
import { useTheme } from '@/components/ThemeProvider'

interface Student {
  id: string; fullName: string; cnic: string; dob: string; gender: string
  mobile: string; district: string; qualification: string; programme: string
  photoUrl: string | null; email: string; status: string
}
interface Batch { course: string; batchNumber: string; batchType: string; centre: string; instructor: string; startDate: string; endDate: string }

export default function ProfileClient({ student, batch }: { student: Student; batch: Batch | null }) {
  const { theme, toggle } = useTheme()
  const [mobile, setMobile]       = useState(student.mobile)
  const [email, setEmail]         = useState(student.email)
  const [photoUrl, setPhotoUrl]   = useState(student.photoUrl ?? '')
  const [saving, setSaving]       = useState(false)
  const [saved, setSaved]         = useState(false)
  const [savErr, setSavErr]       = useState('')

  const [curPw, setCurPw]   = useState('')
  const [newPw, setNewPw]   = useState('')
  const [conPw, setConPw]   = useState('')
  const [showPw, setShowPw] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg]       = useState('')

  const [emailNotifs, setEmailNotifs]   = useState(true)
  const [browserNotifs, setBrowserNotifs] = useState(false)

  const saveProfile = async () => {
    setSaving(true); setSavErr(''); setSaved(false)
    try {
      const res = await fetch('/api/students/profile', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: student.id, mobile, email, photoUrl: photoUrl || null }),
      })
      if (res.ok) setSaved(true)
      else setSavErr((await res.json()).error ?? 'Failed')
    } catch { setSavErr('Network error') }
    setSaving(false)
  }

  const changePassword = async () => {
    if (newPw.length < 8) { setPwMsg('Password must be at least 8 characters.'); return }
    if (newPw !== conPw)  { setPwMsg('Passwords do not match.'); return }
    setPwSaving(true); setPwMsg('')
    try {
      const res = await fetch('/api/students/profile', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: student.id, currentPassword: curPw, newPassword: newPw }),
      })
      if (res.ok) { setPwMsg('✓ Password updated successfully.'); setCurPw(''); setNewPw(''); setConPw('') }
      else setPwMsg((await res.json()).error ?? 'Failed')
    } catch { setPwMsg('Network error') }
    setPwSaving(false)
  }

  const initials = student.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const inp = { background: 'var(--bg)', border: '1px solid rgba(0,229,200,0.15)', borderRadius: '10px', padding: '9px 12px', color: 'var(--white)', fontSize: '13px', outline: 'none', width: '100%' }
  const focus = (e: any) => (e.target.style.borderColor = '#00E5C8')
  const blur  = (e: any) => (e.target.style.borderColor = 'rgba(0,229,200,0.15)')
  const lbl   = (t: string) => <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>{t}</label>

  const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg2)', border: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
        <Icon size={14} style={{ color: '#00E5C8' }} />
        <h2 className="font-semibold text-sm" style={{ color: 'var(--white)' }}>{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )

  return (
    <div className="space-y-5 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--white)' }}>My Profile</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Manage your account and preferences</p>
      </motion.div>

      {/* Avatar + name */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
        className="rounded-2xl p-5 flex items-center gap-5" style={{ background: 'var(--bg2)', border: '1px solid rgba(0,229,200,0.15)', boxShadow: '0 0 40px rgba(0,229,200,0.06)' }}>
        <div className="relative shrink-0">
          {photoUrl ? (
            <img src={photoUrl} alt={student.fullName} className="w-16 h-16 rounded-2xl object-cover"
              style={{ border: '2px solid rgba(0,229,200,0.3)' }} />
          ) : (
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl"
              style={{ background: 'rgba(0,229,200,0.12)', border: '2px solid rgba(0,229,200,0.3)', color: '#00E5C8' }}>
              {initials}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-xl truncate" style={{ color: 'var(--white)' }}>{student.fullName}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{student.cnic}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <StatusBadge status={student.programme} />
            <StatusBadge status={student.status} />
          </div>
        </div>
      </motion.div>

      {/* Enrolled programme */}
      {batch && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Section icon={BookOpen} title="Enrolled Programme">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Course',      batch.course],
                ['Batch',       `Batch ${batch.batchNumber} (${batch.batchType === 'WEEKEND' ? 'Weekend' : 'Regular'})`],
                ['Centre',      batch.centre],
                ['Instructor',  batch.instructor],
                ['Start Date',  formatDate(batch.startDate)],
                ['End Date',    formatDate(batch.endDate)],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--muted)' }}>{k}</p>
                  <p className="font-medium text-xs" style={{ color: 'var(--white)' }}>{v}</p>
                </div>
              ))}
            </div>
          </Section>
        </motion.div>
      )}

      {/* Personal info — read-only fields */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
        <Section icon={User} title="Personal Information">
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            {[
              ['Full Name',      student.fullName],
              ['CNIC',           student.cnic],
              ['Date of Birth',  formatDate(student.dob)],
              ['Gender',         student.gender],
              ['District',       student.district],
              ['Qualification',  student.qualification],
            ].map(([k, v]) => (
              <div key={k} className="p-3 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid rgba(0,229,200,0.06)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--muted)' }}>{k}</p>
                <p className="text-xs font-medium" style={{ color: 'var(--white)' }}>{v}</p>
              </div>
            ))}
          </div>

          {/* Editable fields */}
          <div className="space-y-3 pt-3" style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#00E5C8' }}>Editable Fields</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>{lbl('Mobile Number')}<input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} style={inp} onFocus={focus} onBlur={blur} /></div>
              <div>{lbl('Email Address')}<input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} onFocus={focus} onBlur={blur} /></div>
              <div className="sm:col-span-2">
                {lbl('Profile Photo URL (Cloudinary/Google Drive)')}
                <div className="flex gap-2">
                  <input type="url" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="https://..." style={{ ...inp, flex: 1 }} onFocus={focus} onBlur={blur} />
                  {photoUrl && <img src={photoUrl} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" style={{ border: '1px solid rgba(0,229,200,0.2)' }} onError={e => (e.currentTarget.style.display='none')} />}
                </div>
              </div>
            </div>
            {savErr && <p className="text-xs" style={{ color: '#EF4444' }}>{savErr}</p>}
            {saved  && <p className="text-xs flex items-center gap-1.5" style={{ color: '#00E5C8' }}><CheckCircle2 size={12} /> Profile saved!</p>}
            <button onClick={saveProfile} disabled={saving}
              className="px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </Section>
      </motion.div>

      {/* Password change */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <Section icon={Shield} title="Change Password">
          <div className="space-y-3">
            {[
              { label: 'Current Password', val: curPw, set: setCurPw, ph: 'Your current password' },
              { label: 'New Password',     val: newPw, set: setNewPw, ph: 'Min 8 characters'      },
              { label: 'Confirm Password', val: conPw, set: setConPw, ph: 'Re-enter new password'  },
            ].map(({ label, val, set, ph }) => (
              <div key={label}>
                {lbl(label)}
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={val} onChange={e => set(e.target.value)} placeholder={ph}
                    style={{ ...inp, paddingRight: '40px' }} onFocus={focus} onBlur={blur} />
                  <button type="button" onClick={() => setShowPw(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }}>
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            ))}
            {pwMsg && <p className="text-xs" style={{ color: pwMsg.startsWith('✓') ? '#00E5C8' : '#EF4444' }}>{pwMsg}</p>}
            <button onClick={changePassword} disabled={pwSaving || !curPw || !newPw || !conPw}
              className="px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: curPw && newPw && conPw ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.2)', color: curPw && newPw && conPw ? '#020B18' : 'var(--muted)' }}>
              {pwSaving ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </Section>
      </motion.div>

      {/* Preferences */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
        <Section icon={Bell} title="Preferences">
          <div className="space-y-4">
            {/* Theme */}
            <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(0,229,200,0.06)' }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--white)' }}>Theme</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Switch between dark and light mode</p>
              </div>
              <button onClick={toggle}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
                {theme === 'dark' ? <><Sun size={13} /> Light Mode</> : <><Moon size={13} /> Dark Mode</>}
              </button>
            </div>

            {/* Notification prefs */}
            {[
              { label: 'Email Notifications', desc: 'Receive assignment & grade alerts by email', val: emailNotifs, set: setEmailNotifs },
              { label: 'Browser Notifications', desc: 'Push notifications for announcements', val: browserNotifs, set: setBrowserNotifs },
            ].map(({ label, desc, val, set }) => (
              <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(0,229,200,0.04)' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--white)' }}>{label}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{desc}</p>
                </div>
                <div onClick={() => set(!val)} className="w-10 h-5 rounded-full relative cursor-pointer transition-all"
                  style={{ background: val ? '#00E5C8' : 'rgba(96,120,150,0.3)' }}>
                  <div className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                    style={{ background: '#E8F4FF', left: val ? '22px' : '2px' }} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </motion.div>
    </div>
  )
}
