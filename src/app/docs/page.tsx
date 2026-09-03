import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import styles from '@/pages/Legal.module.css'

export const metadata: Metadata = {
  title: 'Documentation | Anvax',
  description: 'Private-cloud deployment guides, architecture references, and integration documentation for the Anvax governed AI workspace.',
  alternates: { canonical: 'https://www.anvax.in/docs' },
}

const guides = [
  {
    title: 'Private-cloud deployment guide',
    body: 'Step-by-step guide for deploying Anvax in your own AWS, Azure, or GCP account. Covers prerequisites, Helm chart configuration, connector setup, and initial governance configuration.',
    status: 'Request access',
    icon: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    title: 'Sovereign cloud deployment',
    body: 'Deployment guide for Anvax on in-country sovereign cloud partners. Covers region selection, data residency verification, and jurisdiction pack activation.',
    status: 'Request access',
    icon: 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zM12 10h.01',
  },
  {
    title: 'On-premises / air-gapped deployment',
    body: 'Guide for deploying into a customer data centre with no external network access. Covers bundle delivery, update mechanism, and air-gap verification.',
    status: 'Request access',
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  },
  {
    title: 'Connector configuration',
    body: 'Reference for connecting Microsoft 365, Google Workspace, Slack, Confluence, SharePoint, Salesforce, Snowflake, and regional data sources. Covers OAuth scopes, read-only enforcement, and permission propagation.',
    status: 'Request access',
    icon: 'M18 4h-5L11 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z',
  },
  {
    title: 'Governance and audit configuration',
    body: 'How to configure PII redaction rules, workspace-level policies, approval gates for write actions, and audit log export to your SIEM.',
    status: 'Request access',
    icon: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  },
  {
    title: 'Framework mapping reference',
    body: 'Control-by-control mapping for SOC 2, ISO 27001, GDPR, EU AI Act, DORA, NIST AI RMF, RBI FREE-AI, and DPDP, with implementing components and test procedures.',
    status: 'Download from Trust page',
    icon: 'M14 2H6v20h12V8zM14 2v6h6M9 14h6M9 18h4',
  },
]

export default function DocsPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: '72px' }}>
        <div className="container">
          <div className={styles.docsHero}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.02em', color: 'var(--fg-3)', marginBottom: '20px' }}>Documentation</p>
            <h1 className={styles.docsH1}>Deployment guides and technical references.</h1>
            <p className={styles.docsLede}>Anvax is self-hosted. These guides are sent to your infrastructure team before deployment, not published openly, because your deployment topology is yours.</p>
            <Button variant="accent" href="/contact" arrow>Request documentation access</Button>
          </div>

          <div className={styles.docsGrid}>
            {guides.map(g => (
              <div key={g.title} className={styles.docsCard}>
                <div className={styles.docsCardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={g.icon} />
                  </svg>
                </div>
                <h3 className={styles.docsCardTitle}>{g.title}</h3>
                <p className={styles.docsCardBody}>{g.body}</p>
                <p className={styles.docsCardStatus}>{g.status}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '56px', paddingBottom: '80px' }}>
            <p style={{ fontSize: '15px', color: 'var(--fg-2)', marginBottom: '24px' }}>
              Send us your questionnaire and we will walk your infrastructure team through a live deployment review.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="accent" href="/contact" arrow>Contact us</Button>
              <Button variant="ghost" href="/trust#downloads">Download architecture report</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
