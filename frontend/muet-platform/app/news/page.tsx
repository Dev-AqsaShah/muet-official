'use client'
import { useState, useMemo } from 'react'
import { newsArticles } from '@/data/news'
import PageHeader from '@/components/shared/PageHeader'
import NewsCard from '@/components/cards/NewsCard'
import EmptyState from '@/components/shared/EmptyState'

const categories = ['All', 'Achievement', 'Project Update', 'Announcement', 'Impact Story']

export default function NewsPage() {
  const [active, setActive] = useState('All')

  const shown = useMemo(() =>
    active === 'All' ? newsArticles : newsArticles.filter(a => a.category === active),
    [active]
  )

  return (
    <>
      <PageHeader
        title="News & Announcements"
        subtitle="Programme results, batch launches, impact stories, and updates from MUET's government training initiatives."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  active === cat
                    ? 'bg-brand-green text-white border-brand-green shadow-sm shadow-brand-green/30'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-green hover:text-brand-green'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map(article => (
                <NewsCard key={article.slug} {...article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
