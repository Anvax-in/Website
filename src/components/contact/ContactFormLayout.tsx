'use client'

import styles from '@/pages/Contact.module.css'
import ContactFormEmbed from './ContactFormEmbed'

export default function ContactFormLayout() {
  return (
    <div className={styles.formWrap}>
      <ContactFormEmbed />
    </div>
  )
}
