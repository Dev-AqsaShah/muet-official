'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Bell, Menu, Sun, Moon, Check } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface Notif { id: string; title: string; message: string; isRead: boolean; type: string; createdAt: string }

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: session } = useSession()
  const { theme, toggle } = useTheme()
  const name     = session?.user?.name ?? 'User'
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  const role = (session?.user as any)?.role as string | undefined
  const isStudent = !role || role === 'STUDENT'
  const profileHref = role === 'INSTRUCTOR' || role === 'CENTRE_ADMIN' ? '/teacher/dashboard'
    : role === 'SUPER_ADMIN' ? '/admin/dashboard'
    : '/student/profile'

  const [notifs, setNotifs]       = useState<Notif[]>([])
  const [unread, setUnread]       = useState(0)
  const [showPanel, setShowPanel] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isStudent) return
    fetch('/api/student/notifications').then(r => r.json()).then(d => {
      if (d.notifications) { setNotifs(d.notifications); setUnread(d.unread) }
    }).catch(() => {})
  }, [isStudent])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setShowPanel(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const markAllRead = async () => {
    await fetch('/api/student/notifications', { method: 'PATCH' }).catch(() => {})
    setNotifs(n => n.map(x => ({ ...x, isRead: true })))
    setUnread(0)
  }

  const TYPE_COLOR: { [k: string]: string } = {
    announcement: '#00E5C8', grade: '#818CF8', attendance: '#FBBF24', certificate: '#38BDF8',
  }

  return (
    <header className="lms-topbar px-4 sm:px-6 justify-between">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-1.5 rounded-lg" onClick={onMenuClick}
          style={{ color: '#607896', background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.1)' }}>
          <Menu size={18} />
        </button>
        <div className="text-xs hidden sm:block" style={{ color: '#607896' }}>
          {new Date().toLocaleDateString('en-PK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button onClick={toggle}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
          style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.12)', color: '#607896' }}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Notifications — students only */}
        {isStudent && <div className="relative" ref={panelRef}>
          <button onClick={() => setShowPanel(s => !s)}
            className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ background: showPanel ? 'rgba(0,229,200,0.12)' : 'rgba(0,229,200,0.06)', border: `1px solid ${showPanel ? 'rgba(0,229,200,0.3)' : 'rgba(0,229,200,0.12)'}`, color: '#607896' }}>
            <Bell size={14} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ background: '#EF4444', color: '#fff' }}>{unread > 9 ? '9+' : unread}</span>
            )}
          </button>

          {showPanel && (
            <div className="absolute right-0 top-10 w-80 rounded-2xl overflow-hidden z-50 shadow-2xl"
              style={{ background: 'var(--bg2)', border: '1px solid rgba(0,229,200,0.18)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
                <p className="font-semibold text-sm" style={{ color: 'var(--white)' }}>Notifications</p>
                {unread > 0 && (
                  <button onClick={markAllRead} className="flex items-center gap-1 text-[10px] font-semibold"
                    style={{ color: '#00E5C8' }}>
                    <Check size={10} /> Mark all read
                  </button>
                )}
              </div>
              <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                {notifs.length === 0 ? (
                  <div className="py-8 text-center text-xs" style={{ color: 'var(--muted)' }}>No notifications yet.</div>
                ) : notifs.map(n => (
                  <div key={n.id} className="px-4 py-3 flex items-start gap-3"
                    style={{ borderBottom: '1px solid rgba(0,229,200,0.04)', background: n.isRead ? 'transparent' : 'rgba(0,229,200,0.03)' }}>
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ background: n.isRead ? 'transparent' : (TYPE_COLOR[n.type] ?? '#00E5C8'), border: n.isRead ? '1px solid rgba(0,229,200,0.2)' : 'none' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold" style={{ color: 'var(--white)' }}>{n.title}</p>
                      <p className="text-[10px] mt-0.5 line-clamp-2" style={{ color: 'var(--muted)' }}>{n.message}</p>
                      <p className="text-[9px] mt-1" style={{ color: 'rgba(96,120,150,0.6)' }}>{formatDate(n.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5" style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
                <Link href="/student/notifications" onClick={() => setShowPanel(false)}
                  className="block text-center text-xs font-semibold" style={{ color: '#00E5C8' }}>
                  View all
                </Link>
              </div>
            </div>
          )}
        </div>}

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <Link href={profileHref}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-xs cursor-pointer transition-all"
              style={{ background: 'rgba(0,229,200,0.15)', border: '1px solid rgba(0,229,200,0.3)', color: '#00E5C8' }}>
              {initials}
            </div>
          </Link>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold leading-none truncate max-w-[100px]" style={{ color: 'var(--white)' }}>{name}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
