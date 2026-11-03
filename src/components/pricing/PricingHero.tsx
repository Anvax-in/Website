import { ANVAX_ANNUAL_FEE_USD, SHOW_ANVAX_FEE, annualCost, competitors, formatUSD } from '@/lib/pricing'
import Button from '@/components/ui/Button'
import CompareLogo from '@/components/compare/CompareLogo'
import styles from './PricingHero.module.css'

const HERO_SEATS = 1000

export default function PricingHero() {
  const heroMax = Math.max(...competitors.map((c) => annualCost(c, HERO_SEATS)))

  const rows = [...competitors]
    .sort((a, b) => annualCost(b, HERO_SEATS) - annualCost(a, HERO_SEATS))
    .map((c) => ({
      name: c.name,
      cost: formatUSD(annualCost(c, HERO_SEATS)),
      barPct: (annualCost(c, HERO_SEATS) / heroMax) * 100,
    }))

  const anvaxBarPct = (ANVAX_ANNUAL_FEE_USD / heroMax) * 100
  const savingsPct = Math.round((1 - ANVAX_ANNUAL_FEE_USD / heroMax) * 100)

  return (
    <header className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>Pricing</div>
          <h1 className={styles.h1}>One platform fee. Every employee.</h1>
          <p className={styles.lede}>
            Enterprise AI workspaces charge per seat, so the bill grows with every team you add. Anvax is one flat
            annual fee for the whole organisation, whether 200 people use it or 10,000.
          </p>
          <div className={styles.ctaRow}>
            <Button variant="primary" href="/contact" arrow>
              Get a quote
            </Button>
            <Button variant="secondary" href="#calculator">
              Calculate your savings
            </Button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardLabel}>Annual cost · 1,000 employees</span>
            <span className={styles.cardUnit}>USD</span>
          </div>
          <div className={styles.rows}>
            {rows.map((row) => (
              <div key={row.name} className={styles.row}>
                <span className={styles.rowName}>{row.name}</span>
                <span className={styles.rowCost}>{row.cost}</span>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${row.barPct}%` }} />
                </div>
              </div>
            ))}
            <div className={styles.row}>
              <span className={styles.rowName}>
                <CompareLogo logo={{ kind: 'image', src: '/compare/anvax-logo.png', alt: 'Anvax' }} size={20} />
                Anvax
              </span>
              <span className={styles.anvaxCost}>
                {SHOW_ANVAX_FEE ? formatUSD(ANVAX_ANNUAL_FEE_USD) : 'One flat fee'}
              </span>
              <div className={styles.barTrack}>
                <div className={styles.anvaxBarFill} style={{ width: `${anvaxBarPct}%` }} />
              </div>
            </div>
          </div>
          <div className={styles.strip}>
            <span className={styles.stripPct}>{savingsPct}%</span>
            <span className={styles.stripCaption}>less than the most expensive per-seat option at this size</span>
          </div>
        </div>
      </div>
    </header>
  )
}
