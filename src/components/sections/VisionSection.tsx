import SectionHead from '../ui/SectionHead'
import styles from './VisionSection.module.css'

export default function VisionSection() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Vision"
          title="The hardest regulated market in the world is India. We start there."
        />
        <div className={styles.vision}>
          <div className={styles.pullquote}>
            What AWS did for cloud infrastructure, Anvax does for enterprise AI.
          </div>
          <div className={styles.body}>
            <p>India's regulated enterprise has three constraints at once — data sovereignty, deep India-stack dependencies, and a regulator that expects to see every model decision in writing. Solve those, and the rest of the world is a generalisation.</p>
            <p>Anvax begins as the governed intelligence layer for one industry that lives at the intersection of all three — Indian NBFCs — and grows outward, vertical by vertical, until enterprise AI in India runs on a single substrate the way enterprise compute runs on cloud today.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
