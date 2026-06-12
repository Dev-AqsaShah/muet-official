import type { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export function buildMetadata(config: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  return {
    title: `${config.title} | MUET Training Programs`,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${siteConfig.url}${config.path}`,
      images: [config.image ?? '/og/default.png'],
      siteName: siteConfig.fullName,
      locale: 'en_PK',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `${siteConfig.url}${config.path}` },
  }
}
