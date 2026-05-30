'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, AlertTriangle, CheckCircle2, XCircle, Clock } from 'lucide-react'
import AttendanceRing from '@/components/student/AttendanceRing'
import { formatDate } from '@/lib/utils'

interface Record {
  id: string; date: string; status: string; timeIn?: string | null
  timeOut?: string | null; topic?: string | null
}
interface Props {
  records: Record[]
  stats: { total: number; present: number; absent: number; late: number; percent: number; canMiss: number }
  batchStart: string | null
  batchEnd: string | null
}

const STATUS_COLOR: { [k: string]: string } = {
  PRESENT: '#00E5C8', ABSENT: '#EF4444', LATE: '#FBBF24',
}
const STATUS_ICON = { PRESENT: CheckCircle2, ABSENT: XCircle, LATE: Clock }

function CalendarDay({ date, status }: { date: string; status?: string }) {
  const color = status ? STATUS_COLOR[status] : undefined
  return (
    <div className="aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all"
      style={{
        background: color ? `${color}15` : 'transparent',
        border: `1px solid ${color ? `${color}30` : 'rgba(0,229,200,0.06)'}`,
        color: color ?? '#607896',
      }}>
      {new Date(date).getDate()}
    </div>
  )
}

export default function AttendanceClient({ records, stats, batchStart, batchEnd }: Props) {
  const [monthOffset, setMonthOffset] = useState(0)
  const [filter, setFilter] = useState<'ALL' | 'PRESENT' | 'ABSENT' | 'LATE'>('ALL')

  const now = new Date()
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const monthName = viewDate.toLocaleString('en-PK', { month: 'long', year: 'numeric' })

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const byDate: { [k: string]: string } = {}
  records.forEach(r => {
    const d = r.date.split('T')[0]
    byDate[d] = r.status
  })

  const filtered = records.filter(r => filter === 'ALL' || r.status === filter)

  const pct = stats.percent
  const eligible = pct >= 90

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Attendance</h1>
        <p className="text-sm" style={{ color: '#607896' }}>
          {batchStart && batchEnd ? `Batch period: ${formatDate(batchStart)} — ${formatDate(batchEnd)}` : 'Your attendance record'}
        </p>
      </motion.div>

      {/* Summary row */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 flex flex-col items-center"
          style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)', minWidth: 220 }}>
          <AttendanceRing percent={pct} present={stats.present} total={stats.total} size={160} />
          <div className="mt-5 text-center text-xs space-y-1.5">
            <p style={{ color: '#607896' }}>
              {eligible
                ? `You can miss ${stats.canMiss} more day${stats.canMiss !== 1 ? 's' : ''} and stay eligible.`
                : `You need to attend more classes to reach 90%.`}
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Present', value: stats.present, color: '#00E5C8' },
            { label: 'Absent',  value: stats.absent,  color: '#EF4444' },
            { label: 'Late',    value: stats.late,     color: '#FBBF24' },
            { label: 'Total Classes', value: stats.total, color: '#818CF8' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: '#061224', border: `1px solid ${s.color}20` }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 0 0, ${s.color}08, transparent 70%)` }} />
              <p className="font-display font-semibold text-2xl mb-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs" style={{ color: '#607896' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Eligibility banner */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center gap-3 p-4 rounded-xl"
          style={{
            background: eligible ? 'rgba(0,229,200,0.06)' : 'rgba(239,68,68,0.06)',
            border: `1px solid ${eligible ? 'rgba(0,229,200,0.2)' : 'rgba(239,68,68,0.2)'}`,
          }}>
          {eligible
            ? <CheckCircle2 size={18} style={{ color: '#00E5C8', flexShrink: 0 }} />
            : <AlertTriangle size={18} style={{ color: '#EF4444', flexShrink: 0 }} />}
          <p className="text-sm font-semibold" style={{ color: eligible ? '#00E5C8' : '#EF4444' }}>
            {eligible
              ? `Eligible ✓ — Your attendance meets the 90% requirement for certification.`
              : `At Risk — You need 90% attendance to qualify for your MUET Certificate. Current: ${pct}%.`}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Calendar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>{monthName}</h2>
            <div className="flex gap-2">
              <button onClick={() => setMonthOffset(o => o - 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
                style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}>‹</button>
              <button onClick={() => setMonthOffset(0)}
                className="px-2 h-7 rounded-lg text-xs transition-all"
                style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}>Today</button>
              <button onClick={() => setMonthOffset(o => o + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
                style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}>›</button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="text-center text-[10px] font-semibold py-1" style={{ color: '#607896' }}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
              return <CalendarDay key={dayNum} date={dateStr} status={byDate[dateStr]} />
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 text-xs" style={{ color: '#607896' }}>
            {[['#00E5C8','Present'],['#EF4444','Absent'],['#FBBF24','Late']].map(([c,l]) => (
              <span key={l} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: `${c}30`, border: `1px solid ${c}40` }} />{l}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Log table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
            <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>Attendance Log</h2>
            <div className="flex gap-1">
              {(['ALL','PRESENT','ABSENT','LATE'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-2 py-1 rounded text-[10px] font-semibold transition-all"
                  style={{
                    background: filter === f ? 'rgba(0,229,200,0.1)' : 'transparent',
                    color: filter === f ? '#00E5C8' : '#607896',
                  }}>{f === 'ALL' ? 'All' : f[0] + f.slice(1).toLowerCase()}</button>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '420px' }}>
            {filtered.length === 0 ? (
              <p className="text-center text-sm py-10" style={{ color: '#607896' }}>No records found.</p>
            ) : filtered.slice().reverse().map((r, i) => {
              const Icon = STATUS_ICON[r.status as keyof typeof STATUS_ICON] ?? CheckCircle2
              const color = STATUS_COLOR[r.status] ?? '#607896'
              return (
                <div key={r.id} className="flex items-start gap-3 px-4 py-3"
                  style={{ borderBottom: '1px solid rgba(0,229,200,0.04)' }}>
                  <Icon size={15} className="mt-0.5 shrink-0" style={{ color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold" style={{ color: '#E8F4FF' }}>{formatDate(r.date)}</p>
                    {r.topic && <p className="text-[10px] truncate" style={{ color: '#607896' }}>{r.topic}</p>}
                    {(r.timeIn || r.timeOut) && (
                      <p className="text-[10px]" style={{ color: '#607896' }}>
                        {r.timeIn && `In: ${r.timeIn}`}{r.timeOut && ` · Out: ${r.timeOut}`}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
                    {r.status[0] + r.status.slice(1).toLowerCase()}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
