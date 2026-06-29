import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://www.anvax.in',            lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 1.0 },
    { url: 'https://www.anvax.in/platform',   lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.9 },
    { url: 'https://www.anvax.in/industries', lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/trust',      lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/deployment', lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/company',    lastModified: new Date('2026-06-03'), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.anvax.in/contact',    lastModified: new Date('2026-06-03'), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.anvax.in/blog',       lastModified: new Date(),             changeFrequency: 'weekly',  priority: 0.8 },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map(post => ({
    url: `https://www.anvax.in/blog/${post.slug}`,
    lastModified: post.frontmatter.updatedDate ?? post.frontmatter.pubDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}
