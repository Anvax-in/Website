import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import StatusPill from '../components/ui/StatusPill'
import Term from '../components/ui/Term'
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
    controls: 'TLS 1.3, HSTS',
    protects: 'Eavesdropping, MITM',
  },
  {
    code: 'L2',
    layer: 'AuthN',
    controls: 'JWT, Argon2id, Google OAuth, session binding to tenant',
    protects: 'Credential stuffing, session hijacking',
  },
  {
    code: 'L3',
    layer: 'AuthZ',
    controls: 'Tenant scope middleware + Pydantic',
    protects: 'Cross-tenant request forgery',
  },
  {
    code: 'L4',
    layer: 'DB role demotion',
    controls: 'SET LOCAL ROLE anvax_app (NOSUPERUSER, NOBYPASSRLS)',
    protects: 'Privilege escalation via ORM bug',
  },
  {
    code: 'L5',
    layer: 'Row-Level Security',
    controls: 'Postgres RLS FORCE with USING + WITH CHECK',
    protects: 'Cross-tenant data read/write',
  },
  {
    code: 'L6',
    layer: 'Search-layer DLS',
    controls: 'OpenSearch Document-Level Security tenant_id',
    protects: 'Cross-tenant retrieval',
  },
  {
    code: 'L7',
    layer: 'Encryption at rest',
    controls: 'Per-tenant DEK (HKDF), AES-256-GCM on PII + OAuth',
    protects: 'DB dump exposure',
  },
  {
    code: 'L8',
    layer: 'Audit chain',
    controls: 'Append-only audit_log + immutable inference_traces SHA-256 chained, DDL trigger blocks UPDATE/DELETE',
    protects: 'Tampering, repudiation',
  },
]

const aiControls = [
  { control: 'Hallucination mitigation', detail: 'RAG grounding, "not found in corpus" instruction, top-k citation requirement' },
  { control: 'PII auto-redaction', detail: 'Aadhaar, PAN, IFSC, GSTIN, UPI, mobile — detected before model context window' },
  { control: 'Prompt injection guard', detail: 'Input sanitisation, user-vs-system prompt separation, role boundary enforcement' },
  { control: 'Model pinning', detail: 'Specific model version per tenant tier; no silent model upgrades' },
  { control: 'Inference trace', detail: 'Every prompt, context, and completion logged to immutable inference_traces table' },
  { control: 'IMDS firewall', detail: '169.254.169.254 blocked at host level; iptables rule prevents SSRF exfiltration' },
  { control: 'Data residency', detail: 'All inference routed through ap-south-1; no data sent outside India boundary' },
  { control: 'Spend controls', detail: 'Per-tenant token budget, rate limits, hard-stop on anomalous spikes' },
  { control: 'Human-in-the-loop', detail: 'High-risk workflow steps require human approval before proceeding' },
]

const freeAiControls = [
  { ref: 'R7', control: 'AI Use-Case Registry', detail: 'Every AI use case catalogued with business purpose, data inputs, and risk classification' },
  { ref: 'R8', control: 'Board oversight docs', detail: 'Board-level AI governance documentation generated from audit trail' },
  { ref: 'R15', control: 'Board report on AI use', detail: 'Periodic board reporting on AI usage, incidents, and risk metrics' },
  { ref: 'R17', control: 'Model version tracking', detail: 'Every model version change logged with date, reason, and approval' },
  { ref: 'R18', control: 'Human-in-the-loop high-risk', detail: 'Workflow gates require human sign-off for credit, compliance, and audit decisions' },
  { ref: 'R19', control: 'Explainability', detail: 'Every AI output includes source citations and retrieval context' },
  { ref: 'R23', control: 'Immutable inference trail', detail: 'SHA-256 chained inference_traces; DDL triggers block UPDATE/DELETE' },
  { ref: 'R26', control: 'LLM monitoring', detail: 'Real-time monitoring of token usage, latency, error rates, and anomalous patterns' },
]

const certifications = [
  { name: 'DPDP Act 2023', status: 'live' as const, note: 'Controls implemented' },
  { name: 'SOC 2 Type II', status: 'wip' as const, note: 'Q3 2026' },
  { name: 'ISO 27001', status: 'wip' as const, note: 'Q4 2026' },
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
            title="Eight layers from transport to audit chain."
            lede="Each layer addresses a distinct threat. They stack — a breach at one layer does not compromise the next."
          />
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Name</th>
                <th>Controls</th>
                <th>Protects against</th>
              </tr>
            </thead>
            <tbody>
              {defenceLayers.map((row) => (
                <tr key={row.code}>
                  <td>
                    <span className={styles.layerCode}>{row.code}</span>
                  </td>
                  <td style={{ fontWeight: 500, color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>{row.layer}</td>
                  <td>
                    {row.code === 'L2' && (
                      <>JWT, <Term>Argon2id</Term>, Google OAuth, session binding to tenant</>
                    )}
                    {row.code === 'L4' && (
                      <><Term>SET LOCAL ROLE anvax_app</Term> (NOSUPERUSER, NOBYPASSRLS)</>
                    )}
                    {row.code === 'L5' && (
                      <><Term>Postgres RLS FORCE</Term> with USING + WITH CHECK</>
                    )}
                    {row.code === 'L7' && (
                      <>Per-tenant DEK (HKDF), <Term>AES-256-GCM</Term> on PII + OAuth</>
                    )}
                    {row.code === 'L8' && (
                      <>Append-only <Term>audit_log</Term> + immutable <Term>inference_traces</Term> SHA-256 chained, DDL trigger blocks UPDATE/DELETE</>
                    )}
                    {!['L2','L4','L5','L7','L8'].includes(row.code) && row.controls}
                  </td>
                  <td>{row.protects}</td>
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
            title="Nine controls specific to LLM-based systems."
            lede="Traditional security controls don't cover AI-specific attack surfaces. These nine controls do."
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
                  <td>
                    {row.control === 'Inference trace' && (
                      <>Every prompt, context, and completion logged to immutable <Term>inference_traces</Term> table</>
                    )}
                    {row.control === 'IMDS firewall' && (
                      <><Term>169.254.169.254</Term> blocked at host level; iptables rule prevents SSRF exfiltration</>
                    )}
                    {!['Inference trace', 'IMDS firewall'].includes(row.control) && row.detail}
                  </td>
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
                  <td>
                    {row.ref === 'R23' && (
                      <>SHA-256 chained <Term>inference_traces</Term>; DDL triggers block UPDATE/DELETE</>
                    )}
                    {row.ref !== 'R23' && row.detail}
                  </td>
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
            title="Numbers your security team can verify."
            dark
          />
          <div className={styles.statGrid}>
            {[
              { num: 'P95 < 1.4s', label: 'End-to-end query latency including model call and audit write' },
              { num: '99.9%', label: 'Uptime SLA on Growth tier and above' },
              { num: 'ap-south-1', label: 'Single region; all data, embeddings, traces stay in India' },
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
