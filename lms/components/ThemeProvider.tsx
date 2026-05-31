'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} })

export function useTheme() { return useContext(ThemeCtx) }

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('lms-theme') as Theme | null
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.style.setProperty('--bg',    '#F0F4F8')
      root.style.setProperty('--bg2',   '#FFFFFF')
      root.style.setProperty('--bg3',   '#E2E8F0')
      root.style.setProperty('--white', '#0F172A')
      root.style.setProperty('--muted', '#64748B')
      root.style.setProperty('--border','rgba(0,184,163,.2)')
      document.body.style.background = '#F0F4F8'
      document.body.style.color      = '#0F172A'
    } else {
      root.style.setProperty('--bg',    '#020B18')
      root.style.setProperty('--bg2',   '#061224')
      root.style.setProperty('--bg3',   '#0C1E35')
      root.style.setProperty('--white', '#E8F4FF')
      root.style.setProperty('--muted', '#607896')
      root.style.setProperty('--border','rgba(0,229,200,.12)')
      document.body.style.background = '#020B18'
      document.body.style.color      = '#E8F4FF'
    }
    localStorage.setItem('lms-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}
