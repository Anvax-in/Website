'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '../ui/Button'
import styles from './Nav.module.css'

/* Structure mirrors docs/redesign-spec/html/{desktop,mobile}/00-nav.html.
   The canvas renames Platform -> Product, Trust -> Security, Company -> Why Anvax;
   routes are unchanged. */

const productMenu = [
  { to: '/platform',            title: 'Overview',   body: 'One workspace, three surfaces' },
  { to: '/platform/search',     title: 'Search',     body: 'Cited answers, scoped to entitlements' },
  { to: '/platform/chat',       title: 'Chat',       body: 'Grounded threads, redacted pre-inference' },
  { to: '/platform/agents',     title: 'Agents',     body: 'Policy-checked before every action' },
  { to: '/platform/governance', title: 'Governance', body: 'Every query on the audit trail' },
  { to: '/deployment',          title: 'Deployment', body: 'VPC, sovereign cloud, or air-gapped' },
]

const links = [
  { to: '/company',    label: 'Why Anvax' },
  { to: '/industries', label: 'Industries' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/trust',      label: 'Security' },
  { to: '/blog',       label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close both panels whenever the route changes.
  useEffect(() => { setMenuOpen(false); setMobileOpen(false) }, [pathname])

  // Escape closes whatever is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setMobileOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const openMenu = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMenuOpen(true) }
  const closeMenu = () => { closeTimer.current = setTimeout(() => setMenuOpen(false), 120) }

  const isActive = (to: string) => pathname === to || pathname?.startsWith(`${to}/`)

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={styles.row}>
        <Link href="/" className={styles.brand} aria-label="Anvax home">
          <img src="/anvax-logo-new.png" alt="" className={styles.brandLogo} />
          <span className={styles.brandName}>Anvax</span>
        </Link>

        {/* Desktop navigation */}
        <div className={styles.links}>
          <div className={styles.menuWrap} onMouseEnter={openMenu} onMouseLeave={closeMenu}>
            <button
              type="button"
              className={styles.link}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onClick={() => setMenuOpen(o => !o)}
            >
              Product
              <svg className={styles.chev} width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {menuOpen && (
              <div className={styles.mega}>
                {productMenu.map(({ to, title, body }) => (
                  <Link key={to} href={to} className={styles.megaItem}>
                    <span className={styles.megaTitle}>{title}</span>
                    <span className={styles.megaBody}>{body}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map(({ to, label }) => (
            <Link key={to} href={to}
                  className={`${styles.link} ${isActive(to) ? styles.active : ''}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile trigger — the one piece the canvas drives with JS state */}
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={mobileOpen}
          aria-controls="nav-mobile-panel"
          onClick={() => setMobileOpen(o => !o)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d={mobileOpen ? 'M6 6l12 12M18 6L6 18' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
          Menu
        </button>

        <div className={styles.actions}>
          <Button variant="primary" href="/contact" arrow>Book a demo</Button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobilePanel} id="nav-mobile-panel">
          {productMenu.map(({ to, title }) => (
            <Link key={to} href={to} className={styles.mobileLink}>{title}</Link>
          ))}
          <span className={styles.mobileRule} />
          {links.map(({ to, label }) => (
            <Link key={to} href={to} className={styles.mobileLink}>{label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
