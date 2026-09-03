import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import styles from '@/pages/CapabilityPage.module.css'

export const metadata: Metadata = {
  title: 'Governance | Anvax Platform',
  description: 'The Anvax governance layer, immutable audit trail, policy engine, and framework control mappings wired into the request path, not bolted on.',
  openGraph: { title: 'Governance | Anvax Platform', description: 'Compliance by construction. Not configuration.', url: 'https://www.anvax.in/platform/governance' },
  alternates: { canonical: 'https://www.anvax.in/platform/governance' },
}

const siblings = [
  { label: 'Search', href: '/platform/search' },
  { label: 'Chat', href: '/platform/chat' },
  { label: 'Agents', href: '/platform/agents' },
  { label: 'Governance', href: '/platform/governance' },
]

const features = [
  {
    title: 'Immutable audit trail',
    body: 'Every query, workflow step, agent action, approval, and model call is recorded to a cryptographically chained, append-only log. No record can be modified or deleted after the fact. The log is exportable on demand for regulators and auditors.',
    color: 'var(--blue)',
    icon: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  },
  {
    title: 'Policy engine',
    body: 'Per-workspace policies define what the AI can retrieve, generate, and act on. PII redaction rules, approval gate configuration, model constraints, and connector scoping, all manageable by an admin without a code deploy or a vendor call.',
    color: 'var(--teal)',
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
  { label: 'Architecture', body: 'The governance layer <strong>sits between every user and the data</strong>: wired into the request path. It cannot be bypassed by application code, by the model, or by a misconfigured connector.' },
  { label: 'Default-on', body: 'Audit logging, PII redaction, tenant isolation, and encryption at rest <strong>are on from day one.</strong> You cannot ship without them. They are not features; they are the substrate.' },
  { label: 'Compounding', body: 'Every query, approval, and action <strong>adds to a growing audit record</strong> that compounds in value, the longer you run, the richer the governance evidence available to your compliance team.' },
]

export default function GovernancePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Platform · Governance</p>
            <h1 className={styles.heroH1}>Compliance by construction.<br />Not configuration.</h1>
            <p className={styles.heroLede}>The governance layer sits between every user and every piece of data, wired into the request path on every capability, not bolted on after the fact.</p>
          </div>
        </div>
      </section>

      <nav className={styles.siblingNav}>
        <div className="container">
          <div className={styles.siblingNavInner}>
            {siblings.map(s => (
              <Link key={s.href} href={s.href}
                className={`${styles.siblingLink} ${s.href === '/platform/governance' ? styles.siblingLinkActive : ''}`}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <section className="section">
        <div className="container">
          <div className={styles.featuresGrid}>
            {features.map(f => (
              <div key={f.title} className={styles.featCard}>
                <div className={styles.featIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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

      <section className={styles.governedStrip}>
        <div className="container">
          <p className={styles.governedEyebrow}>Why governance is the moat</p>
          <h2 className={styles.governedTitle}>Every other capability is governed by this one.</h2>
          <div className={styles.governedGrid}>
            {governed.map(g => (
              <div key={g.label} className={styles.governedItem}>
                <p className={styles.governedItemLabel}>{g.label}</p>
                <p className={styles.governedItemBody} dangerouslySetInnerHTML={{ __html: g.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaStrip}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaH2}>Walk through the audit trail with your security team.</h2>
              <p className={styles.ctaBody}>Download the framework mappings or book a live walkthrough with your CISO.</p>
            </div>
            <div className={styles.ctaActions}>
              <Button variant="accent" href="/contact" arrow>Book a walkthrough</Button>
              <Button variant="ghost" href="/trust#mappings">Framework mappings</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
