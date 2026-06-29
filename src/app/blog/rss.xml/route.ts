import { Feed } from 'feed'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPosts()

  const feed = new Feed({
    title: 'Sovereign Stack by Anvax',
    description:
      "Weekly analysis of AI governance, RBI regulations, and compliance strategy for India's regulated financial sector.",
    id: 'https://www.anvax.in/blog',
    link: 'https://www.anvax.in/blog',
    language: 'en',
    favicon: 'https://www.anvax.in/favicon.svg',
    copyright: `© ${new Date().getFullYear()} Anvax Technologies Pvt. Ltd.`,
    feedLinks: { rss2: 'https://www.anvax.in/blog/rss.xml' },
    author: { name: 'Anvax', link: 'https://www.anvax.in' },
  })

  for (const post of posts) {
    const url = `https://www.anvax.in/blog/${post.slug}`
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      date: post.frontmatter.pubDate,
      published: post.frontmatter.pubDate,
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
