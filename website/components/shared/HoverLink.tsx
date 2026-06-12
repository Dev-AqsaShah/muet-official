'use client'
import Link from 'next/link'
import { type ReactNode } from 'react'

interface HoverLinkProps {
  href: string
  accent?: string
  borderBase?: string
  borderHover?: string
  bgBase?: string
  bgHover?: string
  shadowHover?: string
  className?: string
  children: ReactNode
  style?: React.CSSProperties
}

export default function HoverLink({
  href, accent = '#00e5c8',
  borderBase, borderHover, bgBase, bgHover, shadowHover,
  className, children, style,
}: HoverLinkProps) {
  const base = borderBase ?? `${accent}20`
  const hover = borderHover ?? `${accent}30`
  const bg = bgBase ?? '#020b18'
  const bgH = bgHover ?? `${accent}05`

  return (
    <Link
      href={href}
      className={className}
      style={{ border: `1px solid ${base}`, background: bg, ...style }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = hover
        if (bgH) el.style.background = bgH
        if (shadowHover) el.style.boxShadow = shadowHover
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = base
        el.style.background = bg
        el.style.boxShadow = ''
      }}
    >
      {children}
    </Link>
  )
}
