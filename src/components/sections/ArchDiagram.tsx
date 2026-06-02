import { Link2, Bot, Workflow, MessageSquare, Search, Shield, Zap, Route, Database, Layers3, Network, KeyRound, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import SectionHead from '../ui/SectionHead'
import Term from '../ui/Term'
import styles from './ArchDiagram.module.css'

type Block = { h: string; s: string | null; icon: LucideIcon }

const layers: { num: string; name: string; desc: string; blocks: Block[]; accent: boolean }[] = [
  {
    num: 'Layer 03', name: 'Application layer',
    desc: 'The surface your analyst, RM, and compliance officer use every day.',
    blocks: [
      { h: 'Search',    s: 'Hybrid · cited',       icon: Search },
      { h: 'Chat',      s: 'Threads · ⌘K',         icon: MessageSquare },
      { h: 'Workflows', s: 'Temporal-backed',       icon: Workflow },
      { h: 'Agents',    s: 'Policy-checked',        icon: Bot },
    ], accent: false,
  },
  {
    num: 'Layer 02', name: 'Governance layer',
    desc: 'Every request passes through here. Not an afterthought — wired into the data path.',
    blocks: [
      { h: 'PII redaction',        s: 'Aadhaar · PAN · UPI',   icon: Shield },
      { h: 'Prompt-injection gate', s: 'Per user message',      icon: Zap },
      { h: 'Model gateway',        s: 'Tier-gated · pinned',    icon: Route },
      { h: 'Immutable audit',      s: 'SHA-256 chained',        icon: Link2 },
    ], accent: true,
  },
  {
    num: 'Layer 01', name: 'Knowledge core',
    desc: 'Customer corpus, India-stack connectors, and the hybrid index that makes them queryable.',
    blocks: [
      { h: 'Customer corpus', s: 'Per-tenant',              icon: Database },
      { h: 'India stack',     s: 'GST · MCA · AA · Tally', icon: Layers3 },
      { h: 'Hybrid index',    s: 'RAG + structured',        icon: Network },
      { h: 'Encrypted at rest', s: null,                    icon: KeyRound },
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
                {blocks.map(({ h, s, icon: Icon }) => (
                  <div key={h} className={`${styles.block} ${accent ? styles.accent : ''}`}>
                    <span className={styles.iconWrap}>
                      <Icon size={14} strokeWidth={1.75} />
                    </span>
                    <span className={styles.blockText}>
                      <span className={styles.blockH}>{h}</span>
                      <span className={styles.blockS}>
                        {h === 'Encrypted at rest'
                          ? <><Term>AES-256-GCM</Term> · per-tenant DEK</>
                          : s}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.foot}>
            <span>All customer data, embeddings &amp; inference traces stay in India.</span>
            <Link href="/trust">See the full architecture <span>→</span></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
