import Link from 'next/link'
import styles from './Footer.module.css'

const product = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/deployment', label: 'Deployment' },
]
const trust = [
  { to: '/trust',              label: 'Architecture' },
  { to: '/trust#free-ai',       label: 'RBI FREE-AI' },
  { to: '/trust#dpdp',         label: 'DPDP & CERT-In' },
  { to: '/trust#downloads',    label: 'Regulator pack' },
]
const company = [
  { to: '/company',          label: 'About' },
  { to: '/company',          label: 'Team' },
  { to: '/company#careers',  label: 'Careers' },
  { to: '/blog',             label: 'Sovereign Stack' },
  { to: '/contact',          label: 'Contact' },
]
function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      <ul>
        {links.map(({ to, label }) => (
          <li key={to}><Link href={to}>{label}</Link></li>
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
            <p>The sovereign AI platform for India's regulated enterprises. Built in India, governed for India's regulators.</p>
          </div>
          <FooterCol title="Product" links={product} />
          <FooterCol title="Trust" links={trust} />
          <FooterCol title="Company" links={company} />
        </div>
        <div className={styles.legal}>
          <span>© 2026 Anvax Technologies Pvt. Ltd.</span>
          <span className={styles.residency}>Data residency · India</span>
        </div>
      </div>
    </footer>
  )
}
