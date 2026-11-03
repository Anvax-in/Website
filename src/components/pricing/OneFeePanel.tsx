import Button from '@/components/ui/Button'
import styles from './OneFeePanel.module.css'

const INCLUDED = [
  'Unlimited employees',
  'Search, chat, workflows and agents',
  'PII redaction, prompt-injection checks and model gateway',
  'Immutable audit trail',
  'All connectors',
  'Updates and support',
]

const YOU_PROVIDE = [
  'The infrastructure it runs on: your servers, private cloud or air-gapped environment',
  'Model costs, if you route requests to a hosted provider',
]

export default function OneFeePanel() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.darkPanel}>
            <div className={styles.eyebrow}>Anvax pricing</div>
            <h2 className={styles.h2}>No tiers. No seat count. One annual fee.</h2>
            <p className={styles.body}>
              Every product, every governance control and every employee is in the same contract. Adding a team
              never needs a new purchase order.
            </p>
            <div className={styles.ctaRow}>
              <Button variant="primary" href="/contact" arrow>
                Talk to us
              </Button>
            </div>
          </div>

          <div className={styles.lightPanel}>
            <div>
              <div className={styles.includedLabel}>Included</div>
              <div className={styles.list}>
                {INCLUDED.map((item) => (
                  <div key={item} className={styles.item}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.provideLabel}>You provide</div>
              <div className={styles.list}>
                {YOU_PROVIDE.map((item) => (
                  <div key={item} className={styles.item}>
                    <span className={styles.arrow}>→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className={styles.note}>
                We size the infrastructure with you before you sign, so the full cost is known up front.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
