import Eyebrow from '@/components/ui/Eyebrow'
import SectionHead from '@/components/ui/SectionHead'
import Button from '@/components/ui/Button'
import styles from './IndustryShell.module.css'

interface IndustryShellProps {
  sector: string
  useCases: string[]
  deploymentNote: string
}

export default function IndustryShell({ sector, useCases, deploymentNote }: IndustryShellProps) {
  return (
    <>
      {/* Hero */}
      <section className="section">
        <div className="container">
          <Eyebrow>Industries</Eyebrow>
          <h1 className={styles.h1}>{sector}</h1>
        </div>
      </section>

      {/* Use cases */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="Use cases"
            title="Where Anvax fits"
          />
          <ul className={styles.useCaseList}>
            {useCases.map((uc) => (
              <li key={uc} className={styles.useCaseItem}>{uc}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deployment */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Deployment"
            title="How it runs"
          />
          <p className={styles.deploymentNote}>{deploymentNote}</p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section alt">
        <div className="container">
          <div className={styles.ctaRow}>
            <p className={styles.ctaText}>Ready to see how Anvax fits your team?</p>
            <Button href="/contact" variant="primary" arrow>Book a demo</Button>
          </div>
        </div>
      </section>
    </>
  )
}
