import Image from 'next/image'
import styles from './ComplianceBadgeWall.module.css'

const frameworks = [
  { logo: '/assets/compliance/soc2.webp',     name: 'SOC 2 Type II', alt: 'SOC 2 Type II',         jurisdiction: 'Global',         status: 'Audit underway' },
  { logo: '/assets/compliance/iso-27001.svg', name: 'ISO/IEC 27001', alt: 'ISO/IEC 27001',         jurisdiction: 'Global',         status: 'Audit underway' },
  { logo: '/assets/compliance/iso-42001.svg', name: 'ISO 42001',     alt: 'ISO 42001',             jurisdiction: 'Global',         status: 'Audit underway' },
  { logo: '/assets/compliance/hipaa.svg',     name: 'HIPAA',         alt: 'HIPAA',                 jurisdiction: 'United States',  status: 'Audit underway' },
  { logo: '/assets/compliance/gdpr.svg',      name: 'GDPR',          alt: 'GDPR',                  jurisdiction: 'European Union', status: 'Mapped' },
] as const

export default function ComplianceBadgeWall() {
  return (
    <div className={styles.badgeGrid}>
      {frameworks.map(({ logo, name, alt, jurisdiction, status }) => (
        <div key={logo} className={styles.badge} title={`${jurisdiction} — ${status}`}>
          <span className={styles.logoWrap}>
            <Image src={logo} alt={alt} fill className={styles.logoImg} />
          </span>
          <span className={styles.badgeName}>{name}</span>
          <span className={styles.srOnly}>
            {alt} — {status}
          </span>
        </div>
      ))}
    </div>
  )
}
