'use client'

import styles from '@/pages/Contact.module.css'
import ContactFormLayout from '@/components/contact/ContactFormLayout'

export default function ContactClient() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.lattice} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroInner}>
              <p className={styles.heroEyebrow}>Contact</p>
              <h1 className={styles.heroH1}>
                Let&apos;s talk about your<br />
                <span className={styles.heroEm}>deployment.</span>
              </h1>
              <p className={styles.heroLede}>
                Tell us about your organisation and what you are trying to solve.
                We respond to every enquiry within one business day.
              </p>
            </div>
            <ContactFormLayout />
          </div>
        </div>
      </section>
    </>
  )
}
