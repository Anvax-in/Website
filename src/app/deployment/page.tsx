import type { Metadata } from 'next'
import styles from './Deployment.module.css'

export const metadata: Metadata = {
  title: 'Deployment | Anvax',
  description: 'Private cloud to air-gapped on-prem. Same product, three tiers. Capability does not degrade as you move down the tiers.',
  openGraph: {
    title: 'Deployment | Anvax',
    description: 'Private cloud to air-gapped on-prem. Same product, three tiers. In-region by default, in-country on request.',
    url: 'https://www.anvax.in/deployment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deployment | Anvax',
    description: 'Private cloud to air-gapped on-prem. Same product, three tiers.',
  },
  alternates: { canonical: 'https://www.anvax.in/deployment' },
}

const tiers = [
  {
    kicker: 'Fastest to deploy',
    title: 'Shared cloud',
    body: 'Fully managed by Anvax in your preferred region. Get the complete Anvax platform without managing infrastructure, while your data and workloads remain isolated within your environment. Ideal for teams that want enterprise security with the simplicity of SaaS.',
    features: [
      'Fully managed by Anvax',
      'Any preferred region',
      'Data isolated in your environment',
      'Full enterprise connector stack',
      '99.9% SLA',
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      </svg>
    ),
  },
  {
    kicker: 'Your cloud. Your control.',
    title: 'Sovereign / private cloud',
    body: 'Deploy Anvax directly into your AWS, Azure, or GCP environment, or through an approved sovereign cloud provider. You retain control of the infrastructure, data plane, network policies, and region while Anvax delivers the same product experience. Built for organisations with strict data-residency and regulatory requirements.',
    features: [
      'Your AWS, Azure, or GCP account',
      'Approved sovereign cloud providers',
      'Full infrastructure and data plane control',
      'Any region, data-residency compliant',
      'Custom SLA negotiated',
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" />
      </svg>
    ),
  },
  {
    kicker: 'Runs entirely inside your facility',
    title: 'On-prem / air-gapped',
    body: 'Deploy the complete Anvax platform on infrastructure you control, with no dependency on Anvax-hosted services. Supports isolated networks and fully air-gapped environments where data cannot leave the facility. Designed for government, defence, critical infrastructure, and highly regulated environments.',
    features: [
      'Customer data centre',
      'No outbound network required',
      'Offline model serving',
      'Annual update cadence',
      'Dedicated support engineer',
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

const productNodes = [
  { name: 'Search', sub: 'Hybrid retrieval' },
  { name: 'Chat', sub: 'Multi-turn RAG' },
  { name: 'Agents', sub: 'Policy-checked actions' },
  { name: 'Connectors', sub: '180+ enterprise sources' },
  { name: 'Audit trail', sub: 'Immutable log' },
  { name: 'RLS engine', sub: 'Per-tenant' },
  { name: 'PII guard', sub: 'Auto-redact' },
  { name: 'Governance', sub: 'Prompt policy' },
]

const tierCells = [
  { name: 'Shared cloud', note: 'Fully managed by Anvax' },
  { name: 'Sovereign / private cloud', note: 'Your account or in-country partner' },
  { name: 'On-prem / air-gapped', note: 'Customer data centre' },
]

const jurisdictions = [
  { region: 'United States', note: 'NIST AI RMF · SOC 2 · HIPAA-ready' },
  { region: 'United Kingdom / EU', note: 'GDPR · EU AI Act · DORA' },
  { region: 'Gulf (UAE / KSA)', note: 'PDPL · SAMA · CBUAE' },
  { region: 'Singapore / APAC', note: 'MAS FEAT · PDPA' },
  { region: 'India', note: 'DPDP · RBI FREE-AI · CERT-In' },
  { region: 'Global', note: 'ISO 27001 · SOC 2 Type II (in progress)' },
]

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--sage-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function DeploymentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroLattice} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>Deployment</div>
          <h1 className={styles.h1}>One platform. Your infrastructure.</h1>
          <p className={styles.heroLede}>
            Same workspace, same connectors, same governance layer. In your cloud account,
            with a sovereign partner, or inside your own walls. Your tier is a data-control
            decision, not a feature trade-off.
          </p>
          <div className={styles.heroActions}>
            <a href="/contact" className={styles.btnPrimary}>Book a demo →</a>
            <a href="/trust" className={styles.btnGhost}>Read the architecture</a>
          </div>
        </div>
      </section>

      {/* ── Tier cards ── */}
      <section className={styles.tiers}>
        <div className={styles.tiersInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Tiers</div>
            <h2 className={styles.h2}>Three tiers. One codebase.</h2>
            <p className={styles.sectionLede}>
              Pick the tier that matches your data control requirements. You can migrate
              up without re-implementation. The product is identical.
            </p>
          </div>

          <div className={styles.tierGrid}>
            {tiers.map(({ kicker, title, body, features, icon }) => (
              <div key={title} className={styles.tierCard}>
                <div className={styles.tierIcon}>{icon}</div>
                <div className={styles.tierKicker}>{kicker}</div>
                <h3 className={styles.h3}>{title}</h3>
                <p className={styles.tierBody}>{body}</p>
                <ul className={styles.tierFeatures}>
                  {features.map((f) => (
                    <li key={f} className={styles.tierFeature}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Same-product diagram ── */}
      <section className={styles.diagram}>
        <div className={styles.diagramInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Same product</div>
            <h2 className={styles.h2}>Every tier runs the full product stack.</h2>
            <p className={styles.sectionLede}>
              Your infrastructure choice determines where Anvax runs. It does not
              determine what you get.
            </p>
          </div>

          <div className={styles.diagramCard}>
            <div className={styles.diagramTop}>
              <div className={styles.diagramTopLabel}>
                Product layer, identical across all tiers
              </div>
              <div className={styles.diagramNodes}>
                {productNodes.map(({ name, sub }) => (
                  <div key={name} className={styles.diagramNode}>
                    <span className={styles.diagramNodeName}>{name}</span>
                    <span className={styles.diagramNodeSub}>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.diagramBottom}>
              <div className={styles.diagramBottomLabel}>
                Infrastructure tier, your choice
              </div>
              <div className={styles.diagramTiers}>
                {tierCells.map(({ name, note }) => (
                  <div key={name} className={styles.diagramTierCell}>
                    <div className={styles.diagramTierName}>{name}</div>
                    <div className={styles.diagramTierNote}>{note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Data residency ── */}
      <section className={styles.residency}>
        <div className={styles.residencyInner}>
          <div>
            <div className={styles.sectionEyebrow}>Data residency</div>
            <h2 className={styles.residencyH2}>
              All data, embeddings, and inference stay in your region.
            </h2>
            <p className={styles.residencyBody}>
              In-region by default on every tier. In-country placement available through
              sovereign-cloud partners. On the on-prem tier, nothing leaves your facility.
            </p>
            <div className={styles.residencyTags}>
              {['In-region by default', 'In-country on request', 'GDPR', 'DPDP', 'PDPL', 'NIST AI RMF'].map((t) => (
                <span key={t} className={styles.residencyTag}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.residencyJurisdictions}>
            {jurisdictions.map(({ region, note }) => (
              <div key={region} className={styles.jurisdictionCell}>
                <div className={styles.jurisdictionRegion}>{region}</div>
                <div className={styles.jurisdictionNote}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaH2}>Ready to scope your deployment?</h2>
          <p className={styles.ctaBody}>
            We will walk your infrastructure and security teams through the tier that fits,
            run a proof-of-concept in your environment, and give you everything you need
            for your security review.
          </p>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaBookDemo}>Book a demo →</a>
            <a href="/trust" className={styles.ctaSecondary}>Read the security page</a>
          </div>
        </div>
      </section>
    </>
  )
}
