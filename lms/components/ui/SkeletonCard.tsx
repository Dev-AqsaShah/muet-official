export function SkeletonCard({ lines = 3, height = 120 }: { lines?: number; height?: number }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)', minHeight: height }}>
      <div className="p-5 space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="skeleton rounded-lg"
            style={{ height: i === 0 ? 20 : 14, width: i === 0 ? '60%' : i % 2 === 0 ? '80%' : '45%' }} />
        ))}
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}>
      <div className="p-4 skeleton rounded-none" style={{ height: 48 }} />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-3.5"
          style={{ borderBottom: '1px solid rgba(0,229,200,0.04)' }}>
          <div className="skeleton rounded-xl" style={{ width: 36, height: 36, flexShrink: 0 }} />
          <div className="flex-1 space-y-2">
            <div className="skeleton rounded" style={{ height: 12, width: '40%' }} />
            <div className="skeleton rounded" style={{ height: 10, width: '25%' }} />
          </div>
          <div className="skeleton rounded-full" style={{ height: 22, width: 60 }} />
        </div>
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="space-y-2">
        <div className="skeleton rounded-lg" style={{ height: 28, width: '30%' }} />
        <div className="skeleton rounded-lg" style={{ height: 14, width: '20%' }} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton rounded-2xl" style={{ height: 100 }} />
        ))}
      </div>
      <SkeletonCard lines={4} height={200} />
      <SkeletonTable rows={4} />
    </div>
  )
}
