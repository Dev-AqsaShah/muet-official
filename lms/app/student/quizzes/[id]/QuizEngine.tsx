'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Flag, ChevronLeft, ChevronRight, Clock, CheckCircle2, Send } from 'lucide-react'

interface Question {
  id: string; type: string; text: string
  options: { id: string; text: string }[] | null; marks: number
}
interface Props {
  quiz: { id: string; title: string; instructions: string | null; duration: number; totalMarks: number; shuffleOpts: boolean; endAt: string }
  questions: Question[]
  attemptId: string
  studentId: string
}

type Answer = { selectedOpts: string[]; textAnswer: string }

export default function QuizEngine({ quiz, questions, attemptId, studentId }: Props) {
  const router = useRouter()
  const startTime = Date.now()

  const deadlineSecs = Math.floor((new Date(quiz.endAt).getTime() - Date.now()) / 1000)
  const durationSecs = quiz.duration * 60
  const initialSecs  = Math.min(durationSecs, deadlineSecs)

  const [current, setCurrent]       = useState(0)
  const [answers, setAnswers]       = useState<{ [qId: string]: Answer }>({})
  const [flagged, setFlagged]       = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft]     = useState(initialSecs)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [result, setResult]         = useState<{ score: number; total: number } | null>(null)

  const handleSubmit = useCallback(async (auto = false) => {
    if (submitting || submitted) return
    setSubmitting(true)
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    try {
      const res = await fetch(`/api/student/quizzes/${quiz.id}/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, studentId, answers, timeTaken }),
      })
      const data = await res.json()
      setResult({ score: data.marksObtained ?? 0, total: quiz.totalMarks })
      setSubmitted(true)
    } catch { setSubmitting(false) }
  }, [answers, attemptId, quiz.id, quiz.totalMarks, startTime, studentId, submitting, submitted])

  /* Timer */
  useEffect(() => {
    if (submitted) return
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) { clearInterval(t); handleSubmit(true); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [handleSubmit, submitted])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isRed = timeLeft < 60

  const q = questions[current]
  const ans = answers[q.id] ?? { selectedOpts: [], textAnswer: '' }

  const toggleOpt = (optId: string, multi = false) => {
    setAnswers(prev => {
      const cur = prev[q.id] ?? { selectedOpts: [], textAnswer: '' }
      let opts = multi
        ? cur.selectedOpts.includes(optId) ? cur.selectedOpts.filter(o => o !== optId) : [...cur.selectedOpts, optId]
        : [optId]
      return { ...prev, [q.id]: { ...cur, selectedOpts: opts } }
    })
  }

  const toggleFlag = () => setFlagged(s => { const n = new Set(s); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n })

  const answered   = Object.keys(answers).filter(id => {
    const a = answers[id]
    return a.selectedOpts.length > 0 || a.textAnswer.trim().length > 0
  })

  /* Result screen */
  if (submitted && result) {
    const pct = Math.round((result.score / result.total) * 100)
    const pass = result.score >= result.total * 0.5
    const color = pct >= 80 ? '#00E5C8' : pct >= 50 ? '#FBBF24' : '#EF4444'
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#020B18' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4 rounded-2xl p-10 text-center"
          style={{ background: '#061224', border: `1px solid ${color}30` }}>
          {pass
            ? <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color }} />
            : <span className="text-5xl block mb-4">😔</span>}
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: '#E8F4FF' }}>
            {pass ? 'Well Done!' : 'Quiz Completed'}
          </h2>
          <p className="text-5xl font-display font-bold mb-2" style={{ color, textShadow: `0 0 24px ${color}50` }}>
            {pct}%
          </p>
          <p className="text-sm mb-6" style={{ color: '#607896' }}>
            {result.score.toFixed(1)} / {result.total} marks
          </p>
          <button onClick={() => router.push('/student/quizzes')}
            className="px-8 py-3 rounded-xl font-bold text-sm"
            style={{ background: `linear-gradient(135deg, ${color}, #38BDF8)`, color: '#020B18' }}>
            Back to Quizzes
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#020B18' }}>
      {/* Full-screen top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(2,11,24,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,229,200,0.12)' }}>
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-sm truncate max-w-xs" style={{ color: '#E8F4FF' }}>{quiz.title}</span>
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,229,200,0.08)', color: '#00E5C8' }}>
            Q{current + 1}/{questions.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display font-bold text-sm"
            style={{
              background: isRed ? 'rgba(239,68,68,0.12)' : 'rgba(0,229,200,0.08)',
              border: `1px solid ${isRed ? 'rgba(239,68,68,0.3)' : 'rgba(0,229,200,0.2)'}`,
              color: isRed ? '#EF4444' : '#00E5C8',
              animation: isRed ? 'blink 0.8s infinite' : 'none',
            }}>
            <Clock size={14} />
            {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
          </div>
          <button onClick={() => setShowConfirm(true)} disabled={submitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
            <Send size={13} /> Submit
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Question nav panel */}
        <aside className="hidden lg:flex flex-col w-64 p-4 gap-2 overflow-y-auto shrink-0"
          style={{ background: '#061224', borderRight: '1px solid rgba(0,229,200,0.08)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#607896' }}>
            Questions · {answered.length}/{questions.length} answered
          </p>
          <div className="grid grid-cols-5 gap-1.5">
            {questions.map((q2, i) => {
              const a2 = answers[q2.id]
              const isAns = a2?.selectedOpts.length > 0 || a2?.textAnswer?.trim().length > 0
              const isFlagged = flagged.has(q2.id)
              const isCur = i === current
              return (
                <button key={q2.id} onClick={() => setCurrent(i)}
                  className="w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center"
                  style={{
                    background: isCur ? 'rgba(0,229,200,0.2)' : isAns ? 'rgba(0,229,200,0.08)' : isFlagged ? 'rgba(251,191,36,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isCur ? '#00E5C8' : isAns ? 'rgba(0,229,200,0.25)' : isFlagged ? 'rgba(251,191,36,0.25)' : 'rgba(0,229,200,0.06)'}`,
                    color: isCur ? '#00E5C8' : isAns ? '#00E5C8' : isFlagged ? '#FBBF24' : '#607896',
                  }}>
                  {i + 1}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Main question area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 p-6 lg:p-10 max-w-3xl w-full mx-auto">

              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-2" style={{ color: '#607896' }}>
                    Question {current + 1} · {q.marks} mark{q.marks > 1 ? 's' : ''} · {q.type.replace('_',' ')}
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: '#E8F4FF' }}>{q.text}</p>
                </div>
                <button onClick={toggleFlag}
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all"
                  style={{ background: flagged.has(q.id) ? 'rgba(251,191,36,0.12)' : 'rgba(0,229,200,0.06)', border: `1px solid ${flagged.has(q.id) ? 'rgba(251,191,36,0.3)' : 'rgba(0,229,200,0.12)'}`, color: flagged.has(q.id) ? '#FBBF24' : '#607896' }}>
                  <Flag size={14} />
                </button>
              </div>

              {/* MCQ options */}
              {(q.type === 'MCQ' || q.type === 'TRUE_FALSE') && q.options && (
                <div className="space-y-2.5">
                  {q.options.map(opt => {
                    const selected = ans.selectedOpts.includes(opt.id)
                    return (
                      <button key={opt.id} onClick={() => toggleOpt(opt.id, q.type === 'MCQ')}
                        className="w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all"
                        style={{
                          background: selected ? 'rgba(0,229,200,0.08)' : 'rgba(6,18,36,1)',
                          border: `1px solid ${selected ? '#00E5C8' : 'rgba(0,229,200,0.1)'}`,
                          color: selected ? '#00E5C8' : '#E8F4FF',
                          boxShadow: selected ? '0 0 16px rgba(0,229,200,0.1)' : 'none',
                        }}>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ border: `2px solid ${selected ? '#00E5C8' : 'rgba(0,229,200,0.2)'}`, background: selected ? '#00E5C8' : 'transparent' }}>
                            {selected && <div className="w-2 h-2 rounded-full" style={{ background: '#020B18' }} />}
                          </div>
                          {opt.text}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Short answer */}
              {q.type === 'SHORT_ANSWER' && (
                <textarea
                  value={ans.textAnswer}
                  onChange={e => setAnswers(prev => ({ ...prev, [q.id]: { ...(prev[q.id] ?? { selectedOpts: [] }), textAnswer: e.target.value } }))}
                  rows={5} placeholder="Type your answer here..."
                  className="w-full resize-none text-sm p-4 rounded-xl"
                  style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)', color: '#E8F4FF', outline: 'none' }}
                  onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}
                />
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: current === 0 ? '#607896' : '#E8F4FF', opacity: current === 0 ? 0.4 : 1 }}>
                  <ChevronLeft size={15} /> Previous
                </button>
                <span className="text-xs" style={{ color: '#607896' }}>
                  {answered.length} of {questions.length} answered
                </span>
                <button onClick={() => current < questions.length - 1 ? setCurrent(c => c + 1) : setShowConfirm(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                  {current < questions.length - 1 ? <><>Next</> <ChevronRight size={15} /></> : <><Send size={13} /> Submit</>}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(2,11,24,0.85)', backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm w-full mx-4 rounded-2xl p-8 text-center"
            style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.2)' }}>
            <Send size={40} className="mx-auto mb-4" style={{ color: '#00E5C8' }} />
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#E8F4FF' }}>Submit Quiz?</h3>
            <p className="text-sm mb-6" style={{ color: '#607896' }}>
              {answered.length} of {questions.length} questions answered.{' '}
              {questions.length - answered.length > 0 ? `${questions.length - answered.length} unanswered.` : 'All answered!'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(96,120,150,0.1)', border: '1px solid rgba(96,120,150,0.2)', color: '#607896' }}>
                Continue Quiz
              </button>
              <button onClick={() => { setShowConfirm(false); handleSubmit(false) }} disabled={submitting}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                {submitting ? '...' : 'Yes, Submit'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
