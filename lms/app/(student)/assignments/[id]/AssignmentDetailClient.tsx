'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Upload, CheckCircle2, Clock, Download, ExternalLink, FileText, Award } from 'lucide-react'
import { formatDate, timeUntil } from '@/lib/utils'

interface Assignment {
  id: string; title: string; description: string; type: string; maxMarks: number
  weightage: number; dueDate: string; allowLate: boolean; attachmentUrl: string | null; instructorName: string
}
interface Submission {
  id: string; status: string; fileUrl: string | null; note: string | null
  marksObtained: number | null; feedback: string | null; submittedAt: string; gradedAt: string | null
}
interface Props { studentId: string; assignment: Assignment; submission: Submission | null }

const TYPE_LABEL: { [k: string]: string } = {
  WEEKLY_PROJECT: 'Weekly Project', LAB_ASSIGNMENT: 'Lab Assignment', FINAL_PROJECT: 'Final Project',
}

export default function AssignmentDetailClient({ studentId, assignment, submission }: Props) {
  const [note, setNote]         = useState('')
  const [fileUrl, setFileUrl]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(!!submission)
  const [sub, setSub]           = useState<Submission | null>(submission)
  const [error, setError]       = useState('')

  const isOverdue  = new Date(assignment.dueDate) < new Date()
  const canSubmit  = !isOverdue || assignment.allowLate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!note && !fileUrl) { setError('Please add a file URL or a note.'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch(`/api/students/assignments/${assignment.id}/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, note, fileUrl: fileUrl || null }),
      })
      if (!res.ok) { setError((await res.json()).error ?? 'Submission failed'); setLoading(false); return }
      const { submission: s } = await res.json()
      setSub(s); setDone(true)
    } catch { setError('Network error') }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', background: '#020B18', border: '1px solid rgba(0,229,200,0.15)',
    borderRadius: '10px', padding: '10px 14px', color: '#E8F4FF', fontSize: '13px', outline: 'none',
  }

  const scoreColor = (sub?.marksObtained ?? 0) / assignment.maxMarks >= 0.8 ? '#00E5C8'
    : (sub?.marksObtained ?? 0) / assignment.maxMarks >= 0.5 ? '#FBBF24' : '#EF4444'

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/assignments" className="flex items-center gap-1.5 text-sm mb-4 transition-colors"
          style={{ color: '#607896' }}
          onMouseEnter={e => (e.currentTarget.style.color='#00E5C8')} onMouseLeave={e => (e.currentTarget.style.color='#607896')}>
          <ArrowLeft size={14} /> Back to Assignments
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
            style={{ background: 'rgba(0,229,200,0.08)', color: '#00E5C8', border: '1px solid rgba(0,229,200,0.2)' }}>
            {TYPE_LABEL[assignment.type] ?? assignment.type}
          </span>
          {isOverdue && !sub && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ background: 'rgba(239,68,68,0.08)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
              Overdue
            </span>
          )}
        </div>
        <h1 className="font-display font-bold text-2xl" style={{ color: '#E8F4FF' }}>{assignment.title}</h1>
        <p className="text-sm mt-1" style={{ color: '#607896' }}>
          by {assignment.instructorName} · {assignment.maxMarks} marks · {assignment.weightage}% of grade
        </p>
      </motion.div>

      {/* Details card */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="flex items-center gap-4 mb-4 text-sm flex-wrap" style={{ color: '#607896' }}>
          <span className="flex items-center gap-1.5">
            <Clock size={13} style={{ color: '#FBBF24' }} />
            Due: {formatDate(assignment.dueDate)}
            {!isOverdue && ` (${timeUntil(assignment.dueDate)})`}
          </span>
          {assignment.allowLate && <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(251,191,36,0.08)', color: '#FBBF24' }}>Late submissions allowed</span>}
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(232,244,255,0.7)' }}>{assignment.description}</p>
        {assignment.attachmentUrl && (
          <a href={assignment.attachmentUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
            <Download size={13} /> Download Attachment / Rubric
          </a>
        )}
      </motion.div>

      {/* Graded result */}
      {sub?.status === 'GRADED' && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: `1px solid ${scoreColor}30` }}>
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
            <Award size={16} style={{ color: scoreColor }} /> Your Result
          </h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-center">
              <p className="font-display font-bold text-4xl" style={{ color: scoreColor, textShadow: `0 0 20px ${scoreColor}50` }}>
                {sub.marksObtained?.toFixed(1)}
              </p>
              <p className="text-xs mt-1" style={{ color: '#607896' }}>out of {assignment.maxMarks}</p>
            </div>
            <div className="flex-1">
              <div className="h-2 rounded-full mb-1.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${((sub.marksObtained ?? 0) / assignment.maxMarks) * 100}%`, background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}88)` }} />
              </div>
              <p className="text-xs" style={{ color: '#607896' }}>
                {(((sub.marksObtained ?? 0) / assignment.maxMarks) * 100).toFixed(0)}% · Graded {sub.gradedAt ? formatDate(sub.gradedAt) : ''}
              </p>
            </div>
          </div>
          {sub.feedback && (
            <div className="p-4 rounded-xl" style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.15)' }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: '#818CF8' }}>Instructor Feedback</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,244,255,0.7)' }}>{sub.feedback}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Submission area */}
      {sub && sub.status !== 'GRADED' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 size={20} style={{ color: '#00E5C8' }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>Submitted successfully</p>
              <p className="text-xs" style={{ color: '#607896' }}>Submitted {formatDate(sub.submittedAt)} · Awaiting grade</p>
            </div>
          </div>
          {sub.fileUrl && (
            <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(0,229,200,0.08)', color: '#00E5C8', border: '1px solid rgba(0,229,200,0.2)' }}>
              <ExternalLink size={11} /> View submitted file
            </a>
          )}
          {sub.note && <p className="text-xs mt-3" style={{ color: '#607896' }}>Note: {sub.note}</p>}
        </motion.div>
      ) : !sub && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
            <Upload size={15} style={{ color: '#00E5C8' }} /> Submit Assignment
          </h2>
          {!canSubmit ? (
            <div className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p className="text-sm" style={{ color: '#EF4444' }}>The deadline has passed and late submissions are not allowed for this assignment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isOverdue && (
                <div className="p-3 rounded-xl text-xs" style={{ background: 'rgba(239,68,68,0.06)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.15)' }}>
                  ⚠ This assignment is overdue. Late submission is allowed but may affect your grade.
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>
                  File URL (upload to Google Drive/Dropbox/Cloudinary first)
                </label>
                <input type="url" value={fileUrl} onChange={e => setFileUrl(e.target.value)}
                  placeholder="https://drive.google.com/..." style={inputStyle}
                  onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>
                  Note / Comments (optional)
                </label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  placeholder="Any notes for the instructor..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
              </div>
              {error && <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
                style={{ background: !loading ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.2)', color: !loading ? '#020B18' : '#607896' }}>
                {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <><Upload size={15} /> Submit Assignment</>}
              </button>
            </form>
          )}
        </motion.div>
      )}
    </div>
  )
}
