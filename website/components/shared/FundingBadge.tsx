import { cn } from '@/lib/utils'
import type { FundingBody } from '@/types'

const fundingConfig: Record<FundingBody, { label: string; className: string }> = {
  'BBSHRRDB':               { label: 'BBSHRRDB',         className: 'bg-emerald-100 text-emerald-800' },
  'Sindh Government':       { label: 'Govt of Sindh',    className: 'bg-sky-100 text-brand-navy' },
  'Government of Pakistan': { label: 'Govt of Pakistan', className: 'bg-green-100 text-green-800' },
  'MUET':                   { label: 'MUET',             className: 'bg-blue-100 text-brand-steel' },
  'Other':                  { label: 'Other',            className: 'bg-gray-100 text-gray-700' },
}

interface FundingBadgeProps {
  fundingBody: FundingBody
  className?: string
}

export default function FundingBadge({ fundingBody, className }: FundingBadgeProps) {
  const config = fundingConfig[fundingBody] ?? { label: fundingBody, className: 'bg-gray-100 text-gray-700' }
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.className, className)}>
      {config.label}
    </span>
  )
}
