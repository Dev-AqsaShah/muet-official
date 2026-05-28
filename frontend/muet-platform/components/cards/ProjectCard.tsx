import Link from 'next/link'
import { MapPin, ArrowRight, CalendarDays } from 'lucide-react'
import type { Project } from '@/types'

type ProjectCardProps = Pick<Project, 'slug' | 'title' | 'shortDesc' | 'coverImage' | 'status' | 'fundingBody' | 'district' | 'startDate' | 'featured'>

const config: Record<string, { bg: string; accent: string; acronym: string; logo: string; funderLogo: string }> = {
  'bbshrrdb-skills-development': {
    bg:         '#0a1628',
    accent:     '#3b82f6',
    acronym:    'BBSHRRDB',
    logo:       '/images/logos/muet-logo-official.png',
    funderLogo: '/images/logos/bbshrrdb-official.png',
  },
  'pitp': {
    bg:         '#071a0e',
    accent:     '#22c55e',
    acronym:    'PITP',
    logo:       '/images/logos/muet-logo-official.png',
    funderLogo: '/images/logos/sindh-gov-official.png',
  },
  'nftp-muet': {
    bg:         '#150d28',
    accent:     '#f97316',
    acronym:    'NFTP',
    logo:       '/images/logos/muet-logo-official.png',
    funderLogo: '/images/logos/nftp-official.png',
  },
}

const statusColor: Record<string, string> = {
  open:      '#22c55e',
  ongoing:   '#3b82f6',
  upcoming:  '#f59e0b',
  completed: '#6b7280',
}

export default function ProjectCard({ slug, title, shortDesc, status, district, startDate }: ProjectCardProps) {
  const c = config[slug]
  if (!c) return null

  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ background: c.bg }}
    >
      {/* Accent top line */}
      <div className="h-0.5 w-full" style={{ background: c.accent }} />

      {/* Watermark acronym */}
      <div
        className="absolute bottom-0 right-0 font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(64px, 12vw, 96px)',
          color: c.accent,
          opacity: 0.05,
          transform: 'translate(12%, 8%)',
          fontFamily: 'sans-serif',
          letterSpacing: '-2px',
        }}
      >
        {c.acronym}
      </div>

      <div className="relative flex flex-col flex-1 p-6">

        {/* Logo row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/10">
              <img src={c.logo} alt="MUET" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-white/40 text-[10px] font-semibold tracking-widest uppercase">MUET</span>
          </div>
          <div className="px-2 py-1 rounded-lg bg-white">
            <img src={c.funderLogo} alt={c.acronym} className="h-5 w-auto object-contain" />
          </div>
        </div>

        {/* Status dot + label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[status] ?? '#6b7280' }} />
          <span className="text-[11px] font-semibold capitalize" style={{ color: statusColor[status] ?? '#6b7280' }}>
            {status}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-lg leading-snug mb-2 line-clamp-2 group-hover:opacity-90 transition-opacity">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/45 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
          {shortDesc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs text-white/35">
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
