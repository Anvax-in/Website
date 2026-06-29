import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import SectionHead from '@/components/ui/SectionHead'
import Eyebrow from '@/components/ui/Eyebrow'
import styles from '@/pages/Pricing.module.css'

export const metadata: Metadata = {
  title: 'Pricing — Anvax',
  description: 'Starter and Growth shown in full. Business and Sovereign tiers are custom — contact sales.',
  robots: { index: false, follow: false },
}

const plans = [
  {
    tier: 'Tier 1 · SaaS', name: 'Starter', featured: false,
    who: 'Growth-stage fintechs and small teams getting their AI use governed.',
    price: '₹35,000', unit: '/ mo', note: '₹3.5L / yr · billed annually',
    feats: ['25 users', '5M input + 500K output tokens / mo', '5 connectors', 'Shared SaaS · AWS Mumbai', 'Basic workflows', 'Audit logs', 'DPDP self-attestation'],
    cta: { label: 'Start with Starter', href: '/contact', variant: 'secondary' as const },
  },
  {
    tier: 'Tier 1 · SaaS', name: 'Growth', featured: true,
    who: 'Scaling NBFCs and fintechs that need SSO, advanced RBAC and every connector.',
    price: '₹1,00,000', unit: '/ mo', note: '₹10L / yr · billed annually',
    feats: ['100 users', '25M input + 2.5M output tokens / mo', 'All connectors', 'Shared SaaS · AWS Mumbai', 'SSO / SCIM', 'Advanced RBAC', 'Advanced workflows + agents', 'RBI FREE-AI control suite'],
    cta: { label: 'Choose Growth', href: '/contact', variant: 'primary' as const },
  },
  {
    tier: 'Tier 2 · Sovereign', name: 'Business', featured: false,
    who: 'Regulated NBFCs and BFSI needing dedicated infrastructure and SLAs.',
    contact: 'Contact sales', note: 'Custom · scoped to your workloads',
    feats: ['Everything in Growth', 'Dedicated VPC', 'Indian sovereign GPU cloud', 'SLA with support tiers', 'MFA enforced', 'Custom workflow templates', 'Vertical intelligence pack'],
    cta: { label: 'Contact sales', href: '/contact', variant: 'secondary' as const },
  },
  {
    tier: 'Tier 3 · On-prem', name: 'Sovereign', featured: false,
    who: 'Large banks, PSUs and defence-adjacent — the deployment you can unplug.',
    contact: 'Contact sales', note: 'Custom · on-prem / air-gapped',
    feats: ['Everything in Business', 'Customer VPC / on-prem', 'Air-gapped option', 'Full compliance scope', 'Signed Helm bundles + SBOM', 'Dedicated support engineer', 'IndiaAI compute overlay'],
    cta: { label: 'Contact sales', href: '/contact', variant: 'secondary' as const },
  },
]

const faqs = [
  { q: 'How is usage metered?', a: "By tokens — input and output, metered per tenant. Each plan includes a monthly allotment; overage is billed at the plan's per-token rate, visible in your admin console in real time. No surprise invoices." },
  { q: "What's the difference between Business and Sovereign?", a: 'Business runs on a dedicated VPC in an Indian sovereign GPU cloud (Tier 2). Sovereign runs in your own data centre, optionally air-gapped (Tier 3). Both are quoted directly because the number depends on workload, topology and compliance scope.' },
  { q: 'Does my data stay in India on every plan?', a: 'Yes. All customer data, embeddings and inference traces stay in India regardless of tier — Mumbai (ap-south-1) for SaaS, Indian sovereign cloud for Business, your DC for Sovereign. This is not a configuration flag; it\'s the substrate.' },
  { q: 'Can I move between tiers?', a: 'Up at any time, prorated. Moving from SaaS to a dedicated or on-prem tier is a migration we run with you — your corpus, embeddings and audit chain move intact, in India, the whole way.' },
  { q: 'Is there a free trial?', a: "We run a scoped pilot instead — your corpus, an isolated demo tenant, 45 minutes with your CISO and CIO. The tenant is deleted afterwards and you keep everything. It's more useful than a self-serve trial for a regulated buyer." },
]

export default function Pricing() {
  return (
    <>
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroRow}>
            <div>
              <Eyebrow>Pricing · Plain rupees, plain terms</Eyebrow>
              <h1 className={styles.heroH1}>Self-serve to sovereign. <span className={styles.heroEm}>No</span> &ldquo;starting from&rdquo;.</h1>
              <p className={styles.heroLede}>Starter and Growth are listed in full. Business and Sovereign are custom — dedicated infrastructure, deployment topology and compliance scope decide the number, so we quote them directly.</p>
              <div className={styles.heroCtaRow}>
                <Button variant="accent" href="/contact" arrow>Request a demo</Button>
                <Button variant="secondary" href="/deployment">Compare deployment tiers</Button>
              </div>
            </div>
            <aside className={styles.heroMeta}>
              {[
                { k: 'Billing', v: 'Monthly or annual · annual paid up front' },
                { k: 'Residency', v: 'All tiers · data stays in India' },
                { k: 'Currency', v: '₹ INR · GST extra as applicable' },
              ].map(({ k, v }) => (
                <div key={k}>
                  <div className={styles.heroMetaKey}>{k}</div>
                  <div className={styles.heroMetaVal}>{v}</div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.planGrid}>
            {plans.map((p) => (
              <div key={p.name} className={`${styles.plan} ${p.featured ? styles.planFeatured : ''}`}>
                <div className={`${styles.planTier} ${p.featured ? styles.planTierFeatured : ''}`}>{p.tier}</div>
                <div className={styles.planName}>{p.name}</div>
                <p className={`${styles.planWho} ${p.featured ? styles.planWhoFeatured : ''}`}>{p.who}</p>
                <div className={`${styles.planPriceRow} ${p.featured ? styles.planPriceRowFeatured : ''}`}>
                  {p.price
                    ? <><span className={styles.planPrice}>{p.price}</span><span className={styles.planPriceUnit}>{p.unit}</span></>
                    : <span className={`${styles.planContact} ${p.featured ? styles.planContactFeatured : ''}`}>{p.contact}</span>
                  }
                </div>
                <div className={styles.planNote}>{p.note}</div>
                <ul className={styles.planFeats}>
                  {p.feats.map((f) => <li key={f} className={`${styles.planFeat} ${p.featured ? styles.planFeatFeatured : ''}`}>{f}</li>)}
                </ul>
                <div className={styles.planCta}>
                  <Button variant={p.cta.variant} href={p.cta.href}>{p.cta.label}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Compare" title="What changes between tiers." lede="Governance, audit chain and India-residency are identical on every plan. What changes is scale, deployment topology and the depth of compliance scope." />
          <div className={styles.compareWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr><th style={{ width: '30%' }}>Capability</th><th>Starter</th><th>Growth</th><th>Business</th><th>Sovereign</th></tr>
              </thead>
              <tbody>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Scale</td></tr>
                <tr><td>Users</td><td className={styles.vmono}>25</td><td className={styles.vmono}>100</td><td className={styles.vmono}>Custom</td><td className={styles.vmono}>Custom</td></tr>
                <tr><td>Tokens / mo (in + out)</td><td className={styles.vmono}>5M + 500K</td><td className={styles.vmono}>25M + 2.5M</td><td className={styles.vmono}>Custom</td><td className={styles.vmono}>Custom</td></tr>
                <tr><td>Connectors</td><td className={styles.vmono}>5</td><td className={styles.vmono}>All</td><td className={styles.vmono}>All</td><td className={styles.vmono}>All</td></tr>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Deployment</td></tr>
                <tr><td>Hosting</td><td className={styles.vmono}>Shared SaaS</td><td className={styles.vmono}>Shared SaaS</td><td className={styles.vmono}>Dedicated VPC</td><td className={styles.vmono}>On-prem / air-gap</td></tr>
                <tr><td>GPU substrate</td><td className={styles.vmono}>AWS Mumbai</td><td className={styles.vmono}>AWS Mumbai</td><td className={styles.vmono}>Sovereign cloud</td><td className={styles.vmono}>Customer DC</td></tr>
                <tr><td>IndiaAI overlay</td><td className={styles.no}>—</td><td className={styles.no}>—</td><td className={styles.yes}>Optional</td><td className={styles.yes}>Optional</td></tr>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Identity &amp; access</td></tr>
                <tr><td>SSO / SCIM</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>Advanced RBAC</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>MFA enforced</td><td className={styles.no}>—</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Governance &amp; compliance</td></tr>
                <tr><td>Audit logs · SHA-256 chained</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>DPDP self-attestation</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>RBI FREE-AI control suite</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>Full compliance scope</td><td className={styles.no}>—</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Workflows &amp; support</td></tr>
                <tr><td>Workflows</td><td className={styles.vmono}>Basic</td><td className={styles.vmono}>Advanced</td><td className={styles.vmono}>Custom</td><td className={styles.vmono}>Custom</td></tr>
                <tr><td>Agents</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>Support</td><td className={styles.vmono}>Email</td><td className={styles.vmono}>Priority</td><td className={styles.vmono}>SLA</td><td className={styles.vmono}>Dedicated</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Questions" title="The things procurement asks first." />
          <div className={styles.faq}>
            {faqs.map((f, i) => (
              <details key={f.q} className={styles.faqItem} open={i === 0}>
                <summary className={styles.faqSummary}>
                  {f.q} <span className={styles.faqChev}>+</span>
                </summary>
                <p className={styles.faqBody}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className={styles.ctaBlock}>
            <div>
              <p className={styles.ctaEyebrow}>Get a quote</p>
              <h2 className={styles.ctaH2}>Business or Sovereign? We&rsquo;ll scope it in one call.</h2>
              <p className={styles.ctaBody}>Tell us your user count, your deployment constraints and your compliance scope. We come back with a fixed quote — no &ldquo;contact us to contact us&rdquo; loop.</p>
            </div>
            <div className={styles.ctaActions}>
              <Button variant="accent" href="/contact" arrow>Talk to sales</Button>
              <Button variant="secondaryDark" href="/trust#downloads">Get the regulator pack</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
