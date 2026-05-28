import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      <div className={cn('flex items-end justify-between gap-4', align === 'center' && 'flex-col items-center')}>
        <div>
          {eyebrow && (
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1B3A6B' }}>
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: '#1B3A6B' }}>
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-brand-gray text-base leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
