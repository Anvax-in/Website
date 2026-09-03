import Link from 'next/link'
import SectionHead from '../ui/SectionHead'
import Tag from '../ui/Tag'
import styles from './IndustriesGrid.module.css'

const industries = [
  { tag: 'BFSI',         status: 'live'    as const, title: 'Financial services',             body: 'Governed search, chat, and workflows for banks, asset managers, insurers, and fintech. Jurisdiction packs for FCA, MAS, RBI, SAMA, and FINRA.',              roles: ['Compliance', 'Risk', 'Investment', 'Operations'], href: '/industries#financial-services', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',                           color: 'var(--teal)' },
  { tag: 'Healthcare',   status: 'next'    as const, title: 'Healthcare & life sciences',      body: 'PHI-aware search and research synthesis. Runs fully inside your facility — no data touches a shared AI.',                                                   roles: ['Research', 'Clinical', 'Compliance'],              href: '/industries#healthcare',         icon: 'M22 12h-4l-3 9L9 3l-3 9H2',                                        color: 'var(--blue)' },
  { tag: 'Legal',        status: 'next'    as const, title: 'Legal & professional services',   body: 'Matter files, contracts, and privileged communications — over your own corpus, never through someone else\'s cloud.',                                        roles: ['Associates', 'Partners', 'Compliance'],            href: '/industries#legal',              icon: 'M3 6h18M3 12h18M3 18h12',                                          color: 'var(--ink-900)' },
  { tag: 'Public sector',status: 'roadmap' as const, title: 'Public sector & government',      body: 'Full on-prem and sovereign cloud support for agencies where citizen data cannot leave the jurisdiction.',                                                    roles: ['Policy', 'Procurement', 'IT Security'],            href: '/industries#public-sector',      icon: 'M3 21h18M3 10h18M5 6h14M8 21V10M12 21V10M16 21V10',               color: 'var(--teal)' },
  { tag: 'Defence',      status: 'roadmap' as const, title: 'Defence & critical infrastructure',body: 'Air-gapped deployment. No outbound network dependency. Full capability, inside your facility.',                                                             roles: ['Intelligence', 'Procurement', 'Security'],         href: '/industries#defence',            icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',                        color: 'var(--ink-900)' },
  { tag: 'Technology',   status: 'roadmap' as const, title: 'Technology & SaaS',               body: 'Internal knowledge base — Confluence, docs, tickets, code — with a DPA your legal team will actually approve.',                                            roles: ['Engineering', 'Legal', 'Product'],                 href: '/industries#technology',         icon: 'M8 6L2 12l6 6M16 6l6 6-6 6M12 4l-4 16',                           color: 'var(--blue)' },
]

export default function IndustriesGrid() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Industries"
          title="Every sector where 'no' to public AI is policy."
          lede="Vertical packs ship with corpus schemas, workflow templates, and jurisdiction connectors built for your regulator — not a horizontal AI with a compliance checkbox."
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
