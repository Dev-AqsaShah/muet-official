'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Clock, CheckCircle2, XCircle, Calendar, ChevronRight } from 'lucide-react'
import { formatDate, timeUntil } from '@/lib/utils'

interface Quiz {
  id: string; title: string; instructions: string | null; duration: number; totalMarks: number
  weightage: number; startAt: string; endAt: string; status: string
  attempt: { id: string; marksObtained: number | null; timeTaken: number | null; submittedAt: string | null } | null
}

const STATUS_STYLE: { [k: string]: { color: string; bg: string; border: string; label: string } } = {
  scheduled: { color: '#607896', bg: 'rgba(96,120,150,0.08)',   border: 'rgba(96,120,150,0.2)',   label: 'Scheduled' },
  active:    { color: '#00E5C8', bg: 'rgba(0,229,200,0.08)',    border: 'rgba(0,229,200,0.25)',   label: 'Active Now' },
  completed: { color: '#818CF8', bg: 'rgba(129,140,248,0.08)',  border: 'rgba(129,140,248,0.25)', label: 'Completed' },
  missed:    { color: '#EF4444', bg: 'rgba(239,68,68,0.08)',    border: 'rgba(239,68,68,0.25)',   label: 'Missed' },
}

export default function QuizzesClient({ quizzes, studentId }: { quizzes: Quiz[]; studentId: string }) {
  const active    = quizzes.filter(q => q.status === 'active')
  const upcoming  = quizzes.filter(q => q.status === 'scheduled')
  const past      = quizzes.filter(q => q.status === 'completed' || q.status === 'missed')

  const Section = ({ title, items }: { title: string; items: Quiz[] }) => items.length === 0 ? null : (
    <div className="space-y-3">
      <h2 className="font-semibold text-sm" style={{ color: '#607896' }}>{title}</h2>
      {items.map((q, i) => {
        const sty = STATUS_STYLE[q.status] ?? STATUS_STYLE.scheduled
        const pct = q.attempt?.marksObtained != null ? Math.round((q.attempt.marksObtained / q.totalMarks) * 100) : null
        const scoreColor = pct == null ? '#607896' : pct >= 80 ? '#00E5C8' : pct >= 50 ? '#FBBF24' : '#EF4444'

        return (
          <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={q.status === 'active' ? `/quizzes/${q.id}` : '#'}
              className="block rounded-2xl p-5 transition-all"
              style={{ background: '#061224', border: `1px solid ${sty.border}`, cursor: q.status === 'active' ? 'pointer' : 'default' }}
              onMouseEnter={e => q.status === 'active' && ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>{q.title}</h3>
                  <p className="text-xs mt-0.5" style={{ color: '#607896' }}>
                    {q.duration} min · {q.totalMarks} marks · {q.weightage}% of grade
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1"
                  style={{ background: sty.bg, color: sty.color, border: `1px solid ${sty.border}` }}>
                  {q.status === 'active' && <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00E5C8', animation: 'blink 1.8s infinite' }} />}
                  {sty.label}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs" style={{ color: '#607896' }}>
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  {q.status === 'scheduled' ? `Starts ${formatDate(q.startAt)}` : formatDate(q.startAt)}
                </span>
                {pct != null ? (
                  <span className="font-bold text-sm" style={{ color: scoreColor }}>{pct}%</span>
                ) : q.status === 'active' ? (
                  <span className="flex items-center gap-1.5 font-semibold" style={{ color: '#00E5C8' }}>
                    Start Quiz <ChevronRight size={13} />
                  </span>
                ) : q.status === 'scheduled' ? (
                  <span style={{ color: '#607896' }}>Starts in {timeUntil(q.startAt)}</span>
                ) : null}
              </div>

              {q.attempt?.timeTaken && (
                <p className="text-[10px] mt-2" style={{ color: '#607896' }}>
                  Time taken: {Math.floor(q.attempt.timeTaken / 60)}m {q.attempt.timeTaken % 60}s
                </p>
              )}
            </Link>
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
          <Zap size={22} style={{ color: '#00E5C8' }} /> Quizzes
        </h1>
        <div className="flex gap-4 text-sm" style={{ color: '#607896' }}>
          {active.length > 0 && <span style={{ color: '#00E5C8' }}>{active.length} active now</span>}
          <span>{upcoming.length} upcoming</span>
          <span>{past.length} completed</span>
        </div>
      </motion.div>

      {quizzes.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
          <Zap size={36} className="mx-auto mb-3" style={{ color: '#607896' }} />
          <p className="text-sm" style={{ color: '#607896' }}>No quizzes scheduled yet.</p>
        </div>
      ) : (
        <>
          <Section title="Active Now" items={active} />
          <Section title="Upcoming" items={upcoming} />
          <Section title="Past Quizzes" items={past} />
        </>
      )}
    </div>
  )
}
