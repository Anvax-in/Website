import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import Term from '../ui/Term'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.row}>
          <div>
            <Eyebrow>Sovereign AI · Built for India's regulators</Eyebrow>
            <h1 className={styles.h1}>
              Enterprise AI your RBI examiner<br />
              <span className={styles.em}>can sit with.</span>
            </h1>
            <p className={styles.lede}>
              Your analysts search, chat, and run workflows on your own corpus — not
              someone else's cloud. Every query is logged. Every PII field is redacted
              before it leaves the boundary.
            </p>
            <div className={styles.ctaRow}>
              <Button variant="accent" href="#demo" arrow>Request a demo</Button>
              <Button variant="secondary" href="/trust">Architecture for regulators</Button>
            </div>
            <div className={styles.trustStrip} aria-label="Compliance posture">
              <span className={styles.item}>Built for RBI · SEBI · IRDAI · DPDP</span>
              <span className={`${styles.item} ${styles.live}`}>DPDP-aware · Live</span>
              <span className={`${styles.item} ${styles.wip}`}>SOC 2 · ISO 27001 · CERT-In — in progress</span>
            </div>
          </div>

          <aside className={styles.schema} aria-label="Inference flow">
            <div className={styles.schemaHead}>
              <span className={styles.schemaTtl}>Inference trace · INF-9871</span>
              <span className={styles.pulse}>Live</span>
            </div>
            <div className={styles.schemaBody}>
              {[
                { step: 'Request', label: 'User query',               sub: <span>tenant <Term>acme_nbfc</Term> · session 0xA21F</span>, status: 'Bound',      statusVariant: 'sage' as const },
                { step: 'Policy',  label: 'PII detection & redaction', sub: 'Aadhaar · PAN · IFSC · GSTIN · UPI · mobile',              status: '3 redacted', statusVariant: 'amber' as const },
                { step: 'Route',   label: 'Tier-gated model',          sub: 'Region-locked · India data boundary',                      status: 'Pinned',     statusVariant: 'sage' as const },
                { step: 'Cite',    label: 'Retrieved sources',         sub: 'RBI/2024-25/108 · policies/kfs-v3.md · 4 chunks',          status: 'Verified',   statusVariant: 'sage' as const },
                { step: 'Trail',   label: 'Immutable audit write',     sub: 'SHA-256 chained · UPDATE/DELETE blocked',                  status: 'Sealed',     statusVariant: 'sage' as const },
              ].map(({ step, label, sub, status, statusVariant }) => (
                <div key={step} className={styles.lane}>
                  <span className={styles.laneTag}>{step}</span>
                  <span className={styles.laneLabel}>
                    {label}
                    <span className={styles.laneSub}>{sub}</span>
                  </span>
                  <span className={statusVariant === 'amber' ? styles.laneStatusAmber : styles.laneStatus}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.schemaFoot}>
              <span className={styles.schemaResidency}>Data residency · India</span>
              <span>14:32:11 IST</span>
            </div>
          </aside>
        </div>
      </div>
    </header>
  )
}
