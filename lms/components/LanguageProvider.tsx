'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { en, ur, type Translations } from '@/lib/i18n'

type Lang = 'en' | 'ur'

interface LangCtxType {
  lang: Lang
  t: Translations
  toggle: () => void
  isUrdu: boolean
}

const LangCtx = createContext<LangCtxType>({ lang: 'en', t: en, toggle: () => {}, isUrdu: false })

export function useLang() { return useContext(LangCtx) }

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lms-lang') as Lang | null
    if (saved === 'en' || saved === 'ur') setLang(saved)
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (lang === 'ur') {
      html.setAttribute('dir', 'rtl')
      html.setAttribute('lang', 'ur')
      document.body.style.fontFamily = "'Noto Nastaliq Urdu', 'var(--font-sans)', sans-serif"
    } else {
      html.setAttribute('dir', 'ltr')
      html.setAttribute('lang', 'en')
      document.body.style.fontFamily = 'var(--font-sans), sans-serif'
    }
    localStorage.setItem('lms-lang', lang)
  }, [lang])

  const toggle = () => setLang(l => l === 'en' ? 'ur' : 'en')
  const t = lang === 'ur' ? ur : en

  return (
    <LangCtx.Provider value={{ lang, t, toggle, isUrdu: lang === 'ur' }}>
      {children}
    </LangCtx.Provider>
  )
}
