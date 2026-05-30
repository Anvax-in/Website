import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead'
import Term from '../ui/Term'
import styles from './ArchDiagram.module.css'

const layers = [
  {
    num: 'Layer 03', name: 'Application layer',
    desc: 'The surface your analyst, RM, and compliance officer use every day.',
    blocks: [
      { h: 'Search', s: 'Hybrid · cited' },
      { h: 'Chat', s: 'Threads · ⌘K' },
      { h: 'Workflows', s: 'Temporal-backed' },
      { h: 'Agents', s: 'Policy-checked' },
    ], accent: false,
  },
  {
    num: 'Layer 02', name: 'Governance layer',
    desc: 'Every request passes through here. Not an afterthought — wired into the data path.',
    blocks: [
      { h: 'PII redaction', s: 'Aadhaar · PAN · UPI' },
      { h: 'Prompt-injection gate', s: 'Per user message' },
      { h: 'Model gateway', s: 'Tier-gated · pinned' },
      { h: 'Immutable audit', s: 'SHA-256 chained' },
    ], accent: true,
  },
  {
    num: 'Layer 01', name: 'Knowledge core',
    desc: 'Customer corpus, India-stack connectors, and the hybrid index that makes them queryable.',
    blocks: [
      { h: 'Customer corpus', s: 'Per-tenant' },
      { h: 'India stack', s: 'GST · MCA · AA · Tally' },
      { h: 'Hybrid index', s: 'RAG + structured' },
      { h: 'Encrypted at rest', s: null },
    ], accent: false,
  },
]

export default function ArchDiagram() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Architecture · Conceptual"
          title="One stack, three layers."
          lede="Knowledge is grounded per tenant. Governance sits between the user and the model — not after the fact. The application layer is what your people see."
        />
        <div className={styles.arch}>
          {layers.map(({ num, name, desc, blocks, accent }) => (
            <div key={num} className={styles.row}>
              <div className={styles.meta}>
                <div className={styles.layerNum}>{num}</div>
                <div className={styles.layerName}>{name}</div>
                <p className={styles.layerDesc}>{desc}</p>
              </div>
              <div className={styles.blocks}>
                {blocks.map(({ h, s }) => (
                  <div key={h} className={`${styles.block} ${accent ? styles.accent : ''}`}>
                    <span className={styles.blockH}>{h}</span>
                    <span className={styles.blockS}>
                      {h === 'Encrypted at rest' ? <><Term>AES-256-GCM</Term> · per-tenant DEK</> : s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.foot}>
            <span>All customer data, embeddings &amp; inference traces stay in India.</span>
            <Link to="/trust">See the full architecture <span>→</span></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
