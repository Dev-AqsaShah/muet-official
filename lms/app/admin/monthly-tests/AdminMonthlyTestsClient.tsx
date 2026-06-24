'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ShieldAlert, Check, X, RotateCcw } from 'lucide-react'

interface Issue { id: string; reason: string; createdAt: string; studentName: string; testTitle: string }
interface Flagged { id: string; violationCount: number; startedAt: string; studentName: string; testTitle: string }
interface Props { issues: Issue[]; flagged: Flagged[] }

export default function AdminMonthlyTestsClient({ issues: initialIssues, flagged: initialFlagged }: Props) {
  const [tab, setTab] = useState<'issues' | 'flagged'>('issues')
  const [issues, setIssues] = useState(initialIssues)
  const [flagged, setFlagged] = useState(initialFlagged)

  const approveIssue = async (id: string) => {
    await fetch(`/api/admin/monthly-tests/issues/${id}/approve`, { method: 'PATCH' })
    setIssues(is => is.filter(i => i.id !== id))
  }
  const rejectIssue = async (id: string) => {
    await fetch(`/api/admin/monthly-tests/issues/${id}/reject`, { method: 'PATCH' })
    setIssues(is => is.filter(i => i.id !== id))
  }
  const clearFlag = async (id: string) => {
    await fetch(`/api/admin/monthly-tests/flagged/${id}/clear`, { method: 'PATCH' })
    setFlagged(fs => fs.filter(f => f.id !== id))
  }
  const invalidateFlag = async (id: string) => {
    await fetch(`/api/admin/monthly-tests/flagged/${id}/invalidate`, { method: 'PATCH' })
    setFlagged(fs => fs.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Monthly Tests</h1>
        <p className="text-sm" style={{ color: '#607896' }}>Resolve student-reported issues and review flagged attempts.</p>
      </motion.div>

      <div className="flex gap-2">
        {[
          { key: 'issues', label: `Issue Reports (${issues.length})`, icon: AlertTriangle },
          { key: 'flagged', label: `Flagged Attempts (${flagged.length})`, icon: ShieldAlert },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{
              background: tab === t.key ? 'rgba(0,229,200,0.1)' : 'transparent',
              border: `1px solid ${tab === t.key ? 'rgba(0,229,200,0.3)' : 'rgba(0,229,200,0.1)'}`,
              color: tab === t.key ? '#00E5C8' : '#607896',
            }}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'issues' && (
        issues.length === 0 ? (
          <EmptyState text="No pending issue reports." />
        ) : (
          <div className="space-y-3">
            {issues.map(i => (
              <div key={i.id} className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color: '#E8F4FF' }}>{i.studentName} — {i.testTitle}</p>
                  <span className="text-[10px]" style={{ color: '#607896' }}>{new Date(i.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm mb-4" style={{ color: '#8aa2c0' }}>{i.reason}</p>
                <div className="flex gap-2">
                  <button onClick={() => approveIssue(i.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold"
                    style={{ background: 'rgba(0,229,200,0.12)', color: '#00E5C8' }}>
                    <Check size={13} /> Approve Retake
                  </button>
                  <button onClick={() => rejectIssue(i.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
                    <X size={13} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === 'flagged' && (
        flagged.length === 0 ? (
          <EmptyState text="No flagged attempts right now." />
        ) : (
          <div className="space-y-3">
            {flagged.map(f => (
              <div key={f.id} className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(239,68,68,0.15)' }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color: '#E8F4FF' }}>{f.studentName} — {f.testTitle}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>
                    {f.violationCount} violations
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: '#607896' }}>Started: {new Date(f.startedAt).toLocaleString()}</p>
                <div className="flex gap-2">
                  <button onClick={() => clearFlag(f.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold"
                    style={{ background: 'rgba(96,120,150,0.1)', color: '#607896' }}>
                    <Check size={13} /> Clear Flag (no issue)
                  </button>
                  <button onClick={() => invalidateFlag(f.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold"
                    style={{ background: 'rgba(251,191,36,0.12)', color: '#FBBF24' }}>
                    <RotateCcw size={13} /> Invalidate & Allow Retake
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
      <p className="text-sm" style={{ color: '#607896' }}>{text}</p>
    </div>
  )
}
