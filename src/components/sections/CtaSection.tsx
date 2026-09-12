import Button from '../ui/Button'
import styles from './CtaSection.module.css'

export default function CtaSection() {
  return (
    <section className={styles.section} id="demo">
      <div className={styles.inner}>
        <h2 className={styles.h2}>Bring your regulator into the room.</h2>
        <p className={styles.body}>
          We will run the demo on your corpus, in your tenancy, with the audit
          trail switched on. Forty-five minutes.
        </p>
        <div className={styles.actions}>
          <a href="/contact" className={styles.bookDemo}>
            Book a demo&nbsp;&nbsp;→
          </a>
          <Button variant="secondaryDark" href="/trust">
            Request the security pack
          </Button>
        </div>
      </div>
    </section>
  )
}
