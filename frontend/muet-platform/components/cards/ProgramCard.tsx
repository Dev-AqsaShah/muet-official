import Link from 'next/link'
import { Clock, Users, MapPin, ArrowRight } from 'lucide-react'
import StatusBadge from '@/components/shared/StatusBadge'
import ImageWithFallback from '@/components/shared/ImageWithFallback'
import { cn } from '@/lib/utils'
import type { Program } from '@/types'

type ProgramCardProps = Pick<Program, 'slug' | 'title' | 'shortDesc' | 'coverImage' | 'status' | 'mode' | 'duration' | 'seats' | 'projectSlug' | 'location'>

const modeStyle: Record<string, string> = {
  physical: 'bg-purple-100 text-purple-700',
  online:   'bg-teal-100 text-teal-700',
  hybrid:   'bg-orange-100 text-orange-700',
}

export default function ProgramCard({ slug, title, shortDesc, coverImage, status, mode, duration, seats, location }: ProgramCardProps) {
  return (
    <Link
      href={`/programs/${slug}`}
      className="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={coverImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          fallbackClassName="absolute inset-0"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <StatusBadge status={status} />
          <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize', modeStyle[mode] ?? 'bg-gray-100 text-gray-700')}>
            {mode}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">{shortDesc}</p>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Clock size={12} />{duration}</span>
          <span className="flex items-center gap-1"><Users size={12} />{seats} seats</span>
          {location && <span className="flex items-center gap-1"><MapPin size={12} />{location.split(' ')[0]}</span>}
        </div>

        <span className="inline-flex items-center gap-1 text-brand-steel text-sm font-medium group-hover:gap-2 transition-all">
          Learn More <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}
