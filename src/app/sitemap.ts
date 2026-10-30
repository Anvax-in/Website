import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { industries } from '@/content/industries'
import { compareContent } from '@/content/compare'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const latestPostDate = posts.length > 0
    ? (posts[0].frontmatter.updatedDate ?? posts[0].frontmatter.pubDate)
    : new Date('2026-06-03')

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://www.anvax.in',            lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 1.0 },
    { url: 'https://www.anvax.in/platform',            lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.9 },
    { url: 'https://www.anvax.in/platform/search',     lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/platform/chat',       lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/platform/agents',     lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/platform/governance', lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/industries',          lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/industries/insurance-brokers-mgas',                   lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.7 },
    { url: 'https://www.anvax.in/industries/accountancy-audit',                        lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.7 },
    { url: 'https://www.anvax.in/industries/architecture-engineering-construction',    lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.7 },
    { url: 'https://www.anvax.in/industries/wealth-asset-management',                  lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.7 },
    { url: 'https://www.anvax.in/industries/legal-professional-services',              lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.7 },
    { url: 'https://www.anvax.in/industries/public-sector',                            lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.7 },
    { url: 'https://www.anvax.in/trust',      lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/deployment', lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/company',    lastModified: new Date('2026-06-03'), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.anvax.in/contact',    lastModified: new Date('2026-06-03'), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.anvax.in/blog',       lastModified: latestPostDate,         changeFrequency: 'weekly',  priority: 0.8 },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map(post => ({
    url: `https://www.anvax.in/blog/${post.slug}`,
    lastModified: post.frontmatter.updatedDate ?? post.frontmatter.pubDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const industryPages: MetadataRoute.Sitemap = industries.map(i => ({
    url: `https://www.anvax.in/industries/${i.slug}`,
    lastModified: new Date('2026-10-24'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const comparePages: MetadataRoute.Sitemap = compareContent.map(c => ({
    url: `https://www.anvax.in/compare/${c.slug}`,
    lastModified: new Date('2026-10-30'),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...industryPages, ...comparePages, ...blogPosts]
}
