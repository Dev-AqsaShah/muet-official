import { cn } from '@/lib/utils'
import type { ProjectStatus, ProgramStatus } from '@/types'

type StatusType = ProjectStatus | ProgramStatus

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  active:    { label: 'Active',     className: 'bg-green-100 text-green-800' },
  completed: { label: 'Completed',  className: 'bg-gray-100 text-gray-700' },
  upcoming:  { label: 'Upcoming',   className: 'bg-amber-100 text-amber-800' },
  open:      { label: 'Open',       className: 'bg-blue-100 text-blue-800' },
  ongoing:   { label: 'Ongoing',    className: 'bg-green-100 text-green-800' },
  full:      { label: 'Full',       className: 'bg-red-100 text-red-800' },
}

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' }
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.className, className)}>
      {config.label}
    </span>
  )
}
