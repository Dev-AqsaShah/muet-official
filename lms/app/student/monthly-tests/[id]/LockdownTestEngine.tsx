'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Flag, ChevronLeft, ChevronRight, Clock, CheckCircle2, Send, ShieldAlert, Maximize, AlertTriangle } from 'lucide-react'

interface Question { id: string; type: string; text: string; options: { id: string; text: string }[] | null; marks: number }
interface QuizMeta { id: string; title: string; instructions: string | null; duration: number; endAt: string }
interface Props { quiz: QuizMeta; studentId: string }

type Answer = { selectedOpts: string[] }
type Phase = 'rules' | 'starting' | 'active' | 'submitted' | 'error'

const VIOLATION_LIMIT = 3

export default function LockdownTestEngine({ quiz, studentId }: Props) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('rules')
  const [error, setError] = useState('')

  const [attemptId, setAttemptId] = useState('')
  const [startedAtMs, setStartedAtMs] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<{ [qId: string]: Answer }>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(0)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ score: number; total: number } | null>(null)

  const [violationCount, setViolationCount] = useState(0)
  const [flaggedForReview, setFlaggedForReview] = useState(false)
  const [toast, setToast] = useState('')
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false)
  const [showIssueModal, setShowIssueModal] = useState(false)
  const [issueReason, setIssueReason] = useState('')
  const [issueSent, setIssueSent] = useState(false)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500) }

  const logViolation = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/student/monthly-tests/${quiz.id}/violation`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId: id }),
      })
      const data = await res.json()
      setViolationCount(data.violationCount ?? 0)
      if ((data.violationCount ?? 0) >= VIOLATION_LIMIT) setFlaggedForReview(true)
    } catch { /* best-effort logging */ }
  }, [quiz.id])

  const startTest = async () => {
    setPhase('starting')
    // Fullscreen request must fire inside the click's call stack (before any await)
    document.documentElement.requestFullscreen?.().catch(() => {})
    try {
      const res = await fetch(`/api/student/monthly-tests/${quiz.id}/start`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Could not start test'); setPhase('error'); return }
      setAttemptId(data.attemptId)
      setStartedAtMs(new Date(data.startedAt).getTime())
      setQuestions(data.questions)
      setPhase('active')
    } catch {
      setError('Network error'); setPhase('error')
    }
  }

  const handleSubmit = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/student/monthly-tests/${quiz.id}/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, answers }),
      })
      const data = await res.json()
      setResult({ score: data.marksObtained ?? 0, total: data.totalMarks ?? questions.length })
      setPhase('submitted')
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    } catch {
      setError('Submit failed — check your connection and try again')
      setSubmitting(false)
    }
  }, [attemptId, answers, quiz.id, submitting, questions.length])

  /* Timer — recomputed from absolute server-anchored timestamps so it self-corrects after tab inactivity */
  useEffect(() => {
    if (phase !== 'active') return
    const deadlineMs = Math.min(startedAtMs + quiz.duration * 60 * 1000, new Date(quiz.endAt).getTime())
    const tick = () => {
      const remaining = Math.max(0, Math.floor((deadlineMs - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining <= 0) handleSubmit()
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [phase, startedAtMs, quiz.duration, quiz.endAt, handleSubmit])

  /* Anti-cheat listeners — active only during the test */
  useEffect(() => {
    if (phase !== 'active') return

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        logViolation(attemptId)
        showToast('Fullscreen exited — this has been recorded.')
        setShowFullscreenPrompt(true)
      } else {
        setShowFullscreenPrompt(false)
      }
    }
    const onVisibilityOrBlur = () => {
      if (document.hidden) {
        logViolation(attemptId)
        showToast('Tab change detected — this has been recorded.')
      }
    }
    const onContextMenu = (e: Event) => e.preventDefault()
    const onCopyCut = (e: Event) => e.preventDefault()
    const onBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = '' }
    const onPopState = () => {
      history.pushState(null, '', window.location.href)
      showToast('Test in progress — you cannot navigate away.')
    }

    history.pushState(null, '', window.location.href)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('visibilitychange', onVisibilityOrBlur)
    window.addEventListener('blur', onVisibilityOrBlur)
    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('copy', onCopyCut)
    document.addEventListener('cut', onCopyCut)
    window.addEventListener('beforeunload', onBeforeUnload)
    window.addEventListener('popstate', onPopState)

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      document.removeEventListener('visibilitychange', onVisibilityOrBlur)
      window.removeEventListener('blur', onVisibilityOrBlur)
      document.removeEventListener('contextmenu', onContextMenu)
      document.removeEventListener('copy', onCopyCut)
      document.removeEventListener('cut', onCopyCut)
      window.removeEventListener('beforeunload', onBeforeUnload)
      window.removeEventListener('popstate', onPopState)
    }
  }, [phase, attemptId, logViolation])

  const submitIssue = async () => {
    if (!issueReason.trim()) return
    try {
      await fetch(`/api/student/monthly-tests/${quiz.id}/report-issue`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, attemptId: attemptId || null, reason: issueReason.trim() }),
      })
      setIssueSent(true)
    } catch { /* show generic confirmation regardless */ setIssueSent(true) }
  }

  /* ---------- Rules screen ---------- */
  if (phase === 'rules' || phase === 'starting' || phase === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#020B18' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>
          <ShieldAlert size={40} className="mb-4" style={{ color: '#FBBF24' }} />
          <h1 className="font-display font-bold text-xl mb-2" style={{ color: '#E8F4FF' }}>{quiz.title}</h1>
          <p className="text-sm mb-4" style={{ color: '#607896' }}>{quiz.instructions}</p>
          <ul className="text-xs space-y-1.5 mb-6" style={{ color: '#8aa2c0' }}>
            <li>• Duration: {quiz.duration} minutes — the timer starts the moment you click Start.</li>
            <li>• The test runs in fullscreen. Exiting fullscreen or switching tabs is logged.</li>
            <li>• You can't navigate to any other page once the test begins.</li>
            <li>• If something goes wrong, use "Report an Issue" inside the test — an admin will review it.</li>
          </ul>
          {error && <p className="text-sm mb-4" style={{ color: '#EF4444' }}>{error}</p>}
          <button onClick={startTest} disabled={phase === 'starting'}
            className="w-full py-3.5 rounded-xl font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
            {phase === 'starting' ? 'Starting...' : 'Start Test'}
          </button>
        </motion.div>
      </div>
    )
  }

  /* ---------- Result screen ---------- */
  if (phase === 'submitted' && result) {
    const pct = Math.round((result.score / Math.max(result.total, 1)) * 100)
    const pass = result.score >= result.total * 0.5
    const color = pct >= 80 ? '#00E5C8' : pct >= 50 ? '#FBBF24' : '#EF4444'
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#020B18' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4 rounded-2xl p-10 text-center"
          style={{ background: '#061224', border: `1px solid ${color}30` }}>
          {pass ? <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color }} /> : <span className="text-5xl block mb-4">😔</span>}
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: '#E8F4FF' }}>Test Submitted</h2>
          <p className="text-5xl font-display font-bold mb-2" style={{ color, textShadow: `0 0 24px ${color}50` }}>{pct}%</p>
          <p className="text-sm mb-6" style={{ color: '#607896' }}>{result.score} / {result.total} marks</p>
          <button onClick={() => router.push('/student/monthly-tests')}
            className="px-8 py-3 rounded-xl font-bold text-sm"
            style={{ background: `linear-gradient(135deg, ${color}, #38BDF8)`, color: '#020B18' }}>
            Back to Monthly Tests
          </button>
        </motion.div>
      </div>
    )
  }

  /* ---------- Active test ---------- */
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isRed = timeLeft < 60
  const q = questions[current]
  const ans = q ? (answers[q.id] ?? { selectedOpts: [] }) : { selectedOpts: [] }
  const answered = Object.keys(answers).filter(id => (answers[id]?.selectedOpts.length ?? 0) > 0)

  const toggleOpt = (optId: string) => {
    setAnswers(prev => ({ ...prev, [q.id]: { selectedOpts: [optId] } }))
  }
  const toggleFlag = () => setFlagged(s => { const n = new Set(s); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n })

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#020B18' }} onContextMenu={e => e.preventDefault()}>
      {showFullscreenPrompt && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center" style={{ background: 'rgba(2,11,24,0.92)' }}>
          <div className="text-center">
            <Maximize size={32} className="mx-auto mb-3" style={{ color: '#FBBF24' }} />
            <p className="text-sm mb-4" style={{ color: '#E8F4FF' }}>You exited fullscreen. Re-enter to continue the test.</p>
            <button onClick={() => document.documentElement.requestFullscreen?.().catch(() => {})}
              className="px-6 py-2.5 rounded-xl font-bold text-sm" style={{ background: '#FBBF24', color: '#020B18' }}>
              Re-enter Fullscreen
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-4 right-4 z-[250] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
          style={{ background: '#061224', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}>
          <AlertTriangle size={13} /> {toast}
        </div>
      )}

      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(2,11,24,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,229,200,0.12)' }}>
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-sm truncate max-w-xs" style={{ color: '#E8F4FF' }}>{quiz.title}</span>
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,229,200,0.08)', color: '#00E5C8' }}>
            Q{current + 1}/{questions.length}
          </span>
          {flaggedForReview && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>
              FLAGGED FOR REVIEW
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowIssueModal(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: 'rgba(96,120,150,0.1)', color: '#607896' }}>
            Report an Issue
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display font-bold text-sm"
            style={{ background: isRed ? 'rgba(239,68,68,0.12)' : 'rgba(0,229,200,0.08)', color: isRed ? '#EF4444' : '#00E5C8' }}>
            <Clock size={14} /> {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
          </div>
          <button onClick={() => setShowConfirm(true)} disabled={submitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
            <Send size={13} /> Submit
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:flex flex-col w-64 p-4 gap-2 overflow-y-auto shrink-0"
          style={{ background: '#061224', borderRight: '1px solid rgba(0,229,200,0.08)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#607896' }}>
            Questions · {answered.length}/{questions.length} answered
          </p>
          <div className="grid grid-cols-5 gap-1.5">
            {questions.map((q2, i) => {
              const isAns = (answers[q2.id]?.selectedOpts.length ?? 0) > 0
              const isCur = i === current
              return (
                <button key={q2.id} onClick={() => setCurrent(i)}
                  className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center"
                  style={{
                    background: isCur ? 'rgba(0,229,200,0.2)' : isAns ? 'rgba(0,229,200,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isCur ? '#00E5C8' : isAns ? 'rgba(0,229,200,0.25)' : 'rgba(0,229,200,0.06)'}`,
                    color: isCur ? '#00E5C8' : isAns ? '#00E5C8' : '#607896',
                  }}>
                  {i + 1}
                </button>
              )
            })}
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-y-auto">
          <AnimatePresence mode="wait">
            {q && (
              <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }} className="flex-1 p-6 lg:p-10 max-w-3xl w-full mx-auto">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <p className="text-xs font-semibold mb-2" style={{ color: '#607896' }}>Question {current + 1} · {q.marks} mark{q.marks > 1 ? 's' : ''}</p>
                    <p className="text-base leading-relaxed" style={{ color: '#E8F4FF' }}>{q.text}</p>
                  </div>
                  <button onClick={toggleFlag} className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: flagged.has(q.id) ? 'rgba(251,191,36,0.12)' : 'rgba(0,229,200,0.06)', color: flagged.has(q.id) ? '#FBBF24' : '#607896' }}>
                    <Flag size={14} />
                  </button>
                </div>

                {q.options && (
                  <div className="space-y-2.5">
                    {q.options.map(opt => {
                      const selected = ans.selectedOpts.includes(opt.id)
                      return (
                        <button key={opt.id} onClick={() => toggleOpt(opt.id)}
                          className="w-full text-left px-4 py-3.5 rounded-xl text-sm"
                          style={{ background: selected ? 'rgba(0,229,200,0.08)' : 'rgba(6,18,36,1)', border: `1px solid ${selected ? '#00E5C8' : 'rgba(0,229,200,0.1)'}`, color: selected ? '#00E5C8' : '#E8F4FF' }}>
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

                <div className="flex items-center justify-between mt-8">
                  <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: 'rgba(0,229,200,0.06)', color: current === 0 ? '#607896' : '#E8F4FF', opacity: current === 0 ? 0.4 : 1 }}>
                    <ChevronLeft size={15} /> Previous
                  </button>
                  <span className="text-xs" style={{ color: '#607896' }}>{answered.length} of {questions.length} answered</span>
                  <button onClick={() => current < questions.length - 1 ? setCurrent(c => c + 1) : setShowConfirm(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                    {current < questions.length - 1 ? <>Next <ChevronRight size={15} /></> : <><Send size={13} /> Submit</>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(2,11,24,0.85)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm w-full mx-4 rounded-2xl p-8 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.2)' }}>
            <Send size={40} className="mx-auto mb-4" style={{ color: '#00E5C8' }} />
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#E8F4FF' }}>Submit Test?</h3>
            <p className="text-sm mb-6" style={{ color: '#607896' }}>
              {answered.length} of {questions.length} answered.{' '}
              {questions.length - answered.length > 0 ? `${questions.length - answered.length} unanswered.` : 'All answered!'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(96,120,150,0.1)', color: '#607896' }}>Continue</button>
              <button onClick={() => { setShowConfirm(false); handleSubmit() }} disabled={submitting}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                {submitting ? '...' : 'Yes, Submit'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showIssueModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(2,11,24,0.85)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm w-full mx-4 rounded-2xl p-8" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.2)' }}>
            {issueSent ? (
              <>
                <CheckCircle2 size={36} className="mx-auto mb-3" style={{ color: '#00E5C8' }} />
                <p className="text-sm text-center mb-6" style={{ color: '#E8F4FF' }}>Reported. An admin will review this and may grant a retake. Keep answering your test in the meantime.</p>
                <button onClick={() => { setShowIssueModal(false); setIssueSent(false); setIssueReason('') }}
                  className="w-full py-2.5 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                  Close
                </button>
              </>
            ) : (
              <>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#E8F4FF' }}>Report an Issue</h3>
                <p className="text-xs mb-3" style={{ color: '#607896' }}>Describe the problem — an admin will review and can approve a retake if needed.</p>
                <textarea value={issueReason} onChange={e => setIssueReason(e.target.value)} rows={4}
                  placeholder="e.g. My internet disconnected and the page reloaded..."
                  className="w-full p-3 rounded-xl text-sm mb-4" style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.15)', color: '#E8F4FF', outline: 'none' }} />
                <div className="flex gap-3">
                  <button onClick={() => setShowIssueModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: 'rgba(96,120,150,0.1)', color: '#607896' }}>Cancel</button>
                  <button onClick={submitIssue} disabled={!issueReason.trim()} className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #FBBF24, #F59E0B)', color: '#020B18' }}>Submit Report</button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
