import Link from 'next/link'
import { MapPin, ArrowRight, CalendarDays } from 'lucide-react'
import type { Project } from '@/types'

type Props = Pick<Project, 'slug' | 'title' | 'shortDesc' | 'coverImage' | 'status' | 'fundingBody' | 'district' | 'startDate' | 'featured'>

const config: Record<string, { bg: string; accent: string; acronym: string; logo: string; funderLogo: string }> = {
  'bbshrrdb-skills-development': {
    bg:         '#064e3b',
    accent:     '#34d399',
    acronym:    'BBSHRRDB',
    logo:       '/images/logos/muet-logo-official.png',
    funderLogo: '/images/logos/bbshrrdb-official.png',
  },
  'pitp': {
    bg:         '#052e16',
    accent:     '#4ade80',
    acronym:    'PITP',
    logo:       '/images/logos/muet-logo-official.png',
    funderLogo: '/images/logos/sindh-gov-official.png',
  },
  'nftp-muet': {
    bg:         '#065f46',
    accent:     '#34d399',
    acronym:    'NFTP',
    logo:       '/images/logos/muet-logo-official.png',
    funderLogo: '/images/logos/nftp-official.png',
  },
}

const statusColor: Record<string, string> = {
  open:      '#4ade80',
  ongoing:   '#34d399',
  upcoming:  '#fbbf24',
  completed: '#94a3b8',
}

export default function ProjectCard({ slug, title, shortDesc, status, district, startDate }: Props) {
  const c = config[slug]
  if (!c) return null

  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-green/20"
      style={{ background: c.bg }}
    >
      {/* Accent top line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />

      {/* Hover glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at top right, ${c.accent}15 0%, transparent 60%)` }} />

      {/* Watermark acronym */}
      <div className="absolute bottom-0 right-0 font-black leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(56px, 10vw, 88px)', color: c.accent, opacity: 0.06,
          transform: 'translate(10%, 10%)', letterSpacing: '-3px' }}>
        {c.acronym}
      </div>

      <div className="relative flex flex-col flex-1 p-6">

        {/* Logo row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center ring-1 ring-white/10">
              <img src={c.logo} alt="MUET" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-white/35 text-[10px] font-bold tracking-widest uppercase">MUET</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-white/95 shadow-sm">
            <img src={c.funderLogo} alt={c.acronym} className="h-5 w-auto object-contain" />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusColor[status] ?? '#94a3b8' }} />
          <span className="text-[11px] font-semibold capitalize" style={{ color: statusColor[status] ?? '#94a3b8' }}>{status}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-lg leading-snug mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Desc */}
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
          {shortDesc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs text-white/30">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} style={{ color: c.accent }} />
              {district.length} districts
            </span>
            {startDate && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={11} style={{ color: c.accent }} />
                {new Date(startDate).getFullYear()}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: c.accent }}>
            View Project <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
