import Link from 'next/link'
import styles from './Footer.module.css'

/* Structure and column split from docs/redesign-spec/html/desktop/11-footer.html.
   Canvas columns: Product / Solutions / Company. Routes are this site's. */

const product = [
  { to: '/platform',            label: 'Overview' },
  { to: '/platform/search',     label: 'Search' },
  { to: '/platform/chat',       label: 'Chat' },
  { to: '/platform/agents',     label: 'Agents' },
  { to: '/platform/governance', label: 'Governance' },
  { to: '/deployment',          label: 'Deployment' },
]

const solutions = [
  { to: '/industries#financial-services', label: 'Financial services' },
  { to: '/industries#healthcare',         label: 'Healthcare' },
  { to: '/industries#legal',              label: 'Legal' },
  { to: '/industries#public-sector',      label: 'Public sector' },
  { to: '/industries',                    label: 'All industries' },
  { to: '/deployment',                    label: 'Deployment' },
]

const company = [
  { to: '/company',         label: 'About' },
  { to: '/trust',           label: 'Security' },
  { to: '/blog',            label: 'Blog' },
  { to: '/company#careers', label: 'Careers' },
  { to: '/contact',         label: 'Contact' },
  { to: '/contact',         label: 'Book a demo' },
]

const legal = [
  { to: '/docs',          label: 'Documentation' },
  { to: '/terms',         label: 'Terms' },
  { to: '/privacy',       label: 'Privacy' },
  { to: '/subprocessors', label: 'Subprocessors' },
]

function Col({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className={styles.colTitle}>{title}</h4>
      <ul className={styles.colList}>
        {links.map(({ to, label }) => (
          <li key={label}>
            <Link href={to} className={styles.colLink}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>
              <img src="/anvax-logo-new.png" alt="" className={styles.brandLogo} />
              <span className={styles.brandName}>Anvax</span>
            </div>
            <p className={styles.blurb}>
              The self-hosted, governed AI workspace for enterprises that cannot use public AI.
            </p>
          </div>
          <Col title="Product"   links={product} />
          <Col title="Solutions" links={solutions} />
          <Col title="Company"   links={company} />
        </div>

        <div className={styles.legal}>
          <span>© {new Date().getFullYear()} Anvax Technologies Pvt. Ltd.</span>
          <span className={styles.legalLinks}>
            {legal.map(({ to, label }) => (
              <Link key={label} href={to} className={styles.legalLink}>{label}</Link>
            ))}
          </span>
          <span className={styles.certs}>
            <span>SOC 2 · audit underway</span>
            <span>ISO 27001 · audit underway</span>
            <span className={styles.certOk}>GDPR-ready</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
