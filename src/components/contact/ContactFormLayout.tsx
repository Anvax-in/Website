'use client'

import styles from '@/pages/Contact.module.css'
import ContactFormEmbed from './ContactFormEmbed'

export default function ContactFormLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.formWrap}>
        <ContactFormEmbed />
      </div>
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
  )
}
