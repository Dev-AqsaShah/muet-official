'use client'
import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle2, XCircle, Filter } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Student { id: string; fullName: string; cnic: string; mobile: string; district: string; programme: string; qualification: string; createdAt: string; user: { email: string; status: string }; batch: any }

export default function AdminStudentsClient({ students: initial }: { students: Student[] }) {
  const router = useRouter()
  const [students, setStudents] = useState(initial)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL')
  const [isPending, startTransition] = useTransition()
  const [actionId, setActionId] = useState<string | null>(null)

  const filtered = students.filter(s => {
    const matchSearch = !search ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.cnic.includes(search) || s.user.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'ALL' || s.user.status === filter
    return matchSearch && matchFilter
  })

  const pending = students.filter(s => s.user.status === 'PENDING').length

  const act = async (studentId: string, action: 'approve' | 'reject') => {
    setActionId(studentId)
    const res = await fetch(`/api/admin/students/${studentId}/${action}`, { method: 'PATCH' })
    if (res.ok) {
      const newStatus = action === 'approve' ? 'APPROVED' : 'REJECTED'
      setStudents(ss => ss.map(s => s.id === studentId ? { ...s, user: { ...s.user, status: newStatus } } : s))
    }
    setActionId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Student Management</h1>
          {pending > 0 && (
            <p className="text-sm" style={{ color: '#FBBF24' }}>⚠ {pending} registration{pending > 1 ? 's' : ''} pending approval</p>
          )}
        </div>
        <div className="flex gap-2">
          {(['ALL','PENDING','APPROVED','REJECTED'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: filter === f ? 'rgba(0,229,200,0.12)' : 'rgba(6,18,36,1)',
                border: `1px solid ${filter === f ? 'rgba(0,229,200,0.3)' : 'rgba(0,229,200,0.08)'}`,
                color: filter === f ? '#00E5C8' : '#607896',
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#607896' }} />
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, CNIC, or email..."
          className="w-full py-2.5 pl-10 pr-4 rounded-xl text-sm"
          style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.12)', color: '#E8F4FF', outline: 'none' }}
          onFocus={e => (e.target.style.borderColor = '#00E5C8')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(0,229,200,0.12)')}
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
                {['Student','CNIC','District','Programme','Applied','Status','Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#607896' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr key={s.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: '1px solid rgba(0,229,200,0.05)' }}>
                  <td className="px-5 py-4">
                    <p className="font-semibold" style={{ color: '#E8F4FF' }}>{s.fullName}</p>
                    <p className="text-xs" style={{ color: '#607896' }}>{s.user.email}</p>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: '#607896' }}>{s.cnic}</td>
                  <td className="px-5 py-4 text-xs" style={{ color: '#607896' }}>{s.district}</td>
                  <td className="px-5 py-4"><StatusBadge status={s.programme} /></td>
                  <td className="px-5 py-4 text-xs" style={{ color: '#607896' }}>{formatDate(s.createdAt)}</td>
                  <td className="px-5 py-4"><StatusBadge status={s.user.status} pulse={s.user.status === 'PENDING'} /></td>
                  <td className="px-5 py-4">
                    {s.user.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button onClick={() => act(s.id, 'approve')} disabled={actionId === s.id}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'rgba(0,229,200,0.1)', border: '1px solid rgba(0,229,200,0.25)', color: '#00E5C8' }}>
                          <CheckCircle2 size={12} /> Approve
                        </button>
                        <button onClick={() => act(s.id, 'reject')} disabled={actionId === s.id}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#EF4444' }}>
                          <XCircle size={12} /> Reject
                        </button>
                      </div>
                    )}
                    {s.user.status !== 'PENDING' && <span className="text-xs" style={{ color: '#607896' }}>—</span>}
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-sm" style={{ color: '#607896' }}>No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
