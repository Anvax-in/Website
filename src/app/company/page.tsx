import type { Metadata } from 'next'
import SectionHead from '@/components/ui/SectionHead'
import Button from '@/components/ui/Button'
import ContactFormLayout from '@/components/contact/ContactFormLayout'
import styles from '@/pages/Company.module.css'

const values = [
  {
    h3: 'Evidence first',
    desc: 'We don\'t say "AI-powered", we show you the retrieval context, the source citations, and the inference trace. Every output is auditable. If you can\'t verify it, we haven\'t done our job.',
  },
  {
    h3: 'Sovereignty is not a feature',
    desc: 'Data residency, per-tenant encryption, and RLS are the foundation, not checkboxes on a pricing page. You can\'t configure them away. That\'s the point.',
  },
  {
    h3: 'The examiner is always in the room',
    desc: 'We build every feature as though a compliance examiner will ask about it during an inspection. Not because they always will, but because that\'s the bar that actually protects our customers.',
  },
]

const openRoles = [
  {
    title: 'Staff engineer, backend',
    location: 'Bengaluru / Remote',
    type: 'Full-time',
    team: 'Engineering',
  },
  {
    title: 'Product manager, compliance workflows',
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

export const metadata: Metadata = {
  title: 'Company | Anvax',
  description: "Who we are, what we're building, and why we started in the world's hardest data-residency market.",
  openGraph: { title: 'Company | Anvax', description: "Who we are, what we're building, and why we started in the world's hardest data-residency market.", url: 'https://www.anvax.in/company' },
  twitter: { card: 'summary_large_image', title: 'Company | Anvax', description: "Built under the hardest data-residency regime. Sold everywhere data cannot leave." },
  alternates: { canonical: 'https://www.anvax.in/company' },
}

export default function Company() {
  return (
    <>
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
              Regulated enterprises carry the strictest audit obligations and the least tolerance
              for AI hallucination. We built under the hardest data-residency regime in the world,
              which is why the product is credible in every other one.
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
                We started Anvax after watching compliance teams at NBFCs and wealth managers spend
                more time on manual document triage than on actual risk analysis. Not because they
                lacked intelligence, because the tools they had were built for a different market,
                a different regulator, and a different risk culture.
              </p>
              <p className={styles.visionPara}>
                The incumbents built horizontal AI and added compliance features later. We did the
                opposite: started in one of the strictest data-residency and AI-governance regimes
                in the world, and built the governance layer first. The audit chain, the policy
                engine, the residency controls were production requirements before they were selling
                points. That origin is why the product is credible everywhere data cannot leave.
              </p>
              <p className={styles.visionPara}>
                Our goal: every compliance team at every regulated enterprise, in London, Dubai,
                Singapore, or Mumbai, has a workspace where they can search their corpus, run
                their workflows, and produce audit-ready outputs, without their CISO losing sleep
                or their examiner asking hard questions.
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
          <ContactFormLayout />
        </div>
      </section>
    </>
  )
}
