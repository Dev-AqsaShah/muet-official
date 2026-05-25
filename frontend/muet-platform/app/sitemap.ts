import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/site'
import { projects } from '@/data/projects'
import { programs } from '@/data/programs'
import { newsArticles } from '@/data/news'

const base = siteConfig.url

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/projects`,lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/programs`,lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/news`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const programPages: MetadataRoute.Sitemap = programs.map(p => ({
    url: `${base}/programs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const newsPages: MetadataRoute.Sitemap = newsArticles.map(a => ({
    url: `${base}/news/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages, ...programPages, ...newsPages]
}
