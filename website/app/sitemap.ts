import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/site'
import { programs } from '@/data/programs'

const base = siteConfig.url

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/course`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/admissions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
  ]

  const programPages: MetadataRoute.Sitemap = programs.map(p => ({
    url: `${base}/programs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...programPages]
}
