export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  projectSlug?: string
  publishedAt: string
  author?: string
}
