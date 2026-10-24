import Link from 'next/link'
import styles from './AuthorBio.module.css'

export default function AuthorBio() {
  return (
    <div className={styles.bio}>
      <p className={styles.text}>
        <strong className={styles.name}>Team Anvax</strong> writes about enterprise AI
        governance, audit, and self-hosted deployment for regulated industries.{' '}
        <span className={styles.dash}>—</span>{' '}
        <Link href="/company" className={styles.link}>About Anvax</Link>
      </p>
    </div>
  )
}
