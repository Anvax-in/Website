'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatsSection.module.css'

const stats = [
  { value: '4.2M', label: 'Governed queries served across deployments' },
  { value: '180+', label: 'Enterprise connectors in the catalogue' },
  { value: '9',    label: 'Regulatory frameworks mapped to controls' },
  { value: '0',    label: 'Bytes of customer data leaving your perimeter' },
]

function parseStat(raw: string) {
  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { target: 0, decimals: 0, suffix: raw }
  const [, numStr, suffix] = match
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  return { target: parseFloat(numStr), decimals, suffix }
}

function StatValue({ raw }: { raw: string }) {
  const { target, decimals, suffix } = parseStat(raw)
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(raw)

  useEffect(() => {
    const el = ref.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || target === 0 || reduced) return

    let done = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return
        done = true
        io.disconnect()
        const duration = 1800
        const start = performance.now()
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          if (t < 1) {
            setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`)
            requestAnimationFrame(step)
          } else {
            setDisplay(raw)
          }
        }
        setDisplay(`${(0).toFixed(decimals)}${suffix}`)
        requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, decimals, suffix, raw])

  return (
    <span ref={ref} className={styles.value}>
      {display}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className={styles.band}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {stats.map(({ value, label }) => (
            <div key={value} className={styles.stat}>
              <StatValue raw={value} />
              <span className={styles.label}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
