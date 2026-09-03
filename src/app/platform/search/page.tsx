import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import styles from '@/pages/CapabilityPage.module.css'

export const metadata: Metadata = {
  title: 'Search | Anvax Platform',
  description: 'Hybrid semantic search over your entire document corpus, cited, PII-guarded, and logged. Inside your perimeter.',
  openGraph: { title: 'Search | Anvax Platform', description: 'Find it in seconds. Cite the source.', url: 'https://www.anvax.in/platform/search' },
  alternates: { canonical: 'https://www.anvax.in/platform/search' },
}

const siblings = [
  { label: 'Search', href: '/platform/search' },
  { label: 'Chat', href: '/platform/chat' },
  { label: 'Agents', href: '/platform/agents' },
  { label: 'Governance', href: '/platform/governance' },
]

const features = [
  {
    title: 'Hybrid retrieval',
    body: 'Dense vector search and BM25 keyword search run in parallel and are fused by a cross-encoder reranker. Neither alone is good enough for compliance documents, together they surface the right paragraph, not just the right document.',
    color: 'var(--blue)',
    icon: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0',
  },
  {
    title: 'PII guard at retrieval',
    body: 'PII, PCI, and PHI identifiers are detected and redacted before results leave the retrieval layer, before the model sees them, before the user sees them. Configurable per jurisdiction and document type.',
    color: 'var(--teal)',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
  {
    title: 'Source citations',
    body: 'Every result shows the source document, page number, and the exact paragraph it drew from. Your analyst can verify the answer in 10 seconds without leaving the interface.',
    color: 'var(--ink-900)',
    icon: 'M14 2H6v20h12V8zM14 2v6h6M9 14h6M9 18h4',
  },
]

const governed = [
  { label: 'Audit', body: '<strong>Every retrieval is logged</strong>: user identity, timestamp, query text, documents returned and their versions. Append-only, tamper-evident.' },
  { label: 'Access', body: '<strong>Permission-checked at query time</strong> against source ACLs, not at index time. A revoked permission takes effect on the next query, not the next re-index.' },
  { label: 'PII', body: '<strong>Redaction applied before context assembly</strong>: the model never sees raw PII, and neither does the user unless they have explicit clearance.' },
]

export default function SearchPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Platform · Search</p>
            <h1 className={styles.heroH1}>Find it in seconds.<br />Cite the source.</h1>
            <p className={styles.heroLede}>Hybrid retrieval across your entire document corpus, policies, contracts, circulars, emails, and structured data, with paragraph-level citations on every result.</p>
          </div>
        </div>
      </section>

      <nav className={styles.siblingNav}>
        <div className="container">
          <div className={styles.siblingNavInner}>
            {siblings.map(s => (
              <Link key={s.href} href={s.href}
                className={`${styles.siblingLink} ${s.href === '/platform/search' ? styles.siblingLinkActive : ''}`}>
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
          <h2 className={styles.governedTitle}>Every search is accountable.</h2>
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
              <h2 className={styles.ctaH2}>See search running on your corpus.</h2>
              <p className={styles.ctaBody}>We run a scoped pilot on your documents, 45 minutes, no slide decks.</p>
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
