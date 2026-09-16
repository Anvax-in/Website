import type { Metadata } from 'next'
import styles from '../Capability.module.css'

export const metadata: Metadata = {
  title: 'Chat | Anvax Platform',
  description: 'Multi-turn grounded AI chat anchored to your corpus, never hallucinates, every turn logged, tenant-isolated by construction.',
  openGraph: { title: 'Chat | Anvax Platform', description: 'Ask your corpus. Get a cited answer.', url: 'https://www.anvax.in/platform/chat' },
  alternates: { canonical: 'https://www.anvax.in/platform/chat' },
}

const siblings = [
  { label: 'Search',     href: '/platform/search' },
  { label: 'Chat',       href: '/platform/chat' },
  { label: 'Agents',     href: '/platform/agents' },
  { label: 'Governance', href: '/platform/governance' },
]

const features = [
  {
    title: 'Grounded answers only',
    body: 'Every answer is anchored to context retrieved from your corpus. The model says "not found in corpus" rather than fabricate. It cannot hallucinate a regulation because there is nothing else for it to draw from.',
    color: 'var(--blue-600)',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  },
  {
    title: 'Tenant-isolated threads',
    body: 'Thread history stays scoped to your tenant. No cross-customer data leakage is architecturally possible. A thread cannot reference a document from a different workspace even if the model is prompted to try.',
    color: 'var(--sage-600)',
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
  {
    label: 'Inference audit',
    body: '<strong>Every turn is logged:</strong> prompt, retrieved context, model and template version, full completion. Append-only with cryptographic chaining.',
  },
  {
    label: 'Model governance',
    body: '<strong>Model version pinned per tenant.</strong> Version changes require an explicit admin decision and are logged with rationale. Rollback is a single operation.',
  },
  {
    label: 'Tenancy',
    body: '<strong>Thread data never crosses tenants.</strong> RLS enforced at the database engine, not the application layer. A bug in the app cannot cause cross-tenant leakage.',
  },
]

export default function ChatPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroLattice} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>Platform · Chat</div>
              <h1 className={styles.h1}>Ask your corpus. Get a cited answer.</h1>
              <p className={styles.heroLede}>
                Multi-turn grounded chat across your documents. Anchored to retrieved context,
                the model says "not found" rather than inventing an answer.
              </p>
              <div className={styles.heroActions}>
                <a href="/contact" className={styles.btnPrimary}>Request a pilot →</a>
                <a href="/platform" className={styles.btnGhost}>All capabilities</a>
              </div>
            </div>

            <div className={styles.heroMockWrap} aria-hidden="true">
              <div className={styles.hmPanel}>
                <div className={styles.hmBar}>
                  <span className={styles.hmDot} />
                  <span className={styles.hmDot} />
                  <span className={styles.hmDot} />
                  <span className={styles.hmBarTitle}>anvax · chat · your tenancy</span>
                  <span className={styles.hmBarBadge}>
                    <span className={styles.hmBarBadgeDot} />Governed
                  </span>
                </div>
                <div className={styles.hmGrid}>
                  {/* Left: thread list */}
                  <div className={styles.hmSidebar}>
                    <div className={styles.hmSectionLabel}>Threads</div>
                    <div className={styles.hmNavItemActive}>AML PEP limits</div>
                    <div className={styles.hmNavItem}>GDPR retention</div>
                    <div className={styles.hmNavItem}>RBI circular 74</div>
                    <div className={styles.hmNavItem}>ISO 27001 gaps</div>
                    <div className={styles.hmSidebarFooter}>
                      Model v2024.11<br />4 threads · tenant
                    </div>
                  </div>

                  {/* Center: conversation */}
                  <div className={styles.hmCenter}>
                    <div className={styles.hmMsgUser}>
                      What does our AML policy say about PEP exposure limits?
                    </div>
                    <div className={styles.hmMsgAi}>
                      <p className={styles.hmMsgAiText}>
                        Per AML Policy v12 §4.3, PEP exposure is capped at 5% of
                        the credit portfolio. Enhanced due diligence is mandatory
                        for any relationship above £50k.
                      </p>
                      <div className={styles.hmMsgSource}>
                        <span className={styles.hmMsgSourceDot} />
                        AML Policy v12 · §4.3 · p. 18
                      </div>
                    </div>
                    <div className={styles.hmMsgFooter}>
                      <span className={styles.hmFooterItem}>✓ Grounded</span>
                      <span className={styles.hmFooterItem}>✓ Logged</span>
                      <span className={styles.hmFooterItem}>✓ No egress</span>
                    </div>
                  </div>

                  {/* Right: turn metadata */}
                  <div className={styles.hmRight}>
                    <div className={styles.hmSectionLabel}>This turn</div>
                    <div className={styles.hmMetaRow}>
                      <span className={styles.hmMetaDot} />
                      <span className={styles.hmMetaText}>
                        Model pinned<br />
                        <span className={styles.hmMetaSub}>v2024.11</span>
                      </span>
                    </div>
                    <div className={styles.hmMetaRow}>
                      <span className={styles.hmMetaDot} />
                      <span className={styles.hmMetaText}>
                        Tenant isolated<br />
                        <span className={styles.hmMetaSub}>your-workspace</span>
                      </span>
                    </div>
                    <div className={styles.hmMetaRow}>
                      <span className={styles.hmMetaDot} />
                      <span className={styles.hmMetaText}>
                        Audit written<br />
                        <span className={styles.hmMetaSub}>#4,412,910</span>
                      </span>
                    </div>
                    <div className={styles.hmRightFooter}>
                      No data egress<br />eu-central-1
                    </div>
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
              className={`${styles.siblingLink} ${s.href === '/platform/chat' ? styles.siblingLinkActive : ''}`}
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
            <h2 className={styles.h2}>AI chat that stays inside what you know.</h2>
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
          <h2 className={styles.governedH2}>Every conversation is accountable.</h2>
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
            <h2 className={styles.ctaH2}>See it answer a question from your documents.</h2>
            <p className={styles.ctaBody}>We run a scoped pilot on your corpus. 45 minutes, no slide decks.</p>
          </div>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaWhite}>Request a pilot →</a>
            <a href="/platform" className={styles.ctaOutline}>All capabilities</a>
          </div>
        </div>
      </section>
    </>
  )
}
