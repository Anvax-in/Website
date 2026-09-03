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
          Anvax was built under one of the strictest data-residency and AI-governance regimes in the world, which is exactly why it is credible in every other one. The audit trail, the policy engine, the jurisdiction packs: they were production requirements before they were selling points. What the private cloud did for infrastructure, Anvax does for enterprise AI, the same capability as the hyperscaler product, running where your own rules apply. Built under the hardest regime. Sold everywhere data cannot leave.
        </p>
      </div>
    </section>
  )
}
