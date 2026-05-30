import SectionHead from '../ui/SectionHead'
import styles from './ProblemSection.module.css'

const before = [
  { lead: 'Aadhaar and PAN numbers are leaving the network', body: 'in ChatGPT, Gemini, and personal Copilot tabs — with no data processing agreement in place.' },
  { lead: 'There is no audit trail', body: 'for any AI-assisted credit decision, customer summary, or policy interpretation. The RBI examiner gets nothing.' },
  { lead: 'Knowledge is scattered', body: 'across Confluence, SharePoint, Tally, GST portal, and 60 shared drives. Search means emailing the right person.' },
  { lead: "Glean and Copilot don't fit", body: 'US-hosted, Microsoft-stack-only, and blind to RBI circulars, MCA filings, and Account Aggregator data.' },
  { lead: 'Shadow AI is everywhere', body: "and leadership knows it. No governance layer means no defensible response when the incident happens." },
]

const after = [
  { lead: 'PII is redacted at the boundary', body: 'Aadhaar (Verhoeff-validated), PAN, IFSC, GSTIN, UPI IDs scrubbed before the model sees the prompt.' },
  { lead: 'Every query is logged', body: 'Immutable inference trail, SHA-256 chained. UPDATE and DELETE are blocked by DDL trigger. The examiner gets a full export on request.' },
  { lead: 'One workspace over your corpus', body: 'Search, chat, workflows, and agents running on your documents — Tally, GST portal, MCA filings, Confluence, SharePoint.' },
  { lead: 'India-stack native', body: 'GST, MCA21, Account Aggregator, RBI circulars as first-class connectors. Not bolted on — wired in at the data layer.' },
  { lead: "Your data never leaves India", body: 'SaaS in AWS Mumbai. Indian sovereign cloud. Air-gapped on-prem. Choose the tier; the residency commitment is the same.' },
]

export default function ProblemSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="The problem"
          title="Right now, your credit team has ChatGPT open in one tab and the loan file in another."
          lede="Aadhaar numbers, PAN details, and account data are crossing borders with no contract in place. When the examiner arrives, there is nothing to show."
        />
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={`${styles.heading} ${styles.bad}`}>
              <span className={styles.dot} />
              Before Anvax
            </div>
            <h3 className={styles.colH}>Ungoverned. Unauditable. One incident away from a regulatory response.</h3>
            <ul className={styles.list}>
              {before.map(({ lead, body }) => (
                <li key={lead} className={styles.item}>
                  <strong>{lead}</strong> {body}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.col} ${styles.good}`}>
            <div className={`${styles.heading} ${styles.goodHeading}`}>
              <span className={`${styles.dot} ${styles.dotGood}`} />
              After Anvax
            </div>
            <h3 className={styles.colH}>One governed surface. Full trace. Examiner-ready on day one.</h3>
            <ul className={styles.list}>
              {after.map(({ lead, body }) => (
                <li key={lead} className={`${styles.item} ${styles.itemGood}`}>
                  <strong>{lead}</strong> {body}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
