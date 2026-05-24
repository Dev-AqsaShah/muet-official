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
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <SearchX size={28} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      <p className="text-gray-400 text-sm max-w-xs">{description}</p>
    </div>
  )
}
