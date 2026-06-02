# Animated Trace Execution Design

**Date:** 2026-05-31  
**Scope:** `HeroSection` inference trace panel — animation + icons  
**Files:** `src/components/sections/HeroSection.tsx`, `src/components/sections/HeroSection.module.css`

---

## Goal

Replace the static inference trace card with a live-executing animation: steps slide in one by one as if the system is running in real time, the left rail grows as each step completes, status badges pop in after each step resolves. Loops automatically — no user interaction required.

Inspired by Harvey.ai's hero section pattern: a live product visualization that demonstrates the system working, not a static screenshot.

---

## Animation behaviour

- **5 steps**, each appearing sequentially
- **Step interval:** 700ms between each step appearing
- **Loop pause:** 3200ms after all 5 steps are visible, then resets to 0 and repeats
- **No replay button** — continuous loop only
- On mount: starts with `visibleCount = 0`, begins incrementing after a short delay

---

## State & logic (`HeroSection.tsx`)

Add `useState` and `useEffect` from React:

```tsx
const [visibleCount, setVisibleCount] = useState(0)

useEffect(() => {
  const STEP_MS = 700
  const PAUSE_MS = 3200
  const t = setTimeout(
    () => setVisibleCount(c => c < lanes.length ? c + 1 : 0),
    visibleCount === lanes.length ? PAUSE_MS : STEP_MS
  )
  return () => clearTimeout(t)
}, [visibleCount])
```

Lane data moves outside the component (it's static). Each lane object gets an `icon: LucideIcon` field.

**Icon mapping (Set A — Technical/Security):**

| Lane | Icon (lucide-react) |
|---|---|
| Request | `ArrowRight` |
| Policy | `Shield` |
| Route | `Zap` |
| Cite | `FileText` |
| Trail | `Lock` |

---

## JSX structure changes

### Rail
Remove the `::before` CSS pseudo-element approach. Replace with a real `<div>`:

```tsx
<div
  className={styles.rail}
  style={{ transform: `scaleY(${visibleCount / lanes.length})` }}
/>
```

`scaleY(0)` = no rail visible. `scaleY(1)` = full rail. Grows smoothly as `visibleCount` increases.

### Lanes
Each lane gains:
1. A `laneVisible` class when `index < visibleCount`
2. A `<span className={styles.laneIcon}>` column before the tag, rendering the Lucide icon at `size={13} strokeWidth={1.75}`
3. Policy lane icon gets `styles.laneIconGov` for amber tint

```tsx
{lanes.map(({ step, label, sub, status, statusVariant, icon: Icon }, index) => (
  <div
    key={step}
    className={`${styles.lane} ${index < visibleCount ? styles.laneVisible : ''}`}
  >
    <span className={`${styles.laneIcon} ${step === 'Policy' ? styles.laneIconGov : ''}`}>
      <Icon size={13} strokeWidth={1.75} />
    </span>
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
```

---

## CSS changes (`HeroSection.module.css`)

### Remove
`.schemaBody::before` — replaced by the real `.rail` div.

### Add `.rail`
```css
.rail {
  position: absolute;
  left: 14px; top: 12px; bottom: 12px;
  width: 2px;
  background: linear-gradient(to bottom, var(--amber-600), var(--sage-700));
  border-radius: 2px;
  transform: scaleY(0);
  transform-origin: top center;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}
```

### Add `.laneIcon` and `.laneIconGov`
```css
.laneIcon {
  width: 22px; height: 22px;
  border-radius: var(--radius-sm);
  background: var(--bone-200);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: var(--ink-500);
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.2s ease 0.12s, transform 0.2s ease 0.12s;
}
.laneIconGov {
  background: var(--amber-100);
  border-color: var(--amber-500);
  color: var(--amber-700);
}
.laneVisible .laneIcon { opacity: 1; transform: scale(1); }
```

### Update `.lane` grid
Change `grid-template-columns: 88px 1fr auto` to `grid-template-columns: 22px 72px 1fr auto`.  
Add default hidden state and transition:
```css
.lane {
  /* existing properties retained */
  grid-template-columns: 22px 72px 1fr auto;
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.32s ease,
    transform 0.32s ease,
    background var(--dur-fast) var(--ease-out);
}
```

### Add `.laneVisible`
```css
.laneVisible { opacity: 1; transform: none; }
```

### Update status badge defaults + reveal
Both `.laneStatus` and `.laneStatusAmber` get hidden-by-default + delayed reveal:
```css
.laneStatus, .laneStatusAmber {
  /* existing properties retained */
  opacity: 0;
  transform: scale(0.82);
  transition: opacity 0.22s ease 0.28s, transform 0.22s ease 0.28s;
}
.laneVisible .laneStatus,
.laneVisible .laneStatusAmber { opacity: 1; transform: scale(1); }
```

---

## What does NOT change

- No layout changes to the hero row, headline, CTA, or trust strip
- No changes to `ArchDiagram`, `PillarsSection`, or any other component
- `lucide-react` already installed (Task 1 of previous plan)
- The `statusVariant` field and `.laneStatusAmber` class from the previous implementation are preserved
- Mobile breakpoint (`@media (max-width: 960px)`) is untouched
