import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import StatusBadge from '@/components/shared/StatusBadge'
import FundingBadge from '@/components/shared/FundingBadge'
import ImageWithFallback from '@/components/shared/ImageWithFallback'
import type { Project } from '@/types'

type ProjectCardProps = Pick<Project, 'slug' | 'title' | 'shortDesc' | 'coverImage' | 'status' | 'fundingBody' | 'district' | 'startDate' | 'featured'>

export default function ProjectCard({ slug, title, shortDesc, coverImage, status, fundingBody, district }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={coverImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          fallbackClassName="absolute inset-0"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <StatusBadge status={status} />
          <FundingBadge fundingBody={fundingBody} />
        </div>

        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {shortDesc}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin size={12} />
            <span>{district.slice(0, 2).join(', ')}{district.length > 2 ? ` +${district.length - 2}` : ''}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-brand-steel text-sm font-medium group-hover:gap-2 transition-all">
            View Project <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
