import type { Metadata } from 'next'
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import Pagination from '@/components/blog/Pagination'
import styles from '@/pages/Blog.module.css'

export const metadata: Metadata = {
  title: 'Sovereign Stack | AI Governance for Regulated Enterprises',
  description: 'Analysis of AI governance frameworks, regulatory requirements, and compliance strategy for risk and compliance teams at regulated enterprises.',
  openGraph: {
    title: 'Sovereign Stack | AI Governance for Regulated Enterprises',
    description: 'Analysis of AI governance frameworks, regulatory requirements, and compliance strategy for risk and compliance teams at regulated enterprises.',
    url: 'https://www.anvax.in/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Stack | AI Governance for Regulated Enterprises',
    description: 'Analysis of AI governance, regulatory frameworks, and compliance strategy for regulated enterprises.',
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
        <div className={styles.lattice} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Sovereign Stack</p>
            <h1 className={styles.h1}>AI governance for regulated enterprises.</h1>
            <p className={styles.lede}>
              Analysis of AI governance frameworks, compliance requirements, and
              what regulators actually expect from enterprise AI deployments.
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
            <p style={{ color: 'var(--slate-400)', fontFamily: 'var(--font-mono)', fontSize: 13, marginTop: 48 }}>
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
