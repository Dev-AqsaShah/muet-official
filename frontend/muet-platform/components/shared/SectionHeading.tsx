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
            <p className="text-brand-steel font-medium text-sm uppercase tracking-widest mb-2">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
