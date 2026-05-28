'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { getLatestNews } from '@/data/news'

export default function LatestNews() {
  const [featured, ...rest] = getLatestNews(4)
  if (!featured) return null

  return (
    <section className="py-24" style={{ background: '#f0fdf4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/15">
              Latest Updates
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-forest leading-tight">
              News &amp; Announcements
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-lg leading-relaxed">
              Programme results, batch launches, and impact stories from across Sindh.
            </p>
          </div>
          <Link href="/news" className="inline-flex items-center gap-1.5 text-brand-green font-semibold text-sm hover:text-brand-mid transition-colors shrink-0 mb-1">
            All News <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Featured — large card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3"
          >
            <Link
              href={`/news/${featured.slug}`}
              className="group flex flex-col h-full rounded-3xl overflow-hidden border border-gray-200 bg-white hover:shadow-2xl hover:shadow-brand-green/10 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-brand-green to-brand-light shrink-0" />

              <div className="flex flex-col flex-1 p-8">
                {/* Category + Date */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-brand-green/10 text-brand-green">
                    <Tag size={10} />
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={11} />
                    {new Date(featured.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h3 className="font-bold text-brand-forest text-xl md:text-2xl leading-snug mb-4 group-hover:text-brand-green transition-colors">
                  {featured.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6 line-clamp-4">
                  {featured.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm group-hover:gap-3 transition-all">
                  Read More <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Remaining — compact cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex-1"
              >
                <Link
                  href={`/news/${article.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white hover:shadow-xl hover:shadow-brand-green/8 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <h4 className="font-bold text-brand-forest text-sm leading-snug mb-2 group-hover:text-brand-green transition-colors line-clamp-2 flex-1">
                    {article.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <span className="text-xs font-semibold text-brand-green flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={11} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
