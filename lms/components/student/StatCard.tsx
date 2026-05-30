import { type LucideIcon } from 'lucide-react'

interface StatCardProps {
  number: string | number
  label: string
  icon: LucideIcon
  color?: string
  sub?: string
}

export default function StatCard({ number, label, icon: Icon, color = '#00E5C8', sub }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{ background: '#061224', border: `1px solid ${color}20` }}
    >
      <div className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${color}08, transparent 65%)` }} />
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <p className="font-display font-semibold leading-none mb-1"
        style={{ fontSize: '26px', color, textShadow: `0 0 16px ${color}50` }}>
        {number}
      </p>
      <p className="text-xs" style={{ color: '#607896' }}>{label}</p>
      {sub && <p className="text-xs mt-1" style={{ color: '#607896' }}>{sub}</p>}
    </div>
  )
}
