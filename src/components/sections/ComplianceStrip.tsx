import SectionHead from '../ui/SectionHead'
import styles from './ComplianceStrip.module.css'

const cells = [
  {
    k: 'Data residency',
    v: 'All customer data and embeddings stored in India.',
    items: ['SaaS · Hosted in India', 'Sovereign · Indian cloud infrastructure', 'On-prem · customer DC'],
  },
  {
    k: 'Sovereign inference',
    v: 'Region-locked, tier-gated, model-pinned.',
    items: ['SaaS · Anthropic via Azure AI Foundry', 'Sovereign · vLLM + AI Kosh / Sarvam', 'Air-gapped · Helm + vLLM'],
  },
  {
    k: 'Audit-ready',
    v: "RBI FREE-AI controls live in product — not a roadmap slide.",
    items: ['R7 · AI Use-Case Registry', 'R17 · Model version tracking', 'R19 · Explainability "Why?"', 'R23 · Immutable inference trail'],
  },
]

export default function ComplianceStrip() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Compliance & sovereignty"
          title="Examiner-ready. Audit-aligned. India-resident."
          lede="Anvax was built with the RBI FREE-AI report and the DPDP Act open on the desk. Controls are live in product."
        />
        <div className={styles.strip}>
          <div className={styles.lead}>
            <h3 className={styles.leadH}>The compliance story your regulator can read in twenty minutes.</h3>
            <p className={styles.leadP}>Full mapping of RBI FREE-AI, DPDP Act 2023, CERT-In 2022, and the RBI IT Framework lives on the Trust page — controls, references, and current status.</p>
          </div>
          {cells.map(({ k, v, items }) => (
            <div key={k} className={styles.cell}>
              <div className={styles.cellK}>{k}</div>
              <div className={styles.cellV}>{v}</div>
              <ul className={styles.cellList}>
                {items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
