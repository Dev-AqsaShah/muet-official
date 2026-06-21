'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Megaphone, Pin, ChevronDown, ChevronUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Announcement {
  id: string; title: string; body: string; priority: string
  createdAt: string; instructorName: string
}

const PRIORITY_STYLE: { [k: string]: { color: string; bg: string; border: string } } = {
  URGENT:  { color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
  HOLIDAY: { color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)'  },
  NORMAL:  { color: '#607896', bg: 'rgba(6,18,36,1)',        border: 'rgba(0,229,200,0.1)'   },
}

export default function AnnouncementsClient({ announcements }: { announcements: Announcement[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<'ALL'|'URGENT'|'HOLIDAY'|'NORMAL'>('ALL')

  const toggle = (id: string) => setExpanded(s => {
    const n = new Set(s)
    n.has(id) ? n.delete(id) : n.add(id)
    return n
  })

  const pinned  = announcements.filter(a => a.priority === 'URGENT')
  const rest    = announcements.filter(a => filter === 'ALL' ? true : a.priority === filter)

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
          <Megaphone size={22} style={{ color: '#00E5C8' }} /> Announcements
        </h1>
        <p className="text-sm" style={{ color: '#607896' }}>{announcements.length} total announcements</p>
      </motion.div>

      {/* Pinned urgent */}
      {pinned.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="space-y-2">
          {pinned.map(a => (
            <div key={a.id} className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <div className="flex items-center gap-2 px-4 py-2" style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
                <Pin size={11} style={{ color: '#EF4444' }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#EF4444' }}>Urgent</span>
              </div>
              <div className="px-5 py-4">
                <p className="font-bold text-sm mb-2" style={{ color: '#E8F4FF' }}>{a.title}</p>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(232,244,255,0.7)' }}>{a.body}</p>
                <p className="text-xs mt-3" style={{ color: '#607896' }}>{a.instructorName} · {formatDate(a.createdAt)}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
        {(['ALL','URGENT','HOLIDAY','NORMAL'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize"
            style={{
              background: filter === f ? 'rgba(0,229,200,0.1)' : 'transparent',
              color: filter === f ? '#00E5C8' : '#607896',
              border: filter === f ? '1px solid rgba(0,229,200,0.2)' : '1px solid transparent',
            }}>
            {f === 'ALL' ? 'All' : f[0] + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Announcement list */}
      <div className="space-y-2">
        {rest.length === 0 ? (
          <div className="rounded-2xl p-10 text-center" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
            <Megaphone size={32} className="mx-auto mb-3" style={{ color: '#607896' }} />
            <p className="text-sm" style={{ color: '#607896' }}>No announcements yet.</p>
          </div>
        ) : rest.map((a, i) => {
          const sty = PRIORITY_STYLE[a.priority] ?? PRIORITY_STYLE.NORMAL
          const open = expanded.has(a.id)
          return (
            <motion.div key={a.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: sty.bg, border: `1px solid ${sty.border}` }}>
              <button onClick={() => toggle(a.id)} className="w-full flex items-start gap-3 px-5 py-4 text-left">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {a.priority !== 'NORMAL' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${sty.color}15`, color: sty.color, border: `1px solid ${sty.color}25` }}>
                        {a.priority}
                      </span>
                    )}
                    <span className="text-xs" style={{ color: '#607896' }}>{formatDate(a.createdAt)}</span>
                  </div>
                  <p className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>{a.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#607896' }}>by {a.instructorName}</p>
                </div>
                {open
                  ? <ChevronUp size={15} style={{ color: '#607896', flexShrink: 0, marginTop: 4 }} />
                  : <ChevronDown size={15} style={{ color: '#607896', flexShrink: 0, marginTop: 4 }} />}
              </button>

              {open && (
                <div className="px-5 pb-4 pt-0">
                  <div className="pt-3" style={{ borderTop: `1px solid ${sty.border}` }}>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(232,244,255,0.7)' }}>{a.body}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
