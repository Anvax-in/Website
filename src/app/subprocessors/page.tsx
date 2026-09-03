import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/pages/Legal.module.css'

export const metadata: Metadata = {
  title: 'Sub-processors | Anvax',
  description: 'The complete list of sub-processors Anvax uses — and why the list is short on self-hosted tiers.',
  alternates: { canonical: 'https://www.anvax.in/subprocessors' },
}

type Processor = {
  name: string
  purpose: string
  location: string
  scope: string
}

const websiteProcessors: Processor[] = [
  { name: 'Vercel', purpose: 'Website hosting (anvax.in)', location: 'USA / Global CDN', scope: 'Website only — no customer data' },
  { name: 'Resend', purpose: 'Transactional email (contact form, notifications)', location: 'USA', scope: 'Website only — name and email of message sender' },
]

const platformProcessors: Processor[] = [
  { name: 'Stripe', purpose: 'Payment processing (SaaS tier billing)', location: 'USA', scope: 'Billing contact and payment data — no Customer Data' },
]

const selfHostedNote = 'On Private Cloud, Sovereign Cloud, and On-premises tiers, Customer Data never leaves your infrastructure. Anvax has no access to Customer Data on these tiers, so the sub-processor list for those deployments consists only of the infrastructure providers you have chosen — your own cloud account or data centre. Those relationships are yours, not ours.'

export default function SubprocessorsPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <p className={styles.heroEyebrow}>Legal</p>
          <h1 className={styles.heroH1}>Sub-processors</h1>
          <div className={styles.heroMeta}>
            <span>Last updated: 1 September 2026</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <aside className={styles.toc}>
            <p className={styles.tocTitle}>On this page</p>
            <ul className={styles.tocList}>
              {[
                { id: 'self-hosted', label: 'Self-hosted tiers' },
                { id: 'website', label: 'Website sub-processors' },
                { id: 'platform', label: 'Platform sub-processors' },
                { id: 'updates', label: 'Updates' },
                { id: 'contact', label: 'Contact' },
              ].map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={styles.tocLink}>{item.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <article className={styles.body}>

            <div id="self-hosted" className={styles.section}>
              <h2 className={styles.sectionH2}>Self-hosted tiers: the list is short by design</h2>
              <p className={styles.p}>{selfHostedNote}</p>
              <p className={styles.p}>The sub-processors below relate to Anvax&rsquo;s own website and operations, not to your deployment. If you need a DPA for your deployment, the counterparty is your cloud provider (AWS, Azure, GCP) or your own data centre, not Anvax.</p>
            </div>

            <div id="website" className={styles.section}>
              <h2 className={styles.sectionH2}>Website sub-processors</h2>
              <p className={styles.p}>These vendors process data submitted through anvax.in — visitor analytics, contact form submissions, and related website operations.</p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Sub-processor</th>
                      <th>Purpose</th>
                      <th>Location</th>
                      <th>Data scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    {websiteProcessors.map(p => (
                      <tr key={p.name}>
                        <td>{p.name}</td>
                        <td>{p.purpose}</td>
                        <td><span className={styles.pill}>{p.location}</span></td>
                        <td>{p.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="platform" className={styles.section}>
              <h2 className={styles.sectionH2}>Platform sub-processors (SaaS tier only)</h2>
              <p className={styles.p}>These vendors are used for Anvax-operated platform services. They do not have access to Customer Data (documents, records, embeddings). They handle billing and account management only.</p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Sub-processor</th>
                      <th>Purpose</th>
                      <th>Location</th>
                      <th>Data scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platformProcessors.map(p => (
                      <tr key={p.name}>
                        <td>{p.name}</td>
                        <td>{p.purpose}</td>
                        <td><span className={styles.pill}>{p.location}</span></td>
                        <td>{p.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="updates" className={styles.section}>
              <h2 className={styles.sectionH2}>Updates to this list</h2>
              <p className={styles.p}>We will update this page at least 30 days before adding a new sub-processor that handles personal data. Enterprise customers with active DPAs will be notified by email. If a new sub-processor represents an objectionable change, contact us within 14 days to raise a concern before the change takes effect.</p>
              <p className={styles.p}>Removals and replacements that do not increase data exposure will be reflected here without prior notice.</p>
            </div>

            <div id="contact" className={styles.section}>
              <h2 className={styles.sectionH2}>Contact</h2>
              <p className={styles.p}>To request a DPA or raise questions about this list:</p>
              <div className={styles.contactBlock}>
                <p><strong>Anvax Technologies Private Limited</strong></p>
                <p>Email: <a href="mailto:privacy@anvax.in">privacy@anvax.in</a></p>
                <p>Or use the <Link href="/contact">contact form</Link> and select &ldquo;Legal / DPA&rdquo;.</p>
              </div>
            </div>

          </article>
        </div>
      </div>
    </>
  )
}
