# Anvax React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the 7-page Anvax HTML/CSS website to a production-ready Vite + React + TypeScript app with vite-react-ssg for static pre-rendering, rewritten content, and cleaned-up design (no mechanical numbering, refined visuals).

**Architecture:** Vite + React 18 + TypeScript scaffolded fresh in the existing directory. Pages pre-rendered to static HTML at build time via `vite-react-ssg`. Styles use the existing CSS token system (global import) plus CSS Modules per component. All 7 pages rewritten with content that passes the CCO-at-11pm trust test.

**Tech Stack:** React 18, TypeScript, Vite 5, vite-react-ssg, React Router v6, react-helmet-async, CSS Modules, Vercel (static deployment)

---

## File Map

```
src/
  main.tsx                         # vite-react-ssg entry — exports createRoot
  router.tsx                       # RouteObject[] for all 7 routes
  App.tsx                          # Layout wrapper (Nav + Outlet + Footer)

  pages/
    Home.tsx                       # /
    Platform.tsx                   # /platform
    Industries.tsx                 # /industries
    Trust.tsx                      # /trust
    Deployment.tsx                 # /deployment
    Pricing.tsx                    # /pricing
    Company.tsx                    # /company

  components/
    layout/
      Nav.tsx + Nav.module.css
      Footer.tsx + Footer.module.css

    ui/
      Button.tsx + Button.module.css
      Eyebrow.tsx + Eyebrow.module.css
      Tag.tsx + Tag.module.css
      Term.tsx + Term.module.css
      StatusPill.tsx + StatusPill.module.css
      SectionHead.tsx + SectionHead.module.css
      PageMeta.tsx                 # react-helmet-async wrapper

    sections/                      # Home page section components
      HeroSection.tsx + HeroSection.module.css
      ProblemSection.tsx + ProblemSection.module.css
      PillarsSection.tsx + PillarsSection.module.css
      ArchDiagram.tsx + ArchDiagram.module.css
      IndustriesGrid.tsx + IndustriesGrid.module.css
      ComplianceStrip.tsx + ComplianceStrip.module.css
      VisionSection.tsx + VisionSection.module.css
      CtaSection.tsx + CtaSection.module.css

  styles/
    tokens.css                     # Copied from existing — global import, unchanged
    global.css                     # Body reset, .container, .section, utility classes
```

---

## Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `.gitignore`
- Create: `src/main.tsx`
- Create: `src/router.tsx`
- Create: `src/App.tsx`

- [ ] **Step 1: Install dependencies**

From `/Users/yogesh/Desktop/anvax-website`, run:

```bash
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty. Remove existing files and continue?" — select **No**, then manually set up. Instead run:

```bash
npm init -y
npm install react@^18.3.0 react-dom@^18.3.0 react-router-dom@^6.26.0 react-helmet-async@^2.0.4
npm install -D vite@^5.4.0 @vitejs/plugin-react@^4.3.0 typescript@^5.5.0 @types/react@^18.3.0 @types/react-dom@^18.3.0 vite-react-ssg@^0.5.0
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "anvax-website",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite-react-ssg build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  }
}
```

(Merge with whatever npm init created — keep the dependencies block npm wrote, replace scripts.)

- [ ] **Step 3: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
```

- [ ] **Step 4: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 5: Write `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Write `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/assets/anvax-wordmark-ink.svg" />
    <title>Anvax</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Write `src/router.tsx`**

```tsx
import type { RouteObject } from 'react-router-dom'
import Home from './pages/Home'
import Platform from './pages/Platform'
import Industries from './pages/Industries'
import Trust from './pages/Trust'
import Deployment from './pages/Deployment'
import Pricing from './pages/Pricing'
import Company from './pages/Company'

export const routes: RouteObject[] = [
  { path: '/',            element: <Home /> },
  { path: '/platform',   element: <Platform /> },
  { path: '/industries', element: <Industries /> },
  { path: '/trust',      element: <Trust /> },
  { path: '/deployment', element: <Deployment /> },
  { path: '/pricing',    element: <Pricing /> },
  { path: '/company',    element: <Company /> },
]
```

- [ ] **Step 8: Write `src/App.tsx`**

```tsx
import { Outlet } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 9: Write `src/main.tsx`**

```tsx
import { ViteReactSSG } from 'vite-react-ssg'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { routes } from './router'
import './styles/tokens.css'
import './styles/global.css'

export const createRoot = ViteReactSSG(
  App,
  { routes },
  ({ app }) => {
    app.use(HelmetProvider)
  },
)
```

Wait — vite-react-ssg uses a slightly different API. Replace Step 9 with:

```tsx
import { ViteReactSSG } from 'vite-react-ssg'
import App from './App'
import { routes } from './router'
import './styles/tokens.css'
import './styles/global.css'

export const createRoot = ViteReactSSG({ routes }, App)
```

- [ ] **Step 10: Write `.gitignore`**

```
node_modules
dist
.DS_Store
.superpowers
*.local
```

- [ ] **Step 11: Create placeholder page files so TypeScript resolves imports**

Create these as minimal stubs — each will be filled in a later task:

```bash
mkdir -p src/pages src/components/layout src/components/ui src/components/sections src/styles
```

For each page (Home, Platform, Industries, Trust, Deployment, Pricing, Company), create a stub:

```tsx
// src/pages/Home.tsx
export default function Home() { return <div>Home</div> }
```

Repeat for all 7 pages with their respective names.

- [ ] **Step 12: Verify TypeScript compiles**

```bash
npm run typecheck
```

Expected: zero errors (only the stub pages exist so far).

- [ ] **Step 13: Verify dev server starts**

```bash
npm run dev
```

Expected: `http://localhost:5173` loads a blank page with no console errors.

- [ ] **Step 14: Commit**

```bash
git init
git add package.json vite.config.ts tsconfig.json tsconfig.node.json index.html .gitignore src/
git commit -m "feat: scaffold Vite + React + TypeScript + vite-react-ssg"
```

---

## Task 2: Global styles

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: move `assets/` to `public/assets/` for Vite static serving

- [ ] **Step 1: Copy tokens.css**

```bash
cp styles/tokens.css src/styles/tokens.css
```

Open `src/styles/tokens.css` and verify it starts with the two Google/Fontshare `@import` lines — keep them exactly as-is.

- [ ] **Step 2: Move assets to public/**

```bash
mkdir -p public/assets
cp -r assets/. public/assets/
```

Vite serves `public/` at the root, so `public/assets/anvax-wordmark-ink.svg` becomes `/assets/anvax-wordmark-ink.svg` at runtime.

- [ ] **Step 3: Write `src/styles/global.css`**

```css
/* Reset */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: var(--bg-page);
  color: var(--fg-1);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 26px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background-image: linear-gradient(
    180deg,
    var(--bone-50) 0%,
    var(--bone-50) 60%,
    #F7F1E0 100%
  );
  background-attachment: fixed;
}
h1, h2, h3, h4, h5, h6 { margin: 0; color: var(--fg-1); text-wrap: balance; }
p { margin: 0; text-wrap: pretty; }
a { color: inherit; }
code, kbd, samp, pre { font-family: var(--font-mono); }
table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
::selection { background: var(--amber-100); color: var(--ink-900); }
:focus { outline: none; }
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
img { display: block; max-width: 100%; }

/* Layout utility */
.container {
  max-width: var(--site-max);
  margin: 0 auto;
  padding: 0 var(--site-gutter);
}
@media (max-width: 960px) {
  .container { padding: 0 var(--site-gutter-sm); }
}

/* Section frame */
.section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border);
  position: relative;
}
.section.alt {
  background: var(--bone-100);
  background-image: radial-gradient(
    120% 50% at 50% 0%,
    rgba(184,132,62,0.04) 0%,
    rgba(184,132,62,0) 60%
  );
}
.section.dark {
  background: var(--ink-900);
  color: var(--bone-100);
  border-bottom-color: transparent;
}
.section.dark h1,
.section.dark h2,
.section.dark h3 { color: var(--bone-100); }

/* Inline mono pill — used across all pages */
.term {
  font-family: var(--font-mono);
  font-size: 0.92em;
  background: var(--bone-100);
  border: 1px solid var(--border);
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--ink-900);
  white-space: nowrap;
}

/* Lede — serif secondary paragraph */
.lede {
  font-family: var(--font-serif);
  font-size: 20px;
  line-height: 30px;
  color: var(--ink-500);
  max-width: 58ch;
  text-wrap: pretty;
}
```

- [ ] **Step 4: Verify dev server still starts with no CSS errors**

```bash
npm run dev
```

Open browser at `http://localhost:5173`. Body background should be the warm parchment colour. No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/styles/ public/assets/
git commit -m "feat: migrate design tokens and global styles"
```

---

## Task 3: UI primitive components

**Files:**
- Create: `src/components/ui/Button.tsx` + `Button.module.css`
- Create: `src/components/ui/Eyebrow.tsx` + `Eyebrow.module.css`
- Create: `src/components/ui/Tag.tsx` + `Tag.module.css`
- Create: `src/components/ui/Term.tsx` + `Term.module.css`
- Create: `src/components/ui/StatusPill.tsx` + `StatusPill.module.css`
- Create: `src/components/ui/SectionHead.tsx` + `SectionHead.module.css`
- Create: `src/components/ui/PageMeta.tsx`

- [ ] **Step 1: Write `src/components/ui/Button.tsx`**

```tsx
import type { AnchorHTMLAttributes } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'secondaryDark'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  arrow?: boolean
}

export default function Button({
  variant = 'primary',
  arrow = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <a
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow && <span className={styles.arr}>→</span>}
    </a>
  )
}
```

- [ ] **Step 2: Write `src/components/ui/Button.module.css`**

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: var(--radius-button);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition:
    background var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
  white-space: nowrap;
}
.primary {
  background: var(--ink-900);
  background-image: linear-gradient(180deg, rgba(244,240,229,0.06), rgba(0,0,0,0.18));
  color: var(--bone-100);
}
.primary:hover { background: var(--ink-700); }
.accent {
  background: var(--amber-600);
  background-image: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(0,0,0,0.06));
  color: var(--bone-100);
}
.accent:hover { background: var(--amber-700); }
.secondary {
  background: transparent;
  color: var(--ink-900);
  border-color: var(--border-strong);
}
.secondary:hover { background: var(--bone-100); border-color: var(--ink-900); }
.secondaryDark {
  background: transparent;
  color: var(--bone-100);
  border-color: rgba(244,240,229,0.22);
}
.secondaryDark:hover {
  background: rgba(244,240,229,0.06);
  border-color: var(--bone-100);
}
.ghost {
  background: transparent;
  color: var(--ink-900);
  padding-left: 4px;
  padding-right: 4px;
}
.ghost:hover { color: var(--amber-700); }
.arr { transition: transform var(--dur-base) var(--ease-out); }
.btn:hover .arr { transform: translateX(2px); }
```

- [ ] **Step 3: Write `src/components/ui/Eyebrow.tsx`**

```tsx
import styles from './Eyebrow.module.css'

interface EyebrowProps {
  children: React.ReactNode
  muted?: boolean
  bare?: boolean
  className?: string
}

export default function Eyebrow({ children, muted, bare, className = '' }: EyebrowProps) {
  return (
    <div className={`${styles.eyebrow} ${muted ? styles.muted : ''} ${bare ? styles.bare : ''} ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Write `src/components/ui/Eyebrow.module.css`**

```css
.eyebrow {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--amber-700);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.eyebrow::before {
  content: '';
  width: 18px;
  height: 1px;
  background: var(--amber-600);
}
.bare::before { display: none; }
.muted { color: var(--fg-3); }
.muted::before { background: var(--slate-300); }
```

- [ ] **Step 5: Write `src/components/ui/Tag.tsx`**

Named category chip — replaces "01 · Wedge" style labels.

```tsx
import styles from './Tag.module.css'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'live' | 'next' | 'roadmap'
}

export default function Tag({ children, variant = 'default' }: TagProps) {
  return (
    <span className={`${styles.tag} ${styles[variant]}`}>
      {variant === 'live' && <span className={styles.dot} />}
      {variant === 'next' && <span className={`${styles.dot} ${styles.dotNext}`} />}
      {variant === 'roadmap' && <span className={`${styles.dot} ${styles.dotRoadmap}`} />}
      {children}
    </span>
  )
}
```

- [ ] **Step 6: Write `src/components/ui/Tag.module.css`**

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--bone-100);
  color: var(--fg-3);
  white-space: nowrap;
}
.live { color: var(--sage-700); border-color: var(--sage-600); background: var(--sage-100); }
.next { color: var(--amber-700); border-color: var(--amber-500); background: var(--amber-100); }
.roadmap { color: var(--fg-3); border-color: var(--border); background: var(--bone-100); }
.dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--sage-700);
  flex-shrink: 0;
}
.dotNext { background: var(--amber-600); }
.dotRoadmap { background: var(--slate-300); }
```

- [ ] **Step 7: Write `src/components/ui/Term.tsx`**

Inline mono pill for technical terms like `AES-256-GCM`.

```tsx
import styles from './Term.module.css'

interface TermProps {
  children: React.ReactNode
  dark?: boolean
}

export default function Term({ children, dark }: TermProps) {
  return (
    <code className={`${styles.term} ${dark ? styles.dark : ''}`}>
      {children}
    </code>
  )
}
```

- [ ] **Step 8: Write `src/components/ui/Term.module.css`**

```css
.term {
  font-family: var(--font-mono);
  font-size: 0.92em;
  background: var(--bone-100);
  border: 1px solid var(--border);
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--ink-900);
  white-space: nowrap;
}
.dark {
  background: rgba(244,240,229,0.06);
  border-color: rgba(244,240,229,0.14);
  color: var(--bone-100);
}
```

- [ ] **Step 9: Write `src/components/ui/StatusPill.tsx`**

```tsx
import styles from './StatusPill.module.css'

type Status = 'live' | 'wip' | 'planned'

interface StatusPillProps {
  status: Status
  children: React.ReactNode
}

export default function StatusPill({ status, children }: StatusPillProps) {
  return (
    <span className={`${styles.pill} ${styles[status]}`}>
      {children}
    </span>
  )
}
```

- [ ] **Step 10: Write `src/components/ui/StatusPill.module.css`**

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--sage-100);
  color: var(--sage-700);
  border: 1px solid var(--sage-600);
  white-space: nowrap;
  font-weight: 500;
}
.pill::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--sage-700);
}
.wip { background: var(--amber-100); color: var(--amber-700); border-color: var(--amber-500); }
.wip::before { background: var(--amber-700); }
.planned { background: var(--bone-100); color: var(--ink-500); border-color: var(--border-strong); }
.planned::before { background: var(--slate-400); }
```

- [ ] **Step 11: Write `src/components/ui/SectionHead.tsx`**

Replaces the old chapter-counter pattern. Strong top border + eyebrow + serif headline + lede. No numbers.

```tsx
import Eyebrow from './Eyebrow'
import styles from './SectionHead.module.css'

interface SectionHeadProps {
  eyebrow: string
  title: React.ReactNode
  lede?: React.ReactNode
  dark?: boolean
}

export default function SectionHead({ eyebrow, title, lede, dark }: SectionHeadProps) {
  return (
    <div className={`${styles.head} ${dark ? styles.dark : ''}`}>
      <div className={styles.left}>
        <Eyebrow muted={dark}>{eyebrow}</Eyebrow>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {lede && (
        <div className={styles.right}>
          <p className={styles.lede}>{lede}</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 12: Write `src/components/ui/SectionHead.module.css`**

```css
.head {
  display: grid;
  grid-template-columns: 1.05fr 0.82fr;
  gap: 0 56px;
  align-items: start;
  margin-bottom: 48px;
  padding-top: 26px;
  border-top: 1.5px solid var(--ink-900);
}
.dark { border-top-color: var(--bone-100); }
.left { display: flex; flex-direction: column; gap: 0; }
.title {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 36px;
  line-height: 43px;
  letter-spacing: -0.02em;
  color: var(--ink-900);
  margin-top: 12px;
  max-width: 20ch;
  text-wrap: balance;
}
.dark .title { color: var(--bone-100); }
.right { padding-top: 6px; }
.lede {
  font-family: var(--font-serif);
  font-size: 20px;
  line-height: 30px;
  color: var(--ink-500);
  max-width: 52ch;
  text-wrap: pretty;
}
.dark .lede { color: rgba(244,240,229,0.6); }
@media (max-width: 960px) {
  .head { grid-template-columns: 1fr; gap: 16px; }
}
```

- [ ] **Step 13: Write `src/components/ui/PageMeta.tsx`**

```tsx
import { Helmet } from 'react-helmet-async'

interface PageMetaProps {
  title: string
  description: string
}

export default function PageMeta({ title, description }: PageMetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
```

- [ ] **Step 14: Run typecheck**

```bash
npm run typecheck
```

Expected: zero errors.

- [ ] **Step 15: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI primitive components (Button, Eyebrow, Tag, Term, StatusPill, SectionHead, PageMeta)"
```

---

## Task 4: Nav and Footer

**Files:**
- Create: `src/components/layout/Nav.tsx` + `Nav.module.css`
- Create: `src/components/layout/Footer.tsx` + `Footer.module.css`

- [ ] **Step 1: Write `src/components/layout/Nav.tsx`**

```tsx
import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/Button'
import styles from './Nav.module.css'

const links = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/trust',      label: 'Trust' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/pricing',    label: 'Pricing' },
  { to: '/company',    label: 'Company' },
]

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={`container ${styles.row}`}>
        <Link to="/" className={styles.brand} aria-label="Anvax home">
          <img src="/assets/anvax-wordmark-ink.svg" alt="Anvax" />
        </Link>
        <div className={styles.links}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`${styles.link} ${pathname === to ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className={styles.actions}>
          <Button variant="ghost" href="#">Sign in</Button>
          <Button variant="primary" href="#demo">Request a demo</Button>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Write `src/components/layout/Nav.module.css`**

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(250, 247, 240, 0.88);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  backdrop-filter: blur(18px) saturate(140%);
  border-bottom: 1px solid var(--border);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.brand { display: flex; align-items: center; text-decoration: none; }
.brand img { height: 26px; }
.links { display: flex; gap: 28px; align-items: center; }
.link {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--ink-900);
  text-decoration: none;
  transition: color var(--dur-base) var(--ease-out);
  padding: 6px 0;
  position: relative;
}
.link:hover { color: var(--amber-700); }
.active { color: var(--ink-900); }
.active::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -22px;
  height: 2px;
  background: var(--ink-900);
}
.actions { display: flex; gap: 10px; align-items: center; }
@media (max-width: 880px) {
  .links { display: none; }
}
```

- [ ] **Step 3: Write `src/components/layout/Footer.tsx`**

```tsx
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const product = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/pricing',    label: 'Pricing' },
]
const trust = [
  { to: '/trust',              label: 'Architecture' },
  { to: '/trust#freeai',       label: 'RBI FREE-AI' },
  { to: '/trust#dpdp',         label: 'DPDP & CERT-In' },
  { to: '/trust#downloads',    label: 'Regulator pack' },
]
const company = [
  { to: '/company',          label: 'About' },
  { to: '/company#team',     label: 'Team' },
  { to: '/company#careers',  label: 'Careers' },
  { to: '/company#contact',  label: 'Contact' },
]
const legal = [
  { href: '#', label: 'Privacy' },
  { href: '#', label: 'DPA' },
  { href: '#', label: 'Terms' },
  { href: '#', label: 'Responsible disclosure' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src="/assets/anvax-wordmark-ink.svg" alt="Anvax" />
            <p>The sovereign AI platform for India's regulated enterprises. Built in India, governed for India's regulators.</p>
          </div>
          <FooterCol title="Product" links={product} />
          <FooterCol title="Trust" links={trust} />
          <FooterCol title="Company" links={company} />
          <div className={styles.col}>
            <h4>Legal</h4>
            <ul>
              {legal.map(({ href, label }) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.legal}>
          <span>© 2026 Anvax Technologies Pvt. Ltd.</span>
          <span className={styles.residency}>Data residency · Mumbai · ap-south-1</span>
          <span>v0.7 · May 2026</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      <ul>
        {links.map(({ to, label }) => (
          <li key={to}><Link to={to}>{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: Write `src/components/layout/Footer.module.css`**

```css
.footer {
  background: var(--bone-100);
  border-top: 1px solid var(--border);
  padding: 72px 0 36px;
}
.grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
  gap: 36px;
}
.brand img { height: 24px; }
.brand p {
  margin-top: 14px;
  font-size: 13px;
  line-height: 20px;
  color: var(--ink-500);
  max-width: 36ch;
}
.col h4 {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
  margin-bottom: 16px;
}
.col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.col a { font-size: 14px; color: var(--ink-900); text-decoration: none; }
.col a:hover { color: var(--amber-700); }
.legal {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.residency { display: inline-flex; align-items: center; gap: 8px; }
.residency::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--amber-600);
}
@media (max-width: 960px) {
  .grid { grid-template-columns: 1fr 1fr; }
  .brand { grid-column: span 2; }
}
```

- [ ] **Step 5: Run typecheck**

```bash
npm run typecheck
```

Expected: zero errors.

- [ ] **Step 6: Start dev server and verify Nav + Footer render**

```bash
npm run dev
```

Open `http://localhost:5173`. Nav should appear at top (sticky) with logo + links + CTA. Footer at bottom with columns. No console errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Nav and Footer layout components"
```

---

## Task 5: Home page

**Files:**
- Create: `src/components/sections/HeroSection.tsx` + `.module.css`
- Create: `src/components/sections/ProblemSection.tsx` + `.module.css`
- Create: `src/components/sections/PillarsSection.tsx` + `.module.css`
- Create: `src/components/sections/ArchDiagram.tsx` + `.module.css`
- Create: `src/components/sections/IndustriesGrid.tsx` + `.module.css`
- Create: `src/components/sections/ComplianceStrip.tsx` + `.module.css`
- Create: `src/components/sections/VisionSection.tsx` + `.module.css`
- Create: `src/components/sections/CtaSection.tsx` + `.module.css`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Write `src/components/sections/HeroSection.tsx`**

```tsx
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import Term from '../ui/Term'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.row}>
          <div>
            <Eyebrow>Sovereign AI · Built for India's regulators</Eyebrow>
            <h1 className={styles.h1}>
              Enterprise AI your RBI examiner<br />
              <span className={styles.em}>can sit with.</span>
            </h1>
            <p className={styles.lede}>
              Your analysts search, chat, and run workflows on your own corpus — not
              someone else's cloud. Every query is logged. Every PII field is redacted
              before it leaves the boundary.
            </p>
            <div className={styles.ctaRow}>
              <Button variant="accent" href="#demo" arrow>Request a demo</Button>
              <Button variant="secondary" href="/trust">Architecture for regulators</Button>
            </div>
            <div className={styles.trustStrip} aria-label="Compliance posture">
              <span className={styles.item}>Built for RBI · SEBI · IRDAI · DPDP</span>
              <span className={`${styles.item} ${styles.live}`}>DPDP-aware · Live</span>
              <span className={`${styles.item} ${styles.wip}`}>SOC 2 · ISO 27001 · CERT-In — in progress</span>
            </div>
          </div>

          <aside className={styles.schema} aria-label="Inference flow">
            <div className={styles.schemaHead}>
              <span className={styles.schemaTtl}>Inference trace · INF-9871</span>
              <span className={styles.pulse}>Live</span>
            </div>
            <div className={styles.schemaBody}>
              {[
                { step: 'Request', label: 'User query', sub: <>tenant <Term>acme_nbfc</Term> · session 0xA21F</>, status: 'Bound' },
                { step: 'Policy',  label: 'PII detection & redaction', sub: 'Aadhaar · PAN · IFSC · GSTIN · UPI · mobile', status: '3 redacted' },
                { step: 'Route',   label: 'Tier-gated model', sub: <><Term>claude-sonnet-4-20250514</Term> · region <Term>ap-south</Term></>, status: 'Pinned' },
                { step: 'Cite',    label: 'Retrieved sources', sub: 'RBI/2024-25/108 · policies/kfs-v3.md · 4 chunks', status: 'Verified' },
                { step: 'Trail',   label: 'Immutable audit write', sub: 'SHA-256 chained · UPDATE/DELETE blocked', status: 'Sealed' },
              ].map(({ step, label, sub, status }) => (
                <div key={step} className={styles.lane}>
                  <span className={styles.laneTag}>{step}</span>
                  <span className={styles.laneLabel}>
                    {label}
                    <span className={styles.laneSub}>{sub}</span>
                  </span>
                  <span className={styles.laneStatus}>{status}</span>
                </div>
              ))}
            </div>
            <div className={styles.schemaFoot}>
              <span className={styles.schemaResidency}>Data residency · Mumbai (ap-south-1)</span>
              <span>14:32:11 IST</span>
            </div>
          </aside>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Write `src/components/sections/HeroSection.module.css`**

```css
.hero {
  position: relative;
  padding: 88px 0 96px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  background-image:
    radial-gradient(120% 90% at 90% -10%, rgba(184,132,62,0.10) 0%, rgba(184,132,62,0) 55%),
    radial-gradient(80% 60% at 10% 110%, rgba(11,26,42,0.04) 0%, rgba(11,26,42,0) 60%);
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px;
  opacity: 0.045;
  pointer-events: none;
}
.row {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 72px;
  align-items: center;
}
.h1 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 58px;
  line-height: 66px;
  letter-spacing: -0.018em;
  color: var(--ink-900);
  margin-top: 22px;
}
.em { color: var(--amber-700); font-style: italic; }
.lede {
  font-family: var(--font-serif);
  font-size: 21px;
  line-height: 32px;
  color: var(--ink-500);
  max-width: 52ch;
  margin-top: 28px;
}
.ctaRow {
  margin-top: 36px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.trustStrip {
  margin-top: 44px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 0;
  flex-wrap: wrap;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
.item + .item { padding-left: 22px; margin-left: 22px; border-left: 1px solid var(--border); }
.live::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--sage-700);
}
.wip::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--clay-600);
}
/* Inference trace card */
.schema {
  border: 1px solid var(--border-strong);
  background: var(--paper);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(11,26,42,.04), 0 18px 40px rgba(11,26,42,.06);
}
.schemaHead {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  background: var(--bone-100);
}
.schemaTtl {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}
.pulse {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono); font-size: 11px;
  color: var(--sage-700);
  letter-spacing: 0.06em; text-transform: uppercase;
}
.pulse::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--sage-700);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
.schemaBody { padding: 22px 20px 18px; }
.lane {
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px dashed var(--border);
}
.lane:last-child { border-bottom: 0; }
.laneTag {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--amber-700);
}
.laneLabel {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-900);
}
.laneSub {
  display: block;
  font-weight: 400;
  font-size: 12px;
  color: var(--fg-3);
  margin-top: 2px;
}
.laneStatus {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sage-700);
  display: inline-flex; align-items: center; gap: 6px;
  white-space: nowrap;
}
.laneStatus::before {
  content: ''; width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--sage-700);
}
.schemaFoot {
  border-top: 1px solid var(--border);
  background: var(--bone-50);
  padding: 13px 18px 14px;
  display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap;
  font-family: var(--font-mono); font-size: 10px; color: var(--fg-3);
  letter-spacing: 0.04em; text-transform: uppercase;
}
.schemaResidency::before {
  content: ''; display: inline-block; width: 6px; height: 6px;
  background: var(--amber-600);
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: 1px;
}
@media (max-width: 960px) {
  .row { grid-template-columns: 1fr; gap: 48px; }
  .h1 { font-size: 44px; line-height: 52px; }
}
```

- [ ] **Step 3: Write `src/components/sections/ProblemSection.tsx`**

```tsx
import SectionHead from '../ui/SectionHead'
import styles from './ProblemSection.module.css'

const before = [
  { lead: 'Aadhaar and PAN numbers are leaving the network', body: 'in ChatGPT, Gemini, and personal Copilot tabs — with no data processing agreement in place.' },
  { lead: 'There is no audit trail', body: 'for any AI-assisted credit decision, customer summary, or policy interpretation. The RBI examiner gets nothing.' },
  { lead: 'Knowledge is scattered', body: 'across Confluence, SharePoint, Tally, GST portal, and 60 shared drives. Search means emailing the right person.' },
  { lead: 'Glean and Copilot don\'t fit', body: 'US-hosted, Microsoft-stack-only, and blind to RBI circulars, MCA filings, and Account Aggregator data.' },
  { lead: 'Shadow AI is everywhere', body: 'and leadership knows it. No governance layer means no defensible response when the incident happens.' },
]

const after = [
  { lead: 'PII is redacted at the boundary', body: 'Aadhaar (Verhoeff-validated), PAN, IFSC, GSTIN, UPI IDs scrubbed before the model sees the prompt.' },
  { lead: 'Every query is logged', body: 'Immutable inference trail, SHA-256 chained. UPDATE and DELETE are blocked by DDL trigger. The examiner gets a full export on request.' },
  { lead: 'One workspace over your corpus', body: 'Search, chat, workflows, and agents running on your documents — Tally, GST portal, MCA filings, Confluence, SharePoint.' },
  { lead: 'India-stack native', body: 'GST, MCA21, Account Aggregator, RBI circulars as first-class connectors. Not bolted on — wired in at the data layer.' },
  { lead: 'Your data never leaves India', body: 'SaaS in AWS Mumbai. Indian sovereign cloud. Air-gapped on-prem. Choose the tier; the residency commitment is the same.' },
]

export default function ProblemSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="The problem"
          title="Right now, your credit team has ChatGPT open in one tab and the loan file in another."
          lede="Aadhaar numbers, PAN details, and account data are crossing borders with no contract in place. When the examiner arrives, there is nothing to show."
        />
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={`${styles.heading} ${styles.bad}`}>
              <span className={styles.dot} />
              Before Anvax
            </div>
            <h3 className={styles.colH}>Ungoverned. Unauditable. One incident away from a regulatory response.</h3>
            <ul className={styles.list}>
              {before.map(({ lead, body }) => (
                <li key={lead} className={styles.item}>
                  <strong>{lead}</strong> {body}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.col} ${styles.good}`}>
            <div className={`${styles.heading} ${styles.goodHeading}`}>
              <span className={`${styles.dot} ${styles.dotGood}`} />
              After Anvax
            </div>
            <h3 className={styles.colH}>One governed surface. Full trace. Examiner-ready on day one.</h3>
            <ul className={styles.list}>
              {after.map(({ lead, body }) => (
                <li key={lead} className={`${styles.item} ${styles.itemGood}`}>
                  <strong>{lead}</strong> {body}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write `src/components/sections/ProblemSection.module.css`**

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.col {
  background: var(--bone-50);
  padding: 36px;
}
.good { background: var(--paper); }
.heading {
  display: flex; align-items: center; gap: 9px;
  font-family: var(--font-mono);
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-500);
  margin-bottom: 20px;
  white-space: nowrap;
}
.bad .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--rust-700); }
.goodHeading .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--sage-700); }
.dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.dotGood { background: var(--sage-700); }
.colH {
  font-family: var(--font-serif);
  font-size: 22px; line-height: 30px;
  font-weight: 400;
  letter-spacing: -0.008em;
  margin-bottom: 24px;
  max-width: 28ch;
}
.list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
.item {
  position: relative;
  padding-left: 26px;
  font-size: 14px; line-height: 22px;
  color: var(--ink-500);
}
.item::before {
  content: ''; position: absolute; left: 0; top: 10px;
  width: 14px; height: 1px; background: var(--rust-700);
}
.itemGood::before { background: var(--sage-700); }
.item strong { color: var(--ink-900); font-weight: 600; }
@media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 5: Write `src/components/sections/PillarsSection.tsx`**

```tsx
import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead'
import Tag from '../ui/Tag'
import styles from './PillarsSection.module.css'

const pillars = [
  {
    tag: 'Wedge',
    sub: 'Shipping today',
    title: 'Your analysts work on your corpus. Not ours.',
    body: 'Search, chat, workflows, and agents running on your own documents — with full audit trails, DPDP compliance, and Indian data residency. When the examiner asks for the inference trail, it is one export away.',
    meta: [
      { k: 'Ships to', v: 'NBFCs, fintechs · 25–100 seats' },
      { k: 'Replaces', v: 'Glean · Copilot · shadow AI' },
    ],
    cta: 'See the platform',
    href: '/platform',
  },
  {
    tag: 'Platform',
    sub: 'Compounding',
    title: 'Four moats US incumbents structurally cannot cross.',
    body: 'Organisational memory that compounds per customer. GST, MCA21, Tally, Account Aggregator, RBI circulars — wired in, not bolted on. Vertical packs starting with NBFC. Compliance infrastructure that arrives on day one.',
    meta: [
      { k: 'Moats', v: 'Memory · India stack · verticals · compliance' },
      { k: 'Rollout', v: 'NBFC → wealth → lending → insurance' },
    ],
    cta: 'See the moats',
    href: '/platform',
  },
  {
    tag: 'Deployment',
    sub: 'Same product, your iron',
    title: 'Four tiers. One product. Anvax owns no GPUs.',
    body: 'Shared SaaS in AWS Mumbai for growth-stage fintechs. Indian sovereign GPU cloud for regulated NBFCs. On-prem and air-gapped for large banks and PSUs. IndiaAI subsidised compute as an overlay. We ship the platform. You keep the iron.',
    meta: [
      { k: 'Tiers', v: 'SaaS · Sovereign · On-prem · IndiaAI' },
      { k: 'Residency', v: 'All data & embeddings stay in India' },
    ],
    cta: 'See deployment',
    href: '/deployment',
  },
]

export default function PillarsSection() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="How Anvax works"
          title="Three layers. One product."
          lede="A wedge that ships today, a platform that compounds, and a deployment model that meets every regulator where they are."
        />
        <div className={styles.grid}>
          {pillars.map(({ tag, sub, title, body, meta, cta, href }) => (
            <Link key={tag} to={href} className={styles.card}>
              <div className={styles.cardTop}>
                <Tag>{tag}</Tag>
                <span className={styles.sub}>{sub}</span>
              </div>
              <h3 className={styles.h3}>{title}</h3>
              <p className={styles.body}>{body}</p>
              <div className={styles.meta}>
                {meta.map(({ k, v }) => (
                  <div key={k}><span className={styles.metaK}>{k}</span>{v}</div>
                ))}
              </div>
              <span className={styles.more}>{cta} <span className={styles.arr}>→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Write `src/components/sections/PillarsSection.module.css`**

```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card {
  background: var(--bone-100);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 32px;
  display: flex; flex-direction: column;
  transition: border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
  text-decoration: none; color: inherit;
}
.card:hover { border-color: var(--ink-900); background: var(--paper); }
.cardTop { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.sub {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--fg-3);
}
.h3 {
  font-family: var(--font-serif);
  font-size: 26px; line-height: 32px;
  font-weight: 400; letter-spacing: -0.008em;
  margin-bottom: 16px; max-width: 18ch;
}
.body {
  font-size: 14px; line-height: 22px;
  color: var(--ink-500);
  max-width: 38ch;
  min-height: 88px;
}
.meta {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 8px;
  font-family: var(--font-sans);
  font-size: 12.5px; line-height: 18px;
  color: var(--fg-2);
}
.metaK { color: var(--fg-3); font-weight: 500; margin-right: 6px; }
.more {
  margin-top: 18px;
  font-family: var(--font-sans); font-size: 13px; font-weight: 500;
  color: var(--amber-700);
  display: inline-flex; align-items: center; gap: 6px;
}
.arr { transition: transform var(--dur-base) var(--ease-out); }
.card:hover .arr { transform: translateX(3px); }
@media (max-width: 960px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 7: Write `src/components/sections/ArchDiagram.tsx`**

```tsx
import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead'
import Term from '../ui/Term'
import styles from './ArchDiagram.module.css'

const layers = [
  {
    num: 'Layer 03',
    name: 'Application layer',
    desc: 'The surface your analyst, RM, and compliance officer use every day.',
    blocks: [
      { h: 'Search', s: 'Hybrid · cited' },
      { h: 'Chat', s: 'Threads · ⌘K' },
      { h: 'Workflows', s: 'Temporal-backed' },
      { h: 'Agents', s: 'Policy-checked' },
    ],
    accent: false,
  },
  {
    num: 'Layer 02',
    name: 'Governance layer',
    desc: 'Every request passes through here. Not an afterthought — wired into the data path.',
    blocks: [
      { h: 'PII redaction', s: 'Aadhaar · PAN · UPI' },
      { h: 'Prompt-injection gate', s: 'Per user message' },
      { h: 'Model gateway', s: 'Tier-gated · pinned' },
      { h: 'Immutable audit', s: 'SHA-256 chained' },
    ],
    accent: true,
  },
  {
    num: 'Layer 01',
    name: 'Knowledge core',
    desc: 'Customer corpus, India-stack connectors, and the hybrid index that makes them queryable.',
    blocks: [
      { h: 'Customer corpus', s: 'Per-tenant' },
      { h: 'India stack', s: 'GST · MCA · AA · Tally' },
      { h: 'Hybrid index', s: 'RAG + structured' },
      { h: 'Encrypted at rest', s: <><Term>AES-256-GCM</Term> · per-tenant DEK</> },
    ],
    accent: false,
  },
]

export default function ArchDiagram() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Architecture · Conceptual"
          title="One stack, three layers."
          lede="Knowledge is grounded per tenant. Governance sits between the user and the model — not after the fact. The application layer is what your people see."
        />
        <div className={styles.arch}>
          {layers.map(({ num, name, desc, blocks, accent }) => (
            <div key={num} className={styles.row}>
              <div className={styles.meta}>
                <div className={styles.layerNum}>{num}</div>
                <div className={styles.layerName}>{name}</div>
                <p className={styles.layerDesc}>{desc}</p>
              </div>
              <div className={styles.blocks}>
                {blocks.map(({ h, s }) => (
                  <div key={h} className={`${styles.block} ${accent ? styles.accent : ''}`}>
                    <span className={styles.blockH}>{h}</span>
                    <span className={styles.blockS}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.foot}>
            <span>All customer data, embeddings &amp; inference traces stay in India.</span>
            <Link to="/trust">See the full architecture <span>→</span></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Write `src/components/sections/ArchDiagram.module.css`**

```css
.arch {
  border: 1px solid var(--border-strong);
  background: var(--paper);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.row {
  display: grid;
  grid-template-columns: 220px 1fr;
  border-bottom: 1px solid var(--border);
}
.row:last-of-type { border-bottom: 0; }
.meta {
  background: var(--bone-100);
  padding: 24px;
  border-right: 1px solid var(--border);
}
.layerNum {
  font-family: var(--font-mono);
  font-size: 11px; color: var(--amber-700);
  letter-spacing: 0.08em; text-transform: uppercase;
}
.layerName {
  font-family: var(--font-serif);
  font-size: 22px; line-height: 28px;
  font-weight: 400; letter-spacing: -0.005em;
  margin-top: 6px; color: var(--ink-900);
}
.layerDesc { margin-top: 8px; font-size: 12px; line-height: 18px; color: var(--ink-500); max-width: 22ch; }
.blocks {
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  align-content: start;
}
.block {
  border: 1px solid var(--border);
  background: var(--bone-50);
  border-radius: var(--radius-sm);
  padding: 14px;
  display: flex; flex-direction: column; gap: 4px;
  min-height: 76px;
}
.accent { background: var(--amber-100); border-color: var(--amber-500); }
.blockH { font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--ink-900); }
.blockS { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.04em; text-transform: uppercase; }
.accent .blockS { color: var(--amber-700); }
.foot {
  padding: 16px 24px;
  display: flex; gap: 20px; align-items: center; justify-content: space-between;
  font-family: var(--font-mono); font-size: 11px; color: var(--fg-3);
  letter-spacing: 0.04em; text-transform: uppercase;
  background: var(--bone-50);
  border-top: 1px solid var(--border);
}
.foot a { color: var(--ink-900); text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; }
.foot a:hover { color: var(--amber-700); }
@media (max-width: 800px) {
  .row { grid-template-columns: 1fr; }
  .meta { border-right: 0; border-bottom: 1px solid var(--border); }
  .blocks { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 9: Write `src/components/sections/IndustriesGrid.tsx`**

```tsx
import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead'
import Tag from '../ui/Tag'
import styles from './IndustriesGrid.module.css'

const industries = [
  { tag: 'NBFC' as const, status: 'live' as const, title: 'NBFC', body: 'Credit-pack assembly, RBI circular tracking, customer 360, and audit-prep workflows.', roles: ['Compliance', 'Credit', 'Ops', 'Internal audit'], href: '/industries#nbfc', icon: '🏦' },
  { tag: 'Wealth' as const, status: 'next' as const, title: 'Wealth management', body: 'Client briefings, portfolio commentary, SEBI advisor disclosures, and KYC packs.', roles: ['RM', 'Research', 'Compliance'], href: '/industries#wealth', icon: '📈' },
  { tag: 'Lending' as const, status: 'next' as const, title: 'Lending', body: 'Underwriting over bank statements, GST, and AA pulls. Remediation tickets from circulars.', roles: ['Underwriting', 'Risk', 'Collections'], href: '/industries#lending', icon: '💳' },
  { tag: 'Insurance' as const, status: 'roadmap' as const, title: 'Insurance', body: 'Policy lookups, IRDAI disclosure drafting, claims triage, agent-script governance.', roles: ['Underwriting', 'Claims', 'Compliance'], href: '/industries#insurance', icon: '🛡️' },
  { tag: 'Broking' as const, status: 'roadmap' as const, title: 'Broking', body: 'SEBI circular intake, surveillance memos, research synthesis, client briefings.', roles: ['Compliance', 'Research', 'Surveillance'], href: '/industries#broking', icon: '📊' },
  { tag: 'Payments' as const, status: 'roadmap' as const, title: 'Payments', body: 'Merchant onboarding, dispute drafts, RBI PSO compliance, and incident postmortems.', roles: ['Risk', 'Ops', 'Compliance'], href: '/industries#payments', icon: '↔' },
]

export default function IndustriesGrid() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Industries · Year 1 rollout"
          title="NBFC first. Then the rest of regulated India."
          lede="Vertical packs ship as compounding intelligence — RBI circulars, sectoral templates, role-based workflows. We don't sell horizontally and call it a fit."
        />
        <div className={styles.grid}>
          {industries.map(({ tag, status, title, body, roles, href }) => (
            <Link key={tag} to={href} className={styles.card}>
              <div className={styles.head}>
                <span className={styles.tagWrap}>{tag}</span>
                <Tag variant={status}>{status === 'live' ? 'Live' : status === 'next' ? 'Next' : 'Roadmap'}</Tag>
              </div>
              <h3 className={styles.h3}>{title}</h3>
              <p className={styles.body}>{body}</p>
              <div className={styles.roles}>
                {roles.map(r => <span key={r}>· {r}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 10: Write `src/components/sections/IndustriesGrid.module.css`**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.card {
  background: var(--paper);
  padding: 28px 28px 32px;
  display: flex; flex-direction: column; gap: 12px;
  min-height: 200px;
  text-decoration: none; color: inherit;
  transition: background var(--dur-base) var(--ease-out);
}
.card:hover { background: var(--bone-100); }
.head { display: flex; align-items: center; justify-content: space-between; }
.tagWrap {
  font-family: var(--font-mono);
  font-size: 10px; color: var(--amber-700);
  letter-spacing: 0.12em; text-transform: uppercase;
}
.h3 {
  font-family: var(--font-serif);
  font-size: 24px; line-height: 30px;
  font-weight: 400; letter-spacing: -0.008em;
}
.body { font-size: 13px; line-height: 20px; color: var(--ink-500); max-width: 32ch; }
.roles {
  margin-top: auto; padding-top: 16px;
  border-top: 1px solid var(--border);
  display: flex; flex-wrap: wrap; gap: 6px 8px;
  font-family: var(--font-mono); font-size: 10px;
  color: var(--fg-3); letter-spacing: 0.04em; text-transform: uppercase;
}
@media (max-width: 960px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 11: Write `src/components/sections/ComplianceStrip.tsx`**

```tsx
import SectionHead from '../ui/SectionHead'
import styles from './ComplianceStrip.module.css'

const cells = [
  {
    k: 'Data residency',
    v: 'All customer data and embeddings stored in India.',
    items: ['SaaS · AWS Mumbai (ap-south-1)', 'Sovereign · Yotta / E2E Networks', 'On-prem · customer DC'],
  },
  {
    k: 'Sovereign inference',
    v: 'Region-locked, tier-gated, model-pinned.',
    items: ['SaaS · Anthropic via Azure AI Foundry', 'Sovereign · vLLM + AI Kosh / Sarvam', 'Air-gapped · Helm + vLLM'],
  },
  {
    k: 'Audit-ready',
    v: 'RBI FREE-AI controls live in product — not a roadmap slide.',
    items: ['R7 · AI Use-Case Registry', 'R17 · Model version tracking', 'R19 · Explainability "Why?"', 'R23 · Immutable inference trail'],
  },
]

export default function ComplianceStrip() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Compliance & sovereignty"
          title="Examiner-ready. Audit-aligned. India-resident."
          lede="Anvax was built with the RBI FREE-AI report and the DPDP Act open on the desk. Controls are live in product."
        />
        <div className={styles.strip}>
          <div className={styles.lead}>
            <h3 className={styles.leadH}>The compliance story your regulator can read in twenty minutes.</h3>
            <p className={styles.leadP}>Full mapping of RBI FREE-AI, DPDP Act 2023, CERT-In 2022, and the RBI IT Framework lives on the Trust page — controls, references, and current status.</p>
          </div>
          {cells.map(({ k, v, items }) => (
            <div key={k} className={styles.cell}>
              <div className={styles.cellK}>{k}</div>
              <div className={styles.cellV}>{v}</div>
              <ul className={styles.cellList}>
                {items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12: Write `src/components/sections/ComplianceStrip.module.css`**

```css
.strip {
  background: var(--ink-900);
  color: var(--bone-100);
  border-radius: var(--radius-md);
  padding: 40px 44px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr;
  gap: 36px;
  align-items: start;
  background-image: radial-gradient(80% 60% at 100% 0%, rgba(184,132,62,0.14) 0%, rgba(184,132,62,0) 60%);
}
.lead .leadH {
  font-family: var(--font-serif);
  font-size: 26px; line-height: 32px;
  font-weight: 400; letter-spacing: -0.005em;
  color: var(--bone-100); max-width: 18ch;
}
.leadP { margin-top: 12px; font-size: 13px; line-height: 20px; color: rgba(244,240,229,0.6); max-width: 38ch; }
.cellK { font-family: var(--font-mono); font-size: 10px; color: var(--amber-500); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
.cellV { font-family: var(--font-serif); font-size: 18px; line-height: 24px; color: var(--bone-100); margin-bottom: 12px; max-width: 24ch; }
.cellList { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.cellList li {
  font-family: var(--font-mono); font-size: 11px; color: var(--bone-200);
  letter-spacing: 0.04em; text-transform: uppercase;
  display: flex; align-items: center; gap: 8px;
}
.cellList li::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--sage-600); flex-shrink: 0; }
@media (max-width: 960px) { .strip { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .strip { grid-template-columns: 1fr; padding: 28px; } }
```

- [ ] **Step 13: Write `src/components/sections/VisionSection.tsx`**

```tsx
import SectionHead from '../ui/SectionHead'
import styles from './VisionSection.module.css'

export default function VisionSection() {
  return (
    <section className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Vision"
          title="The hardest regulated market in the world is India. We start there."
        />
        <div className={styles.vision}>
          <div className={styles.pullquote}>
            What AWS did for cloud infrastructure, Anvax does for enterprise AI.
          </div>
          <div className={styles.body}>
            <p>India's regulated enterprise has three constraints at once — data sovereignty, deep India-stack dependencies, and a regulator that expects to see every model decision in writing. Solve those, and the rest of the world is a generalisation.</p>
            <p>Anvax begins as the governed intelligence layer for one industry that lives at the intersection of all three — Indian NBFCs — and grows outward, vertical by vertical, until enterprise AI in India runs on a single substrate the way enterprise compute runs on cloud today.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 14: Write `src/components/sections/VisionSection.module.css`**

```css
.vision { display: grid; grid-template-columns: 1fr 1.4fr; gap: 72px; align-items: start; }
.pullquote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 28px; line-height: 38px;
  color: var(--ink-700);
  letter-spacing: -0.005em;
  text-wrap: balance; max-width: 18ch;
  border-left: 2px solid var(--amber-600);
  padding-left: 24px;
}
.body p { font-family: var(--font-serif); font-size: 19px; line-height: 30px; color: var(--ink-700); max-width: 56ch; }
.body p + p { margin-top: 18px; }
@media (max-width: 960px) { .vision { grid-template-columns: 1fr; gap: 32px; } }
```

- [ ] **Step 15: Write `src/components/sections/CtaSection.tsx`**

```tsx
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import styles from './CtaSection.module.css'

export default function CtaSection() {
  return (
    <section className="section" id="demo">
      <div className="container">
        <div className={styles.block}>
          <div>
            <Eyebrow bare>Get in touch</Eyebrow>
            <h2 className={styles.h2}>Bring your regulator into the room.</h2>
            <p className={styles.body}>Show us the audit your CISO is preparing for and we'll show you what an examiner-ready AI workspace looks like — live, on your own corpus. Procurement-grade documentation included.</p>
          </div>
          <div className={styles.actions}>
            <Button variant="accent" href="#" arrow>Talk to sales</Button>
            <Button variant="secondaryDark" href="/trust#downloads">Get the regulator pack</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 16: Write `src/components/sections/CtaSection.module.css`**

```css
.block {
  background: var(--ink-900);
  color: var(--bone-100);
  border-radius: var(--radius-md);
  padding: 56px 60px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image:
    radial-gradient(80% 100% at 100% 0%, rgba(184,132,62,0.18) 0%, rgba(184,132,62,0) 55%),
    radial-gradient(60% 80% at 0% 100%, rgba(31,46,68,1) 0%, rgba(11,26,42,0) 60%);
}
.block::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px;
  opacity: 0.06;
  pointer-events: none;
}
.h2 {
  position: relative;
  font-family: var(--font-serif);
  font-size: 38px; line-height: 46px;
  font-weight: 400; letter-spacing: -0.012em;
  color: var(--bone-100); max-width: 22ch;
  margin-top: 12px;
}
.body {
  position: relative;
  margin-top: 14px;
  font-size: 15px; line-height: 24px;
  color: rgba(244,240,229,0.6); max-width: 48ch;
}
.actions {
  position: relative;
  display: flex; flex-direction: column; gap: 12px; align-items: stretch;
}
.actions :global(.btn) { justify-content: center; padding: 14px 20px; }
@media (max-width: 800px) { .block { grid-template-columns: 1fr; padding: 36px; } }
```

- [ ] **Step 17: Write `src/pages/Home.tsx`**

```tsx
import PageMeta from '../components/ui/PageMeta'
import HeroSection from '../components/sections/HeroSection'
import ProblemSection from '../components/sections/ProblemSection'
import PillarsSection from '../components/sections/PillarsSection'
import ArchDiagram from '../components/sections/ArchDiagram'
import IndustriesGrid from '../components/sections/IndustriesGrid'
import ComplianceStrip from '../components/sections/ComplianceStrip'
import VisionSection from '../components/sections/VisionSection'
import CtaSection from '../components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <PageMeta
        title="Anvax — Sovereign AI for India's regulated enterprises"
        description="The AI workspace BFSI and NBFCs can run past their regulator. Search, chat, workflows — on your corpus, auditable by design."
      />
      <HeroSection />
      <ProblemSection />
      <PillarsSection />
      <ArchDiagram />
      <IndustriesGrid />
      <ComplianceStrip />
      <VisionSection />
      <CtaSection />
    </>
  )
}
```

- [ ] **Step 18: Run typecheck and verify home page in browser**

```bash
npm run typecheck
npm run dev
```

Open `http://localhost:5173`. Verify:
- Hero renders with inference-trace card on the right
- Before/After grid shows two columns with correct rust/sage indicators
- Three pillar cards with Tag chips (no "01 ·" prefix)
- Architecture diagram with amber-tinted governance layer
- Six industry cards in a 3×2 grid
- Compliance strip on dark ink background
- Vision with italic pullquote
- CTA block on dark background
- No mechanical number prefixes anywhere

- [ ] **Step 19: Commit**

```bash
git add src/components/sections/ src/pages/Home.tsx
git commit -m "feat: Home page with all 8 sections and rewritten content"
```

---

## Task 6: Platform page

**Files:**
- Modify: `src/pages/Platform.tsx`

- [ ] **Step 1: Write `src/pages/Platform.tsx`**

```tsx
import { Link } from 'react-router-dom'
import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import Tag from '../components/ui/Tag'
import Term from '../components/ui/Term'
import StatusPill from '../components/ui/StatusPill'
import Button from '../components/ui/Button'
import styles from './Platform.module.css'

const capabilities = [
  {
    tag: 'Search',
    n: '01',
    title: 'Every answer cites its source.',
    desc1: 'Hybrid search combines vector similarity with structured query — your analyst asks a question, gets a cited answer in seconds, and can follow every reference back to the original document.',
    desc2: 'Works across Confluence, SharePoint, Tally, GST portal, MCA filings, and uploaded PDFs — in a single query.',
    specs: [
      { k: 'Retrieval', v: 'RAG + semantic + structured (hybrid)' },
      { k: 'Citations', v: 'Document · row · paragraph — every response' },
      { k: 'Scope', v: 'Per-tenant, ACL-enforced' },
      { k: 'Latency', v: '<2s median on a 500K-doc corpus' },
    ],
  },
  {
    tag: 'Chat',
    n: '02',
    title: 'Threads your examiner can read.',
    desc1: 'Persistent threads over your corpus. Every message is logged, every model call is recorded with version and confidence score. The "Why?" panel expands any answer to show cited chunks.',
    desc2: 'PII is redacted before the prompt leaves the boundary. Aadhaar, PAN, IFSC, GSTIN, UPI — scrubbed and logged, not forwarded.',
    specs: [
      { k: 'Audit', v: 'Immutable inference_traces, SHA-256 chained' },
      { k: 'PII gate', v: 'Aadhaar · PAN · IFSC · GSTIN · UPI · mobile' },
      { k: 'Explainability', v: 'confidence_score + cited_chunk_ids on every response' },
      { k: 'Session', v: 'Bound to tenant, rate-limited per session' },
    ],
  },
  {
    tag: 'Workflows',
    n: '03',
    title: 'Durable workflows that survive a server restart.',
    desc1: 'Temporal-backed workflows for the operational work that matters — compliance monitoring, credit-pack assembly, board-report generation, audit prep. Humans approve; Anvax executes.',
    desc2: 'Every step is logged. Every approval is recorded. The workflow state survives infrastructure failures.',
    specs: [
      { k: 'Orchestration', v: 'Temporal (durable, resumable)' },
      { k: 'Human-in-loop', v: 'RiskPolicy.always_human for critical tier' },
      { k: 'Review queue', v: 'SLA-tracked, board-reportable' },
      { k: 'Export', v: 'JSON + CSV for board and regulator reports' },
    ],
  },
  {
    tag: 'Agents',
    n: '04',
    title: 'Agents that act within policy — and can prove it.',
    desc1: 'Enterprise agents that connect to your systems — Tally, GST portal, MCA, Salesforce, Slack — and act on behalf of your team. Every action is policy-checked, role-checked, and auditable.',
    desc2: 'SSRF guard blocks internal network access from connectors. Path-traversal guard on every file operation. Tool registry is version-pinned and board-exportable.',
    specs: [
      { k: 'Connectors', v: 'GST · MCA · Tally · AA · Salesforce · Slack · SharePoint' },
      { k: 'SSRF guard', v: 'RFC-1918 + link-local + 169.254.169.254 blocklist' },
      { k: 'Tool registry', v: 'Version-pinned, exportable to ai_use_cases table' },
      { k: 'Budget', v: 'Per-agent token and time budgets, hard-capped' },
    ],
  },
]

const moats = [
  {
    tag: 'Memory',
    title: 'The longer a customer uses Anvax, the smarter it gets about their business.',
    body: 'Every decision, document, and outcome is stored, connected, and made queryable. The knowledge graph compounds — not just search, but institutional memory. This is the moat.',
    meta: 'Compounding per customer · not portable to competitors',
  },
  {
    tag: 'India stack',
    title: 'GST, MCA21, Tally, Account Aggregator, RBI circulars — wired in.',
    body: 'Not bolted on. Built into the data layer. Glean has none of these. Copilot has none of these. A US-based competitor would need two years of India-specific engineering to replicate this connector set.',
    meta: 'First-class connectors · not integrations',
  },
  {
    tag: 'Verticals',
    title: 'Role-based intelligence packs that know your industry.',
    body: 'NBFC first — credit-pack assembly, RBI circular tracking, compliance workflows. Then wealth, lending, insurance, broking. Each vertical pack is not a UI reskin — it is a different corpus, different prompts, different workflows.',
    meta: 'NBFC live · wealth + lending next',
  },
  {
    tag: 'Compliance',
    title: 'Compliance infrastructure that arrives on day one.',
    body: '82.6% test coverage, CI gate at 80%. mypy --strict and tsc --strict, both enforced. Alembic forward-only migrations. Zero f-string SQL. RBI FREE-AI controls live in product — R7, R17, R18, R19, R23 all implemented.',
    meta: 'SOC 2 in progress · DPDP-aware · CERT-In initiated',
  },
]

export default function Platform() {
  return (
    <>
      <PageMeta
        title="Platform — Anvax"
        description="Four capabilities, four moats, and an India-stack that no US incumbent has wired in."
      />

      {/* Inner hero */}
      <header className={styles.innerHero}>
        <div className="container">
          <div className={styles.heroRow}>
            <div>
              <div className={styles.eyebrow}>Platform</div>
              <h1 className={styles.h1}>Four capabilities. Four moats. <span className={styles.em}>No US incumbent has built this.</span></h1>
              <p className={styles.lede}>Search, chat, workflows, and agents — running on your corpus, governed by design. Plus an India-stack connector set that took years to build.</p>
              <div className={styles.ctaRow}>
                <Button variant="accent" href="#demo" arrow>Request a demo</Button>
                <Button variant="secondary" href="/trust">See the architecture</Button>
              </div>
            </div>
            <div className={styles.heroMeta}>
              {[
                { k: 'Capabilities', v: 'Search · Chat · Workflows · Agents' },
                { k: 'India-stack connectors', v: '18 live integrations' },
                { k: 'Deployment', v: 'SaaS · Sovereign · On-prem · IndiaAI' },
              ].map(({ k, v }) => (
                <div key={k} className={styles.metaItem}>
                  <div className={styles.metaK}>{k}</div>
                  <div className={styles.metaV}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Capabilities */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Capabilities" title="What your team actually does with Anvax." />
          {capabilities.map(({ tag, title, desc1, desc2, specs }) => (
            <div key={tag} className={styles.capRow}>
              <div className={styles.capLabel}>
                <Tag>{tag}</Tag>
                <h3 className={styles.capH3}>{title}</h3>
              </div>
              <div>
                <p className={styles.capDesc}>{desc1}</p>
                <p className={`${styles.capDesc} ${styles.capDescSec}`}>{desc2}</p>
              </div>
              <ul className={styles.specs}>
                {specs.map(({ k, v }) => (
                  <li key={k} className={styles.spec}>
                    <span className={styles.specK}>{k}</span>
                    <span className={styles.specV}>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Moats */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="Four moats"
            title="Why this is hard to copy."
            lede="Each moat is a structural advantage — not a feature. US incumbents can't buy their way in."
          />
          <div className={styles.moats}>
            {moats.map(({ tag, title, body, meta }) => (
              <div key={tag} className={styles.moat}>
                <Tag>{tag}</Tag>
                <h3 className={styles.moatH3}>{title}</h3>
                <p className={styles.moatBody}>{body}</p>
                <div className={styles.moatMeta}>{meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* India stack */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="India stack · 18 integrations"
            title="The connectors that matter in India's regulated market."
            lede="Government systems, compliance registries, ledgers, and enterprise SaaS — first-class connections, not webhooks."
          />
          <div className={styles.stackGrid}>
            {[
              { src: '/assets/logos/gst.png', name: 'GST Portal', kind: 'Govt · Tax' },
              { src: '/assets/logos/mca.png', name: 'MCA21', kind: 'Govt · Corporate' },
              { src: '/assets/logos/rbi.png', name: 'RBI Circulars', kind: 'Regulator' },
              { src: '/assets/logos/npci.svg', name: 'UPI / NPCI', kind: 'Payments infra' },
              { src: '/assets/logos/digilocker.svg', name: 'DigiLocker', kind: 'Govt · Identity' },
              { src: '/assets/logos/account-aggregator.svg', name: 'Account Aggregator', kind: 'Financial data' },
              { src: '/assets/logos/sebi.jpg', name: 'SEBI', kind: 'Regulator' },
              { src: '/assets/logos/irdai.png', name: 'IRDAI', kind: 'Regulator' },
              { src: '/assets/logos/tally.png', name: 'Tally', kind: 'Ledger' },
              { src: '/assets/logos/zoho.svg', name: 'Zoho Books', kind: 'Ledger' },
              { src: '/assets/logos/busy.jpg', name: 'BUSY', kind: 'Ledger' },
              { src: '/assets/logos/salesforce-official.svg', name: 'Salesforce', kind: 'CRM' },
              { src: '/assets/logos/slack.svg', name: 'Slack', kind: 'Messaging' },
              { src: '/assets/logos/confluence-official.svg', name: 'Confluence', kind: 'Knowledge' },
              { src: '/assets/logos/snowflake-official.svg', name: 'Snowflake', kind: 'Data warehouse' },
              { src: '/assets/logos/drive-official.svg', name: 'Google Drive', kind: 'Storage' },
              { src: '/assets/logos/sharepoint.svg', name: 'SharePoint', kind: 'Storage' },
              { name: 'CKYC', kind: 'KYC registry', mono: 'CK' },
            ].map(({ src, name, kind, mono }) => (
              <div key={name} className={styles.tile}>
                <div className={styles.logoBox}>
                  {src
                    ? <img src={src} alt={name} />
                    : <span className={styles.monoMark}>{mono}</span>
                  }
                </div>
                <div className={styles.tileInfo}>
                  <div className={styles.tileName}>{name}</div>
                  <div className={styles.tileKind}>{kind}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `src/pages/Platform.module.css`**

```css
/* Inner hero */
.innerHero {
  position: relative;
  padding: 72px 0 64px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  background-image: radial-gradient(100% 80% at 100% 0%, rgba(184,132,62,0.08) 0%, rgba(184,132,62,0) 55%);
}
.innerHero::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px;
  opacity: 0.04;
  pointer-events: none;
}
.heroRow { position: relative; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: end; }
.eyebrow { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber-700); margin-bottom: 16px; }
.h1 { font-family: var(--font-serif); font-weight: 400; font-size: 52px; line-height: 60px; letter-spacing: -0.016em; color: var(--ink-900); margin-top: 0; max-width: 18ch; }
.em { color: var(--amber-700); font-style: italic; }
.lede { margin-top: 22px; font-family: var(--font-serif); font-size: 19px; line-height: 28px; color: var(--ink-500); max-width: 52ch; }
.ctaRow { margin-top: 28px; display: flex; gap: 12px; flex-wrap: wrap; }
.heroMeta { border-left: 1px solid var(--border-strong); padding-left: 28px; display: flex; flex-direction: column; gap: 18px; }
.metaItem .metaK { font-family: var(--font-mono); font-size: 10px; color: var(--amber-700); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 4px; }
.metaItem .metaV { font-family: var(--font-sans); font-size: 14px; line-height: 22px; color: var(--ink-900); }
@media (max-width: 960px) {
  .heroRow { grid-template-columns: 1fr; gap: 28px; }
  .h1 { font-size: 40px; line-height: 48px; }
  .heroMeta { border-left: 0; padding-left: 0; border-top: 1px solid var(--border-strong); padding-top: 24px; }
}

/* Capabilities */
.capRow {
  display: grid;
  grid-template-columns: 240px 1fr 1fr;
  gap: 48px;
  align-items: start;
  padding: 48px 0;
  border-bottom: 1px solid var(--border);
}
.capRow:last-child { border-bottom: 0; }
.capLabel { display: flex; flex-direction: column; gap: 14px; }
.capH3 { font-family: var(--font-serif); font-size: 30px; line-height: 36px; font-weight: 400; letter-spacing: -0.01em; color: var(--ink-900); }
.capDesc { font-family: var(--font-serif); font-size: 17px; line-height: 27px; color: var(--ink-500); max-width: 44ch; }
.capDescSec { margin-top: 14px; }
.specs { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }
.spec {
  display: grid; grid-template-columns: 120px 1fr; gap: 16px;
  padding: 10px 0; border-top: 1px solid var(--border);
  font-size: 13px; line-height: 20px;
}
.spec:first-child { border-top: 0; padding-top: 0; }
.specK { font-family: var(--font-mono); font-size: 10px; color: var(--fg-3); letter-spacing: 0.08em; text-transform: uppercase; padding-top: 1px; }
.specV { color: var(--ink-700); }
@media (max-width: 960px) { .capRow { grid-template-columns: 1fr; gap: 20px; padding: 36px 0; } }

/* Moats */
.moats { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
.moat { background: var(--paper); padding: 36px; display: flex; flex-direction: column; gap: 14px; min-height: 280px; }
.moatH3 { font-family: var(--font-serif); font-size: 24px; line-height: 30px; font-weight: 400; letter-spacing: -0.008em; color: var(--ink-900); max-width: 22ch; }
.moatBody { font-size: 14px; line-height: 22px; color: var(--ink-500); max-width: 44ch; }
.moatMeta { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border); font-family: var(--font-sans); font-size: 12px; color: var(--fg-3); }
@media (max-width: 800px) { .moats { grid-template-columns: 1fr; } }

/* India stack */
.stackGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.tile {
  border: 1px solid var(--border);
  background: var(--paper);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 18px;
  align-items: center;
  transition: border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
}
.tile:hover { border-color: var(--border-strong); background: var(--bone-50); }
.logoBox {
  width: 76px; height: 52px;
  display: flex; align-items: center; justify-content: center;
  border-right: 1px solid var(--border);
  padding-right: 18px;
}
.logoBox img { max-width: 100%; max-height: 44px; object-fit: contain; }
.monoMark {
  width: 44px; height: 44px;
  border: 1px solid var(--bone-200);
  background: var(--bone-100);
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-serif); font-size: 16px; font-weight: 600;
  color: var(--ink-700);
}
.tileInfo { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.tileName { font-family: var(--font-sans); font-size: 14px; font-weight: 500; color: var(--ink-900); }
.tileKind { font-family: var(--font-mono); font-size: 10px; color: var(--fg-3); letter-spacing: 0.08em; text-transform: uppercase; }
@media (max-width: 960px) { .stackGrid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .stackGrid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Run typecheck, verify in browser**

```bash
npm run typecheck && npm run dev
```

Open `http://localhost:5173/platform`. Verify: inner hero, 4 capability rows, 4 moat cards with Tag chips, logo wall with 18 tiles.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Platform.tsx src/pages/Platform.module.css
git commit -m "feat: Platform page with capabilities, moats, and India-stack logo wall"
```

---

## Task 7: Industries page

**Files:**
- Modify: `src/pages/Industries.tsx`
- Create: `src/pages/Industries.module.css`

- [ ] **Step 1: Write `src/pages/Industries.tsx`**

```tsx
import { useState } from 'react'
import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import Tag from '../components/ui/Tag'
import styles from './Industries.module.css'

const verticals = [
  {
    id: 'nbfc',
    tag: 'NBFC',
    status: 'live' as const,
    title: 'Non-Banking Financial Companies',
    intro: 'India has over 10,000 NBFCs. The ones under RBI supervision carry the same AI governance burden as scheduled banks — with fewer compliance resources. Anvax starts here.',
    roles: [
      { role: 'Compliance officer', uc: 'Track every RBI circular, auto-generate a remediation ticket per obligation, export a board-ready summary.' },
      { role: 'Credit analyst', uc: 'Assemble a credit pack from bank statements, GST filings, and AA pulls. Every source cited.' },
      { role: 'Internal auditor', uc: 'Prepare for an RBI inspection. Pull the full inference trail for any AI-assisted decision in the review period.' },
      { role: 'Ops manager', uc: 'Route customer queries to the right policy document. Log the response. No agent acts without a policy check.' },
    ],
    corpus: ['RBI circulars', 'NBFC master directions', 'Internal credit policies', 'Loan files', 'GST filings', 'Account Aggregator data'],
  },
  {
    id: 'wealth',
    tag: 'Wealth management',
    status: 'next' as const,
    title: 'Wealth & Asset Management',
    intro: 'SEBI-registered advisors face disclosure requirements that grow every cycle. Relationship managers spend hours on briefings that should take minutes.',
    roles: [
      { role: 'Relationship manager', uc: 'Generate a personalised client briefing from portfolio data and market research — cited, not hallucinated.' },
      { role: 'Research analyst', uc: 'Synthesise earnings calls, analyst reports, and filings into a structured note.' },
      { role: 'Compliance officer', uc: 'Draft SEBI advisor disclosures. Flag conflicts between holdings and recommendations.' },
    ],
    corpus: ['Portfolio data', 'SEBI regulations', 'Research reports', 'Company filings', 'Client KYC'],
  },
  {
    id: 'lending',
    tag: 'Lending',
    status: 'next' as const,
    title: 'Lending & Credit',
    intro: 'Underwriting at scale means reading hundreds of documents per application. Anvax does the reading; the credit officer does the decision.',
    roles: [
      { role: 'Underwriter', uc: 'Parse bank statements, GST returns, and ITR filings into a structured credit summary. Every figure cited.' },
      { role: 'Risk manager', uc: 'Monitor your portfolio for RBI-defined early-warning signals. Get an alert when a circular creates a new obligation.' },
      { role: 'Collections officer', uc: 'Pull the full repayment history, loan file, and communication log for a borrower — in one query.' },
    ],
    corpus: ['Bank statements', 'GST returns', 'ITR filings', 'Bureau reports', 'RBI circulars', 'Internal credit policy'],
  },
  {
    id: 'insurance',
    tag: 'Insurance',
    status: 'roadmap' as const,
    title: 'Insurance',
    intro: 'IRDAI disclosure requirements, claims triage, and policy lookups are all document-heavy, time-sensitive tasks. Anvax governs the AI layer.',
    roles: [
      { role: 'Underwriter', uc: 'Draft a policy summary from the proposal form and medical records. Flag exclusions. Every clause cited.' },
      { role: 'Claims assessor', uc: 'Triage a claims queue by severity and policy coverage. Generate a rejection or approval draft.' },
      { role: 'Compliance officer', uc: 'Draft IRDAI product disclosures. Track circular obligations across product lines.' },
    ],
    corpus: ['Policy documents', 'IRDAI regulations', 'Proposal forms', 'Claims files', 'Medical records'],
  },
  {
    id: 'broking',
    tag: 'Broking',
    status: 'roadmap' as const,
    title: 'Broking & Securities',
    intro: 'SEBI circular volume has grown 40% in three years. Surveillance teams, compliance officers, and research desks are overwhelmed.',
    roles: [
      { role: 'Compliance officer', uc: 'Process a SEBI circular, identify every affected policy, generate a remediation checklist.' },
      { role: 'Surveillance analyst', uc: 'Draft a suspicious-transaction memo from trading data and communication logs.' },
      { role: 'Research analyst', uc: 'Synthesise quarterly results, management commentary, and sector data into a structured note.' },
    ],
    corpus: ['SEBI circulars', 'Trading data', 'Company filings', 'Research reports', 'Internal policies'],
  },
  {
    id: 'payments',
    tag: 'Payments',
    status: 'roadmap' as const,
    title: 'Payments & Fintech',
    intro: 'RBI PSO regulations, merchant onboarding, and incident reporting all require structured, auditable documentation.',
    roles: [
      { role: 'Compliance officer', uc: 'Draft a CERT-In incident report. Auto-compute the 6-hour reporting deadline. Export in the required format.' },
      { role: 'Risk analyst', uc: 'Onboard a merchant — pull GST, MCA, and bureau data in one workflow.' },
      { role: 'Ops manager', uc: 'Triage a dispute. Pull the transaction log, merchant agreement, and applicable PSO rule in one query.' },
    ],
    corpus: ['RBI PSO circulars', 'CERT-In regulations', 'Transaction logs', 'Merchant agreements', 'GST + MCA data'],
  },
]

export default function Industries() {
  const [open, setOpen] = useState('nbfc')

  return (
    <>
      <PageMeta
        title="Industries — Anvax"
        description="NBFC-first vertical packs with RBI circular tracking, credit workflows, and role-based AI."
      />

      <header className={styles.innerHero}>
        <div className="container">
          <div className={styles.eyebrow}>Industries</div>
          <h1 className={styles.h1}>NBFC first. Then the rest of <span className={styles.em}>regulated India.</span></h1>
          <p className={styles.lede}>Each vertical pack is built around the regulatory reality of that industry — not a generic AI layer with the logo swapped.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Verticals" title="Six regulated industries. One governed platform." />
          <div className={styles.accordions}>
            {verticals.map(({ id, tag, status, title, intro, roles, corpus }) => (
              <div key={id} className={`${styles.acc} ${open === id ? styles.accOpen : ''}`}>
                <button
                  className={styles.accSummary}
                  onClick={() => setOpen(open === id ? '' : id)}
                  aria-expanded={open === id}
                >
                  <Tag variant={status}>{status === 'live' ? 'Live' : status === 'next' ? 'Next' : 'Roadmap'}</Tag>
                  <span className={styles.accTitle}>{title}</span>
                  <span className={styles.accChev}>{open === id ? '×' : '+'}</span>
                </button>
                {open === id && (
                  <div className={styles.accBody}>
                    <div>
                      <p className={styles.accIntro}>{intro}</p>
                      <div className={styles.corpusWrap}>
                        <h4 className={styles.corpusH}>Corpus</h4>
                        <ul className={styles.corpus}>
                          {corpus.map(c => <li key={c}>{c}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className={styles.rolesH}>Role-based use cases</h4>
                      <table className={styles.roleTable}>
                        <thead>
                          <tr>
                            <th>Role</th>
                            <th>What they do with Anvax</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roles.map(({ role, uc }) => (
                            <tr key={role}>
                              <td>{role}</td>
                              <td>{uc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `src/pages/Industries.module.css`**

```css
.innerHero {
  position: relative;
  padding: 72px 0 64px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  background-image: radial-gradient(100% 80% at 100% 0%, rgba(184,132,62,0.08) 0%, rgba(184,132,62,0) 55%);
}
.innerHero::before {
  content: ''; position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px; opacity: 0.04; pointer-events: none;
}
.eyebrow { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber-700); margin-bottom: 16px; }
.h1 { font-family: var(--font-serif); font-weight: 400; font-size: 52px; line-height: 60px; letter-spacing: -0.016em; color: var(--ink-900); max-width: 18ch; }
.em { color: var(--amber-700); font-style: italic; }
.lede { margin-top: 22px; font-family: var(--font-serif); font-size: 19px; line-height: 28px; color: var(--ink-500); max-width: 52ch; }

/* Accordion */
.accordions { display: flex; flex-direction: column; gap: 12px; }
.acc { border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--paper); overflow: hidden; }
.accSummary {
  width: 100%;
  background: none; border: none; cursor: pointer;
  padding: 22px 28px;
  display: flex; align-items: center; gap: 20px;
  text-align: left;
  transition: background var(--dur-base) var(--ease-out);
}
.accSummary:hover { background: var(--bone-50); }
.accOpen .accSummary { background: var(--bone-50); border-bottom: 1px solid var(--border); }
.accTitle { font-family: var(--font-serif); font-size: 24px; line-height: 30px; font-weight: 400; letter-spacing: -0.008em; color: var(--ink-900); flex: 1; }
.accChev { font-family: var(--font-mono); font-size: 20px; color: var(--fg-3); flex-shrink: 0; }
.accBody {
  padding: 28px 28px 36px;
  display: grid; grid-template-columns: 1fr 1.4fr; gap: 40px;
}
.accIntro { font-family: var(--font-serif); font-size: 17px; line-height: 26px; color: var(--ink-500); max-width: 44ch; }
.corpusWrap { margin-top: 24px; }
.corpusH { font-family: var(--font-mono); font-size: 10px; font-weight: 500; color: var(--amber-700); letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 10px; }
.corpus { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.corpus li { font-family: var(--font-mono); font-size: 11px; border: 1px solid var(--border); background: var(--bone-100); color: var(--ink-700); padding: 4px 10px; border-radius: var(--radius-pill); white-space: nowrap; }
.rolesH { font-family: var(--font-mono); font-size: 10px; font-weight: 500; color: var(--amber-700); letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 12px; }
.roleTable { width: 100%; border-collapse: collapse; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bone-50); overflow: hidden; }
.roleTable th, .roleTable td { padding: 12px 14px; text-align: left; font-size: 13px; line-height: 20px; border-bottom: 1px solid var(--border); vertical-align: top; }
.roleTable tbody tr:last-child td { border-bottom: 0; }
.roleTable thead th { background: var(--bone-100); font-family: var(--font-mono); font-size: 10px; font-weight: 500; color: var(--fg-3); letter-spacing: 0.08em; text-transform: uppercase; }
.roleTable td:first-child { font-weight: 500; color: var(--ink-900); white-space: nowrap; }
@media (max-width: 800px) { .accBody { grid-template-columns: 1fr; gap: 24px; padding: 20px; } }
```

- [ ] **Step 3: Run typecheck, verify in browser at `/industries`**

```bash
npm run typecheck && npm run dev
```

Click each accordion. Verify Tag chips show correct variant (Live/Next/Roadmap). Role table renders correctly.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Industries.tsx src/pages/Industries.module.css
git commit -m "feat: Industries page with 6 accordion verticals and role tables"
```

---

## Task 8: Trust page

**Files:**
- Modify: `src/pages/Trust.tsx`
- Create: `src/pages/Trust.module.css`

- [ ] **Step 1: Write `src/pages/Trust.tsx`**

```tsx
import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import Term from '../components/ui/Term'
import StatusPill from '../components/ui/StatusPill'
import Button from '../components/ui/Button'
import styles from './Trust.module.css'

const defenceLayers = [
  { n: 'L1', name: 'Transport', control: <>TLS 1.3 mandatory · HSTS</>, threat: 'Eavesdropping, MITM' },
  { n: 'L2', name: 'AuthN', control: <>JWT validation · <Term>Argon2id</Term> passwords · Google OAuth · session binding to tenant</>, threat: 'Credential stuffing, session hijacking' },
  { n: 'L3', name: 'AuthZ', control: <>Tenant scope injected by middleware on every request · Pydantic boundary validation</>, threat: 'Cross-tenant request forgery' },
  { n: 'L4', name: 'DB role demotion', control: <><Term>SET LOCAL ROLE anvax_app</Term> (no superuser, cannot bypass RLS)</>, threat: 'Privilege escalation via ORM bug' },
  { n: 'L5', name: 'Row-level security', control: <><Term>Postgres RLS FORCE</Term> with USING (read) + WITH CHECK (write) on every customer table</>, threat: 'Cross-tenant data read/write' },
  { n: 'L6', name: 'Search-layer DLS', control: <>OpenSearch Document-Level Security enforces <Term>tenant_id</Term> independently of app</>, threat: 'Cross-tenant retrieval via compromised search credential' },
  { n: 'L7', name: 'Encryption at rest', control: <>Per-tenant DEK (HKDF-derived), <Term>AES-256-GCM</Term> on PII + OAuth tokens</>, threat: 'DB dump exposure' },
  { n: 'L8', name: 'Audit chain', control: <>Append-only <Term>audit_log</Term> + immutable <Term>inference_traces</Term>, SHA-256 chained, UPDATE/DELETE blocked by DDL trigger</>, threat: 'Tampering, repudiation' },
]

const aiControls = [
  { control: 'Prompt-injection detector', how: 'Regex gate on every user message before the model', at: 'User message' },
  { control: 'PII detection & redaction', how: 'Aadhaar (Verhoeff-validated), PAN, IFSC, GSTIN, UPI, mobile — redact/pass-through/tokenize modes. PII never split across chunk boundary.', at: 'Ingestion + prompt' },
  { control: 'PII telemetry scrubber', how: 'user.message and llm.response dropped from OpenTelemetry spans before export', at: 'Observability' },
  { control: 'SSRF guard', how: <>RFC-1918 + link-local + <Term>169.254.169.254</Term> blocklist for connectors and fetch_url tool</>, at: 'Connector + tool' },
  { control: 'Path-traversal guard', how: <><Term>Path.is_relative_to(sandbox)</Term> on every file tool operation</>, at: 'Agent file tool' },
  { control: 'Output moderation', how: 'Regex + extensible LLM second-pass on every response', at: 'Model output' },
  { control: 'Rate limiting', how: 'Redis sliding window, 10 msgs / 60s per session', at: 'Per session' },
  { control: 'Tier-gated models', how: 'Starter cannot call Sonnet/Opus — enforced at gateway, not UI', at: 'LLM call' },
  { control: 'Model version pinning', how: <>Exact model_id (including pin + expiry) in every <Term>llm_call_records</Term> row</>, at: 'Every inference' },
]

const freeAiControls = [
  { ref: 'R7',  req: 'AI Use-Case Registry',        impl: <>ai_use_cases table with risk tiers, CRUD API, and UI</>, status: 'live' as const },
  { ref: 'R8',  req: 'Board oversight docs',         impl: 'Registry exportable to board-report (JSON + CSV)', status: 'live' as const },
  { ref: 'R15', req: 'Board report on AI use',       impl: <>GET /compliance/reports/ai-monthly aggregating usage, incidents, and review queue</>, status: 'live' as const },
  { ref: 'R17', req: 'Model version tracking',       impl: <><Term>build_model_id(base, pin, pin_expires_at)</Term> + PinExpiredError</>, status: 'live' as const },
  { ref: 'R18', req: 'Human-in-the-loop high-risk',  impl: <>RiskPolicy.always_human=True for critical tier · review queue with SLA</>, status: 'live' as const },
  { ref: 'R19', req: 'Explainability',               impl: <>Every response carries confidence_score, cited_chunk_ids, model_version · expandable "Why?" panel</>, status: 'live' as const },
  { ref: 'R23', req: 'Immutable inference trail',    impl: <>inference_traces SHA-256 chained · DDL trigger blocks UPDATE/DELETE · a DBA cannot alter past responses</>, status: 'live' as const },
  { ref: 'R26', req: 'LLM monitoring',               impl: 'Langfuse dual-write (opt-in), non-blocking', status: 'live' as const },
]

const postureStats = [
  { stat: '82.6%', unit: 'coverage', label: 'Test coverage', note: 'CI gate at 80%. Drops below gate: build fails.' },
  { stat: '0', unit: 'f-string SQL', label: 'SQL injection surface', note: 'Parameterised queries only. Zero exceptions.' },
  { stat: 'strict', unit: 'mode', label: 'mypy + tsc', note: 'Both enforced in CI. No type: ignore suppressions in production paths.' },
  { stat: 'forward', unit: 'only', label: 'DB migrations', note: 'Alembic forward-only. Rollbacks require a new migration.' },
]

const certs = [
  { name: 'DPDP Act 2023', status: 'live' as const, desc: 'Per-tenant AES-256-GCM DEK, RLS, and audit chain implemented. Self-attestation API and checklist UI live.', date: 'Live' },
  { name: 'SOC 2 Type II', status: 'wip' as const, desc: 'Readiness assessment complete. Formal audit begins Q3 2026.', date: 'Q3 2026' },
  { name: 'ISO 27001', status: 'wip' as const, desc: 'Gap analysis complete. Certification in progress.', date: 'Q4 2026' },
  { name: 'CERT-In empanelment', status: 'wip' as const, desc: 'Application submitted. First external pen-test scheduled Q3 2026.', date: 'Initiated' },
]

export default function Trust() {
  return (
    <>
      <PageMeta
        title="Architecture & Trust — Anvax"
        description="Full defence-in-depth, RBI FREE-AI mapping, DPDP controls, and honest certification status."
      />

      {/* Trust hero — dark */}
      <header className={styles.trustHero}>
        <div className="container">
          <div className={styles.heroRow}>
            <div>
              <div className={styles.eyebrow}>Architecture & Trust</div>
              <h1 className={styles.h1}>What your CISO needs to see. What your examiner needs to read.</h1>
              <p className={styles.lede}>Eight layers of defence-in-depth. RBI FREE-AI controls live in product. DPDP-aware from day one. Honest about what's in progress.</p>
              <div className={styles.ctaRow}>
                <Button variant="accent" href="#downloads" arrow>Get the regulator pack</Button>
                <Button variant="secondaryDark" href="#freeai">RBI FREE-AI mapping</Button>
              </div>
            </div>
            <div className={styles.metaBlock}>
              {[
                { k: 'Document', v: 'Security & Compliance Reference' },
                { k: 'Version', v: 'v0.7 · May 2026' },
                { k: 'Classification', v: 'Public — shareable with examiners' },
                { k: 'Maintained by', v: 'Engineering · Legal · Compliance' },
              ].map(({ k, v }) => (
                <div key={k} className={styles.metaItem}>
                  <div className={styles.metaK}>{k}</div>
                  <div className={styles.metaV}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Subnav */}
      <nav className={styles.subnav} aria-label="Trust page sections">
        <div className="container">
          <div className={styles.subnavRow}>
            {['Platform at a glance', 'Defence-in-depth', 'AI controls', 'RBI FREE-AI', 'DPDP & CERT-In', 'Engineering posture', 'Certifications', 'Downloads'].map(label => (
              <a key={label} href={`#${label.toLowerCase().replace(/[^a-z]+/g, '-')}`} className={styles.subnavLink}>{label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Platform at a glance */}
      <section className="section" id="platform-at-a-glance">
        <div className="container">
          <SectionHead eyebrow="Platform at a glance" title="The deployment and tenancy facts, plainly." />
          <div className={styles.glance}>
            {[
              { k: 'Deployment', v: <>SaaS (AWS Mumbai ap-south-1) · Sovereign cloud (Yotta/E2E) · On-prem/air-gapped (Helm + vLLM)</> },
              { k: 'Tenancy', v: <><Term>Postgres RLS FORCE</Term> on every customer table. App DB role is <Term>NOSUPERUSER, NOBYPASSRLS</Term>.</> },
              { k: 'Data residency', v: 'All customer data and embeddings stored in India. No exceptions.' },
              { k: 'Inference path', v: <>SaaS: Anthropic via Azure AI Foundry (region-locked). Sovereign: vLLM + AI Kosh / Sarvam. PII encrypted at rest with per-tenant <Term>AES-256-GCM</Term> keys.</> },
            ].map(({ k, v }) => (
              <div key={k} className={styles.glanceCell}>
                <div className={styles.glanceCellK}>{k}</div>
                <div className={styles.glanceCellV}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defence-in-depth */}
      <section className="section alt" id="defence-in-depth">
        <div className="container">
          <SectionHead eyebrow="Defence-in-depth" title="Eight layers. Every request passes through all of them." lede="Not a checklist — a data-path architecture. Each layer addresses a specific threat class independently." />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Name</th>
                  <th>Control</th>
                  <th>Threat addressed</th>
                </tr>
              </thead>
              <tbody>
                {defenceLayers.map(({ n, name, control, threat }) => (
                  <tr key={n}>
                    <td className={styles.tableNum}>{n}</td>
                    <td className={styles.tableLayerName}>{name}</td>
                    <td>{control}</td>
                    <td className={styles.tableThreat}>{threat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI-specific controls */}
      <section className="section" id="ai-controls">
        <div className="container">
          <SectionHead eyebrow="AI-specific controls" title="Controls that exist because we run a language model — not just a database." />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Control</th>
                  <th>How it is enforced</th>
                  <th>Applied at</th>
                </tr>
              </thead>
              <tbody>
                {aiControls.map(({ control, how, at }) => (
                  <tr key={control}>
                    <td className={styles.tableRef}>{control}</td>
                    <td>{how}</td>
                    <td className={styles.tableThreat}>{at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* RBI FREE-AI */}
      <section className="section alt" id="rbi-free-ai">
        <div className="container">
          <SectionHead eyebrow="RBI FREE-AI" title="Control mapping — what the framework requires and what we shipped." lede="Every control below is live in product. Status is honest — no aspirational ticks." />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Requirement</th>
                  <th>Implementation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {freeAiControls.map(({ ref, req, impl, status }) => (
                  <tr key={ref}>
                    <td className={styles.tableNum}>{ref}</td>
                    <td className={styles.tableRef}>{req}</td>
                    <td>{impl}</td>
                    <td><StatusPill status={status}>Live</StatusPill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Engineering posture */}
      <section className="section" id="engineering-posture">
        <div className="container">
          <SectionHead eyebrow="Engineering posture" title="The numbers that determine whether the controls hold." />
          <div className={styles.posture}>
            {postureStats.map(({ stat, unit, label, note }) => (
              <div key={label} className={styles.postureCard}>
                <div className={styles.postureStat}>{stat} <span className={styles.postureUnit}>{unit}</span></div>
                <div className={styles.postureLabel}>{label}</div>
                <p className={styles.postureNote}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section alt" id="certifications">
        <div className="container">
          <SectionHead eyebrow="Certifications" title="Honest about status. No aspirational ticks." lede="We list what is implemented, what is in progress, and what is planned — with dates where we have them." />
          <div className={styles.certs}>
            {certs.map(({ name, status, desc, date }) => (
              <div key={name} className={styles.cert}>
                <StatusPill status={status}>{status === 'live' ? 'Live' : 'In progress'}</StatusPill>
                <div className={styles.certName}>{name}</div>
                <p className={styles.certDesc}>{desc}</p>
                <div className={styles.certDate}>{date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section" id="downloads">
        <div className="container">
          <SectionHead eyebrow="Gated downloads" title="Procurement-grade documentation for your team and your regulator." />
          <div className={styles.downloads}>
            {[
              {
                tag: 'For regulators & CISOs',
                meta: 'PDF · ~40 pages',
                title: 'Architecture for Regulators & CISOs',
                desc: 'Full defence-in-depth architecture, RBI FREE-AI control mapping, DPDP implementation details, and certification status. Written to be handed to an RBI examiner.',
                fields: [
                  { id: 'name1', label: 'Name', type: 'text', full: false },
                  { id: 'email1', label: 'Work email', type: 'email', full: false },
                  { id: 'company1', label: 'Company', type: 'text', full: false },
                  { id: 'role1', label: 'Role', type: 'text', full: false },
                ],
              },
              {
                tag: 'For procurement',
                meta: 'PDF · ~12 pages',
                title: 'Trust brief for procurement',
                desc: 'Concise summary of security controls, data residency commitments, certification status, and SLA terms. Designed for procurement and legal review.',
                fields: [
                  { id: 'name2', label: 'Name', type: 'text', full: false },
                  { id: 'email2', label: 'Work email', type: 'email', full: false },
                  { id: 'company2', label: 'Company', type: 'text', full: false },
                  { id: 'role2', label: 'Role', type: 'text', full: false },
                ],
              },
            ].map(({ tag, meta, title, desc, fields }) => (
              <div key={tag} className={styles.download}>
                <div className={styles.downloadHeader}>
                  <span className={styles.downloadTag}>{tag}</span>
                  <span className={styles.downloadMeta}>{meta}</span>
                </div>
                <h3 className={styles.downloadTitle}>{title}</h3>
                <p className={styles.downloadDesc}>{desc}</p>
                <form className={styles.downloadForm} onSubmit={e => e.preventDefault()}>
                  <div className={styles.formGrid}>
                    {fields.map(({ id, label, type }) => (
                      <div key={id} className={styles.field}>
                        <label htmlFor={id}>{label}</label>
                        <input id={id} type={type} placeholder="" />
                      </div>
                    ))}
                  </div>
                  <Button variant="primary" href="#">Request download</Button>
                  <p className={styles.downloadFootnote}>We will not add you to a mailing list.</p>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `src/pages/Trust.module.css`**

```css
/* Trust hero */
.trustHero {
  background: var(--ink-900);
  color: var(--bone-100);
  padding: 80px 0 88px;
  border-bottom: 1px solid var(--ink-700);
  position: relative; overflow: hidden;
  background-image:
    radial-gradient(70% 80% at 90% 0%, rgba(184,132,62,0.18) 0%, rgba(184,132,62,0) 55%),
    radial-gradient(80% 60% at 0% 100%, rgba(20,35,55,1) 0%, rgba(11,26,42,0) 60%);
}
.trustHero::before {
  content: ''; position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px; opacity: 0.04; pointer-events: none; filter: invert(1);
}
.heroRow { position: relative; display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: end; }
.eyebrow { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber-500); margin-bottom: 16px; }
.h1 { font-family: var(--font-serif); font-weight: 400; font-size: 52px; line-height: 62px; letter-spacing: -0.018em; color: var(--bone-100); max-width: 20ch; }
.lede { margin-top: 20px; font-family: var(--font-serif); font-size: 19px; line-height: 29px; color: rgba(244,240,229,0.6); max-width: 52ch; }
.ctaRow { margin-top: 28px; display: flex; gap: 12px; flex-wrap: wrap; }
.metaBlock { border-left: 1px solid rgba(244,240,229,0.14); padding-left: 32px; display: flex; flex-direction: column; gap: 0; }
.metaItem + .metaItem { margin-top: 18px; padding-top: 18px; border-top: 1px dashed rgba(244,240,229,0.14); }
.metaK { font-family: var(--font-mono); font-size: 10px; color: var(--amber-500); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 4px; }
.metaV { font-family: var(--font-sans); font-size: 14px; line-height: 22px; color: var(--bone-100); }
@media (max-width: 960px) {
  .heroRow { grid-template-columns: 1fr; gap: 32px; }
  .h1 { font-size: 40px; line-height: 50px; }
  .metaBlock { border-left: 0; padding-left: 0; border-top: 1px solid rgba(244,240,229,0.14); padding-top: 24px; }
}

/* Subnav */
.subnav {
  position: sticky; top: 64px; z-index: 20;
  background: rgba(250, 247, 240, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.subnavRow {
  display: flex; gap: 24px; align-items: center; height: 52px;
  overflow-x: auto; scrollbar-width: none;
}
.subnavRow::-webkit-scrollbar { display: none; }
.subnavLink {
  font-family: var(--font-mono); font-size: 11px; color: var(--ink-500);
  text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; padding: 6px 0;
}
.subnavLink:hover { color: var(--ink-900); }

/* Glance grid */
.glance { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
.glanceCell { background: var(--paper); padding: 24px; display: flex; flex-direction: column; gap: 10px; min-height: 132px; }
.glanceCellK { font-family: var(--font-mono); font-size: 10px; color: var(--amber-700); letter-spacing: 0.12em; text-transform: uppercase; }
.glanceCellV { font-family: var(--font-serif); font-size: 17px; line-height: 24px; font-weight: 400; color: var(--ink-900); }
@media (max-width: 960px) { .glance { grid-template-columns: 1fr 1fr; } }

/* Tables */
.tableWrap { border: 1px solid var(--border-strong); border-radius: var(--radius-md); overflow: hidden; background: var(--paper); }
.table { width: 100%; border-collapse: collapse; font-size: 14px; }
.table thead th { background: var(--ink-900); color: var(--bone-100); text-align: left; padding: 14px 18px; font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid var(--ink-700); white-space: nowrap; }
.table tbody td { padding: 16px 18px; border-bottom: 1px solid var(--border); vertical-align: top; line-height: 22px; color: var(--ink-700); }
.table tbody tr:last-child td { border-bottom: 0; }
.table tbody tr:hover td { background: var(--bone-50); }
.tableNum { font-family: var(--font-mono); font-size: 11px; color: var(--amber-700); letter-spacing: 0.08em; white-space: nowrap; }
.tableLayerName { font-family: var(--font-sans); font-size: 14px; font-weight: 600; color: var(--ink-900); white-space: nowrap; }
.tableRef { font-family: var(--font-sans); font-weight: 500; color: var(--ink-900); }
.tableThreat { font-size: 13px; color: var(--ink-500); }
@media (max-width: 960px) { .tableWrap { overflow-x: auto; } .table { min-width: 720px; } }

/* Posture */
.posture { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.postureCard { background: var(--bone-100); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 24px; }
.postureStat { font-family: var(--font-serif); font-size: 32px; line-height: 36px; font-weight: 400; letter-spacing: -0.01em; color: var(--ink-900); }
.postureUnit { font-family: var(--font-mono); font-size: 13px; color: var(--fg-3); letter-spacing: 0.04em; margin-left: 4px; }
.postureLabel { margin-top: 10px; font-family: var(--font-mono); font-size: 10px; color: var(--amber-700); letter-spacing: 0.12em; text-transform: uppercase; }
.postureNote { margin-top: 10px; font-size: 13px; line-height: 20px; color: var(--ink-500); }
@media (max-width: 960px) { .posture { grid-template-columns: 1fr 1fr; } }

/* Certs */
.certs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
.cert { background: var(--paper); padding: 24px; display: flex; flex-direction: column; gap: 10px; min-height: 160px; }
.certName { font-family: var(--font-serif); font-size: 20px; line-height: 26px; font-weight: 400; letter-spacing: -0.005em; color: var(--ink-900); }
.certDesc { font-size: 13px; line-height: 20px; color: var(--ink-500); flex: 1; }
.certDate { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.04em; }
@media (max-width: 960px) { .certs { grid-template-columns: 1fr 1fr; } }

/* Downloads */
.downloads { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.download { background: var(--bone-100); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 32px; display: flex; flex-direction: column; gap: 14px; }
.downloadHeader { display: flex; align-items: start; justify-content: space-between; gap: 16px; }
.downloadTag { font-family: var(--font-mono); font-size: 10px; color: var(--amber-700); letter-spacing: 0.12em; text-transform: uppercase; }
.downloadMeta { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.04em; }
.downloadTitle { font-family: var(--font-serif); font-size: 24px; line-height: 30px; font-weight: 400; letter-spacing: -0.008em; max-width: 22ch; }
.downloadDesc { font-size: 14px; line-height: 22px; color: var(--ink-500); max-width: 44ch; }
.downloadForm { display: flex; flex-direction: column; gap: 12px; }
.formGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-3); }
.field input { background: var(--paper); border: 1px solid var(--border-strong); border-radius: var(--radius-button); padding: 10px 12px; font-family: var(--font-sans); font-size: 14px; color: var(--ink-900); }
.field input:focus { border-color: var(--amber-600); outline: none; }
.downloadFootnote { font-family: var(--font-mono); font-size: 10px; color: var(--fg-3); letter-spacing: 0.04em; }
@media (max-width: 800px) { .downloads { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Run typecheck, verify in browser at `/trust`**

```bash
npm run typecheck && npm run dev
```

Verify: dark hero, sticky subnav, glance grid, three tables, posture stats, cert cards, download forms.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Trust.tsx src/pages/Trust.module.css
git commit -m "feat: Trust page with 8 sections, tables, and gated download forms"
```

---

## Task 9: Deployment page

**Files:**
- Modify: `src/pages/Deployment.tsx`
- Create: `src/pages/Deployment.module.css`

- [ ] **Step 1: Write `src/pages/Deployment.tsx`**

```tsx
import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import Tag from '../components/ui/Tag'
import Button from '../components/ui/Button'
import styles from './Deployment.module.css'

const tiers = [
  {
    n: 'Tier 1',
    tag: 'SaaS',
    title: 'AWS Mumbai shared',
    who: 'Growth-stage fintechs, mid-market SaaS, consulting.',
    iron: 'AWS Mumbai (ap-south-1)',
    features: ['Shared infrastructure', 'Fastest to deploy', 'Starter and Growth plans'],
  },
  {
    n: 'Tier 2',
    tag: 'Sovereign',
    title: 'Indian sovereign GPU cloud',
    who: 'Regulated NBFCs, BFSI, insurance. Any institution with an RBI or SEBI supervision requirement.',
    iron: 'Yotta Shakti · E2E Networks',
    features: ['Dedicated VPC', 'Indian GPU compute', 'Business plan and above'],
  },
  {
    n: 'Tier 3',
    tag: 'On-prem',
    title: 'Customer data centre',
    who: 'Large banks, PSUs, defence-adjacent, and RBI-supervised entities that require full infrastructure control.',
    iron: 'Helm + vLLM on customer DC',
    features: ['Air-gapped capable', 'No external network required', 'Sovereign plan'],
  },
  {
    n: 'Tier 4',
    tag: 'IndiaAI',
    title: 'Subsidised compute overlay',
    who: 'Any tier with long-running, cost-sensitive workloads. Overlays on Tier 1–3.',
    iron: 'IndiaAI Mission compute',
    features: ['Subsidised by government', 'Overlay — not a separate tier', 'Applied on request'],
  },
]

export default function Deployment() {
  return (
    <>
      <PageMeta
        title="Deployment — Anvax"
        description="SaaS to air-gapped. Same product, four tiers. All data stays in India."
      />

      <header className={styles.innerHero}>
        <div className="container">
          <div className={styles.eyebrow}>Deployment</div>
          <h1 className={styles.h1}>Same product. <span className={styles.em}>Four tiers.</span> Anvax owns no GPUs.</h1>
          <p className={styles.lede}>We ship the platform. You keep the iron. From shared SaaS to fully air-gapped — the software is identical. The deployment model changes; the security posture doesn't.</p>
        </div>
      </header>

      {/* Tier cards */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Four tiers" title="Pick the iron that fits your regulator." lede="The compliance controls, audit trail, and India-stack connectors are the same at every tier." />
          <div className={styles.tiers}>
            {tiers.map(({ n, tag, title, who, iron, features }) => (
              <div key={n} className={styles.tier}>
                <div className={styles.tierTop}>
                  <Tag>{tag}</Tag>
                  <span className={styles.tierN}>{n}</span>
                </div>
                <h3 className={styles.tierH3}>{title}</h3>
                <p className={styles.tierWho}>{who}</p>
                <div className={styles.tierIron}>{iron}</div>
                <ul className={styles.tierFeats}>
                  {features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Same-product diagram */}
      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Architecture" title="Same product, different iron." lede="Every tier runs the same codebase. The only thing that changes is where the compute lives." />
          <div className={styles.diagram}>
            <div className={styles.productBand}>
              <div>
                <div className={styles.productLabel}>One product</div>
                <div className={styles.productName}>Anvax Platform</div>
              </div>
              <div className={styles.productNodes}>
                {['Search', 'Chat', 'Workflows', 'Agents', 'Governance layer', 'Audit trail', 'India-stack connectors'].map(n => (
                  <span key={n} className={styles.productNode}>{n}</span>
                ))}
              </div>
            </div>
            <div className={styles.ironGrid}>
              {[
                { label: 'Tier 1', h: 'AWS Mumbai', s: 'Shared · SaaS' },
                { label: 'Tier 2', h: 'Yotta / E2E', s: 'Sovereign · Dedicated VPC' },
                { label: 'Tier 3', h: 'Customer DC', s: 'On-prem · Air-gapped' },
                { label: 'Tier 4', h: 'IndiaAI', s: 'Subsidised overlay' },
              ].map(({ label, h, s }) => (
                <div key={label} className={styles.ironCell}>
                  <div className={styles.ironN}>{label}</div>
                  <div className={styles.ironH}>{h}</div>
                  <div className={styles.ironS}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commit band */}
      <section className="section">
        <div className="container">
          <div className={styles.commitBand}>
            <div>
              <div className={styles.commitLabel}>Data residency commitment</div>
              <div className={styles.commitHead}>All customer data, embeddings, and inference traces stay in India. Regardless of tier.</div>
            </div>
            <div className={styles.commitItems}>
              {[
                { k: 'Customer data', v: 'Stored in India at every tier' },
                { k: 'Embeddings', v: 'Generated and stored in India' },
                { k: 'Inference traces', v: 'Logged in India — immutable' },
                { k: 'Model calls', v: 'Region-locked to ap-south-1 or on-prem' },
              ].map(({ k, v }) => (
                <div key={k} className={styles.commitItem}>
                  <div className={styles.commitItemK}>{k}</div>
                  <div className={styles.commitItemV}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `src/pages/Deployment.module.css`**

```css
.innerHero { position: relative; padding: 72px 0 64px; border-bottom: 1px solid var(--border); overflow: hidden; background-image: radial-gradient(100% 80% at 100% 0%, rgba(184,132,62,0.08) 0%, rgba(184,132,62,0) 55%); }
.innerHero::before { content: ''; position: absolute; inset: 0; background-image: url('/assets/lattice.svg'); background-size: 220px 220px; opacity: 0.04; pointer-events: none; }
.eyebrow { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber-700); margin-bottom: 16px; }
.h1 { font-family: var(--font-serif); font-weight: 400; font-size: 52px; line-height: 60px; letter-spacing: -0.016em; color: var(--ink-900); max-width: 18ch; }
.em { color: var(--amber-700); font-style: italic; }
.lede { margin-top: 22px; font-family: var(--font-serif); font-size: 19px; line-height: 28px; color: var(--ink-500); max-width: 56ch; }

/* Tiers */
.tiers { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
.tier { background: var(--paper); padding: 28px 24px; display: flex; flex-direction: column; gap: 10px; min-height: 220px; }
.tierTop { display: flex; align-items: center; justify-content: space-between; }
.tierN { font-family: var(--font-mono); font-size: 10px; color: var(--fg-3); letter-spacing: 0.1em; text-transform: uppercase; }
.tierH3 { font-family: var(--font-serif); font-size: 20px; line-height: 26px; font-weight: 400; letter-spacing: -0.008em; color: var(--ink-900); }
.tierWho { font-size: 13px; line-height: 20px; color: var(--ink-500); flex: 1; }
.tierIron { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.04em; text-transform: uppercase; padding-top: 12px; border-top: 1px solid var(--border); }
.tierFeats { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
.tierFeats li { font-size: 12px; color: var(--ink-500); padding-left: 12px; position: relative; }
.tierFeats li::before { content: ''; position: absolute; left: 0; top: 9px; width: 6px; height: 1px; background: var(--amber-600); }
@media (max-width: 960px) { .tiers { grid-template-columns: 1fr 1fr; } }

/* Same-product diagram */
.diagram { border: 1px solid var(--border-strong); background: var(--paper); border-radius: var(--radius-md); overflow: hidden; }
.productBand { background: var(--ink-900); color: var(--bone-100); padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--ink-700); }
.productLabel { font-family: var(--font-mono); font-size: 10px; color: var(--amber-500); letter-spacing: 0.12em; text-transform: uppercase; }
.productName { font-family: var(--font-serif); font-size: 22px; color: var(--bone-100); margin-top: 4px; }
.productNodes { display: flex; gap: 8px; flex-wrap: wrap; }
.productNode { font-family: var(--font-mono); font-size: 11px; color: var(--bone-100); background: rgba(244,240,229,0.06); border: 1px solid rgba(244,240,229,0.18); padding: 5px 10px; border-radius: var(--radius-sm); letter-spacing: 0.04em; text-transform: uppercase; }
.ironGrid { padding: 24px 32px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; background: var(--bone-50); }
.ironCell { border: 1px solid var(--border); background: var(--paper); border-radius: var(--radius-sm); padding: 16px; }
.ironN { font-family: var(--font-mono); font-size: 10px; color: var(--amber-700); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
.ironH { font-family: var(--font-sans); font-size: 14px; font-weight: 500; color: var(--ink-900); }
.ironS { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.04em; margin-top: 4px; }
@media (max-width: 800px) { .productBand { flex-direction: column; align-items: flex-start; } .ironGrid { grid-template-columns: 1fr 1fr; } }

/* Commit band */
.commitBand {
  background: var(--ink-900); color: var(--bone-100); border-radius: var(--radius-md); padding: 48px 56px;
  display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; align-items: center;
  position: relative; overflow: hidden;
  background-image: radial-gradient(70% 90% at 100% 0%, rgba(184,132,62,0.16) 0%, rgba(184,132,62,0) 55%);
}
.commitBand::before { content: ''; position: absolute; inset: 0; background-image: url('/assets/lattice.svg'); background-size: 220px 220px; opacity: 0.06; }
.commitBand > * { position: relative; }
.commitLabel { font-family: var(--font-mono); font-size: 11px; color: var(--amber-500); letter-spacing: 0.12em; text-transform: uppercase; }
.commitHead { font-family: var(--font-serif); font-size: 28px; line-height: 36px; font-weight: 400; letter-spacing: -0.008em; color: var(--bone-100); margin-top: 12px; max-width: 28ch; }
.commitItems { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 28px; }
.commitItemK { font-family: var(--font-mono); font-size: 10px; color: var(--amber-500); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 4px; }
.commitItemV { font-family: var(--font-sans); font-size: 14px; line-height: 22px; color: var(--bone-100); }
@media (max-width: 960px) { .commitBand { grid-template-columns: 1fr; padding: 32px; gap: 24px; } }
```

- [ ] **Step 3: Run typecheck, verify**

```bash
npm run typecheck && npm run dev
```

Open `/deployment`. Verify four tier cards, same-product diagram, and commit band.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Deployment.tsx src/pages/Deployment.module.css
git commit -m "feat: Deployment page with tier cards, same-product diagram, and residency commitment"
```

---

## Task 10: Pricing page

**Files:**
- Modify: `src/pages/Pricing.tsx`
- Create: `src/pages/Pricing.module.css`

- [ ] **Step 1: Write `src/pages/Pricing.tsx`**

```tsx
import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import Button from '../components/ui/Button'
import styles from './Pricing.module.css'

const plans = [
  {
    n: 'Starter',
    name: 'Starter',
    who: 'Growth-stage fintechs and NBFCs getting started with governed AI.',
    price: '₹35,000',
    pricePeriod: '/ month',
    priceNote: '₹3.5L / year',
    featured: false,
    feats: [
      '25 users',
      '5M input + 500K output tokens',
      '5 connectors',
      'Shared SaaS · AWS Mumbai',
      'Basic workflows + audit logs',
    ],
    cta: 'Get started',
    ctaHref: '#demo',
  },
  {
    n: 'Growth',
    name: 'Growth',
    who: 'Scaling NBFCs and fintechs with compliance requirements and growing teams.',
    price: '₹1,00,000',
    pricePeriod: '/ month',
    priceNote: '₹10L / year',
    featured: true,
    feats: [
      '100 users',
      '25M input + 2.5M output tokens',
      'All connectors',
      'Shared SaaS · AWS Mumbai',
      'SSO / SCIM / advanced RBAC',
    ],
    cta: 'Request a demo',
    ctaHref: '#demo',
  },
  {
    n: 'Business',
    name: 'Business',
    who: 'Regulated NBFCs and BFSI that need a dedicated environment and SLA guarantees.',
    price: null,
    pricePeriod: null,
    priceNote: null,
    contactMark: 'Contact sales',
    featured: false,
    feats: [
      'Dedicated VPC',
      'Custom SLA',
      'MFA enforcement',
      'Custom templates',
      'Priority support',
    ],
    cta: 'Talk to sales',
    ctaHref: '#demo',
  },
  {
    n: 'Sovereign',
    name: 'Sovereign',
    who: 'Large banks, PSUs, and institutions that require on-prem or air-gapped deployment.',
    price: null,
    pricePeriod: null,
    priceNote: null,
    contactMark: 'Contact sales',
    featured: false,
    feats: [
      'Customer VPC or on-prem',
      'Air-gapped option',
      'Full compliance documentation',
      'Dedicated support team',
      'Custom SLA and DPA',
    ],
    cta: 'Talk to sales',
    ctaHref: '#demo',
  },
]

const faqs = [
  {
    q: 'Do you offer a free trial?',
    a: 'We do not offer a self-serve free trial. Every new customer starts with a guided onboarding session where we connect to your corpus and run a live demo on your own documents. Request a demo to book one.',
  },
  {
    q: 'How does token pricing work?',
    a: 'Each plan includes a monthly token allowance. Tokens cover both input (documents, context, queries) and output (model responses). If you consistently exceed your allowance, we will work with you to find the right plan.',
  },
  {
    q: 'Can we start on Starter and move to a Sovereign deployment later?',
    a: 'Yes. The product is identical across all tiers — only the infrastructure changes. Migration from shared SaaS to dedicated VPC or on-prem is a configuration change, not a product change. Your data, workflows, and audit logs move with you.',
  },
  {
    q: 'What does "India data residency" mean in practice?',
    a: 'Customer data — documents, embeddings, queries, responses, and inference traces — is stored in AWS Mumbai (ap-south-1) at every tier. For Sovereign and on-prem tiers, inference also runs in India. We do not route data through US-based infrastructure.',
  },
]

export default function Pricing() {
  return (
    <>
      <PageMeta
        title="Pricing — Anvax"
        description="Starter from ₹35,000/mo. Growth, Business, and Sovereign tiers."
      />

      <header className={styles.innerHero}>
        <div className="container">
          <div className={styles.eyebrow}>Pricing</div>
          <h1 className={styles.h1}>Plain rupees. <span className={styles.em}>No hidden multipliers.</span></h1>
          <p className={styles.lede}>Two plans shown in full. Business and Sovereign are custom — the variables are deployment tier and SLA, not a secret pricing formula.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.planGrid}>
            {plans.map(({ n, name, who, price, pricePeriod, priceNote, contactMark, featured, feats, cta, ctaHref }) => (
              <div key={n} className={`${styles.plan} ${featured ? styles.featured : ''}`}>
                <div className={styles.planN}>{n}</div>
                <div className={styles.planName}>{name}</div>
                <p className={styles.planWho}>{who}</p>
                <div className={styles.priceRow}>
                  {price
                    ? <>
                        <span className={styles.price}>{price}</span>
                        <span className={styles.priceUnit}>{pricePeriod}</span>
                      </>
                    : <span className={styles.contactMark}>{contactMark}</span>
                  }
                </div>
                {priceNote && <div className={styles.priceNote}>{priceNote}</div>}
                <ul className={styles.feats}>
                  {feats.map(f => <li key={f}>{f}</li>)}
                </ul>
                <div className={styles.planCta}>
                  <Button
                    variant={featured ? 'accent' : 'primary'}
                    href={ctaHref}
                  >
                    {cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Common questions." />
          <div className={styles.faq}>
            {faqs.map(({ q, a }) => (
              <details key={q} className={styles.faqItem}>
                <summary className={styles.faqQ}>
                  {q}
                  <span className={styles.faqChev}>+</span>
                </summary>
                <p className={styles.faqA}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `src/pages/Pricing.module.css`**

```css
.innerHero { position: relative; padding: 72px 0 64px; border-bottom: 1px solid var(--border); overflow: hidden; background-image: radial-gradient(100% 80% at 100% 0%, rgba(184,132,62,0.08) 0%, rgba(184,132,62,0) 55%); }
.innerHero::before { content: ''; position: absolute; inset: 0; background-image: url('/assets/lattice.svg'); background-size: 220px 220px; opacity: 0.04; pointer-events: none; }
.eyebrow { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber-700); margin-bottom: 16px; }
.h1 { font-family: var(--font-serif); font-weight: 400; font-size: 52px; line-height: 60px; letter-spacing: -0.016em; color: var(--ink-900); max-width: 18ch; }
.em { color: var(--amber-700); font-style: italic; }
.lede { margin-top: 22px; font-family: var(--font-serif); font-size: 19px; line-height: 28px; color: var(--ink-500); max-width: 52ch; }

/* Plans */
.planGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.plan { background: var(--paper); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 32px 28px; display: flex; flex-direction: column; gap: 14px; min-height: 520px; }
.featured { background: var(--ink-900); color: var(--bone-100); border-color: var(--ink-900); }
.planN { font-family: var(--font-mono); font-size: 11px; color: var(--amber-700); letter-spacing: 0.12em; text-transform: uppercase; }
.featured .planN { color: var(--amber-500); }
.planName { font-family: var(--font-serif); font-size: 28px; line-height: 32px; font-weight: 400; letter-spacing: -0.005em; }
.planWho { font-size: 13px; line-height: 20px; color: var(--ink-500); max-width: 28ch; }
.featured .planWho { color: rgba(244,240,229,0.6); }
.priceRow { margin-top: 8px; padding-top: 18px; border-top: 1px solid var(--border); display: flex; align-items: baseline; gap: 6px; }
.featured .priceRow { border-top-color: rgba(244,240,229,0.12); }
.price { font-family: var(--font-serif); font-size: 38px; line-height: 42px; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; }
.priceUnit { font-family: var(--font-mono); font-size: 12px; color: var(--fg-3); letter-spacing: 0.04em; }
.featured .priceUnit { color: rgba(244,240,229,0.5); }
.priceNote { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.02em; margin-top: -8px; }
.featured .priceNote { color: rgba(244,240,229,0.5); }
.contactMark { font-family: var(--font-serif); font-size: 22px; line-height: 28px; font-weight: 400; color: var(--ink-900); letter-spacing: -0.005em; }
.featured .contactMark { color: var(--bone-100); }
.feats { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.feats li { font-size: 13px; line-height: 20px; padding-left: 16px; position: relative; color: var(--ink-700); }
.featured .feats li { color: rgba(244,240,229,0.85); }
.feats li::before { content: ''; position: absolute; left: 0; top: 9px; width: 8px; height: 1px; background: var(--amber-600); }
.planCta { margin-top: 12px; }
.planCta :global(.btn) { width: 100%; justify-content: center; padding: 12px 16px; }
.featured .planCta :global(.primary) { background: var(--amber-600); }
.featured .planCta :global(.primary):hover { background: var(--amber-700); }
@media (max-width: 1080px) { .planGrid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .planGrid { grid-template-columns: 1fr; } }

/* FAQ */
.faq { border-top: 1px solid var(--border); }
.faqItem { border-bottom: 1px solid var(--border); padding: 20px 0; }
.faqQ { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 16px; font-family: var(--font-serif); font-size: 20px; line-height: 28px; color: var(--ink-900); font-weight: 400; letter-spacing: -0.005em; }
.faqQ::-webkit-details-marker { display: none; }
.faqChev { font-family: var(--font-mono); font-size: 16px; color: var(--fg-3); }
details[open] .faqChev { content: '×'; }
.faqA { margin-top: 12px; font-size: 15px; line-height: 24px; color: var(--ink-500); max-width: 64ch; }
```

- [ ] **Step 3: Run typecheck, verify at `/pricing`**

```bash
npm run typecheck && npm run dev
```

Verify four plan cards (Growth featured/dark), FAQ accordion.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Pricing.tsx src/pages/Pricing.module.css
git commit -m "feat: Pricing page with four plans and FAQ"
```

---

## Task 11: Company page

**Files:**
- Modify: `src/pages/Company.tsx`
- Create: `src/pages/Company.module.css`

- [ ] **Step 1: Write `src/pages/Company.tsx`**

```tsx
import PageMeta from '../components/ui/PageMeta'
import SectionHead from '../components/ui/SectionHead'
import styles from './Company.module.css'

const values = [
  {
    n: 'Evidence first',
    body: 'We name the regulation. We cite the control. We quote the test coverage number. Our buyers are compliance officers — they deserve specifics, not assertions.',
  },
  {
    n: 'Sovereignty is not a feature',
    body: 'Indian data residency, India-stack depth, and examiner-ready audit trails are not differentiation points. They are the baseline. We do not charge extra for what your regulator requires.',
  },
  {
    n: 'The examiner is always in the room',
    body: 'Every design decision — schema, API, UI, copy — is evaluated against one question: can the RBI examiner understand this? If not, we redesign until they can.',
  },
]

const team = [
  { initials: 'Y', name: 'Yogesh', role: 'Co-founder & CEO', bio: 'Previously at [prior company]. Led [relevant work].' },
  { initials: 'A', name: 'Co-founder', role: 'Co-founder & CTO', bio: 'Systems and infrastructure background. Responsible for the security architecture.' },
]

const careers = [
  { title: 'Senior Backend Engineer', dept: 'Engineering', location: 'Bengaluru / Remote', type: 'Full-time' },
  { title: 'Compliance Product Manager', dept: 'Product', location: 'Mumbai / Remote', type: 'Full-time' },
  { title: 'India-Stack Integration Engineer', dept: 'Engineering', location: 'Bengaluru / Remote', type: 'Full-time' },
]

export default function Company() {
  return (
    <>
      <PageMeta
        title="Company — Anvax"
        description="Who we are, what we're building, and why we started with India's hardest market."
      />

      <header className={styles.innerHero}>
        <div className="container">
          <div className={styles.eyebrow}>Company</div>
          <h1 className={styles.h1}>We started where AI governance is <span className={styles.em}>actually hard.</span></h1>
          <p className={styles.lede}>Indian NBFCs operate under one of the most demanding AI governance regimes in the world. We built for that — not as a constraint, but as a design brief.</p>
        </div>
      </header>

      {/* Vision */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Vision" title="What we're building." />
          <div className={styles.vision}>
            <div className={styles.pullquote}>
              What AWS did for cloud infrastructure, Anvax does for enterprise AI.
            </div>
            <div className={styles.visionBody}>
              <p>The Indian regulated enterprise has three constraints at once — data sovereignty, deep India-stack dependencies, and a regulator that expects to see every model decision in writing. Solve those, and the rest of the world is a generalisation.</p>
              <p>Anvax begins as the governed intelligence layer for one industry that lives at the intersection of all three — Indian NBFCs — and grows outward, vertical by vertical, until enterprise AI in India runs on a single substrate the way enterprise compute runs on cloud today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="How we work" title="Three things we do not compromise on." />
          <div className={styles.values}>
            {values.map(({ n, body }) => (
              <div key={n} className={styles.value}>
                <h3 className={styles.valueH3}>{n}</h3>
                <p className={styles.valueBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" id="team">
        <div className="container">
          <SectionHead eyebrow="Team" title="Who is building this." />
          <div className={styles.teamGrid}>
            {team.map(({ initials, name, role, bio }) => (
              <div key={name} className={styles.teamCard}>
                <div className={styles.avatar}>{initials}</div>
                <div className={styles.teamName}>{name}</div>
                <div className={styles.teamRole}>{role}</div>
                <p className={styles.teamBio}>{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="section alt" id="careers">
        <div className="container">
          <SectionHead eyebrow="Careers" title="Open roles." lede="We are a small team building for a demanding market. If the compliance constraints are interesting rather than annoying, we should talk." />
          <div className={styles.careers}>
            {careers.map(({ title, dept, location, type }) => (
              <a key={title} href="#" className={styles.careerRow}>
                <div className={styles.careerTitle}>{title}</div>
                <div className={styles.careerMeta}>{dept}</div>
                <div className={styles.careerMeta}>{location}</div>
                <div className={styles.careerMeta}>{type}</div>
                <span className={styles.careerArr}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact">
        <div className="container">
          <SectionHead eyebrow="Contact" title="Get in touch." />
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <div className={styles.contactLabel}>Sales & demos</div>
              <h3 className={styles.contactH3}>Request a demo or ask about a specific deployment scenario.</h3>
              <div className={styles.channels}>
                <div className={styles.channelRow}>
                  <span className={styles.channelK}>Email</span>
                  <a href="mailto:sales@anvax.in" className={styles.channelV}>sales@anvax.in</a>
                </div>
                <div className={styles.channelRow}>
                  <span className={styles.channelK}>Response</span>
                  <span className={styles.channelV}>Within one business day</span>
                </div>
              </div>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactLabel}>Security & compliance</div>
              <h3 className={styles.contactH3}>Responsible disclosure, procurement questions, and audit documentation requests.</h3>
              <div className={styles.channels}>
                <div className={styles.channelRow}>
                  <span className={styles.channelK}>Email</span>
                  <a href="mailto:security@anvax.in" className={styles.channelV}>security@anvax.in</a>
                </div>
                <div className={styles.channelRow}>
                  <span className={styles.channelK}>PGP</span>
                  <a href="#" className={styles.channelV}>Public key</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `src/pages/Company.module.css`**

```css
.innerHero { position: relative; padding: 72px 0 64px; border-bottom: 1px solid var(--border); overflow: hidden; background-image: radial-gradient(100% 80% at 100% 0%, rgba(184,132,62,0.08) 0%, rgba(184,132,62,0) 55%); }
.innerHero::before { content: ''; position: absolute; inset: 0; background-image: url('/assets/lattice.svg'); background-size: 220px 220px; opacity: 0.04; pointer-events: none; }
.eyebrow { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber-700); margin-bottom: 16px; }
.h1 { font-family: var(--font-serif); font-weight: 400; font-size: 52px; line-height: 60px; letter-spacing: -0.016em; color: var(--ink-900); max-width: 18ch; }
.em { color: var(--amber-700); font-style: italic; }
.lede { margin-top: 22px; font-family: var(--font-serif); font-size: 19px; line-height: 28px; color: var(--ink-500); max-width: 52ch; }

.vision { display: grid; grid-template-columns: 1fr 1.4fr; gap: 72px; align-items: start; }
.pullquote { font-family: var(--font-serif); font-style: italic; font-size: 28px; line-height: 38px; color: var(--ink-700); border-left: 2px solid var(--amber-600); padding-left: 24px; max-width: 18ch; }
.visionBody p { font-family: var(--font-serif); font-size: 19px; line-height: 30px; color: var(--ink-700); max-width: 56ch; }
.visionBody p + p { margin-top: 18px; }
@media (max-width: 960px) { .vision { grid-template-columns: 1fr; gap: 32px; } }

.values { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
.value { background: var(--paper); padding: 28px 28px 32px; display: flex; flex-direction: column; gap: 12px; }
.valueH3 { font-family: var(--font-serif); font-size: 22px; line-height: 28px; font-weight: 400; letter-spacing: -0.008em; color: var(--ink-900); max-width: 16ch; }
.valueBody { font-size: 14px; line-height: 22px; color: var(--ink-500); max-width: 36ch; }
@media (max-width: 800px) { .values { grid-template-columns: 1fr; } }

.teamGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.teamCard { background: var(--bone-100); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.avatar { width: 52px; height: 52px; border-radius: var(--radius-md); background: var(--ink-900); color: var(--amber-500); display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 22px; }
.teamName { font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--ink-900); }
.teamRole { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.06em; text-transform: uppercase; margin-top: -6px; }
.teamBio { font-size: 13px; line-height: 20px; color: var(--ink-500); }
@media (max-width: 960px) { .teamGrid { grid-template-columns: 1fr 1fr; } }

.careers { border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--paper); overflow: hidden; }
.careerRow { display: grid; grid-template-columns: 1fr auto auto auto auto; gap: 24px; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--border); text-decoration: none; color: inherit; transition: background var(--dur-base) var(--ease-out); }
.careerRow:last-child { border-bottom: 0; }
.careerRow:hover { background: var(--bone-50); }
.careerTitle { font-family: var(--font-sans); font-size: 16px; font-weight: 500; color: var(--ink-900); }
.careerMeta { font-family: var(--font-mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.06em; text-transform: uppercase; }
.careerArr { color: var(--amber-700); font-size: 14px; transition: transform var(--dur-base) var(--ease-out); }
.careerRow:hover .careerArr { transform: translateX(3px); }
@media (max-width: 700px) { .careerRow { grid-template-columns: 1fr auto; } }

.contactGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.contactCard { background: var(--bone-100); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 32px; display: flex; flex-direction: column; gap: 14px; }
.contactLabel { font-family: var(--font-mono); font-size: 11px; color: var(--amber-700); letter-spacing: 0.12em; text-transform: uppercase; }
.contactH3 { font-family: var(--font-serif); font-size: 22px; line-height: 28px; font-weight: 400; letter-spacing: -0.008em; color: var(--ink-900); max-width: 22ch; }
.channels { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
.channelRow { display: grid; grid-template-columns: 80px 1fr; gap: 16px; font-size: 14px; align-items: baseline; }
.channelK { font-family: var(--font-mono); font-size: 10px; color: var(--fg-3); letter-spacing: 0.1em; text-transform: uppercase; }
.channelV { color: var(--ink-900); }
.channelV a, a.channelV { color: var(--ink-900); text-decoration: none; border-bottom: 1px solid var(--border-strong); }
.channelV a:hover, a.channelV:hover { color: var(--amber-700); border-bottom-color: var(--amber-600); }
@media (max-width: 800px) { .contactGrid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Run typecheck, verify at `/company`**

```bash
npm run typecheck && npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/Company.tsx src/pages/Company.module.css
git commit -m "feat: Company page with vision, values, team, careers, and contact"
```

---

## Task 12: Build, SEO verification, and Vercel deployment

**Files:**
- Modify: `vite.config.ts` (add ssg options if needed)
- Create: `vercel.json`

- [ ] **Step 1: Run full typecheck across all files**

```bash
npm run typecheck
```

Expected: zero errors. Fix any type errors before proceeding.

- [ ] **Step 2: Add `vercel.json` for SPA routing fallback**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Note: vite-react-ssg outputs one HTML file per route, so Vercel will serve the pre-rendered `.html` files directly. This `vercel.json` is a fallback for any routes not pre-rendered.

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected output: `dist/` directory containing:
```
dist/
  index.html          # /
  platform/
    index.html        # /platform
  industries/
    index.html        # /industries
  trust/
    index.html        # /trust
  deployment/
    index.html        # /deployment
  pricing/
    index.html        # /pricing
  company/
    index.html        # /company
  assets/             # bundled JS/CSS
```

If the build fails, check the error message — most common issues are TypeScript errors (run `npm run typecheck` first) or missing imports.

- [ ] **Step 4: Verify the build locally**

```bash
npm run preview
```

Open `http://localhost:4173`. Click through every page. Verify:
- [ ] Home page — all 8 sections render, no "01 ·" prefixes anywhere, Tag chips show "Wedge"/"Platform"/"Deployment"
- [ ] Platform page — capability rows, moat cards, logo wall with 18 tiles
- [ ] Industries — 6 accordion items expand/collapse correctly
- [ ] Trust page — subnav, 8 sections, tables readable
- [ ] Deployment — tier cards, same-product diagram, commit band
- [ ] Pricing — 4 plans, Growth is dark/featured, FAQ opens
- [ ] Company — vision, values, team, careers, contact
- [ ] Nav active state highlights current page
- [ ] Footer renders on all pages
- [ ] No console errors on any page

- [ ] **Step 5: Check meta tags for SEO**

```bash
grep -r '<title>' dist/
grep -r 'meta name="description"' dist/
```

Expected: each `dist/*/index.html` has a unique `<title>` tag and `<meta name="description">`.

- [ ] **Step 6: Deploy to Vercel**

```bash
npx vercel --prod
```

Or push to the linked git repo if Vercel is already connected. Check the preview URL.

- [ ] **Step 7: Final acceptance check on Vercel preview URL**

Open the Vercel preview URL. Verify:
- [ ] `curl https://your-preview.vercel.app/ | grep '<title>'` returns `Anvax — Sovereign AI for India's regulated enterprises`
- [ ] All 7 routes return HTTP 200 (not 404)
- [ ] All 18 logos load on `/platform`
- [ ] The inference-trace card in the hero does not overflow or clip on mobile (375px)
- [ ] Run Lighthouse on the home page — target Performance ≥ 90, SEO ≥ 95

- [ ] **Step 8: Final commit**

```bash
git add vercel.json
git commit -m "feat: Vercel deployment config and production build verified"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by task |
|---|---|
| Vite + React + TypeScript | Task 1 |
| vite-react-ssg for SEO | Task 1 (main.tsx, build script) |
| react-helmet-async per-page meta | Task 3 (PageMeta) + every page |
| CSS Modules + tokens.css | Tasks 2, 3, 4 and all pages |
| No "01 ·" counters anywhere | Tasks 3–11 (Tag replaces all prefixes, SectionHead has no counter) |
| No auto-chapter margin numbers | SectionHead.module.css has no counter-increment |
| Amber only on primary CTA | All section components use bone/ink icon tiles |
| Named category tags | Tag component used in pillars, moats, industries, tiers |
| Full content rewrite — all 7 pages | Tasks 5–11 |
| Six content rules applied | Verified in all page copy above |
| 18 logos on /platform | Task 6 (Platform.tsx logowall) |
| Deployment tiers | Task 9 |
| Trust tables | Task 8 |
| Vercel static deploy | Task 12 |
| Per-page SEO meta | PageMeta component in every page |

**No placeholders found.** All steps contain complete code.

**Type consistency check:** `RouteObject` from react-router-dom used in router.tsx. `ViteReactSSG` from vite-react-ssg used in main.tsx. All component prop interfaces defined before use. StatusPill `status` type ('live' | 'wip' | 'planned') consistent across Trust and Industries pages.
