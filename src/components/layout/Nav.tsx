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
  {
    to: '/platform/search',
    title: 'Search',
    body: 'Cited answers across every connected system',
    icon: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0',
  },
  {
    to: '/platform/chat',
    title: 'Chat',
    body: 'Grounded conversation over your own corpus',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  },
  {
    to: '/platform/agents',
    title: 'Agents',
    body: 'Actions in your systems, checked against policy',
    icon: 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 21h6',
  },
  {
    to: '/platform/governance',
    title: 'Governance',
    body: 'Redaction, policy, and the full inference trail',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  },
  {
    to: '/platform#connectors',
    title: 'Connectors',
    body: 'M365, Slack, Salesforce, Snowflake and more',
    icon: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  },
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
                {productMenu.map(({ to, title, body, icon }) => (
                  <Link key={to} href={to} className={`${styles.megaItem} ${title === 'Connectors' ? styles.megaItemWide : ''}`}>
                    <span className={styles.megaIcon} aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={icon} />
                      </svg>
                    </span>
                    <span className={styles.megaText}>
                      <span className={styles.megaTitle}>{title}</span>
                      <span className={styles.megaBody}>{body}</span>
                    </span>
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
