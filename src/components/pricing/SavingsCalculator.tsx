'use client'

import { useState } from 'react'
import {
  ANVAX_ANNUAL_FEE_USD,
  SHOW_ANVAX_FEE,
  DEFAULT_SEATS,
  annualCost,
  competitors,
  formatUSD,
  seatsFromSlider,
  sliderFromSeats,
  type CompetitorId,
} from '@/lib/pricing'
import CompareLogo from '@/components/compare/CompareLogo'
import styles from './SavingsCalculator.module.css'

export default function SavingsCalculator() {
  const [slider, setSlider] = useState(() => sliderFromSeats(DEFAULT_SEATS))
  const [off, setOff] = useState<Partial<Record<CompetitorId, boolean>>>({})

  const seats = seatsFromSlider(slider)
  const selected = competitors.filter((c) => !off[c.id])
  const maxCost = Math.max(ANVAX_ANNUAL_FEE_USD, ...selected.map((c) => annualCost(c, seats)), 1)

  const savers = selected.map((c) => annualCost(c, seats) - ANVAX_ANNUAL_FEE_USD)
  const avgAbs = savers.length ? savers.reduce((a, b) => a + b, 0) / savers.length : 0

  const anvaxLabel = SHOW_ANVAX_FEE ? formatUSD(ANVAX_ANNUAL_FEE_USD) : 'One flat fee'
  const anvaxBarPct = (ANVAX_ANNUAL_FEE_USD / maxCost) * 100

  return (
    <section id="calculator" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>Savings calculator</div>
          <h2 className={styles.h2}>
            Enter your headcount.
            <br />
            See what per-seat AI would cost.
          </h2>
          <p className={styles.lede}>
            Competitor figures use published or widely reported per-seat prices and seat minimums. Your quote may
            differ.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.panel}>
            <div className={styles.sliderBlock}>
              <div className={styles.label}>Employees using AI</div>
              <div className={styles.seatCount}>{seats.toLocaleString('en-US')}</div>
              <input
                type="range"
                min={0}
                max={1000}
                step={1}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                aria-label="Employees using AI"
                className={styles.range}
              />
              <div className={styles.ticks}>
                <span>200</span>
                <span>750</span>
                <span>2,700</span>
                <span>10,000</span>
              </div>
            </div>

            <div className={styles.toggleBlock}>
              <div className={styles.label}>Compare against</div>
              <div className={styles.toggleList}>
                {competitors.map((c) => {
                  const isOn = !off[c.id]
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={styles.toggle}
                      onClick={() => setOff((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                      aria-pressed={isOn}
                    >
                      <span className={isOn ? styles.checkboxOn : styles.checkboxOff} aria-hidden="true">
                        {isOn ? '✓' : ''}
                      </span>
                      <span className={styles.toggleText}>
                        <span className={styles.toggleName}>{c.name}</span>
                        <span className={styles.toggleNote}>{c.note}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={`${styles.label} ${styles.costLabel}`}>Estimated annual cost</div>

            <div className={styles.rows}>
              {selected.map((c) => {
                const cost = annualCost(c, seats)
                const save = cost - ANVAX_ANNUAL_FEE_USD
                const pct = Math.round((save / cost) * 100)
                const barPct = (cost / maxCost) * 100
                return (
                  <div key={c.id} className={styles.row}>
                    <span className={styles.rowName}>
                      <CompareLogo logo={{ kind: 'image', src: c.logo, alt: c.name }} size={20} />
                      {c.name}
                    </span>
                    <span className={styles.rowCost}>{formatUSD(cost)}</span>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: `${barPct}%` }} />
                    </div>
                    {save > 0 ? (
                      <span className={styles.saveTextPositive}>
                        Anvax saves {formatUSD(save)} a year ({pct}%)
                      </span>
                    ) : (
                      <span className={styles.saveTextNegative}>Per-seat costs less at this headcount</span>
                    )}
                  </div>
                )
              })}

              <div className={styles.anvaxRow}>
                <span className={styles.rowName}>
                  <CompareLogo logo={{ kind: 'image', src: '/compare/anvax-logo.png', alt: 'Anvax' }} size={20} />
                  Anvax
                </span>
                <span className={styles.anvaxCost}>{anvaxLabel}</span>
                <div className={styles.barTrack}>
                  <div className={styles.anvaxBarFill} style={{ width: `${anvaxBarPct}%` }} />
                </div>
                <span className={styles.anvaxCaption}>Same fee at 200 employees or 10,000.</span>
              </div>
            </div>

            <div className={styles.savingsBoxWrap}>
              <div className={styles.savingsBox}>
                <span className={styles.savingsLabel}>You save, every year</span>
                {selected.length === 0 ? (
                  <>
                    <span className={styles.savingsBig}>&mdash;</span>
                    <span className={styles.savingsSub}>Select at least one tool to compare.</span>
                  </>
                ) : avgAbs > 0 ? (
                  <>
                    <span className={styles.savingsBig}>{formatUSD(avgAbs)}</span>
                    <span className={styles.savingsSub}>
                      Average across the selected tools, at {seats.toLocaleString('en-US')} employees.
                    </span>
                  </>
                ) : (
                  <>
                    <span className={styles.savingsBig}>&mdash;</span>
                    <span className={styles.savingsSub}>At this headcount a per-seat plan is cheaper on average.</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
