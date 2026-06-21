'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, ExternalLink, ChevronDown, ChevronRight, BookOpen, User, Building2, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import StatusBadge from '@/components/ui/StatusBadge'

interface Material {
  id: string; week: number; day?: number | null; title: string; description?: string | null
  fileUrl?: string | null; fileType?: string | null; externalUrl?: string | null; visibleFrom: string; createdAt: string
}
interface Session { id: string; date: string; topic: string; sessionType: string; startTime: string; endTime: string; isCancelled: boolean }
interface Props {
  course: string | null; programme: string; batch: any; materials: Material[]
  sessions: Session[]; progress: number; attendedDates: string[]
}

export default function CourseClient({ course, programme, batch, materials, sessions, progress, attendedDates }: Props) {
  const totalWeeks = batch?.batchType === 'WEEKEND' ? 15 : 8
  const [openWeek, setOpenWeek] = useState<number | null>(1)
  const [activeTab, setActiveTab] = useState<'content'|'resources'>('content')

  const byWeek: { [k: string]: Material[] } = {}
  materials.forEach(m => {
    if (!byWeek[m.week]) byWeek[m.week] = []
    byWeek[m.week].push(m)
  })

  const today = new Date().toISOString().split('T')[0]

  const getSessionStatus = (s: Session) => {
    const d = s.date.split('T')[0]
    if (s.isCancelled) return 'cancelled'
    if (d === today) return 'today'
    if (d < today) return attendedDates.includes(d) ? 'completed' : 'missed'
    return 'upcoming'
  }

  const statusStyle: { [k: string]: { color: string; label: string } } = {
    today:     { color: '#00E5C8', label: 'Today' },
    completed: { color: '#818CF8', label: 'Completed' },
    upcoming:  { color: '#607896', label: 'Upcoming' },
    missed:    { color: '#EF4444', label: 'Missed' },
    cancelled: { color: '#EF4444', label: 'Cancelled' },
  }

  const fileIcon = (type?: string | null) => type === 'zip' ? '📦' : type === 'link' ? '🔗' : '📄'

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>
          {course ?? 'My Course'}
        </h1>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={programme} />
          {batch && <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}>Batch {batch.batchNumber}</span>}
        </div>
      </motion.div>

      {/* Course header card */}
      {batch && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              { icon: User,      label: 'Instructor', value: batch.instructor },
              { icon: Building2, label: 'Centre',     value: batch.centre     },
              { icon: Calendar,  label: 'Start Date', value: formatDate(batch.startDate) },
              { icon: Calendar,  label: 'End Date',   value: formatDate(batch.endDate)   },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#607896' }}>{label}</p>
                <p className="text-xs font-semibold flex items-center gap-1" style={{ color: '#E8F4FF' }}>
                  <Icon size={11} style={{ color: '#00E5C8' }} /> {value}
                </p>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color: '#607896' }}>Course Progress</span>
              <span style={{ color: '#00E5C8' }}>{progress}% attended</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #00E5C8, #38BDF8)', boxShadow: '0 0 8px rgba(0,229,200,0.4)' }} />
            </div>
            <p className="text-[10px] mt-1" style={{ color: '#607896' }}>
              Week 1–{totalWeeks} · {batch.batchType === 'WEEKEND' ? 'Saturday–Sunday' : 'Monday–Friday'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
        {(['content','resources'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
            style={{
              background: activeTab === t ? 'rgba(0,229,200,0.1)' : 'transparent',
              color: activeTab === t ? '#00E5C8' : '#607896',
              border: activeTab === t ? '1px solid rgba(0,229,200,0.2)' : '1px solid transparent',
            }}>{t === 'content' ? 'Weekly Content' : 'All Resources'}</button>
        ))}
      </div>

      {/* Weekly content */}
      {activeTab === 'content' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(week => {
            const weekSessions = sessions.filter(s => {
              const sd = new Date(s.date)
              const bs = new Date(batch?.startDate ?? new Date())
              const weekStart = new Date(bs.getTime() + (week - 1) * 7 * 86400000)
              const weekEnd   = new Date(weekStart.getTime() + 7 * 86400000)
              return sd >= weekStart && sd < weekEnd
            })
            const weekMaterials = byWeek[week] ?? []
            const isOpen = openWeek === week

            return (
              <div key={week} className="rounded-2xl overflow-hidden"
                style={{ background: '#061224', border: `1px solid ${isOpen ? 'rgba(0,229,200,0.2)' : 'rgba(0,229,200,0.08)'}` }}>
                <button onClick={() => setOpenWeek(isOpen ? null : week)}
                  className="w-full flex items-center justify-between px-5 py-4 transition-all"
                  style={{ background: isOpen ? 'rgba(0,229,200,0.04)' : 'transparent' }}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: 'rgba(0,229,200,0.1)', color: '#00E5C8' }}>W{week}</span>
                    <span className="text-sm font-semibold" style={{ color: '#E8F4FF' }}>Week {week}</span>
                    {weekMaterials.length > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(129,140,248,0.1)', color: '#818CF8', border: '1px solid rgba(129,140,248,0.2)' }}>
                        {weekMaterials.length} file{weekMaterials.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {isOpen ? <ChevronDown size={16} style={{ color: '#00E5C8' }} /> : <ChevronRight size={16} style={{ color: '#607896' }} />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 space-y-3">
                    {/* Sessions */}
                    {weekSessions.length > 0 && weekSessions.map(s => {
                      const st = getSessionStatus(s)
                      const sc = statusStyle[st]
                      return (
                        <div key={s.id} className="flex items-start gap-3 p-3 rounded-xl"
                          style={{ background: st === 'today' ? 'rgba(0,229,200,0.05)' : '#020B18', border: `1px solid ${st === 'today' ? 'rgba(0,229,200,0.25)' : 'rgba(0,229,200,0.06)'}`, boxShadow: st === 'today' ? '0 0 16px rgba(0,229,200,0.08)' : 'none' }}>
                          <div className="flex-1">
                            <p className="text-xs font-semibold" style={{ color: '#E8F4FF' }}>{s.topic}</p>
                            <p className="text-[10px]" style={{ color: '#607896' }}>
                              {formatDate(s.date)} · {s.startTime}–{s.endTime} · {s.sessionType}
                            </p>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${sc.color}12`, color: sc.color }}>{sc.label}</span>
                        </div>
                      )
                    })}

                    {/* Materials */}
                    {weekMaterials.length > 0 && weekMaterials.map(m => (
                      <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.06)' }}>
                        <span className="text-base shrink-0 mt-0.5">{fileIcon(m.fileType)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold" style={{ color: '#E8F4FF' }}>{m.title}</p>
                          {m.description && <p className="text-[10px]" style={{ color: '#607896' }}>{m.description}</p>}
                        </div>
                        {(m.fileUrl || m.externalUrl) && (
                          <a href={m.fileUrl ?? m.externalUrl ?? '#'} target="_blank" rel="noopener noreferrer"
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
                            {m.fileUrl ? <Download size={12} /> : <ExternalLink size={12} />}
                          </a>
                        )}
                      </div>
                    ))}

                    {weekSessions.length === 0 && weekMaterials.length === 0 && (
                      <p className="text-xs py-2" style={{ color: '#607896' }}>No content uploaded for this week yet.</p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>
      )}

      {/* All resources tab */}
      {activeTab === 'resources' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {materials.length === 0 ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
              <BookOpen size={32} className="mx-auto mb-3" style={{ color: '#607896' }} />
              <p className="text-sm" style={{ color: '#607896' }}>No materials uploaded yet.</p>
            </div>
          ) : materials.map(m => (
            <div key={m.id} className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
              <span className="text-lg shrink-0">{fileIcon(m.fileType)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: '#E8F4FF' }}>{m.title}</p>
                <p className="text-xs" style={{ color: '#607896' }}>Week {m.week}{m.day ? `, Day ${m.day}` : ''} · {formatDate(m.createdAt)}</p>
                {m.description && <p className="text-xs mt-0.5" style={{ color: '#607896' }}>{m.description}</p>}
              </div>
              {(m.fileUrl || m.externalUrl) && (
                <a href={m.fileUrl ?? m.externalUrl ?? '#'} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0"
                  style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
                  {m.fileUrl ? <><Download size={12} /> Download</> : <><ExternalLink size={12} /> Open</>}
                </a>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
