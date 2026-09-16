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
                <div className={styles.hm2Header}>
                  <span className={styles.hm2HeaderLabel}>Chat · grounded thread</span>
                  <span className={styles.hmBarBadge}>
                    <span className={styles.hmBarBadgeDot} />Governed
                  </span>
                </div>
                <div className={styles.hm2ChatBody}>
                  {/* User message */}
                  <div className={styles.hm2UserMsg}>
                    Summarise PEP relationships above board exposure limits.
                  </div>

                  {/* PII redaction notice */}
                  <div className={styles.hm2PiiPill}>
                    PII detected · 2 names redacted per policy
                  </div>

                  {/* Step completion card */}
                  <div className={styles.hm2StepCard}>
                    <div className={styles.hm2StepHeader}>
                      <span className={styles.hm2StepCheck}>✓</span>
                      Completed · 3 steps · 2 sources
                    </div>
                    <div className={styles.hm2StepChips}>
                      <span className={styles.hm2StepChip}>AML Policy v12</span>
                      <span className={styles.hm2StepChip}>PEP register</span>
                    </div>
                  </div>

                  {/* AI answer */}
                  <p className={styles.hm2AiText}>
                    Three relationships exceed the 5% board limit. Full names redacted per AML
                    Policy v12 §4.3. Refer to the compliance desk for the unredacted list.
                  </p>

                  {/* Input bar */}
                  <div className={styles.hm2InputBar}>
                    <div className={styles.hm2InputTop}>
                      <span className={styles.hm2InputScope}>
                        Governed
                        <span className={styles.hm2InputScopeSep}> | </span>
                        <span className={styles.hm2InputScopeVal}>All corpora</span>
                      </span>
                    </div>
                    <div className={styles.hm2InputField}>
                      <span>Ask about your documents...</span>
                      <div className={styles.hm2SendBtn}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.hm2LlamaFooter}>
                      Llama 3.3 70B ·{' '}
                      <span className={styles.hm2LlamaTeal}>Thread logged</span>
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
