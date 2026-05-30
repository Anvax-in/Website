import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/Button'
import styles from './Nav.module.css'

const links = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/trust',      label: 'Trust' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/company',    label: 'Company' },
]

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={`container ${styles.row}`}>
        <Link to="/" className={styles.brand} aria-label="Anvax home">
          <img src="/assets/anvax-wordmark-ink.svg" alt="Anvax" />
        </Link>
        <div className={styles.links}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`${styles.link} ${pathname.startsWith(to) ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className={styles.actions}>
          <Button variant="ghost" href="#">Sign in</Button>
          <Button variant="primary" href="#demo">Request a demo</Button>
        </div>
      </div>
    </nav>
  )
}
