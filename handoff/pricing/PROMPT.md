# Claude Code prompt: Anvax pricing page

Paste this into Claude Code from the root of the Anvax-in/Website repo, with this `pricing/` folder copied into the repo (e.g. `design/pricing/`).

---

Build a new `/pricing` page in this Next.js 15 App Router site from the design mockup at `design/pricing/Anvax Pricing.dc.html`.

**Source of truth**
- The mockup is HTML with inline styles and a small logic class at the bottom (`class Component`). Treat the markup as the visual spec and the logic class as the calculator spec. Do not ship the `.dc.html` file or `support.js`.
- Match the existing site conventions: CSS Modules, tokens from `src/styles/tokens.css`, existing `Nav`, `Footer` and `Button` components. Convert inline styles to a `Pricing.module.css`. Do not add a CSS framework.
- Copy `design/pricing/assets/*.png` to `public/compare/` (skip any file that already exists there from the comparison pages).

**Structure** — `src/app/pricing/page.tsx` (server component, with `metadata`) composed of:
1. `PricingHero` — headline, lede, two CTAs, and the static "Annual cost · 1,000 employees" card. Compute its rows from the shared pricing data at build time.
2. `SavingsCalculator` (`"use client"`) — headcount slider, competitor toggles, per-tool cost bars with savings text, Anvax row, and the dark "You save, every year" box showing the average dollar saving (no percentage in that box).
3. `CostCurveChart` (`"use client"`, reads the same seat state, or render it static with a marker prop) — inline SVG, 0–2,000 employees, flat Anvax line, breakeven circles, caption listing breakevens.
4. `BeyondSeatPrice` — 2×2 grid of competitor cards (one column on mobile).
5. `OneFeePanel` — dark left panel + "Included" / "You provide" lists.
6. `PricingFaq` — accordion, five items, first open by default.
7. Closing CTA band (reuse the existing CTA band component if one exists).

**Shared data** — create `src/lib/pricing.ts` exporting:
```ts
export const ANVAX_ANNUAL_FEE_USD = 72000; // PLACEHOLDER — confirm before launch
export const SHOW_ANVAX_FEE = false;
export const MIN_SEATS = 200, MAX_SEATS = 10000, DEFAULT_SEATS = 500;
export const competitors = [
  { id: 'copilot', name: 'Microsoft 365 Copilot', logo: '/compare/copilot-logo.png', ratePerUserMonth: 30, minSeats: 1 },
  { id: 'chatgpt', name: 'ChatGPT Enterprise',    logo: '/compare/chatgpt-logo.png', ratePerUserMonth: 60, minSeats: 150 },
  { id: 'claude',  name: 'Claude Enterprise',     logo: '/compare/claude-logo.png',  ratePerUserMonth: 40, minSeats: 1 },
  { id: 'glean',   name: 'Glean',                 logo: '/compare/glean-logo.png',   ratePerUserMonth: 50, minSeats: 100 },
];
export const annualCost = (c, seats) => c.ratePerUserMonth * 12 * Math.max(seats, c.minSeats);
```
Copy each competitor's `note`, chart `color` and `dash` values from the mockup's logic class.

**Calculator behaviour** (port exactly from the logic class)
- Slider is 0–1000 mapped logarithmically to 200–10,000 seats: `raw = 200 * 50^(s/1000)`, rounded to 50 below 1,000, 100 below 5,000, 500 above. Tick labels: 200 · 750 · 2,700 · 10,000.
- Bars are scaled to the largest selected cost (including the Anvax fee).
- Row text: "Anvax saves $X a year (Y%)" when positive, else "Per-seat costs less at this headcount" in clay `#A8543A`.
- When `SHOW_ANVAX_FEE` is false, the Anvax row label reads "One flat fee" and no fee number is rendered anywhere in the HTML.
- Format USD with `en-US` grouping.

**Copy** — use the mockup text verbatim, including the dated source note under the FAQ.

**Wiring**
- Add "Pricing" to the main nav (between Security and Blog) and to the footer Product column; add a "Compare" footer column linking the four `/compare/*` pages if they exist.
- Primary CTAs ("Get a quote", "Talk to us") link to the existing contact/demo route.
- Add `/pricing` to the sitemap.

**Quality bar**
- Fully responsive down to 360px; slider and toggles keyboard-accessible with visible `:focus-visible` rings.
- Respect `prefers-reduced-motion` for bar transitions.
- No layout shift on load; `next/image` for logos.
- Run `npm run build` and `npm run lint` and fix anything they flag.

Before writing code, list any conflicts with existing routes, components or tokens and wait for my go-ahead.
