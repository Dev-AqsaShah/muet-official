'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle2, FileText, Link as LinkIcon, Trash2 } from 'lucide-react'

interface Material { id: string; week: number; day?: number | null; title: string; fileType?: string | null; createdAt: string }
interface Props {
  instructorId: string
  batch: { id: string; batchNumber: string; course: string; batchType: string; recentMaterials: Material[] } | null
}

export default function UploadMaterialClient({ instructorId, batch }: Props) {
  const [form, setForm]       = useState({ week: 1, day: '', title: '', description: '', externalUrl: '', fileType: 'pdf' as 'pdf'|'zip'|'link', visibleFrom: new Date().toISOString().split('T')[0] })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')
  const [materials, setMaterials] = useState<Material[]>(batch?.recentMaterials ?? [])

  const totalWeeks = batch?.batchType === 'WEEKEND' ? 15 : 8

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!batch) return
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/instructor/materials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, day: form.day ? parseInt(form.day) : null, batchId: batch.id, instructorId }),
      })
      if (!res.ok) { setError((await res.json()).error ?? 'Upload failed'); setLoading(false); return }
      const { material } = await res.json()
      setMaterials(m => [material, ...m])
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      setForm(f => ({ ...f, title: '', description: '', externalUrl: '' }))
    } catch { setError('Network error') }
    setLoading(false)
  }

  if (!batch) return (
    <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
      <p className="text-sm" style={{ color: '#607896' }}>No batch assigned yet.</p>
    </div>
  )

  const inputStyle = { background: '#020B18', border: '1px solid rgba(0,229,200,0.15)', borderRadius: '10px', padding: '9px 12px', color: '#E8F4FF', fontSize: '13px', outline: 'none', width: '100%' }
  const label = (t: string) => <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>{t}</label>

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Upload Material</h1>
        <p className="text-sm" style={{ color: '#607896' }}>Batch {batch.batchNumber} — {batch.course}</p>
      </motion.div>

      <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 space-y-4" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>

        <div className="grid grid-cols-2 gap-3">
          <div>
            {label('Week Number')}
            <select value={form.week} onChange={set('week')} style={inputStyle}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
              {Array.from({ length: totalWeeks }, (_, i) => i+1).map(w => <option key={w} value={w}>Week {w}</option>)}
            </select>
          </div>
          <div>
            {label('Day (optional)')}
            <input type="number" min={1} max={7} value={form.day} onChange={set('day')} placeholder="1–7"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
          </div>
        </div>

        <div>
          {label('Title')}
          <input type="text" value={form.title} onChange={set('title')} placeholder="e.g. React Hooks Slides — Week 3" required
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
        </div>

        <div>
          {label('Description (optional)')}
          <textarea value={form.description} onChange={set('description')} rows={2} placeholder="Brief note for students..."
            style={{ ...inputStyle, resize: 'none' }}
            onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            {label('File Type')}
            <select value={form.fileType} onChange={set('fileType')} style={inputStyle}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')}>
              <option value="pdf">PDF / Slides</option>
              <option value="zip">ZIP / Lab Files</option>
              <option value="link">External Link</option>
            </select>
          </div>
          <div>
            {label('Visible From')}
            <input type="date" value={form.visibleFrom} onChange={set('visibleFrom')} style={inputStyle}
              onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
          </div>
        </div>

        <div>
          {label(form.fileType === 'link' ? 'External URL' : 'File URL (Cloudinary / Supabase link)')}
          <input type="url" value={form.externalUrl} onChange={set('externalUrl')}
            placeholder={form.fileType === 'link' ? 'https://...' : 'https://res.cloudinary.com/...'}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor='#00E5C8')} onBlur={e => (e.target.style.borderColor='rgba(0,229,200,0.15)')} />
          <p className="text-[10px] mt-1" style={{ color: '#607896' }}>
            Upload file to Cloudinary/Supabase first, then paste the URL here.
          </p>
        </div>

        {error && <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>}
        {success && (
          <div className="flex items-center gap-2 text-xs p-2.5 rounded-lg"
            style={{ background: 'rgba(0,229,200,0.08)', color: '#00E5C8' }}>
            <CheckCircle2 size={13} /> Material added successfully!
          </div>
        )}

        <button type="submit" disabled={loading || !form.title}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
          style={{ background: !loading && form.title ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.2)', color: !loading && form.title ? '#020B18' : '#607896' }}>
          {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <><Upload size={15} /> Upload Material</>}
        </button>
      </motion.form>

      {/* Recent materials */}
      {materials.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <div className="px-5 py-3.5" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
            <h3 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>Recently Uploaded</h3>
          </div>
          {materials.map((m, i) => (
            <div key={m.id} className="flex items-center gap-3 px-5 py-3"
              style={{ borderBottom: i < materials.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none' }}>
              <span className="text-lg">{m.fileType === 'zip' ? '📦' : m.fileType === 'link' ? '🔗' : '📄'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: '#E8F4FF' }}>{m.title}</p>
                <p className="text-[10px]" style={{ color: '#607896' }}>Week {m.week}{m.day ? `, Day ${m.day}` : ''}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
