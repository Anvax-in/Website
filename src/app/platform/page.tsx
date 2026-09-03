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
    desc: 'Hybrid retrieval (dense vectors plus BM25 keyword) across PDFs, policy documents, contracts, regulatory guidance, emails, and structured data. Results arrive with source citations and paragraph-level provenance.',
    specs: [
      { spec: 'Retrieval', value: 'Dense + BM25 hybrid, reranked by cross-encoder' },
      { spec: 'Sources', value: 'PDF, DOCX, XLSX, JSON, emails, database views' },
      { spec: 'Citations', value: 'Paragraph-level, page number, document title' },
      { spec: 'PII guard', value: 'Auto-redact PII, PCI, PHI across text and structured data' },
      { spec: 'Latency', value: 'P95 < 1.4 s end-to-end including model call' },
    ],
  },
  {
    id: 'chat',
    tag: 'Chat',
    tagVariant: 'live' as const,
    h3: 'Multi-turn grounded chat that never hallucinates a regulation.',
    desc: 'Every answer is anchored to retrieved context. The model is instructed to say "not found in corpus" rather than fabricate. Thread history stays scoped to tenant, never mixed across customers.',
    specs: [
      { spec: 'Grounding', value: 'RAG with top-k=12, context window 128 K' },
      { spec: 'Tenancy', value: 'Strict RLS, threads never cross tenant boundary' },
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
    desc: 'Drag-and-drop workflow builder for recurring tasks: regulatory circular triage, policy memo drafting, audit checklist generation, contract review. Each step can require human approval before proceeding.',
    specs: [
      { spec: 'Builder', value: 'Visual node graph with conditional branching' },
      { spec: 'Triggers', value: 'Manual, scheduled (cron), webhook, email ingest' },
      { spec: 'Human gate', value: 'Approval step with deadline + escalation path' },
      { spec: 'Outputs', value: 'PDF, DOCX, structured JSON, email, webhook' },
      { spec: 'Templates', value: 'Regulatory triage, policy memo, audit checklist, contract review' },
    ],
  },
  {
    id: 'agents',
    tag: 'Agents',
    tagVariant: 'next' as const,
    h3: 'Persistent agents that monitor your regulatory environment 24/7.',
    desc: 'Long-running agents watch the regulatory feeds for your jurisdiction. When a new circular or guidance drops, they classify, summarise, and route to the right team before your compliance officer opens email.',
    specs: [
      { spec: 'Monitoring', value: 'Regulatory feed polling with delta diff and jurisdiction routing' },
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
    desc: 'Every query, decision, and approval becomes part of a continuously updated corpus. The longer you use Anvax, the smarter your tenant instance gets, without any data leaving your boundary.',
  },
  {
    icon: '🔌',
    h3: 'Enterprise connector depth',
    desc: 'Microsoft 365, Google Workspace, Slack, Confluence, SharePoint, Salesforce, Snowflake, and Jira are pre-connected. Each integration takes weeks to build correctly — all of them ship on day one.',
  },
  {
    icon: '🗺️',
    h3: 'Jurisdiction packs',
    desc: 'Not a horizontal AI with a compliance checkbox. Control mappings, regulatory feeds, and workflow templates ship per jurisdiction — EU, UK, Gulf, Singapore, India, US — built from real customer requirements.',
  },
  {
    icon: '📋',
    h3: 'Compliance by construction',
    desc: 'Postgres RLS, per-tenant encryption keys, immutable audit chain, framework control mappings: not features you configure. They are the foundation. You cannot turn them off.',
  },
]

const logoTiles = [
  { src: '/assets/logos/slack.svg', name: 'Slack', kind: 'Messaging' },
  { src: '/assets/logos/confluence-official.svg', name: 'Confluence', kind: 'Knowledge' },
  { src: '/assets/logos/sharepoint.svg', name: 'SharePoint', kind: 'Storage' },
  { src: '/assets/logos/drive-official.svg', name: 'Google Drive', kind: 'Storage' },
  { src: '/assets/logos/salesforce-official.svg', name: 'Salesforce', kind: 'CRM' },
  { src: '/assets/logos/snowflake-official.svg', name: 'Snowflake', kind: 'Data warehouse' },
  { src: '/assets/logos/zoho.svg', name: 'Zoho Books', kind: 'Ledger' },
  { src: '/assets/logos/gst.png', name: 'GST Portal', kind: 'Regional · Tax' },
  { src: '/assets/logos/mca.png', name: 'MCA21', kind: 'Regional · Corporate' },
  { src: '/assets/logos/rbi.png', name: 'RBI Circulars', kind: 'Regional · Regulator' },
  { src: '/assets/logos/npci.svg', name: 'UPI / NPCI', kind: 'Regional · Payments' },
  { src: '/assets/logos/digilocker.svg', name: 'DigiLocker', kind: 'Regional · Identity' },
  { src: '/assets/logos/account-aggregator.svg', name: 'Account Aggregator', kind: 'Regional · Finance' },
  { src: '/assets/logos/sebi.jpg', name: 'SEBI', kind: 'Regional · Regulator' },
  { src: '/assets/logos/irdai.png', name: 'IRDAI', kind: 'Regional · Regulator' },
  { src: '/assets/logos/tally.png', name: 'Tally', kind: 'Regional · Ledger' },
  { src: '/assets/logos/busy.jpg', name: 'BUSY', kind: 'Regional · Ledger' },
  { mono: 'CK', name: 'CKYC', kind: 'Regional · Identity' },
]

export const metadata: Metadata = {
  title: 'Platform | Anvax',
  description: 'Four capabilities for enterprises that cannot use public AI — search, chat, workflows, and agents with audit trail and data residency baked in.',
  openGraph: {
    title: 'Platform | Anvax',
    description: 'Four capabilities for enterprises that cannot use public AI — search, chat, workflows, and agents with audit trail and data residency baked in.',
    url: 'https://www.anvax.in/platform',
  },
  twitter: { card: 'summary_large_image', title: 'Platform | Anvax', description: 'Search, chat, workflows, and agents — governed, audited, inside your perimeter.' },
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
              One governed platform.<br />
              Inside your perimeter.
            </h1>
            <p className={styles.heroLede}>
              Search, Chat, Workflows, and Agents — each with an enterprise connector layer,
              framework-mapped audit trail, and per-tenant data isolation baked in by construction.
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

      {/* Connector logo wall */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Connectors"
            title="The enterprise stack, pre-connected. Regional packs by jurisdiction."
            lede="Enterprise connectors ship in every deployment. Regional packs — India, Gulf, EU — are available per jurisdiction, not the default headline."
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
