import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import Button from '../components/ui/Button'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Starter',
    price: '₹35,000',
    pricePer: '/mo',
    priceAlt: '₹3.5L / yr',
    desc: 'For small compliance teams getting started with AI search and chat on their own corpus.',
    features: [
      '25 users',
      '5M + 500K tokens / month',
      '5 connectors',
      'Shared SaaS',
      'Community support',
      'Standard audit trail',
    ],
    ctaLabel: 'Start free trial',
    ctaHref: '/contact',
    featured: false,
  },
  {
    name: 'Growth',
    price: '₹1,00,000',
    pricePer: '/mo',
    priceAlt: '₹10L / yr',
    desc: 'For mid-size regulated teams that need SSO, SCIM, RBAC, and expanded token budgets.',
    features: [
      '100 users',
      '25M + 2.5M tokens / month',
      'All connectors',
      'SSO / SCIM / RBAC',
      'Priority support',
      'Dedicated data plane',
    ],
    ctaLabel: 'Start free trial',
    ctaHref: '/contact',
    featured: true,
  },
  {
    name: 'Business',
    price: null,
    desc: 'For enterprises that need a dedicated VPC, custom SLA, and advanced security controls.',
    features: [
      'Dedicated VPC',
      'Custom SLA',
      'MFA enforced',
      'Custom workflow templates',
      'Dedicated CSM',
      'Compliance documentation pack',
    ],
    ctaLabel: 'Contact sales',
    ctaHref: '/contact',
    featured: false,
  },
  {
    name: 'Sovereign',
    price: null,
    desc: 'For institutions that require customer VPC, on-prem, or air-gapped deployment with full compliance documentation.',
    features: [
      'Customer VPC or on-prem',
      'Air-gapped option',
      'Full compliance docs',
      'Pentest summary under NDA',
      'Data processing agreement',
      'Annual audit support',
    ],
    ctaLabel: 'Contact sales',
    ctaHref: '/contact',
    featured: false,
  },
]

const faqs = [
  {
    q: 'What counts as a token?',
    a: 'A token is roughly 4 characters of text. Input tokens (your query + retrieved context) and output tokens (the model\'s response) both count toward your monthly budget. The two numbers shown (e.g. 5M + 500K) are input and output budgets respectively. Unused tokens do not roll over.',
  },
  {
    q: 'Can I use my own Claude or OpenAI API key?',
    a: 'Yes. Bring-your-own-key (BYOK) is supported on Business and Sovereign tiers. Anvax acts as the orchestration layer; your API key is stored encrypted with your tenant DEK and never exposed to Anvax staff. On Starter and Growth, Anvax provides the model access bundled in the price.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Starter and Growth plans include a 14-day free trial with no credit card required. You get full access to all features including connectors, workflows, and the audit trail. At the end of the trial you can choose a plan or export your data — whichever you prefer.',
  },
  {
    q: 'What happens if I exceed my token budget?',
    a: 'We send an alert at 80% utilisation. At 100% you have the option to purchase a top-up pack or upgrade to the next tier. We do not cut off service without warning. If you consistently exceed your budget we will reach out proactively to discuss a plan that fits your usage.',
  },
]

export default function Pricing() {
  return (
    <>
      <PageMeta
        title="Pricing — Anvax"
        description="Starter from ₹35,000/mo. Growth, Business, and Sovereign tiers."
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Pricing</p>
            <h1 className={styles.heroH1}>
              Plain rupees.<br />
              No hidden multipliers.
            </h1>
            <p className={styles.heroLede}>
              Four plans, clear token budgets, and an honest list of what each tier includes.
              No per-seat AI add-ons. No surprise model fees.
            </p>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Plans"
            title="From ₹35,000/mo to enterprise."
            lede="Start on Starter. Migrate to Sovereign without re-implementation. Your tier is a data control decision."
          />
          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`${styles.planCard} ${plan.featured ? styles.featured : ''}`}
              >
                <div className={styles.planName}>{plan.name}</div>
                {plan.price ? (
                  <>
                    <div className={styles.planPrice}>
                      {plan.price}
                      <span className={styles.planPricePer}>{plan.pricePer}</span>
                    </div>
                    {plan.priceAlt && (
                      <div className={styles.planPriceAlt}>{plan.priceAlt}</div>
                    )}
                  </>
                ) : (
                  <div className={styles.planContact}>Contact sales</div>
                )}
                <p className={styles.planDesc}>{plan.desc}</p>
                <ul className={styles.planFeatureList}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.planFeature}>{f}</li>
                  ))}
                </ul>
                <div className={styles.planCta}>
                  <Button
                    variant={plan.featured ? 'accent' : 'secondary'}
                    href={plan.ctaHref}
                    arrow
                  >
                    {plan.ctaLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="FAQ"
            title="Questions before you sign."
          />
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.q} className={styles.faqItem}>
                <summary>{faq.q}</summary>
                <div className={styles.faqBody}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
