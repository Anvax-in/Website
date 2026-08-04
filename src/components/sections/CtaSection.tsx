import Button from '../ui/Button'
import styles from './CtaSection.module.css'

export default function CtaSection() {
  return (
    <section className={styles.section} id="demo">
      <div className="container">
        <h2 className={styles.h2}>
          <span className={styles.line}>Bring your regulator</span>
          <span className={styles.line}>into the room.</span>
        </h2>
        <p className={styles.body}>Show us the audit your CISO is preparing for and we&apos;ll show you what an examiner-ready AI workspace looks like, live, on your own corpus.</p>
        <div className={styles.actions}>
          <Button variant="secondaryDark" href="/contact">Talk to sales</Button>
          <Button variant="secondaryDark" href="/trust#downloads">Get the regulator pack</Button>
        </div>
      </div>
    </section>
  )
}
