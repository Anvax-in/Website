'use client'

import { useState } from 'react'
import styles from './Trust.module.css'

const glanceStats = [
  { num: '8',         label: 'Defence-in-depth layers from transport to audit chain' },
  { num: '100%',      label: 'Queries logged to immutable audit trail' },
  { num: '0',         label: 'Third-party sub-processors with access to customer data' },
  { num: 'In-region', label: 'All data, embeddings, and inference stay where you choose' },
]

const sixControls = [
  {
    title: 'Deployed inside your perimeter',
    body: 'Anvax runs in your AWS, Azure, or GCP account, on a sovereign-cloud partner in your region, or on-prem with no outbound network. We never hold your data. There is no Anvax-side copy to breach.',
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    color: 'var(--sage-600)',
  },
  {
    title: 'Read-only connectors by default',
    body: 'Connectors pull documents and records; they do not write back. Write actions are off until an admin enables them per connector, and every enabled write goes through an approval step.',
    icon: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    color: 'var(--blue-600)',
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
    color: 'var(--sage-600)',
  },
  {
    title: 'Encryption and key control',
    body: 'TLS 1.3 in transit, per-tenant encryption at rest, customer-managed keys on the private-cloud and on-prem tiers. Secrets for connectors are stored encrypted and never exposed to the model.',
    icon: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
    color: 'var(--blue-600)',
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
    a: "Only what the signed-in user can already reach. Every retrieval is permission-checked against the source system's ACLs at query time, not at index time, so a revoked permission takes effect immediately. Connector scope is set per workspace by an admin. On the on-prem tier, egress is blocked at the network layer; the model cannot call out even if prompted to.",
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

const certifications = [
  { name: 'GDPR',         status: 'live' as const, note: 'DPA available on request; data stays in-region; DSR support in progress', jurisdiction: 'EU / Global' },
  { name: 'SOC 2 Type II',status: 'wip'  as const, note: 'Audit underway',                                                          jurisdiction: 'Global' },
  { name: 'ISO 27001',    status: 'wip'  as const, note: 'Audit underway',                                                          jurisdiction: 'Global' },
  { name: 'EU AI Act',    status: 'live' as const, note: 'Record-keeping, transparency, and human-oversight controls mapped',        jurisdiction: 'European Union' },
  { name: 'NIST AI RMF',  status: 'live' as const, note: 'Govern / Map / Measure / Manage mapping available',                      jurisdiction: 'United States' },
  { name: 'DORA',         status: 'live' as const, note: 'ICT third-party risk controls mapped for self-hosted deployment',          jurisdiction: 'European Union' },
  { name: 'RBI FREE-AI',  status: 'live' as const, note: 'Full control mapping; origin framework',                                  jurisdiction: 'India' },
  { name: 'DPDP Act 2023',status: 'live' as const, note: 'Controls implemented; India residency and consent controls',              jurisdiction: 'India' },
]

const pipelineSteps = [
  {
    num: '01',
    title: 'Identity & access',
    body: 'Every request authenticated via SSO (SAML/OIDC) before any AI executes. Sessions are short-lived, phishing-resistant, and bound to your tenant context. No anonymous or shared-credential access at any tier.',
    guarantee: 'Identity verified before any data is touched',
  },
  {
    num: '02',
    title: 'Permission enforcement',
    body: 'Every document retrieval is ACL-checked against the source system at query time, not at index time. A permission revoked in SharePoint, Salesforce, or your data warehouse takes effect on the next query with no grace period.',
    guarantee: 'The AI cannot surface a document the user cannot open directly',
  },
  {
    num: '03',
    title: 'Content protection',
    body: 'PII, payment card data, health identifiers, and national ID numbers detected and redacted before the model context window is assembled. Redaction events are logged to the audit trail. Patterns are configurable per jurisdiction.',
    guarantee: 'Sensitive data never reaches the model',
  },
  {
    num: '04',
    title: 'Policy enforcement',
    body: 'Requests validated against workspace-level acceptable-use policies and system-prompt scoping before the model is invoked. Topics outside the defined scope are rejected at the policy layer, not suppressed in the response.',
    guarantee: 'The model cannot answer outside its defined purpose',
  },
  {
    num: '05',
    title: 'Runtime protection',
    body: 'User input is structurally isolated from system instructions so prompt injection attempts cannot overwrite role boundaries. Output is validated before delivery. On on-prem deployments, the model has no egress path; it cannot call out even if prompted.',
    guarantee: 'The model is treated as untrusted; controls sit around it, not inside it',
  },
  {
    num: '06',
    title: 'Action gating',
    body: 'Write actions are off by default. When enabled per connector by an admin, they require explicit human approval before execution. Every agentic action, attempted or completed, is written to the immutable, cryptographically chained audit trail before the next step runs.',
    guarantee: 'No autonomous write action without a human sign-off on record',
  },
]

const aiControls = [
  { title: 'Hallucination mitigation', color: 'var(--blue-600)', icon: 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 21h6',                    copy: 'Answers grounded in retrieved context only; model surfaces uncertainty rather than inventing. Every response cites the source it drew from.' },
  { title: 'PII auto-redaction',       color: 'var(--sage-600)', icon: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM3 3l18 18',                     copy: 'PII, names, ID numbers, payment card data, and health identifiers detected and redacted before the model context window is assembled.' },
  { title: 'Prompt isolation',         color: 'var(--ink-900)',  icon: 'M4 4h7v16H4zM13 4h7v16h-7',                                                    copy: 'User input is structurally separated from system instructions; role boundaries enforced at the prompt layer, not relying on model instruction-following alone.' },
  { title: 'Model pinning',            color: 'var(--blue-600)', icon: 'M12 2v9M12 11l4 4v3H8v-3l4-4zM12 18v4',                                       copy: 'Model version locked per tenant; behaviour cannot change without an explicit upgrade decision and audit entry.' },
  { title: 'Inference audit',          color: 'var(--sage-600)', icon: 'M4 3h12l4 4v14H4zM8 12h8M8 16h5',                                             copy: 'Every prompt, retrieved context, and completion stored in an append-only, cryptographically chained audit log.' },
  { title: 'Data residency',           color: 'var(--ink-900)',  icon: 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zM12 10h.01',                    copy: 'All inference, embeddings, and retrieval routed within your chosen region. Nothing crosses the perimeter you define.' },
  { title: 'Spend controls',           color: 'var(--blue-600)', icon: 'M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',                 copy: 'Per-tenant token budgets with hard limits; anomalous usage patterns trigger alerts before they become incidents.' },
  { title: 'Human-in-the-loop',        color: 'var(--sage-600)', icon: 'M20 6 9 17l-5-5',                                                             copy: 'High-risk decisions and agentic actions require explicit human sign-off before any downstream action is taken.' },
]

const faqs: { q: string; a: string }[] = [
  { q: 'Where does our data live?',                                          a: "In your cloud account, your sovereign-cloud partner's region, or your data centre. Anvax does not host customer data on any tier." },
  { q: 'Does anything leave our environment?',                               a: 'On the shared-cloud and sovereign tiers, only a licence heartbeat and, if you opt in, anonymised telemetry (counts, not content). On the on-prem tier, nothing; updates ship as signed bundles you apply.' },
  { q: 'Which models run, and where?',                                       a: "Your choice: open-weight models on your own GPUs, or Azure OpenAI / Amazon Bedrock inside your own subscription so the provider's tenant-isolation and no-training terms apply. Model calls never route through Anvax infrastructure." },
  { q: 'Can Anvax staff see our data?',                                      a: 'No. We have no standing access to any deployment. Support access, when you request it, is time-boxed, logged, and revocable by you.' },
  { q: 'How is access controlled?',                                          a: 'SSO (SAML/OIDC), SCIM, four built-in roles, per-workspace connector scoping, and permission-aware retrieval that checks source-system ACLs on every query.' },
  { q: 'Is the audit log tamper-evident?',                                   a: 'The log is append-only with hash chaining; entries cannot be edited or deleted through the application. Scheduled export available today; native SIEM connectors are planned.' },
  { q: 'How do you handle PII?',                                             a: 'Configurable redaction at ingest and at prompt time for national IDs, card numbers, and health identifiers, with per-region patterns. Redaction events are logged.' },
  { q: 'What about prompt injection and data exfiltration through the model?',a: 'Retrieval is scoped before the model sees anything, write actions are approval-gated, and on-prem deployments have no egress. We treat the model as untrusted; the controls sit around it, not inside it.' },
  { q: 'Do you sign a DPA? Do you have a subprocessor list?',                a: 'Yes to both. On self-hosted tiers the subprocessor list is short because there are almost none. Request both via the contact form.' },
  { q: 'Can our security team review the architecture before we commit?',    a: 'That is the intended path. Download the architecture report, send us your questionnaire, and we will walk your team through a live deployment.' },
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

function CheckIcon({ color = 'var(--sage-600)' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function TrustClient() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const activeStep = pipelineSteps[activeIdx]

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroLattice} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.sectionEyebrowDark}>Security &amp; Architecture</div>
          <h1 className={styles.h1}>
            Built to pass your security review, not just your demo.
          </h1>
          <p className={styles.heroLede}>
            Tenant isolation, read-only connectors, scoped retrieval, and an immutable
            audit trail running inside your cloud or your data centre. Nothing leaves
            your perimeter, and everything the AI does is written down.
          </p>
          <div className={styles.heroActions}>
            <a href="/contact" className={styles.btnPrimary}>Send this to your security team</a>
            <a href="#downloads" className={styles.btnGhost}>Download the architecture report</a>
          </div>
        </div>
      </section>

      {/* ── Glance stats ── */}
      <section className={styles.glance}>
        <div className={styles.glanceInner}>
          <div className={styles.glanceGrid}>
            {glanceStats.map((s) => (
              <div key={s.num} className={styles.glanceCell}>
                <div className={styles.glanceStat}>{s.num}</div>
                <div className={styles.glanceLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Six controls ── */}
      <section className={styles.controls} id="controls">
        <div className={styles.controlsInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Controls</div>
            <h2 className={styles.h2}>Six things that make AI safe to deploy.</h2>
            <p className={styles.sectionLede}>
              Written for the person filling in a vendor questionnaire, not a compliance
              team reading a framework.
            </p>
          </div>
          <div className={styles.sixGrid}>
            {sixControls.map((c) => (
              <div key={c.title} className={styles.controlCard}>
                <div className={styles.controlIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

      {/* ── Three questions ── */}
      <section className={styles.questions} id="questions">
        <div className={styles.questionsInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Real questions</div>
            <h2 className={styles.h2}>Three questions every reviewer asks.</h2>
            <p className={styles.sectionLede}>Direct answers. No slide decks.</p>
          </div>
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

      {/* ── Certifications ── */}
      <section className={styles.certs} id="certifications">
        <div className={styles.certsInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Certifications</div>
            <h2 className={styles.h2}>Honest status. No vanity badges.</h2>
            <p className={styles.sectionLede}>
              We list what is live, what is in progress, and what is mapped. Nothing
              is claimed that is not implemented.
            </p>
          </div>
          <div className={styles.certTable}>
            <div className={styles.certRowHead}>
              <span className={styles.certColHead}>Framework</span>
              <span className={styles.certColHead}>Status</span>
              <span className={styles.certColHead}>Note</span>
              <span className={styles.certColHead} style={{ textAlign: 'right' }}>Jurisdiction</span>
            </div>
            {certifications.map((c) => (
              <div key={c.name} className={styles.certRow}>
                <span className={styles.certName}>{c.name}</span>
                <span className={c.status === 'live' ? `${styles.certStatusPill} ${styles.certStatusLive}` : `${styles.certStatusPill} ${styles.certStatusWip}`}>
                  {c.status === 'live' ? 'Live' : 'In progress'}
                </span>
                <span className={styles.certNote}>{c.note}</span>
                <span className={styles.certJurisdiction}>{c.jurisdiction}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture pipeline ── */}
      <section className={styles.defence} id="defence">
        <div className={styles.defenceInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Architecture</div>
            <h2 className={styles.h2}>Six security checkpoints, every query.</h2>
            <p className={styles.sectionLede}>
              Every AI request passes through all six checkpoints in sequence. Select a
              step to see what it enforces and what it guarantees.
            </p>
          </div>
          <div className={styles.pipelineFlow}>
            {pipelineSteps.map((s, i) => (
              <button
                key={s.num}
                type="button"
                className={`${styles.pipelineStep} ${i === activeIdx ? styles.pipelineStepActive : ''}`}
                onClick={() => setActiveIdx(i)}
                aria-current={i === activeIdx}
              >
                <span className={styles.pipelineStepNum}>{s.num}</span>
                <span className={styles.pipelineStepTitle}>{s.title}</span>
              </button>
            ))}
          </div>
          <div className={styles.pipelinePanel}>
            <h3 className={styles.pipelinePanelTitle}>{activeStep.title}</h3>
            <p className={styles.pipelinePanelBody}>{activeStep.body}</p>
            <div className={styles.guaranteeBox}>
              <CheckIcon />
              <p className={styles.guaranteeText}>{activeStep.guarantee}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI controls ── */}
      <section className={styles.aiControls} id="ai-controls">
        <div className={styles.aiControlsInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>AI controls</div>
            <h2 className={styles.h2}>Security controls designed for AI, not retrofitted from the last decade.</h2>
            <p className={styles.sectionLede}>
              AI systems introduce attack surfaces that traditional security frameworks
              were not built for. These controls address each one directly.
            </p>
          </div>
          <div className={styles.aiGrid}>
            {aiControls.map((c) => (
              <div key={c.title} className={styles.aiCard}>
                <div className={styles.aiIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

      {/* ── Engineering stats ── */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.sectionHead} style={{ marginBottom: 40 }}>
            <div className={styles.sectionEyebrowDark}>Engineering posture</div>
            <h2 className={styles.h2Dark}>Architecture commitments your security team can hold us to.</h2>
          </div>
          <div className={styles.statGrid}>
            {[
              { num: 'P95 &lt; 1.4s', label: 'End-to-end query latency including model call and audit write' },
              { num: '99.9%',         label: 'Uptime SLA on Growth tier and above' },
              { num: 'In-region',     label: 'All data, embeddings, and inference traces stay where you choose' },
              { num: '0',             label: 'Third-party sub-processors with access to your tenant data' },
            ].map((s) => (
              <div key={s.num} className={styles.statCard}>
                <div className={styles.statNum} dangerouslySetInnerHTML={{ __html: s.num }} />
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.faq} id="faq">
        <div className={styles.faqInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>FAQ</div>
            <h2 className={styles.h2}>Questions your procurement team will ask.</h2>
          </div>
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

      {/* ── Downloads ── */}
      <section className={styles.downloads} id="downloads">
        <div className={styles.downloadsInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Downloads</div>
            <h2 className={styles.h2}>Send these to your security team.</h2>
            <p className={styles.sectionLede}>
              Leave your work email and we will send the documents directly. No sales
              call required for security review.
            </p>
          </div>
          <div className={styles.downloadGrid}>
            {downloads.map((dl) => (
              <div key={dl.title} className={styles.downloadCard}>
                <div className={styles.downloadIconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={dl.icon} />
                  </svg>
                </div>
                <h3 className={styles.downloadTitle}>{dl.title}</h3>
                <p className={styles.downloadDesc}>{dl.copy}</p>
                <form className={styles.downloadForm} onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Work email" className={styles.downloadInput} required />
                  <button type="submit" className={styles.downloadBtn}>{dl.cta}</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaH2}>Ready for your security team to review us?</h2>
          <p className={styles.ctaBody}>
            Download the architecture report, send us your questionnaire, and we will
            walk your team through a live deployment.
          </p>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaWhite}>Book a security walkthrough →</a>
            <a href="#downloads" className={styles.ctaOutline}>Download the architecture report</a>
          </div>
        </div>
      </section>
    </>
  )
}
