'use client'

import { useState } from 'react'
import SectionHead from '@/components/ui/SectionHead'
import Tag from '@/components/ui/Tag'
import styles from '@/pages/Industries.module.css'

interface Role {
  role: string
  uc: string
}

interface Vertical {
  id: string
  tag: string
  tagVariant: 'live' | 'next' | 'roadmap'
  title: string
  intro: string
  roles: Role[]
  corpus: string[]
}

const verticals: Vertical[] = [
  {
    id: 'financial-services',
    tag: 'Financial services',
    tagVariant: 'live',
    title: 'Financial services',
    intro: 'Banks, asset managers, insurers, and fintech companies operate under tighter AI governance requirements than almost any other sector. Anvax ships with corpus schemas, workflow libraries, and jurisdiction packs built for regulated financial services, whether your regulator is the FCA, FINRA, MAS, RBI, or SAMA.',
    roles: [
      { role: 'Compliance officer', uc: 'Track regulatory feeds, draft compliance responses, maintain the obligation register' },
      { role: 'Risk officer', uc: 'Model risk documentation, audit trail for algorithmic decisions, board-level AI governance reporting' },
      { role: 'Investment analyst', uc: 'Synthesise research, generate briefings, cross-reference filings and disclosures' },
      { role: 'Relationship manager', uc: 'Client briefings, suitability notes, portfolio summaries, over your own data' },
    ],
    corpus: ['Regulatory circulars and guidance', 'Internal credit and investment policies', 'Client and portfolio data', 'Research reports and filings', 'Audit and board reports'],
  },
  {
    id: 'healthcare',
    tag: 'Healthcare',
    tagVariant: 'live',
    title: 'Healthcare & life sciences',
    intro: 'Clinical documentation, research data, patient records, and regulatory submissions are among the most sensitive documents in any organisation. Anvax gives clinical, compliance, and research teams a workspace where PHI never leaves the facility and every query is auditable, by construction, not configuration.',
    roles: [
      { role: 'Clinical researcher', uc: 'Synthesise trial data, draft regulatory submissions, cross-reference literature' },
      { role: 'Medical affairs', uc: 'Summarise clinical evidence, prepare advisory board materials, cross-reference label' },
      { role: 'Compliance officer', uc: 'Track FDA, EMA, and local guidance; verify documentation completeness; maintain audit trail' },
    ],
    corpus: ['Clinical trial protocols and results', 'Regulatory guidance and submissions', 'Patient records (de-identified)', 'Research literature', 'Internal SOPs'],
  },
  {
    id: 'legal',
    tag: 'Legal',
    tagVariant: 'live',
    title: 'Legal & professional services',
    intro: 'Matter files, contracts, M&A diligence, and privileged communications are the most confidential documents any firm handles, and none of them can go into a shared AI. Anvax gives practitioners a workspace over their own corpus with full privilege protection and an audit trail that satisfies bar council requirements.',
    roles: [
      { role: 'Associate / solicitor', uc: 'Research precedents, draft documents, cross-reference matter files' },
      { role: 'Partner', uc: 'Matter summaries, client briefings, risk and scope assessments' },
      { role: 'Compliance / professional responsibility', uc: 'Track regulatory guidance, verify matter compliance, maintain the audit trail' },
    ],
    corpus: ['Matter files and correspondence', 'Contracts and precedent library', 'Regulatory guidance and case law', 'Client documents and filings'],
  },
  {
    id: 'public-sector',
    tag: 'Public sector',
    tagVariant: 'live',
    title: 'Public sector & government',
    intro: 'Government agencies and public bodies face strict data sovereignty requirements, often mandating that no citizen data leaves the jurisdiction. Anvax deploys fully on-prem or on sovereign cloud infrastructure, with no outbound network dependency. The same product; the same capability; inside your facility.',
    roles: [
      { role: 'Policy analyst', uc: 'Research legislation, draft briefings, cross-reference regulations and precedents' },
      { role: 'Procurement officer', uc: 'Supplier assessment, contract review, compliance verification against frameworks' },
      { role: 'IT / security lead', uc: 'Governance documentation, access audit trail, incident reporting and reconstruction' },
    ],
    corpus: ['Legislation and regulations', 'Policy documents and guidance', 'Procurement frameworks and contracts', 'Internal reports and briefings'],
  },
  {
    id: 'defence',
    tag: 'Defence',
    tagVariant: 'live',
    title: 'Defence & critical infrastructure',
    intro: 'Classified environments require complete air-gap. Anvax\'s on-prem tier has no outbound network dependency, no cloud API, no model call that leaves the building. The full capability stack runs inside the facility, on hardware you control.',
    roles: [
      { role: 'Intelligence analyst', uc: 'Document synthesis, structured reporting, cross-reference across classified sources' },
      { role: 'Procurement specialist', uc: 'Supplier risk assessment, contract review, compliance documentation' },
      { role: 'Security officer', uc: 'Governance documentation, incident log, audit trail reconstruction' },
    ],
    corpus: ['Classified and restricted documents', 'Technical specifications and manuals', 'Procurement and contract files', 'Incident and intelligence reports'],
  },
  {
    id: 'technology',
    tag: 'Technology',
    tagVariant: 'live',
    title: 'Technology & SaaS',
    intro: 'Fast-growing technology companies increasingly handle sensitive customer data under contracts that prohibit sharing with AI vendors. Anvax gives engineering, legal, and product teams a governed AI workspace over their internal knowledge base, Confluence, docs, tickets, code, without the DPA headache.',
    roles: [
      { role: 'Engineer', uc: 'Search internal docs and code, ask architecture questions, generate technical summaries' },
      { role: 'Legal / compliance', uc: 'Review contracts, track regulatory obligations, manage DPA inventory' },
      { role: 'Product manager', uc: 'Synthesise user research, generate requirements docs, cross-reference product specs' },
    ],
    corpus: ['Engineering documentation and code', 'Product specs and roadmaps', 'Legal and compliance documents', 'Customer research and feedback', 'Internal knowledge base'],
  },
]

export default function IndustriesClient() {
  const [open, setOpen] = useState<string>('financial-services')

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Industries</p>
            <h1 className={styles.heroH1}>
              Defined by constraint,<br />
              not by industry.
            </h1>
            <p className={styles.heroLede}>
              Every vertical ships with a pre-built corpus schema, workflow library, role packs,
              and jurisdiction pack, not a horizontal AI with a compliance checkbox.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Verticals"
            title="Every sector where 'no' to public AI is policy."
            lede="The buyer in each vertical shares one constraint, their data cannot leave the building. These six sectors are where that constraint is sharpest."
          />
          <div className={styles.accordionList}>
            {verticals.map((v) => {
              const isOpen = open === v.id
              return (
                <div key={v.id} className={styles.accordionItem}>
                  <button
                    className={`${styles.accordionTrigger} ${isOpen ? styles.accordionTriggerOpen : ''}`}
                    onClick={() => setOpen(isOpen ? '' : v.id)}
                    aria-expanded={isOpen}
                  >
                    <Tag variant={v.tagVariant}>{v.tag}</Tag>
                    <span className={styles.accordionTitle}>{v.title}</span>
                    <span className={`${styles.accordionChevron} ${isOpen ? styles.accordionChevronOpen : ''}`}>▾</span>
                  </button>
                  {isOpen && (
                    <div className={styles.accordionBody}>
                      <div className={styles.accordionGrid}>
                        <div>
                          <p className={styles.accordionIntro}>{v.intro}</p>
                          <p className={styles.corpusLabel}>Corpus</p>
                          <div className={styles.corpusPills}>
                            {v.corpus.map((c) => (
                              <span key={c} className={styles.corpusPill}>{c}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <table className={styles.roleTable}>
                            <thead>
                              <tr>
                                <th>Role</th>
                                <th>What they do</th>
                              </tr>
                            </thead>
                            <tbody>
                              {v.roles.map((r) => (
                                <tr key={r.role}>
                                  <td>{r.role}</td>
                                  <td>{r.uc}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
