'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Clock, Users, Save } from 'lucide-react'

interface Student { id: string; fullName: string; cnic: string; mobile: string }
interface Props {
  instructorId: string
  batch: { id: string; batchNumber: string; course: string; students: Student[] } | null
}

type AttendStatus = 'PRESENT' | 'ABSENT' | 'LATE'

export default function MarkAttendanceClient({ instructorId, batch }: Props) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate]       = useState(today)
  const [topic, setTopic]     = useState('')
  const [session, setSession] = useState<'Morning'|'Evening'>('Morning')
  const [marks, setMarks]     = useState<{ [k: string]: AttendStatus }>({})
  const [times, setTimes]     = useState<{ [k: string]: { in: string; out: string } }>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')

  if (!batch) return (
    <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
      <Users size={32} className="mx-auto mb-3" style={{ color: '#607896' }} />
      <p className="text-sm" style={{ color: '#607896' }}>No batch assigned yet.</p>
    </div>
  )

  const students = batch.students
  const setAll = (s: AttendStatus) =>
    setMarks(Object.fromEntries(students.map(st => [st.id, s])))

  const present = Object.values(marks).filter(v => v === 'PRESENT').length
  const absent  = Object.values(marks).filter(v => v === 'ABSENT').length
  const late    = Object.values(marks).filter(v => v === 'LATE').length

  const StatusBtn = ({ sid, status }: { sid: string; status: AttendStatus }) => {
    const colors: { [k: string]: string } = { PRESENT: '#00E5C8', ABSENT: '#EF4444', LATE: '#FBBF24' }
    const icons = { PRESENT: CheckCircle2, ABSENT: XCircle, LATE: Clock }
    const Icon = icons[status]
    const active = marks[sid] === status
    const c = colors[status]
    return (
      <button onClick={() => setMarks(m => ({ ...m, [sid]: status }))}
        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
        style={{
          background: active ? `${c}15` : 'transparent',
          border: `1px solid ${active ? `${c}40` : 'rgba(0,229,200,0.08)'}`,
          color: active ? c : '#607896',
        }}>
        <Icon size={11} />{status[0] + status.slice(1).toLowerCase()}
      </button>
    )
  }

  const handleSubmit = async () => {
    setError(''); setLoading(true)
    const entries = students.map(s => ({
      studentId: s.id,
      status: marks[s.id] ?? 'ABSENT',
      timeIn: times[s.id]?.in ?? null,
      timeOut: times[s.id]?.out ?? null,
    }))
    try {
      const res = await fetch('/api/instructor/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchId: batch.id, instructorId, date, topic, session, entries }),
      })
      if (!res.ok) { setError((await res.json()).error ?? 'Failed'); setLoading(false); return }
      setDone(true)
    } catch { setError('Network error') }
    setLoading(false)
  }

  if (done) return (
    <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>
      <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: '#00E5C8' }} />
      <h2 className="font-display font-bold text-xl mb-2" style={{ color: '#E8F4FF' }}>Attendance Saved!</h2>
      <p className="text-sm mb-6" style={{ color: '#607896' }}>
        {present} present · {late} late · {absent} absent for {date}
      </p>
      <button onClick={() => { setDone(false); setMarks({}) }}
        className="px-6 py-3 rounded-xl font-bold text-sm"
        style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
        Mark Another Session
      </button>
    </div>
  )

  const inputStyle = {
    background: '#020B18', border: '1px solid rgba(0,229,200,0.15)', borderRadius: '10px',
    padding: '9px 12px', color: '#E8F4FF', fontSize: '13px', outline: 'none',
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Mark Attendance</h1>
        <p className="text-sm" style={{ color: '#607896' }}>Batch {batch.batchNumber} — {batch.course} · {students.length} students</p>
      </motion.div>

      {/* Session details */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              max={today} style={{ ...inputStyle, width: '100%' }}
              onFocus={e => (e.target.style.borderColor = '#00E5C8')}
              onBlur={e  => (e.target.style.borderColor = 'rgba(0,229,200,0.15)')} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Session</label>
            <select value={session} onChange={e => setSession(e.target.value as any)} style={{ ...inputStyle, width: '100%' }}
              onFocus={e => (e.target.style.borderColor = '#00E5C8')}
              onBlur={e  => (e.target.style.borderColor = 'rgba(0,229,200,0.15)')}>
              <option>Morning</option><option>Evening</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Topic Covered</label>
            <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. React Hooks"
              style={{ ...inputStyle, width: '100%' }}
              onFocus={e => (e.target.style.borderColor = '#00E5C8')}
              onBlur={e  => (e.target.style.borderColor = 'rgba(0,229,200,0.15)')} />
          </div>
        </div>
      </motion.div>

      {/* Bulk actions + counts */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setAll('PRESENT')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
          style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
          <CheckCircle2 size={12} /> Mark All Present
        </button>
        <button onClick={() => setAll('ABSENT')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
          <XCircle size={12} /> Mark All Absent
        </button>
        <div className="ml-auto flex gap-3 text-xs" style={{ color: '#607896' }}>
          <span style={{ color: '#00E5C8' }}>P: {present}</span>
          <span style={{ color: '#FBBF24' }}>L: {late}</span>
          <span style={{ color: '#EF4444' }}>A: {absent}</span>
          <span>— {students.length - present - late - absent} unmarked</span>
        </div>
      </div>

      {/* Student rows */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        {students.map((s, i) => (
          <div key={s.id} className="px-4 py-3"
            style={{ borderBottom: i < students.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)', color: '#00E5C8' }}>
                {s.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: '#E8F4FF' }}>{s.fullName}</p>
                <p className="text-[10px]" style={{ color: '#607896' }}>{s.cnic}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <StatusBtn sid={s.id} status="PRESENT" />
                <StatusBtn sid={s.id} status="LATE" />
                <StatusBtn sid={s.id} status="ABSENT" />
              </div>
            </div>
            {/* Time fields (show only if not absent) */}
            {marks[s.id] && marks[s.id] !== 'ABSENT' && (
              <div className="flex gap-2 mt-2 pl-11">
                <input type="time" placeholder="Time In"
                  value={times[s.id]?.in ?? ''}
                  onChange={e => setTimes(t => ({ ...t, [s.id]: { ...t[s.id], in: e.target.value } }))}
                  className="text-[10px] px-2 py-1 rounded-lg"
                  style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.1)', color: '#607896', outline: 'none' }} />
                <input type="time" placeholder="Time Out"
                  value={times[s.id]?.out ?? ''}
                  onChange={e => setTimes(t => ({ ...t, [s.id]: { ...t[s.id], out: e.target.value } }))}
                  className="text-[10px] px-2 py-1 rounded-lg"
                  style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.1)', color: '#607896', outline: 'none' }} />
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {error && <p className="text-sm text-center" style={{ color: '#EF4444' }}>{error}</p>}

      <button onClick={handleSubmit} disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
        style={{ background: loading ? 'rgba(0,229,200,0.2)' : 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: loading ? '#607896' : '#020B18', boxShadow: loading ? 'none' : '0 0 24px rgba(0,229,200,0.25)' }}>
        {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <><Save size={16} /> Save Attendance</>}
      </button>
    </div>
  )
}
