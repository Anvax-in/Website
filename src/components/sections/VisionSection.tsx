import SectionHead from '../ui/SectionHead'
import styles from './VisionSection.module.css'

export default function VisionSection() {
  return (
    <section id="deployment" className="section">
      <div className="container">
        <SectionHead
          eyebrow="Vision"
          title="The compliance layer is not a feature you configure. It is the foundation."
        />
        <p className={styles.body}>
          Every AI tool available to Indian compliance teams was built for a different market, a different regulator, a different risk culture. Anvax reverses that. RBI, SEBI and IRDAI requirements are the foundation, Account Aggregator, GST Portal, MCA21 and DigiLocker are first-class connectors. Every query is logged, every PII field redacted, before we ship a single feature.
        </p>
      </div>
    </section>
  )
}
