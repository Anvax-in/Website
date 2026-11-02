import { beyondSeatPrice, competitors } from '@/lib/pricing'
import CompareLogo from '@/components/compare/CompareLogo'
import styles from './BeyondSeatPrice.module.css'

export default function BeyondSeatPrice() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>Beyond the seat price</div>
          <h2 className={styles.h2}>The seat price is where the bill starts.</h2>
        </div>

        <div className={styles.grid}>
          {competitors.map((c) => {
            const entry = beyondSeatPrice[c.id]
            return (
              <div key={c.id} className={styles.panel}>
                <div className={styles.head2}>
                  <CompareLogo logo={{ kind: 'image', src: c.logo, alt: c.name }} size={28} />
                  <h3 className={styles.name}>{c.name}</h3>
                </div>
                <div className={styles.rate}>{entry.rateLabel}</div>
                <div className={styles.bullets}>
                  {entry.bullets.map((bullet) => (
                    <div key={bullet} className={styles.bullet}>
                      <span className={styles.marker}>+</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
