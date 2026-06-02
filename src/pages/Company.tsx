import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import Button from '../components/ui/Button'
import styles from './Company.module.css'

const values = [
  {
    h3: 'Evidence first',
    desc: 'We don\'t say "AI-powered" — we show you the retrieval context, the source citations, and the inference trace. Every output is auditable. If you can\'t verify it, we haven\'t done our job.',
  },
  {
    h3: 'Sovereignty is not a feature',
    desc: 'Data residency, per-tenant encryption, and RLS are the foundation — not checkboxes on a pricing page. You can\'t configure them away. That\'s the point.',
  },
  {
    h3: 'The examiner is always in the room',
    desc: 'We build every feature as though an RBI examiner will ask about it during an inspection. Not because they always will — but because that\'s the bar that actually protects our customers.',
  },
]

const openRoles = [
  {
    title: 'Staff engineer — backend',
    location: 'Bengaluru / Remote',
    type: 'Full-time',
    team: 'Engineering',
  },
  {
    title: 'Product manager — compliance workflows',
    location: 'Bengaluru',
    type: 'Full-time',
    team: 'Product',
  },
  {
    title: 'Sales engineer',
    location: 'Mumbai / Bengaluru',
    type: 'Full-time',
    team: 'GTM',
  },
]

export default function Company() {
  return (
    <>
      <PageMeta
        title="Company — Anvax"
        description="Who we are, what we're building, and why we started with India's hardest market."
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Company</p>
            <h1 className={styles.heroH1}>
              We started where AI governance<br />
              is actually hard.
            </h1>
            <p className={styles.heroLede}>
              India's regulated enterprises — NBFC, wealth, lending, insurance — carry the strictest
              audit obligations and the least tolerance for AI hallucination. We built for them first.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Vision"
            title="Why Anvax exists."
          />
          <div className={styles.visionGrid}>
            <blockquote className={styles.pullquote}>
              "The regulator is not an obstacle. The regulator is the customer's customer."
            </blockquote>
            <div className={styles.visionBody}>
              <p className={styles.visionPara}>
                We started Anvax after watching compliance teams at Indian NBFCs and wealth managers
                spend more time on manual document triage than on actual risk analysis. Not because
                they lacked intelligence — because the tools they had were built for a different market,
                a different regulator, and a different risk culture.
              </p>
              <p className={styles.visionPara}>
                US incumbents built horizontal AI and added compliance features later. We built for
                RBI, SEBI, and IRDAI from day one — wiring in the India stack (Account Aggregator,
                GST Portal, MCA21, DigiLocker) before we built the product interface. The compliance
                layer is not a feature you configure. It is the foundation.
              </p>
              <p className={styles.visionPara}>
                Our goal: every analyst at every regulated Indian enterprise has a workspace where
                they can search their corpus, run their workflows, and produce audit-ready outputs —
                without their CISO losing sleep or their examiner asking hard questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="Values"
            title="Three things we will not compromise on."
          />
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.h3} className={styles.valueCard}>
                <h3 className={styles.valueH3}>{v.h3}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="section alt" id="careers">
        <div className="container">
          <SectionHead
            eyebrow="Careers"
            title="Open roles."
            lede="We're a small team building in public. If you've worked in or around regulated finance and want to build tools that actually matter for compliance teams, we'd like to talk."
          />
          <div className={styles.careersList}>
            {openRoles.map((role) => (
              <div key={role.title} className={styles.careerRow}>
                <div className={styles.careerLeft}>
                  <span className={styles.careerTitle}>{role.title}</span>
                  <div className={styles.careerMeta}>
                    <span className={styles.careerMetaItem}>{role.location}</span>
                    <span className={styles.careerMetaItem}>{role.type}</span>
                    <span className={styles.careerMetaItem}>{role.team}</span>
                  </div>
                </div>
                <Button variant="secondary" href="mailto:careers@anvax.in" arrow>Apply</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact">
        <div className="container">
          <SectionHead
            eyebrow="Contact"
            title="Get in touch."
          />
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <h3 className={styles.contactCardTitle}>Sales & product</h3>
              <p className={styles.contactCardDesc}>
                Questions about pricing, deployment options, or a specific compliance use case.
                We respond to every sales enquiry within one business day.
              </p>
              <a href="mailto:sales@anvax.in" className={styles.contactEmail}>sales@anvax.in</a>
              <Button variant="accent" href="/contact" arrow>Request a demo</Button>
            </div>
            <div className={styles.contactCard}>
              <h3 className={styles.contactCardTitle}>Security disclosures</h3>
              <p className={styles.contactCardDesc}>
                Found a vulnerability? We operate a responsible disclosure programme.
                Please do not share vulnerability details in public channels.
                Use our PGP key for encrypted reports.
              </p>
              <a href="mailto:security@anvax.in" className={styles.contactEmail}>security@anvax.in</a>
              <Button variant="secondary" href="mailto:security@anvax.in" arrow>Disclose a vulnerability</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
