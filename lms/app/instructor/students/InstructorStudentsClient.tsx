'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Phone, Mail, Flag } from 'lucide-react'

interface Student {
  id: string; fullName: string; cnic: string; mobile: string; district: string
  qualification: string; attendancePct: number; totalScore: number; isPassing: boolean; status: string
}

export default function InstructorStudentsClient({ students, batchName }: { students: Student[]; batchName: string }) {
  const [search, setSearch] = useState('')
  const [sort, setSort]     = useState<'name'|'attendance'|'grade'>('name')

  const filtered = students
    .filter(s => !search || s.fullName.toLowerCase().includes(search.toLowerCase()) || s.cnic.includes(search))
    .sort((a, b) => sort === 'attendance' ? b.attendancePct - a.attendancePct : sort === 'grade' ? b.totalScore - a.totalScore : a.fullName.localeCompare(b.fullName))

  const atRisk   = students.filter(s => s.attendancePct < 90).length
  const passing  = students.filter(s => s.isPassing).length

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>My Students</h1>
        <p className="text-sm" style={{ color: '#607896' }}>{batchName} · {students.length} students</p>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: students.length, color: '#00E5C8' },
          { label: 'At Risk', value: atRisk, color: '#EF4444' },
          { label: 'Passing', value: passing, color: '#818CF8' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: '#061224', border: `1px solid ${s.color}20` }}>
            <p className="font-display font-bold text-xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs" style={{ color: '#607896' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#607896' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or CNIC..."
            className="w-full py-2.5 pl-10 pr-4 rounded-xl text-sm"
            style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.12)', color: '#E8F4FF', outline: 'none' }}
            onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.12)')} />
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
          {(['name','attendance','grade'] as const).map(s => (
            <button key={s} onClick={() => setSort(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
              style={{ background: sort === s ? 'rgba(0,229,200,0.1)' : 'transparent', color: sort === s ? '#00E5C8' : '#607896' }}>
              {s === 'attendance' ? 'Attendance' : s === 'grade' ? 'Score' : 'Name'}
            </button>
          ))}
        </div>
      </div>

      {/* Student list */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        {filtered.map((s, i) => {
          const atRisk = s.attendancePct < 90
          const attColor = s.attendancePct >= 90 ? '#00E5C8' : s.attendancePct >= 75 ? '#FBBF24' : '#EF4444'
          return (
            <motion.div key={s.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className="flex items-center gap-4 px-5 py-4"
              style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none',
                background: atRisk ? 'rgba(239,68,68,0.02)' : 'transparent' }}>

              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: atRisk ? 'rgba(239,68,68,0.1)' : 'rgba(0,229,200,0.08)', color: atRisk ? '#EF4444' : '#00E5C8', border: `1px solid ${atRisk ? 'rgba(239,68,68,0.2)' : 'rgba(0,229,200,0.15)'}` }}>
                {s.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: '#E8F4FF' }}>{s.fullName}</p>
                <p className="text-xs" style={{ color: '#607896' }}>{s.cnic} · {s.district}</p>
              </div>

              {/* Attendance */}
              <div className="text-center shrink-0">
                <p className="text-sm font-bold" style={{ color: attColor }}>{s.attendancePct}%</p>
                <p className="text-[10px]" style={{ color: '#607896' }}>Attendance</p>
              </div>

              {/* Score */}
              <div className="text-center shrink-0">
                <p className="text-sm font-bold" style={{ color: s.totalScore >= 50 ? '#818CF8' : '#607896' }}>
                  {s.totalScore.toFixed(1)}
                </p>
                <p className="text-[10px]" style={{ color: '#607896' }}>Score</p>
              </div>

              {/* Contact */}
              <div className="flex gap-1.5 shrink-0">
                <a href={`tel:${s.mobile}`}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)', color: '#00E5C8' }}>
                  <Phone size={12} />
                </a>
                <a href={`https://wa.me/92${s.mobile.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all text-xs"
                  style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)', color: '#00E5C8' }}>
                  💬
                </a>
              </div>
            </motion.div>
          )
        })}
        {filtered.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-sm" style={{ color: '#607896' }}>No students found.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
