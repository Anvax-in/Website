'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
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

const industriesMenu = [
  {
    to: '/industries/financial-services',
    title: 'Financial Services',
    body: 'Credit, KYC and relationship workflows for banks',
    icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
  },
  {
    to: '/industries/insurance',
    title: 'Insurance',
    body: 'Claims, underwriting and service workflows for insurers',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  },
  {
    to: '/industries/healthcare',
    title: 'Healthcare',
    body: 'Discharge, care coordination and compliance workflows for hospitals',
    icon: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z',
  },
  {
    to: '/industries/legal',
    title: 'Legal & Professional Services',
    body: 'Research, contract review and compliance workflows for firms',
    icon: 'M3 7h18v13H3zM8 7V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M3 12h18',
  },
  {
    to: '/industries/public-sector-government',
    title: 'Public Sector & Government',
    body: 'Policy, procurement and case workflows for government',
    icon: 'M4 21V7l8-4 8 4v14M4 21h16M9 21v-6h6v6M9 11h.01M15 11h.01M9 7h.01M15 7h.01',
  },
  {
    to: '/industries/energy',
    title: 'Energy',
    body: 'Maintenance, safety and field workflows for operators',
    icon: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  },
  {
    to: '/industries/education',
    title: 'Education',
    body: 'Advising, admissions and compliance workflows for institutions',
    icon: 'M22 10 12 5 2 10l10 5 10-5zM6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5',
  },
]

const links = [
  { to: '/company',    label: 'Why Anvax' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/trust',      label: 'Security' },
  { to: '/blog',       label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<'product' | 'industries' | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close both panels whenever the route changes.
  useEffect(() => { setOpenMenu(null); setMobileOpen(false) }, [pathname])

  // Escape closes whatever is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenMenu(null); setMobileOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const showMenu = (key: 'product' | 'industries') => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenMenu(key) }
  const hideMenuSoon = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 120) }

  const isActive = (to: string) => pathname === to || pathname?.startsWith(`${to}/`)

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={styles.row}>
        <Link href="/" className={styles.brand} aria-label="Anvax home">
          <Image src="/anvax-logo.webp" alt="Anvax — governed AI workspace" width={300} height={250} priority className={styles.brandLogo} />
          <span className={styles.brandName}>Anvax</span>
        </Link>

        {/* Desktop navigation */}
        <div className={styles.links}>
          <div className={styles.menuWrap} onMouseEnter={() => showMenu('product')} onMouseLeave={hideMenuSoon}>
            <button
              type="button"
              className={styles.link}
              aria-expanded={openMenu === 'product'}
              aria-haspopup="true"
              onClick={() => setOpenMenu(o => (o === 'product' ? null : 'product'))}
            >
              Product
              <svg className={styles.chev} width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openMenu === 'product' && (
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

          <div className={styles.menuWrap} onMouseEnter={() => showMenu('industries')} onMouseLeave={hideMenuSoon}>
            <button
              type="button"
              className={styles.link}
              aria-expanded={openMenu === 'industries'}
              aria-haspopup="true"
              onClick={() => setOpenMenu(o => (o === 'industries' ? null : 'industries'))}
            >
              Industries
              <svg className={styles.chev} width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openMenu === 'industries' && (
              <div className={styles.mega}>
                {industriesMenu.map(({ to, title, body, icon }) => (
                  <Link key={to} href={to} className={styles.megaItem}>
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
                <Link href="/industries" className={`${styles.megaItem} ${styles.megaItemWide}`}>
                  <span className={styles.megaText}>
                    <span className={styles.megaTitle}>View all industries</span>
                  </span>
                </Link>
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
          aria-label="Menu"
          onClick={() => setMobileOpen(o => !o)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d={mobileOpen ? 'M6 6l12 12M18 6L6 18' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
          <span className={styles.menuLabel}>Menu</span>
        </button>

        <div className={styles.actions}>
          <Button variant="ghost" href="https://app.anvax.in/auth/login">Sign in</Button>
          <Button variant="primary" href="/contact" arrow>Book a demo</Button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobilePanel} id="nav-mobile-panel">
          {productMenu.map(({ to, title }) => (
            <Link key={to} href={to} className={styles.mobileLink}>{title}</Link>
          ))}
          <span className={styles.mobileRule} />
          {industriesMenu.map(({ to, title }) => (
            <Link key={to} href={to} className={styles.mobileLink}>{title}</Link>
          ))}
          <Link href="/industries" className={styles.mobileLink}>View all industries</Link>
          <span className={styles.mobileRule} />
          {links.map(({ to, label }) => (
            <Link key={to} href={to} className={styles.mobileLink}>{label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
