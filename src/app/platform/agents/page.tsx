import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import styles from '@/pages/CapabilityPage.module.css'

export const metadata: Metadata = {
  title: 'Agents | Anvax Platform',
  description: 'Persistent agents that monitor regulatory feeds, classify new publications, and route to the right team, all inside your perimeter.',
  openGraph: { title: 'Agents | Anvax Platform', description: 'Your regulatory environment, monitored 24/7.', url: 'https://www.anvax.in/platform/agents' },
  alternates: { canonical: 'https://www.anvax.in/platform/agents' },
}

const siblings = [
  { label: 'Search', href: '/platform/search' },
  { label: 'Chat', href: '/platform/chat' },
  { label: 'Agents', href: '/platform/agents' },
  { label: 'Governance', href: '/platform/governance' },
]

const features = [
  {
    title: 'Regulatory feed monitoring',
    body: 'Agents poll configured feeds on a defined interval. When a new circular, guidance, or update is published, they run a delta diff against the previous version, classify the change by topic and impact, and route it to the right workspace.',
    color: 'var(--blue)',
    icon: 'M12 8V4H8M2 4h20M20 4v16M4 4v16M2 20h20M9 12h6M9 16h6',
  },
  {
    title: 'Explicit action whitelist',
    body: 'Agents can only execute actions you have explicitly enabled, Slack alert, task creation, workflow trigger, email dispatch. Nothing outside the whitelist executes, enforced at the platform layer, not by the model\'s instruction-following.',
    color: 'var(--teal)',
    icon: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
  },
  {
    title: 'Persistent tenant memory',
    body: 'Tenant-scoped memory with configurable TTL. The agent builds an understanding of your regulatory landscape over time, what your team monitors, what has already been acted on, what is pending. Memory stays inside your perimeter.',
    color: 'var(--ink-900)',
    icon: 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z',
  },
]

const governed = [
  { label: 'Action log', body: '<strong>Every agent action is logged</strong>: trigger event, action taken, parameters, outcome. The trail is append-only and available for compliance review.' },
  { label: 'Spend control', body: '<strong>Token budget enforced with a hard limit.</strong> Anomalous usage patterns trigger an alert before they become an incident. No runaway spend.' },
  { label: 'Human gate', body: '<strong>High-risk actions require explicit human approval</strong> before execution. The approval and the approver are recorded in the audit trail.' },
]

export default function AgentsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Platform · Agents</p>
            <h1 className={styles.heroH1}>Your regulatory environment,<br />monitored 24/7.</h1>
            <p className={styles.heroLede}>Persistent agents watch your regulatory feeds. When a new circular drops, they classify, summarise, and route to the right team before your compliance officer opens email.</p>
          </div>
        </div>
      </section>

      <nav className={styles.siblingNav}>
        <div className="container">
          <div className={styles.siblingNavInner}>
            {siblings.map(s => (
              <Link key={s.href} href={s.href}
                className={`${styles.siblingLink} ${s.href === '/platform/agents' ? styles.siblingLinkActive : ''}`}>
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
          <h2 className={styles.governedTitle}>Every agent action is accountable.</h2>
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
              <h2 className={styles.ctaH2}>Join the early-access list for Agents.</h2>
              <p className={styles.ctaBody}>We are onboarding design partners now. Tell us which regulatory feeds you monitor.</p>
            </div>
            <div className={styles.ctaActions}>
              <Button variant="accent" href="/contact" arrow>Get early access</Button>
              <Button variant="ghost" href="/platform">All capabilities</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
