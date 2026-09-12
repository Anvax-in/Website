import styles from './JurisdictionSection.module.css'

const frameworks = [
  { name: 'SOC 2 Type II',             jurisdiction: 'Global',          status: 'Audit underway', variant: 'blue' },
  { name: 'ISO/IEC 27001',             jurisdiction: 'Global',          status: 'Audit underway', variant: 'blue' },
  { name: 'GDPR',                      jurisdiction: 'European Union',  status: 'Mapped',         variant: 'sage' },
  { name: 'EU AI Act',                 jurisdiction: 'European Union',  status: 'Mapped',         variant: 'sage' },
  { name: 'DORA',                      jurisdiction: 'European Union',  status: 'Mapped',         variant: 'sage' },
  { name: 'NIST AI RMF',              jurisdiction: 'United States',   status: 'Mapped',         variant: 'sage' },
  { name: 'FCA operational resilience',jurisdiction: 'United Kingdom',  status: 'Mapped',         variant: 'sage' },
  { name: 'MAS FEAT',                  jurisdiction: 'Singapore',       status: 'Mapped',         variant: 'sage' },
  { name: 'RBI FREE-AI',               jurisdiction: 'India',           status: 'Mapped',         variant: 'sage' },
] as const

export default function JurisdictionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* Left — copy */}
          <div className={styles.copy}>
            <div className={styles.eyebrow}>Jurisdiction packs</div>
            <h2 className={styles.h2}>Your regulator, already mapped.</h2>
            <p className={styles.lede}>
              Control mappings ship with the product, documented per framework.
              Your reviewer gets a mapping table, not a marketing claim.
            </p>
            <a href="/trust" className={styles.cta}>
              Request the security pack <span className={styles.arrow}>→</span>
            </a>
          </div>

          {/* Right — framework table */}
          <div className={styles.table}>
            {frameworks.map(({ name, jurisdiction, status, variant }) => (
              <div key={name} className={styles.row}>
                <span className={styles.framework}>{name}</span>
                <span className={styles.jurisdiction}>{jurisdiction}</span>
                <span className={variant === 'blue' ? styles.statusBlue : styles.statusSage}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
