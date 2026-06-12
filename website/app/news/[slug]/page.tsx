import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { getArticleBySlug, getLatestNews, newsArticles } from '@/data/news'
import { formatDate } from '@/lib/utils'
import NewsCard from '@/components/cards/NewsCard'

export function generateStaticParams() {
  return newsArticles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | MUET Training Programs`,
    description: article.excerpt,
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getLatestNews(4).filter(a => a.slug !== slug).slice(0, 3)

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden bg-brand-navy">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-brand-navy/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-brand-steel text-white text-xs font-medium rounded-full mb-3">
              {article.category}
            </span>
            <h1 className="font-display text-2xl md:text-4xl text-white font-bold leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-brand-steel hover:underline font-medium">
            <ArrowLeft size={14} /> All News
          </Link>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(article.publishedAt)}
          </span>
          {article.author && (
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {article.author}
            </span>
          )}
        </div>

        {/* Content — markdown-style via whitespace-pre-line + prose */}
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line mb-12">
          {article.content}
        </div>

        {/* Related project */}
        {article.projectSlug && (
          <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-xl p-5 mb-12">
            <p className="text-sm text-gray-500 mb-1">Related Project</p>
            <Link href={`/projects/${article.projectSlug}`} className="text-brand-steel font-semibold hover:underline">
              View Project →
            </Link>
          </div>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">More News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map(a => <NewsCard key={a.slug} {...a} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
