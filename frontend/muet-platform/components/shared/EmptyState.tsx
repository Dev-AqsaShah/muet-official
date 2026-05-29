import { SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title?: string
  description?: string
  className?: string
}

export default function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your filters or search terms.',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 text-center', className)}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)' }}>
        <SearchX size={28} style={{ color: '#607896' }} />
      </div>
      <h3 className="text-lg font-semibold mb-1" style={{ color: '#e8f4ff' }}>{title}</h3>
      <p className="text-sm max-w-xs" style={{ color: '#607896' }}>{description}</p>
    </div>
  )
}
