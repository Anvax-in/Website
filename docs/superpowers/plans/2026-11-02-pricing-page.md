# Pricing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing India-tier `/pricing` page with a global, seat-based savings-calculator page (Anvax's flat annual fee vs. Microsoft 365 Copilot / ChatGPT Enterprise / Claude Enterprise / Glean), ported from the Claude Design canvas mockup at `handoff/pricing/Anvax Pricing.dc.html`.

**Architecture:** One pure data/math module (`src/lib/pricing.ts`, no React) feeds seven presentational pieces composed by `src/app/pricing/page.tsx`: a server-rendered hero + static cost card, a client-side interactive calculator, a static illustrative SVG chart, two static comparison blocks, a client FAQ accordion, and a reused CTA band. Each visual component gets its own CSS Module per the repo's section-component convention (`src/components/sections/*`), not a single page-level stylesheet.

**Tech Stack:** Next.js 15 App Router, React 18, CSS Modules, TypeScript. No new npm dependencies.

**Spec:** `docs/pricing-spec/` (generated from `handoff/pricing/Anvax Pricing.dc.html` via `scripts/proto-extract.mjs`, the same way `docs/redesign-spec/` was generated) — `shots/desktop-FULL.png` / `shots/mobile-FULL.png` for the overall look, `html/desktop/0N-*.html` for exact structure and values, `hover.json` for hover rules. The calculator math and competitor data come from the canvas's logic class (`handoff/pricing/Anvax Pricing.dc.html:279-388`), not from the markup, since the markup only displays what the logic computes.

## Global Constraints

- Tokens only in `*.module.css` — no raw hex/rgb. Two new categorical colors are needed for chart lines that don't exist yet (`#4A515C`, `#8A8F98`); add them to `tokens.css`, don't inline them. (Copilot's `#1F252E` already equals `--amber-600`; Glean's `#A8543A` already equals `--clay-600` — reuse those, no new token.)
- Square corners — no `border-radius` additions except where tokens already specify one (pills, chips, circular badges via `50%`).
- Primary CTA is blue (`var(--cta)` / the existing `Button` `variant="primary"`), per house rule.
- `SHOW_ANVAX_FEE = false`: the Anvax row must read "One flat fee" everywhere; the literal `$72,000` figure must not render anywhere in JSX (it's a placeholder pending confirmation — only used internally for math).
- No new npm dependencies. The repo has no ESLint config or `lint` script (checked — none exists), so despite the original brief mentioning `npm run lint`, verification is `npx tsc --noEmit` + `npm run build` only, per `CLAUDE.md`'s actual Verifying section.
- Compare at 1440 and 600 (`CLAUDE.md`). The calculator/comparison grids use `grid-template-columns: repeat(auto-fit, minmax(min(100%, Npx), 1fr))`, which collapses to one column under ~2×N px container width without any hand-written media query — confirmed against `docs/pricing-spec/html/mobile/*.html` (`domChangesAtMobile: false` for every block except nav in `docs/pricing-spec/report.json`). Only add a `@media` rule where the mobile screenshot shows something the grid collapse alone doesn't produce (e.g., the hero's two-column `minmax(min(100%,440px),1fr)` layout, the calculator card's `minmax(min(100%,360px),1fr)`, the 2×2 `minmax(min(100%,420px),1fr)` grids).
- Respect `prefers-reduced-motion` for the calculator's bar-width transitions, matching the existing pattern in `src/styles/global.css:94-96`.
- `CostCurveChart` has no visual mockup to port (the canvas's chart `<section>` is an empty stub — the logic class computes `chart`/`breakCaption` data that nothing in the markup renders). Per your decision: build it from the computed data. It is implemented as a **static server component**, not wired to the calculator's live slider state — it takes a `seats` prop defaulting to `DEFAULT_SEATS` (500) and draws one vertical reference line/label at that seat count. This is the "static, with a marker prop" option the original brief explicitly allowed, and it avoids inventing cross-component state the spec never described.
- Reuse `CtaSection` for the closing band by giving it optional props with defaults equal to its current homepage copy/links, so `src/app/page.tsx` needs zero changes.
- The four competitor logo PNGs this page needs already exist at `/public/compare/{copilot,chatgpt,claude,glean,anvax}-logo.png` (verified byte-identical to `handoff/pricing/assets/*.png` via `md5`) — there is nothing to copy.

## Review Focus

- **Toggling every competitor off:** `SavingsCalculator` must show "Select at least one tool to compare." in the savings box and not divide by zero or render `NaN`/`Infinity` anywhere (`sel.length === 0`).
- **Headcount below a competitor's seat minimum:** e.g. dragging to 200 seats with ChatGPT (150-seat minimum) selected — `annualCost` must use `Math.max(seats, c.minSeats)`, not the raw slider value, so the bar doesn't understate ChatGPT's cost.
- **A competitor cheaper than Anvax at the current headcount:** at low seat counts some per-seat tools cost less than the $72,000 flat fee — the row must show "Per-seat costs less at this headcount" in `var(--clay-600)`, not a negative "Anvax saves $-X" string.
- **Slider at the extremes:** `seatsFromSlider(0)` must land exactly on 200 and `seatsFromSlider(1000)` exactly on 10,000 (the two tick-label endpoints), not an off-by-rounding value like 198 or 9500.
- **FAQ keyboard/a11y and accordion state:** first item open by default, each `<button>` toggles independently, `aria-expanded` reflects state — mirror `IndustryFaq`'s existing pattern (`src/components/industries/IndustryFaq.tsx`) rather than inventing a new accordion behavior.

---

## File list

- Modify: `src/styles/tokens.css`
- Create: `src/lib/pricing.ts`
- Modify: `src/components/sections/CtaSection.tsx`, `src/components/sections/CtaSection.module.css`
- Create: `src/components/pricing/PricingHero.tsx`, `src/components/pricing/PricingHero.module.css`
- Create: `src/components/pricing/SavingsCalculator.tsx`, `src/components/pricing/SavingsCalculator.module.css`
- Create: `src/components/pricing/CostCurveChart.tsx`, `src/components/pricing/CostCurveChart.module.css`
- Create: `src/components/pricing/BeyondSeatPrice.tsx`, `src/components/pricing/BeyondSeatPrice.module.css`
- Create: `src/components/pricing/OneFeePanel.tsx`, `src/components/pricing/OneFeePanel.module.css`
- Create: `src/components/pricing/PricingFaq.tsx`, `src/components/pricing/PricingFaq.module.css`
- Modify: `src/app/pricing/page.tsx` (full rewrite)
- Delete: `src/pages/Pricing.module.css` (orphaned — only the old page imported it)
- Modify: `src/components/layout/Nav.tsx`, `src/components/layout/Footer.tsx`, `src/app/sitemap.ts`

---

### Task 1: Chart-line tokens

**Files:**
- Modify: `src/styles/tokens.css`

**Interfaces:**
- Produces: `--chart-line-2` (`#4A515C`), `--chart-line-3` (`#8A8F98`) — consumed by Task 6.

- [ ] **Step 1: Add two tokens under a new `/* ---- Chart categorical (cost-curve lines only) ---- */` comment**, placed after the existing "Categorical roles" block (`tokens.css:104-108`):
  ```css
  --chart-line-2: #4A515C;
  --chart-line-3: #8A8F98;
  ```
- [ ] **Step 2: Verify** — `npx tsc --noEmit` still passes (tokens are CSS-only, this just confirms nothing else broke).
- [ ] **Step 3: Commit**
  ```bash
  git add src/styles/tokens.css
  git commit -m "feat(pricing): add chart-line color tokens"
  ```

---

### Task 2: Shared pricing data & math (`src/lib/pricing.ts`)

**Files:**
- Create: `src/lib/pricing.ts`

**Interfaces:**
- Produces (consumed by Tasks 4–8):
  - `ANVAX_ANNUAL_FEE_USD: number`, `SHOW_ANVAX_FEE: boolean`, `MIN_SEATS`, `MAX_SEATS`, `DEFAULT_SEATS: number`
  - `type CompetitorId = 'copilot' | 'chatgpt' | 'claude' | 'glean'`
  - `type Competitor = { id: CompetitorId; name: string; logo: string; ratePerUserMonth: number; minSeats: number; note: string; color: string; dash: string }`
  - `competitors: Competitor[]`
  - `annualCost(c: Competitor, seats: number): number`
  - `seatsFromSlider(slider: number): number`, `sliderFromSeats(seats: number): number`
  - `formatUSD(n: number): string`
  - `type BeyondSeatEntry = { rateLabel: string; bullets: string[] }`
  - `beyondSeatPrice: Record<CompetitorId, BeyondSeatEntry>`
  - `faqs: { q: string; a: string }[]`
  - `faqSourcesNote: string`
  - `type ChartLine = { d: string; color: string; width: number; dash: string; name: string; ly: number }`
  - `type ChartBreak = { x: number; y: number; color: string; n: number; name: string }`
  - `type ChartData = { lines: ChartLine[]; breaks: ChartBreak[]; yTicks: { y: number; ty: number; label: string }[]; xTicks: { x: number; label: string }[]; markerX: number; markerOpacity: number; breakCaption: string }`
  - `buildChartData(seats: number): ChartData`
  - `CHART_X0 = 70, CHART_X1 = 800, CHART_Y0 = 400, CHART_Y1 = 30, CHART_NMAX = 2000` (exported so `CostCurveChart` can size its `viewBox`)

- [ ] **Step 1: Write `src/lib/pricing.ts`** with the exported values above. Port the math *exactly* from the logic class at `handoff/pricing/Anvax Pricing.dc.html:279-388`:
  - `competitors` — copy verbatim (id, name, `/compare/<id>-logo.png`, rate, minSeats, note, color, dash) from lines 306-309. Use `logo: '/compare/copilot-logo.png'` etc. (repo convention), not the canvas's `assets/compare/...` path.
  - `annualCost(c, seats) = c.ratePerUserMonth * 12 * Math.max(seats, c.minSeats)` (line 311).
  - `seatsFromSlider` / `sliderFromSeats` — copy the `seatsFrom`/`sliderFrom` methods verbatim (lines 292-297).
  - `formatUSD(n) = '$' + Math.round(n).toLocaleString('en-US')` (line 303).
  - `beyondSeatPrice` — one entry per competitor id, copied verbatim from `docs/pricing-spec/html/desktop/04-section.html`: e.g. `copilot: { rateLabel: '$30 / user / month', bullets: ['A qualifying Microsoft 365 licence underneath, E3 or E5', 'Copilot Studio agents licensed and metered separately', 'Audit depth tied to your Purview tier', 'Permissions clean-up before rollout, often with a partner'] }` — and likewise for `chatgpt` (3 bullets), `claude` (3 bullets), `glean` (3 bullets), reading the exact text off that file.
  - `faqs` — copy the 5 `{ q, a }` pairs verbatim from lines 357-361 (not the shorter paraphrase in the original task brief).
  - `faqSourcesNote` — copy verbatim from `docs/pricing-spec/html/desktop/06-section.html`: *"Competitor prices from vendor pricing pages and published buyer reports (CloudZero, Vendr via Coworker, GoSearch, Tech Insider), checked November 2026. ChatGPT Enterprise and Glean do not publish prices; figures are reported averages. Claude Enterprise usage is estimated at $20 per user per month. Microsoft 365 Copilot excludes the base Microsoft 365 licence."*
  - `buildChartData(seats)` — port the "chart" block verbatim (lines 334-353): same `X0/X1/Y0/Y1/NMAX/CMAX` constants, same `x()`/`y()` closures, same per-competitor line-path construction (branch on `minSeats > 1`), same breakeven filter (`n <= c.minSeats || n > NMAX` excluded), same `breakCaption` string assembly, same `yTicks`/`xTicks`. Drop `markerOpacity`/`markerX` computation as `x(Math.min(seats, CHART_NMAX))` / `seats <= CHART_NMAX ? 1 : 0` — identical to the original.
- [ ] **Step 2: Create a throwaway verification script `scripts/verify-pricing-math.mjs`** (Node 24 runs `.ts` directly — no build step needed) asserting these golden values, independently derived from the generated spec screenshots (`docs/pricing-spec/shots/desktop-01.png`, `desktop-02.png`) so they're checked against the real canvas output, not re-derived from the same code being tested:
  ```js
  import { competitors, annualCost, seatsFromSlider, sliderFromSeats, buildChartData, ANVAX_ANNUAL_FEE_USD } from '../src/lib/pricing.ts'
  import assert from 'node:assert/strict'

  const byId = id => competitors.find(c => c.id === id)
  assert.equal(annualCost(byId('copilot'), 1000), 360000)
  assert.equal(annualCost(byId('chatgpt'), 1000), 720000)
  assert.equal(annualCost(byId('claude'), 1000), 480000)
  assert.equal(annualCost(byId('glean'), 1000), 600000)
  assert.equal(annualCost(byId('copilot'), 500), 180000)
  assert.equal(annualCost(byId('chatgpt'), 500), 360000)  // seats < minSeats(150) doesn't apply here, but confirms the 500-seat row in the screenshot
  assert.equal(annualCost(byId('claude'), 500), 240000)
  assert.equal(annualCost(byId('glean'), 500), 300000)
  const avgAt500 = competitors.reduce((s, c) => s + (annualCost(c, 500) - ANVAX_ANNUAL_FEE_USD), 0) / competitors.length
  assert.equal(avgAt500, 198000) // matches "$198,000" in docs/pricing-spec/shots/desktop-02.png
  // Review Focus item 2: headcount below a competitor's seat minimum must clamp to that minimum
  assert.equal(annualCost(byId('chatgpt'), 50), 60 * 12 * 150) // 50 < minSeats(150) -> billed as if 150
  assert.equal(annualCost(byId('glean'), 50), 50 * 12 * 100)   // 50 < minSeats(100) -> billed as if 100
  assert.equal(seatsFromSlider(0), 200)
  assert.equal(seatsFromSlider(1000), 10000)
  assert.equal(seatsFromSlider(sliderFromSeats(500)), 500)
  const chart = buildChartData(500)
  assert.equal(
    chart.breakCaption,
    'Circles mark where Anvax becomes cheaper: Copilot at 200 employees, Claude at 150 employees, Glean at 120 employees. Below that, a per-seat plan can cost less.'
  )
  console.log('pricing math OK')
  ```
- [ ] **Step 3: Run it** — `node scripts/verify-pricing-math.mjs`. Expected: prints `pricing math OK` with no assertion errors. Fix `src/lib/pricing.ts` if any assertion fails (do not adjust the asserted values — they're read off the verified spec, not guessed).
- [ ] **Step 4: Delete the throwaway script** — `rm scripts/verify-pricing-math.mjs` (not part of the repo's permanent tooling; `src/lib/pricing.ts` is the deliverable).
- [ ] **Step 5: Commit**
  ```bash
  git add src/lib/pricing.ts
  git commit -m "feat(pricing): add shared pricing data and calculator math"
  ```

---

### Task 3: Make `CtaSection` reusable for the closing band

**Files:**
- Modify: `src/components/sections/CtaSection.tsx`, `src/components/sections/CtaSection.module.css`

**Interfaces:**
- Produces: `CtaSection(props?: { title?: React.ReactNode; body?: React.ReactNode; primary?: { label: string; href: string }; secondary?: { label: string; href: string } })`, all optional, defaulting to the current hard-coded homepage copy/links so `src/app/page.tsx`'s existing `<CtaSection />` call needs no change.
- Consumes (Task 10): rendered as `<CtaSection title="Get a quote for your whole organisation." body="Tell us your headcount and where you want Anvax to run. We will come back with one annual figure and the infrastructure it needs." primary={{ label: 'Talk to us', href: '/contact' }} secondary={{ label: 'See deployment options', href: '/deployment' }} />` — copy verbatim from `docs/pricing-spec/html/desktop/07-section.html`.

- [ ] **Step 1: Add the optional props** to `CtaSection`, defaulting `title` to `'Bring your regulator into the room.'`, `body` to the current paragraph, `primary` to `{ label: 'Book a demo', href: '/contact' }` (rendered with the arrow, as today), `secondary` to `{ label: 'Request the security pack', href: '/trust' }`. Keep the existing `secondaryDark` `Button` styling for the secondary action and the current white "bookDemo" link styling for primary — just swap in the prop values instead of literals. No CSS changes should be needed (the `.module.css` already supports both buttons); only touch it if a prop-driven class needs renaming.
- [ ] **Step 2: Verify** — `npx tsc --noEmit` passes; `npm run dev`, visually confirm `/` still renders the CTA band unchanged (same copy, same links) before moving on.
- [ ] **Step 3: Commit**
  ```bash
  git add src/components/sections/CtaSection.tsx src/components/sections/CtaSection.module.css
  git commit -m "feat(pricing): make CtaSection's copy and links configurable"
  ```

---

### Task 4: `PricingHero`

**Files:**
- Create: `src/components/pricing/PricingHero.tsx`, `src/components/pricing/PricingHero.module.css`

**Interfaces:**
- Consumes: `competitors`, `annualCost`, `formatUSD`, `ANVAX_ANNUAL_FEE_USD`, `SHOW_ANVAX_FEE` from `@/lib/pricing`; `Button` from `@/components/ui/Button`; `CompareLogo` from `@/components/compare/CompareLogo` (reuse the existing logo-rendering component — it already handles fixed-size, no-layout-shift `next/image` wrapping — instead of calling `next/image` directly).
- Produces: `export default function PricingHero(): JSX.Element` — no props, server component.

- [ ] **Step 1: Implement `PricingHero`**, structure and copy from `docs/pricing-spec/html/desktop/01-header.html`:
  - Eyebrow pill "Pricing", `<h1>` "One platform fee. Every employee.", lede paragraph (verbatim: *"Enterprise AI workspaces charge per seat, so the bill grows with every team you add. Anvax is one flat annual fee for the whole organisation, whether 200 people use it or 10,000."*).
  - Two CTAs: `<Button variant="primary" href="/contact" arrow>Get a quote</Button>` and `<Button variant="secondary" href="#calculator">Calculate your savings</Button>`.
  - Static card header: "Annual cost · 1,000 employees" / "USD".
  - Rows computed at module-render time (not hardcoded): `const heroMax = Math.max(...competitors.map(c => annualCost(c, 1000)))`, then `[...competitors].sort((a,b) => annualCost(b,1000) - annualCost(a,1000)).map(c => ({ name: c.name, cost: formatUSD(annualCost(c,1000)), barPct: annualCost(c,1000)/heroMax*100 }))`. Render each as a row: name, cost (mono), then a full-width bar track with an inner bar `width: ${barPct}%`.
  - Anvax row below the loop: `<CompareLogo logo={{ kind: 'image', src: '/compare/anvax-logo.png', alt: 'Anvax' }} size={20} />`, label "Anvax", value = `SHOW_ANVAX_FEE ? formatUSD(ANVAX_ANNUAL_FEE_USD) : 'One flat fee'`, bar width `ANVAX_ANNUAL_FEE_USD / heroMax * 100` (**not** included in `heroMax` itself — matches the canvas logic exactly, lines 332-333).
  - Bottom dark strip: `Math.round((1 - ANVAX_ANNUAL_FEE_USD / heroMax) * 100)` + `'%'` (should read "90%"), plus the fixed caption "less than the most expensive per-seat option at this size".
  - Background dotted-grid decoration (`position:absolute;inset:0;background-image:linear-gradient(...)`) — reproduce as a CSS pseudo-element or plain `<div>` in the module CSS using `var(--border)`/`var(--bone-200)` for the grid lines, not a new raw color.
- [ ] **Step 2: Write `PricingHero.module.css`** from the inline styles in `01-header.html`, using tokens for every color (`var(--blue-600)`, `var(--blue-50)`, `var(--blue-100)`, `var(--ink-500)`, `var(--ink-900)`, `var(--bone-100)`, `var(--bone-200)`, `var(--paper)`, `var(--sheen-primary)` is already handled by `Button`). Hero grid: `grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr))` (no manual breakpoint needed — collapses under ~880px).
- [ ] **Step 3: Verify** — `npx tsc --noEmit` passes.
- [ ] **Step 4: Commit**
  ```bash
  git add src/components/pricing/PricingHero.tsx src/components/pricing/PricingHero.module.css
  git commit -m "feat(pricing): add PricingHero component"
  ```

---

### Task 5: `SavingsCalculator`

**Files:**
- Create: `src/components/pricing/SavingsCalculator.tsx`, `src/components/pricing/SavingsCalculator.module.css`

**Interfaces:**
- Consumes: `competitors`, `annualCost`, `seatsFromSlider`, `sliderFromSeats`, `formatUSD`, `ANVAX_ANNUAL_FEE_USD`, `SHOW_ANVAX_FEE`, `DEFAULT_SEATS`, `CompetitorId` from `@/lib/pricing`; `CompareLogo` from `@/components/compare/CompareLogo` for every competitor/Anvax logo (same reuse as Task 4 — do not call `next/image` directly here).
- Produces: `export default function SavingsCalculator(): JSX.Element`, `'use client'`, no props. Rendered inside a `<section id="calculator">` by Task 10 (the id is what `PricingHero`'s "Calculate your savings" `href="#calculator"` targets — set `scroll-margin-top: var(--nav-height)` on that section, matching the canvas's `scroll-margin-top:68px`, line 88 of the `.dc.html`).

- [ ] **Step 1: Implement state and derived values**:
  ```ts
  const [slider, setSlider] = useState(() => sliderFromSeats(DEFAULT_SEATS))
  const [off, setOff] = useState<Partial<Record<CompetitorId, boolean>>>({})
  const seats = seatsFromSlider(slider)
  const selected = competitors.filter(c => !off[c.id])
  const maxCost = Math.max(ANVAX_ANNUAL_FEE_USD, ...selected.map(c => annualCost(c, seats)), 1)
  ```
  Row text per selected competitor: `cost = annualCost(c, seats)`, `save = cost - ANVAX_ANNUAL_FEE_USD`, `pct = Math.round(save / cost * 100)`; if `save > 0` render `Anvax saves ${formatUSD(save)} a year (${pct}%)` in `var(--sage-600)`, else `Per-seat costs less at this headcount` in `var(--clay-600)` (Review Focus item 3).
  Savings box: `savers = selected.map(c => annualCost(c, seats) - ANVAX_ANNUAL_FEE_USD)`; if `selected.length === 0` → "Select at least one tool to compare." (Review Focus item 1); else `avgAbs = savers.reduce((a,b)=>a+b,0) / savers.length`; if `avgAbs > 0` → big number `formatUSD(avgAbs)`, subtext `Average across the selected tools, at ${seats.toLocaleString('en-US')} employees.`; else big number `'—'`, subtext `At this headcount a per-seat plan is cheaper on average.`.
  Anvax row: label `SHOW_ANVAX_FEE ? formatUSD(ANVAX_ANNUAL_FEE_USD) : 'One flat fee'`, bar width `ANVAX_ANNUAL_FEE_USD / maxCost * 100` (here `maxCost` **does** include the fee — different from `PricingHero`'s `heroMax`, matches lines 314/370).
- [ ] **Step 2: Markup**, structure from `docs/pricing-spec/html/desktop/02-section.html`:
  - Left panel: "Employees using AI" label, big seat count (`seats.toLocaleString('en-US')`), `<input type="range" min={0} max={1000} value={slider} onChange={e => setSlider(+e.target.value)} aria-label="Employees using AI" />`, fixed tick row `200 · 750 · 2,700 · 10,000` (static text, not computed — these are the canvas's chosen label values, not derived from the current seat count).
  - "Compare against" toggle list: one button per competitor (in `competitors` array order — do not sort), each toggling `off[c.id]` on click, showing a checkbox-style square (`✓` when on) plus `c.name` / `c.note`.
  - Right panel: "Estimated annual cost" label, one row per `selected` competitor (same order as `competitors`, filtered) with `<CompareLogo logo={{ kind: 'image', src: c.logo, alt: c.name }} size={20} />`, name, cost, bar track + inner bar (`width: ${bar}%`, transition gated by `prefers-reduced-motion`), save text. Then the Anvax row (same `CompareLogo` pattern with `/compare/anvax-logo.png`, "Anvax", cost-or-"One flat fee", bar, "Same fee at 200 employees or 10,000." caption). Then the dark "YOU SAVE, EVERY YEAR" box.
- [ ] **Step 3: Write `SavingsCalculator.module.css`.** Card grid: `grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr))`, `gap: 1px`, `background: var(--bone-200)` (the 1px gap lines are the grid background showing through — matches the canvas's two-tone card border trick). Bar transition: `transition: width var(--dur-base) var(--ease-out)`, wrapped in `@media (prefers-reduced-motion: reduce) { transition: none }`. Range input: style the track/thumb with `accent-color: var(--blue-600)` (already set globally in `global.css`? No — that's only inside the `.dc.html`'s own `<style>`, not this repo's `global.css`; add `accent-color: var(--blue-600)` locally on the `<input>` rule here).
- [ ] **Step 4: Verify** — `npx tsc --noEmit` passes. `npm run dev`, visit `/pricing` once Task 10 composes the page, exercise: drag slider to each end, toggle all four off (expect "Select at least one tool to compare."), toggle back on, confirm bars and save text update and match `docs/pricing-spec/shots/desktop-02.png` at the default 500-seat position.
- [ ] **Step 5: Commit**
  ```bash
  git add src/components/pricing/SavingsCalculator.tsx src/components/pricing/SavingsCalculator.module.css
  git commit -m "feat(pricing): add SavingsCalculator component"
  ```

---

### Task 6: `CostCurveChart`

**Files:**
- Create: `src/components/pricing/CostCurveChart.tsx`, `src/components/pricing/CostCurveChart.module.css`

**Interfaces:**
- Consumes: `buildChartData`, `DEFAULT_SEATS`, `CHART_X0/X1/Y0/Y1/NMAX` from `@/lib/pricing`.
- Produces: `export default function CostCurveChart({ seats = DEFAULT_SEATS }: { seats?: number }): JSX.Element` — plain server component (no `'use client'`; it has no listeners or state, see Global Constraints).

- [ ] **Step 1: Implement the SVG.** Use `viewBox="0 0 980 450"` (own call: `CHART_X1` (800) + room for right-side line-end labels and bottom x-axis labels; do not change `CHART_X0/X1/Y0/Y1` themselves — those coordinates are load-bearing for the breakeven math). For each `chart.lines[i]`: `<path d={line.d} stroke={line.color} strokeWidth={line.width} strokeDasharray={line.dash || undefined} fill="none" />`, plus a `<text x={CHART_X1 + 10} y={line.ly} fill={line.color} fontSize={12}>{line.name}</text>` label at the line's right end.
  - For each `chart.breaks[i]`: a small filled `<circle cx={b.x} cy={b.y} r={5} fill={b.color} />` plus a `<text>` below it showing `${b.n.toLocaleString('en-US')}`.
  - Y-axis ticks (`chart.yTicks`): horizontal gridline at each `ty` (use `var(--border)`), label text at `x={CHART_X0 - 10}` right-aligned.
  - X-axis ticks (`chart.xTicks`): label text at `y={CHART_Y0 + 20}`.
  - Seat marker (own call, "static with a marker prop"): a vertical dashed line `x1={chart.markerX} x2={chart.markerX} y1={CHART_Y1} y2={CHART_Y0}` in `var(--ink-500)`, opacity `chart.markerOpacity`, with a small label "Your headcount: {seats.toLocaleString('en-US')}" near the top of the line.
  - Caption: `<p>{chart.breakCaption}</p>` below the `<svg>`.
- [ ] **Step 2: Write `CostCurveChart.module.css`** — `svg { width: 100%; height: auto; }` so it scales responsively (no manual breakpoint needed); caption styled like the existing `.lede`-adjacent small captions elsewhere (`font-size: 13px`, `color: var(--ink-500)`).
- [ ] **Step 3: Verify** — `npx tsc --noEmit` passes. `npm run dev`, visually confirm the chart renders a descending-cost-as-seats-shrink curve for each per-seat competitor, a flat horizontal blue Anvax line, and circles only on Copilot/Claude/Glean (not ChatGPT — Review Focus: its 150-seat minimum keeps it above the fee everywhere, so it correctly has none).
- [ ] **Step 4: Commit**
  ```bash
  git add src/components/pricing/CostCurveChart.tsx src/components/pricing/CostCurveChart.module.css
  git commit -m "feat(pricing): add CostCurveChart component"
  ```

---

### Task 7: `BeyondSeatPrice`

**Files:**
- Create: `src/components/pricing/BeyondSeatPrice.tsx`, `src/components/pricing/BeyondSeatPrice.module.css`

**Interfaces:**
- Consumes: `competitors`, `beyondSeatPrice` from `@/lib/pricing`; `CompareLogo` from `@/components/compare/CompareLogo` (same reuse as Tasks 4–5).
- Produces: `export default function BeyondSeatPrice(): JSX.Element`, server component, no props.

- [ ] **Step 1: Implement**, structure/copy from `docs/pricing-spec/html/desktop/04-section.html`: eyebrow "Beyond the seat price", `<h2>` "The seat price is where the bill starts.", then a 2×2 grid (`grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr))`, `gap: 1px`, `background: var(--bone-200)` — same two-tone border trick as the calculator card) of `competitors.map(c => ...)` cards: `<CompareLogo logo={{ kind: 'image', src: c.logo, alt: c.name }} size={28} />`, `<h3>{c.name}</h3>`, mono `rateLabel` line, then `beyondSeatPrice[c.id].bullets.map(...)` each as a row with a `+` marker in `var(--clay-600)` and the bullet text.
- [ ] **Step 2: Write `BeyondSeatPrice.module.css`** from the inline styles in `04-section.html` (card padding `30px 28px`, bullet rows `border-bottom: 1px solid var(--bone-200)` except the last).
- [ ] **Step 3: Verify** — `npx tsc --noEmit` passes; visually compare against `docs/pricing-spec/shots/desktop-04.png` and the mobile equivalent (single column).
- [ ] **Step 4: Commit**
  ```bash
  git add src/components/pricing/BeyondSeatPrice.tsx src/components/pricing/BeyondSeatPrice.module.css
  git commit -m "feat(pricing): add BeyondSeatPrice component"
  ```

---

### Task 8: `OneFeePanel`

**Files:**
- Create: `src/components/pricing/OneFeePanel.tsx`, `src/components/pricing/OneFeePanel.module.css`

**Interfaces:**
- Produces: `export default function OneFeePanel(): JSX.Element`, server component, no props (all copy is page-specific and hardcoded, matching how `CtaSection`'s own copy is hardcoded today).

- [ ] **Step 1: Implement**, copy and structure verbatim from `docs/pricing-spec/html/desktop/05-section.html`: two-panel grid (`minmax(min(100%, 420px), 1fr)`), dark left panel (`var(--ink-900)` background — eyebrow "Anvax pricing", `<h2>` "No tiers. No seat count. One annual fee.", body paragraph, `<Button variant="primary" href="/contact" arrow>Talk to us</Button>` — note the canvas renders this CTA with `color: var(--ink-950)` on a light sheened background per line 189's inline style, which is this repo's existing `Button variant="primary"` look, so no custom styling needed), light right panel split into "Included" (6 items, green circular `✓` badge using `var(--sage-600)`) and "You provide" (2 items, `var(--ink-500)` arrow `→`) plus the small note paragraph below it.
- [ ] **Step 2: Write `OneFeePanel.module.css`** using tokens throughout (`var(--ink-900)`, `var(--sage-600)`, `var(--ink-500)`, `var(--paper)`).
- [ ] **Step 3: Verify** — `npx tsc --noEmit` passes; compare against `docs/pricing-spec/shots/desktop-05.png` / mobile.
- [ ] **Step 4: Commit**
  ```bash
  git add src/components/pricing/OneFeePanel.tsx src/components/pricing/OneFeePanel.module.css
  git commit -m "feat(pricing): add OneFeePanel component"
  ```

---

### Task 9: `PricingFaq`

**Files:**
- Create: `src/components/pricing/PricingFaq.tsx`, `src/components/pricing/PricingFaq.module.css`

**Interfaces:**
- Consumes: `faqs`, `faqSourcesNote` from `@/lib/pricing`.
- Produces: `export default function PricingFaq(): JSX.Element`, `'use client'`, no props.

- [ ] **Step 1: Implement**, following `IndustryFaq`'s exact pattern (`src/components/industries/IndustryFaq.tsx`) but defaulting `open` state to `0` (first item open — already `IndustryFaq`'s default, so this is consistent, not a deviation) and sourcing from `faqs`. Render `faqSourcesNote` as a trailing `<p>` below the accordion (Review Focus item 5 — mirror `aria-expanded` usage from `IndustryFaq`).
- [ ] **Step 2: Write `PricingFaq.module.css`** from `docs/pricing-spec/html/desktop/06-section.html` (two-column grid: `<h2>FAQs</h2>` beside the accordion list on desktop, `grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr))`, accordion list spans the remaining columns via `grid-column: span 2`).
- [ ] **Step 3: Verify** — `npx tsc --noEmit` passes; confirm first FAQ item is open on load, others closed, clicking toggles correctly, `+`/`−` glyph swaps.
- [ ] **Step 4: Commit**
  ```bash
  git add src/components/pricing/PricingFaq.tsx src/components/pricing/PricingFaq.module.css
  git commit -m "feat(pricing): add PricingFaq component"
  ```

---

### Task 10: Page composition

**Files:**
- Modify: `src/app/pricing/page.tsx` (full rewrite)
- Delete: `src/pages/Pricing.module.css`

**Interfaces:**
- Consumes: all of Tasks 4–9's default exports, plus `CtaSection` (Task 3).

- [ ] **Step 1: Delete the old stylesheet** — `rm src/pages/Pricing.module.css` (confirmed via repo-wide grep that only the old `src/app/pricing/page.tsx` imported it).
- [ ] **Step 2: Rewrite `src/app/pricing/page.tsx`** as a server component:
  ```tsx
  import type { Metadata } from 'next'
  import PricingHero from '@/components/pricing/PricingHero'
  import SavingsCalculator from '@/components/pricing/SavingsCalculator'
  import CostCurveChart from '@/components/pricing/CostCurveChart'
  import BeyondSeatPrice from '@/components/pricing/BeyondSeatPrice'
  import OneFeePanel from '@/components/pricing/OneFeePanel'
  import PricingFaq from '@/components/pricing/PricingFaq'
  import CtaSection from '@/components/sections/CtaSection'

  export const metadata: Metadata = {
    title: 'Pricing | Anvax',
    description: 'One flat annual fee for every employee. See what Microsoft 365 Copilot, ChatGPT Enterprise, Claude Enterprise and Glean would cost your organisation instead.',
    alternates: { canonical: 'https://www.anvax.in/pricing' },
    openGraph: { title: 'Pricing | Anvax', description: '...', url: 'https://www.anvax.in/pricing' },
  }
  // No `robots` key: the old page set `{ index: false, follow: false }` (it was an orphaned,
  // unlinked India-tier page). This replacement is the real global page, so it should inherit
  // the indexable default from `src/app/layout.tsx`'s root metadata. Do not carry the old noindex over.
  

  export default function PricingPage() {
    return (
      <>
        <PricingHero />
        <section id="calculator" className="section alt" style={{ scrollMarginTop: 'var(--nav-height)' }}>
          <div className="container"><SavingsCalculator /></div>
        </section>
        <section className="section">
          <div className="container"><CostCurveChart /></div>
        </section>
        <BeyondSeatPrice />
        <OneFeePanel />
        <section className="section">
          <div className="container"><PricingFaq /></div>
        </section>
        <CtaSection
          title="Get a quote for your whole organisation."
          body="Tell us your headcount and where you want Anvax to run. We will come back with one annual figure and the infrastructure it needs."
          primary={{ label: 'Talk to us', href: '/contact' }}
          secondary={{ label: 'See deployment options', href: '/deployment' }}
        />
      </>
    )
  }
  ```
  Adjust wrapper markup/classes to match whatever each component actually expects (some may already include their own `<section className="section">` wrapper per the established sections/ convention — reconcile during implementation so there's exactly one `<section>` per block, not double-wrapped).
- [ ] **Step 3: Verify** — `npx tsc --noEmit` passes; `npm run build` passes; `npm run dev`, load `/pricing` at 1440 and 600px, compare against `docs/pricing-spec/shots/desktop-FULL.png` and `mobile-FULL.png` section by section.
- [ ] **Step 4: Commit**
  ```bash
  git add src/app/pricing/page.tsx
  git rm src/pages/Pricing.module.css
  git commit -m "feat(pricing): replace India-tier pricing page with global savings calculator"
  ```

---

### Task 11: Site wiring (Nav, Footer, sitemap)

**Files:**
- Modify: `src/components/layout/Nav.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Nav** — in the `links` array (`Nav.tsx`, currently `Why Anvax, Deployment, Security, Blog`), insert `{ to: '/pricing', label: 'Pricing' }` between `Security` and `Blog`. This single array feeds both the desktop link row and the mobile panel (both `.map(links...)`), so no separate mobile edit is needed.
- [ ] **Step 2: Footer** — append `{ to: '/pricing', label: 'Pricing' }` to the `product` array (`Footer.tsx:9-16`), after `Deployment`. (The "Compare" footer column the brief asked for already exists — `Footer.tsx:28,133` — nothing to do there.)
- [ ] **Step 3: Sitemap** — add one entry to `staticPages` in `sitemap.ts`, following the existing `/trust` entry's shape: `{ url: 'https://www.anvax.in/pricing', lastModified: new Date('2026-11-02'), changeFrequency: 'weekly', priority: 0.8 }`.
- [ ] **Step 4: Verify** — `npx tsc --noEmit` passes; `npm run dev`, confirm "Pricing" appears in the nav (desktop and mobile menu) between Security and Blog, in the footer Product column, and that `/sitemap.xml` includes `/pricing`.
- [ ] **Step 5: Commit**
  ```bash
  git add src/components/layout/Nav.tsx src/components/layout/Footer.tsx src/app/sitemap.ts
  git commit -m "feat(pricing): wire /pricing into nav, footer and sitemap"
  ```

---

### Task 12: Final full-site verification

- [ ] **Step 1:** `npx tsc --noEmit` — expect 0 errors.
- [ ] **Step 2:** `npm run build` — expect success.
- [ ] **Step 3:** `npm run dev`; compare `/pricing` at 1440px and 600px against every `docs/pricing-spec/shots/{desktop,mobile}-*.png`, plus spot-check `/` still renders its CTA band unchanged (Task 3 regression check).
- [ ] **Step 4:** Keyboard-only pass on `/pricing`: Tab to the slider (arrow keys adjust it), Tab through the four toggle buttons (Enter/Space toggles), Tab through the FAQ buttons — confirm visible `:focus-visible` rings throughout (inherited from `global.css:22-26`, no extra work expected, just confirm nothing overrides `outline`).
- [ ] **Step 5:** Resize to ~360px width and confirm no horizontal scrollbar / clipped content on any section.
