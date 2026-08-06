import type { Metadata } from 'next'
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import Pagination from '@/components/blog/Pagination'
import styles from '@/pages/Blog.module.css'

export const metadata: Metadata = {
  title: 'Sovereign Stack: AI Governance & Regulation for Indian BFSI',
  description: "Weekly analysis of AI governance, RBI regulations, and compliance strategy for risk officers in India's regulated financial sector.",
  openGraph: {
    title: 'Sovereign Stack: AI Governance & Regulation for Indian BFSI',
    description: "Weekly analysis of AI governance, RBI regulations, and compliance strategy for risk officers in India's regulated financial sector.",
    url: 'https://www.anvax.in/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Stack: AI Governance & Regulation for Indian BFSI',
    description: "Weekly analysis on RBI, SEBI, IRDAI and what they mean for BFSI compliance teams.",
  },
  alternates: { canonical: 'https://www.anvax.in/blog' },
}

export default function BlogIndex() {
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const posts = allPosts.slice(0, POSTS_PER_PAGE)

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
          {posts.length === 0 ? (
            <p style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              No posts yet, check back soon.
            </p>
          ) : (
            <>
              <div className={styles.grid}>
                {posts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
              <Pagination currentPage={1} totalPages={totalPages} basePath="/blog" />
            </>
          )}
        </div>
      </section>
    </>
  )
}
