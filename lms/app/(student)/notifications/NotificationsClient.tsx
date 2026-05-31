'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Check, BookOpen, BarChart3, CalendarDays, Award } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Notif { id: string; title: string; message: string; isRead: boolean; type: string; createdAt: string }

const TYPE_CONFIG: { [k: string]: { color: string; icon: any } } = {
  announcement: { color: '#00E5C8', icon: Bell      },
  grade:        { color: '#818CF8', icon: BarChart3  },
  attendance:   { color: '#FBBF24', icon: CalendarDays },
  certificate:  { color: '#38BDF8', icon: Award     },
}

export default function NotificationsClient({ studentId, notifications: initial }: { studentId: string; notifications: Notif[] }) {
  const [notifs, setNotifs] = useState(initial)
  const [filter, setFilter] = useState<'ALL'|'UNREAD'>('ALL')

  const unread = notifs.filter(n => !n.isRead).length

  const markAllRead = async () => {
    await fetch('/api/students/notifications', { method: 'PATCH' }).catch(() => {})
    setNotifs(n => n.map(x => ({ ...x, isRead: true })))
  }

  const markRead = async (id: string) => {
    await fetch('/api/students/notifications', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {})
    setNotifs(n => n.map(x => x.id === id ? { ...x, isRead: true } : x))
  }

  const filtered = filter === 'UNREAD' ? notifs.filter(n => !n.isRead) : notifs

  return (
    <div className="space-y-5 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl mb-1 flex items-center gap-2" style={{ color: 'var(--white)' }}>
              <Bell size={20} style={{ color: '#00E5C8' }} /> Notifications
            </h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {unread > 0 ? `${unread} unread` : 'All caught up'}
            </p>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
              style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
              <Check size={12} /> Mark all read
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'var(--bg2)', border: '1px solid rgba(0,229,200,0.08)' }}>
        {(['ALL','UNREAD'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ background: filter === f ? 'rgba(0,229,200,0.1)' : 'transparent', color: filter === f ? '#00E5C8' : 'var(--muted)', border: filter === f ? '1px solid rgba(0,229,200,0.2)' : '1px solid transparent' }}>
            {f === 'ALL' ? `All (${notifs.length})` : `Unread (${unread})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--bg2)', border: '1px solid rgba(0,229,200,0.08)' }}>
            <Bell size={36} className="mx-auto mb-3" style={{ color: 'var(--muted)' }} />
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {filter === 'UNREAD' ? 'No unread notifications.' : 'No notifications yet.'}
            </p>
          </div>
        ) : filtered.map((n, i) => {
          const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.announcement
          const Icon = cfg.icon
          return (
            <motion.div key={n.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              onClick={() => !n.isRead && markRead(n.id)}
              className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all"
              style={{ background: n.isRead ? 'var(--bg2)' : `${cfg.color}06`, border: `1px solid ${n.isRead ? 'rgba(0,229,200,0.08)' : `${cfg.color}20`}` }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,200,0.2)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = n.isRead ? 'rgba(0,229,200,0.08)' : `${cfg.color}20`)}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${cfg.color}12`, border: `1px solid ${cfg.color}25` }}>
                <Icon size={15} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm" style={{ color: 'var(--white)' }}>{n.title}</p>
                  {!n.isRead && (
                    <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: cfg.color }} />
                  )}
                </div>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--muted)' }}>{n.message}</p>
                <p className="text-[10px] mt-1.5" style={{ color: 'rgba(96,120,150,0.6)' }}>{formatDate(n.createdAt)}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
