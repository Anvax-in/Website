import type { Metadata } from 'next'
import styles from '../Capability.module.css'

export const metadata: Metadata = {
  title: 'Agents | Anvax Platform',
  description: 'Persistent agents that monitor regulatory feeds, classify new publications, and route to the right team, all inside your perimeter.',
  openGraph: { title: 'Agents | Anvax Platform', description: 'Your environment, monitored and actioned without manual triage.', url: 'https://www.anvax.in/platform/agents' },
  alternates: { canonical: 'https://www.anvax.in/platform/agents' },
}

const siblings = [
  { label: 'Search',     href: '/platform/search' },
  { label: 'Chat',       href: '/platform/chat' },
  { label: 'Agents',     href: '/platform/agents' },
  { label: 'Governance', href: '/platform/governance' },
]

const features = [
  {
    title: 'Continuous monitoring',
    body: 'Agents poll configured feeds and connected sources on a defined interval. When a new circular, guidance, or update is published, they run a delta diff against the previous version, classify the change by topic and impact, and route it to the right workspace.',
    color: 'var(--blue-600)',
    icon: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  },
  {
    title: 'Explicit action whitelist',
    body: 'Agents can only execute actions you have explicitly enabled: Slack alert, task creation, workflow trigger, email dispatch. Nothing outside the whitelist executes, enforced at the platform layer, not by the model\'s instruction-following.',
    color: 'var(--sage-600)',
    icon: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
  },
  {
    title: 'Persistent tenant memory',
    body: 'Tenant-scoped memory with configurable TTL. The agent builds an understanding of your environment over time: what your team monitors, what has been acted on, what is pending. Memory stays inside your perimeter.',
    color: 'var(--ink-900)',
    icon: 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 21h6',
  },
]

const governed = [
  {
    label: 'Action log',
    body: '<strong>Every agent action is logged:</strong> trigger event, action taken, parameters, outcome. The trail is append-only and available for compliance review.',
  },
  {
    label: 'Spend control',
    body: '<strong>Token budget enforced with a hard limit.</strong> Anomalous usage patterns trigger an alert before they become an incident. No runaway spend.',
  },
  {
    label: 'Human gate',
    body: '<strong>High-risk actions require explicit human approval</strong> before execution. The approval and the approver are recorded in the audit trail.',
  },
]

export default function AgentsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroLattice} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCenter}>
            <div className={styles.heroCopyCenter}>
              <div className={styles.eyebrow}>Platform · Agents</div>
              <h1 className={styles.h1}>Your environment, monitored and actioned.</h1>
              <p className={styles.heroLede}>
                Persistent agents watch your feeds and connected sources. When something
                changes, they classify, summarise, and route to the right team before
                anyone opens their inbox.
              </p>
              <div className={styles.heroActions}>
                <a href="/contact" className={styles.btnPrimary}>Get early access →</a>
                <a href="/platform" className={styles.btnGhost}>All capabilities</a>
              </div>
            </div>

            <div className={styles.heroMockCenter} aria-hidden="true">
              <div className={styles.hmPanel}>
                <div className={styles.hm2Header}>
                  <span className={styles.hm2HeaderLabel}>Agents · run 4417</span>
                  <span className={styles.hmBarBadge}>
                    <span className={styles.hmBarBadgeDot} />Governed
                  </span>
                </div>
                <div className={styles.hm2AgentBody}>
                  {/* Agent header */}
                  <div className={styles.hm2AgentHeader}>
                    <span className={styles.hm2AgentTitle}>Quarterly access review</span>
                    <span className={styles.hm2AgentRunBadge}>
                      <span className={styles.hm2AgentRunDot} />Running
                    </span>
                  </div>

                  {/* Run steps */}
                  <div className={styles.hm2RunCard}>
                    <div className={styles.hm2StepRow}>
                      <div className={`${styles.hm2StepRowIcon} ${styles.hm2StepRowIconDone}`}>✓</div>
                      <div>
                        <div className={styles.hm2StepRowLabel}>Fetched 847 user records</div>
                        <div className={styles.hm2StepRowMeta}>IAM connector</div>
                      </div>
                    </div>
                    <div className={styles.hm2StepRow}>
                      <div className={`${styles.hm2StepRowIcon} ${styles.hm2StepRowIconDone}`}>✓</div>
                      <div>
                        <div className={styles.hm2StepRowLabel}>Flagged 12 dormant accounts</div>
                        <div className={styles.hm2StepRowMeta}>&gt;90 day threshold</div>
                      </div>
                    </div>
                    <div className={styles.hm2StepRow}>
                      <div className={`${styles.hm2StepRowIcon} ${styles.hm2StepRowIconDone}`}>✓</div>
                      <div>
                        <div className={styles.hm2StepRowLabel}>Drafted revocation requests</div>
                        <div className={styles.hm2StepRowMeta}>12 pending</div>
                      </div>
                    </div>
                    <div className={styles.hm2StepRow}>
                      <div className={`${styles.hm2StepRowIcon} ${styles.hm2StepRowIconPending}`}>…</div>
                      <div>
                        <div className={styles.hm2StepRowLabel}>Awaiting human approval</div>
                        <div className={styles.hm2StepRowMeta}>0 / 12 approved</div>
                      </div>
                    </div>
                  </div>

                  {/* Approval queue */}
                  <div className={styles.hm2ApproveList}>
                    <div className={styles.hm2ApproveItem}>
                      <div>
                        <div>admin@firm.com</div>
                        <div className={styles.hm2ApproveMeta}>dormant 107 d</div>
                      </div>
                      <div className={styles.hm2ApproveBtns}>
                        <span className={styles.hm2ApproveBtn}>Approve</span>
                        <span className={styles.hm2ApproveBtn}>Review</span>
                      </div>
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
              className={`${styles.siblingLink} ${s.href === '/platform/agents' ? styles.siblingLinkActive : ''}`}
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
            <h2 className={styles.h2}>Agents that act within boundaries you define.</h2>
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
          <h2 className={styles.governedH2}>Every agent action is accountable.</h2>
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
            <h2 className={styles.ctaH2}>Join the early-access list for Agents.</h2>
            <p className={styles.ctaBody}>We are onboarding design partners now. Tell us which feeds and workflows you want automated.</p>
          </div>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaWhite}>Get early access →</a>
            <a href="/platform" className={styles.ctaOutline}>All capabilities</a>
          </div>
        </div>
      </section>
    </>
  )
}
