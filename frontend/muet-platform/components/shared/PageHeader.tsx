import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs: Breadcrumb[]
  className?: string
}

export default function PageHeader({ title, subtitle, breadcrumbs, className }: PageHeaderProps) {
  return (
    <section className={cn('bg-brand-navy pt-24 pb-12 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-white/50 mb-4 flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/80">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="font-display text-3xl md:text-4xl text-white font-bold mb-3">{title}</h1>
        {subtitle && (
          <p className="text-white/60 text-base md:text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
