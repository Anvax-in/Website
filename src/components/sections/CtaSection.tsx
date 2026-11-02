import Button from '../ui/Button'
import styles from './CtaSection.module.css'

interface CtaLink {
  label: string
  href: string
}

interface CtaSectionProps {
  title?: React.ReactNode
  body?: React.ReactNode
  primary?: CtaLink
  secondary?: CtaLink
}

export default function CtaSection({
  title = 'Bring your regulator into the room.',
  body = 'We will run the demo on your corpus, in your tenancy, with the audit trail switched on. Forty-five minutes.',
  primary = { label: 'Book a demo', href: '/contact' },
  secondary = { label: 'Request the security pack', href: '/trust' },
}: CtaSectionProps) {
  return (
    <section className={styles.section} id="demo">
      <div className={styles.inner}>
        <h2 className={styles.h2}>{title}</h2>
        <p className={styles.body}>{body}</p>
        <div className={styles.actions}>
          <a href={primary.href} className={styles.bookDemo}>
            {primary.label}&nbsp;&nbsp;→
          </a>
          <Button variant="secondaryDark" href={secondary.href}>
            {secondary.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
