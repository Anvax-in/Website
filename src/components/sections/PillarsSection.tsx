import styles from './PillarsSection.module.css'

const pillars = [
  {
    iconBg: 'var(--blue-600)',
    badge: 'Shipping today',
    title: 'Governed workspace',
    body: 'Search, chat, workflows and agents on your own documents and systems, full audit trail, PII redaction, policy enforcement. Inside your perimeter, from day one.',
    icon: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  },
  {
    iconBg: 'var(--ink-900)',
    badge: 'Compounding',
    title: 'Governance layer',
    body: 'Four structural moats: organisational memory, immutable audit chain, jurisdiction packs across six regulatory frameworks, and enterprise connector depth that takes months to replicate.',
    icon: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    iconBg: 'var(--sage-600)',
    badge: 'Your iron',
    title: 'Deployment',
    body: 'Three tiers, one product: private cloud in your own AWS, Azure, or GCP, any region; sovereign cloud partners; or on-prem and air-gapped. Your data never leaves your perimeter.',
    icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  },
]

export default function PillarsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>How it works</div>
          <h2 className={styles.h2}>Three layers. One product.</h2>
        </div>

        <div className={styles.grid}>
          {pillars.map(({ iconBg, badge, title, body, icon }) => (
            <div key={title} className={styles.card}>
              <div className={styles.iconWrap} style={{ background: iconBg }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={icon} />
                </svg>
              </div>
              <span className={styles.badge}>{badge}</span>
              <h3 className={styles.h3}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
