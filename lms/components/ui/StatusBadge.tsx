const colors: Record<string, { bg: string; color: string; border: string }> = {
  PENDING:      { bg: 'rgba(251,191,36,.1)',   color: '#FBBF24', border: 'rgba(251,191,36,.3)'  },
  APPROVED:     { bg: 'rgba(0,229,200,.1)',     color: '#00E5C8', border: 'rgba(0,229,200,.3)'  },
  REJECTED:     { bg: 'rgba(239,68,68,.1)',     color: '#EF4444', border: 'rgba(239,68,68,.3)'  },
  SUSPENDED:    { bg: 'rgba(239,68,68,.1)',     color: '#EF4444', border: 'rgba(239,68,68,.3)'  },
  SUBMITTED:    { bg: 'rgba(0,229,200,.1)',     color: '#00E5C8', border: 'rgba(0,229,200,.3)'  },
  GRADED:       { bg: 'rgba(129,140,248,.1)',   color: '#818CF8', border: 'rgba(129,140,248,.3)'},
  LATE:         { bg: 'rgba(239,68,68,.1)',     color: '#EF4444', border: 'rgba(239,68,68,.3)'  },
  PRESENT:      { bg: 'rgba(0,229,200,.1)',     color: '#00E5C8', border: 'rgba(0,229,200,.3)'  },
  ABSENT:       { bg: 'rgba(239,68,68,.1)',     color: '#EF4444', border: 'rgba(239,68,68,.3)'  },
  ACTIVE:       { bg: 'rgba(0,229,200,.1)',     color: '#00E5C8', border: 'rgba(0,229,200,.3)'  },
  COMPLETED:    { bg: 'rgba(129,140,248,.1)',   color: '#818CF8', border: 'rgba(129,140,248,.3)'},
  ELIGIBLE:     { bg: 'rgba(0,229,200,.1)',     color: '#00E5C8', border: 'rgba(0,229,200,.3)'  },
  'AT RISK':    { bg: 'rgba(251,191,36,.1)',    color: '#FBBF24', border: 'rgba(251,191,36,.3)' },
  'NOT ELIGIBLE':{ bg: 'rgba(239,68,68,.1)',   color: '#EF4444', border: 'rgba(239,68,68,.3)'  },
  URGENT:       { bg: 'rgba(239,68,68,.1)',     color: '#EF4444', border: 'rgba(239,68,68,.3)'  },
  NORMAL:       { bg: 'rgba(96,120,150,.1)',    color: '#607896', border: 'rgba(96,120,150,.3)' },
  PITP:         { bg: 'rgba(0,229,200,.1)',     color: '#00E5C8', border: 'rgba(0,229,200,.3)'  },
  BBSHRRDB:     { bg: 'rgba(251,191,36,.1)',    color: '#FBBF24', border: 'rgba(251,191,36,.3)' },
  NFTP:         { bg: 'rgba(56,189,248,.1)',    color: '#38BDF8', border: 'rgba(56,189,248,.3)' },
}

export default function StatusBadge({ status, pulse }: { status: string; pulse?: boolean }) {
  const c = colors[status.toUpperCase()] ?? colors.NORMAL
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: c.color, animation: 'blink 1.8s infinite' }} />
      )}
      {status}
    </span>
  )
}
