'use client'
import { useSession } from 'next-auth/react'
import { Bell, Menu } from 'lucide-react'

interface TopbarProps {
  onMenuClick?: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { data: session } = useSession()
  const name = session?.user?.name ?? 'Student'
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="lms-topbar px-6 justify-between">
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={onMenuClick}
          style={{ color: '#607896' }}>
          <Menu size={20} />
        </button>
        <div className="text-xs hidden sm:block" style={{ color: '#607896' }}>
          {new Date().toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{ background: 'rgba(0,229,200,0.06)', border: '1px solid rgba(0,229,200,0.15)', color: '#607896' }}>
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: '#00E5C8', animation: 'blink 1.8s infinite' }} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-xs"
            style={{ background: 'rgba(0,229,200,0.15)', border: '1px solid rgba(0,229,200,0.3)', color: '#00E5C8' }}>
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold leading-none" style={{ color: '#E8F4FF' }}>{name}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
