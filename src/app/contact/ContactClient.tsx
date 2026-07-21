'use client'

import styles from '@/pages/Contact.module.css'
import ContactFormLayout from '@/components/contact/ContactFormLayout'

export default function ContactClient() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Contact</p>
            <h1 className={styles.heroH1}>
              Let's talk about your<br />
              <span className={styles.heroEm}>compliance stack.</span>
            </h1>
            <p className={styles.heroLede}>
              Tell us about your organisation and what you're trying to solve.
              We respond to every enquiry within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ContactFormLayout />
        </div>
      </section>
    </>
  )
}
