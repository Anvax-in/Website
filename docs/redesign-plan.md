# Homepage redesign — remaining work

Replaces the plan lost in the 11 Sep discard. That one said "copy this markup
from `index.html` into that component," which is the approach that failed. This
one ports from `docs/redesign-spec/`. Read `CLAUDE.md` first.

**Done** (branch `redesign/foundation`): tokens synced to the design system,
`Nav` and `Footer` rebuilt from the spec, Button primary moved to blue.

## Block → component map

The spec has 12 blocks. Blocks 0 and 11 are done.

| # | Spec block | Height | Inline styles | Today | Action |
|---|---|---|---|---|---|
| 0 | nav | 69px | 17 | `Nav` | done |
| 1 | hero | 1276px | 97 | `HeroSection` | rewrite |
| 2 | stats band (`0 Bytes` / `4.2M`) | 207px | 10 | — | **new** `StatsSection` |
| 3 | "Your people already use AI" | 666px | 18 | `ProblemSection` | rewrite |
| 4 | "One workspace. Three things" | 2441px | 185 | — | **new** `ProductSection` |
| 5 | "Reads the systems you already run" | 823px | 44 | — | **new** `ConnectorsSection` |
| 6 | "Three layers. One product." | 765px | 20 | `PillarsSection` + `ArchDiagram` | rewrite, merge |
| 7 | "One platform. Your infrastructure." | 961px | 21 | — | **new** `DeploymentSection` |
| 8 | "Your regulator, already mapped." | 724px | 46 | `IndustriesGrid` + `ComplianceStrip` | rewrite, merge |
| 9 | "The questions your security team asks first." | 585px | 4 | — | **new** `FAQSection` |
| 10 | "Bring your regulator into the room." | 531px | 9 | `CtaSection` | rewrite |
| 11 | footer | 490px | 33 | `Footer` | done |

`VisionSection` is retired — nothing in the redesign corresponds to it.

## Order

Cheapest and least risky first, so the conventions are settled before the
expensive blocks:

1. **Block 2** — `StatsSection`. 10 inline styles, a dark `ink-950` band. Small
   enough to establish the CSS Module conventions on.
2. **Block 10** — `CtaSection` rewrite. Uses `--gradient-cta`; confirms the new
   gradient token works in situ.
3. **Block 9** — `FAQSection`. 4 inline styles, but needs an accordion: use
   `<details>/<summary>` rather than React state, so it works without JS.
4. **Block 3** — `ProblemSection` rewrite, 4-column grid.
5. **Block 1** — `HeroSection` rewrite. 97 styles, and it contains the product
   mock panel. Check `shots/mobile-01.png` carefully; the mock needs to degrade,
   not shrink.
6. **Block 5** — `ConnectorsSection`. Logos live in
   `public/redesign/assets/logos/`; copy what you use into `public/assets/logos/`.
7. **Block 7** — `DeploymentSection`, 3-card layout.
8. **Block 8** — `JurisdictionSection`, merging the industries and compliance
   content.
9. **Block 6** — `PillarsSection` rewrite absorbing `ArchDiagram`.
10. **Block 4** — `ProductSection` last. 2441px and 185 inline styles, three
    stacked feature rows with alternating sides and a mock panel each. Do it once
    the patterns from every other block are settled.

Then update `src/app/page.tsx` to render blocks 1–10 in order and delete the
retired components.

## Per-block definition of done

- `npx tsc --noEmit` clean
- `npm run build` passes
- Rendered at 1440 **and** 600 and compared against `shots/desktop-NN.png` and
  `shots/mobile-NN.png`
- No raw hex and no `border-radius` in the new `*.module.css`
- Hover states present where `hover.json` has them

## Afterwards

The canvas folder has nine more artboards — Product, Search, Chat, Agents,
Governance, Connectors, Deployment, Security, Why Anvax. Point
`scripts/proto-extract.mjs` at each to get a spec before porting those pages.

Unrelated but worth noting while touching these pages: `/pricing` still carries
India-era copy ("data stays in India", "₹ INR"), which the Sept 2026 global
pivot supersedes. See `docs/positioning/`.
