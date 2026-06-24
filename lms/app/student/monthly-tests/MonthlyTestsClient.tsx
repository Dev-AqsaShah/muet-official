'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ClipboardCheck, Clock, Lock } from 'lucide-react'

interface Test {
  id: string; title: string; duration: number; questionsPerStudent: number | null
  startAt: string; endAt: string; status: string
  attempt: { marksObtained: number | null; submittedAt: string | null } | null
}
interface Props { tests: Test[] }

const statusInfo: Record<string, { label: string; color: string }> = {
  scheduled: { label: 'Scheduled', color: '#607896' },
  active: { label: 'Open Now', color: '#00E5C8' },
  completed: { label: 'Completed', color: '#818CF8' },
  missed: { label: 'Missed', color: '#EF4444' },
}

export default function MonthlyTestsClient({ tests }: Props) {
  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Monthly Tests</h1>
        <p className="text-sm" style={{ color: '#607896' }}>
          Each test is monitored and timed — once started, stay in fullscreen until you submit.
        </p>
      </motion.div>

      {tests.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <ClipboardCheck size={32} className="mx-auto mb-3" style={{ color: '#607896' }} />
          <p className="text-sm" style={{ color: '#607896' }}>No monthly tests published yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tests.map((t, i) => {
            const info = statusInfo[t.status]
            const clickable = t.status === 'active'
            const card = (
              <div className="rounded-2xl p-5" style={{ background: '#061224', border: `1px solid ${clickable ? 'rgba(0,229,200,0.25)' : 'rgba(0,229,200,0.1)'}` }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>{t.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ background: `${info.color}15`, color: info.color }}>{info.label}</span>
                </div>
                <div className="flex items-center gap-4 text-xs mb-2" style={{ color: '#607896' }}>
                  <span className="flex items-center gap-1"><Clock size={12} /> {t.duration} min · {t.questionsPerStudent ?? '?'} questions</span>
                  <span>Window: {new Date(t.startAt).toLocaleString()} – {new Date(t.endAt).toLocaleString()}</span>
                </div>
                {t.attempt?.marksObtained != null && (
                  <p className="text-xs font-semibold" style={{ color: '#00E5C8' }}>Score: {t.attempt.marksObtained}</p>
                )}
                {clickable && (
                  <p className="flex items-center gap-1.5 text-xs mt-2 font-semibold" style={{ color: '#FBBF24' }}>
                    <Lock size={12} /> Locked, monitored test — click to begin
                  </p>
                )}
              </div>
            )
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                {clickable ? <Link href={`/student/monthly-tests/${t.id}`}>{card}</Link> : card}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
