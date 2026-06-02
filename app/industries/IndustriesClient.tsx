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
    id: 'nbfc',
    tag: 'NBFC',
    tagVariant: 'live',
    title: 'NBFC',
    intro: 'India has over 10,000 NBFCs navigating an ever-thickening stack of RBI master directions, circular updates, and AA data obligations. Anvax ships with an NBFC-specific corpus schema, pre-built workflows for circular triage and credit memo drafting, and role packs for every team from compliance to collections.',
    roles: [
      { role: 'Compliance officer', uc: 'Track RBI circulars, draft compliance responses, maintain master direction register' },
      { role: 'Credit analyst', uc: 'Summarise AA data, analyse GST filings, generate underwriting memo' },
      { role: 'Internal auditor', uc: 'Run audit checklists, flag policy deviations, generate audit reports' },
      { role: 'Ops manager', uc: 'Monitor workflow queues, escalate exceptions, produce SLA reports' },
    ],
    corpus: ['RBI circulars', 'NBFC master directions', 'Internal credit policies', 'Loan files', 'GST filings', 'Account Aggregator data'],
  },
  {
    id: 'wealth',
    tag: 'Wealth management',
    tagVariant: 'next',
    title: 'Wealth management',
    intro: 'SEBI-registered advisors manage portfolios under tightening disclosure and suitability rules. Anvax connects to portfolio data and SEBI regulatory feeds, giving relationship managers a single pane to research, comply, and advise — without leaving their corpus.',
    roles: [
      { role: 'Relationship manager', uc: 'Summarise client portfolio, draft suitability note, flag product risks' },
      { role: 'Research analyst', uc: 'Synthesise company filings, generate research briefs, track SEBI disclosures' },
      { role: 'Compliance officer', uc: 'Track SEBI regulations, verify KYC completeness, audit advice trail' },
    ],
    corpus: ['Portfolio data', 'SEBI regulations', 'Research reports', 'Company filings', 'Client KYC'],
  },
  {
    id: 'lending',
    tag: 'Lending',
    tagVariant: 'next',
    title: 'Lending',
    intro: 'Underwriting at scale requires pulling together bank statements, GST returns, ITR filings, bureau reports, and internal credit policy — often across dozens of documents per application. Anvax automates the aggregation and surface anomaly flags so underwriters spend time on decisions, not data gathering.',
    roles: [
      { role: 'Underwriter', uc: 'Aggregate applicant data, flag anomalies, draft credit memo' },
      { role: 'Risk manager', uc: 'Monitor portfolio risk, generate risk reports, track RBI limits' },
      { role: 'Collections officer', uc: 'Summarise account history, draft outreach templates, log contacts' },
    ],
    corpus: ['Bank statements', 'GST returns', 'ITR filings', 'Bureau reports', 'RBI circulars', 'Internal credit policy'],
  },
  {
    id: 'insurance',
    tag: 'Insurance',
    tagVariant: 'roadmap',
    title: 'Insurance',
    intro: 'IRDAI disclosure requirements, proposal processing, and claims assessment all generate large volumes of semi-structured documents. Anvax connects to policy documents and IRDAI regulations so underwriters and claims assessors can work faster without compliance risk.',
    roles: [
      { role: 'Underwriter', uc: 'Analyse proposal forms, assess risk factors, draft terms and conditions' },
      { role: 'Claims assessor', uc: 'Summarise claims files, verify policy coverage, generate assessment report' },
      { role: 'Compliance officer', uc: 'Track IRDAI regulations, verify disclosure completeness, audit trail' },
    ],
    corpus: ['Policy documents', 'IRDAI regulations', 'Proposal forms', 'Claims files', 'Medical records'],
  },
  {
    id: 'broking',
    tag: 'Broking',
    tagVariant: 'roadmap',
    title: 'Broking',
    intro: 'SEBI circular volume has grown 40% in three years. Broking compliance teams drown in classification and triage before they can start impact analysis. Anvax automates circular ingestion, summarisation, and team routing so compliance officers focus on interpretation, not administration.',
    roles: [
      { role: 'Compliance officer', uc: 'Triage SEBI circulars, draft compliance notes, maintain regulatory register' },
      { role: 'Surveillance analyst', uc: 'Analyse trading patterns, flag anomalies, generate surveillance reports' },
      { role: 'Research analyst', uc: 'Synthesise company filings, generate research briefs, track regulatory changes' },
    ],
    corpus: ['SEBI circulars', 'Trading data', 'Company filings', 'Research reports', 'Internal policies'],
  },
  {
    id: 'payments',
    tag: 'Payments',
    tagVariant: 'roadmap',
    title: 'Payments',
    intro: 'RBI PSO regulations, CERT-In incident obligations, and merchant agreement management all require constant compliance monitoring. Anvax gives payment operations teams a single workspace for regulatory compliance, risk monitoring, and merchant governance.',
    roles: [
      { role: 'Compliance officer', uc: 'Track RBI PSO circulars, draft compliance responses, maintain obligations register' },
      { role: 'Risk analyst', uc: 'Monitor transaction logs for anomalies, generate risk reports, flag threshold breaches' },
      { role: 'Ops manager', uc: 'Manage merchant agreements, track SLA compliance, generate ops reports' },
    ],
    corpus: ['RBI PSO circulars', 'CERT-In regulations', 'Transaction logs', 'Merchant agreements', 'GST + MCA data'],
  },
]

export default function IndustriesClient() {
  const [open, setOpen] = useState<string>('nbfc')

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Industries</p>
            <h1 className={styles.heroH1}>
              NBFC first.<br />
              Then the rest of regulated India.
            </h1>
            <p className={styles.heroLede}>
              Each vertical ships with a pre-built corpus schema, workflow library, role packs,
              and regulatory connector set — not a horizontal AI with a compliance checkbox.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Verticals"
            title="Regulated India, vertical by vertical."
            lede="Start with your sector. Get the corpus schema, workflow templates, and regulatory connector set built for your regulator."
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
