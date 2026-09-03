'use client'

import { useState } from 'react'
import SectionHead from '@/components/ui/SectionHead'
import StatusPill from '@/components/ui/StatusPill'
import Button from '@/components/ui/Button'
import styles from '@/pages/Trust.module.css'

const subnavLinks = [
  { id: 'controls', label: 'Controls' },
  { id: 'questions', label: 'Real questions' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'mappings', label: 'Framework mappings' },
  { id: 'defence', label: 'Architecture' },
  { id: 'faq', label: 'FAQ' },
  { id: 'downloads', label: 'Downloads' },
]

const glanceStats = [
  { num: '8', color: 'var(--blue)', label: 'Defence-in-depth layers from transport to audit chain' },
  { num: '100%', color: 'var(--teal)', label: 'Queries logged to immutable audit trail' },
  { num: '0', color: 'var(--ink-900)', label: 'Third-party sub-processors with access to customer data' },
  { num: 'In-region', color: 'var(--blue)', label: 'All data, embeddings, and inference stay where you choose' },
]

const sixControls = [
  {
    title: 'Deployed inside your perimeter',
    body: 'Anvax runs in your AWS, Azure, or GCP account, on a sovereign-cloud partner in your region, or on-prem with no outbound network. We never hold your data. There is no Anvax-side copy to breach.',
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    color: 'var(--teal)',
  },
  {
    title: 'Read-only connectors by default',
    body: 'Connectors pull documents and records; they do not write back. Write actions are off until an admin enables them per connector, and every enabled write goes through an approval step.',
    icon: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    color: 'var(--blue)',
  },
  {
    title: 'Tenant and workspace isolation',
    body: 'Postgres row-level security and per-tenant encryption keys separate every customer and every workspace. A user cannot surface a document through chat that they could not open directly.',
    icon: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    color: 'var(--ink-900)',
  },
  {
    title: 'Identity you already run',
    body: 'SSO via SAML/OIDC, SCIM provisioning, role-based access (Owner, Admin, Member, Guest), and per-workspace connector scoping. A finance workstream sees finance systems; a sales workstream does not.',
    icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    color: 'var(--teal)',
  },
  {
    title: 'Encryption and key control',
    body: 'TLS 1.3 in transit, per-tenant encryption at rest, customer-managed keys on the private-cloud and on-prem tiers. Secrets for connectors are stored encrypted and never exposed to the model.',
    icon: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
    color: 'var(--blue)',
  },
  {
    title: 'No training on your data. Ever.',
    body: 'Models run in your tenant. Prompts, documents, and outputs are not used to train any model, and there is no shared model across customers to leak into.',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9.5 9.5l5 5M14.5 9.5l-5 5',
    color: 'var(--ink-900)',
  },
]

const questions = [
  {
    role: 'The CISO asks',
    q: '"What can the AI actually reach?"',
    a: 'Only what the signed-in user can already reach. Every retrieval is permission-checked against the source system\'s ACLs at query time, not at index time, so a revoked permission takes effect immediately. Connector scope is set per workspace by an admin. On the on-prem tier, egress is blocked at the network layer; the model cannot call out even if prompted to.',
  },
  {
    role: 'The General Counsel asks',
    q: '"If a regulator asks what the AI said and why, can we answer?"',
    a: 'Yes, from the audit log. Every query records the user, timestamp, the exact documents retrieved (with versions), the model and prompt template used, the answer, and any approvals on write actions. The log is append-only and exportable. This is the same trail we map to SOC 2, ISO 27001, EU AI Act record-keeping, and RBI FREE-AI.',
  },
  {
    role: 'The auditor asks',
    q: '"Show me a control, not a slide."',
    a: 'Pick one. Retrieval scoping, audit immutability, key custody, and connector write-gating each map to a named control in the framework tabs below, with the implementing component and how to test it. We would rather you test it than trust it.',
  },
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
  { title: 'PII auto-redaction', color: 'var(--teal)', icon: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM3 3l18 18', copy: 'PII — names, ID numbers, payment card data, health identifiers — detected and redacted before the model context window is assembled.' },
  { title: 'Prompt isolation', color: 'var(--ink-900)', icon: 'M4 4h7v16H4zM13 4h7v16h-7', copy: 'User input is structurally separated from system instructions; role boundaries enforced at the prompt layer, not relying on model instruction-following alone.' },
  { title: 'Model pinning', color: 'var(--blue)', icon: 'M12 2v9M12 11l4 4v3H8v-3l4-4zM12 18v4', copy: 'Model version locked per tenant tier; behaviour cannot change without an explicit upgrade decision and audit entry.' },
  { title: 'Inference audit', color: 'var(--teal)', icon: 'M4 3h12l4 4v14H4zM8 12h8M8 16h5', copy: 'Every prompt, retrieved context, and completion stored in an append-only, cryptographically chained audit log.' },
  { title: 'Data residency enforcement', color: 'var(--ink-900)', icon: 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zM12 10h.01', copy: 'All inference, embeddings, and retrieval routed within your chosen region — nothing crosses the perimeter you define.' },
  { title: 'Spend controls', color: 'var(--blue)', icon: 'M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', copy: 'Per-tenant token budgets with hard limits; anomalous usage patterns trigger alerts before they become incidents.' },
  { title: 'Human-in-the-loop', color: 'var(--teal)', icon: 'M20 6 9 17l-5-5', copy: 'Credit decisions, compliance filings, and audit outputs require explicit human sign-off before any downstream action is taken.' },
]

type FrameworkControl = { ref: string; control: string; detail: string }
type Framework = { id: string; label: string; subtitle: string; controls: FrameworkControl[] }

const frameworks: Framework[] = [
  {
    id: 'soc2',
    label: 'SOC 2',
    subtitle: 'Trust service criteria for security, availability, and confidentiality — global baseline for enterprise security reviews.',
    controls: [
      { ref: 'CC6.1', control: 'Logical access controls', detail: 'Every API call validated against tenant context; row-level policy enforced at the database engine, not the application layer.' },
      { ref: 'CC6.6', control: 'Network security', detail: 'TLS 1.3 enforced on all connections; HSTS preloaded; no plaintext data in transit, ever.' },
      { ref: 'CC6.7', control: 'Transmission restrictions', detail: 'Data transmission scoped to tenant endpoints; cross-tenant data movement is architecturally impossible.' },
      { ref: 'CC7.2', control: 'System monitoring', detail: 'Real-time anomaly detection across token usage, latency, error rates, and access patterns; alerts fire before incidents become breaches.' },
      { ref: 'CC9.2', control: 'Risk mitigation', detail: 'Zero sub-processors with access to customer data. All processing within the customer\'s own perimeter.' },
      { ref: 'A1.1', control: 'Availability commitments', detail: '99.9% uptime SLA on Growth tier and above; stateless architecture with no single points of failure in the inference path.' },
    ],
  },
  {
    id: 'iso27001',
    label: 'ISO 27001',
    subtitle: 'Information security management system controls — global certification in progress.',
    controls: [
      { ref: 'A.9', control: 'Access control', detail: 'Phishing-resistant authentication, short-lived tokens, sessions bound to tenant context; superuser access structurally unavailable to the application.' },
      { ref: 'A.10', control: 'Cryptography', detail: 'TLS 1.3 in transit; per-tenant encryption keys at rest; PII fields carry a second encryption pass independent of the primary store.' },
      { ref: 'A.12', control: 'Operations security', detail: 'Append-only audit log with cryptographic chaining; every inference and data event permanently attributable and tamper-evident.' },
      { ref: 'A.14', control: 'Secure development', detail: 'Security requirements embedded in the development process; penetration testing performed by a third party; findings published under NDA.' },
      { ref: 'A.18', control: 'Compliance', detail: 'Framework mappings maintained and updated per jurisdiction; exportable control evidence for auditor and examiner review.' },
    ],
  },
  {
    id: 'gdpr',
    label: 'GDPR',
    subtitle: 'EU General Data Protection Regulation — controls implemented at the platform layer; DPA available on request.',
    controls: [
      { ref: 'Art. 25', control: 'Data protection by design', detail: 'PII auto-detected and redacted before the model context window is assembled; purpose limitation enforced at the prompt layer.' },
      { ref: 'Art. 28', control: 'Data processor obligations', detail: 'Customer retains data ownership; Anvax acts as data processor; Data Processing Agreement available on request.' },
      { ref: 'Art. 32', control: 'Security of processing', detail: 'End-to-end encryption, access controls, and immutable audit trail implemented as platform defaults, not configuration options.' },
      { ref: 'Art. 17', control: 'Right to erasure', detail: 'Tenant data deletion pipeline with cryptographic key destruction for DEK-encrypted fields; erasure is verifiable and audited.' },
      { ref: 'Art. 33', control: 'Breach notification', detail: 'Real-time anomaly detection; security team alerted within 15 minutes of detection; incident timeline reconstructable from the audit log.' },
      { ref: 'Art. 44', control: 'Data transfer restrictions', detail: 'Data processed in-region by default; no cross-border transfer without explicit configuration; EU residency available.' },
    ],
  },
  {
    id: 'euaiact',
    label: 'EU AI Act',
    subtitle: 'Risk management, transparency, and human oversight requirements for high-risk AI systems in the EU.',
    controls: [
      { ref: 'Art. 9', control: 'Risk management', detail: 'AI use-case registry with risk classification; every deployment catalogued with business purpose, data inputs, and risk tier.' },
      { ref: 'Art. 12', control: 'Record-keeping', detail: 'Immutable, cryptographically chained audit log across every inference event; automatically generated and exportable for regulatory review.' },
      { ref: 'Art. 13', control: 'Transparency', detail: 'Every AI output cites the source document and retrieval context it drew from; not a post-hoc explanation layer.' },
      { ref: 'Art. 14', control: 'Human oversight', detail: 'High-risk decisions require explicit human sign-off before execution; enforced at the platform layer, not by policy alone.' },
      { ref: 'Art. 17', control: 'Quality management', detail: 'Model version governance: every version change logged with date, rationale, and approval; rollback is a single operation.' },
    ],
  },
  {
    id: 'dora',
    label: 'DORA',
    subtitle: 'Digital Operational Resilience Act — ICT risk requirements for EU financial services entities.',
    controls: [
      { ref: 'Art. 9', control: 'ICT security policies', detail: 'Defence-in-depth architecture with eight independent security layers; failure at one does not cascade to the next.' },
      { ref: 'Art. 10', control: 'Detection capabilities', detail: 'Real-time monitoring of token usage, latency, error rates, and behavioural anomalies; continuous, not sampled.' },
      { ref: 'Art. 11', control: 'Business continuity', detail: '99.9% uptime SLA; stateless architecture; incident response playbooks documented and tested.' },
      { ref: 'Art. 25', control: 'Third-party risk', detail: 'Zero sub-processors with access to customer data; customer controls their own infrastructure and encryption keys throughout.' },
      { ref: 'Art. 28', control: 'Incident reporting', detail: 'Audit trail exportable on demand; incident timelines reconstructable from the immutable, cryptographically chained log.' },
    ],
  },
  {
    id: 'nist',
    label: 'NIST AI RMF',
    subtitle: 'AI Risk Management Framework — Govern, Map, Measure, Manage functions for US enterprises and government contractors.',
    controls: [
      { ref: 'GOVERN 1.1', control: 'AI governance policies', detail: 'AI use-case registry maintained per tenant; governance policies defined, documented, and enforced at the platform layer.' },
      { ref: 'MAP 1.5', control: 'Risk identification', detail: 'Risk classification embedded in the use-case registry; contextual risk assessed and documented per deployment.' },
      { ref: 'MEASURE 2.5', control: 'Bias & accuracy', detail: 'Retrieval grounded in the customer\'s own document corpus only; model cannot hallucinate facts outside retrieved context.' },
      { ref: 'MEASURE 2.7', control: 'Explainability', detail: 'Every response cites the source document it drew from; full retrieval context stored in the cryptographic audit log.' },
      { ref: 'MANAGE 2.2', control: 'Human review', detail: 'High-risk decisions gated on human sign-off; no autonomous execution without explicit approval recorded in the audit trail.' },
      { ref: 'MANAGE 4.1', control: 'Incident response', detail: 'Anomaly detection with 15-minute alert threshold; full incident timeline reconstructable from the cryptographic audit chain.' },
    ],
  },
  {
    id: 'rbi',
    label: 'RBI FREE-AI',
    subtitle: 'RBI\'s governance framework for AI in regulated financial entities — India jurisdiction pack.',
    controls: [
      { ref: 'R7', control: 'AI Use-Case Registry', detail: 'Every AI use case catalogued with business purpose, data inputs, and risk classification, exportable for examiner review.' },
      { ref: 'R8', control: 'Board oversight docs', detail: 'Board-level AI governance documentation synthesised automatically from the audit trail.' },
      { ref: 'R15', control: 'Periodic board reporting', detail: 'Usage, incident, and risk summaries generated on a defined cadence for board-level visibility.' },
      { ref: 'R17', control: 'Model version governance', detail: 'Every model version change logged with date, rationale, and approval; rollback is a single operation.' },
      { ref: 'R18', control: 'Human gate on high-risk', detail: 'Credit decisions, compliance filings, and audit outputs require explicit human sign-off before execution.' },
      { ref: 'R19', control: 'Explainability by design', detail: 'Every AI output cites the specific source document and retrieval context it drew from, not a post-hoc explanation layer.' },
      { ref: 'R23', control: 'Immutable inference trail', detail: 'Cryptographically chained audit log across every inference event; no record can be modified or deleted after the fact.' },
      { ref: 'R26', control: 'Real-time LLM monitoring', detail: 'Token usage, latency, error rates, and behavioural anomalies monitored continuously, not sampled.' },
    ],
  },
  {
    id: 'dpdp',
    label: 'DPDP',
    subtitle: 'India\'s Digital Personal Data Protection Act 2023 — controls implemented at the platform layer.',
    controls: [
      { ref: 'S.6', control: 'Data minimisation', detail: 'Only required fields ingested; PII auto-redacted before the LLM context window is assembled.' },
      { ref: 'S.4', control: 'Purpose limitation', detail: 'System prompts scoped per role; model cannot deviate from the defined purpose.' },
      { ref: 'S.5', control: 'Consent record', detail: 'Consent events logged to append-only audit log with timestamp and session ID.' },
      { ref: 'S.8', control: 'Breach notification', detail: 'Real-time anomaly detection; security team alerted within 15 minutes of detection.' },
      { ref: 'S.8', control: 'Data fiduciary obligations', detail: 'Customer retains ownership; Anvax is data processor; DPA available on request.' },
      { ref: 'S.12', control: 'Right to erasure', detail: 'Tenant data deletion pipeline with cryptographic key destruction for DEK-encrypted fields.' },
    ],
  },
]

const certifications = [
  { name: 'GDPR', status: 'live' as const, note: 'DPA available on request', pct: '100%' },
  { name: 'SOC 2 Type II', status: 'wip' as const, note: 'In progress', pct: '55%' },
  { name: 'ISO 27001', status: 'wip' as const, note: 'In progress', pct: '45%' },
  { name: 'DPDP Act 2023', status: 'live' as const, note: 'Controls implemented', pct: '100%' },
]

const faqs: { q: string; a: string }[] = [
  { q: 'Where does our data live?', a: 'In your cloud account, your sovereign-cloud partner\'s region, or your data centre. Anvax does not host customer data on any tier.' },
  { q: 'Does anything leave our environment?', a: 'On the private-cloud and sovereign tiers, only a licence heartbeat and, if you opt in, anonymised telemetry (counts, not content). On the on-prem tier, nothing; updates ship as signed bundles you apply.' },
  { q: 'Which models run, and where?', a: 'Your choice: open-weight models on your own GPUs, or Azure OpenAI / Amazon Bedrock inside your own subscription so the provider\'s tenant-isolation and no-training terms apply. Model calls never route through Anvax infrastructure.' },
  { q: 'Can Anvax staff see our data?', a: 'No. We have no standing access to any deployment. Support access, when you request it, is time-boxed, logged, and revocable by you.' },
  { q: 'How is access controlled?', a: 'SSO (SAML/OIDC), SCIM, four built-in roles, per-workspace connector scoping, and permission-aware retrieval that checks source-system ACLs on every query.' },
  { q: 'Is the audit log tamper-evident?', a: 'The log is append-only with hash chaining; entries cannot be edited or deleted through the application. Scheduled export available today; native SIEM connectors are planned.' },
  { q: 'How do you handle PII?', a: 'Configurable redaction at ingest and at prompt time for common identifiers — national IDs, card numbers, health identifiers — with per-region patterns. Redaction events are logged.' },
  { q: 'What about prompt injection and data exfiltration through the model?', a: 'Retrieval is scoped before the model sees anything, write actions are approval-gated, and on-prem deployments have no egress. We treat the model as untrusted; the controls sit around it, not inside it.' },
  { q: 'Do you sign a DPA? Do you have a subprocessor list?', a: 'Yes to both. On self-hosted tiers the subprocessor list is short because there are almost none. Request both via the contact form or the link below.' },
  { q: 'Can our security team review the architecture before we commit?', a: 'That is the intended path. Download the architecture report, send us your questionnaire, and we will walk your team through a live deployment.' },
]

const downloads = [
  {
    title: 'Architecture report',
    cta: 'Request PDF',
    icon: 'M14 2H6v20h12V8zM14 2v6h6M9 14h6M9 18h4',
    copy: '12-page PDF covering the full defence-in-depth stack, threat model, encryption architecture, and framework control mappings. Send it to your security team before the first call.',
  },
  {
    title: 'DPA and subprocessor list',
    cta: 'Request documents',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6zM9 12l2 2 4-4',
    copy: 'Data Processing Agreement and subprocessor list for your legal and procurement review. On self-hosted tiers, the subprocessor count is low by design.',
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
  const [activeFramework, setActiveFramework] = useState('soc2')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const activeLayer = defenceLayers[activeIdx]
  const activeFrameworkData = frameworks.find(f => f.id === activeFramework) ?? frameworks[0]

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Security & Architecture</p>
            <h1 className={styles.heroH1}>
              Built to pass your security review,<br />
              not just your demo.
            </h1>
            <p className={styles.heroLede}>
              Tenant isolation, read-only connectors, scoped retrieval, and an immutable audit trail —
              running inside your cloud or your data centre. Nothing leaves your perimeter, and
              everything the AI does is written down.
            </p>
            <div className={styles.heroCtas}>
              <Button variant="accent" href="/contact">Send this to your security team</Button>
              <Button variant="ghost" href="/trust#downloads">Download the architecture report</Button>
            </div>
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

      {/* Six controls in plain English */}
      <section className="section alt" id="controls">
        <div className="container">
          <SectionHead
            eyebrow="Controls"
            title="Six controls, in plain English."
            lede="Written for the person filling in a vendor questionnaire, not a compliance team reading a framework."
          />
          <div className={styles.sixGrid}>
            {sixControls.map((c) => (
              <div key={c.title} className={styles.controlCard}>
                <div className={styles.controlIconWrap} style={{ background: c.color }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </div>
                <h3 className={styles.controlTitle}>{c.title}</h3>
                <p className={styles.controlBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three real questions */}
      <section className="section" id="questions">
        <div className="container">
          <SectionHead
            eyebrow="Real questions"
            title="Three questions every reviewer asks."
            lede="Direct answers. No slide decks."
          />
          <div className={styles.questionsGrid}>
            {questions.map((q) => (
              <div key={q.role} className={styles.questionCard}>
                <p className={styles.questionRole}>{q.role}</p>
                <p className={styles.questionQ}>{q.q}</p>
                <p className={styles.questionA}>{q.a}</p>
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
            lede="We list what is live, what is in progress, and when we expect to complete it. EU AI Act, DORA, NIST AI RMF, RBI FREE-AI, and DPDP are mapped — see Framework mappings below."
          />
          <div className={styles.certGrid}>
            {certifications.map((c) => (
              <div key={c.name} className={styles.certCard}>
                <StatusPill status={c.status}>
                  {c.status === 'live' ? 'Live' : 'In progress'}
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

      {/* Framework mappings */}
      <section className="section alt" id="mappings">
        <div className="container">
          <SectionHead
            eyebrow="Framework mappings"
            title="Every control, mapped and downloadable."
            lede="Select a framework to see how Anvax implements each requirement. Eight frameworks across US, EU, UK, Gulf, Singapore, and India — the same platform, the right pack for your regulator."
          />
          <div className={styles.mappingsTabs}>
            {frameworks.map(f => (
              <button
                key={f.id}
                type="button"
                className={`${styles.mappingsTab} ${activeFramework === f.id ? styles.mappingsTabActive : ''}`}
                onClick={() => setActiveFramework(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className={styles.mappingsSubtitle}>{activeFrameworkData.subtitle}</p>
          <div className={styles.freeAiGrid}>
            {activeFrameworkData.controls.map(c => (
              <div key={c.ref + c.control} className={styles.freeAiCard}>
                <CheckIcon />
                <div>
                  <h3 className={styles.freeAiTitle}>{c.control}</h3>
                  <p className={styles.freeAiCopy}>{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defence-in-depth */}
      <section className="section" id="defence">
        <div className="container">
          <SectionHead
            eyebrow="Architecture"
            title="Eight independent security guarantees."
            lede="Each layer operates independently. A failure at one does not cascade to the next, and each guarantee is verifiable by your security team."
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
      <section className="section alt" id="ai-controls">
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
              { num: 'In-region', label: 'All data, embeddings, and inference traces stay where you choose' },
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

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHead
            eyebrow="FAQ"
            title="Questions your procurement team will ask."
          />
          <div className={styles.faqList}>
            {faqs.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ''}`}>▾</span>
                </button>
                {openFaq === i && (
                  <p className={styles.faqAnswer}>{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section alt" id="downloads">
        <div className="container">
          <SectionHead
            eyebrow="Downloads"
            title="Send these to your security team."
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
