const designs: Record<string, {
  bg: string
  accent: string
  secondaryAccent: string
  acronym: string
  acronymSub: string
  icon: JSX.Element
}> = {
  'bbshrrdb-skills-development': {
    bg: 'linear-gradient(135deg, #001233 0%, #012f6e 100%)',
    accent: '#3b82f6',
    secondaryAccent: '#60a5fa',
    acronym: 'BBSHRRDB',
    acronymSub: 'Skills Development',
    icon: (
      <g stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="0" cy="-18" r="14" opacity={0.9} />
        <line x1="-28" y1="10" x2="28" y2="10" strokeWidth="2.5" opacity={0.5} />
        <line x1="-20" y1="22" x2="20" y2="22" strokeWidth="2.5" opacity={0.3} />
        <line x1="0" y1="-4" x2="0" y2="10" />
        <line x1="-14" y1="10" x2="-22" y2="28" opacity={0.6} />
        <line x1="14" y1="10" x2="22" y2="28" opacity={0.6} />
        <circle cx="0" cy="-18" r="5" fill="#3b82f6" opacity={0.8} />
      </g>
    ),
  },
  'pitp': {
    bg: 'linear-gradient(135deg, #051c0a 0%, #0c3b18 100%)',
    accent: '#22c55e',
    secondaryAccent: '#86efac',
    acronym: 'PITP',
    acronymSub: 'AI & Computing',
    icon: (
      <g stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round">
        <circle cx="0" cy="0" r="8" fill="#22c55e" opacity={0.2} />
        <circle cx="0" cy="0" r="4" fill="#22c55e" opacity={0.9} />
        {[[-32,-18],[32,-18],[0,-36],[32,18],[-32,18],[0,36]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill="#22c55e" opacity={0.5} />
            <line x1="0" y1="0" x2={cx! * 0.55} y2={cy! * 0.55} opacity={0.35} strokeWidth="1.5" />
          </g>
        ))}
        <circle cx="0" cy="0" r="20" opacity={0.1} strokeWidth="1" />
        <circle cx="0" cy="0" r="34" opacity={0.07} strokeWidth="1" />
      </g>
    ),
  },
  'nftp-muet': {
    bg: 'linear-gradient(135deg, #0f0a1e 0%, #1e1040 100%)',
    accent: '#f97316',
    secondaryAccent: '#fdba74',
    acronym: 'NFTP',
    acronymSub: 'National Freelance',
    icon: (
      <g stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-30" y="-22" width="60" height="38" rx="5" opacity={0.85} />
        <line x1="-18" y1="-8" x2="2" y2="-8" opacity={0.6} strokeWidth="2.5" />
        <line x1="-18" y1="2" x2="10" y2="2" opacity={0.4} strokeWidth="2.5" />
        <line x1="-18" y1="12" x2="6" y2="12" opacity={0.25} strokeWidth="2.5" />
        <circle cx="18" cy="-4" r="10" stroke="#f97316" opacity={0.9} />
        <text x="18" y="0" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="bold"
              fill="#f97316" textAnchor="middle" opacity={0.9}>$</text>
        <line x1="-10" y1="28" x2="10" y2="28" strokeWidth="3" />
        <line x1="0" y1="16" x2="0" y2="28" strokeWidth="3" />
      </g>
    ),
  },
}

export default function ProjectCover({ slug, name }: { slug: string; name: string }) {
  const d = designs[slug]
  if (!d) {
    return (
      <div className="w-full h-full bg-brand-navy flex items-center justify-center">
        <span className="text-white/40 text-sm">{name}</span>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: d.bg }}>

      {/* Subtle grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${slug}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${slug})`} />
      </svg>

      {/* Glow blob */}
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl"
        style={{ background: d.accent }}
      />

      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: d.accent }} />

      {/* MUET logo — top left */}
      <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center"
        style={{ border: `1px solid ${d.accent}33` }}>
        <img src="/images/logos/muet-logo-official.png" alt="MUET" className="w-6 h-6 object-contain" />
      </div>

      {/* Project-specific logo — top right */}
      {slug === 'bbshrrdb-skills-development' && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-1.5 py-1 rounded-lg" style={{ background: '#015FC9' }}>
          <img src="/images/logos/bbshrrdb-official.png" alt="BBSHRRDB" className="w-4 h-4 object-contain" />
          <span className="text-white font-bold text-[8px] tracking-wide">BBSHRRDB</span>
        </div>
      )}
      {slug === 'pitp' && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-1.5 py-1 rounded-lg" style={{ background: '#1a5c2a' }}>
          <img src="/images/logos/sindh-gov-official.png" alt="Sindh Gov" className="w-4 h-4 object-contain" />
          <span className="text-white font-bold text-[8px] tracking-wide">Govt. Sindh</span>
        </div>
      )}
      {slug === 'nftp-muet' && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-1.5 py-1 rounded-lg" style={{ background: '#c2410c' }}>
          <img src="/images/logos/nftp-official.png" alt="NFTP" className="w-4 h-4 object-contain" />
          <span className="text-white font-bold text-[8px] tracking-wide">NFTP</span>
        </div>
      )}

      {/* Central icon */}
      <svg viewBox="-60 -50 120 100" className="absolute inset-0 w-full h-full" style={{ padding: '40px 20px 52px' }}>
        {d.icon}
      </svg>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 60%, transparent)' }}>
        <div className="h-0.5 w-5 rounded mb-1" style={{ background: d.accent }} />
        <p className="text-white font-bold text-xs leading-tight">{d.acronym}</p>
        <p className="text-white/50 text-[9px]">{d.acronymSub}</p>
      </div>
    </div>
  )
}
