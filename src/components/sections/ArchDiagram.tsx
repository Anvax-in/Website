import Link from 'next/link'
import SectionHead from '../ui/SectionHead'
import styles from './ArchDiagram.module.css'

type Chip = { t: string; d: string; ci: string }

const layers: { num: string; name: string; desc: string; icon: string; color: string; chips: Chip[] }[] = [
  {
    num: 'Layer 03', name: 'Application layer',
    desc: 'The surface your analyst, RM and compliance officer use every day.',
    icon: 'M11 4h10M11 12h10M11 20h10M3 4h.01M3 12h.01M3 20h.01',
    color: 'var(--blue)',
    chips: [
      { t: 'Search',    d: 'Hybrid · cited',    ci: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0' },
      { t: 'Chat',      d: 'Threads · ⌘K',      ci: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
      { t: 'Governance', d: 'Audit · Policy',    ci: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z' },
      { t: 'Agents',    d: 'Policy-checked',    ci: 'M12 8V4H8M2 4h20M20 4v16M4 4v16M2 20h20M9 12h6M9 16h6' },
    ],
  },
  {
    num: 'Layer 02', name: 'Governance layer',
    desc: 'Every request passes through here, wired into the data path, not an afterthought.',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
    color: 'var(--ink-900)',
    chips: [
      { t: 'PII redaction',        d: 'PII · PCI · PHI',      ci: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
      { t: 'Prompt-injection gate',d: 'Per user message',     ci: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z' },
      { t: 'Model gateway',        d: 'Tier-gated · pinned', ci: 'M21 7H3M21 7l-4-4M21 7l-4 4M3 17h18M3 17l4 4M3 17l4-4' },
      { t: 'Immutable audit',      d: 'SHA-256 chained',      ci: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' },
    ],
  },
  {
    num: 'Layer 01', name: 'Knowledge core',
    desc: 'Customer corpus, enterprise connectors, and the hybrid index that makes them queryable.',
    icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
    color: 'var(--teal)',
    chips: [
      { t: 'Customer corpus',  d: 'Per-tenant',                   ci: 'M12 5C8.13 5 5 6.34 5 8s3.13 3 7 3 7-1.34 7-3S15.87 5 12 5zM5 8v4c0 1.66 3.13 3 7 3s7-1.34 7-3V8M5 12v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4' },
      { t: 'Enterprise stack', d: 'M365 · Slack · Salesforce · Snowflake', ci: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
      { t: 'Hybrid index',     d: 'RAG + structured',              ci: 'M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 9v3M6 18v-3M18 18a9 9 0 0 1-12 0' },
      { t: 'Encrypted at rest',d: 'AES-256-GCM · per-tenant DEK', ci: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4' },
    ],
  },
]

export default function ArchDiagram() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Architecture · Conceptual"
          title="One stack, three layers."
          lede="Knowledge is grounded per tenant. Governance sits between the user and the model, not as an afterthought. The application layer is what your people see."
        />
        <div className={styles.arch}>
          {layers.map(({ num, name, desc, icon, color, chips }) => (
            <div key={num} className={styles.row}>
              <div className={styles.meta}>
                <div className={styles.iconWrap} style={{ background: color }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon} />
                  </svg>
                </div>
                <div>
                  <div className={styles.layerNum}>{num}</div>
                  <div className={styles.layerName}>{name}</div>
                  <p className={styles.layerDesc}>{desc}</p>
                </div>
              </div>
              <div className={styles.blocks}>
                {chips.map(({ t, d, ci }) => (
                  <div key={t} className={styles.block} style={{ '--chip-color': color } as React.CSSProperties}>
                    <span className={styles.dot} style={{ background: color }} />
                    <span className={styles.blockText}>
                      <span className={styles.blockH}>{t}</span>
                      <span className={styles.blockS}>{d}</span>
                    </span>
                    <svg aria-hidden="true" className={styles.blockIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={ci} />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.foot}>
            <span>All customer data, embeddings &amp; inference traces stay in your perimeter.</span>
            <Link href="/trust">See the full architecture <span>→</span></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
