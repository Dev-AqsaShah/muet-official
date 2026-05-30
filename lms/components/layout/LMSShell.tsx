'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function LMSShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#020B18' }}>
      <div
        className={`lms-sidebar ${sidebarOpen ? 'open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <Sidebar />
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-[99] md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}
      <Topbar onMenuClick={() => setSidebarOpen(o => !o)} />
      <main className="lms-main">{children}</main>
    </div>
  )
}
