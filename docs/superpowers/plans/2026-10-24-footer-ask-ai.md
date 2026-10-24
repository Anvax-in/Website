# Footer "Ask AI about Anvax" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 4th footer column, "Ask AI about Anvax," with five square monochrome
icon links (ChatGPT, Perplexity, Grok/X, Claude, Google AI Mode) that deep-link into
each service with a pre-filled prompt about Anvax.

**Architecture:** Pure presentational addition to the existing `Footer.tsx` /
`Footer.module.css` pair — one new local component (`AskAiColumn`), one new data
array, one grid-template-columns change, three new CSS rules. No new files, no new
tokens, no new dependencies.

**Tech Stack:** Next.js 15 / React 18 / CSS Modules, matching the rest of the repo.

**Spec:** `docs/superpowers/specs/2026-10-24-footer-ask-ai-design.md`

## Global Constraints

- Tokens only — every color/spacing/radius value below is an existing token from
  `src/styles/tokens.css`; no new token is introduced.
- Square corners — `--radius-sm` (`0px`), no new `border-radius`.
- No new npm dependency (icon paths are copied inline, not pulled from a package).
- `npx tsc --noEmit` must report 0 errors; `npm run build` must pass.
- Icon mark path data is sourced from the Simple Icons project (CC0 1.0 Universal —
  free to copy, no attribution required) via `cdn.jsdelivr.net/npm/simple-icons@latest`
  and `cdn.simpleicons.org`, fetched and verified 2026-10-24. These are solid
  logotype fills, not the codebase's usual stroked UI-icon convention (chevron,
  hamburger) — that's intentional: third-party brand marks are inherently solid
  glyphs, UI chrome icons are inherently stroked lines. Don't force these into
  `stroke="currentColor"`.

## Review Focus

- Icon-only links with no visible text rely entirely on `aria-label` for
  accessibility — every one of the five anchors needs a distinct, descriptive label
  (not just a shared generic one), or a screen reader user can't tell them apart.
- Dark background (`--ink-950`) default browser focus outlines are often low-contrast
  or invisible — add an explicit `:focus-visible` style using `--focus-ring` so
  keyboard users can see which tile is focused.
- `target="_blank"` without `rel="noopener noreferrer"` is a reverse-tabnabbing risk
  (the opened page can reach back via `window.opener`) — every one of the five links
  needs the `rel` attribute, not just some of them.
- The shared encoded query string is reused five times with a different URL
  parameter name each time (`prompt`, `q`, `text`, `q`, `q`) — a copy-paste slip that
  reuses the wrong parameter name for one service silently breaks only that one
  link (it'll open to a blank chat, no error), so each href needs checking against
  the table in the spec individually, not assumed-correct by pattern-matching the
  others.
- Adding a 5th item to a `display: grid` with an unchanged 2-column (960px) /
  1-column (560px) responsive template means the new column becomes a trailing
  orphan in the grid at 960px (alone in the left slot, nothing in the right) —
  confirm that reads as acceptable (it does, by design, per the spec) rather than
  as a layout bug when visually checking that breakpoint.

---

### Task 1: Ask-AI data + component in `Footer.tsx`

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Produces: a local `AskAiColumn()` component rendered as the 5th grid child,
  consuming `styles.colTitle` (existing), `styles.aiGrid` and `styles.aiTile` (new —
  defined in Task 2). No other task depends on this file's internals.

- [ ] **Step 1: Add the shared query constant and per-service link array**, above the
  existing `Col` function:

```tsx
const ASK_AI_QUERY =
  "I'm researching governed AI workspaces for regulated enterprises and want to know how Anvax combines self-hosted deployment, model-agnostic search and chat, and a full audit record to meet compliance requirements. Summarize the highlights from Anvax's website: https://www.anvax.in"

const askAiEncodedQuery = encodeURIComponent(ASK_AI_QUERY)

const askAi: { name: string; href: string; path: string }[] = [
  {
    name: 'ChatGPT',
    href: `https://chatgpt.com/?prompt=${askAiEncodedQuery}`,
    path: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z',
  },
  {
    name: 'Perplexity',
    href: `https://www.perplexity.ai/search/new?q=${askAiEncodedQuery}`,
    path: 'M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z',
  },
  {
    name: 'Grok',
    href: `https://x.com/i/grok?text=${askAiEncodedQuery}`,
    path: 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z',
  },
  {
    name: 'Claude',
    href: `https://claude.ai/new?q=${askAiEncodedQuery}`,
    path: 'M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z',
  },
  {
    name: 'Google',
    href: `https://www.google.com/search?udm=50&aep=11&q=${askAiEncodedQuery}`,
    path: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z',
  },
]
```

- [ ] **Step 2: Add the `AskAiColumn` component**, directly below `Col`:

```tsx
function AskAiColumn() {
  return (
    <div>
      <h4 className={styles.colTitle}>Ask AI about Anvax</h4>
      <div className={styles.aiGrid}>
        {askAi.map(({ name, href, path }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aiTile}
            aria-label={`Ask ${name} about Anvax`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Render it as the 5th grid child**, in `Footer()`'s `.grid` div,
  immediately after `<Col title="Company" links={company} />`:

```tsx
<Col title="Company"   links={company} />
<AskAiColumn />
```

- [ ] **Step 4: Verify types compile**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Ask AI about Anvax footer column"
```

---

### Task 2: Grid + icon tile styling in `Footer.module.css`

**Files:**
- Modify: `src/components/layout/Footer.module.css`

**Interfaces:**
- Consumes: Task 1's `styles.aiGrid` / `styles.aiTile` class name references.
- Produces: visual layout other tasks don't depend on.

- [ ] **Step 1: Widen the grid to 5 columns**

Change:
```css
.grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr 1fr 1fr;
  gap: var(--space-8);
}
```
to:
```css
.grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr 1fr 1fr 1fr;
  gap: var(--space-8);
}
```

- [ ] **Step 2: Add the icon-tile row and tile styles**, after the existing
  `.colLink:hover` rule:

```css
/* ---- ask-ai icons ---- */
.aiGrid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.aiTile {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ink-900);
  border: var(--rule-hair) solid var(--border-on-ink);
  border-radius: var(--radius-sm);
  color: var(--fg-on-dark-3);
  transition: color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}
.aiTile:hover { color: var(--paper); transform: translateY(-3px); }
.aiTile:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds with no new warnings about `Footer.module.css`.

- [ ] **Step 4: Visually verify at 1440px and 600px**

Run: `npm run dev`, open `localhost:3000`, scroll to the footer at both widths.
Expected: five icon tiles render in a row under "ASK AI ABOUT ANVAX" at 1440px
(uppercase via the existing `.colTitle` `text-transform`), the column wraps
sensibly into the existing 2-column (960px) / 1-column (560px) stacking, tiles are
square with no rounded corners, and hovering/tabbing to a tile shows the lift +
focus ring. Click one link (any) and confirm it opens the target service with the
Anvax query pre-filled in a new tab.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.module.css
git commit -m "style: layout for Ask AI about Anvax footer column"
```

## Self-Review Notes

- **Spec coverage:** placement (4th column) ✅ Task 1/2; heading ✅ Task 1 Step 2;
  monochrome/square/no-new-tokens ✅ Task 2; five confirmed URL formats ✅ Task 1
  Step 1; new-tab + `noopener` ✅ Task 1 Step 2.
- **Proportion:** the plan's code blocks are the exact, spec-fixed values (URLs,
  query text, brand-mark path data) — none of it is filler; there's no algorithm
  left for the implementer to invent, which is why the steps read as "paste this,"
  correctly.
