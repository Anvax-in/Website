# Anvax Design System

Anvax builds a **sovereign AI workspace for India's regulated enterprises** — BFSI, NBFCs,
wealth, lending, insurance, broking and payments. The product line is: search, chat, workflows
and agents running on the customer's own corpus, with governance (PII redaction, prompt-injection
gating, model gateway, immutable audit) wired into the data path rather than bolted on, and every
byte kept inside India.

The positioning line the whole brand hangs off: *"The AI workspace BFSI and NBFCs can run past
their regulator."*

## Products represented

| Surface | Status in this system |
| --- | --- |
| **Marketing website** (anvax.in) — home, platform, industries, trust, deployment, company, contact, and the *Sovereign Stack* blog | Fully covered: tokens, components, and a five-screen UI kit |
| **The product itself** (the AI workspace) | **No source available.** No application code, screenshots or Figma files were provided, so no product UI kit exists here. See Caveats. |

## Sources used

- **Attached codebase** `anvax-website/` — a Next.js 15 App Router site with CSS Modules.
  Read in full: `src/styles/tokens.css`, `src/styles/global.css`, `src/components/ui/*`,
  `src/components/layout/*`, `src/components/blog/*`, all eight `src/components/sections/*`,
  `src/app/page.tsx`, `src/app/platform/page.tsx`, `src/pages/*.module.css`, and
  `content/blog/*.md`.
- **GitHub repository** <https://github.com/Anvax-in/Website> — the upstream home of that codebase.
  Explore it directly for anything this system abbreviates: the Trust, Deployment, Industries and
  Pricing pages have real implementations there that were not recreated here.
- **Live site** <https://www.anvax.in/> — referenced for product copy and page inventory.

Nothing was recreated from a screenshot; every value below is copied from source.

---

## CONTENT FUNDAMENTALS

**Voice.** Anvax writes like a practitioner briefing another practitioner — a compliance officer
talking to a CISO. Declarative, specific, unhurried. No exclamation marks, no hype adjectives,
no "revolutionary" or "seamless". The reader is assumed senior and busy.

**Person.** Second person for the customer, first person plural for Anvax, and both are used
sparingly. *"Your analysts search, chat, and run workflows on your own corpus, not someone
else's cloud."* / *"We don't sell horizontally and call it a fit."* Never "I".

**Casing.** Sentence case everywhere in product and marketing copy — headings, buttons, eyebrows,
table headers (the only uppercase is the 10-11px mono label, which is uppercased by CSS, not by
the writer). Blog post titles are the exception: they are title case, because they are editorial.

**Sentence shape.** Headlines are complete sentences that end in a full stop, and often come in
pairs where the second sentence reverses or completes the first:

- "Three layers. One product."
- "NBFC first. Then the rest of regulated India."
- "Employees want to move fast with AI. IT can't enable it safely."
- "The compliance layer is not a feature you configure. It is the foundation."
- "Bring your regulator into the room."

**Proof over adjective.** Claims are always followed by the mechanism. Not "enterprise-grade
security" but *"AES-256-GCM · per-tenant DEK"*, *"SHA-256 chained"*, *"P95 < 1.4 s end-to-end
including model call"*, *"RAG with top-k=12, context window 128 K"*. Named regulations do the
persuading: RBI, SEBI, IRDAI, DPDP Act 2023, CERT-In, RBI FREE-AI, Account Aggregator, GST Portal,
MCA21, DigiLocker, NPCI.

**Status honesty.** Nothing is claimed as shipped when it isn't. Roadmap state is written into the
UI — `Live` / `Next` / `Roadmap` tags, "CERT-In (in progress)", "Architecture · Conceptual",
"Industries · Year 1 rollout". A reader can always tell what exists today.

**Spelling.** Indian/British English: *organisation, summarise, democratising, prioritise*.
Currency and identifiers are Indian: Aadhaar, PAN, GSTIN, IFSC, UPI, CKYC. Dates render as
`en-IN` short form — "21 Jul 2026".

**Punctuation habits.** A middot with spaces joins facets in eyebrows and meta lines:
*"Sovereign AI · Built for India's regulators"*, *"21 Jul 2026 · 7 min read"*. Colons introduce
enumerations. Em dashes are used, but not as a tic. Arrows (→) end link text.

**Blog (Sovereign Stack) voice.** Longer, more argumentative, still evidence-first. It reframes
rather than announces — *"Shadow AI is a visibility problem about where decisions come from"* —
and lands a compressed line the reader can quote: *"A missing entry in a model inventory is not a
documentation gap. It is a governance gap wearing a documentation costume."* Section headings are
title case and conversational ("First, Let's Be Clear About What We're Talking About").

**Emoji.** Almost never — and only as a decorative glyph inside a bone-200 square tile, never in
running text. The four "moat" cards on `/platform` are the single instance in the entire
codebase (🧠 🇮🇳 🏦 📋). Treat them as a legacy exception, not a pattern to extend; the house
style is a stroke icon on a coloured square.

---

## VISUAL FOUNDATIONS

**The idea.** Institutional, examinable, unembellished. The site reads like a well-set regulatory
document: hairline grids, square corners, black type on bone, and colour used strictly as
information. It is deliberately not a "startup gradient" site.

### Colour

Charcoal is the brand colour. `--ink-900 #1F252E` is the dark band, the primary type colour and
the primary CTA all at once. Neutrals are the warm-grey **bone** ramp (`#FFFFFF → #CFCDCC`),
never a cool grey.

Two saturated colours carry meaning, and only meaning:

- **Blue `#2F6FED`** — the application layer, and the `Next` shipping status.
- **Teal `#0D8A7E`** — the knowledge core, and the `Live` status. Also `--positive`.

Clay `#A8543A` and rust `#8B2E1F` exist only for warning and danger. There is no purple, no
violet, no pink, and no blue-to-purple gradient anywhere in the codebase.

A naming quirk to know: the `--amber-*` ramp no longer holds amber. When the brand moved off a
warm palette, those variables were re-pointed at charcoal (`--amber-600: #1F252E`), so
`--accent` is charcoal. The names were kept for compatibility. One vestige survives — the
Contact hero still layers a `rgba(184,132,62,0.18)` amber radial glow.

Only one or two background colours appear per page: white/bone for content, `--ink-900` for
heroes and the footer band, and a single `--blue-100` compliance strip on the homepage.

### Type

**Archivo** (Google Fonts, weights 400/600/700/800) for everything, and **Geist Mono** for meta,
status, table headers and inline terms. `--font-serif` is an alias for Archivo: a Neco display
serif used to be the display face and the variable is still referenced by heading rules, so
inner-page `h1`s render as Archivo 400 at large sizes — visibly lighter than homepage headings,
which are 800.

- Homepage headings: Archivo **800**, tight tracking (-0.015em to -0.03em). Hero clamps 36→68px.
- Inner-page heroes and blog headings: Archivo **400** at 44-50px (the `--font-serif` path).
- Body 16/26; prose 17/28; lede 20/30 in `--ink-500`, capped at 52-58ch.
- Mono labels: 12px meta, 11px table heads, 10px uppercase status pills at 0.08em tracking.
- Body copy caps at 52-64ch; headings at 20-32ch.

### Shape, borders, cards

**Everything is square.** `--radius-sm/md/lg/button` are all `0px`. The only exceptions are the
4px inline mono chip (`Term`) and the 999px pill (`StatusPill`, blog tags, the RSS chip).

Structure comes from rules, not shadows:

- **1px** hairlines inside grids — achieved with `gap: 1px` over a `--border` background, so the
  grid lines are the gaps.
- **2px** rules between major bands, under the nav, above the footer, and between architecture rows.

Cards are flat at rest: white or bone-100 fill, a 1px border or no border at all, and **no
shadow**. Shadow appears only on hover. There are no rounded-corner-plus-coloured-left-border
cards anywhere.

### Backgrounds and texture

- Light pages: white with a near-invisible ink wash (`--wash-hero`, 2.5% → 0%), or bone-100 with
  a soft radial (`--wash-alt`, 4% → 0%).
- Dark heroes (Platform, Blog, Contact): `--ink-900` plus **`assets/lattice.svg`** tiled at
  220px at **6% opacity** — the one texture in the system.
- One saturated gradient in the whole site: the closing CTA band,
  `linear-gradient(135deg, var(--blue) 0%, var(--ink-900) 100%)`.
- Primary and accent buttons carry a 1px-scale vertical sheen gradient, not a colour ramp.
- No photography. Imagery is confined to blog headers: flat, diagrammatic, editorial
  illustrations on a light ground in navy and blue — cool, clean, no grain, no gloss.

### Motion

Two durations and one curve, for everything: `--dur-fast 120ms`, `--dur-base 180ms`,
`--ease-out cubic-bezier(0.2, 0, 0, 1)`. No bounce, no spring, no scroll-triggered reveals, no
entrance animations, no parallax. Only colour, border, shadow and small translations are animated.

### Interaction states

- **Link hover**: colour shifts to `--amber-700` (`#12151A`, i.e. near-black).
- **Primary button hover**: `ink-900 → ink-700`. **Accent**: `amber-600 → amber-700`.
  **Secondary**: fills bone-100 and the border darkens to ink-900.
- **Card hover**: `translateY(-4px)` + `--shadow-md`.
- **Row hover** (architecture, industries): a 4% ink wash plus `padding-left: 8px` — the row
  physically nudges right.
- **Chip hover**: border takes the layer colour, `translateY(-2px)`, `--shadow-sm`.
- **Icon hover** (architecture only): `scale(1.12) rotate(6deg)`.
- **Arrow affordance**: the trailing → in a button slides 2px right.
- **Press states**: none are defined in source — no active colour, no scale-down. Don't invent one.
- **Focus**: `2px solid var(--focus-ring)` at `2px` offset, on `:focus-visible` only.

### Transparency and blur

Used exactly once: the sticky nav is `rgba(255,255,255,0.88)` with
`backdrop-filter: blur(18px) saturate(140%)`. Nothing else in the system blurs. On dark bands,
transparency carries type and borders instead of new colours — `rgba(255,255,255,0.68)` for dim
text, `0.14` for borders, `0.32` for the secondaryDark button edge.

### Layout

1240px max content width, 72px gutters (24px below 960px), 64px vertical band padding. The nav is
the only fixed/sticky element (64px, `z-index: 30`). Grids are 3-up (pillars, industries,
compliance, blog) or 4-up (problem cards), collapsing to 2 then 1. Section heads are always
left-aligned; only the Problem band and the inner-page heroes centre their text.

---

## ICONOGRAPHY

**System.** Hand-declared 24×24 stroke paths, Lucide-compatible geometry: `stroke-width="2"`,
`stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`. There is **no icon font, no
sprite sheet and no npm icon package** in the codebase — each section file declares its paths
inline as data alongside its copy.

Those exact paths are collected verbatim into `components/core/Icon.jsx` (22 named glyphs:
search, chat, workflow, agent, shield, layers, gateway, audit, corpus, lock, residency, bank,
trend, rupee, bars, card, …). Use `<Icon name="…" />` rather than pasting new SVG. If you need a
glyph the set doesn't have, take it from **Lucide** — same geometry, same stroke weight — and
note the addition.

**Presentation.** The house pattern is a filled square, 30 / 34 / 40px, in the layer colour
(`--blue` application, `--ink-900` governance, `--teal` knowledge), holding a white 16-20px
icon. Squares, not circles — the one circular tile in the system is the 34px layer marker in the
architecture diagram.

**Third-party marks.** Real logos, copied as-is into `assets/logos/` (mixed SVG / PNG / JPG, as
the site ships them): RBI, SEBI, IRDAI, GST Portal, MCA21, NPCI/UPI, DigiLocker, Account
Aggregator, Tally, Zoho Books, BUSY, Salesforce, Slack, Confluence, Snowflake, Google Drive,
SharePoint. They sit on white tiles in a 1px hairline grid, capped at 32px tall / 80px wide,
`object-fit: contain`. Where no logo exists, the site falls back to a 2-letter mono monogram in a
bone-200 square (e.g. `CK` for CKYC) — copy that fallback rather than drawing a mark.

**Unicode as icon.** Used deliberately and often: `→` for forward links and buttons, `←` for
back, `·` as a separator, `✓` in the contact success state, `⌘K` in the chat spec.

**Emoji.** See Content Fundamentals — four legacy instances on `/platform`, nowhere else.

**Logos.** `assets/anvax-icon.png` (the mark), `assets/anvax-logo.png`,
`assets/anvax-wordmark-ink.svg`, `assets/anvax-wordmark-bone.svg`,
`assets/anvax-wordmark-text.svg`, `assets/favicon.svg`. The lockup used across the live site is
the 36px icon next to "Anvax" set in Archivo 800 at -0.03em — not the SVG wordmark.

---

## Index

### Root

| File | What it is |
| --- | --- |
| `styles.css` | Global entry point — `@import` lines only. Link this one file. |
| `thumbnail.html` | Homepage tile for this design system. |
| `readme.md` | This file. |
| `SKILL.md` | Agent Skills manifest, for use in Claude Code. |
| `github.md` | Upstream repo association and screen map. |

### Tokens (`tokens/`)

`fonts.css` (Archivo + Geist Mono from Google Fonts) · `colors.css` · `typography.css` ·
`spacing.css` (spacing, radii, layout, rule widths) · `effects.css` (shadows, motion, washes,
lattice) · `base.css` (reset plus the `.container`, `.section`, `.term`, `.lede` utilities the
site relies on).

### Components (`components/`)

| Group | Components |
| --- | --- |
| `core/` | `Button`, `Eyebrow`, `SectionHead`, `Tag`, `StatusPill`, `Term`, `Icon` |
| `layout/` | `Nav`, `Footer` |
| `blog/` | `BlogCard`, `Pagination` |

This is exactly the inventory `anvax-website/src/components/` defines, with one exception.

**Intentional additions**

- `Icon` — the codebase has no icon component; each section declares raw SVG paths inline. `Icon`
  collects those exact paths under names so a designer can reach a glyph without copying SVG.

Not built, because the source doesn't define them: no Modal, Tooltip, Toast, Avatar, Tabs, Select,
Checkbox, Radio or Switch. The site's only form controls are the Contact inputs, which live in the
UI kit rather than as primitives (they are page-specific in source too).

The eight homepage `sections/*` components are page compositions, not primitives, so they live in
the UI kit — see `ui_kits/website/HomeScreen.jsx`.

### UI kits (`ui_kits/`)

- `website/` — five click-through screens of anvax.in: Home, Platform, Blog index, Blog post,
  Contact. See `ui_kits/website/README.md`.

### Guidelines (`guidelines/`)

24 specimen cards feeding the Design System tab, grouped **Colors** (ink, bone, blue, teal,
state, semantic aliases, layer coding), **Type** (display, heading ladder, body, mono, weights),
**Spacing** (scale, radii, layout, rules), **Effects** (shadows, motion, washes, blur), and
**Brand** (wordmark, lattice, connector logos, editorial imagery).

### Assets (`assets/`)

Logos and the mark at the root, `logos/` for regulator and connector marks, `blog/` for four
representative editorial headers, `lattice.svg` for the dark-hero texture.

---

## Caveats

- **Fonts are CDN, not self-hosted.** The site loads Archivo through `next/font/google` and Geist
  Mono through the `geist` npm package; no binaries for either ship in the repo, so
  `tokens/fonts.css` imports both from Google Fonts. If you have licensed WOFF2 files, drop them
  in and swap the `@import` for `@font-face` rules. The repo does contain
  `GeneralSans-Variable.woff2` and `Neco-Variable.woff2`, but no CSS rule references them any
  more — they are retired faces, not the current brand.
- **No product UI.** Only the marketing site was provided. The workspace itself (search, chat,
  workflows, agents) has no design source here.
- **Five of ten site pages** are recreated. Trust, Deployment, Industries, Pricing and Company
  render an explicit placeholder in the UI kit rather than an invented design.
- **The `--amber-*` / `--clay-*` / `--rust-*` names are historical.** Read the value, not the name.
