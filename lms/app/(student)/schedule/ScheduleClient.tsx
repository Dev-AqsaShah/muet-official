'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, Calendar, Download } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Session {
  id: string; date: string; startTime: string; endTime: string; topic: string
  sessionType: string; isCancelled: boolean; cancelReason?: string | null
}
interface Props { sessions: Session[]; batchType: string; course: string | null }

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const FULL_DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export default function ScheduleClient({ sessions, batchType, course }: Props) {
  const today = new Date()
  const [weekOffset, setWeekOffset] = useState(0)

  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - today.getDay() + weekOffset * 7)
  weekStart.setHours(0,0,0,0)

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })

  const byDate: { [k: string]: Session[] } = {}
  sessions.forEach(s => {
    const d = s.date.split('T')[0]
    if (!byDate[d]) byDate[d] = []
    byDate[d].push(s)
  })

  const todayStr = today.toISOString().split('T')[0]

  const upcoming = sessions.filter(s => s.date >= todayStr && !s.isCancelled).slice(0, 5)
  const cancelled = sessions.filter(s => s.isCancelled)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Class Schedule</h1>
        <p className="text-sm" style={{ color: '#607896' }}>
          {course} · {batchType === 'WEEKEND' ? 'Weekend batch (Sat–Sun)' : 'Regular batch (Mon–Fri)'}
        </p>
      </motion.div>

      {/* Week navigator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>
            Week of {weekStart.toLocaleDateString('en-PK', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setWeekOffset(o => o - 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}>‹</button>
            <button onClick={() => setWeekOffset(0)}
              className="px-2 h-7 rounded-lg text-xs"
              style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}>Today</button>
            <button onClick={() => setWeekOffset(o => o + 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}>›</button>
          </div>
        </div>

        <div className="grid grid-cols-7 divide-x" style={{ borderColor: 'rgba(0,229,200,0.06)' }}>
          {weekDays.map((d, i) => {
            const ds = d.toISOString().split('T')[0]
            const isToday = ds === todayStr
            const daySessions = byDate[ds] ?? []
            return (
              <div key={i} className="flex flex-col"
                style={{ minHeight: 140, background: isToday ? 'rgba(0,229,200,0.03)' : 'transparent' }}>
                <div className="text-center py-2.5 px-1" style={{ borderBottom: '1px solid rgba(0,229,200,0.06)' }}>
                  <p className="text-[10px]" style={{ color: '#607896' }}>{DAYS[i]}</p>
                  <p className="text-sm font-bold" style={{ color: isToday ? '#00E5C8' : '#E8F4FF' }}>{d.getDate()}</p>
                </div>
                <div className="p-1 space-y-1 flex-1">
                  {daySessions.map(s => (
                    <div key={s.id} className="p-1.5 rounded-lg text-[10px]"
                      style={{
                        background: s.isCancelled ? 'rgba(239,68,68,0.08)' : isToday ? 'rgba(0,229,200,0.1)' : 'rgba(0,229,200,0.05)',
                        border: `1px solid ${s.isCancelled ? 'rgba(239,68,68,0.2)' : isToday ? 'rgba(0,229,200,0.3)' : 'rgba(0,229,200,0.1)'}`,
                      }}>
                      <p className="font-semibold truncate" style={{ color: s.isCancelled ? '#EF4444' : '#E8F4FF' }}>
                        {s.isCancelled ? '✕ Cancelled' : s.topic}
                      </p>
                      <p style={{ color: '#607896' }}>{s.startTime}–{s.endTime}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
            <Calendar size={14} style={{ color: '#00E5C8' }} /> Upcoming Classes
          </h3>
          {upcoming.length === 0 ? (
            <p className="text-sm" style={{ color: '#607896' }}>No upcoming classes.</p>
          ) : upcoming.map(s => (
            <div key={s.id} className="flex items-start gap-3 p-3 mb-2 rounded-xl"
              style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)' }}>
                <span className="text-[10px] font-bold" style={{ color: '#00E5C8' }}>
                  {new Date(s.date).toLocaleString('en', { month: 'short' })}
                </span>
                <span className="text-sm font-bold leading-none" style={{ color: '#00E5C8' }}>
                  {new Date(s.date).getDate()}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: '#E8F4FF' }}>{s.topic}</p>
                <p className="text-[10px]" style={{ color: '#607896' }}>
                  {FULL_DAYS[new Date(s.date).getDay()]} · {s.startTime}–{s.endTime} · {s.sessionType}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cancelled */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
            <Clock size={14} style={{ color: '#EF4444' }} /> Cancelled / Holidays
          </h3>
          {cancelled.length === 0 ? (
            <p className="text-sm" style={{ color: '#607896' }}>No cancelled classes.</p>
          ) : cancelled.slice(0, 5).map(s => (
            <div key={s.id} className="flex items-start gap-3 p-3 mb-2 rounded-xl"
              style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}>
              <div>
                <p className="text-xs font-semibold" style={{ color: '#EF4444' }}>✕ {formatDate(s.date)}</p>
                <p className="text-[10px]" style={{ color: '#607896' }}>{s.topic}</p>
                {s.cancelReason && <p className="text-[10px]" style={{ color: '#607896' }}>Reason: {s.cancelReason}</p>}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
