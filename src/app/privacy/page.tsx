import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/pages/Legal.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy | Anvax',
  description: 'How Anvax collects, uses, and protects your data, and what rights you have over it.',
  alternates: { canonical: 'https://www.anvax.in/privacy' },
}

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'what-we-collect', label: 'What we collect' },
  { id: 'how-we-use', label: 'How we use it' },
  { id: 'customer-data', label: 'Customer data' },
  { id: 'sharing', label: 'Sharing & sub-processors' },
  { id: 'residency', label: 'Data residency' },
  { id: 'retention', label: 'Retention' },
  { id: 'rights', label: 'Your rights' },
  { id: 'security', label: 'Security' },
  { id: 'contact', label: 'Contact & DPA' },
]

export default function PrivacyPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <p className={styles.heroEyebrow}>Legal</p>
          <h1 className={styles.heroH1}>Privacy Policy</h1>
          <div className={styles.heroMeta}>
            <span>Effective: 1 September 2026</span>
            <span>Last updated: 1 September 2026</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <aside className={styles.toc}>
            <p className={styles.tocTitle}>On this page</p>
            <ul className={styles.tocList}>
              {toc.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={styles.tocLink}>{item.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <article className={styles.body}>

            <div id="overview" className={styles.section}>
              <h2 className={styles.sectionH2}>Overview</h2>
              <p className={styles.p}>This Privacy Policy describes how Anvax Technologies Private Limited (&ldquo;Anvax&rdquo;) handles personal data when you visit our website, use our platform, or interact with us. It also explains the distinctions between data we collect as a data controller (visitor and contact data) and data our customers bring to the platform (where we act as a data processor).</p>
              <p className={styles.p}>Anvax is committed to data minimisation. We collect what we need to operate and improve the service; we do not sell personal data to third parties.</p>
            </div>

            <div id="what-we-collect" className={styles.section}>
              <h2 className={styles.sectionH2}>What we collect</h2>
              <h3 className={styles.sectionH3}>Website visitors</h3>
              <ul className={styles.ul}>
                <li>Page views and referrer (anonymised, used only for aggregate analytics)</li>
                <li>IP address (truncated for analytics; retained in server logs for 30 days for security purposes)</li>
                <li>Browser type and device class (aggregated, no fingerprinting)</li>
              </ul>
              <h3 className={styles.sectionH3}>Contact and sales enquiries</h3>
              <ul className={styles.ul}>
                <li>Name and work email you provide via the contact form</li>
                <li>Company name and role if provided</li>
                <li>Contents of your message</li>
                <li>Follow-up correspondence</li>
              </ul>
              <h3 className={styles.sectionH3}>Platform accounts</h3>
              <ul className={styles.ul}>
                <li>Email address and display name</li>
                <li>Organisation and role within the platform</li>
                <li>Authentication events (login, MFA, session creation/destruction)</li>
                <li>Usage metadata (feature use, connector configuration) for billing and support, not document content</li>
              </ul>
            </div>

            <div id="how-we-use" className={styles.section}>
              <h2 className={styles.sectionH2}>How we use it</h2>
              <p className={styles.p}>We use the data we collect to:</p>
              <ul className={styles.ul}>
                <li>Respond to your enquiries and provide support</li>
                <li>Operate, maintain, and improve the platform</li>
                <li>Send security notifications, service updates, and product communications (you can opt out of marketing at any time)</li>
                <li>Comply with our legal obligations</li>
                <li>Detect and prevent fraud, abuse, and security incidents</li>
              </ul>
              <p className={styles.p}>We do not use personal data for automated decision-making that produces legal or similarly significant effects.</p>
            </div>

            <div id="customer-data" className={styles.section}>
              <h2 className={styles.sectionH2}>Customer data (platform)</h2>
              <p className={styles.p}>When you use the Anvax platform, you bring in your organisation&rsquo;s documents, records, and content (&ldquo;Customer Data&rdquo;). Anvax acts as a data processor for Customer Data; you remain the data controller.</p>
              <p className={styles.p}>For self-hosted tiers (Private Cloud, Sovereign Cloud, On-premises), Customer Data never transits Anvax systems. We have no standing access to it. Any support access is time-bounded, requires your explicit authorisation, and is logged in your audit trail.</p>
              <p className={styles.p}>We do not use Customer Data to train any model. There is no shared model across tenants. AI processing occurs within your own infrastructure using models you choose.</p>
            </div>

            <div id="sharing" className={styles.section}>
              <h2 className={styles.sectionH2}>Sharing and sub-processors</h2>
              <p className={styles.p}>We do not sell personal data. We share data only with:</p>
              <ul className={styles.ul}>
                <li><strong>Sub-processors</strong>: a small set of vendors who support our website and operations (listed on the <Link href="/subprocessors">sub-processors page</Link>). Each is bound by a data processing agreement.</li>
                <li><strong>Law enforcement or regulators</strong>: only where required by applicable law, and we will notify you to the extent legally permitted.</li>
                <li><strong>Business transfers</strong>: in the event of a merger or acquisition, under confidentiality obligations and with notice to affected parties.</li>
              </ul>
              <p className={styles.p}>For self-hosted tiers, the sub-processor list is minimal because Customer Data does not leave your infrastructure.</p>
            </div>

            <div id="residency" className={styles.section}>
              <h2 className={styles.sectionH2}>Data residency</h2>
              <p className={styles.p}>Customer Data is processed in the region you choose. We offer:</p>
              <ul className={styles.ul}>
                <li><strong>Private Cloud:</strong> your own AWS, Azure, or GCP account, any region you select</li>
                <li><strong>Sovereign Cloud:</strong> in-country partners for India, EU, Gulf (UAE/KSA), and Singapore</li>
                <li><strong>On-premises:</strong> your own data centre, no network egress required</li>
              </ul>
              <p className={styles.p}>Data residency is enforced at the infrastructure layer, not a configuration flag.</p>
              <p className={styles.p}>Website visitor data (analytics, contact form) is processed by sub-processors that may be located outside your jurisdiction. See the sub-processors page for details.</p>
            </div>

            <div id="retention" className={styles.section}>
              <h2 className={styles.sectionH2}>Retention</h2>
              <ul className={styles.ul}>
                <li>Contact and sales enquiry data: retained while the relationship is active, deleted on request, automatically reviewed after 3 years of inactivity.</li>
                <li>Platform account data: retained for the duration of the contract plus 90 days for offboarding, then deleted or returned.</li>
                <li>Anonymised analytics: retained indefinitely (cannot be linked to an individual).</li>
                <li>Security logs (website): 30 days.</li>
              </ul>
              <p className={styles.p}>Customer Data retention on self-hosted tiers is governed by your own policies; Anvax does not control it.</p>
            </div>

            <div id="rights" className={styles.section}>
              <h2 className={styles.sectionH2}>Your rights</h2>
              <p className={styles.p}>Depending on your jurisdiction, you may have the right to access, correct, delete, or port the personal data we hold about you, to object to or restrict certain processing, and to withdraw consent where processing is based on consent.</p>
              <p className={styles.p}>To exercise these rights, contact us at <a href="mailto:privacy@anvax.in" style={{ color: 'var(--blue)' }}>privacy@anvax.in</a> or via the <Link href="/contact">contact form</Link>. We will respond within 30 days (or the statutory period if shorter).</p>
              <p className={styles.p}>If you believe we have not addressed your concern, you have the right to lodge a complaint with your local data protection authority.</p>
            </div>

            <div id="security" className={styles.section}>
              <h2 className={styles.sectionH2}>Security</h2>
              <p className={styles.p}>We apply technical and organisational measures proportionate to the risk, including TLS 1.3 in transit, encryption at rest, access controls, audit logging, and regular security reviews. Full details are on the <Link href="/trust">Security &amp; Architecture</Link> page.</p>
              <p className={styles.p}>In the event of a personal data breach, we will notify affected parties and relevant authorities within the timeframes required by applicable law.</p>
            </div>

            <div id="contact" className={styles.section}>
              <h2 className={styles.sectionH2}>Contact and DPA</h2>
              <p className={styles.p}>For privacy enquiries, data subject rights requests, or to request a Data Processing Agreement:</p>
              <div className={styles.contactBlock}>
                <p><strong>Data Protection Contact</strong></p>
                <p>Anvax Technologies Private Limited</p>
                <p>Bengaluru, Karnataka, India</p>
                <p>Email: <a href="mailto:privacy@anvax.in">privacy@anvax.in</a></p>
                <p>Or use the <Link href="/contact">contact form</Link>.</p>
              </div>
            </div>

          </article>
        </div>
      </div>
    </>
  )
}
