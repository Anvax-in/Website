import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import styles from './CtaSection.module.css'

export default function CtaSection() {
  return (
    <section className="section" id="demo">
      <div className="container">
        <div className={styles.block}>
          <div>
            <Eyebrow bare>Get in touch</Eyebrow>
            <h2 className={styles.h2}>Bring your regulator into the room.</h2>
            <p className={styles.body}>Show us the audit your CISO is preparing for and we'll show you what an examiner-ready AI workspace looks like — live, on your own corpus. Procurement-grade documentation included.</p>
          </div>
          <div className={styles.actions}>
            <Button variant="accent" href="/contact" arrow>Talk to sales</Button>
            <Button variant="secondaryDark" href="/trust#downloads">Get the regulator pack</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
