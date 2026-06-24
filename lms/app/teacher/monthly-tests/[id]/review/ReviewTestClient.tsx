'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Trash2, CheckCircle2, Rocket } from 'lucide-react'

interface Option { id: string; text: string; isCorrect: boolean }
interface Question { id: string; text: string; difficulty: string; approved: boolean; options: Option[] }
interface Quiz { id: string; title: string; published: boolean; reviewStatus: string; difficultyMix: { EASY: number; MEDIUM: number; HARD: number } | null }
interface Props { quiz: Quiz; questions: Question[] }

const diffColor: Record<string, string> = { EASY: '#00E5C8', MEDIUM: '#FBBF24', HARD: '#EF4444' }

export default function ReviewTestClient({ quiz, questions: initialQuestions }: Props) {
  const router = useRouter()
  const [questions, setQuestions] = useState(initialQuestions)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(quiz.published)

  const mix = quiz.difficultyMix ?? { EASY: 0, MEDIUM: 0, HARD: 0 }
  const approvedCounts = {
    EASY: questions.filter(q => q.approved && q.difficulty === 'EASY').length,
    MEDIUM: questions.filter(q => q.approved && q.difficulty === 'MEDIUM').length,
    HARD: questions.filter(q => q.approved && q.difficulty === 'HARD').length,
  }
  const ready = (['EASY', 'MEDIUM', 'HARD'] as const).every(d => approvedCounts[d] >= mix[d])

  const toggleApprove = async (q: Question) => {
    const approved = !q.approved
    setQuestions(qs => qs.map(x => x.id === q.id ? { ...x, approved } : x))
    await fetch(`/api/teacher/monthly-tests/${quiz.id}/questions/${q.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved }),
    })
  }

  const deleteQuestion = async (qId: string) => {
    setQuestions(qs => qs.filter(q => q.id !== qId))
    await fetch(`/api/teacher/monthly-tests/${quiz.id}/questions/${qId}`, { method: 'DELETE' })
  }

  const publish = async () => {
    setPublishing(true); setError('')
    try {
      const res = await fetch(`/api/teacher/monthly-tests/${quiz.id}/publish`, { method: 'PATCH' })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed to publish'); setPublishing(false); return }
      setDone(true)
    } catch {
      setError('Network error'); setPublishing(false)
    }
  }

  if (done) return (
    <div className="rounded-2xl p-10 text-center max-w-md mx-auto" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>
      <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: '#00E5C8' }} />
      <h2 className="font-display font-bold text-xl mb-2" style={{ color: '#E8F4FF' }}>Test Published!</h2>
      <p className="text-sm mb-6" style={{ color: '#607896' }}>
        "{quiz.title}" is now live for your students within the test window.
      </p>
      <button onClick={() => router.push('/teacher/monthly-tests')}
        className="px-6 py-3 rounded-xl font-bold text-sm"
        style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
        Back to Monthly Tests
      </button>
    </div>
  )

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Review Test Pool</h1>
        <p className="text-sm" style={{ color: '#607896' }}>"{quiz.title}" — approve enough questions in each difficulty before publishing.</p>
      </motion.div>

      <div className="rounded-2xl p-5 flex flex-wrap gap-4" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        {(['EASY', 'MEDIUM', 'HARD'] as const).map(d => (
          <div key={d} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: diffColor[d] }} />
            <span className="text-xs font-semibold" style={{ color: '#E8F4FF' }}>{d}</span>
            <span className="text-xs" style={{ color: approvedCounts[d] >= mix[d] ? '#00E5C8' : '#EF4444' }}>
              {approvedCounts[d]} / {mix[d]} approved
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <motion.div key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.4) }}
            className="rounded-2xl p-4" style={{ background: '#061224', border: `1px solid ${q.approved ? 'rgba(0,229,200,0.25)' : 'rgba(0,229,200,0.08)'}` }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded" style={{ background: `${diffColor[q.difficulty]}15`, color: diffColor[q.difficulty] }}>
                  {q.difficulty}
                </span>
                <p className="text-sm" style={{ color: '#E8F4FF' }}>{q.text}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => toggleApprove(q)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: q.approved ? '#00E5C8' : 'rgba(0,229,200,0.06)', color: q.approved ? '#020B18' : '#607896' }}>
                  <Check size={14} />
                </button>
                <button onClick={() => deleteQuestion(q.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: '#EF4444' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-1">
              {q.options.map(opt => (
                <div key={opt.id} className="text-xs px-3 py-2 rounded-lg"
                  style={{ background: opt.isCorrect ? 'rgba(0,229,200,0.08)' : '#020B18', border: `1px solid ${opt.isCorrect ? 'rgba(0,229,200,0.3)' : 'rgba(0,229,200,0.06)'}`, color: opt.isCorrect ? '#00E5C8' : '#8aa2c0' }}>
                  {opt.text}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {error && <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>}

      <button onClick={publish} disabled={!ready || publishing}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm"
        style={{
          background: ready ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.15)',
          color: ready ? '#020B18' : '#607896', opacity: publishing ? 0.7 : 1,
        }}>
        <Rocket size={15} /> {publishing ? 'Publishing...' : ready ? 'Publish Test to Students' : 'Approve more questions to publish'}
      </button>
    </div>
  )
}
