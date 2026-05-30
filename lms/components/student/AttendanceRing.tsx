'use client'
import { useEffect, useRef } from 'react'

interface AttendanceRingProps {
  percent: number
  present: number
  total: number
  size?: number
}

export default function AttendanceRing({ percent, present, total, size = 140 }: AttendanceRingProps) {
  const status = percent >= 90 ? 'eligible' : percent >= 75 ? 'at-risk' : 'not-eligible'
  const color  = status === 'eligible' ? '#00E5C8' : status === 'at-risk' ? '#FBBF24' : '#EF4444'
  const label  = status === 'eligible' ? 'Eligible ✓' : status === 'at-risk' ? 'At Risk ⚠' : 'Not Eligible ✗'

  const r = (size / 2) - 10
  const circ = 2 * Math.PI * r
  const dash = (percent / 100) * circ

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dasharray 1.2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-2xl" style={{ color }}>{percent.toFixed(0)}%</span>
          <span className="text-xs" style={{ color: '#607896' }}>{present}/{total} days</span>
        </div>
      </div>
      <span className="text-xs font-semibold px-3 py-1 rounded-full"
        style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
        {label}
      </span>
    </div>
  )
}
