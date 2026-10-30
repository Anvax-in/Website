import type { CompareLogo as CompareLogoData } from '@/content/compare/types'
import CompareLogo from './CompareLogo'
import styles from './CompareHeroGraphic.module.css'

export default function CompareHeroGraphic({ competitorLogo }: { competitorLogo: CompareLogoData }) {
  return (
    <div className={styles.stage}>
      <div className={styles.graphic}>
        <div className={styles.ringOuter}>
          <span className={`${styles.dot} ${styles.dotBlue} ${styles.dotTop}`} />
          <span className={`${styles.dot} ${styles.dotInk} ${styles.dotBottom}`} />
        </div>
        <div className={styles.ringInner}>
          <span className={`${styles.dot} ${styles.dotSage} ${styles.dotLeft}`} />
        </div>
        <div className={styles.row}>
          <div className={`${styles.tile} ${styles.tileA}`}>
            <CompareLogo logo={{ kind: 'image', src: '/compare/anvax-logo.png', alt: 'Anvax' }} size={104} />
          </div>
          <div className={styles.connector}>
            <span className={styles.pulse} />
            <span className={styles.vsBadge}>vs</span>
          </div>
          <div className={`${styles.tile} ${styles.tileB}`}>
            <CompareLogo logo={competitorLogo} size={104} />
          </div>
        </div>
      </div>
    </div>
  )
}
