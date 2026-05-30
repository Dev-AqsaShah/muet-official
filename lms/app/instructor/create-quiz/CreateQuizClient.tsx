'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'

interface Batch { id: string; batchNumber: string; course: string }
interface Props { instructorId: string; batch: Batch | null }

type QType = 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER'
interface Option { id: string; text: string; isCorrect: boolean }
interface Question { id: string; type: QType; text: string; options: Option[]; correctAnswer: string; explanation: string; marks: number }

const makeId = () => Math.random().toString(36).slice(2, 9)

const defaultQuestion = (): Question => ({
  id: makeId(), type: 'MCQ', text: '',
  options: [{ id: makeId(), text: '', isCorrect: true }, { id: makeId(), text: '', isCorrect: false }, { id: makeId(), text: '', isCorrect: false }, { id: makeId(), text: '', isCorrect: false }],
  correctAnswer: '', explanation: '', marks: 1,
})

export default function CreateQuizClient({ instructorId, batch }: Props) {
  const [title, setTitle]         = useState('')
  const [instructions, setInstr]  = useState('')
  const [duration, setDuration]   = useState(30)
  const [totalMarks, setTotal]    = useState(10)
  const [weightage, setWeightage] = useState(30)
  const [shuffleQ, setShuffleQ]   = useState(true)
  const [shuffleOpts, setShufOpts]= useState(true)
  const [maxAttempts, setMaxAtt]  = useState(1)
  const [startAt, setStartAt]     = useState('')
  const [endAt, setEndAt]         = useState('')
  const [draft, setDraft]         = useState(false)
  const [questions, setQuestions] = useState<Question[]>([defaultQuestion()])
  const [openQ, setOpenQ]         = useState<string | null>(questions[0].id)
  const [loading, setLoading]     = useState(false)
  const [done, setDone]           = useState(false)
  const [error, setError]         = useState('')

  const setQ = (id: string, upd: Partial<Question>) =>
    setQuestions(qs => qs.map(q => q.id === id ? { ...q, ...upd } : q))

  const addQ = () => {
    const nq = defaultQuestion()
    setQuestions(qs => [...qs, nq])
    setOpenQ(nq.id)
  }

  const removeQ = (id: string) => setQuestions(qs => qs.filter(q => q.id !== id))

  const setOption = (qId: string, oId: string, text: string) =>
    setQ(qId, { options: questions.find(q => q.id === qId)!.options.map(o => o.id === oId ? { ...o, text } : o) })

  const setCorrect = (qId: string, oId: string, multi = false) => {
    const q = questions.find(q => q.id === qId)!
    const opts = multi
      ? q.options.map(o => o.id === oId ? { ...o, isCorrect: !o.isCorrect } : o)
      : q.options.map(o => ({ ...o, isCorrect: o.id === oId }))
    setQ(qId, { options: opts })
  }

  const handleSubmit = async () => {
    if (!batch || !title || !startAt || !endAt || questions.some(q => !q.text)) {
      setError('Fill in all required fields and at least one question.'); return
    }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/instructor/quizzes', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId: batch.id, instructorId, title, instructions, duration, totalMarks, weightage,
          shuffleQ, shuffleOpts, maxAttempts, startAt, endAt, published: !draft,
          questions: questions.map((q, i) => ({
            type: q.type, text: q.text, marks: q.marks, order: i + 1,
            options: (q.type === 'MCQ' || q.type === 'TRUE_FALSE') ? q.options : null,
            correctAnswer: q.type === 'SHORT_ANSWER' ? q.correctAnswer : null,
            explanation: q.explanation || null,
          })),
        }),
      })
      if (!res.ok) { setError((await res.json()).error ?? 'Failed'); setLoading(false); return }
      setDone(true)
    } catch { setError('Network error') }
    setLoading(false)
  }

  if (!batch) return (
    <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
      <p className="text-sm" style={{ color: '#607896' }}>No batch assigned yet.</p>
    </div>
  )

  if (done) return (
    <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>
      <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: '#00E5C8' }} />
      <h2 className="font-display font-bold text-xl mb-2" style={{ color: '#E8F4FF' }}>Quiz Created!</h2>
      <p className="text-sm mb-6" style={{ color: '#607896' }}>
        "{title}" with {questions.length} questions. {draft ? 'Saved as draft.' : 'Published to students.'}
      </p>
      <button onClick={() => { setDone(false); setTitle(''); setQuestions([defaultQuestion()]) }}
        className="px-6 py-3 rounded-xl font-bold text-sm"
        style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
        Create Another
      </button>
    </div>
  )

  const inputStyle = { background: '#020B18', border: '1px solid rgba(0,229,200,0.15)', borderRadius: '10px', padding: '9px 12px', color: '#E8F4FF', fontSize: '13px', outline: 'none' }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Create Quiz</h1>
        <p className="text-sm" style={{ color: '#607896' }}>Batch {batch.batchNumber} — {batch.course}</p>
      </motion.div>

      {/* Quiz settings */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-6 space-y-4" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>Quiz Settings</h2>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Quiz Title *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Week 3 — HTML/CSS Quiz"
            style={{ ...inputStyle, width: '100%' }}
            onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Instructions (optional)</label>
          <textarea value={instructions} onChange={e => setInstr(e.target.value)} rows={2}
            placeholder="Rules or notes for students..."
            style={{ ...inputStyle, width: '100%', resize: 'none' }}
            onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Duration (minutes)', val: duration, set: (v: number) => setDuration(v) },
            { label: 'Total Marks', val: totalMarks, set: (v: number) => setTotal(v) },
            { label: 'Grade Weightage (%)', val: weightage, set: (v: number) => setWeightage(v) },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>{label}</label>
              <input type="number" min={1} value={val} onChange={e => set(parseInt(e.target.value) || 1)}
                style={{ ...inputStyle, width: '100%' }}
                onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Start Date & Time *</label>
            <input type="datetime-local" value={startAt} onChange={e => setStartAt(e.target.value)}
              style={{ ...inputStyle, width: '100%' }}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>End Date & Time *</label>
            <input type="datetime-local" value={endAt} onChange={e => setEndAt(e.target.value)}
              style={{ ...inputStyle, width: '100%' }}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Max Attempts</label>
            <input type="number" min={1} max={3} value={maxAttempts} onChange={e => setMaxAtt(parseInt(e.target.value) || 1)}
              style={{ ...inputStyle, width: '100%' }}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            { label: 'Shuffle Questions', val: shuffleQ, set: setShuffleQ },
            { label: 'Shuffle Options',   val: shuffleOpts, set: setShufOpts },
          ].map(({ label, val, set }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer" style={{ color: '#607896' }}>
              <div onClick={() => set(!val)}
                className="w-9 h-5 rounded-full relative transition-all cursor-pointer"
                style={{ background: val ? '#00E5C8' : 'rgba(96,120,150,0.3)' }}>
                <div className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                  style={{ background: '#E8F4FF', left: val ? '18px' : '2px' }} />
              </div>
              {label}
            </label>
          ))}
        </div>
      </motion.div>

      {/* Questions builder */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>Questions ({questions.length})</h2>
          <button onClick={addQ}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
            <Plus size={13} /> Add Question
          </button>
        </div>

        {questions.map((q, qi) => {
          const isOpen = openQ === q.id
          const isTF   = q.type === 'TRUE_FALSE'
          if (isTF && q.options.length !== 2) {
            setQ(q.id, { options: [{ id: makeId(), text: 'True', isCorrect: true }, { id: makeId(), text: 'False', isCorrect: false }] })
          }

          return (
            <div key={q.id} className="rounded-2xl overflow-hidden"
              style={{ background: '#061224', border: `1px solid ${isOpen ? 'rgba(0,229,200,0.2)' : 'rgba(0,229,200,0.08)'}` }}>
              <div className="flex items-center justify-between px-4 py-3">
                <button onClick={() => setOpenQ(isOpen ? null : q.id)} className="flex items-center gap-3 flex-1 text-left">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: 'rgba(0,229,200,0.1)', color: '#00E5C8' }}>{qi + 1}</span>
                  <span className="text-sm truncate" style={{ color: q.text ? '#E8F4FF' : '#607896' }}>
                    {q.text || 'Enter question text...'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded shrink-0"
                    style={{ background: 'rgba(129,140,248,0.08)', color: '#818CF8' }}>{q.marks} mark{q.marks > 1 ? 's' : ''}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  {isOpen ? <ChevronUp size={14} style={{ color: '#607896' }} /> : <ChevronDown size={14} style={{ color: '#607896' }} />}
                  {questions.length > 1 && (
                    <button onClick={() => removeQ(q.id)} className="w-6 h-6 flex items-center justify-center rounded"
                      style={{ color: '#EF4444' }}>
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>

              {isOpen && (
                <div className="px-4 pb-5 space-y-3" style={{ borderTop: '1px solid rgba(0,229,200,0.06)' }}>
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div>
                      <label className="block text-[10px] font-semibold mb-1" style={{ color: '#607896' }}>Question Type</label>
                      <select value={q.type} onChange={e => setQ(q.id, { type: e.target.value as QType, options: e.target.value === 'TRUE_FALSE' ? [{ id: makeId(), text: 'True', isCorrect: true }, { id: makeId(), text: 'False', isCorrect: false }] : q.options })}
                        style={{ ...inputStyle, width: '100%' }}>
                        <option value="MCQ">MCQ</option>
                        <option value="TRUE_FALSE">True / False</option>
                        <option value="SHORT_ANSWER">Short Answer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold mb-1" style={{ color: '#607896' }}>Marks</label>
                      <input type="number" min={1} value={q.marks} onChange={e => setQ(q.id, { marks: parseInt(e.target.value) || 1 })}
                        style={{ ...inputStyle, width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold mb-1" style={{ color: '#607896' }}>Question Text *</label>
                    <textarea value={q.text} onChange={e => setQ(q.id, { text: e.target.value })} rows={2}
                      placeholder="Enter the question..."
                      style={{ ...inputStyle, width: '100%', resize: 'none' }}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                  </div>

                  {(q.type === 'MCQ' || q.type === 'TRUE_FALSE') && (
                    <div className="space-y-2">
                      <label className="block text-[10px] font-semibold" style={{ color: '#607896' }}>Options (click ✓ to mark correct)</label>
                      {q.options.map(opt => (
                        <div key={opt.id} className="flex items-center gap-2">
                          <button onClick={() => setCorrect(q.id, opt.id, q.type === 'MCQ')}
                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all"
                            style={{ background: opt.isCorrect ? '#00E5C8' : 'rgba(0,229,200,0.05)', border: `2px solid ${opt.isCorrect ? '#00E5C8' : 'rgba(0,229,200,0.2)'}` }}>
                            {opt.isCorrect && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#020B18' }} />}
                          </button>
                          {q.type === 'TRUE_FALSE' ? (
                            <span className="text-sm flex-1 px-3 py-2 rounded-lg"
                              style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.08)', color: '#E8F4FF' }}>{opt.text}</span>
                          ) : (
                            <input type="text" value={opt.text} onChange={e => setOption(q.id, opt.id, e.target.value)}
                              placeholder={`Option ${q.options.indexOf(opt) + 1}`}
                              className="flex-1" style={{ ...inputStyle }}
                              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                          )}
                        </div>
                      ))}
                      {q.type === 'MCQ' && q.options.length < 6 && (
                        <button onClick={() => setQ(q.id, { options: [...q.options, { id: makeId(), text: '', isCorrect: false }] })}
                          className="text-xs flex items-center gap-1" style={{ color: '#607896' }}>
                          <Plus size={11} /> Add option
                        </button>
                      )}
                    </div>
                  )}

                  {q.type === 'SHORT_ANSWER' && (
                    <div>
                      <label className="block text-[10px] font-semibold mb-1" style={{ color: '#607896' }}>Model Answer (for reference)</label>
                      <input type="text" value={q.correctAnswer} onChange={e => setQ(q.id, { correctAnswer: e.target.value })}
                        placeholder="Expected answer..."
                        style={{ ...inputStyle, width: '100%' }}
                        onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-semibold mb-1" style={{ color: '#607896' }}>Explanation (shown after quiz)</label>
                    <input type="text" value={q.explanation} onChange={e => setQ(q.id, { explanation: e.target.value })}
                      placeholder="Why this answer is correct..."
                      style={{ ...inputStyle, width: '100%' }}
                      onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {error && <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>}

      <div className="flex gap-3">
        <button onClick={() => { setDraft(true); handleSubmit() }} disabled={loading}
          className="flex-1 py-3 rounded-xl font-semibold text-sm"
          style={{ background: 'rgba(96,120,150,0.1)', border: '1px solid rgba(96,120,150,0.2)', color: '#607896' }}>
          Save as Draft
        </button>
        <button onClick={() => { setDraft(false); handleSubmit() }} disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18', boxShadow: '0 0 24px rgba(0,229,200,0.25)' }}>
          {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : 'Publish Quiz'}
        </button>
      </div>
    </div>
  )
}
