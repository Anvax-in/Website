import { faqs, faqSourcesNote } from '@/lib/pricing'
import IndustryFaq from '@/components/industries/IndustryFaq'
import styles from './PricingFaq.module.css'

export default function PricingFaq(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <h2 className={styles.h2}>FAQs</h2>
          <IndustryFaq items={faqs} />
        </div>
        <p className={styles.sourcesNote}>{faqSourcesNote}</p>
      </div>
    </section>
  )
}
