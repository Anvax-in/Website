import ComplianceBadgeWall from '@/components/ui/ComplianceBadgeWall'
import styles from './JurisdictionSection.module.css'

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

          {/* Right — badge wall */}
          <ComplianceBadgeWall />
        </div>
      </div>
    </section>
  )
}
