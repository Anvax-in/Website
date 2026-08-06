'use client'

import { useState } from 'react'
import SectionHead from '@/components/ui/SectionHead'
import StatusPill from '@/components/ui/StatusPill'
import Button from '@/components/ui/Button'
import styles from '@/pages/Trust.module.css'

const subnavLinks = [
  { id: 'platform-glance', label: 'Platform' },
  { id: 'defence', label: 'Defence-in-depth' },
  { id: 'ai-controls', label: 'AI controls' },
  { id: 'free-ai', label: 'RBI FREE-AI' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'dpdp', label: 'DPDP' },
  { id: 'downloads', label: 'Downloads' },
]

const glanceStats = [
  { num: '8', color: 'var(--blue)', label: 'Defence-in-depth layers from transport to audit chain' },
  { num: '100%', color: 'var(--teal)', label: 'Queries logged to immutable audit trail' },
  { num: '0', color: 'var(--ink-900)', label: 'Third-party sub-processors with access to customer data' },
  { num: 'India', color: 'var(--blue)', label: 'All data, embeddings, and inference traces stay in country' },
]

const defenceLayers = [
  {
    code: 'L1',
    layer: 'Transport',
    how: 'TLS 1.3 enforced on all connections; HSTS preloaded.',
    guarantee: 'No plaintext data in transit, ever',
  },
  {
    code: 'L2',
    layer: 'Identity & session',
    how: 'Phishing-resistant authentication, short-lived tokens, sessions bound to tenant context.',
    guarantee: 'Identity verified before any resource is touched',
  },
  {
    code: 'L3',
    layer: 'Request authorisation',
    how: 'Every API call validated against tenant context before execution reaches the data layer.',
    guarantee: 'No request proceeds without an explicit authorisation check',
  },
  {
    code: 'L4',
    layer: 'Least privilege',
    how: 'Database connection demoted to minimum-required role per request; superuser access structurally unavailable to the application.',
    guarantee: 'Application code cannot exceed its declared permissions',
  },
  {
    code: 'L5',
    layer: 'Storage isolation',
    how: 'Row-level policy enforced at the database engine, not the application, with both read and write guards.',
    guarantee: 'Tenant A data is unreachable from Tenant B at the storage layer',
  },
  {
    code: 'L6',
    layer: 'Search isolation',
    how: 'Document retrieval scoped to tenant at the index layer before results are returned.',
    guarantee: 'No cross-tenant document leakage through search or retrieval',
  },
  {
    code: 'L7',
    layer: 'Encryption at rest',
    how: 'Per-tenant encryption keys; PII fields carry a second encryption pass independent of the primary store.',
    guarantee: 'A storage dump yields no readable customer data',
  },
  {
    code: 'L8',
    layer: 'Audit integrity',
    how: 'Append-only log with cryptographic chaining across every inference and data event; no record can be modified or deleted.',
    guarantee: 'Every action is permanently attributable and tamper-evident',
  },
]

const aiControls = [
  { title: 'Hallucination mitigation', color: 'var(--blue)', icon: 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 21h6', copy: 'Answers grounded in retrieved context only; model surfaces uncertainty rather than inventing, every response cites the source it drew from.' },
  { title: 'PII auto-redaction', color: 'var(--teal)', icon: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM3 3l18 18', copy: 'Aadhaar, PAN, IFSC, GSTIN, UPI, mobile, detected and redacted before the model context window is assembled.' },
  { title: 'Prompt isolation', color: 'var(--ink-900)', icon: 'M4 4h7v16H4zM13 4h7v16h-7', copy: 'User input is structurally separated from system instructions; role boundaries enforced at the prompt layer, not relying on model instruction-following alone.' },
  { title: 'Model pinning', color: 'var(--blue)', icon: 'M12 2v9M12 11l4 4v3H8v-3l4-4zM12 18v4', copy: 'Model version locked per tenant tier; behaviour cannot change without an explicit upgrade decision and audit entry.' },
  { title: 'Inference audit', color: 'var(--teal)', icon: 'M4 3h12l4 4v14H4zM8 12h8M8 16h5', copy: 'Every prompt, retrieved context, and completion stored in an append-only, cryptographically chained audit log.' },
  { title: 'Data residency enforcement', color: 'var(--ink-900)', icon: 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zM12 10h.01', copy: 'All inference routed within India, model calls, embeddings, retrieval, nothing crosses the geographic boundary.' },
  { title: 'Spend controls', color: 'var(--blue)', icon: 'M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', copy: 'Per-tenant token budgets with hard limits; anomalous usage patterns trigger alerts before they become incidents.' },
  { title: 'Human-in-the-loop', color: 'var(--teal)', icon: 'M20 6 9 17l-5-5', copy: 'Credit decisions, compliance filings, and audit outputs require explicit human sign-off before any downstream action is taken.' },
]

const freeAiControls = [
  { ref: 'R7', control: 'AI Use-Case Registry', detail: 'Every AI use case catalogued with business purpose, data inputs, and risk classification, exportable for examiner review' },
  { ref: 'R8', control: 'Board oversight docs', detail: 'Board-level AI governance documentation synthesised automatically from the audit trail' },
  { ref: 'R15', control: 'Periodic board reporting', detail: 'Usage, incident, and risk summaries generated on a defined cadence for board-level visibility' },
  { ref: 'R17', control: 'Model version governance', detail: 'Every model version change logged with date, rationale, and approval; rollback is a single operation' },
  { ref: 'R18', control: 'Human gate on high-risk', detail: 'Credit decisions, compliance filings, and audit outputs require explicit human sign-off before execution' },
  { ref: 'R19', control: 'Explainability by design', detail: 'Every AI output cites the specific source document and retrieval context it drew from, not a post-hoc explanation layer' },
  { ref: 'R23', control: 'Immutable inference trail', detail: 'Cryptographically chained audit log across every inference event; no record can be modified or deleted after the fact' },
  { ref: 'R26', control: 'Real-time LLM monitoring', detail: 'Token usage, latency, error rates, and behavioural anomalies monitored continuously, not sampled' },
]

const certifications = [
  { name: 'DPDP Act 2023', status: 'live' as const, note: 'Controls implemented', pct: '100%' },
  { name: 'SOC 2 Type II', status: 'wip' as const, note: 'In progress', pct: '55%' },
  { name: 'ISO 27001', status: 'wip' as const, note: 'In progress', pct: '45%' },
  { name: 'CERT-In empanelment', status: 'wip' as const, note: 'Initiated', pct: '20%' },
]

const dpdpRequirements = [
  { req: 'Data minimisation', impl: 'Only required fields ingested; PII auto-redacted before LLM context window' },
  { req: 'Purpose limitation', impl: 'System prompts scoped per role; model cannot deviate from defined purpose' },
  { req: 'Consent record', impl: 'Consent events logged to append-only audit_log with timestamp and session ID' },
  { req: 'Breach notification', impl: 'Real-time anomaly detection; security team alert within 15 minutes of detection' },
  { req: 'Data fiduciary obligations', impl: 'Customer retains ownership; Anvax is data processor; DPA available on request' },
  { req: 'Right to erasure', impl: 'Tenant data deletion pipeline with cryptographic key destruction for DEK-encrypted fields' },
]

const downloads = [
  {
    title: 'Security architecture brief',
    cta: 'Request PDF',
    icon: 'M14 2H6v20h12V8zM14 2v6h6M9 14h6M9 18h4',
    copy: '12-page PDF covering the full defence-in-depth stack, threat model, encryption architecture, and RBI FREE-AI control mapping. Suitable for CISO review and vendor security assessment.',
  },
  {
    title: 'Penetration test summary',
    cta: 'Request under NDA',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6zM9 12l2 2 4-4',
    copy: 'Executive summary of the most recent third-party penetration test. Includes scope, methodology, findings classification, and remediation status. Available under NDA.',
  },
]

function CheckIcon({ size = 16, color = 'var(--teal)' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function TrustClient() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeLayer = defenceLayers[activeIdx]

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Architecture & Trust</p>
            <h1 className={styles.heroH1}>
              What your CISO needs to see.<br />
              What your examiner needs to read.
            </h1>
            <p className={styles.heroLede}>
              Full technical architecture, defence-in-depth layers, RBI FREE-AI control mapping,
              and honest certification status. No marketing. No vague assurances.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky subnav */}
      <nav className={styles.subnav} aria-label="Trust page sections">
        <div className="container">
          <div className={styles.subnavInner}>
            {subnavLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className={styles.subnavLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Platform at a glance */}
      <section className="section" id="platform-glance">
        <div className="container">
          <SectionHead
            eyebrow="Platform at a glance"
            title="The architecture in four numbers."
          />
          <div className={styles.glanceGrid}>
            {glanceStats.map((s) => (
              <div key={s.num} className={styles.glanceCell}>
                <div className={styles.glanceStat} style={{ color: s.color }}>{s.num}</div>
                <div className={styles.glanceLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defence-in-depth */}
      <section className="section alt" id="defence">
        <div className="container">
          <SectionHead
            eyebrow="Defence-in-depth"
            title="Eight independent security guarantees."
            lede="Each layer operates independently. A failure at one does not cascade to the next, and each guarantee is verifiable by your security team. Select a layer to read how it works."
          />
          <div className={styles.layerWrap}>
            <div className={styles.layerList}>
              {defenceLayers.map((L, i) => {
                const active = i === activeIdx
                return (
                  <button
                    key={L.code}
                    type="button"
                    className={`${styles.layerRow} ${active ? styles.active : ''}`}
                    onClick={() => setActiveIdx(i)}
                    aria-current={active}
                  >
                    <span className={`${styles.layerChip} ${active ? styles.active : ''}`}>{L.code}</span>
                    <span className={styles.layerName}>{L.layer}</span>
                    <span
                      className={`${styles.layerBar} ${active ? styles.active : ''}`}
                      style={{ width: 24 + i * 5 }}
                    />
                  </button>
                )
              })}
            </div>
            <div className={styles.layerDetail}>
              <div className={styles.layerDetailHead}>
                <span className={styles.layerBadge}>{activeLayer.code}</span>
                <h3 className={styles.layerDetailTitle}>{activeLayer.layer}</h3>
              </div>
              <p className={styles.detailLabel}>How it works</p>
              <p className={styles.detailText}>{activeLayer.how}</p>
              <p className={styles.detailLabel}>What it guarantees</p>
              <div className={styles.guaranteeBox}>
                <CheckIcon />
                <p className={styles.guaranteeText}>{activeLayer.guarantee}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-specific controls */}
      <section className="section" id="ai-controls">
        <div className="container">
          <SectionHead
            eyebrow="AI controls"
            title="Security controls designed for AI, not retrofitted from the last decade."
            lede="AI systems introduce attack surfaces that traditional security frameworks weren't built for. These controls address each one directly."
          />
          <div className={styles.aiGrid}>
            {aiControls.map((c) => (
              <div key={c.title} className={styles.aiCard}>
                <div className={styles.aiIconWrap} style={{ background: c.color }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </div>
                <h3 className={styles.aiTitle}>{c.title}</h3>
                <p className={styles.aiCopy}>{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RBI FREE-AI mapping */}
      <section className="section alt" id="free-ai">
        <div className="container">
          <SectionHead
            eyebrow="RBI FREE-AI"
            title="Eight FREE-AI controls mapped to Anvax implementation."
            lede="RBI's FREE-AI framework defines governance requirements for AI in regulated financial entities. Here is how Anvax implements each."
          />
          <div className={styles.freeAiGrid}>
            {freeAiControls.map((f) => (
              <div key={f.ref} className={styles.freeAiCard}>
                <CheckIcon />
                <div>
                  <h3 className={styles.freeAiTitle}>{f.control}</h3>
                  <p className={styles.freeAiCopy}>{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering posture */}
      <section className="section dark" id="engineering">
        <div className="container">
          <SectionHead
            eyebrow="Engineering posture"
            title="Architecture commitments your security team can hold us to."
            dark
          />
          <div className={styles.statGrid}>
            {[
              { num: 'P95 < 1.4s', label: 'End-to-end query latency including model call and audit write' },
              { num: '99.9%', label: 'Uptime SLA on Growth tier and above' },
              { num: 'India', label: 'All data, embeddings, and inference traces stay in country' },
              { num: '0', label: 'Third-party sub-processors with access to your tenant data' },
            ].map((s) => (
              <div key={s.num} className={styles.statCard}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section" id="certifications">
        <div className="container">
          <SectionHead
            eyebrow="Certifications"
            title="Honest status. No vanity badges."
            lede="We list what is live, what is in progress, and when we expect to complete it. No checkmarks for certifications we haven't started."
          />
          <div className={styles.certGrid}>
            {certifications.map((c) => (
              <div key={c.name} className={styles.certCard}>
                <StatusPill status={c.status}>
                  {c.status === 'live' ? 'Live' : c.status === 'wip' ? 'In progress' : 'Planned'}
                </StatusPill>
                <div className={styles.certName}>{c.name}</div>
                <div className={styles.certTrack}>
                  <div
                    className={styles.certFill}
                    style={{ width: c.pct, background: c.status === 'live' ? 'var(--sage-700)' : 'var(--amber-700)' }}
                  />
                </div>
                <div className={styles.certNote}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DPDP */}
      <section className="section alt" id="dpdp">
        <div className="container">
          <SectionHead
            eyebrow="DPDP Act 2023"
            title="India's data protection law, implemented by construction."
            lede="The Digital Personal Data Protection Act 2023 requires data minimisation, purpose limitation, and breach notification. Anvax satisfies all three at the platform level."
          />
          <div className={styles.dpdpGrid}>
            {dpdpRequirements.map((d) => (
              <div key={d.req} className={styles.dpdpCard}>
                <h3 className={styles.dpdpTitle}>{d.req}</h3>
                <div className={styles.dpdpImpl}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <p>{d.impl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gated downloads */}
      <section className="section" id="downloads">
        <div className="container">
          <SectionHead
            eyebrow="Downloads"
            title="Technical documentation for your security team."
            lede="Leave your work email and we'll send the documents directly. No sales call required for security review."
          />
          <div className={styles.downloadGrid}>
            {downloads.map((dl) => (
              <div key={dl.title} className={styles.downloadCard}>
                <div className={styles.downloadIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={dl.icon} />
                  </svg>
                </div>
                <h3 className={styles.downloadTitle}>{dl.title}</h3>
                <p className={styles.downloadDesc}>{dl.copy}</p>
                <form className={styles.downloadForm} onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Work email"
                    className={styles.downloadInput}
                    required
                  />
                  <Button variant="accent" href="/contact">{dl.cta}</Button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
