'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getLatestNews } from '@/data/news'
import SectionHeading from '@/components/shared/SectionHeading'
import NewsCard from '@/components/cards/NewsCard'

export default function LatestNews() {
  const articles = getLatestNews(3)

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Latest Updates"
          title="News & Announcements"
          description="Programme results, new batch launches, and impact stories from across Sindh."
          action={
            <Link href="/news" className="inline-flex items-center gap-1.5 text-brand-steel font-medium text-sm hover:underline shrink-0">
              All News <ArrowRight size={16} />
            </Link>
          }
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {articles.map(article => (
            <motion.div
              key={article.slug}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <NewsCard {...article} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
