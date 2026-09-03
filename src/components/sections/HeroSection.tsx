import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import Tag from '../ui/Tag'
import styles from './HeroSection.module.css'

const complianceBadges = ['SOC 2', 'ISO 27001', 'GDPR', 'EU AI Act (mapped)', 'DORA (mapped)', 'NIST AI RMF (mapped)']

const stack = [
  {
    label: 'Application: search, chat, agents, workflows',
    color: 'var(--blue)',
    path: 'M11 4h10M11 12h10M11 20h10M3 4h.01M3 12h.01M3 20h.01',
    offset: 0,
  },
  {
    label: 'Governance: redaction, audit, policy',
    color: 'var(--ink-900)',
    path: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
    offset: 28,
  },
  {
    label: 'Knowledge core: corpus, connectors',
    color: 'var(--teal)',
    path: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
    offset: 56,
  },
]

export default function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.row}>
          <div>
            <Eyebrow>Self-hosted · Governed · Audited</Eyebrow>
            <h1 className={styles.h1}>
              <span className={styles.line}>Governed AI your data</span>
              <span className={styles.line}>never has to leave for.</span>
            </h1>
            <p className={styles.lede}>
              Your teams search, chat, and run workflows on your own documents — not
              someone else&apos;s cloud. Every query logged. Every prompt policy-checked.
              Your data stays in your perimeter.
            </p>
            <div className={styles.ctaRow}>
              <Button variant="accent" href="/contact">Request a demo</Button>
              <Button variant="ghost" href="/trust">Architecture for regulators</Button>
            </div>
            <div className={styles.badges} aria-label="Compliance posture">
              {complianceBadges.map(b => <Tag key={b} variant="outline">{b}</Tag>)}
            </div>
          </div>

          <div className={styles.stack} aria-hidden="true">
            {stack.map(({ label, color, path, offset }) => (
              <div key={label} className={styles.block} style={{ background: color, marginLeft: offset }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
