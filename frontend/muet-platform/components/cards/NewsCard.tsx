import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import ImageWithFallback from '@/components/shared/ImageWithFallback'
import { formatDate } from '@/lib/utils'
import type { NewsArticle } from '@/types'

type NewsCardProps = Pick<NewsArticle, 'slug' | 'title' | 'excerpt' | 'coverImage' | 'category' | 'publishedAt' | 'author'>

export default function NewsCard({ slug, title, excerpt, coverImage, category, publishedAt, author }: NewsCardProps) {
  return (
    <Link
      href={`/news/${slug}`}
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
        <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-brand-steel text-white text-xs font-medium rounded-full">
          {category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-steel transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Calendar size={12} />
            <span>{formatDate(publishedAt)}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-brand-steel text-sm font-medium group-hover:gap-2 transition-all">
            Read <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
