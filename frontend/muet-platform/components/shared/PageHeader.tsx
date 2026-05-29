import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb { label: string; href?: string }

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Crumb[]
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative pt-28 pb-16 px-4 overflow-hidden" style={{ background: '#020b18', borderBottom: '1px solid rgba(0,229,200,0.12)' }}>
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,229,200,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,200,0.3), transparent)' }} />

      <div className="relative max-w-7xl mx-auto">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1 text-xs mb-5" style={{ color: '#607896' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={12} />}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors" style={{ color: '#607896' }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: '#00e5c8' }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
          style={{ background: 'rgba(0,229,200,0.1)', color: '#00e5c8', border: '1px solid rgba(0,229,200,0.2)', letterSpacing: '0.12em' }}>
          MUET Training
        </span>

        <h1
          className="font-display font-extrabold leading-tight mb-4"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.03em', color: '#e8f4ff' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl leading-relaxed" style={{ color: 'rgba(232,244,255,0.5)', fontSize: '16px' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
