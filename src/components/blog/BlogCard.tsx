import Link from 'next/link'
import type { Post } from '@/lib/blog'
import styles from './BlogCard.module.css'

interface BlogCardProps {
  post: Post
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter, readingTime } = post
  return (
    <article className={styles.card}>
      <Link href={`/blog/${slug}`} className={styles.link}>
        <div className={styles.meta}>
          <time dateTime={frontmatter.pubDate.toISOString()} className={styles.date}>
            {formatDate(frontmatter.pubDate)}
          </time>
          <span className={styles.sep}>·</span>
          <span className={styles.readTime}>{readingTime} min read</span>
        </div>
        <h2 className={styles.title}>{frontmatter.title}</h2>
        <p className={styles.desc}>{frontmatter.description}</p>
        {frontmatter.tags.length > 0 && (
          <div className={styles.tags}>
            {frontmatter.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        <span className={styles.readMore}>Read more →</span>
      </Link>
    </article>
  )
}
