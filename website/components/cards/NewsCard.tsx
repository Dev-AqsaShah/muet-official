'use client'
import Link from 'next/link'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { NewsArticle } from '@/types'

type NewsCardProps = Pick<NewsArticle, 'slug' | 'title' | 'excerpt' | 'coverImage' | 'category' | 'publishedAt' | 'author'>

export default function NewsCard({ slug, title, excerpt, category, publishedAt }: NewsCardProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.25)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(0,229,200,0.06)' }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.1)'; el.style.transform = ''; el.style.boxShadow = '' }}
    >
      <div className="h-0.5 shrink-0" style={{ background: 'linear-gradient(90deg, #00e5c8, transparent)' }} />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full"
            style={{ background: 'rgba(0,229,200,0.1)', color: '#00e5c8', border: '1px solid rgba(0,229,200,0.2)' }}>
            <Tag size={9} />{category}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#607896' }}>
            <Calendar size={11} />
            {formatDate(publishedAt)}
          </span>
        </div>

        <h3 className="font-display font-bold text-base leading-snug mb-3 line-clamp-2 flex-1" style={{ color: '#e8f4ff' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2 mb-5" style={{ color: 'rgba(232,244,255,0.5)' }}>{excerpt}</p>

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: '#00e5c8' }}>
          Read More <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}
