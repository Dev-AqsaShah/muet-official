'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClipboardList, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react'
import { timeUntil, formatDate } from '@/lib/utils'

interface Submission { id: string; status: string; marksObtained: number | null; feedback: string | null; submittedAt: string }
interface Assignment {
  id: string; title: string; type: string; maxMarks: number; weightage: number
  dueDate: string; allowLate: boolean; attachmentUrl: string | null; submission: Submission | null
}

const TYPE_LABEL: { [k: string]: string } = {
  WEEKLY_PROJECT: 'Weekly Project', LAB_ASSIGNMENT: 'Lab Assignment', FINAL_PROJECT: 'Final Project',
}

const STATUS_STYLE: { [k: string]: { color: string; bg: string; border: string; label: string } } = {
  PENDING:   { color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.25)',  label: 'Pending'   },
  SUBMITTED: { color: '#00E5C8', bg: 'rgba(0,229,200,0.08)',   border: 'rgba(0,229,200,0.25)',   label: 'Submitted' },
  GRADED:    { color: '#818CF8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.25)', label: 'Graded'    },
  LATE:      { color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   label: 'Late'      },
  OVERDUE:   { color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   label: 'Overdue'   },
}

function getStatus(a: Assignment): string {
  if (a.submission) return a.submission.status
  if (new Date(a.dueDate) < new Date()) return 'OVERDUE'
  return 'PENDING'
}

export default function AssignmentsClient({ assignments, studentId }: { assignments: Assignment[]; studentId: string }) {
  const pending  = assignments.filter(a => !a.submission && new Date(a.dueDate) >= new Date())
  const submitted = assignments.filter(a => a.submission)
  const overdue  = assignments.filter(a => !a.submission && new Date(a.dueDate) < new Date())

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Assignments</h1>
        <div className="flex gap-4 text-sm" style={{ color: '#607896' }}>
          <span style={{ color: '#FBBF24' }}>{pending.length} pending</span>
          <span style={{ color: '#00E5C8' }}>{submitted.length} submitted</span>
          {overdue.length > 0 && <span style={{ color: '#EF4444' }}>{overdue.length} overdue</span>}
        </div>
      </motion.div>

      {assignments.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
          <ClipboardList size={36} className="mx-auto mb-3" style={{ color: '#607896' }} />
          <p className="text-sm" style={{ color: '#607896' }}>No assignments yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {assignments.map((a, i) => {
            const status = getStatus(a)
            const sty = STATUS_STYLE[status] ?? STATUS_STYLE.PENDING
            const isGraded = status === 'GRADED'
            const isPending = status === 'PENDING'

            return (
              <motion.div key={a.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/assignments/${a.id}`}
                  className="block rounded-2xl p-5 transition-all"
                  style={{ background: '#061224', border: `1px solid ${sty.border}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${sty.color}12` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: sty.color }}>
                        {TYPE_LABEL[a.type] ?? a.type}
                      </span>
                      <h3 className="font-semibold text-sm mt-0.5 line-clamp-2" style={{ color: '#E8F4FF' }}>{a.title}</h3>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: sty.bg, color: sty.color, border: `1px solid ${sty.border}` }}>
                      {sty.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs" style={{ color: '#607896' }}>
                    <span>{a.maxMarks} marks · {a.weightage}% weight</span>
                    {isGraded && a.submission?.marksObtained != null ? (
                      <span className="font-bold" style={{ color: '#818CF8' }}>
                        {a.submission.marksObtained}/{a.maxMarks}
                      </span>
                    ) : isPending ? (
                      <span className="flex items-center gap-1" style={{ color: '#FBBF24' }}>
                        <Clock size={11} /> {timeUntil(a.dueDate)}
                      </span>
                    ) : (
                      <span>{formatDate(a.dueDate)}</span>
                    )}
                  </div>

                  {isGraded && a.submission?.feedback && (
                    <p className="text-xs mt-2 line-clamp-1" style={{ color: '#607896' }}>
                      Feedback: {a.submission.feedback}
                    </p>
                  )}

                  <div className="flex items-center justify-end mt-3">
                    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: sty.color }}>
                      {isPending ? 'Submit Now' : 'View Details'} <ChevronRight size={13} />
                    </span>
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
