'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '../ui/Button'
import styles from './Nav.module.css'

const links = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/trust',      label: 'Trust' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/company',    label: 'Company' },
  { to: '/blog',       label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={`container ${styles.row}`}>
        <Link href="/" className={styles.brand} aria-label="Anvax home">
          <img src="/assets/anvax-wordmark-ink.svg" alt="Anvax" />
        </Link>
        <div className={styles.links}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              href={to}
              className={`${styles.link} ${pathname?.startsWith(to) ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className={styles.actions}>
          <Button variant="primary" href="/contact">Request a demo</Button>
        </div>
      </div>
    </nav>
  )
}
