# Footer "Ask AI about Anvax" — Design

**Owner:** Yogesh. **Source:** brainstorming conversation 2026-10-24, modeled on a
screenshot of a reference site's ("Nimbus") footer widget, with the exact deep-link
URL formats confirmed by Yogesh from that site's actual page source.

## Intent

A GEO (generative-engine-optimization) convenience block: let a visitor one-click
into ChatGPT/Perplexity/Grok/Claude/Google with a pre-filled prompt that already
contains Anvax's positioning and URL, instead of typing it themselves.

## Current state (verified against the repo 2026-10-24)

- `src/components/layout/Footer.tsx` renders a `.grid` with 4 children: a wide brand
  block + three `<Col title links>` columns (Product / Solutions / Company).
  `Footer.module.css` `.grid` is `grid-template-columns: 1.7fr 1fr 1fr 1fr`, with
  breakpoints at 960px (`1fr 1fr`) and 560px (`1fr`).
- No icon library is actually wired up (`lucide-react` is in `package.json` but
  unused). Every icon in the codebase — see `Nav.tsx` — is a hand-rolled inline SVG:
  `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth` 2 or
  2.5, `strokeLinecap="round"` (often `strokeLinejoin="round"` too), explicit
  `width`/`height`, `aria-hidden="true"`.
- `tokens.css` radii are all `0px` except `--radius-chip` (4px) and `--radius-pill`.
  No `--icon-*`/`--tile-*` tokens exist. The footer sits on `--ink-950`; on-dark
  foreground tokens available: `--fg-on-dark` (near-white), `--fg-on-dark-dim`,
  `--fg-on-dark-2` (muted, used for column titles today), `--fg-on-dark-3` (links).
- No existing icon-tile/button component in `src/components/ui/`. The closest visual
  precedent is `ConnectorsSection.module.css`'s `.tile` (flat `--paper` background, no
  radius, hover = `translateY(-3px)`, no color-swap hover) — the convention this
  codebase uses for "square tile" hover affordance.

## Decisions

1. **Placement.** A genuine 4th column, not a reuse of the bottom legal bar. The
   `.grid` column template goes from `1.7fr 1fr 1fr 1fr` to `1.7fr 1fr 1fr 1fr 1fr`;
   the 960px and 560px breakpoints need a new rule added (they currently collapse to
   2 columns / 1 column — decide the wrap order when implementing: brand block stays
   full-width, the four link columns wrap 2x2 at 960px, matching the existing visual
   rhythm rather than inventing a new one).
2. **Heading.** `"ASK AI ABOUT ANVAX"` — same mono/eyebrow treatment as the other
   three column titles (reuse the `Col` title styling, not a new type style).
3. **Icons — five, monochrome, square, no new brand-color tokens.** Single ink/on-dark
   color (reuse `--fg-on-dark-3`, the existing "links on ink-950" token — matches what
   the three other footer columns already use for their link color, so the new
   column doesn't introduce a visual inconsistency). `0` radius (no new radius token
   needed, tokens.css already defines `--radius-sm: 0px`). Hover: match the
   `ConnectorsSection` precedent (`translateY` lift) rather than inventing a new hover
   language, since there's no existing icon-hover-color convention to extend.
4. **Icon marks.** Hand-rolled inline SVG per the Nav.tsx convention
   (`viewBox="0 0 24 24"`, `stroke="currentColor"`, `fill="none"`) for: OpenAI swirl
   (ChatGPT), Perplexity mark, X logo (Grok), Claude asterisk mark, Google "G". Simple
   enough silhouettes at icon size that a monochrome stroke/fill rendering reads fine
   — this is the same bar every other icon in the codebase already clears.
5. **Links** — confirmed working formats from the reference site, query text swapped
   to Anvax's actual positioning, all `target="_blank" rel="noopener noreferrer"`:

   | Service | URL |
   |---|---|
   | ChatGPT | `https://chatgpt.com/?prompt=<query>` |
   | Perplexity | `https://www.perplexity.ai/search/new?q=<query>` |
   | Grok (X) | `https://x.com/i/grok?text=<query>` |
   | Claude | `https://claude.ai/new?q=<query>` |
   | Google AI Mode | `https://www.google.com/search?udm=50&aep=11&q=<query>` |

   `<query>` (URL-encoded, identical across all five):
   > "I'm researching governed AI workspaces for regulated enterprises and want to
   > know how Anvax combines self-hosted deployment, model-agnostic search and chat,
   > and a full audit record to meet compliance requirements. Summarize the
   > highlights from Anvax's website: https://www.anvax.in"

   Build the query string once as a shared constant, `encodeURIComponent` it per
   link — don't hand-encode five copies of the same string.

## Non-goals

- No new npm dependency (no icon library pulled in despite `lucide-react` sitting
  unused in `package.json` — that's a separate, unrelated cleanup if ever done).
- No brand-color icon tiles — monochrome only, per the tokens-only / no-new-colors
  house rule.
- No changes to `Nav.tsx` or any other footer column's existing content.
