import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead'
import styles from './ComplianceStrip.module.css'

const cards = [
  {
    label: 'Data residency',
    title: 'Your data never leaves India.',
    body: 'Customer data, embeddings, and model responses stay in India at every tier — SaaS, sovereign cloud, or on-prem. No exceptions.',
  },
  {
    label: 'Audit trail',
    title: 'Every query is logged and traceable.',
    body: 'Complete inference trail from prompt to response. Immutable, tamper-evident, and exportable when your examiner asks for it.',
  },
  {
    label: 'RBI compliance',
    title: 'Controls live in the product — not on a roadmap.',
    body: 'RBI FREE-AI requirements, DPDP Act 2023, and CERT-In obligations are implemented in the product. See the full mapping on the Trust page.',
  },
]

export default function ComplianceStrip() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Compliance & sovereignty"
          title="Built for the regulator in the room."
          lede="Controls that matter to your examiner are already in the product — not planned for a future release."
        />
        <div className={styles.grid}>
          {cards.map(({ label, title, body }) => (
            <div key={label} className={styles.card}>
              <div className={styles.label}>{label}</div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link to="/trust" className={styles.ctaLink}>
            Read the full compliance architecture →
          </Link>
        </div>
      </div>
    </section>
  )
}
