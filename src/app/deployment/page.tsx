import type { Metadata } from 'next'
import SectionHead from '@/components/ui/SectionHead'
import Button from '@/components/ui/Button'
import styles from '@/pages/Deployment.module.css'

const tiers = [
  {
    icon: '☁️',
    name: 'SaaS',
    tagLine: 'Start in hours',
    desc: 'Fully managed. Anvax hosts, monitors, and maintains the infrastructure. Shared compute, dedicated data plane. Fastest path to production.',
    features: [
      'Shared compute, isolated data',
      'Anvax-managed updates',
      'Standard SLA (99.9%)',
      'Hosted in India',
      'All India-stack connectors',
    ],
    featured: false,
  },
  {
    icon: '🏛️',
    name: 'Sovereign',
    tagLine: 'Your VPC, our product',
    desc: 'Deployed into your AWS or Azure VPC. You own the infrastructure. Anvax manages the application layer. Preferred by tier-1 NBFCs and listed entities.',
    features: [
      'Customer VPC in India region',
      'No Anvax access to customer data',
      'Custom SLA negotiated',
      'SSO, SCIM, RBAC',
      'Full compliance documentation',
    ],
    featured: true,
  },
  {
    icon: '🔒',
    name: 'On-prem',
    tagLine: 'Air-gapped option',
    desc: 'Deployed on your own hardware. No egress to Anvax infrastructure. Full air-gap option available for institutions with strict data sovereignty requirements.',
    features: [
      'Customer hardware',
      'Air-gapped deployment available',
      'Offline model serving',
      'Annual update cadence',
      'Dedicated support engineer',
    ],
    featured: false,
  },
]

const productNodes = [
  { name: 'Search', sub: 'Hybrid retrieval' },
  { name: 'Chat', sub: 'Multi-turn RAG' },
  { name: 'Workflows', sub: 'Node graph builder' },
  { name: 'Agents', sub: 'Persistent monitors' },
  { name: 'Connectors', sub: 'India stack' },
  { name: 'Audit trail', sub: 'Immutable log' },
  { name: 'RLS engine', sub: 'Per-tenant' },
  { name: 'PII guard', sub: 'Auto-redact' },
]

const tierCells = [
  { name: 'SaaS', note: 'Shared compute' },
  { name: 'Sovereign', note: 'Customer VPC' },
  { name: 'On-prem', note: 'Customer HW' },
]

export const metadata: Metadata = {
  title: 'Deployment — Anvax',
  description: 'SaaS to air-gapped. Same product, three tiers. All data stays in India.',
  openGraph: { title: 'Deployment — Anvax', description: 'SaaS to air-gapped. Same product, three tiers.', url: 'https://anvax.in/deployment' },
  twitter: { card: 'summary_large_image', title: 'Deployment — Anvax', description: 'SaaS to air-gapped. Same product, three tiers.' },
  alternates: { canonical: 'https://anvax.in/deployment' },
}

export default function Deployment() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Deployment</p>
            <h1 className={styles.heroH1}>
              Same product.<br />Three tiers.
            </h1>
            <p className={styles.heroLede}>
              From shared SaaS to air-gapped on-prem — the same product, the same feature set,
              and the same India-stack connectors. Your tier choice is a data control decision, not a feature trade-off.
            </p>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Tiers"
            title="Four ways to deploy. One codebase."
            lede="Pick the tier that matches your data control requirements. You can migrate up without re-implementation."
          />
          <div className={styles.tierGrid}>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`${styles.tierCard} ${tier.featured ? styles.featured : ''}`}
              >
                <div className={styles.tierIcon}>{tier.icon}</div>
                <div className={styles.tierTagLine}>{tier.tagLine}</div>
                <div className={styles.tierName}>{tier.name}</div>
                <p className={styles.tierDesc}>{tier.desc}</p>
                <ul className={styles.tierFeatureList}>
                  {tier.features.map((f) => (
                    <li key={f} className={styles.tierFeature}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Same-product diagram */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="Same product"
            title="Every tier runs the full product stack."
            lede="Infrastructure tier determines where the product runs — not which features you get."
          />
          <div className={styles.diagram}>
            <div className={styles.diagramTop}>
              <div className={styles.diagramTopLabel}>Product layer — identical across all tiers</div>
              <div className={styles.diagramNodes}>
                {productNodes.map((node) => (
                  <div key={node.name} className={styles.diagramNode}>
                    <span className={styles.diagramNodeName}>{node.name}</span>
                    <span className={styles.diagramNodeSub}>{node.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.diagramBottom}>
              <div className={styles.diagramBottomLabel}>Infrastructure tier — your choice</div>
              <div className={styles.diagramTiers}>
                {tierCells.map((t) => (
                  <div key={t.name} className={styles.diagramTierCell}>
                    <div className={styles.diagramTierName}>{t.name}</div>
                    <div className={styles.diagramTierNote}>{t.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residency commitment */}
      <section className={styles.residency}>
        <div className="container">
          <p className={styles.residencyEyebrow}>Data residency commitment</p>
          <h2 className={styles.residencyH2}>
            All customer data, embeddings, and inference traces stay in India.
            Regardless of tier.
          </h2>
          <p className={styles.residencyNote}>
            All data hosted in India · No cross-border data transfer · DPDP Act 2023 compliant
          </p>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12 }}>
            <Button variant="accent" href="/trust" arrow>Read the architecture</Button>
            <Button variant="secondaryDark" href="/contact">Talk to sales</Button>
          </div>
        </div>
      </section>
    </>
  )
}
