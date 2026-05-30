import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead'
import Tag from '../ui/Tag'
import styles from './IndustriesGrid.module.css'

const industries = [
  { tag: 'NBFC',     status: 'live'    as const, title: 'NBFC',              body: 'Credit-pack assembly, RBI circular tracking, customer 360, and audit-prep workflows.', roles: ['Compliance', 'Credit', 'Ops', 'Internal audit'], href: '/industries#nbfc' },
  { tag: 'Wealth',   status: 'next'    as const, title: 'Wealth management', body: 'Client briefings, portfolio commentary, SEBI advisor disclosures, and KYC packs.',       roles: ['RM', 'Research', 'Compliance'],                    href: '/industries#wealth' },
  { tag: 'Lending',  status: 'next'    as const, title: 'Lending',           body: 'Underwriting over bank statements, GST, and AA pulls. Remediation tickets from circulars.', roles: ['Underwriting', 'Risk', 'Collections'],             href: '/industries#lending' },
  { tag: 'Insurance',status: 'roadmap' as const, title: 'Insurance',         body: 'Policy lookups, IRDAI disclosure drafting, claims triage, agent-script governance.',      roles: ['Underwriting', 'Claims', 'Compliance'],            href: '/industries#insurance' },
  { tag: 'Broking',  status: 'roadmap' as const, title: 'Broking',           body: 'SEBI circular intake, surveillance memos, research synthesis, client briefings.',         roles: ['Compliance', 'Research', 'Surveillance'],          href: '/industries#broking' },
  { tag: 'Payments', status: 'roadmap' as const, title: 'Payments',          body: 'Merchant onboarding, dispute drafts, RBI PSO compliance, and incident postmortems.',     roles: ['Risk', 'Ops', 'Compliance'],                       href: '/industries#payments' },
]

export default function IndustriesGrid() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Industries · Year 1 rollout"
          title="NBFC first. Then the rest of regulated India."
          lede="Vertical packs ship as compounding intelligence — RBI circulars, sectoral templates, role-based workflows. We don't sell horizontally and call it a fit."
        />
        <div className={styles.grid}>
          {industries.map(({ tag, status, title, body, roles, href }) => (
            <Link key={tag} to={href} className={styles.card}>
              <div className={styles.head}>
                <span className={styles.tagLabel}>{tag}</span>
                <Tag variant={status}>{status === 'live' ? 'Live' : status === 'next' ? 'Next' : 'Roadmap'}</Tag>
              </div>
              <h3 className={styles.h3}>{title}</h3>
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
