# Redesign spec — generated, not hand-written

Everything in this folder is **output**. Do not edit it. Regenerate with:

```bash
node scripts/proto-extract.mjs public/redesign docs/redesign-spec
```

## Why this folder exists

`public/redesign/index.html` looks like HTML. It is not. It is a Claude Design
canvas artboard, and it contains a template language that only its own runtime
understands:

| In the canvas | What it is | What React does with it |
|---|---|---|
| `<sc-for list="{{ megaMenu }}" as="m">` | loop directive | nothing — unknown element |
| `<sc-if value="{{ wide }}">` | conditional | nothing |
| `{{ navGap }}`, `{{ ctaHero }}` | data binding | renders the literal text |
| `style-hover="background:var(--bone-100)"` | hover rule | ignored — not a DOM attribute |
| `class Component extends DCLogic` | component state | not React state |

Measured in the source: **419 inline `style=` attributes, 3 CSS classes, 12 `sc-for`,
5 `sc-if`, 20 `style-hover`, 77 `{{ }}` bindings, and 2 media queries** — both of
which are `!important` hacks targeting `div[style*="max-width:1240px"]`.

Copy-pasting that into `.tsx` throws no error. It silently renders wrong. That is
what went wrong the first time.

## What the extractor does

It loads `index.html` in headless Chromium **with the real dc-runtime** (`support.js`,
which mounts React), waits for hydration, kills the scroll-reveal and finishes every
CSS animation, then serialises the result. Verified output: `sc-*` elements remaining
**0**, unexpanded `{{ }}` **0**.

So what lands here is ordinary DOM you can read, diff, and port from.

## Contents

```
html/desktop/NN-<tag>.html   flattened markup at 1440px — loops expanded, no directives
html/mobile/NN-<tag>.html    same at 600px
shots/desktop-NN.png         per-section screenshot — the visual source of truth
shots/mobile-NN.png          same at 600px
shots/*-FULL.png             whole page
hover.json                   the 20 style-hover rules, recovered from the source
report.json                  block inventory + which blocks restructure by width
```

## The single most useful finding

Blocks were serialised at 1440 / 1000 / 600 and diffed. Only **two** change:

| # | Block | Desktop | Mobile | |
|---|---|---|---|---|
| 0 | `nav` | 3583 B | 2173 B | −39% — collapses to a hamburger |
| 1 | `header` (hero) | 18440 B | 18430 B | trivial |
| 2–11 | every other section | — | — | **byte-identical** |

The canvas does responsiveness in JavaScript (`wide = w >= 820`, `roomy = w >= 1140`)
and branches with `<sc-if>`. That machinery is confined to the nav.

**Consequence for the port:** only the nav needs React state. The other eleven blocks
have *no responsive behaviour to port at all* — their breakpoints do not exist yet and
must be written by hand as CSS. Do not go looking for them in the canvas.

## Token drift — fix before porting anything

The design system in `Enterprise design inspiration/_ds/…/tokens/` was generated
*from this repo* (`colors.css` line 2: "Copied verbatim from
anvax-website/src/styles/tokens.css"). Same names, same vocabulary. But the site
never picked up the redesign's extensions.

**Radii — the site is round, the design is square:**

| token | site today | design system |
|---|---|---|
| `--radius-sm` | `6px` | `0px` |
| `--radius-md` | `10px` | `0px` |
| `--radius-lg` | `14px` | `0px` |
| `--radius-button` | `8px` | `0px` |
| `--radius-chip` | *(undefined)* | `4px` |

**Missing entirely (41 tokens).** An undefined `var()` does not throw — CSS drops the
declaration, so a section that references these degrades silently:

- Type scale: `--type-hero-size/line/track`, `--type-h1…h5-size/line/track`,
  `--type-lede/body/prose/small/caption/micro-size`, `--type-label-size/track`,
  `--type-pill-size/track`
- Weights: `--weight-regular/medium/semibold/bold/black`
- Structure: `--rule-hair`, `--rule-strong`, `--section-pad-y`, `--nav-height`
- Surface: `--gradient-cta`, `--wash-hero`, `--wash-alt`, `--sheen-primary`,
  `--sheen-accent`, `--hover-wash`, `--texture-lattice`, `--nav-bg`, `--nav-blur`
- Roles: `--text-heading`, `--text-body`, `--text-muted`, `--text-link`
- Spacing gaps: `--space-5`, `--space-9`

## How to port a section

1. Open `shots/desktop-NN.png` — that is the target.
2. Open `html/desktop/NN-<tag>.html` — read structure and values off it.
3. Write `SectionName.tsx` + `SectionName.module.css` by hand. Inline styles become
   class rules. Every colour, size and space resolves to a token — no raw hex.
4. Write the breakpoints yourself against `shots/mobile-NN.png`. They are not in the
   canvas.
5. Pull hover states from `hover.json` into real `:hover` rules.
6. `npx tsc --noEmit`, then compare `localhost:3000` against the screenshot.

Never paste canvas markup into a component.
