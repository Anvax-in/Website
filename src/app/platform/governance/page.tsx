import type { Metadata } from 'next'
import styles from '../Capability.module.css'

export const metadata: Metadata = {
  title: 'Governance | Anvax Platform',
  description: 'Immutable audit trail, policy engine, and framework control mappings wired into the request path, not bolted on.',
  openGraph: { title: 'Governance | Anvax Platform', description: 'Compliance by construction. Not configuration.', url: 'https://www.anvax.in/platform/governance' },
  alternates: { canonical: 'https://www.anvax.in/platform/governance' },
}

const siblings = [
  { label: 'Search',     href: '/platform/search' },
  { label: 'Chat',       href: '/platform/chat' },
  { label: 'Agents',     href: '/platform/agents' },
  { label: 'Governance', href: '/platform/governance' },
]

const features = [
  {
    title: 'Immutable audit trail',
    body: 'Every query, workflow step, agent action, approval, and model call is recorded to a cryptographically chained, append-only log. No record can be modified or deleted after the fact. The log is exportable on demand for regulators and auditors.',
    color: 'var(--blue-600)',
    icon: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  },
  {
    title: 'Policy engine',
    body: 'Per-workspace policies define what the AI can retrieve, generate, and act on. PII redaction rules, approval gate configuration, model constraints, and connector scoping, all manageable by an admin without a code deploy or a vendor call.',
    color: 'var(--sage-600)',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  },
  {
    title: 'Framework control mappings',
    body: 'Control mappings for SOC 2, ISO 27001, GDPR, EU AI Act, DORA, NIST AI RMF, RBI FREE-AI, and DPDP. Each control identifies what implements it and how to test it. Exportable evidence packs for auditors and examiners.',
    color: 'var(--ink-900)',
    icon: 'M4 3h12l4 4v14H4zM8 12h8M8 16h5M8 8h4',
  },
]

const governed = [
  {
    label: 'Architecture',
    body: 'The governance layer <strong>sits between every user and the data,</strong> wired into the request path. It cannot be bypassed by application code, by the model, or by a misconfigured connector.',
  },
  {
    label: 'Default-on',
    body: 'Audit logging, PII redaction, tenant isolation, and encryption at rest <strong>are on from day one.</strong> You cannot ship without them. They are not features; they are the substrate.',
  },
  {
    label: 'Compounding',
    body: 'Every query, approval, and action <strong>adds to a growing audit record</strong> that compounds in value. The longer you run, the richer the governance evidence available to your compliance team.',
  },
]

export default function GovernancePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroLattice} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>Platform · Governance</div>
              <h1 className={styles.h1}>Compliance by construction. Not configuration.</h1>
              <p className={styles.heroLede}>
                The governance layer sits between every user and every piece of data, wired
                into the request path on every capability, not bolted on after the fact.
              </p>
              <div className={styles.heroActions}>
                <a href="/contact" className={styles.btnPrimary}>Book a walkthrough →</a>
                <a href="/trust" className={styles.btnGhost}>Read the security page</a>
              </div>
            </div>

            <div className={styles.heroMockWrap} aria-hidden="true">
              <div className={styles.hmPanel}>
                <div className={styles.hmBar}>
                  <span className={styles.hmDot} />
                  <span className={styles.hmDot} />
                  <span className={styles.hmDot} />
                  <span className={styles.hmBarTitle}>anvax · audit trail</span>
                  <span className={styles.hmBarBadge}>
                    <span className={styles.hmBarBadgeDot} />Append-only
                  </span>
                </div>
                <div className={styles.hmBody}>
                  <div className={styles.hmAuditHeader}>
                    <span className={styles.hmAuditCol}>ID</span>
                    <span className={styles.hmAuditCol}>Action</span>
                    <span className={styles.hmAuditCol}>User</span>
                    <span className={styles.hmAuditCol} />
                  </div>
                  {[
                    { id: '#908', type: 'Search', user: 'analyst@firm.com' },
                    { id: '#909', type: 'Chat', user: 'research@firm.com' },
                    { id: '#910', type: 'Agent', user: 'system' },
                    { id: '#911', type: 'Approve', user: 'admin@firm.com' },
                  ].map(row => (
                    <div key={row.id} className={styles.hmAuditRow}>
                      <span className={styles.hmAuditN}>{row.id}</span>
                      <span className={styles.hmAuditType}>{row.type}</span>
                      <span className={styles.hmAuditUser}>{row.user}</span>
                      <span className={styles.hmAuditCheck}>✓</span>
                    </div>
                  ))}
                  <div className={styles.hmAuditFooter}>
                    <span className={styles.hmAuditFooterItem}>
                      <span className={styles.hmAuditFooterDot} />Append-only
                    </span>
                    <span className={styles.hmAuditFooterItem}>
                      <span className={styles.hmAuditFooterDot} />Cryptographic
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className={styles.siblingNav} aria-label="Platform capabilities">
        <div className={styles.siblingNavInner}>
          {siblings.map(s => (
            <a
              key={s.href}
              href={s.href}
              className={`${styles.siblingLink} ${s.href === '/platform/governance' ? styles.siblingLinkActive : ''}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>How it works</div>
            <h2 className={styles.h2}>Three capabilities that make every other one accountable.</h2>
          </div>
          <div className={styles.featGrid}>
            {features.map(f => (
              <div key={f.title} className={styles.featCard}>
                <div className={styles.featIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featBody}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.governed}>
        <div className={styles.governedInner}>
          <div className={styles.governedEyebrow}>Why governance is the moat</div>
          <h2 className={styles.governedH2}>Every other capability is governed by this one.</h2>
          <div className={styles.governedGrid}>
            {governed.map(g => (
              <div key={g.label} className={styles.governedItem}>
                <p className={styles.governedLabel}>{g.label}</p>
                <p className={styles.governedBody} dangerouslySetInnerHTML={{ __html: g.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div>
            <h2 className={styles.ctaH2}>Walk through the audit trail with your security team.</h2>
            <p className={styles.ctaBody}>Download the framework mappings or book a live walkthrough with your CISO.</p>
          </div>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaWhite}>Book a walkthrough →</a>
            <a href="/trust" className={styles.ctaOutline}>Security page</a>
          </div>
        </div>
      </section>
    </>
  )
}
