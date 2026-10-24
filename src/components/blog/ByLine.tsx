import Link from 'next/link'
import styles from './ByLine.module.css'

interface ByLineProps {
  publishedAt: Date
  updatedAt?: Date
  readingTimeMinutes: number
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ByLine({ publishedAt, updatedAt, readingTimeMinutes }: ByLineProps) {
  return (
    <div className={styles.byline}>
      <div className={styles.author}>
        <Link href="/company#team" className={styles.authorName}>Team Anvax</Link>
        <span className={styles.role}>Enterprise AI Research</span>
      </div>
      <div className={styles.meta}>
        <time dateTime={publishedAt.toISOString()}>{formatDate(publishedAt)}</time>
        <span className={styles.sep}>·</span>
        <span>{readingTimeMinutes} min read</span>
        {updatedAt && (
          <>
            <span className={styles.sep}>·</span>
            <span>Updated {formatDate(updatedAt)}</span>
          </>
        )}
      </div>
    </div>
  )
}
