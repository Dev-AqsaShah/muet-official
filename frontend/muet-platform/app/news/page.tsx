'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  active === cat
                    ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/25'
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
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {shown.map(article => (
                <NewsCard key={article.slug} {...article} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
