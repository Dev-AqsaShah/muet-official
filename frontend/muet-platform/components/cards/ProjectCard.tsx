import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, CalendarDays } from 'lucide-react'
import type { Project } from '@/types'

type Props = Pick<Project, 'slug' | 'title' | 'shortDesc' | 'coverImage' | 'status' | 'fundingBody' | 'district' | 'startDate' | 'featured'>

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active:    { bg: '#dcfce7', text: '#166534', label: 'Active' },
  ongoing:   { bg: '#dcfce7', text: '#166534', label: 'Ongoing' },
  completed: { bg: '#f1f5f9', text: '#475569', label: 'Completed' },
  upcoming:  { bg: '#fef3c7', text: '#92400e', label: 'Upcoming' },
}

const fundingConfig: Record<string, { bg: string; text: string }> = {
  'BBSHRRDB':             { bg: '#dbeafe', text: '#1e40af' },
  'Sindh Government':     { bg: '#d1fae5', text: '#065f46' },
  'Government of Pakistan': { bg: '#e0e7ff', text: '#3730a3' },
  'MUET':                 { bg: '#f0f9ff', text: '#0369a1' },
}

const coverFallback: Record<string, string> = {
  'bbshrrdb-skills-development': '/images/projects/bbshrrdb-banner.png',
  'pitp':                         '/images/projects/pitp-trainees.webp',
  'nftp-muet':                    '/images/hero/muet-campus.jpg',
}

export default function ProjectCard({ slug, title, shortDesc, coverImage, status, fundingBody, district, startDate }: Props) {
  const sc = statusConfig[status]   ?? statusConfig.active
  const fc = fundingConfig[fundingBody] ?? { bg: '#f1f5f9', text: '#475569' }
  const imgSrc = coverImage || coverFallback[slug] || '/images/hero/muet-campus.jpg'

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
      style={{ boxShadow: '0 2px 12px rgba(70,130,180,0.08)' }}
    >
      {/* Cover image — 16:9 */}
      <div className="relative aspect-video overflow-hidden bg-brand-offwhite shrink-0">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>
            {sc.label}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: fc.bg, color: fc.text }}>
            {fundingBody}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-steel transition-colors" style={{ color: '#1B3A6B' }}>
          {title}
        </h3>

        {/* Desc */}
        <p className="text-brand-gray text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {shortDesc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-brand-steel" />
              {district.length} district{district.length !== 1 ? 's' : ''}
            </span>
            {startDate && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={11} className="text-brand-steel" />
                {new Date(startDate).getFullYear()}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: '#4682B4' }}>
            View Project <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
