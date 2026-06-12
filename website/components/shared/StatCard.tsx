import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  Icon: LucideIcon
  variant?: 'light' | 'colored'
  className?: string
}

export default function StatCard({ label, value, Icon, variant = 'light', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center p-6 rounded-xl',
        variant === 'colored'
          ? 'bg-white/10 text-white'
          : 'bg-white border border-gray-100 shadow-sm',
        className
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center mb-3',
          variant === 'colored' ? 'bg-white/15' : 'bg-brand-baby/20'
        )}
      >
        <Icon size={22} className={variant === 'colored' ? 'text-white' : 'text-brand-steel'} />
      </div>
      <p className={cn('text-3xl font-bold mb-1', variant === 'colored' ? 'text-white' : 'text-brand-navy')}>
        {value}
      </p>
      <p className={cn('text-sm font-medium', variant === 'colored' ? 'text-white/70' : 'text-gray-500')}>
        {label}
      </p>
    </div>
  )
}
