import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import styles from '@/pages/CapabilityPage.module.css'

export const metadata: Metadata = {
  title: 'Chat | Anvax Platform',
  description: 'Multi-turn grounded AI chat anchored to your corpus, never hallucinates, every turn logged, tenant-isolated by construction.',
  openGraph: { title: 'Chat | Anvax Platform', description: 'Ask your corpus. Get a cited answer.', url: 'https://www.anvax.in/platform/chat' },
  alternates: { canonical: 'https://www.anvax.in/platform/chat' },
}

const siblings = [
  { label: 'Search', href: '/platform/search' },
  { label: 'Chat', href: '/platform/chat' },
  { label: 'Agents', href: '/platform/agents' },
  { label: 'Governance', href: '/platform/governance' },
]

const features = [
  {
    title: 'Grounded answers only',
    body: "Every answer is anchored to context retrieved from your corpus. The model is instructed to say \"not found in corpus\" rather than fabricate. It cannot hallucinate a regulation because there is nothing else for it to draw from.",
    color: 'var(--blue)',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  },
  {
    title: 'Tenant-isolated threads',
    body: 'Thread history stays scoped to your tenant. No cross-customer data leakage is architecturally possible. A thread cannot reference a document from a different workspace even if the model is prompted to try.',
    color: 'var(--teal)',
    icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  },
  {
    title: 'Role-scoped system prompts',
    body: 'System prompts and available tools are configured per role, not per user. A finance analyst sees finance context; a legal reviewer sees legal documents. The model cannot cross the boundary regardless of what the user types.',
    color: 'var(--ink-900)',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  },
]

const governed = [
  { label: 'Inference audit', body: '<strong>Every turn is logged</strong>: prompt, retrieved context, model and template version, full completion. Append-only with cryptographic chaining.' },
  { label: 'Model governance', body: '<strong>Model version pinned per tenant tier.</strong> Version changes require an explicit admin decision and are logged with rationale. Rollback is a single operation.' },
  { label: 'Tenancy', body: '<strong>Thread data never crosses tenants.</strong> RLS enforced at the database engine, not the application layer. A bug in the app cannot cause cross-tenant leakage.' },
]

export default function ChatPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Platform · Chat</p>
            <h1 className={styles.heroH1}>Ask your corpus.<br />Get a cited answer.</h1>
            <p className={styles.heroLede}>Multi-turn grounded chat across your documents. Anchored to retrieved context, the model says &ldquo;not found&rdquo; rather than inventing an answer.</p>
          </div>
        </div>
      </section>

      <nav className={styles.siblingNav}>
        <div className="container">
          <div className={styles.siblingNavInner}>
            {siblings.map(s => (
              <Link key={s.href} href={s.href}
                className={`${styles.siblingLink} ${s.href === '/platform/chat' ? styles.siblingLinkActive : ''}`}>
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
          <p className={styles.governedEyebrow}>How it&rsquo;s governed</p>
          <h2 className={styles.governedTitle}>Every conversation is accountable.</h2>
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
              <h2 className={styles.ctaH2}>See it answer a question from your documents.</h2>
              <p className={styles.ctaBody}>We run a scoped pilot on your corpus, 45 minutes, no slide decks.</p>
            </div>
            <div className={styles.ctaActions}>
              <Button variant="accent" href="/contact" arrow>Request a pilot</Button>
              <Button variant="ghost" href="/platform">All capabilities</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
