// Inline program cover — renders as JSX, no external image files needed

const accents: Record<string, string> = {
  'web-development':                '#2563eb',
  'graphic-designing-ui-ux':        '#7c3aed',
  'digital-marketing-seo':          '#ea580c',
  'python-development':             '#d97706',
  'mobile-app-development':         '#059669',
  'data-science':                   '#6d28d9',
  'e-commerce':                     '#16a34a',
  'java-development':               '#dc2626',
  'database-management':            '#0891b2',
  'cloud-computing':                '#0284c7',
  'cyber-security':                 '#475569',
  'social-media-management':        '#9333ea',
  'technical-freelancing':          '#0d9488',
  'content-marketing-advertising':  '#b45309',
  'creative-design-freelancing':    '#be185d',
}

const icons: Record<string, JSX.Element> = {
  'web-development': (
    <g stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <polyline points="-38,-14 -55,0 -38,14" />
      <line x1="-22" y1="-22" x2="-8" y2="22" opacity={0.55} />
      <polyline points="8,-14 25,0 8,14" />
    </g>
  ),
  'graphic-designing-ui-ux': (
    <g stroke="#1e3a8a" strokeWidth="4.5" strokeLinecap="round" fill="none">
      <rect x="-32" y="-32" width="32" height="64" rx="16" />
      <rect x="8" y="-32" width="32" height="40" rx="16" />
      <rect x="8" y="16" width="32" height="32" rx="16" />
      <circle cx="-16" cy="0" r="5" fill="#1e3a8a" opacity={0.7} />
    </g>
  ),
  'digital-marketing-seo': (
    <g stroke="#1e3a8a" strokeWidth="4.5" strokeLinecap="round" fill="none">
      <rect x="-42" y="10" width="16" height="22" rx="2" />
      <rect x="-18" y="-10" width="16" height="42" rx="2" />
      <rect x="6" y="-28" width="16" height="60" rx="2" />
      <circle cx="36" cy="-14" r="14" />
      <line x1="46" y1="-4" x2="56" y2="6" />
    </g>
  ),
  'python-development': (
    <g stroke="#1e3a8a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M-8,-32 C-8,-44 8,-44 8,-32 L8,-8 C8,4 -8,4 -8,-8 Z" />
      <path d="M8,32 C8,44 -8,44 -8,32 L-8,8 C-8,-4 8,-4 8,8 Z" />
      <line x1="-8" y1="-8" x2="8" y2="8" />
      <circle cx="-2" cy="-22" r="4" fill="#1e3a8a" opacity={0.8} />
      <circle cx="2" cy="22" r="4" fill="#1e3a8a" opacity={0.8} />
    </g>
  ),
  'mobile-app-development': (
    <g stroke="#1e3a8a" strokeLinecap="round" fill="none">
      <rect x="-22" y="-38" width="44" height="76" rx="8" strokeWidth="4.5" />
      <line x1="-8" y1="-38" x2="8" y2="-38" strokeWidth="4.5" />
      <circle cx="0" cy="32" r="4" fill="#1e3a8a" opacity={0.75} />
      <rect x="-12" y="-24" width="24" height="44" rx="3" strokeWidth="2.5" opacity={0.35} />
    </g>
  ),
  'data-science': (
    <g fill="none">
      <circle cx="0" cy="0" r="10" stroke="#1e3a8a" strokeWidth="3.5" />
      {[[-38,0],[34,-20],[34,20],[0,38],[-34,20],[-34,-20]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="7" stroke="#1e3a8a" strokeWidth="3.5" />
      ))}
      <line x1="0" y1="-10" x2="0" y2="-31" stroke="#1e3a8a" strokeWidth="2" />
      <line x1="9" y1="-5" x2="27" y2="-14" stroke="#1e3a8a" strokeWidth="2" />
      <line x1="9" y1="5" x2="27" y2="14" stroke="#1e3a8a" strokeWidth="2" />
      <line x1="0" y1="10" x2="0" y2="31" stroke="#1e3a8a" strokeWidth="2" />
      <line x1="-9" y1="5" x2="-27" y2="14" stroke="#1e3a8a" strokeWidth="2" />
      <line x1="-9" y1="-5" x2="-27" y2="-14" stroke="#1e3a8a" strokeWidth="2" />
      <circle cx="0" cy="0" r="4" fill="#2563eb" />
    </g>
  ),
  'e-commerce': (
    <g stroke="#1e3a8a" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M-50,-20 L-36,-20 L-18,24 L32,24" strokeWidth="4.5" />
      <line x1="-30" y1="-8" x2="36" y2="-8" strokeWidth="4" />
      <line x1="-24" y1="8" x2="34" y2="8" strokeWidth="4" />
      <circle cx="-4" cy="34" r="7" strokeWidth="4.5" />
      <circle cx="24" cy="34" r="7" strokeWidth="4.5" />
    </g>
  ),
  'java-development': (
    <g stroke="#1e3a8a" strokeLinecap="round" fill="none">
      <ellipse cx="0" cy="-20" rx="24" ry="14" strokeWidth="4.5" />
      <line x1="-24" y1="-20" x2="-24" y2="22" strokeWidth="4.5" />
      <line x1="24" y1="-20" x2="24" y2="22" strokeWidth="4.5" />
      <path d="M-24,22 Q0,38 24,22" strokeWidth="4.5" />
      <line x1="-8" y1="2" x2="8" y2="2" strokeWidth="3" opacity={0.45} />
    </g>
  ),
  'database-management': (
    <g stroke="#1e3a8a" strokeLinecap="round" fill="none">
      <ellipse cx="0" cy="-28" rx="30" ry="11" strokeWidth="4.5" />
      <line x1="-30" y1="-28" x2="-30" y2="28" strokeWidth="4.5" />
      <line x1="30" y1="-28" x2="30" y2="28" strokeWidth="4.5" />
      <path d="M-30,-4 Q0,8 30,-4" strokeWidth="4" />
      <path d="M-30,20 Q0,32 30,20" strokeWidth="4" />
      <ellipse cx="0" cy="28" rx="30" ry="11" strokeWidth="4.5" />
    </g>
  ),
  'cloud-computing': (
    <g stroke="#1e3a8a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M-42,6 Q-44,-22 -18,-24 Q-16,-44 12,-40 Q24,-54 46,-30 Q60,-26 56,6 Z" />
      <line x1="0" y1="6" x2="0" y2="34" />
      <polyline points="-16,20 0,6 16,20" />
    </g>
  ),
  'cyber-security': (
    <g stroke="#1e3a8a" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M0,-40 L44,-18 L44,14 C44,38 24,52 0,60 C-24,52 -44,38 -44,14 L-44,-18 Z" strokeWidth="5" opacity={0.9} />
      <rect x="-14" y="6" width="28" height="22" rx="4" strokeWidth="4" opacity={0.85} />
      <path d="M-8,6 L-8,-2 C-8,-10 8,-10 8,-2 L8,6" strokeWidth="4" opacity={0.85} />
      <circle cx="0" cy="17" r="3" fill="#1e3a8a" opacity={0.85} />
    </g>
  ),
  'social-media-management': (
    <g stroke="#1e3a8a" strokeLinecap="round" fill="none">
      <circle cx="-32" cy="0" r="13" strokeWidth="4.5" />
      <circle cx="32" cy="-22" r="13" strokeWidth="4.5" />
      <circle cx="32" cy="22" r="13" strokeWidth="4.5" />
      <line x1="-19" y1="-6" x2="19" y2="-18" strokeWidth="3.5" />
      <line x1="-19" y1="6" x2="19" y2="18" strokeWidth="3.5" />
      <circle cx="-32" cy="0" r="4.5" fill="#1e3a8a" opacity={0.6} />
      <circle cx="32" cy="-22" r="4.5" fill="#1e3a8a" opacity={0.6} />
      <circle cx="32" cy="22" r="4.5" fill="#1e3a8a" opacity={0.6} />
    </g>
  ),
  'technical-freelancing': (
    <g stroke="#1e3a8a" strokeLinecap="round" fill="none">
      <rect x="-46" y="-24" width="92" height="56" rx="6" strokeWidth="4.5" />
      <rect x="-38" y="-16" width="76" height="40" rx="3" strokeWidth="2.5" opacity={0.35} />
      <rect x="-16" y="32" width="32" height="8" rx="2" strokeWidth="3.5" />
      <line x1="-26" y1="40" x2="26" y2="40" strokeWidth="3.5" />
      <text x="0" y="12" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="bold"
            fill="#1e3a8a" textAnchor="middle" opacity={0.85}>$</text>
    </g>
  ),
  'content-marketing-advertising': (
    <g stroke="#1e3a8a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M-48,18 L-48,-8 L-18,-30 L28,-8 L28,18" />
      <path d="M-18,-30 C-18,-50 28,-50 28,-8" />
      <line x1="-48" y1="18" x2="28" y2="18" />
      <line x1="28" y1="-8" x2="52" y2="-28" />
      <circle cx="52" cy="-28" r="9" opacity={0.85} />
      <circle cx="52" cy="-28" r="3.5" fill="#1e3a8a" opacity={0.8} />
    </g>
  ),
  'creative-design-freelancing': (
    <g fill="none" stroke="#1e3a8a" strokeWidth="4">
      <circle cx="0" cy="-20" r="10" />
      <circle cx="-22" cy="12" r="10" />
      <circle cx="22" cy="12" r="10" />
      <circle cx="0" cy="30" r="10" />
      <circle cx="0" cy="-20" r="4" fill="#7c3aed" opacity={0.9} />
      <circle cx="-22" cy="12" r="4" fill="#2563eb" opacity={0.9} />
      <circle cx="22" cy="12" r="4" fill="#be185d" opacity={0.9} />
      <circle cx="0" cy="30" r="4" fill="#b45309" opacity={0.9} />
      <line x1="0" y1="-10" x2="-14" y2="4" strokeWidth="2" opacity={0.35} />
      <line x1="0" y1="-10" x2="14" y2="4" strokeWidth="2" opacity={0.35} />
    </g>
  ),
}

export default function ProgramCover({ slug, name }: { slug: string; name: string }) {
  const accent = accents[slug] ?? '#2563eb'
  const icon   = icons[slug]

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e0f0ff 0%, #c8e0f8 100%)' }}>

      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accent }} />

      {/* Subtle ring decoration */}
      <svg className="absolute top-0 right-0 w-40 h-40 opacity-[0.06]" viewBox="0 0 160 160">
        <circle cx="130" cy="30" r="110" fill="none" stroke="#1e3a8a" strokeWidth="1" />
        <circle cx="130" cy="30" r="70"  fill="none" stroke="#1e3a8a" strokeWidth="1" />
        <circle cx="130" cy="30" r="35"  fill="none" stroke="#1e3a8a" strokeWidth="1" />
      </svg>

      {/* MUET logo — top left */}
      <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center" style={{ border: '1px solid rgba(30,58,138,0.15)' }}>
        <img src="/images/logos/muet-logo-official.png" alt="MUET" className="w-8 h-8 object-contain" />
      </div>

      {/* BBSHRRDB badge — top right */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: '#015FC9' }}>
        <div className="w-6 h-6 rounded flex items-center justify-center bg-white/20 shrink-0">
          <img src="/images/logos/bbshrrdb-official.png" alt="BBSHRRDB" className="w-5 h-5 object-contain" />
        </div>
        <div className="leading-tight">
          <p className="text-white font-bold text-[8px] tracking-wide">BBSHRRDB</p>
          <p className="text-white/70 text-[6.5px]">Govt. of Sindh</p>
        </div>
      </div>

      {/* Program icon centered */}
      {icon && (
        <svg viewBox="-80 -80 160 160" className="absolute inset-0 w-full h-full" style={{ padding: '42px 16px 56px' }}>
          {icon}
        </svg>
      )}

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(to top, rgba(200,224,248,0.98) 60%, transparent)' }}>
        <div className="h-0.5 w-6 rounded mb-1.5" style={{ background: accent }} />
        <p className="text-[#1e3a8a] font-bold text-sm leading-tight">{name}</p>
        <p className="text-[#1e40af] text-[9px] opacity-60 mt-0.5">MUET Training Programme</p>
      </div>
    </div>
  )
}
