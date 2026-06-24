'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Loader2 } from 'lucide-react'

interface Batch { id: string; batchNumber: string; course: string }
interface Props { instructorId: string; batch: Batch | null }

const inputStyle = { background: '#020B18', border: '1px solid rgba(0,229,200,0.15)', borderRadius: '10px', padding: '9px 12px', color: '#E8F4FF', fontSize: '13px', outline: 'none' }

export default function CreateMonthlyTestClient({ instructorId, batch }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [topicBrief, setTopicBrief] = useState('')
  const [duration, setDuration] = useState(30)
  const [easyCount, setEasy] = useState(8)
  const [mediumCount, setMedium] = useState(8)
  const [hardCount, setHard] = useState(4)
  const [startAt, setStartAt] = useState('')
  const [endAt, setEndAt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const total = easyCount + mediumCount + hardCount

  const handleSubmit = async () => {
    if (!batch) return
    if (!title || !topicBrief || !startAt || !endAt || total < 1) {
      setError('Fill in all required fields — topic content is needed so the AI stays on-syllabus.')
      return
    }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/teacher/monthly-tests/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instructorId, batchId: batch.id, title, topicBrief, duration,
          startAt, endAt, easyCount, mediumCount, hardCount,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed to generate questions'); setLoading(false); return }
      router.push(`/teacher/monthly-tests/${data.quizId}/review`)
    } catch {
      setError('Network error'); setLoading(false)
    }
  }

  if (!batch) return (
    <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
      <p className="text-sm" style={{ color: '#607896' }}>No batch assigned yet.</p>
    </div>
  )

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Create Monthly Test</h1>
        <p className="text-sm" style={{ color: '#607896' }}>Batch {batch.batchNumber} — {batch.course}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-6 space-y-4" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Test Title *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. June Monthly Test — Web Development"
            style={{ ...inputStyle, width: '100%' }} />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>
            Topics / Content You Taught *
          </label>
          <p className="text-[11px] mb-1.5" style={{ color: '#607896' }}>
            The AI will only generate questions from what you describe here — be specific so the test matches your class.
          </p>
          <textarea value={topicBrief} onChange={e => setTopicBrief(e.target.value)} rows={5}
            placeholder="e.g. HTML structure & semantic tags, CSS flexbox and grid layout, basic responsive design with media queries..."
            style={{ ...inputStyle, width: '100%', resize: 'none' }} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Duration (minutes)</label>
            <input type="number" min={5} value={duration} onChange={e => setDuration(parseInt(e.target.value) || 30)}
              style={{ ...inputStyle, width: '100%' }} />
          </div>
          <div />
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Opens At *</label>
            <input type="datetime-local" value={startAt} onChange={e => setStartAt(e.target.value)}
              style={{ ...inputStyle, width: '100%' }} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Closes At *</label>
            <input type="datetime-local" value={endAt} onChange={e => setEndAt(e.target.value)}
              style={{ ...inputStyle, width: '100%' }} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>
            Questions Per Student — by difficulty (everyone gets the same mix, different actual questions)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] mb-1" style={{ color: '#00E5C8' }}>Easy</label>
              <input type="number" min={0} value={easyCount} onChange={e => setEasy(parseInt(e.target.value) || 0)}
                style={{ ...inputStyle, width: '100%' }} />
            </div>
            <div>
              <label className="block text-[10px] mb-1" style={{ color: '#FBBF24' }}>Medium</label>
              <input type="number" min={0} value={mediumCount} onChange={e => setMedium(parseInt(e.target.value) || 0)}
                style={{ ...inputStyle, width: '100%' }} />
            </div>
            <div>
              <label className="block text-[10px] mb-1" style={{ color: '#EF4444' }}>Hard</label>
              <input type="number" min={0} value={hardCount} onChange={e => setHard(parseInt(e.target.value) || 0)}
                style={{ ...inputStyle, width: '100%' }} />
            </div>
          </div>
          <p className="text-[11px] mt-1.5" style={{ color: '#607896' }}>Total per student: {total} questions</p>
        </div>
      </motion.div>

      {error && <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>}

      <button onClick={handleSubmit} disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm"
        style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18', boxShadow: '0 0 24px rgba(0,229,200,0.25)' }}>
        {loading
          ? <><Loader2 size={15} className="animate-spin" /> Generating questions with AI...</>
          : <><Sparkles size={15} /> Generate Questions</>}
      </button>
      <p className="text-[11px] text-center" style={{ color: '#607896' }}>
        AI generates a larger pool than you need — you'll review and approve before it goes live to students.
      </p>
    </div>
  )
}
