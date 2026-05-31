import SectionHead from '../ui/SectionHead'
import styles from './VisionSection.module.css'

export default function VisionSection() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Vision"
          title="Built for India's regulated enterprises — from the ground up."
        />
        <div className={styles.vision}>
          <div className={styles.pullquote}>
            The compliance layer is not a feature you configure. It is the foundation.
          </div>
          <div className={styles.body}>
            <p>Every AI tool available to Indian compliance teams was built for a different market, a different regulator, and a different risk culture. Compliance is bolted on after the fact. India-stack integrations are absent. The audit trail is an afterthought.</p>
            <p>Anvax reverses that. RBI, SEBI, and IRDAI requirements are the foundation. Account Aggregator, GST Portal, MCA21, and DigiLocker are first-class connectors — not integrations. Every query is logged, every PII field is redacted, and every model decision is traceable before we ship a single feature.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
