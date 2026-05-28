import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Breadcrumb { label: string; href?: string }
interface PageHeaderProps { title: string; subtitle?: string; breadcrumbs: Breadcrumb[]; className?: string }

export default function PageHeader({ title, subtitle, breadcrumbs, className }: PageHeaderProps) {
  return (
    <section className={cn('relative pt-28 pb-14 px-4 overflow-hidden', className)} style={{ background: '#064e3b' }}>
      {/* dot grid */}
      <div className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #34d399 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />
      {/* glow */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.3) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto">
        <nav className="flex items-center gap-1 text-xs text-white/40 mb-5 flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} />}
              {crumb.href
                ? <Link href={crumb.href} className="hover:text-brand-light transition-colors">{crumb.label}</Link>
                : <span className="text-white/80">{crumb.label}</span>
              }
            </span>
          ))}
        </nav>
        <h1 className="font-display text-3xl md:text-5xl text-white font-bold mb-4 leading-tight">{title}</h1>
        {subtitle && <p className="text-white/55 text-base md:text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  )
}
