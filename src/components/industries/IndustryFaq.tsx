'use client'
import { useState } from 'react'
import styles from '@/pages/Industry.module.css'

export default function IndustryFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className={styles.faq}>
      {items.map((f, i) => (
        <div key={f.q} className={styles.faqItem}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span><span aria-hidden>{open === i ? '\u2212' : '+'}</span>
          </button>
          {open === i && <p>{f.a}</p>}
        </div>
      ))}
    </div>
  )
}
