'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Building2, Users, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate } from '@/lib/utils'

interface Batch     { id: string; batchNumber: string; programme: string; course: string; batchType: string; startDate: string; endDate: string; centre: { id: string; name: string; district: string }; instructor: { id: string; fullName: string }; studentCount: number }
interface Centre    { id: string; name: string; district: string; address: string; capacity: number; batchCount: number }
interface Instructor{ id: string; fullName: string; specialization: string }
interface Student   { id: string; fullName: string; cnic: string; programme: string }

interface Props { batches: Batch[]; centres: Centre[]; instructors: Instructor[]; unassignedStudents: Student[] }

type Tab = 'batches' | 'centres'

const COURSES = ['Web Development','Graphic Designing & UI/UX','Digital Marketing & SEO','Python Development','Data Science','Cyber Security','Mobile App Development','E-Commerce','Technical Freelancing','Content Marketing','Creative Design Freelancing','Java Development']
const DISTRICTS = ['Jamshoro','Hyderabad','Matiari','Thatta','Sujawal','Badin','Tando Allahyar','Tando Mohammad Khan','Mirpur Khas','Umerkot','Sanghar','Shaheed Benazirabad']

export default function BatchesClient({ batches: initial, centres: initialCentres, instructors, unassignedStudents }: Props) {
  const [tab, setTab]           = useState<Tab>('batches')
  const [batches, setBatches]   = useState(initial)
  const [centres, setCentres]   = useState(initialCentres)
  const [showBatchForm, setShowBatchForm]   = useState(false)
  const [showCentreForm, setShowCentreForm] = useState(false)
  const [enrolPanel, setEnrolPanel] = useState<string | null>(null)
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set())
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  /* Batch form */
  const [bf, setBf] = useState({ batchNumber:'', programme:'PITP', course:'', batchType:'REGULAR', startDate:'', endDate:'', centreId:'', instructorId:'' })
  const setBfField = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setBf(f => ({ ...f, [k]: e.target.value }))

  /* Centre form */
  const [cf, setCf] = useState({ name:'', district:'', address:'', capacity:'30' })
  const setCfField = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setCf(f => ({ ...f, [k]: e.target.value }))

  const createBatch = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/admin/batches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bf) })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed'); setLoading(false); return }
      setBatches(b => [data.batch, ...b])
      setShowBatchForm(false)
      setBf({ batchNumber:'', programme:'PITP', course:'', batchType:'REGULAR', startDate:'', endDate:'', centreId:'', instructorId:'' })
    } catch { setError('Network error') }
    setLoading(false)
  }

  const createCentre = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/admin/centres', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...cf, capacity: parseInt(cf.capacity) }) })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed'); setLoading(false); return }
      setCentres(c => [...c, data.centre])
      setShowCentreForm(false)
      setCf({ name:'', district:'', address:'', capacity:'30' })
    } catch { setError('Network error') }
    setLoading(false)
  }

  const enrolStudents = async (batchId: string) => {
    if (!selectedStudents.size) return
    setLoading(true)
    try {
      await fetch(`/api/admin/batches/${batchId}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentIds: [...selectedStudents] }),
      })
      setBatches(bs => bs.map(b => b.id === batchId ? { ...b, studentCount: b.studentCount + selectedStudents.size } : b))
      setEnrolPanel(null); setSelectedStudents(new Set())
    } finally { setLoading(false) }
  }

  const inp = { background: '#020B18', border: '1px solid rgba(0,229,200,0.15)', borderRadius: '10px', padding: '9px 12px', color: '#E8F4FF', fontSize: '13px', outline: 'none', width: '100%' }
  const focusBorder = (e: any) => (e.target.style.borderColor = '#00E5C8')
  const blurBorder  = (e: any) => (e.target.style.borderColor = 'rgba(0,229,200,0.15)')
  const lbl = (t: string) => <label className="block text-xs font-semibold mb-1.5" style={{ color: '#607896' }}>{t}</label>

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Batch & Centre Management</h1>
        <p className="text-sm" style={{ color: '#607896' }}>{batches.length} batches · {centres.length} centres</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
        {(['batches','centres'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
            style={{ background: tab === t ? 'rgba(0,229,200,0.1)' : 'transparent', color: tab === t ? '#00E5C8' : '#607896', border: tab === t ? '1px solid rgba(0,229,200,0.2)' : '1px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── BATCHES TAB ── */}
      {tab === 'batches' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowBatchForm(s => !s)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
              <Plus size={15} /> Create Batch
            </button>
          </div>

          {/* Batch create form */}
          {showBatchForm && (
            <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={createBatch}
              className="rounded-2xl p-5 space-y-4" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>
              <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>New Batch</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>{lbl('Batch Number')}
                  <input type="text" value={bf.batchNumber} onChange={setBfField('batchNumber')} placeholder="e.g. 4" required style={inp} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
                <div>{lbl('Programme')}
                  <select value={bf.programme} onChange={setBfField('programme')} style={inp} onFocus={focusBorder} onBlur={blurBorder}>
                    <option>PITP</option><option>BBSHRRDB</option><option>NFTP</option>
                  </select>
                </div>
                <div>{lbl('Batch Type')}
                  <select value={bf.batchType} onChange={setBfField('batchType')} style={inp} onFocus={focusBorder} onBlur={blurBorder}>
                    <option value="REGULAR">Regular (Mon–Fri)</option><option value="WEEKEND">Weekend (Sat–Sun)</option>
                  </select>
                </div>
                <div className="sm:col-span-3">{lbl('Course')}
                  <select value={bf.course} onChange={setBfField('course')} required style={inp} onFocus={focusBorder} onBlur={blurBorder}>
                    <option value="">Select course</option>
                    {COURSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>{lbl('Start Date')}
                  <input type="date" value={bf.startDate} onChange={setBfField('startDate')} required style={inp} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
                <div>{lbl('End Date')}
                  <input type="date" value={bf.endDate} onChange={setBfField('endDate')} required style={inp} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
                <div>{lbl('Centre')}
                  <select value={bf.centreId} onChange={setBfField('centreId')} required style={inp} onFocus={focusBorder} onBlur={blurBorder}>
                    <option value="">Select centre</option>
                    {centres.map(c => <option key={c.id} value={c.id}>{c.name} — {c.district}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">{lbl('Instructor')}
                  <select value={bf.instructorId} onChange={setBfField('instructorId')} required style={inp} onFocus={focusBorder} onBlur={blurBorder}>
                    <option value="">Select instructor</option>
                    {instructors.map(i => <option key={i.id} value={i.id}>{i.fullName} ({i.specialization})</option>)}
                  </select>
                </div>
              </div>
              {error && <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowBatchForm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'rgba(96,120,150,0.1)', border: '1px solid rgba(96,120,150,0.2)', color: '#607896' }}>Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>{loading ? '...' : 'Create Batch'}</button>
              </div>
            </motion.form>
          )}

          {/* Batch list */}
          {batches.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
              <div className="px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={b.programme} />
                    <span className="text-xs" style={{ color: '#607896' }}>Batch {b.batchNumber}</span>
                  </div>
                  <p className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>{b.course}</p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: '#607896' }}>
                    <span className="flex items-center gap-1"><Building2 size={10} />{b.centre.name}</span>
                    <span className="flex items-center gap-1"><Users size={10} />{b.studentCount} students</span>
                    <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(b.startDate)} — {formatDate(b.endDate)}</span>
                  </div>
                </div>
                <button onClick={() => { setEnrolPanel(enrolPanel === b.id ? null : b.id); setSelectedStudents(new Set()) }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all"
                  style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
                  <Plus size={12} /> Enrol Students
                  {enrolPanel === b.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              </div>

              {enrolPanel === b.id && (
                <div className="px-5 pb-4" style={{ borderTop: '1px solid rgba(0,229,200,0.06)' }}>
                  <p className="text-xs font-semibold mt-3 mb-2" style={{ color: '#607896' }}>
                    Unassigned approved students ({unassignedStudents.length})
                  </p>
                  {unassignedStudents.length === 0 ? (
                    <p className="text-xs" style={{ color: '#607896' }}>No unassigned students.</p>
                  ) : (
                    <>
                      <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 mb-3">
                        {unassignedStudents.map(s => (
                          <label key={s.id} className="flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-all"
                            style={{ background: selectedStudents.has(s.id) ? 'rgba(0,229,200,0.06)' : 'transparent', border: `1px solid ${selectedStudents.has(s.id) ? 'rgba(0,229,200,0.2)' : 'rgba(0,229,200,0.04)'}` }}>
                            <input type="checkbox" checked={selectedStudents.has(s.id)}
                              onChange={() => setSelectedStudents(sel => { const n = new Set(sel); n.has(s.id) ? n.delete(s.id) : n.add(s.id); return n })}
                              className="w-3.5 h-3.5 accent-teal-400" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate" style={{ color: '#E8F4FF' }}>{s.fullName}</p>
                              <p className="text-[10px]" style={{ color: '#607896' }}>{s.cnic} · {s.programme}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                      <button onClick={() => enrolStudents(b.id)} disabled={!selectedStudents.size || loading}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold"
                        style={{ background: selectedStudents.size ? 'linear-gradient(135deg, #00E5C8, #38BDF8)' : 'rgba(96,120,150,0.2)', color: selectedStudents.size ? '#020B18' : '#607896' }}>
                        <CheckCircle2 size={12} /> Enrol {selectedStudents.size} Student{selectedStudents.size !== 1 ? 's' : ''}
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          ))}
          {batches.length === 0 && <p className="text-sm text-center py-8" style={{ color: '#607896' }}>No batches yet. Create the first one above.</p>}
        </motion.div>
      )}

      {/* ── CENTRES TAB ── */}
      {tab === 'centres' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowCentreForm(s => !s)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
              <Plus size={15} /> Add Centre
            </button>
          </div>

          {showCentreForm && (
            <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={createCentre}
              className="rounded-2xl p-5 space-y-4" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)' }}>
              <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>New Training Centre</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>{lbl('Centre Name')}
                  <input type="text" value={cf.name} onChange={setCfField('name')} placeholder="e.g. MUET Hyderabad Campus" required style={inp} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
                <div>{lbl('District')}
                  <select value={cf.district} onChange={setCfField('district')} required style={inp} onFocus={focusBorder} onBlur={blurBorder}>
                    <option value="">Select district</option>
                    {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="col-span-2">{lbl('Address')}
                  <input type="text" value={cf.address} onChange={setCfField('address')} placeholder="Full address..." required style={inp} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
                <div>{lbl('Capacity (seats)')}
                  <input type="number" min={1} value={cf.capacity} onChange={setCfField('capacity')} style={inp} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
              </div>
              {error && <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowCentreForm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'rgba(96,120,150,0.1)', border: '1px solid rgba(96,120,150,0.2)', color: '#607896' }}>Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>{loading ? '...' : 'Add Centre'}</button>
              </div>
            </motion.form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {centres.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)' }}>
                    <Building2 size={16} style={{ color: '#00E5C8' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: '#E8F4FF' }}>{c.name}</p>
                    <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: '#607896' }}><MapPin size={10} />{c.district}</p>
                  </div>
                </div>
                <p className="text-xs mb-3 line-clamp-2" style={{ color: '#607896' }}>{c.address}</p>
                <div className="flex justify-between text-xs" style={{ color: '#607896' }}>
                  <span>Capacity: {c.capacity}</span>
                  <span style={{ color: '#00E5C8' }}>{c.batchCount} batch{c.batchCount !== 1 ? 'es' : ''}</span>
                </div>
              </motion.div>
            ))}
            {centres.length === 0 && <p className="text-sm text-center py-8 col-span-3" style={{ color: '#607896' }}>No centres yet.</p>}
          </div>
        </motion.div>
      )}
    </div>
  )
}
