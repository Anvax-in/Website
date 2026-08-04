import Link from 'next/link'
import SectionHead from '../ui/SectionHead'
import styles from './ComplianceStrip.module.css'

const cards = [
  {
    title: 'Data residency',
    body: 'Customer data, embeddings and model responses stay in India at every tier: SaaS, sovereign cloud, or on-prem. No exceptions.',
    icon: 'M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    color: 'var(--teal)',
  },
  {
    title: 'Audit trail',
    body: 'Complete inference trail from prompt to response. Immutable, tamper-evident, and exportable when your examiner asks for it.',
    icon: 'M9 12l2 2 4-4M5 3h14v18l-4-2-3 2-3-2-4 2z',
    color: 'var(--blue)',
  },
  {
    title: 'RBI compliance',
    body: 'RBI FREE-AI requirements, DPDP Act 2023, and CERT-In obligations are implemented in the product. Not on a roadmap.',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
    color: 'var(--ink-900)',
  },
]

export default function ComplianceStrip() {
  return (
    <section id="trust" className={styles.section}>
      <div className="container">
        <SectionHead
          eyebrow="Compliance & sovereignty"
          title="Built for the regulator in the room."
        />
        <div className={styles.grid}>
          {cards.map(({ title, body, icon, color }) => (
            <div key={title} className={styles.card}>
              <div className={styles.iconWrap} style={{ background: color }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link href="/trust" className={styles.ctaLink}>
            Read the full compliance architecture →
          </Link>
        </div>
      </div>
    </section>
  )
}
