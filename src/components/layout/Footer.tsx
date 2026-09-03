import Link from 'next/link'
import styles from './Footer.module.css'

const product = [
  { to: '/platform',             label: 'Platform overview' },
  { to: '/platform/search',      label: 'Search' },
  { to: '/platform/chat',        label: 'Chat' },
  { to: '/platform/agents',      label: 'Agents' },
  { to: '/platform/governance',  label: 'Governance' },
  { to: '/industries',           label: 'Industries' },
  { to: '/deployment',           label: 'Deployment' },
]
const company = [
  { to: '/company',         label: 'About' },
  { to: '/company#careers', label: 'Careers' },
  { to: '/blog',            label: 'Sovereign Stack' },
  { to: '/contact',         label: 'Contact' },
]
const trust = [
  { to: '/trust',           label: 'Architecture' },
  { to: '/trust#mappings',  label: 'Framework mappings' },
  { to: '/trust#controls',  label: 'Security controls' },
  { to: '/trust#downloads', label: 'Security pack' },
  { to: '/docs',            label: 'Documentation' },
  { to: '/terms',           label: 'Terms of service' },
  { to: '/privacy',         label: 'Privacy policy' },
]

const certs = [
  { label: 'SOC 2 in progress',       dot: 'amber' },
  { label: 'ISO 27001 in progress',   dot: 'amber' },
  { label: 'GDPR-ready',              dot: 'green' },
]

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      <ul>
        {links.map(({ to, label }) => (
          <li key={label}><Link href={to}>{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <img src="/anvax-icon.png" alt="" className={styles.brandIcon} />
              <span className={styles.brandName}>Anvax</span>
            </div>
            <p>The self-hosted, governed AI workspace for enterprises that cannot use public AI.</p>
          </div>
          <FooterCol title="Product"  links={product} />
          <FooterCol title="Company"  links={company} />
          <FooterCol title="Trust"    links={trust} />
        </div>
        <div className={styles.legal}>
          <span>© 2026 Anvax Technologies Pvt. Ltd.</span>
          <span className={styles.certTracker}>
            {certs.map(({ label, dot }) => (
              <span key={label} className={styles.certItem}>
                <span className={`${styles.certDot} ${styles[`certDot_${dot}`]}`} />
                {label}
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}
