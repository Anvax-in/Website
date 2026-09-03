import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/pages/Legal.module.css'

export const metadata: Metadata = {
  title: 'Terms of Service | Anvax',
  description: 'Anvax Terms of Service — the agreement that governs your use of the Anvax platform.',
  alternates: { canonical: 'https://www.anvax.in/terms' },
}

const toc = [
  { id: 'agreement', label: 'Agreement' },
  { id: 'services', label: 'Services' },
  { id: 'access', label: 'Access & accounts' },
  { id: 'data', label: 'Your data' },
  { id: 'acceptable-use', label: 'Acceptable use' },
  { id: 'ip', label: 'Intellectual property' },
  { id: 'liability', label: 'Liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing law' },
  { id: 'contact', label: 'Contact' },
]

export default function TermsPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <p className={styles.heroEyebrow}>Legal</p>
          <h1 className={styles.heroH1}>Terms of Service</h1>
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

            <div id="agreement" className={styles.section}>
              <h2 className={styles.sectionH2}>Agreement</h2>
              <p className={styles.p}>These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement between you and Anvax Technologies Private Limited (&ldquo;Anvax&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) governing your access to and use of the Anvax platform, website, APIs, and related services (collectively, the &ldquo;Services&rdquo;).</p>
              <p className={styles.p}>By accessing the Services, you confirm you have read, understood, and agreed to these Terms. If you are using the Services on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.</p>
              <p className={styles.p}>Enterprise customers operating under a separately executed Master Services Agreement or Order Form: those documents govern where they conflict with these Terms.</p>
            </div>

            <div id="services" className={styles.section}>
              <h2 className={styles.sectionH2}>Services</h2>
              <p className={styles.p}>Anvax provides a self-hosted, governed AI workspace that customers deploy in their own infrastructure — private cloud, sovereign cloud partner, or on-premises. The platform includes document search, AI-assisted chat, workflow automation, agents, and a governance layer including audit logging, PII redaction, and access control.</p>
              <h3 className={styles.sectionH3}>Deployment model</h3>
              <p className={styles.p}>For self-hosted deployments (Private Cloud, Sovereign Cloud, On-premises tiers), the platform runs in your infrastructure. Anvax does not have standing access to your environment. Customer data does not transit Anvax systems except where you have explicitly granted access for a support session, which is logged and time-bounded.</p>
              <h3 className={styles.sectionH3}>Service availability</h3>
              <p className={styles.p}>Availability SLAs are defined in your Order Form. For self-hosted tiers, availability is governed by your own infrastructure. Anvax provides software updates, security patches, and support within the terms of your plan.</p>
            </div>

            <div id="access" className={styles.section}>
              <h2 className={styles.sectionH2}>Access and accounts</h2>
              <p className={styles.p}>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorised access.</p>
              <p className={styles.p}>You may not share credentials, create accounts on behalf of others without authorisation, use automated tools to create accounts, or use the Services to monitor or benchmark competing products without our prior written consent.</p>
            </div>

            <div id="data" className={styles.section}>
              <h2 className={styles.sectionH2}>Your data</h2>
              <p className={styles.p}>You retain all ownership and rights in the data you bring into the platform (&ldquo;Customer Data&rdquo;). Anvax does not claim any rights over Customer Data.</p>
              <p className={styles.p}>On self-hosted tiers, Customer Data never leaves your infrastructure. Anvax personnel do not have access to Customer Data unless you explicitly grant a time-bounded support session.</p>
              <p className={styles.p}>Anvax will not use Customer Data to train any model. There is no shared model across customers. This is an architectural commitment, not a policy one.</p>
              <p className={styles.p}>Data Processing: where Anvax acts as a data processor under applicable law (GDPR, DPDP Act, PDPL, or similar), the parties will execute a Data Processing Agreement (&ldquo;DPA&rdquo;). The DPA is available on request via <Link href="/contact" className="link">the contact form</Link> or from your account manager.</p>
            </div>

            <div id="acceptable-use" className={styles.section}>
              <h2 className={styles.sectionH2}>Acceptable use</h2>
              <p className={styles.p}>You agree not to use the Services to:</p>
              <ul className={styles.ul}>
                <li>Violate any applicable law or regulation, including data protection and financial services law</li>
                <li>Process data you do not have the right to process</li>
                <li>Attempt to circumvent or test security controls without our written authorisation</li>
                <li>Reverse-engineer, decompile, or extract the source code of the platform</li>
                <li>Resell or sublicense access to the platform without an explicit reseller agreement</li>
                <li>Use the platform to generate, distribute, or facilitate unlawful content</li>
              </ul>
              <p className={styles.p}>We reserve the right to suspend access where we have reasonable belief of a material breach, with notice where practicable.</p>
            </div>

            <div id="ip" className={styles.section}>
              <h2 className={styles.sectionH2}>Intellectual property</h2>
              <p className={styles.p}>Anvax retains all rights in the platform software, models, documentation, and any improvements or derivative works. Nothing in these Terms grants you rights in Anvax intellectual property beyond the limited licence to use the Services as described here.</p>
              <p className={styles.p}>You grant Anvax a limited, non-exclusive licence to process Customer Data solely to provide the Services.</p>
              <p className={styles.p}>Feedback you voluntarily provide may be used to improve the platform without obligation to you.</p>
            </div>

            <div id="liability" className={styles.section}>
              <h2 className={styles.sectionH2}>Limitation of liability</h2>
              <p className={styles.p}>To the maximum extent permitted by law, Anvax&rsquo;s aggregate liability arising out of or related to these Terms will not exceed the amounts paid by you in the twelve months preceding the claim.</p>
              <p className={styles.p}>Anvax will not be liable for indirect, incidental, consequential, or punitive damages, loss of profits, loss of data, or loss of goodwill, whether arising in contract, tort, or otherwise, even if advised of the possibility of such damages.</p>
              <p className={styles.p}>Nothing in these Terms limits liability that cannot be limited by law, including for fraud, gross negligence, or wilful misconduct.</p>
            </div>

            <div id="termination" className={styles.section}>
              <h2 className={styles.sectionH2}>Termination</h2>
              <p className={styles.p}>Either party may terminate these Terms with 30 days written notice. Your Order Form may specify a different notice period or minimum commitment.</p>
              <p className={styles.p}>On termination, your licence to use the Services ends. For self-hosted tiers, you retain your deployment and data; Anvax will provide a 30-day wind-down window during which licence enforcement is suspended to allow an orderly transition.</p>
              <p className={styles.p}>Anvax may terminate immediately for material breach, non-payment, or where continued operation poses a security risk.</p>
            </div>

            <div id="governing-law" className={styles.section}>
              <h2 className={styles.sectionH2}>Governing law</h2>
              <p className={styles.p}>These Terms are governed by the laws of India. Disputes will be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India, unless your Order Form specifies otherwise for enterprise agreements with non-Indian counterparties.</p>
              <p className={styles.p}>We will attempt to resolve disputes through good-faith negotiation before initiating formal proceedings.</p>
            </div>

            <div id="contact" className={styles.section}>
              <h2 className={styles.sectionH2}>Contact</h2>
              <p className={styles.p}>For questions about these Terms, to request a DPA, or to exercise data subject rights:</p>
              <div className={styles.contactBlock}>
                <p><strong>Anvax Technologies Private Limited</strong></p>
                <p>Bengaluru, Karnataka, India</p>
                <p>Email: <a href="mailto:legal@anvax.in">legal@anvax.in</a></p>
                <p>Or use the <Link href="/contact">contact form</Link>.</p>
              </div>
            </div>

          </article>
        </div>
      </div>
    </>
  )
}
