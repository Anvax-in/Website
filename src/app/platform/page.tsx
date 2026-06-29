import type { Metadata } from 'next'
import Image from 'next/image'
import SectionHead from '@/components/ui/SectionHead'
import Tag from '@/components/ui/Tag'
import styles from '@/pages/Platform.module.css'

const capabilities = [
  {
    id: 'search',
    tag: 'Search',
    tagVariant: 'live' as const,
    h3: 'Semantic search over every document in your corpus.',
    desc: 'Hybrid retrieval — dense vectors plus BM25 keyword — across PDFs, RBI circulars, NBFC policies, emails, and structured data. Results arrive with source citations and paragraph-level provenance.',
    specs: [
      { spec: 'Retrieval', value: 'Dense + BM25 hybrid, reranked by cross-encoder' },
      { spec: 'Sources', value: 'PDF, DOCX, XLSX, JSON, emails, database views' },
      { spec: 'Citations', value: 'Paragraph-level, page number, document title' },
      { spec: 'PII guard', value: 'Auto-redact Aadhaar, PAN, IFSC, GSTIN, mobile' },
      { spec: 'Latency', value: 'P95 < 1.4 s end-to-end including model call' },
    ],
  },
  {
    id: 'chat',
    tag: 'Chat',
    tagVariant: 'live' as const,
    h3: 'Multi-turn grounded chat that never hallucinates a regulation.',
    desc: 'Every answer is anchored to retrieved context. The model is instructed to say "not found in corpus" rather than fabricate. Thread history stays scoped to tenant — never mixed across customers.',
    specs: [
      { spec: 'Grounding', value: 'RAG with top-k=12, context window 128 K' },
      { spec: 'Tenancy', value: 'Strict RLS — threads never cross tenant boundary' },
      { spec: 'Models', value: 'Claude Sonnet, Haiku; Gemini Flash fallback' },
      { spec: 'Roles', value: 'System prompt + tool schema per role definition' },
      { spec: 'Audit', value: 'Every turn logged to immutable inference_traces' },
    ],
  },
  {
    id: 'workflows',
    tag: 'Workflows',
    tagVariant: 'live' as const,
    h3: 'Multi-step compliance workflows with human checkpoints.',
    desc: 'Drag-and-drop workflow builder for recurring tasks: RBI circular triage, credit memo drafting, audit checklist generation. Each step can require human approval before proceeding.',
    specs: [
      { spec: 'Builder', value: 'Visual node graph with conditional branching' },
      { spec: 'Triggers', value: 'Manual, scheduled (cron), webhook, email ingest' },
      { spec: 'Human gate', value: 'Approval step with deadline + escalation path' },
      { spec: 'Outputs', value: 'PDF, DOCX, structured JSON, email, webhook' },
      { spec: 'Templates', value: 'RBI circular triage, credit memo, audit checklist' },
    ],
  },
  {
    id: 'agents',
    tag: 'Agents',
    tagVariant: 'next' as const,
    h3: 'Persistent agents that monitor your regulatory environment 24/7.',
    desc: 'Long-running agents watch RBI, SEBI, IRDAI feeds. When a new circular drops, they classify, summarise, and route to the right team before your compliance officer opens email.',
    specs: [
      { spec: 'Monitoring', value: 'RBI, SEBI, IRDAI, MCA — feed polling + delta diff' },
      { spec: 'Actions', value: 'Slack alert, task create, workflow trigger, email' },
      { spec: 'Memory', value: 'Tenant-scoped persistent memory with TTL policy' },
      { spec: 'Guardrails', value: 'Action whitelist, spend cap, human-in-the-loop gate' },
    ],
  },
]

const moats = [
  {
    icon: '🧠',
    h3: 'Persistent memory',
    desc: 'Every query, decision, and approval becomes part of a continuously updated corpus. The longer you use Anvax, the smarter your tenant instance gets — without any data leaving your boundary.',
  },
  {
    icon: '🇮🇳',
    h3: 'India stack wired in',
    desc: 'GST Portal, Account Aggregator, DigiLocker, MCA21, UPI/NPCI — pre-connected at the data layer. Built for RBI, SEBI, and IRDAI from day one, not retrofitted later.',
  },
  {
    icon: '🏦',
    h3: 'BFSI verticals by default',
    desc: 'Not a horizontal AI with a compliance checkbox. The default prompt templates, workflow library, and corpus schema are designed for NBFC, wealth, lending, insurance, broking, and payments.',
  },
  {
    icon: '📋',
    h3: 'Compliance by construction',
    desc: 'Postgres RLS, per-tenant encryption keys, immutable audit chain, RBI FREE-AI mapping — not features you configure. They are the foundation. You cannot turn them off.',
  },
]

const logoTiles = [
  { src: '/assets/logos/gst.png', name: 'GST Portal', kind: 'Govt · Tax' },
  { src: '/assets/logos/mca.png', name: 'MCA21', kind: 'Govt · Corporate' },
  { src: '/assets/logos/rbi.png', name: 'RBI Circulars', kind: 'Regulator' },
  { src: '/assets/logos/npci.svg', name: 'UPI / NPCI', kind: 'Payments infra' },
  { src: '/assets/logos/digilocker.svg', name: 'DigiLocker', kind: 'Govt · Identity' },
  { src: '/assets/logos/account-aggregator.svg', name: 'Account Aggregator', kind: 'Financial data' },
  { src: '/assets/logos/sebi.jpg', name: 'SEBI', kind: 'Regulator' },
  { src: '/assets/logos/irdai.png', name: 'IRDAI', kind: 'Regulator' },
  { src: '/assets/logos/tally.png', name: 'Tally', kind: 'Ledger' },
  { src: '/assets/logos/zoho.svg', name: 'Zoho Books', kind: 'Ledger' },
  { src: '/assets/logos/busy.jpg', name: 'BUSY', kind: 'Ledger' },
  { src: '/assets/logos/salesforce-official.svg', name: 'Salesforce', kind: 'CRM' },
  { src: '/assets/logos/slack.svg', name: 'Slack', kind: 'Messaging' },
  { src: '/assets/logos/confluence-official.svg', name: 'Confluence', kind: 'Knowledge' },
  { src: '/assets/logos/snowflake-official.svg', name: 'Snowflake', kind: 'Data warehouse' },
  { src: '/assets/logos/drive-official.svg', name: 'Google Drive', kind: 'Storage' },
  { src: '/assets/logos/sharepoint.svg', name: 'SharePoint', kind: 'Storage' },
  { mono: 'CK', name: 'CKYC', kind: 'Identity' },
]

export const metadata: Metadata = {
  title: 'Platform — Anvax',
  description: "Four capabilities purpose-built for India's regulated enterprises — search, chat, workflows, and agents with sovereign data residency baked in.",
  openGraph: {
    title: 'Platform — Anvax',
    description: "Four capabilities purpose-built for India's regulated enterprises.",
    url: 'https://www.anvax.in/platform',
  },
  twitter: { card: 'summary_large_image', title: 'Platform — Anvax', description: "Four capabilities purpose-built for India's regulated enterprises." },
  alternates: { canonical: 'https://www.anvax.in/platform' },
}

export default function Platform() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Platform</p>
            <h1 className={styles.heroH1}>
              Four capabilities.<br />
              One sovereign platform.<br />
              Built for India's regulatory stack.
            </h1>
            <p className={styles.heroLede}>
              Search, Chat, Workflows, and Agents — each with an India-stack connector layer,
              RBI-compliant audit trail, and per-tenant data isolation baked in by construction.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Capabilities"
            title="What your analysts can do on day one."
            lede="Four product surfaces, each designed for a specific job a compliance or credit team needs to do."
          />
          {capabilities.map((cap) => (
            <div key={cap.id} className={styles.capRow}>
              <div className={styles.capGrid}>
                <div className={styles.capLeft}>
                  <div className={styles.capTag}>
                    <Tag variant={cap.tagVariant}>{cap.tag}</Tag>
                  </div>
                  <h3 className={styles.capH3}>{cap.h3}</h3>
                  <p className={styles.capDesc}>{cap.desc}</p>
                </div>
                <div className={styles.capRight}>
                  <table className={styles.specsTable}>
                    <thead>
                      <tr>
                        <th>Spec</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cap.specs.map((row) => (
                        <tr key={row.spec}>
                          <td>{row.spec}</td>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Moats */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="Moats"
            title="Advantages that compound the longer you use Anvax."
            lede="Each layer deepens with every query, every workflow, every integration added to your instance. The platform gets more valuable, not just more familiar."
          />
          <div className={styles.moatsGrid}>
            {moats.map((m) => (
              <div key={m.h3} className={styles.moatCard}>
                <div className={styles.moatHeader}>
                  <div className={styles.moatIcon}>{m.icon}</div>
                  <h3 className={styles.moatH3}>{m.h3}</h3>
                </div>
                <p className={styles.moatDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* India stack logo wall */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="India stack"
            title="Every connector your regulated workflows need."
            lede="Pre-built integrations to India's government, regulatory, financial, and SaaS data sources."
          />
          <div className={styles.logoGrid}>
            {logoTiles.map((tile) => (
              <div key={tile.name} className={styles.logoTile}>
                {'mono' in tile ? (
                  <div className={styles.logoMark}>{tile.mono}</div>
                ) : (
                  <Image src={tile.src} alt={tile.name} width={48} height={48} className={styles.logoImg} style={{ objectFit: 'contain' }} />
                )}
                <span className={styles.logoName}>{tile.name}</span>
                <span className={styles.logoKind}>{tile.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
