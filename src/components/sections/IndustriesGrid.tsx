import Link from 'next/link'
import SectionHead from '../ui/SectionHead'
import Tag from '../ui/Tag'
import styles from './IndustriesGrid.module.css'

const industries = [
  { tag: 'NBFC',      status: 'live'    as const, title: 'NBFC',              body: 'Credit-pack assembly, RBI circular tracking, customer 360, and audit-prep workflows.', roles: ['Compliance', 'Credit', 'Ops', 'Internal audit'], href: '/industries#nbfc',      icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6', color: 'var(--teal)' },
  { tag: 'Wealth',    status: 'next'    as const, title: 'Wealth management', body: 'Client briefings, portfolio commentary, SEBI advisor disclosures, and KYC packs.',       roles: ['RM', 'Research', 'Compliance'],                    href: '/industries#wealth',    icon: 'M3 17l6-6 4 4 8-8M14 7h7v7', color: 'var(--blue)' },
  { tag: 'Lending',   status: 'next'    as const, title: 'Lending',           body: 'Underwriting over bank statements, GST, and AA pulls. Remediation tickets from circulars.', roles: ['Underwriting', 'Risk', 'Collections'],             href: '/industries#lending',   icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', color: 'var(--blue)' },
  { tag: 'Insurance', status: 'roadmap' as const, title: 'Insurance',         body: 'Policy lookups, IRDAI disclosure drafting, claims triage, agent-script governance.',      roles: ['Underwriting', 'Claims', 'Compliance'],            href: '/industries#insurance', icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z', color: 'var(--ink-900)' },
  { tag: 'Broking',   status: 'roadmap' as const, title: 'Broking',           body: 'SEBI circular intake, surveillance memos, research synthesis, client briefings.',         roles: ['Compliance', 'Research', 'Surveillance'],          href: '/industries#broking',   icon: 'M4 20V10M10 20V4M16 20v-8M22 20H2', color: 'var(--ink-900)' },
  { tag: 'Payments',  status: 'roadmap' as const, title: 'Payments',          body: 'Merchant onboarding, dispute drafts, RBI PSO compliance, and incident postmortems.',     roles: ['Risk', 'Ops', 'Compliance'],                       href: '/industries#payments',  icon: 'M2 7h20v12H2zM2 11h20M6 15h4', color: 'var(--ink-900)' },
]

export default function IndustriesGrid() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Industries · Year 1 rollout"
          title="NBFC first. Then the rest of regulated India."
          lede="Vertical packs ship as compounding intelligence: RBI circulars, sectoral templates, role-based workflows. We don't sell horizontally and call it a fit."
        />
        <div className={styles.grid}>
          {industries.map(({ tag, status, title, body, roles, href, icon, color }) => (
            <Link key={tag} href={href} className={styles.card}>
              <div className={styles.head}>
                <div className={styles.iconWrap} style={{ background: color }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon} />
                  </svg>
                </div>
                <h3 className={styles.h3}>{tag}</h3>
                <Tag variant={status}>{status === 'live' ? 'Live' : status === 'next' ? 'Next' : 'Roadmap'}</Tag>
              </div>
              {title !== tag && <p className={styles.subtitle}>{title}</p>}
              <p className={styles.body}>{body}</p>
              <div className={styles.roles}>
                {roles.map(r => <span key={r}>· {r}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
