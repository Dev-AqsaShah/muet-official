'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import MobileNav from './MobileNav'

export default function LMSShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar — hidden on mobile, replaced by bottom nav */}
      <div className={`lms-sidebar hidden md:flex flex-col ${sidebarOpen ? 'open' : ''}`}
        onClick={e => e.stopPropagation()}>
        <Sidebar />
      </div>

      {/* Mobile overlay sidebar (hamburger) */}
      <div className={`lms-sidebar flex flex-col md:hidden ${sidebarOpen ? 'open' : ''}`}
        onClick={e => e.stopPropagation()}>
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-[99] md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      <Topbar onMenuClick={() => setSidebarOpen(o => !o)} />
      <main className="lms-main">{children}</main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  )
}
