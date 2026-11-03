'use client'
import { useState } from 'react'
import { faqs, faqSourcesNote } from '@/lib/pricing'
import styles from './PricingFaq.module.css'

export default function PricingFaq(): JSX.Element {
  const [open, setOpen] = useState(0)
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <h2 className={styles.h2}>FAQs</h2>
          <div className={styles.faq}>
            {faqs.map((f, i) => (
              <div key={i} className={styles.faqItem}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <span aria-hidden>{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.sourcesNote}>{faqSourcesNote}</p>
      </div>
    </section>
  )
}
