import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead'
import Tag from '../ui/Tag'
import styles from './PillarsSection.module.css'

const pillars = [
  {
    tag: 'Wedge',
    sub: 'Shipping today',
    title: 'Your analysts work on your corpus. Not ours.',
    body: 'Search, chat, workflows, and agents running on your own documents — with full audit trails, DPDP compliance, and Indian data residency. When the examiner asks for the inference trail, it is one export away.',
    cta: 'See the platform',
    href: '/platform',
  },
  {
    tag: 'Platform',
    sub: 'Compounding',
    title: 'Four moats US incumbents structurally cannot cross.',
    body: 'Organisational memory that compounds per customer. GST, MCA21, Tally, Account Aggregator, RBI circulars — wired in, not bolted on. Vertical packs for every regulated sector. Compliance infrastructure that arrives on day one.',
    cta: 'See the moats',
    href: '/platform',
  },
  {
    tag: 'Deployment',
    sub: 'Same product, your iron',
    title: 'Three tiers. One product. Your data never leaves India.',
    body: 'Fully managed SaaS on Indian infrastructure for growth-stage fintechs. Sovereign deployment into your own VPC for regulated enterprises. On-prem and air-gapped for large banks and PSUs. Same product at every tier.',
    cta: 'See deployment',
    href: '/deployment',
  },
]

export default function PillarsSection() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="How Anvax works"
          title="Three layers. One product."
          lede="A wedge that ships today, a platform that compounds, and a deployment model that meets every regulator where they are."
        />
        <div className={styles.grid}>
          {pillars.map(({ tag, sub, title, body, meta, cta, href }) => (
            <Link key={tag} to={href} className={styles.card}>
              <div className={styles.cardTop}>
                <Tag>{tag}</Tag>
                <span className={styles.sub}>{sub}</span>
              </div>
              <h3 className={styles.h3}>{title}</h3>
              <p className={styles.body}>{body}</p>
              <span className={styles.more}>{cta} <span className={styles.arr}>→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
