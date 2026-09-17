import type { Metadata } from 'next'
import styles from '../Capability.module.css'

export const metadata: Metadata = {
  title: 'Search | Anvax Platform',
  description: 'Hybrid semantic search over your entire document corpus, cited, PII-guarded, and logged. Inside your perimeter.',
  openGraph: { title: 'Search | Anvax Platform', description: 'Find it in seconds. Cite the source.', url: 'https://www.anvax.in/platform/search' },
  alternates: { canonical: 'https://www.anvax.in/platform/search' },
}

const siblings = [
  { label: 'Search',     href: '/platform/search' },
  { label: 'Chat',       href: '/platform/chat' },
  { label: 'Agents',     href: '/platform/agents' },
  { label: 'Governance', href: '/platform/governance' },
]

const features = [
  {
    title: 'Hybrid retrieval',
    body: 'Dense vector search and BM25 keyword search run in parallel and are fused by a cross-encoder reranker. Neither alone is good enough for compliance documents; together they surface the right paragraph, not just the right document.',
    color: 'var(--blue-600)',
    icon: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0',
  },
  {
    title: 'PII guard at retrieval',
    body: 'PII, PCI, and PHI identifiers are detected and redacted before results leave the retrieval layer, before the model sees them, before the user sees them. Configurable per jurisdiction and document type.',
    color: 'var(--sage-600)',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
  {
    title: 'Source citations',
    body: 'Every result shows the source document, page number, and the exact paragraph it drew from. Your analyst can verify the answer in ten seconds without leaving the interface.',
    color: 'var(--ink-900)',
    icon: 'M14 2H6v20h12V8zM14 2v6h6M9 14h6M9 18h4',
  },
]

const governed = [
  {
    label: 'Audit',
    body: '<strong>Every retrieval is logged:</strong> user identity, timestamp, query text, documents returned and their versions. Append-only, tamper-evident.',
  },
  {
    label: 'Access',
    body: '<strong>Permission-checked at query time</strong> against source ACLs, not at index time. A revoked permission takes effect on the next query, not the next re-index.',
  },
  {
    label: 'PII',
    body: '<strong>Redaction applied before context assembly.</strong> The model never sees raw PII, and neither does the user unless they have explicit clearance.',
  },
]

export default function SearchPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroLattice} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>Platform · Search</div>
              <h1 className={styles.h1}>Find it in seconds. Cite the source.</h1>
              <p className={styles.heroLede}>
                Hybrid retrieval across your entire document corpus: policies, contracts,
                circulars, emails, and structured data, with paragraph-level citations on
                every result.
              </p>
              <div className={styles.heroActions}>
                <a href="/contact" className={styles.btnPrimary}>Book a demo →</a>
                <a href="/platform" className={styles.btnGhost}>All capabilities</a>
              </div>
            </div>

            <div className={styles.heroMockWrap} aria-hidden="true">
              <div className={styles.hmPanel}>
                <div className={styles.hm2Header}>
                  <span className={styles.hm2HeaderLabel}>Search · cited results</span>
                  <span className={styles.hmBarBadge}>
                    <span className={styles.hmBarBadgeDot} />Governed
                  </span>
                </div>
                <div className={styles.hm2Body}>
                  {/* Search input */}
                  <div className={styles.hm2SearchRow}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                      <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0" />
                    </svg>
                    <span className={styles.hm2SearchText}>Treasury sovereign risk exposure</span>
                    <span className={styles.hm2Caret} />
                  </div>

                  {/* Filter chips */}
                  <div className={styles.hm2Chips}>
                    <span className={`${styles.hm2Chip} ${styles.hm2ChipActive}`}>All corpora</span>
                    <span className={styles.hm2Chip}>Treasury</span>
                    <span className={styles.hm2Chip}>Risk</span>
                    <span className={styles.hm2Chip}>ALCO</span>
                  </div>

                  {/* Result cards */}
                  <div className={styles.hm2ResultCard}>
                    <div className={styles.hm2ResultTitle}>Treasury exposure — sovereign risk limits</div>
                    <div className={styles.hm2ResultMeta}>
                      <span className={styles.hm2ResultTag}>ALCO Policy §4.1</span>
                      p. 23
                    </div>
                  </div>
                  <div className={styles.hm2ResultCard}>
                    <div className={styles.hm2ResultTitle}>Q4 ALCO pack — counterparty breakdown</div>
                    <div className={styles.hm2ResultMeta}>
                      <span className={styles.hm2ResultTag}>Board deck</span>
                      slide 11
                    </div>
                  </div>

                  {/* Withheld result */}
                  <div className={styles.hm2Withheld}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className={styles.hm2WithheldText}>1 result withheld — insufficient clearance</span>
                  </div>

                  {/* Footer */}
                  <div className={styles.hm2SearchFooter}>
                    Returned in 0.9 s · logged as entry 4,412,911
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
              className={`${styles.siblingLink} ${s.href === '/platform/search' ? styles.siblingLinkActive : ''}`}
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
            <h2 className={styles.h2}>Enterprise retrieval, built for regulated environments.</h2>
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
          <div className={styles.governedEyebrow}>Governance</div>
          <h2 className={styles.governedH2}>Every search is accountable.</h2>
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
            <h2 className={styles.ctaH2}>See search running on your corpus.</h2>
            <p className={styles.ctaBody}>We run a scoped pilot on your documents. 45 minutes, no slide decks.</p>
          </div>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaWhite}>Book a demo →</a>
            <a href="/platform" className={styles.ctaOutline}>All capabilities</a>
          </div>
        </div>
      </section>
    </>
  )
}
