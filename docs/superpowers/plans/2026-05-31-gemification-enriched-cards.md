# Gemification: Enriched Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add icons, hover-lift effects, and an amber left-rail accent to the ArchDiagram and HeroSection inference trace panel on the home page.

**Architecture:** Pure CSS/JSX polish — no layout changes, no new pages, no API calls. `lucide-react` is added as the one new dependency to provide icons in the React components (the project already uses Lucide via CDN in static HTML files). Two components are touched: `ArchDiagram` (data + CSS) and `HeroSection` (CSS + minor JSX for the amber status dot variant).

**Tech Stack:** React 18, CSS Modules, lucide-react, Vite (dev server: `npm run dev` → `http://localhost:5173`)

---

## File map

| File | Change |
|---|---|
| `package.json` | Add `lucide-react` dependency |
| `src/components/sections/ArchDiagram.tsx` | Add `icon` field to block data; import + render Lucide icons |
| `src/components/sections/ArchDiagram.module.css` | Row layout on blocks, icon wrap styles, hover lift, amber rail on meta |
| `src/components/sections/HeroSection.tsx` | Add `statusVariant` field to Policy lane; apply amber dot class |
| `src/components/sections/HeroSection.module.css` | Left amber-to-sage rail, lane hover, amber status dot variant class |

---

## Task 1: Install lucide-react

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the package**

```bash
cd /Users/yogesh/Desktop/anvax-website
npm install lucide-react
```

Expected output: `added 1 package` (lucide-react has no runtime dependencies).

- [ ] **Step 2: Verify it's in package.json**

```bash
grep '"lucide-react"' package.json
```

Expected: `"lucide-react": "^0.x.x"` (some version ≥ 0.400).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add lucide-react for React icon components"
```

---

## Task 2: Update ArchDiagram data with icons

**Files:**
- Modify: `src/components/sections/ArchDiagram.tsx`

- [ ] **Step 1: Replace the entire file content**

```tsx
import { Link2, Bot, Workflow, MessageSquare, Search, Shield, Zap, Route, Database, Layers3, Network, KeyRound, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead'
import Term from '../ui/Term'
import styles from './ArchDiagram.module.css'

type Block = { h: string; s: string | null; icon: LucideIcon }

const layers: { num: string; name: string; desc: string; blocks: Block[]; accent: boolean }[] = [
  {
    num: 'Layer 03', name: 'Application layer',
    desc: 'The surface your analyst, RM, and compliance officer use every day.',
    blocks: [
      { h: 'Search',    s: 'Hybrid · cited',       icon: Search },
      { h: 'Chat',      s: 'Threads · ⌘K',         icon: MessageSquare },
      { h: 'Workflows', s: 'Temporal-backed',       icon: Workflow },
      { h: 'Agents',    s: 'Policy-checked',        icon: Bot },
    ], accent: false,
  },
  {
    num: 'Layer 02', name: 'Governance layer',
    desc: 'Every request passes through here. Not an afterthought — wired into the data path.',
    blocks: [
      { h: 'PII redaction',        s: 'Aadhaar · PAN · UPI',   icon: Shield },
      { h: 'Prompt-injection gate', s: 'Per user message',      icon: Zap },
      { h: 'Model gateway',        s: 'Tier-gated · pinned',    icon: Route },
      { h: 'Immutable audit',      s: 'SHA-256 chained',        icon: Link2 },
    ], accent: true,
  },
  {
    num: 'Layer 01', name: 'Knowledge core',
    desc: 'Customer corpus, India-stack connectors, and the hybrid index that makes them queryable.',
    blocks: [
      { h: 'Customer corpus', s: 'Per-tenant',          icon: Database },
      { h: 'India stack',     s: 'GST · MCA · AA · Tally', icon: Layers3 },
      { h: 'Hybrid index',    s: 'RAG + structured',    icon: Network },
      { h: 'Encrypted at rest', s: null,                icon: KeyRound },
    ], accent: false,
  },
]

export default function ArchDiagram() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Architecture · Conceptual"
          title="One stack, three layers."
          lede="Knowledge is grounded per tenant. Governance sits between the user and the model — not after the fact. The application layer is what your people see."
        />
        <div className={styles.arch}>
          {layers.map(({ num, name, desc, blocks, accent }) => (
            <div key={num} className={styles.row}>
              <div className={styles.meta}>
                <div className={styles.layerNum}>{num}</div>
                <div className={styles.layerName}>{name}</div>
                <p className={styles.layerDesc}>{desc}</p>
              </div>
              <div className={styles.blocks}>
                {blocks.map(({ h, s, icon: Icon }) => (
                  <div key={h} className={`${styles.block} ${accent ? styles.accent : ''}`}>
                    <span className={styles.iconWrap}>
                      <Icon size={14} strokeWidth={1.75} />
                    </span>
                    <span className={styles.blockText}>
                      <span className={styles.blockH}>{h}</span>
                      <span className={styles.blockS}>
                        {h === 'Encrypted at rest'
                          ? <><Term>AES-256-GCM</Term> · per-tenant DEK</>
                          : s}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.foot}>
            <span>All customer data, embeddings &amp; inference traces stay in India.</span>
            <Link to="/trust">See the full architecture <span>→</span></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npm run typecheck
```

Expected: zero errors. If `LucideIcon` import fails, try `import type { LucideIcon } from 'lucide-react'` as a separate import line.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ArchDiagram.tsx
git commit -m "feat: add lucide icons to ArchDiagram blocks"
```

---

## Task 3: Restyle ArchDiagram blocks (row layout, icon wrap, hover lift, amber rail)

**Files:**
- Modify: `src/components/sections/ArchDiagram.module.css`

- [ ] **Step 1: Replace the entire file content**

```css
/* ArchDiagram.module.css */
.arch { border: 1px solid var(--border-strong); background: var(--paper); border-radius: var(--radius-md); overflow: hidden; }
.row { display: grid; grid-template-columns: 220px 1fr; border-bottom: 1px solid var(--border); }
.row:last-of-type { border-bottom: 0; }

/* Amber rail: 3px left border on every meta panel, tying the layers into one vertical accent stripe */
.meta { background: var(--bone-100); padding: 24px; border-right: 1px solid var(--border); border-left: 3px solid var(--amber-600); }

.layerNum { font-family: var(--font-mono); font-size: 11px; color: var(--amber-700); letter-spacing: 0.08em; text-transform: uppercase; }
.layerName { font-family: var(--font-serif); font-size: 22px; line-height: 28px; font-weight: 400; letter-spacing: -0.005em; margin-top: 6px; color: var(--ink-900); }
.layerDesc { margin-top: 8px; font-size: 12px; line-height: 18px; color: var(--ink-500); max-width: 22ch; }

.blocks { padding: 24px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; align-content: start; }

/* Row layout: icon on left, text stack on right */
.block {
  border: 1px solid var(--border);
  background: var(--bone-50);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  min-height: 64px;
  transition:
    transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
}
.block:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(11, 26, 42, 0.10);
  border-color: var(--bone-300);
}

.accent { background: var(--amber-100); border-color: var(--amber-500); }
.accent:hover {
  box-shadow: 0 4px 12px rgba(184, 132, 62, 0.18);
  border-color: var(--amber-600);
  transform: translateY(-2px);
}

/* Icon container */
.iconWrap {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: var(--bone-200);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--ink-500);
}
.accent .iconWrap {
  background: var(--amber-100);
  border-color: var(--amber-500);
  color: var(--amber-700);
}

/* Text stack inside block */
.blockText { display: flex; flex-direction: column; gap: 3px; }
.blockH { font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--ink-900); }
.blockS { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.04em; text-transform: uppercase; }
.accent .blockS { color: var(--amber-700); }

.foot {
  padding: 16px 24px; display: flex; gap: 20px; align-items: center; justify-content: space-between;
  font-family: var(--font-mono); font-size: 11px; color: var(--fg-3);
  letter-spacing: 0.04em; text-transform: uppercase;
  background: var(--bone-50); border-top: 1px solid var(--border);
}
.foot a { color: var(--ink-900); text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; }
.foot a:hover { color: var(--amber-700); }

@media (max-width: 800px) {
  .row { grid-template-columns: 1fr; }
  .meta { border-right: 0; border-bottom: 1px solid var(--border); border-left: 3px solid var(--amber-600); }
  .blocks { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 2: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173` and scroll to the architecture section. Check:
- Each block shows a small square icon on the left with text to the right
- Governance layer (Layer 02) blocks have amber-tinted icon containers
- Hovering any block lifts it 2px with a soft shadow
- A thin amber vertical stripe runs down the left edge of all three meta panels

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ArchDiagram.module.css
git commit -m "feat: restyle ArchDiagram blocks — row layout, icon wrap, hover lift, amber rail"
```

---

## Task 4: Add amber status variant to HeroSection JSX

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Replace the lane data array and status rendering**

The only changes are: (a) add `statusVariant` to the Policy lane, (b) apply a conditional class on the status span. Replace the `<aside>` block (lines 33–60 in the current file) with:

```tsx
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
```

- [ ] **Step 2: Type-check**

```bash
npm run typecheck
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: add amber status variant to Policy lane in inference trace"
```

---

## Task 5: Add left rail, lane hover, and amber dot to HeroSection CSS

**Files:**
- Modify: `src/components/sections/HeroSection.module.css`

- [ ] **Step 1: Apply targeted changes to the existing file**

Make these three edits to `HeroSection.module.css`:

**Edit 1** — update `.schemaBody`: widen its left padding to 36px (creates the gutter for the rail) and add `position: relative` plus the `::before` rail. The rail sits at `left: 14px` — entirely within the 36px left padding, clear of the text columns.

Find:
```css
.schemaBody { padding: 22px 20px 18px; }
```
Replace with:
```css
.schemaBody { padding: 22px 20px 18px 36px; position: relative; }
.schemaBody::before {
  content: '';
  position: absolute;
  left: 14px; top: 12px; bottom: 12px;
  width: 2px;
  background: linear-gradient(to bottom, var(--amber-600), var(--sage-700));
  border-radius: 2px;
  pointer-events: none;
}
```

**Edit 2** — update `.lane` to add hover transition (no padding change needed — the gutter is already handled by the schemaBody left padding above):

Find:
```css
.lane {
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 16px; align-items: center;
  padding: 14px 0;
  border-bottom: 1px dashed var(--border);
}
```
Replace with:
```css
.lane {
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 16px; align-items: center;
  padding: 14px 0;
  border-bottom: 1px dashed var(--border);
  transition: background var(--dur-fast) var(--ease-out);
}
.lane:hover { background: var(--bone-50); }
```

**Edit 3** — add `.laneStatusAmber` class (amber dot variant for the Policy lane). Append to end of file:

```css
.laneStatusAmber {
  font-family: var(--font-mono); font-size: 10px;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--amber-700);
  display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
}
.laneStatusAmber::before {
  content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--amber-600);
}
```

- [ ] **Step 2: Visually verify in browser**

Dev server should still be running at `http://localhost:5173`. Check the hero section (top of home page):
- A thin gradient line (amber at top → sage at bottom) runs down the left side of the inference trace card body
- Lane content is offset ~36px from the card left edge (clear of the rail)
- Hovering a lane shows a subtle bone-50 background highlight
- The "3 redacted" status on the Policy lane shows an amber dot (not sage green)
- All other lane status dots remain sage green

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.module.css
git commit -m "feat: add left amber-sage rail, lane hover, and amber Policy dot to inference trace"
```

---

## Done

All five tasks produce working, independently committed changes. The home page now has:
- Icons in every ArchDiagram block
- Hover lift on all blocks
- Amber vertical rail down the left meta panels
- Amber-to-sage gradient left rail in the inference trace card
- Amber dot on the Policy lane, lane hover highlight
