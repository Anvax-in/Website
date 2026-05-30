# Anvax.in — React Migration + Design Maturity Spec
**Date:** 2026-05-30  
**Status:** Approved for implementation

---

## 1. Objective

Convert the existing 7-page Anvax HTML/CSS/JS website into a production-ready React application. Alongside the migration, fix three problems in the current site:

1. **Excessive mechanical numbering** — "01 ·" prefixes and auto-chapter counters everywhere make sections feel machine-generated.
2. **Immature visual execution** — amber-filled icon tiles, flat repetitive section rhythm, inconsistent spacing.
3. **AI-generated copy** — abstract value statements, feature-list bullets, and template phrasing that fails the CCO-at-11pm trust test.

---

## 2. Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Vite + React 18 + TypeScript | Fast dev, standard tooling |
| Routing | React Router v6 | Industry standard, vite-ssg compatible |
| Pre-rendering | `vite-ssg` | Static HTML per route at build time → crawlable by Google, zero cold starts on Vercel |
| SEO / meta | `react-helmet-async` | Per-page `<title>` and `<meta>` tags injected at SSG time |
| Styling | CSS Modules + global design tokens | Preserves existing token system (`tokens.css`); component-scoped styles prevent leakage |
| Deployment | Vercel (static) | Drop-in: push → build → CDN globally |

**No Tailwind.** The existing design system uses ~126 precise CSS custom properties. Tailwind would fight them and introduce a second styling system.

---

## 3. Project Structure

```
anvax-website/
├── src/
│   ├── main.tsx                 # Vite + React entry
│   ├── App.tsx                  # Router + Layout wrapper
│   │
│   ├── pages/                   # One file per route (pre-rendered by vite-ssg)
│   │   ├── Home.tsx             →  /
│   │   ├── Platform.tsx         →  /platform
│   │   ├── Industries.tsx       →  /industries
│   │   ├── Trust.tsx            →  /trust
│   │   ├── Deployment.tsx       →  /deployment
│   │   ├── Pricing.tsx          →  /pricing
│   │   └── Company.tsx          →  /company
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx          # Sticky, blurred, active-link aware
│   │   │   ├── Nav.module.css
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.module.css
│   │   │
│   │   ├── ui/                  # Atomic, reusable across all pages
│   │   │   ├── Button.tsx       # primary / accent / secondary / ghost variants
│   │   │   ├── Eyebrow.tsx      # amber rule + uppercase label
│   │   │   ├── SectionHead.tsx  # strong top border + eyebrow + h2 + lede
│   │   │   ├── Tag.tsx          # small named category chip (Wedge / Platform / etc.)
│   │   │   ├── Term.tsx         # inline mono pill for AES-256-GCM etc.
│   │   │   ├── StatusPill.tsx   # Live / In progress / Planned
│   │   │   └── *.module.css
│   │   │
│   │   └── sections/            # Home-page sections as standalone components
│   │       ├── HeroSection.tsx
│   │       ├── ProblemSection.tsx
│   │       ├── PillarsSection.tsx
│   │       ├── ArchDiagram.tsx
│   │       ├── IndustriesGrid.tsx
│   │       ├── ComplianceStrip.tsx
│   │       ├── VisionSection.tsx
│   │       ├── CtaSection.tsx
│   │       └── *.module.css
│   │
│   ├── styles/
│   │   ├── tokens.css           # Design tokens — unchanged from current (global import)
│   │   └── global.css           # Body reset, utility classes, shared typography
│   │
│   └── assets/                  # SVGs and logos imported directly by components
│       ├── anvax-wordmark-ink.svg
│       ├── anvax-wordmark-bone.svg
│       ├── lattice.svg
│       └── logos/               # All 18 integration logos
│
├── public/                      # Static files served as-is
├── index.html                   # Vite HTML entry
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Routing

React Router v6 with `vite-ssg` pre-renders each route to a static HTML file at build time.

```
/              → Home.tsx
/platform      → Platform.tsx
/industries    → Industries.tsx
/trust         → Trust.tsx
/deployment    → Deployment.tsx
/pricing       → Pricing.tsx
/company       → Company.tsx
```

Each page component wraps its content in a `<PageMeta>` helper (react-helmet-async) that sets the `<title>` and `<meta name="description">` for that route.

---

## 5. Design Changes

### 5.1 Labeling — remove all mechanical numbering

**Remove everywhere:**
- `01 · Wedge` style prefixes on card labels
- Auto `counter-increment: chapter` numbers in section margins
- Any `::before` content rendering a counter

**Keep:**
- Named category tags: `Wedge`, `Platform`, `Deployment` as small chips (Tag component)
- Stage badges: `Live`, `Next`, `Roadmap` on industry cards
- Technical reference numbers in tables: `R7`, `R17`, `R19` (RBI FREE-AI mapping) — these are real identifiers, not decorative counters
- Mono eyebrow labels on sections: e.g. `How Anvax works` — the text, not a number

### 5.2 Section heads

Each section gets the `SectionHead` component:
- Strong 1.5px top border in `--ink-900`
- Eyebrow label (amber, uppercase, small)
- H2 headline in Source Serif (max 20ch, text-wrap: balance)
- Lede paragraph (serif, muted ink)
- **No chapter counter in the margin**

### 5.3 Cards

All pillar/moat/industry/tier cards:
- `Tag` chip top-left (e.g. "Wedge") — replaces "01 · Wedge"
- Headline
- Body copy
- CTA link pinned to bottom (`margin-top: auto`)
- Icon tile: bone background + ink icon. **No amber fill on icon tiles.** Amber reserved for exactly one element per page — the primary CTA button.

### 5.4 Visual refinements

- Section padding: 80px top/bottom (consistent, not varying per section)
- Card hover: border-color shifts to `--ink-900`, background to `--paper` — no shadow lift
- Before/after lists: inline flow (strong + body on same line), bullet as absolute-positioned dash
- Hero inference-trace card: header/footer no-wrap with proper bottom padding

---

## 6. Content Rewrite — All 7 Pages

### 6.1 The test every line must pass

> *"Would a CCO at an NBFC, reading this at 11pm before an RBI audit, trust this sentence?"*

If it reads like a pitch deck or a ChatGPT output, it fails. If it reads like a senior engineer wrote it for a regulator, it passes.

### 6.2 Six content rules

**Rule 1 — One sentence, one claim, done.**  
No sentence needs a second sentence to explain what it meant. If it does, rewrite the first sentence.  
✗ `Anvax provides a comprehensive governed AI workspace.`  
✓ `Your analysts get search, chat, and workflows — on your corpus, not ours.`

**Rule 2 — Describe the situation, not the category.**  
Readers recognise themselves in situations. They tune out category descriptions.  
✗ `Enterprises face ungoverned AI risks.`  
✓ `Your credit team has ChatGPT open in one tab and the loan file in another.`

**Rule 3 — Name the person in the room.**  
Not "compliance officers." The actual human whose day this changes.  
✗ `Compliance teams can audit AI decisions.`  
✓ `When your RBI examiner asks for the inference trail, it's one export away.`

**Rule 4 — Technical specifics are trust signals, not jargon.**  
Keep `AES-256-GCM`, `Postgres RLS FORCE`, `Argon2id`. A CISO who sees these knows a real engineer wrote this page.  
✗ `Enterprise-grade encryption protects your data.`  
✓ `Per-tenant AES-256-GCM keys. A DB dump exposes nothing.`

**Rule 5 — Use contrast to differentiate, not comparison tables.**  
One contrast sentence beats three bullets.  
✗ `Unlike Glean, which is US-hosted and lacks India-stack integrations...`  
✓ `Glean searches. Anvax governs. Your examiner can't audit a search result.`

**Rule 6 — Only real numbers. No round ones.**  
82.6% test coverage is credible. "99%" is a template.  
✗ `Over 99% uptime. Enterprise-ready.`  
✓ `82.6% test coverage. CI gate at 80%. mypy --strict + tsc --strict, both enforced.`

### 6.3 Page-by-page rewrite scope

| Page | Key sections to rewrite |
|---|---|
| Home | Hero headline + lede; problem section; all 3 pillar cards; vision block; final CTA |
| Platform | Hero; all 4 capability rows; all 4 moat cards; India-stack section header |
| Industries | Hero; all 6 accordion intros + role tables |
| Trust | Hero; glance-cell subtexts; section intros for all 8 sections |
| Deployment | Hero; all 4 tier cards; commit-band copy |
| Pricing | Hero; all 4 plan descriptions; FAQ answers |
| Company | Hero; values descriptions; vision block |

---

## 7. SEO

Each page gets unique `<title>` and `<meta name="description">`:

| Route | Title | Description |
|---|---|---|
| / | Anvax — Sovereign AI for India's regulated enterprises | The AI workspace BFSI and NBFCs can run past their regulator. Search, chat, workflows — on your corpus, auditable by design. |
| /platform | Platform — Anvax | Four capabilities, four moats, and an India-stack that no US incumbent has wired in. |
| /industries | Industries — Anvax | NBFC-first vertical packs with RBI circular tracking, credit workflows, and role-based AI. |
| /trust | Architecture & Trust — Anvax | Full defence-in-depth, RBI FREE-AI mapping, DPDP controls, and honest certification status. |
| /deployment | Deployment — Anvax | SaaS to air-gapped. Same product, four tiers. All data stays in India. |
| /pricing | Pricing — Anvax | Starter from ₹35,000/mo. Growth, Business, and Sovereign tiers. |
| /company | Company — Anvax | Who we are, what we're building, and why we started with India's hardest market. |

---

## 8. Out of Scope

- Backend / form submission (forms remain decorative stubs; no API integration in this phase)
- Authentication / sign-in flow
- Blog or content management
- Animation library (existing CSS transitions are sufficient)
- Dark mode toggle

---

## 9. Acceptance Criteria

- [ ] `npm run build` produces a `dist/` with one `.html` file per route (vite-ssg output)
- [ ] All 7 pages render with correct content and styles on Vercel preview URL
- [ ] No `01 ·` or chapter counter renders anywhere on any page
- [ ] Each page has a unique `<title>` and `<meta name="description">`
- [ ] All 18 integration logos load on `/platform`
- [ ] The inference-trace hero card renders without wrapping or clipping on 1280px and 375px viewports
- [ ] Lighthouse Performance ≥ 90, SEO ≥ 95 on home page
- [ ] TypeScript: `tsc --noEmit` passes with zero errors
