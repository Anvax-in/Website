import type { Metadata } from 'next'
import SectionHead from '@/components/ui/SectionHead'
import Button from '@/components/ui/Button'
import styles from '@/pages/Deployment.module.css'

const tiers = [
  {
    icon: '☁️',
    name: 'Private cloud',
    tagLine: 'Any region, your account',
    desc: 'Dedicated deployment in your own AWS, Azure, or GCP account. You own the infrastructure; Anvax manages the application layer. Available in any region — US, EU, Gulf, Asia.',
    features: [
      'Your cloud account, any hyperscaler',
      'Any region — no data-residency constraint',
      'Anvax-managed application layer',
      'Standard SLA (99.9%)',
      'Full enterprise connector stack',
    ],
    featured: false,
  },
  {
    icon: '🏛️',
    name: 'Sovereign cloud',
    tagLine: 'In-country by design',
    desc: 'Deployed on a regional sovereign or in-country cloud partner. Data stays within the jurisdiction by construction. Preferred by regulated financial services, public sector, and enterprises with explicit data-residency mandates.',
    features: [
      'In-country cloud partners',
      'Gulf, EU, India, SEA options',
      'No cross-border data transfer',
      'Custom SLA negotiated',
      'Full compliance documentation',
    ],
    featured: true,
  },
  {
    icon: '🔒',
    name: 'On-prem / air-gapped',
    tagLine: 'Inside your facility',
    desc: 'Deployed on your own hardware. No egress to Anvax or any cloud infrastructure. Full air-gap available for institutions with strict data sovereignty requirements — banks, defence-adjacent, critical infrastructure, government.',
    features: [
      'Customer data centre',
      'No outbound network required',
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
  { name: 'Connectors', sub: 'Enterprise stack' },
  { name: 'Audit trail', sub: 'Immutable log' },
  { name: 'RLS engine', sub: 'Per-tenant' },
  { name: 'PII guard', sub: 'Auto-redact' },
]

const tierCells = [
  { name: 'Private cloud', note: 'Your cloud account' },
  { name: 'Sovereign cloud', note: 'In-country partner' },
  { name: 'On-prem', note: 'Customer data centre' },
]

export const metadata: Metadata = {
  title: 'Deployment | Anvax',
  description: 'Private cloud to air-gapped on-prem. Same product, three tiers. In-region by default, in-country on request.',
  openGraph: { title: 'Deployment | Anvax', description: 'Private cloud to air-gapped on-prem. Same product, three tiers. In-region by default, in-country on request.', url: 'https://www.anvax.in/deployment' },
  twitter: { card: 'summary_large_image', title: 'Deployment | Anvax', description: 'Private cloud to air-gapped on-prem. Same product, three tiers.' },
  alternates: { canonical: 'https://www.anvax.in/deployment' },
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
              From private cloud in your own AWS or Azure to air-gapped on-prem. The same product,
              the same feature set, the same enterprise connectors. Your tier choice is a data
              control decision, not a feature trade-off.
            </p>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Tiers"
            title="Three tiers. One codebase."
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
            lede="Infrastructure tier determines where the product runs, not which features you get."
          />
          <div className={styles.diagram}>
            <div className={styles.diagramTop}>
              <div className={styles.diagramTopLabel}>Product layer: identical across all tiers</div>
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
              <div className={styles.diagramBottomLabel}>Infrastructure tier: your choice</div>
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
            All customer data, embeddings, and inference traces stay in your region.
            In-country on request.
          </h2>
          <p className={styles.residencyNote}>
            In-region by default · In-country on request · GDPR, DPDP, PDPL residency options
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
