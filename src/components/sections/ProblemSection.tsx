import SectionHead from '../ui/SectionHead'
import styles from './ProblemSection.module.css'

const before = [
  { lead: 'Aadhaar and PAN numbers are leaving the network', body: 'in ChatGPT, Gemini, and personal Copilot tabs, with no data processing agreement in place.' },
  { lead: 'There is no audit trail', body: 'for any AI-assisted credit decision, customer summary, or policy interpretation. The RBI examiner gets nothing.' },
  { lead: 'Knowledge is scattered', body: 'across Confluence, SharePoint, Tally, GST portal, and 60 shared drives. Search means emailing the right person.' },
  { lead: "Glean and Copilot don't fit", body: 'US-hosted, Microsoft-stack-only, and blind to RBI circulars, MCA filings, and Account Aggregator data.' },
  { lead: 'Shadow AI is everywhere', body: 'and leadership knows it. No governance layer means no defensible response when the incident happens.' },
]

const after = [
  { lead: 'PII is redacted at the boundary', body: 'Aadhaar (Verhoeff-validated), PAN, IFSC, GSTIN, UPI IDs scrubbed before the model sees the prompt.' },
  { lead: 'Every query is logged', body: 'Immutable inference trail, SHA-256 chained. UPDATE and DELETE are blocked by DDL trigger.' },
  { lead: 'One workspace over your corpus', body: 'Search, chat, workflows, and agents running on your documents: Tally, GST portal, MCA filings, Confluence, SharePoint.' },
  { lead: 'India-stack native', body: 'GST, MCA21, Account Aggregator, RBI circulars as first-class connectors, wired in at the data layer.' },
  { lead: 'Your data never leaves India', body: 'Indian sovereign cloud or air-gapped on-prem. Choose the tier; the residency commitment is the same.' },
]

export default function ProblemSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="The problem"
          title="Right now, your credit team has ChatGPT open in one tab and the loan file in another."
        />
        <div className={styles.grid}>
          <div className={styles.col}>
            <h3 className={styles.colH}>Before Anvax</h3>
            <ul className={styles.list}>
              {before.map(({ lead, body }) => (
                <li key={lead} className={styles.item}>
                  <strong>{lead}</strong> {body}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.col} ${styles.good}`}>
            <h3 className={`${styles.colH} ${styles.colHGood}`}>After Anvax</h3>
            <ul className={styles.list}>
              {after.map(({ lead, body }) => (
                <li key={lead} className={`${styles.item} ${styles.itemGood}`}>
                  <span className={styles.bullet} />
                  <span><strong>{lead}</strong> {body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
