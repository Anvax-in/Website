import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import StatusPill from '../components/ui/StatusPill'
import Button from '../components/ui/Button'
import styles from './Trust.module.css'

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

const defenceLayers = [
  {
    code: 'L1',
    layer: 'Transport',
    controls: 'TLS 1.3 enforced on all connections; HSTS preloaded',
    guarantee: 'No plaintext data in transit — ever',
  },
  {
    code: 'L2',
    layer: 'Identity & session',
    controls: 'Phishing-resistant authentication, short-lived tokens, sessions bound to tenant context',
    guarantee: 'Identity verified before any resource is touched',
  },
  {
    code: 'L3',
    layer: 'Request authorisation',
    controls: 'Every API call validated against tenant context before execution reaches the data layer',
    guarantee: 'No request proceeds without an explicit authorisation check',
  },
  {
    code: 'L4',
    layer: 'Least privilege',
    controls: 'Database connection demoted to minimum-required role per request; superuser access structurally unavailable to the application',
    guarantee: 'Application code cannot exceed its declared permissions',
  },
  {
    code: 'L5',
    layer: 'Storage isolation',
    controls: 'Row-level policy enforced at the database engine — not the application — with both read and write guards',
    guarantee: 'Tenant A data is unreachable from Tenant B at the storage layer',
  },
  {
    code: 'L6',
    layer: 'Search isolation',
    controls: 'Document retrieval scoped to tenant at the index layer before results are returned',
    guarantee: 'No cross-tenant document leakage through search or retrieval',
  },
  {
    code: 'L7',
    layer: 'Encryption at rest',
    controls: 'Per-tenant encryption keys; PII fields carry a second encryption pass independent of the primary store',
    guarantee: 'A storage dump yields no readable customer data',
  },
  {
    code: 'L8',
    layer: 'Audit integrity',
    controls: 'Append-only log with cryptographic chaining across every inference and data event; no record can be modified or deleted',
    guarantee: 'Every action is permanently attributable and tamper-evident',
  },
]

const aiControls = [
  { control: 'Hallucination mitigation', detail: 'Answers grounded in retrieved context only; model surfaces uncertainty rather than inventing — every response cites the source it drew from' },
  { control: 'PII auto-redaction', detail: 'Aadhaar, PAN, IFSC, GSTIN, UPI, mobile — detected and redacted before the model context window is assembled' },
  { control: 'Prompt isolation', detail: 'User input is structurally separated from system instructions; role boundaries enforced at the prompt layer, not relying on model instruction-following alone' },
  { control: 'Model pinning', detail: 'Model version locked per tenant tier; behaviour cannot change without an explicit upgrade decision and audit entry' },
  { control: 'Inference audit', detail: 'Every prompt, retrieved context, and completion stored in an append-only, cryptographically chained audit log' },
  { control: 'Data residency enforcement', detail: 'All inference routed within India — model calls, embeddings, retrieval — nothing crosses the geographic boundary' },
  { control: 'Spend controls', detail: 'Per-tenant token budgets with hard limits; anomalous usage patterns trigger alerts before they become incidents' },
  { control: 'Human-in-the-loop', detail: 'Credit decisions, compliance filings, and audit outputs require explicit human sign-off before any downstream action is taken' },
]

const freeAiControls = [
  { ref: 'R7',  control: 'AI Use-Case Registry',       detail: 'Every AI use case catalogued with business purpose, data inputs, and risk classification — exportable for examiner review' },
  { ref: 'R8',  control: 'Board oversight docs',        detail: 'Board-level AI governance documentation synthesised automatically from the audit trail' },
  { ref: 'R15', control: 'Periodic board reporting',    detail: 'Usage, incident, and risk summaries generated on a defined cadence for board-level visibility' },
  { ref: 'R17', control: 'Model version governance',    detail: 'Every model version change logged with date, rationale, and approval; rollback is a single operation' },
  { ref: 'R18', control: 'Human gate on high-risk',     detail: 'Credit decisions, compliance filings, and audit outputs require explicit human sign-off before execution' },
  { ref: 'R19', control: 'Explainability by design',    detail: 'Every AI output cites the specific source document and retrieval context it drew from — not a post-hoc explanation layer' },
  { ref: 'R23', control: 'Immutable inference trail',   detail: 'Cryptographically chained audit log across every inference event; no record can be modified or deleted after the fact' },
  { ref: 'R26', control: 'Real-time LLM monitoring',   detail: 'Token usage, latency, error rates, and behavioural anomalies monitored continuously — not sampled' },
]

const certifications = [
  { name: 'DPDP Act 2023', status: 'live' as const, note: 'Controls implemented' },
  { name: 'SOC 2 Type II', status: 'wip' as const, note: 'In progress' },
  { name: 'ISO 27001', status: 'wip' as const, note: 'In progress' },
  { name: 'CERT-In empanelment', status: 'wip' as const, note: 'Initiated' },
]

const engStats = [
  { num: '8', label: 'Defence-in-depth layers from transport to audit chain' },
  { num: '100%', label: 'Queries logged to immutable audit trail' },
  { num: '0', label: 'Third-party sub-processors with access to customer data' },
  { num: 'India', label: 'All data, embeddings, and inference traces stay in country' },
]

export default function Trust() {
  return (
    <>
      <PageMeta
        title="Architecture & Trust — Anvax"
        description="Full defence-in-depth, RBI FREE-AI mapping, DPDP controls, and honest certification status."
      />

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
            {engStats.map((s) => (
              <div key={s.num} className={styles.glanceCell}>
                <div className={styles.glanceStat}>{s.num}</div>
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
            lede="Each layer operates independently. A failure at one does not cascade to the next — and each guarantee is verifiable by your security team."
          />
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Name</th>
                <th>How it works</th>
                <th>What it guarantees</th>
              </tr>
            </thead>
            <tbody>
              {defenceLayers.map((row) => (
                <tr key={row.code}>
                  <td><span className={styles.layerCode}>{row.code}</span></td>
                  <td style={{ fontWeight: 500, color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>{row.layer}</td>
                  <td>{row.controls}</td>
                  <td style={{ color: 'var(--ink-500)' }}>{row.guarantee}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Control</th>
                <th>Implementation</th>
              </tr>
            </thead>
            <tbody>
              {aiControls.map((row) => (
                <tr key={row.control}>
                  <td>{row.control}</td>
                  <td>{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Control</th>
                <th>Anvax implementation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {freeAiControls.map((row) => (
                <tr key={row.ref}>
                  <td>
                    <span className={styles.layerCode}>{row.ref}</span>
                  </td>
                  <td style={{ fontWeight: 500, color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>{row.control}</td>
                  <td>{row.detail}</td>
                  <td><StatusPill status="live">Live</StatusPill></td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <table className={styles.dataTable} style={{ marginTop: 32 }}>
            <thead>
              <tr>
                <th>DPDP requirement</th>
                <th>Anvax implementation</th>
              </tr>
            </thead>
            <tbody>
              {[
                { req: 'Data minimisation', impl: 'Only required fields ingested; PII auto-redacted before LLM context window' },
                { req: 'Purpose limitation', impl: 'System prompts scoped per role; model cannot deviate from defined purpose' },
                { req: 'Consent record', impl: 'Consent events logged to append-only audit_log with timestamp and session ID' },
                { req: 'Breach notification', impl: 'Real-time anomaly detection; security team alert within 15 minutes of detection' },
                { req: 'Data fiduciary obligations', impl: 'Customer retains ownership; Anvax is data processor; DPA available on request' },
                { req: 'Right to erasure', impl: 'Tenant data deletion pipeline with cryptographic key destruction for DEK-encrypted fields' },
              ].map((row) => (
                <tr key={row.req}>
                  <td>{row.req}</td>
                  <td>{row.impl}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <div className={styles.downloadCard}>
              <h3 className={styles.downloadTitle}>Security architecture brief</h3>
              <p className={styles.downloadDesc}>
                12-page PDF covering the full defence-in-depth stack, threat model, encryption architecture,
                and RBI FREE-AI control mapping. Suitable for CISO review and vendor security assessment.
              </p>
              <form className={styles.downloadForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Work email"
                  className={styles.downloadInput}
                  required
                />
                <Button variant="accent" href="/contact">Request PDF</Button>
              </form>
            </div>
            <div className={styles.downloadCard}>
              <h3 className={styles.downloadTitle}>Penetration test summary</h3>
              <p className={styles.downloadDesc}>
                Executive summary of the most recent third-party penetration test. Includes scope,
                methodology, findings classification, and remediation status. Available under NDA.
              </p>
              <form className={styles.downloadForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Work email"
                  className={styles.downloadInput}
                  required
                />
                <Button variant="accent" href="/contact">Request under NDA</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
