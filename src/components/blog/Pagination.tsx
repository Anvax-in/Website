import Link from 'next/link'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number   // 1-based
  totalPages: number
  basePath: string      // e.g. "/blog"
}

function pageHref(basePath: string, page: number): string {
  return page === 1 ? basePath : `${basePath}/page/${page}`
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav className={styles.nav} aria-label="Pagination">
      {hasPrev ? (
        <Link href={pageHref(basePath, currentPage - 1)} className={styles.arrow}>
          ← Prev
        </Link>
      ) : (
        <span className={`${styles.arrow} ${styles.disabled}`} aria-hidden="true">← Prev</span>
      )}

      <div className={styles.pages}>
        {pages.map(page => (
          <Link
            key={page}
            href={pageHref(basePath, page)}
            className={`${styles.page} ${page === currentPage ? styles.current : ''}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      {hasNext ? (
        <Link href={pageHref(basePath, currentPage + 1)} className={styles.arrow}>
          Next →
        </Link>
      ) : (
        <span className={`${styles.arrow} ${styles.disabled}`} aria-hidden="true">Next →</span>
      )}
    </nav>
  )
}
