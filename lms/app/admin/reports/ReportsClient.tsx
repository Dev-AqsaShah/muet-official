'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Printer, Users, GraduationCap, Award, BarChart3 } from 'lucide-react'

interface Batch  { id: string; batchNumber: string; course: string; programme: string }
interface Centre { id: string; name: string; district: string }
interface Props  { batches: Batch[]; centres: Centre[]; summary: { totalStudents: number; totalCertificates: number; totalBatches: number } }

type ReportType = 'attendance' | 'grades' | 'completion' | 'certificate'

const REPORTS: { type: ReportType; label: string; desc: string; icon: any; color: string }[] = [
  { type: 'attendance',   label: 'Attendance Report',    desc: 'Per-student attendance % for a batch',     icon: Users,        color: '#00E5C8' },
  { type: 'grades',       label: 'Grades Report',        desc: 'Score breakdown across all assessments',   icon: BarChart3,    color: '#38BDF8' },
  { type: 'completion',   label: 'Completion Report',    desc: 'Enrolled vs completed vs dropped',         icon: GraduationCap,color: '#818CF8' },
  { type: 'certificate',  label: 'Certificate Report',   desc: 'Issued, pending and revoked certificates', icon: Award,        color: '#FBBF24' },
]

export default function ReportsClient({ batches, centres, summary }: Props) {
  const [batchId,   setBatchId]   = useState('')
  const [centreId,  setCentreId]  = useState('')
  const [programme, setProgramme] = useState('')
  const [loading,   setLoading]   = useState<ReportType | null>(null)

  const download = async (type: ReportType) => {
    setLoading(type)
    const params = new URLSearchParams()
    if (batchId)   params.set('batchId', batchId)
    if (centreId)  params.set('centreId', centreId)
    if (programme) params.set('programme', programme)

    try {
      const res = await fetch(`/api/admin/reports/${type}?${params}`)
      if (!res.ok) { setLoading(null); return }
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url
      a.download = `muet-${type}-report-${new Date().toISOString().split('T')[0]}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) { console.error(e) }
    setLoading(null)
  }

  const inputStyle = {
    background: '#020B18', border: '1px solid rgba(0,229,200,0.15)', borderRadius: '10px',
    padding: '9px 12px', color: '#E8F4FF', fontSize: '13px', outline: 'none', width: '100%',
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Reports</h1>
        <p className="text-sm" style={{ color: '#607896' }}>Download Excel reports for funders and administration</p>
      </motion.div>

      {/* Summary stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Students',      value: summary.totalStudents,    color: '#00E5C8', icon: Users        },
          { label: 'Active Batches',       value: summary.totalBatches,     color: '#38BDF8', icon: GraduationCap},
          { label: 'Certificates Issued',  value: summary.totalCertificates,color: '#FBBF24', icon: Award        },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: '#061224', border: `1px solid ${s.color}20` }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 0 0, ${s.color}06, transparent 70%)` }} />
            <s.icon size={16} style={{ color: s.color }} className="mb-2" />
            <p className="font-display font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: '#607896' }}>{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
        <h2 className="font-semibold text-sm mb-4" style={{ color: '#E8F4FF' }}>Filter Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Batch</label>
            <select value={batchId} onChange={e => setBatchId(e.target.value)} style={inputStyle}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
              <option value="">All Batches</option>
              {batches.map(b => <option key={b.id} value={b.id}>Batch {b.batchNumber} — {b.course}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Centre</label>
            <select value={centreId} onChange={e => setCentreId(e.target.value)} style={inputStyle}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
              <option value="">All Centres</option>
              {centres.map(c => <option key={c.id} value={c.id}>{c.name} ({c.district})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>Programme</label>
            <select value={programme} onChange={e => setProgramme(e.target.value)} style={inputStyle}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
              <option value="">All Programmes</option>
              <option value="PITP">PITP</option>
              <option value="BBSHRRDB">BBSHRRDB</option>
              <option value="NFTP">NFTP</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Report cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REPORTS.map((r, i) => (
          <motion.div key={r.type}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
            className="rounded-2xl p-5" style={{ background: '#061224', border: `1px solid ${r.color}20` }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${r.color}12`, border: `1px solid ${r.color}25` }}>
                <r.icon size={18} style={{ color: r.color }} />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>{r.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#607896' }}>{r.desc}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => download(r.type)} disabled={loading === r.type}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}99)`, color: '#020B18', opacity: loading === r.type ? 0.7 : 1 }}>
                {loading === r.type
                  ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  : <Download size={13} />}
                Download Excel
              </button>
              <button onClick={() => window.print()}
                className="w-10 flex items-center justify-center rounded-xl transition-all"
                style={{ background: `${r.color}10`, border: `1px solid ${r.color}20`, color: r.color }}>
                <Printer size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="rounded-xl p-4 text-xs" style={{ background: 'rgba(0,229,200,0.04)', border: '1px solid rgba(0,229,200,0.1)', color: '#607896' }}>
        📋 Reports are generated in Excel (.xlsx) format with MUET header and batch info. Use filters above to narrow the data before downloading. For printing, use your browser's print function after downloading.
      </motion.div>
    </div>
  )
}
