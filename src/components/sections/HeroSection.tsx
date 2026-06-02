'use client'
import { useState, useEffect, type ReactNode } from 'react'
import { ArrowRight, Shield, Zap, FileText, Lock, type LucideIcon } from 'lucide-react'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import styles from './HeroSection.module.css'

type Lane = {
  step: string
  label: string
  sub: ReactNode
  status: string
  statusVariant: 'sage' | 'amber'
  icon: LucideIcon
}

const lanes: Lane[] = [
  { step: 'Receive',  label: 'Question received',        sub: 'Acme Bank · Meera · credit team',               status: 'Accepted',  statusVariant: 'sage',  icon: ArrowRight },
  { step: 'Privacy',  label: 'Sensitive data masked',    sub: 'Aadhaar · PAN · account numbers hidden',        status: '3 masked',  statusVariant: 'amber', icon: Shield     },
  { step: 'Route',    label: 'Approved AI model locked', sub: 'India only · no data leaves the country',       status: 'Confirmed', statusVariant: 'sage',  icon: Zap        },
  { step: 'Sources',  label: 'Relevant documents found', sub: 'RBI 2024 circular · KFS policy · 4 documents', status: 'Verified',  statusVariant: 'sage',  icon: FileText   },
  { step: 'Audit',    label: 'Permanent record created', sub: 'Tamper-proof · examiner can export anytime',    status: 'Sealed',    statusVariant: 'sage',  icon: Lock       },
]

export default function HeroSection() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const STEP_MS = 700
    const PAUSE_MS = 3200
    const t = setTimeout(
      () => setVisibleCount(c => c < lanes.length ? c + 1 : 0),
      visibleCount === lanes.length ? PAUSE_MS : STEP_MS
    )
    return () => clearTimeout(t)
  }, [visibleCount])

  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.row}>
          <div>
            <Eyebrow onDark>Sovereign AI · Built for India's regulators</Eyebrow>
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
              <Button variant="accent" href="/contact" arrow>Request a demo</Button>
              <Button variant="secondaryDark" href="/trust">Architecture for regulators</Button>
            </div>
            <div className={styles.trustStrip} aria-label="Compliance posture">
              <span className={styles.item}>Built for RBI · SEBI · IRDAI · DPDP</span>
              <span className={`${styles.item} ${styles.live}`}>DPDP-aware · Live</span>
              <span className={`${styles.item} ${styles.wip}`}>SOC 2 · ISO 27001 · CERT-In — in progress</span>
            </div>
          </div>

          <aside className={styles.schema} aria-label="Inference flow" aria-hidden="true">
            <div className={styles.schemaHead}>
              <span className={styles.schemaTtl}>Query trace · #9871</span>
              <span className={styles.pulse}>Live</span>
            </div>
            <div className={styles.schemaBody}>
              <div
                className={styles.rail}
                style={{ transform: `scaleY(${visibleCount / lanes.length})` }}
              />
              {lanes.map(({ step, label, sub, status, statusVariant, icon: Icon }, index) => (
                <div
                  key={step}
                  className={`${styles.lane} ${index < visibleCount ? styles.laneVisible : ''}`}
                >
                  <span className={`${styles.laneIcon} ${statusVariant === 'amber' ? styles.laneIconGov : ''}`}>
                    <Icon size={13} strokeWidth={1.75} />
                  </span>
                  <span className={styles.laneTag}>{step}</span>
                  <span className={styles.laneLabel}>
                    {label}
                    <span className={styles.laneSub}>{sub}</span>
                  </span>
                  <span className={`${styles.laneStatus}${statusVariant === 'amber' ? ` ${styles.laneStatusAmber}` : ''}`}>
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
