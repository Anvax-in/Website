import Link from 'next/link'
import SectionHead from '../ui/SectionHead'
import Tag from '../ui/Tag'
import styles from './PillarsSection.module.css'

const pillars = [
  {
    tag: 'Shipping today',
    title: 'Governed workspace',
    body: 'Search, chat, workflows and agents on your own documents and systems, full audit trail, PII redaction, policy enforcement. Inside your perimeter, from day one.',
    icon: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
    color: 'var(--blue)',
    href: '/platform',
  },
  {
    tag: 'Compounding',
    title: 'Governance layer',
    body: 'Four structural moats: organisational memory, immutable audit chain, jurisdiction packs across six regulatory frameworks, and enterprise connector depth that takes months to replicate.',
    icon: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    color: 'var(--ink-900)',
    href: '/platform',
  },
  {
    tag: 'Your iron',
    title: 'Deployment',
    body: 'Three tiers, one product: private cloud in your own AWS, Azure, or GCP, any region; sovereign cloud partners; or on-prem and air-gapped. Your data never leaves your perimeter.',
    icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
    color: 'var(--teal)',
    href: '/deployment',
  },
]

export default function PillarsSection() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="How Anvax works"
          title="Three layers. One product."
          lede="A workspace that ships today, a governance layer that compounds, and a deployment model that fits where your data has to stay."
        />
        <div className={styles.grid}>
          {pillars.map(({ tag, title, body, icon, color, href }) => (
            <Link key={title} href={href} className={styles.card}>
              <div className={styles.iconWrap} style={{ background: color }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </div>
              <Tag variant="outline">{tag}</Tag>
              <h3 className={styles.h3}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
