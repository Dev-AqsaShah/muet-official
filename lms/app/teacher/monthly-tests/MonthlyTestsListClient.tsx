'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, ClipboardCheck, Clock, Users } from 'lucide-react'

interface Test {
  id: string; title: string; reviewStatus: string; published: boolean
  questionCount: number; attemptCount: number; questionsPerStudent: number | null
  startAt: string; endAt: string
}
interface Batch { id: string; batchNumber: string; course: string }
interface Props { batch: Batch | null; tests: Test[] }

const statusBadge = (t: Test) => {
  if (t.published) return { label: 'Published', color: '#00E5C8' }
  if (t.reviewStatus === 'PENDING_REVIEW') return { label: 'Pending Review', color: '#FBBF24' }
  return { label: 'Draft', color: '#607896' }
}

export default function MonthlyTestsListClient({ batch, tests }: Props) {
  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Monthly Tests</h1>
          <p className="text-sm" style={{ color: '#607896' }}>
            {batch ? `Batch ${batch.batchNumber} — ${batch.course}` : 'No batch assigned yet'}
          </p>
        </div>
        {batch && (
          <Link href="/teacher/monthly-tests/create"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
            <Plus size={15} /> Create Test
          </Link>
        )}
      </motion.div>

      {tests.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <ClipboardCheck size={32} className="mx-auto mb-3" style={{ color: '#607896' }} />
          <p className="text-sm" style={{ color: '#607896' }}>No monthly tests yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tests.map((t, i) => {
            const badge = statusBadge(t)
            const href = t.published ? `/teacher/monthly-tests/${t.id}/review` : `/teacher/monthly-tests/${t.id}/review`
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={href}
                  className="block rounded-2xl p-5 transition-all"
                  style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>{t.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{ background: `${badge.color}15`, color: badge.color }}>{badge.label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs" style={{ color: '#607896' }}>
                    <span className="flex items-center gap-1"><ClipboardCheck size={12} /> {t.questionCount} pool questions · {t.questionsPerStudent ?? '?'} per student</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {t.attemptCount} attempts</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(t.startAt).toLocaleDateString()} – {new Date(t.endAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
