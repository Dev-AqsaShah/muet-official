'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, CheckCircle2, XCircle, ExternalLink, Loader } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import StatusBadge from '@/components/ui/StatusBadge'

interface EligibleStudent { id: string; fullName: string; cnic: string; programme: string; course: string; centre: string; totalScore: number }
interface IssuedCert { id: string; certificateId: string; issuedAt: string; studentName: string; cnic: string; course: string; status: string }

export default function AdminCertificatesClient({ eligible: initial, issued: initialIssued }: { eligible: EligibleStudent[]; issued: IssuedCert[] }) {
  const [eligible, setEligible]   = useState(initial)
  const [issued, setIssued]       = useState(initialIssued)
  const [selected, setSelected]   = useState<Set<string>>(new Set())
  const [loading, setLoading]     = useState<string | null>(null)
  const [issuing, setIssuing]     = useState(false)
  const [error, setError]         = useState('')

  const toggle = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleAll = () => setSelected(selected.size === eligible.length ? new Set() : new Set(eligible.map(s => s.id)))

  const issue = async (ids: string[]) => {
    setIssuing(true); setError('')
    try {
      const res = await fetch('/api/admin/certificates/issue', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentIds: ids }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed'); setIssuing(false); return }
      setEligible(e => e.filter(s => !ids.includes(s.id)))
      setSelected(new Set())
      const newCerts = data.certificates ?? []
      setIssued(i => [...newCerts, ...i])
    } catch { setError('Network error') }
    setIssuing(false)
  }

  const revoke = async (certId: string) => {
    const reason = prompt('Enter reason for revocation:')
    if (!reason) return
    setLoading(certId)
    try {
      await fetch(`/api/admin/certificates/${certId}/revoke`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })
      setIssued(i => i.map(c => c.id === certId ? { ...c, status: 'REVOKED' } : c))
    } finally { setLoading(null) }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Certificate Management</h1>
        <p className="text-sm" style={{ color: '#607896' }}>
          {eligible.length} student{eligible.length !== 1 ? 's' : ''} eligible · {issued.filter(c => c.status === 'APPROVED').length} issued
        </p>
      </motion.div>

      {/* Eligible queue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
          <h2 className="font-semibold text-sm flex items-center gap-2" style={{ color: '#E8F4FF' }}>
            <Award size={15} style={{ color: '#00E5C8' }} /> Eligible Students
          </h2>
          <div className="flex gap-2">
            {eligible.length > 0 && (
              <>
                <button onClick={toggleAll}
                  className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                  style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.15)', color: '#607896' }}>
                  {selected.size === eligible.length ? 'Deselect All' : 'Select All'}
                </button>
                {selected.size > 0 && (
                  <button onClick={() => issue([...selected])} disabled={issuing}
                    className="flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-lg font-bold"
                    style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                    {issuing ? <Loader size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                    Issue {selected.size} Certificate{selected.size > 1 ? 's' : ''}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {eligible.length === 0 ? (
          <div className="py-10 text-center">
            <CheckCircle2 size={32} className="mx-auto mb-3" style={{ color: '#00E5C8' }} />
            <p className="text-sm" style={{ color: '#607896' }}>All eligible students have received their certificates.</p>
          </div>
        ) : eligible.map((s, i) => (
          <div key={s.id} className="flex items-center gap-4 px-5 py-3.5"
            style={{ borderBottom: i < eligible.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none' }}>
            <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)}
              className="w-4 h-4 accent-teal-400 shrink-0" />
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
              style={{ background: 'rgba(0,229,200,0.08)', color: '#00E5C8', border: '1px solid rgba(0,229,200,0.15)' }}>
              {s.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: '#E8F4FF' }}>{s.fullName}</p>
              <p className="text-xs" style={{ color: '#607896' }}>{s.cnic} · {s.course} · {s.centre}</p>
            </div>
            <div className="text-right shrink-0">
              <StatusBadge status={s.programme} />
              <p className="text-xs mt-0.5 font-bold" style={{ color: '#00E5C8' }}>{s.totalScore.toFixed(1)} / 100</p>
            </div>
            <button onClick={() => issue([s.id])} disabled={issuing}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold shrink-0"
              style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
              <Award size={11} /> Issue
            </button>
          </div>
        ))}
      </motion.div>

      {error && <p className="text-sm text-center" style={{ color: '#EF4444' }}>{error}</p>}

      {/* Issued certificates */}
      {issued.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
            <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>Issued Certificates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,229,200,0.06)' }}>
                  {['Student','Course','Issued','Status','Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#607896' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {issued.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i < issued.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none' }}>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-xs" style={{ color: '#E8F4FF' }}>{c.studentName}</p>
                      <p className="text-[10px]" style={{ color: '#607896' }}>{c.cnic}</p>
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: '#607896' }}>{c.course}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: '#607896' }}>{c.issuedAt ? formatDate(c.issuedAt) : '—'}</td>
                    <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <a href={`/certificates/verify/${c.certificateId}`} target="_blank" rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
                          <ExternalLink size={11} />
                        </a>
                        {c.status === 'APPROVED' && (
                          <button onClick={() => revoke(c.id)} disabled={loading === c.id}
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                            {loading === c.id ? <Loader size={11} className="animate-spin" /> : <XCircle size={11} />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}
