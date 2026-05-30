'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate } from '@/lib/utils'

interface Sub { id: string; status: string; fileUrl: string | null; note: string | null; marksObtained: number | null; feedback: string | null; submittedAt: string; gradedAt: string | null; student: { id: string; fullName: string; cnic: string } }
interface Assignment { id: string; title: string; type: string; maxMarks: number; dueDate: string; submissions: Sub[] }

const TYPE_LABEL: { [k: string]: string } = { WEEKLY_PROJECT: 'Weekly Project', LAB_ASSIGNMENT: 'Lab', FINAL_PROJECT: 'Final Project' }

export default function GradesClient({ assignments }: { assignments: Assignment[] }) {
  const [openAsmt, setOpenAsmt] = useState<string | null>(assignments[0]?.id ?? null)
  const [grading, setGrading]   = useState<{ [subId: string]: { marks: string; feedback: string } }>({})
  const [saving, setSaving]     = useState<string | null>(null)
  const [saved, setSaved]       = useState<Set<string>>(new Set())

  const pendingTotal = assignments.reduce((n, a) => n + a.submissions.filter(s => s.status === 'SUBMITTED').length, 0)

  const handleGrade = async (subId: string, maxMarks: number) => {
    const g = grading[subId]
    if (!g?.marks) return
    const marks = parseFloat(g.marks)
    if (isNaN(marks) || marks < 0 || marks > maxMarks) return
    setSaving(subId)
    try {
      const res = await fetch(`/api/instructor/submissions/${subId}/grade`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marksObtained: marks, feedback: g.feedback ?? '' }),
      })
      if (res.ok) setSaved(s => new Set([...s, subId]))
    } finally { setSaving(null) }
  }

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Grade Assignments</h1>
        {pendingTotal > 0 && (
          <p className="text-sm" style={{ color: '#FBBF24' }}>⚠ {pendingTotal} submission{pendingTotal > 1 ? 's' : ''} waiting to be graded</p>
        )}
      </motion.div>

      {assignments.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
          <p className="text-sm" style={{ color: '#607896' }}>No assignments created yet.</p>
        </div>
      ) : assignments.map((a, ai) => {
        const isOpen   = openAsmt === a.id
        const pending  = a.submissions.filter(s => s.status === 'SUBMITTED').length
        const graded   = a.submissions.filter(s => s.status === 'GRADED').length

        return (
          <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ai * 0.05 }}
            className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
            <button onClick={() => setOpenAsmt(isOpen ? null : a.id)}
              className="w-full flex items-center justify-between px-5 py-4 transition-all"
              style={{ background: isOpen ? 'rgba(0,229,200,0.03)' : 'transparent' }}>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-sm text-left" style={{ color: '#E8F4FF' }}>{a.title}</p>
                  <p className="text-xs text-left" style={{ color: '#607896' }}>
                    {TYPE_LABEL[a.type] ?? a.type} · {a.maxMarks} marks · Due {formatDate(a.dueDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {pending > 0 && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.25)' }}>
                    {pending} pending
                  </span>
                )}
                <span className="text-xs" style={{ color: '#607896' }}>{graded}/{a.submissions.length} graded</span>
                {isOpen ? <ChevronUp size={15} style={{ color: '#607896' }} /> : <ChevronDown size={15} style={{ color: '#607896' }} />}
              </div>
            </button>

            {isOpen && (
              <div style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
                {a.submissions.length === 0 ? (
                  <div className="px-5 py-6 text-center">
                    <p className="text-sm" style={{ color: '#607896' }}>No submissions yet.</p>
                  </div>
                ) : a.submissions.map((sub, si) => {
                  const isGraded = sub.status === 'GRADED' || saved.has(sub.id)
                  const g = grading[sub.id] ?? { marks: sub.marksObtained?.toString() ?? '', feedback: sub.feedback ?? '' }

                  return (
                    <div key={sub.id} className="px-5 py-4"
                      style={{ borderBottom: si < a.submissions.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none' }}>
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                          style={{ background: 'rgba(0,229,200,0.08)', color: '#00E5C8', border: '1px solid rgba(0,229,200,0.15)' }}>
                          {sub.student.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>{sub.student.fullName}</p>
                            <StatusBadge status={sub.status} />
                          </div>
                          <p className="text-xs mb-2" style={{ color: '#607896' }}>
                            Submitted {formatDate(sub.submittedAt)}
                          </p>
                          {sub.note && <p className="text-xs mb-2 italic" style={{ color: '#607896' }}>"{sub.note}"</p>}
                          {sub.fileUrl && (
                            <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg mb-3"
                              style={{ background: 'rgba(0,229,200,0.08)', color: '#00E5C8', border: '1px solid rgba(0,229,200,0.2)' }}>
                              <ExternalLink size={11} /> View Submission
                            </a>
                          )}

                          {/* Grade form */}
                          {!isGraded ? (
                            <div className="flex flex-wrap items-end gap-2 mt-2">
                              <div>
                                <label className="block text-[10px] font-semibold mb-1" style={{ color: '#607896' }}>
                                  Marks / {a.maxMarks}
                                </label>
                                <input type="number" min={0} max={a.maxMarks} step={0.5}
                                  value={g.marks}
                                  onChange={e => setGrading(prev => ({ ...prev, [sub.id]: { ...g, marks: e.target.value } }))}
                                  className="w-20 px-3 py-2 rounded-lg text-sm"
                                  style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.2)', color: '#E8F4FF', outline: 'none' }}
                                />
                              </div>
                              <div className="flex-1 min-w-40">
                                <label className="block text-[10px] font-semibold mb-1" style={{ color: '#607896' }}>Feedback</label>
                                <input type="text" placeholder="Write feedback..."
                                  value={g.feedback}
                                  onChange={e => setGrading(prev => ({ ...prev, [sub.id]: { ...g, feedback: e.target.value } }))}
                                  className="w-full px-3 py-2 rounded-lg text-sm"
                                  style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.15)', color: '#E8F4FF', outline: 'none' }}
                                />
                              </div>
                              <button onClick={() => handleGrade(sub.id, a.maxMarks)} disabled={saving === sub.id || !g.marks}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold"
                                style={{ background: g.marks ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.2)', color: g.marks ? '#020B18' : '#607896' }}>
                                {saving === sub.id ? '...' : <><CheckCircle2 size={12} /> Save Grade</>}
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 mt-2 p-2.5 rounded-xl"
                              style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.15)' }}>
                              <CheckCircle2 size={14} style={{ color: '#00E5C8' }} />
                              <span className="text-xs font-semibold" style={{ color: '#00E5C8' }}>
                                Graded: {sub.marksObtained ?? g.marks} / {a.maxMarks}
                              </span>
                              {(sub.feedback || g.feedback) && (
                                <span className="text-xs" style={{ color: '#607896' }}>· {sub.feedback || g.feedback}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
