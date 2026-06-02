# Gemification: Enriched Cards Design

**Date:** 2026-05-31  
**Scope:** `ArchDiagram` component + `HeroSection` inference trace panel  
**Files:** `src/components/sections/ArchDiagram.tsx`, `src/components/sections/ArchDiagram.module.css`, `src/components/sections/HeroSection.module.css`

---

## Goal

Add visual depth to two flat sections on the home page without changing layout or introducing animations. The design language stays consistent with the existing Anvax design system (ink/bone/amber/sage palette, Lucide icons already loaded).

---

## ArchDiagram

### 1. Lucide icons in each block

Each block gets a small icon container (20×20px, `border-radius: var(--radius-sm)`).

| Layer | Block | Icon |
|---|---|---|
| Application | Search | `search` |
| Application | Chat | `message-square` |
| Application | Workflows | `workflow` |
| Application | Agents | `bot` |
| Governance | PII redaction | `shield` |
| Governance | Prompt-injection gate | `zap` |
| Governance | Model gateway | `route` |
| Governance | Immutable audit | `link` |
| Knowledge core | Customer corpus | `database` |
| Knowledge core | India stack | `layers-3` |
| Knowledge core | Hybrid index | `network` |
| Knowledge core | Encrypted at rest | `key-round` |

Icon container background: `var(--bone-200)` for standard blocks, `var(--amber-100)` for governance (`.accent`) blocks.  
Icon size: 14px, color: `var(--ink-500)` standard / `var(--amber-700)` governance.

Block layout changes from `flex-direction: column` to `flex-direction: row` with `gap: 10px`, icon on the left, text stack on the right.

### 2. Hover lift on blocks

```css
.block {
  transition: transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out);
}
.block:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(11, 26, 42, 0.10);
  border-color: var(--bone-300);
}
.accent:hover {
  box-shadow: 0 4px 12px rgba(184, 132, 62, 0.18);
  border-color: var(--amber-600);
}
```

### 3. Amber highlight rail

A 3px solid `var(--amber-600)` left border on each `.meta` panel. This runs flush down the left edge of the diagram, visually tying all three layers together as one vertical accent stripe.

```css
.meta {
  border-left: 3px solid var(--amber-600);
}
```

No change to the `.meta` background, padding, or border-right.

---

## HeroSection — inference trace panel

### 1. Left amber-to-sage rail

A 2px vertical line inside `.schemaBody`, absolutely positioned on the left, spanning top to bottom of the body area. Gradient: `var(--amber-600)` at top fading to `var(--sage-700)` at bottom — reflects the semantic flow from input (amber/policy) to sealed output (sage/verified).

```css
.schemaBody {
  position: relative;
}
.schemaBody::before {
  content: '';
  position: absolute;
  left: 18px; top: 12px; bottom: 12px;
  width: 2px;
  background: linear-gradient(to bottom, var(--amber-600), var(--sage-700));
  border-radius: 2px;
  pointer-events: none;
}
```

Lane left padding increases to accommodate the rail: `padding-left: 36px`.

### 2. Lane hover

```css
.lane {
  transition: background var(--dur-fast) var(--ease-out);
  border-radius: var(--radius-sm);
}
.lane:hover {
  background: var(--bone-50);
}
```

### 3. Status dot color-coding

| Lane | Status dot color | Reason |
|---|---|---|
| Request | `var(--sage-700)` | Bound / accepted |
| Policy | `var(--amber-600)` | Action taken (redaction) — amber = active process |
| Route | `var(--sage-700)` | Pinned / resolved |
| Cite | `var(--sage-700)` | Verified |
| Trail | `var(--sage-700)` | Sealed |

Only the Policy lane changes from sage to amber.

---

## What does NOT change

- No layout changes (grid columns, row structure, meta panel width)
- No animations or keyframes added
- **One new dependency:** `lucide-react` must be added (`npm install lucide-react`). The project already uses Lucide icons in the static HTML files via CDN; `lucide-react` is the React-native equivalent. No other dependencies change.
- No changes to any page other than the home page (`src/pages/Home.tsx` renders both components)
- No changes to `trust.html`, `platform.html`, or other static HTML pages

---

## Implementation notes

- `ArchDiagram.tsx` data array needs an `icon` field added to each block object.
- Icons rendered with `lucide-react` named imports (e.g. `import { Search, MessageSquare } from 'lucide-react'`). Size prop: `size={14}`.
- `HeroSection.tsx` lane data needs a `statusVariant` field (`'amber' | 'sage'`) to drive the Policy lane's dot color via a CSS module class.
