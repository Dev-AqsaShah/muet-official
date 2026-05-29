'use client'
import Link from 'next/link'
import { MapPin, ArrowRight, CalendarDays } from 'lucide-react'
import type { Project } from '@/types'

type Props = Pick<Project, 'slug' | 'title' | 'shortDesc' | 'coverImage' | 'status' | 'fundingBody' | 'district' | 'startDate' | 'featured'>

const accentByFunder: Record<string, string> = {
  'BBSHRRDB':               '#fbbf24',
  'Sindh Government':       '#00e5c8',
  'Government of Pakistan': '#38bdf8',
  'MUET':                   '#818cf8',
}

export default function ProjectCard({ slug, title, shortDesc, status, fundingBody, district, startDate }: Props) {
  const accent = accentByFunder[fundingBody] ?? '#00e5c8'
  const isActive = status === 'active'

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: '#061224', border: `1px solid ${accent}20` }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${accent}40`; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.45), 0 0 40px ${accent}10` }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = `${accent}20`; el.style.transform = ''; el.style.boxShadow = '' }}
    >
      {/* Accent top bar */}
      <div className="h-1 shrink-0" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      {/* Visual panel */}
      <div className="relative h-28 flex items-center justify-center p-6" style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div
          className="relative w-16 h-16 rounded-full flex items-center justify-center font-display font-extrabold text-lg"
          style={{ border: `2px solid ${accent}40`, background: `${accent}10`, color: accent, textShadow: `0 0 16px ${accent}` }}
        >
          {title.split(' ').map(w => w[0]).join('').slice(0, 3)}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded"
            style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, animation: isActive ? 'blink 1.8s infinite' : 'none' }} />
            {isActive ? 'Active' : 'Completed'}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider" style={{ color: accent }}>
            {fundingBody}
          </span>
        </div>

        <h3 className="font-display font-bold text-base leading-snug mb-2 line-clamp-2" style={{ color: '#e8f4ff' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2 flex-1 mb-4" style={{ color: 'rgba(232,244,255,0.5)' }}>
          {shortDesc}
        </p>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
          <div className="flex items-center gap-3 text-xs" style={{ color: '#607896' }}>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} style={{ color: accent }} />
              {district.length} district{district.length !== 1 ? 's' : ''}
            </span>
            {startDate && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={11} style={{ color: accent }} />
                {new Date(startDate).getFullYear()}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: accent }}>
            View <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  )
}
