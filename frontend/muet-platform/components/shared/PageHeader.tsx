import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Breadcrumb { label: string; href?: string }
interface PageHeaderProps { title: string; subtitle?: string; breadcrumbs: Breadcrumb[]; className?: string }

export default function PageHeader({ title, subtitle, breadcrumbs, className }: PageHeaderProps) {
  return (
    <section className={cn('relative pt-28 pb-16 px-4 overflow-hidden', className)} style={{ background: '#1B3A6B' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #89CFF0 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />
      {/* Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(70,130,180,0.35) 0%, transparent 70%)' }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(27,58,107,0.4))' }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-xs text-white/35 mb-6 flex-wrap">
          <Home size={11} className="shrink-0" />
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={11} className="shrink-0" />}
              {crumb.href
                ? <Link href={crumb.href} className="hover:text-brand-baby transition-colors font-medium">{crumb.label}</Link>
                : <span className="text-white/75 font-semibold">{crumb.label}</span>
              }
            </span>
          ))}
        </nav>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/55 text-base md:text-lg max-w-2xl leading-relaxed mt-3">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
