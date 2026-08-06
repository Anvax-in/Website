import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import Pagination from '@/components/blog/Pagination'
import styles from '@/pages/Blog.module.css'

export const dynamicParams = false

export async function generateStaticParams() {
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  // Page 1 is at /blog - only generate params for pages 2+
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }))
}

type Props = { params: Promise<{ page: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params
  const pageNum = Number(page)
  return {
    title: `Sovereign Stack: Page ${pageNum} · Anvax`,
    alternates: { canonical: `https://www.anvax.in/blog/page/${pageNum}` },
  }
}

export default async function BlogPage({ params }: Props) {
  const { page } = await params
  const pageNum = Number(page)

  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  if (pageNum < 2 || pageNum > totalPages || !Number.isInteger(pageNum)) {
    notFound()
  }

  const start = (pageNum - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE)

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Sovereign Stack</p>
            <h1 className={styles.h1}>AI governance for India&apos;s regulators.</h1>
            <p className={styles.lede}>
              Weekly analysis on RBI FREE-AI, DPDP, SEBI circulars, and what they actually
              mean for compliance officers in BFSI.
            </p>
            <a href="/blog/rss.xml" className={styles.rssLink} aria-label="Subscribe via RSS">
              RSS feed
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={pageNum} totalPages={totalPages} basePath="/blog" />
        </div>
      </section>
    </>
  )
}
