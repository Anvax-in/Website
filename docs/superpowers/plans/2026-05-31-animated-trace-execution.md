# Animated Trace Execution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the inference trace card in the hero section animate step-by-step like a live system executing, with icons per lane and a growing rail — looping forever.

**Architecture:** Two-file change. `HeroSection.tsx` gets a `useEffect` timer driving `visibleCount` state (0→5→0, looping), Lucide icons added to lane data, and the static `::before` rail replaced with a `<div>` whose `scaleY` is controlled by inline style. `HeroSection.module.css` wires up the CSS transitions for lane slide-in, icon pop-in, badge scale-in, and the rail grow animation.

**Tech Stack:** React 18 (useState/useEffect), lucide-react (already installed), CSS Modules, Vite dev server (`npm run dev` → `http://localhost:5173`)

---

## File map

| File | Change |
|---|---|
| `src/components/sections/HeroSection.tsx` | Add icons + animation state; replace inline data array with typed const; replace ::before rail with `<div>` |
| `src/components/sections/HeroSection.module.css` | Remove `.schemaBody::before`; add `.rail`, `.laneIcon`, `.laneIconGov`, `.laneVisible`; update `.lane` grid + transitions; update status badge transitions |

---

## Task 1: Animated HeroSection TSX

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Replace the entire file with this content**

```tsx
import { useState, useEffect, type ReactNode } from 'react'
import { ArrowRight, Shield, Zap, FileText, Lock, type LucideIcon } from 'lucide-react'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import Term from '../ui/Term'
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
  { step: 'Request', label: 'User query',               sub: <span>tenant <Term>acme_nbfc</Term> · session 0xA21F</span>, status: 'Bound',      statusVariant: 'sage',  icon: ArrowRight },
  { step: 'Policy',  label: 'PII detection & redaction', sub: 'Aadhaar · PAN · IFSC · GSTIN · UPI · mobile',              status: '3 redacted', statusVariant: 'amber', icon: Shield     },
  { step: 'Route',   label: 'Tier-gated model',          sub: 'Region-locked · India data boundary',                      status: 'Pinned',     statusVariant: 'sage',  icon: Zap        },
  { step: 'Cite',    label: 'Retrieved sources',         sub: 'RBI/2024-25/108 · policies/kfs-v3.md · 4 chunks',          status: 'Verified',   statusVariant: 'sage',  icon: FileText   },
  { step: 'Trail',   label: 'Immutable audit write',     sub: 'SHA-256 chained · UPDATE/DELETE blocked',                  status: 'Sealed',     statusVariant: 'sage',  icon: Lock       },
]

export default function HeroSection() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
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
              <div
                className={styles.rail}
                style={{ transform: `scaleY(${visibleCount / lanes.length})` }}
              />
              {lanes.map(({ step, label, sub, status, statusVariant, icon: Icon }, index) => (
                <div
                  key={step}
                  className={`${styles.lane} ${index < visibleCount ? styles.laneVisible : ''}`}
                >
                  <span className={`${styles.laneIcon} ${step === 'Policy' ? styles.laneIconGov : ''}`}>
                    <Icon size={13} strokeWidth={1.75} />
                  </span>
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
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck --prefix /Users/yogesh/Desktop/anvax-website
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git -C /Users/yogesh/Desktop/anvax-website add src/components/sections/HeroSection.tsx
git -C /Users/yogesh/Desktop/anvax-website commit -m "feat: animate inference trace — sequential step reveal with icons"
```

---

## Task 2: Animated HeroSection CSS

**Files:**
- Modify: `src/components/sections/HeroSection.module.css`

- [ ] **Step 1: Replace the entire file with this content**

```css
/* HeroSection.module.css */
.hero {
  position: relative;
  padding: 60px 0 72px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  background-image:
    radial-gradient(120% 90% at 90% -10%, rgba(184,132,62,0.10) 0%, rgba(184,132,62,0) 55%),
    radial-gradient(80% 60% at 10% 110%, rgba(11,26,42,0.04) 0%, rgba(11,26,42,0) 60%);
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px;
  opacity: 0.045;
  pointer-events: none;
}
.row {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 72px;
  align-items: center;
}
.h1 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 58px;
  line-height: 66px;
  letter-spacing: -0.018em;
  color: var(--ink-900);
  margin-top: 14px;
  text-align: center;
}
.em { color: var(--amber-700); font-style: italic; }
.lede {
  font-family: var(--font-serif);
  font-size: 21px;
  line-height: 32px;
  color: var(--ink-500);
  margin-top: 18px;
  text-align: center;
}
.ctaRow {
  margin-top: 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
.trustStrip {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
.item + .item { padding-left: 22px; margin-left: 22px; border-left: 1px solid var(--border); }
.live::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%; background: var(--sage-700);
}
.wip::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%; background: var(--clay-600);
}

/* ── Inference trace card ── */
.schema {
  border: 1px solid var(--border-strong);
  background: var(--paper);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(11,26,42,.04), 0 18px 40px rgba(11,26,42,.06);
}
.schemaHead {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  background: var(--bone-100);
}
.schemaTtl {
  font-family: var(--font-mono);
  font-size: 11px; color: var(--fg-3);
  letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap;
}
.pulse {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono); font-size: 11px;
  color: var(--sage-700);
  letter-spacing: 0.06em; text-transform: uppercase;
}
.pulse::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%; background: var(--sage-700);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }

.schemaBody { padding: 22px 20px 18px 36px; position: relative; }

/* Rail: real div, scaleY driven by inline style from React */
.rail {
  position: absolute;
  left: 14px; top: 12px; bottom: 12px;
  width: 2px;
  background: linear-gradient(to bottom, var(--amber-600), var(--sage-700));
  border-radius: 2px;
  transform: scaleY(0);
  transform-origin: top center;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

/* Lane — hidden by default, revealed by .laneVisible */
.lane {
  display: grid;
  grid-template-columns: 22px 72px 1fr auto;
  gap: 16px; align-items: center;
  padding: 14px 20px 14px 36px;
  margin-inline: -36px -20px;
  border-bottom: 1px dashed var(--border);
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.32s ease,
    transform 0.32s ease,
    background var(--dur-fast) var(--ease-out);
}
.lane:hover { background: var(--bone-100); }
.lane:last-child { border-bottom: 0; }
.laneVisible { opacity: 1; transform: none; }

/* Icon container */
.laneIcon {
  width: 22px; height: 22px;
  border-radius: var(--radius-sm);
  background: var(--bone-200);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: var(--ink-500);
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.2s ease 0.12s, transform 0.2s ease 0.12s;
}
.laneIconGov {
  background: var(--amber-100);
  border-color: var(--amber-500);
  color: var(--amber-700);
}
.laneVisible .laneIcon { opacity: 1; transform: scale(1); }

.laneTag {
  font-family: var(--font-mono); font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--amber-700);
}
.laneLabel {
  font-family: var(--font-sans); font-size: 14px; font-weight: 500; color: var(--ink-900);
}
.laneSub {
  display: block; font-weight: 400; font-size: 12px; color: var(--fg-3); margin-top: 2px;
}

/* Status badges — hidden by default, pop in with delay after lane appears */
.laneStatus {
  font-family: var(--font-mono); font-size: 10px;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--sage-700);
  display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
  opacity: 0;
  transform: scale(0.82);
  transition: opacity 0.22s ease 0.28s, transform 0.22s ease 0.28s;
}
.laneStatus::before {
  content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--sage-700);
}
.laneStatusAmber {
  font-family: var(--font-mono); font-size: 10px;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--amber-700);
  display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
  opacity: 0;
  transform: scale(0.82);
  transition: opacity 0.22s ease 0.28s, transform 0.22s ease 0.28s;
}
.laneStatusAmber::before {
  content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--amber-600);
}
/* Must follow individual badge rules — same specificity, source order wins */
.laneVisible .laneStatus,
.laneVisible .laneStatusAmber { opacity: 1; transform: scale(1); }

.schemaFoot {
  border-top: 1px solid var(--border);
  background: var(--bone-50);
  padding: 13px 18px 14px;
  display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap;
  font-family: var(--font-mono); font-size: 10px; color: var(--fg-3);
  letter-spacing: 0.04em; text-transform: uppercase;
}
.schemaResidency::before {
  content: ''; display: inline-block; width: 6px; height: 6px;
  background: var(--amber-600); border-radius: 50%; margin-right: 8px; vertical-align: 1px;
}

@media (max-width: 960px) {
  .row { grid-template-columns: 1fr; gap: 48px; }
  .h1 { font-size: 44px; line-height: 52px; }
}
```

- [ ] **Step 2: Start dev server and visually verify**

```bash
npm run dev --prefix /Users/yogesh/Desktop/anvax-website
```

Open `http://localhost:5173`. Check the hero section (top of page):
- Steps are invisible on load, then slide in one by one from left (~700ms apart)
- Small icon square appears in each lane (amber-tinted on Policy)
- The amber-sage gradient rail grows downward as steps appear
- Status badge (Bound / 3 Redacted / Pinned / Verified / Sealed) pops in slightly after each lane
- After all 5 steps are visible, the card resets after ~3.2 seconds and replays
- Loop is seamless and continuous

- [ ] **Step 3: Typecheck**

```bash
npm run typecheck --prefix /Users/yogesh/Desktop/anvax-website
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/yogesh/Desktop/anvax-website add src/components/sections/HeroSection.module.css
git -C /Users/yogesh/Desktop/anvax-website commit -m "feat: CSS for animated trace — rail grow, lane slide-in, icon pop, badge reveal"
```

---

## Done

Two commits. The inference trace card now executes live on loop — steps animate in sequentially, the rail grows, badges resolve, resets and repeats.
