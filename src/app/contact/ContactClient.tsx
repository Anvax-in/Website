'use client'

import styles from '@/pages/Contact.module.css'
import ContactFormEmbed from '@/components/contact/ContactFormEmbed'

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
          <div className={styles.layout}>

            {/* Form */}
            <div className={styles.formWrap}>
              <ContactFormEmbed />
            </div>

            {/* Side info */}
            <aside className={styles.aside}>
              <div className={styles.asideCard}>
                <div className={styles.asideLabel}>Response time</div>
                <p className={styles.asideDesc}>
                  We respond to every sales enquiry within one business day.
                  Security reports within 24 hours.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  )
}
