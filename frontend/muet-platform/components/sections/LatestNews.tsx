'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { getLatestNews } from '@/data/news'

export default function LatestNews() {
  const [featured, ...rest] = getLatestNews(4)
  if (!featured) return null

  return (
    <section className="py-24 relative" style={{ background: '#020b18', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #00e5c8, transparent)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>Latest Updates</span>
            </div>
            <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
              News &amp; Announcements
            </h2>
            <p className="text-sm mt-2 max-w-lg leading-relaxed" style={{ color: 'rgba(232,244,255,0.5)' }}>
              Programme results, batch launches, and impact stories from across Sindh.
            </p>
          </div>
          <Link href="/news" className="inline-flex items-center gap-1.5 font-semibold text-sm shrink-0 mb-1 transition-all" style={{ color: '#00e5c8' }}>
            All News <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3"
          >
            <Link
              href={`/news/${featured.slug}`}
              className="group flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300"
              style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.3)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,229,200,0.08)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.1)'; el.style.transform = ''; el.style.boxShadow = '' }}
            >
              <div className="h-1 shrink-0" style={{ background: 'linear-gradient(90deg, #00e5c8, #38bdf8)' }} />
              <div className="flex flex-col flex-1 p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(0,229,200,0.1)', color: '#00e5c8', border: '1px solid rgba(0,229,200,0.2)' }}>
                    <Tag size={10} />{featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: '#607896' }}>
                    <Calendar size={11} />
                    {new Date(featured.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl leading-snug mb-4 transition-colors" style={{ color: '#e8f4ff' }}>
                  {featured.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1 mb-6 line-clamp-4" style={{ color: 'rgba(232,244,255,0.55)' }}>{featured.excerpt}</p>
                <span className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all" style={{ color: '#00e5c8' }}>
                  Read More <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Compact cards */}
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
                  className="group flex flex-col h-full rounded-2xl transition-all duration-300 p-5"
                  style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.08)' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.25)'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)' }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.08)'; el.style.transform = ''; el.style.boxShadow = '' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0,229,200,0.08)', color: '#00e5c8', border: '1px solid rgba(0,229,200,0.15)' }}>
                      {article.category}
                    </span>
                    <span className="text-xs" style={{ color: '#607896' }}>
                      {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 flex-1" style={{ color: '#e8f4ff' }}>
                    {article.title}
                  </h4>
                  <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#00e5c8' }}>
                    Read <ArrowRight size={11} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ border: '1px solid rgba(0,229,200,0.3)', color: '#00e5c8', background: 'rgba(0,229,200,0.04)' }}
          >
            View All News <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
