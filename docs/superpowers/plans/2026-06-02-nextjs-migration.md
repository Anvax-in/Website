# Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Anvax website from Vite + vite-react-ssg + React Router DOM v6 to Next.js 15 App Router with self-hosted fonts, next/image on the logo wall, and per-page metadata.

**Architecture:** `app/` directory at project root for routes; all shared components stay in `src/components/`; CSS modules stay in `src/pages/`; path alias `@/*` → `src/*` used in all new `app/` files.

**Tech Stack:** Next.js 15, React 18, TypeScript, CSS Modules, Geist Mono via `geist` package, Source Serif 4 via `next/font/google`, General Sans via `next/font/local`.

---

## File map

**Create:**
- `app/layout.tsx` — root layout: fonts, global CSS, Nav, Footer, base metadata
- `app/page.tsx` — Home
- `app/platform/page.tsx` — Platform (next/image logo wall)
- `app/industries/page.tsx` — Industries (use client)
- `app/trust/page.tsx` — Trust (use client for download forms)
- `app/deployment/page.tsx` — Deployment
- `app/pricing/page.tsx` — Pricing (new, ported from pricing.html)
- `app/company/page.tsx` — Company
- `app/contact/page.tsx` — Contact (use client)
- `app/blog/.gitkeep` — reserved route
- `app/api/contact/route.ts` — replaces api/contact.ts
- `app/sitemap.ts` — replaces api/sitemap.ts
- `next.config.ts`
- `src/pages/Pricing.module.css` — styles for new Pricing page

**Modify:**
- `package.json` — swap deps + scripts
- `tsconfig.json` — replace with Next.js config
- `src/styles/tokens.css` — remove @import CDN font lines + remove --font-* declarations
- `src/components/layout/Nav.tsx` — use client, usePathname, next/link
- `src/components/layout/Footer.tsx` — next/link
- `src/components/sections/ArchDiagram.tsx` — next/link
- `src/components/sections/ComplianceStrip.tsx` — next/link
- `src/components/sections/PillarsSection.tsx` — next/link
- `src/components/sections/IndustriesGrid.tsx` — next/link
- `src/components/sections/HeroSection.tsx` — add use client
- `vercel.json`

**Delete:**
- `vite.config.ts`, `tsconfig.node.json`, `src/main.tsx`, `src/vite-env.d.ts`
- `src/router.tsx`, `src/App.tsx`, `src/components/ui/PageMeta.tsx`
- `src/pages/Home.tsx`, `src/pages/Platform.tsx`, `src/pages/Industries.tsx`
- `src/pages/Trust.tsx`, `src/pages/Deployment.tsx`, `src/pages/Company.tsx`, `src/pages/Contact.tsx`
- `api/contact.ts`, `api/sitemap.ts`

---

### Task 1: Swap dependencies and scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Replace package.json**

```json
{
  "name": "anvax-website",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "geist": "^1.3.1",
    "lucide-react": "^1.17.0",
    "next": "^15.3.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.29",
    "@types/react-dom": "^18.3.7",
    "typescript": "^5.9.3"
  }
}
```

- [ ] **Step 2: Install**

```bash
npm install
```

Expected: installs next, geist; removes vite packages; no errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: swap vite for next.js 15, add geist font package"
```

---

### Task 2: Config files — Next.js config, tsconfig, delete Vite files

**Files:**
- Create: `next.config.ts`
- Replace: `tsconfig.json`
- Delete: `vite.config.ts`, `tsconfig.node.json`, `src/main.tsx`, `src/vite-env.d.ts`

- [ ] **Step 1: Create next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 2: Replace tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Delete Vite files**

```bash
rm vite.config.ts tsconfig.node.json src/main.tsx src/vite-env.d.ts
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add next.config.ts, replace tsconfig for next.js, remove vite config files"
```

---

### Task 3: Remove CDN font imports from tokens.css

**Files:**
- Modify: `src/styles/tokens.css`

The current file has two CDN `@import` lines at the top and three `--font-*` variable declarations that will be replaced by `next/font` injections in Task 4.

- [ ] **Step 1: Remove the @import lines and --font-* declarations**

Open `src/styles/tokens.css`. Delete lines 3–4 (the two `@import url(...)` lines):
```css
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600&family=Geist+Mono:wght@400;500&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap');
```

Also remove lines 73–75 (the three `--font-*` declarations inside `:root`):
```css
  --font-serif: 'Source Serif 4', 'Source Serif Pro', Georgia, 'Times New Roman', serif;
  --font-sans:  'General Sans', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono:  'Geist Mono', ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
```

`next/font` will inject these three CSS variables on `<html>` in Task 4. Do not remove any other lines.

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: passes (no TS files changed yet).

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css
git commit -m "chore: remove cdn font imports from tokens.css — next/font takes over"
```

---

### Task 4: Download General Sans font files

**Files:**
- Create: `public/fonts/GeneralSans-Variable.woff2`

`next/font/local` requires the font file to be bundled in the project. Source Serif 4 and Geist Mono are handled automatically (Google Fonts and npm package). General Sans must be downloaded manually from Fontshare (free for commercial use).

- [ ] **Step 1: Download General Sans**

Go to https://www.fontshare.com/fonts/general-sans, click Download, extract the zip.

Find `GeneralSans-Variable.woff2` inside the downloaded zip (usually in a `woff2/` or `variable/` subfolder).

- [ ] **Step 2: Place the file**

```bash
mkdir -p app/fonts
cp /path/to/downloaded/GeneralSans-Variable.woff2 app/fonts/GeneralSans-Variable.woff2
```

- [ ] **Step 3: Commit**

```bash
git add app/fonts/GeneralSans-Variable.woff2
git commit -m "chore: add General Sans variable font for next/font/local"
```

---

### Task 5: Root layout — app/layout.tsx

**Files:**
- Create: `app/layout.tsx`

This replaces `src/App.tsx` and `src/main.tsx`. It wires up the three fonts via `next/font`, imports global CSS, sets base metadata, and wraps every page with Nav and Footer.

- [ ] **Step 1: Create app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import localFont from 'next/font/local'
import { GeistMono } from 'geist/font/mono'
import '@/styles/tokens.css'
import '@/styles/global.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400', '600'],
  variable: '--font-serif',
  display: 'swap',
})

const generalSans = localFont({
  src: './fonts/GeneralSans-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://anvax.in'),
  applicationName: 'Anvax',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Anvax',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sourceSerif4.variable} ${generalSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npm run typecheck
```

Expected: may complain about missing `app/page.tsx` — that's fine, we add it in Task 7. Any type error about imports means a path is wrong — fix before proceeding.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add next.js root layout with self-hosted fonts and base metadata"
```

---

### Task 6: Fix component imports — Link and use client

**Files:**
- Modify: `src/components/layout/Nav.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/sections/ArchDiagram.tsx`
- Modify: `src/components/sections/ComplianceStrip.tsx`
- Modify: `src/components/sections/PillarsSection.tsx`
- Modify: `src/components/sections/IndustriesGrid.tsx`
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Update Nav.tsx**

Replace the full file:

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '../ui/Button'
import styles from './Nav.module.css'

const links = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/trust',      label: 'Trust' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/company',    label: 'Company' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={`container ${styles.row}`}>
        <Link href="/" className={styles.brand} aria-label="Anvax home">
          <img src="/assets/anvax-wordmark-ink.svg" alt="Anvax" />
        </Link>
        <div className={styles.links}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              href={to}
              className={`${styles.link} ${pathname.startsWith(to) ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className={styles.actions}>
          <Button variant="ghost" href="#">Sign in</Button>
          <Button variant="primary" href="/contact">Request a demo</Button>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Update Footer.tsx**

Replace only the import line at the top — change `import { Link } from 'react-router-dom'` to `import Link from 'next/link'` — and change all `to=` props to `href=`:

```tsx
import Link from 'next/link'
import styles from './Footer.module.css'

const product = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/deployment', label: 'Deployment' },
]
const trust = [
  { to: '/trust',              label: 'Architecture' },
  { to: '/trust#free-ai',      label: 'RBI FREE-AI' },
  { to: '/trust#dpdp',         label: 'DPDP & CERT-In' },
  { to: '/trust#downloads',    label: 'Regulator pack' },
]
const company = [
  { to: '/company',          label: 'About' },
  { to: '/company',          label: 'Team' },
  { to: '/company#careers',  label: 'Careers' },
  { to: '/contact',          label: 'Contact' },
]
const legal = [
  { href: '#', label: 'Privacy' },
  { href: '#', label: 'DPA' },
  { href: '#', label: 'Terms' },
  { href: '#', label: 'Responsible disclosure' },
]

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      <ul>
        {links.map(({ to, label }) => (
          <li key={to}><Link href={to}>{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}

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
          <span className={styles.residency}>Data residency · India</span>
          <span>v0.7 · May 2026</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Update ArchDiagram.tsx, ComplianceStrip.tsx, PillarsSection.tsx, IndustriesGrid.tsx**

In each of these four files, replace the single import line:
```tsx
// Before
import { Link } from 'react-router-dom'

// After
import Link from 'next/link'
```

No other changes. All `to=` props in these components already use path strings (e.g. `to="/platform"`) — change each `to=` to `href=` as well, since `next/link` uses `href`.

Run this grep after to verify no react-router-dom imports remain in components:

```bash
grep -r "react-router-dom" src/components/
```

Expected: no output.

- [ ] **Step 4: Add 'use client' to HeroSection.tsx**

Add `'use client'` as the very first line of `src/components/sections/HeroSection.tsx`:

```tsx
'use client'
import { useState, useEffect, type ReactNode } from 'react'
// ... rest of file unchanged
```

- [ ] **Step 5: Typecheck**

```bash
npm run typecheck
```

Expected: passes. Fix any remaining `react-router-dom` type errors before continuing.

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat: swap react-router-dom for next/link across all components"
```

---

### Task 7: Home page

**Files:**
- Create: `app/page.tsx`
- Delete: `src/pages/Home.tsx`

- [ ] **Step 1: Create app/page.tsx**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import PillarsSection from '@/components/sections/PillarsSection'
import ArchDiagram from '@/components/sections/ArchDiagram'
import IndustriesGrid from '@/components/sections/IndustriesGrid'
import ComplianceStrip from '@/components/sections/ComplianceStrip'
import VisionSection from '@/components/sections/VisionSection'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = {
  title: "Anvax — Sovereign AI for India's regulated enterprises",
  description: "The AI workspace BFSI and NBFCs can run past their regulator. Search, chat, workflows — on your corpus, auditable by design.",
  openGraph: {
    title: "Anvax — Sovereign AI for India's regulated enterprises",
    description: "The AI workspace BFSI and NBFCs can run past their regulator. Search, chat, workflows — on your corpus, auditable by design.",
    url: 'https://anvax.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anvax — Sovereign AI for India's regulated enterprises",
    description: "The AI workspace BFSI and NBFCs can run past their regulator.",
  },
  alternates: { canonical: 'https://anvax.in' },
}

export default function Home() {
  return (
    <>
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

- [ ] **Step 2: Delete old file**

```bash
rm src/pages/Home.tsx
```

- [ ] **Step 3: Start dev server and verify**

```bash
npm run dev
```

Open http://localhost:3000 — the home page should render correctly with Nav and Footer. Check browser console for errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx src/pages/Home.tsx
git commit -m "feat: migrate home page to next.js app router"
```

---

### Task 8: Platform page with next/image

**Files:**
- Create: `app/platform/page.tsx`
- Delete: `src/pages/Platform.tsx`

- [ ] **Step 1: Create app/platform/page.tsx**

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import SectionHead from '@/components/ui/SectionHead'
import Tag from '@/components/ui/Tag'
import styles from '@/pages/Platform.module.css'

export const metadata: Metadata = {
  title: 'Platform — Anvax',
  description: 'Four capabilities purpose-built for India\'s regulated enterprises — search, chat, workflows, and agents with sovereign data residency baked in.',
  openGraph: {
    title: 'Platform — Anvax',
    description: 'Four capabilities purpose-built for India\'s regulated enterprises.',
    url: 'https://anvax.in/platform',
  },
  twitter: { card: 'summary_large_image', title: 'Platform — Anvax', description: 'Four capabilities purpose-built for India\'s regulated enterprises.' },
  alternates: { canonical: 'https://anvax.in/platform' },
}

const capabilities = [
  {
    id: 'search',
    tag: 'Search',
    tagVariant: 'live' as const,
    h3: 'Semantic search over every document in your corpus.',
    desc: 'Hybrid retrieval — dense vectors plus BM25 keyword — across PDFs, RBI circulars, NBFC policies, emails, and structured data. Results arrive with source citations and paragraph-level provenance.',
    specs: [
      { spec: 'Retrieval', value: 'Dense + BM25 hybrid, reranked by cross-encoder' },
      { spec: 'Sources', value: 'PDF, DOCX, XLSX, JSON, emails, database views' },
      { spec: 'Citations', value: 'Paragraph-level, page number, document title' },
      { spec: 'PII guard', value: 'Auto-redact Aadhaar, PAN, IFSC, GSTIN, mobile' },
      { spec: 'Latency', value: 'P95 < 1.4 s end-to-end including model call' },
    ],
  },
  {
    id: 'chat',
    tag: 'Chat',
    tagVariant: 'live' as const,
    h3: 'Multi-turn grounded chat that never hallucinates a regulation.',
    desc: 'Every answer is anchored to retrieved context. The model is instructed to say "not found in corpus" rather than fabricate. Thread history stays scoped to tenant — never mixed across customers.',
    specs: [
      { spec: 'Grounding', value: 'RAG with top-k=12, context window 128 K' },
      { spec: 'Tenancy', value: 'Strict RLS — threads never cross tenant boundary' },
      { spec: 'Models', value: 'Claude Sonnet, Haiku; Gemini Flash fallback' },
      { spec: 'Roles', value: 'System prompt + tool schema per role definition' },
      { spec: 'Audit', value: 'Every turn logged to immutable inference_traces' },
    ],
  },
  {
    id: 'workflows',
    tag: 'Workflows',
    tagVariant: 'live' as const,
    h3: 'Multi-step compliance workflows with human checkpoints.',
    desc: 'Drag-and-drop workflow builder for recurring tasks: RBI circular triage, credit memo drafting, audit checklist generation. Each step can require human approval before proceeding.',
    specs: [
      { spec: 'Builder', value: 'Visual node graph with conditional branching' },
      { spec: 'Triggers', value: 'Manual, scheduled (cron), webhook, email ingest' },
      { spec: 'Human gate', value: 'Approval step with deadline + escalation path' },
      { spec: 'Outputs', value: 'PDF, DOCX, structured JSON, email, webhook' },
      { spec: 'Templates', value: 'RBI circular triage, credit memo, audit checklist' },
    ],
  },
  {
    id: 'agents',
    tag: 'Agents',
    tagVariant: 'next' as const,
    h3: 'Persistent agents that monitor your regulatory environment 24/7.',
    desc: 'Long-running agents watch RBI, SEBI, IRDAI feeds. When a new circular drops, they classify, summarise, and route to the right team before your compliance officer opens email.',
    specs: [
      { spec: 'Monitoring', value: 'RBI, SEBI, IRDAI, MCA — feed polling + delta diff' },
      { spec: 'Actions', value: 'Slack alert, task create, workflow trigger, email' },
      { spec: 'Memory', value: 'Tenant-scoped persistent memory with TTL policy' },
      { spec: 'Guardrails', value: 'Action whitelist, spend cap, human-in-the-loop gate' },
    ],
  },
]

const moats = [
  {
    icon: '🧠',
    h3: 'Persistent memory',
    desc: 'Every query, decision, and approval becomes part of a continuously updated corpus. The longer you use Anvax, the smarter your tenant instance gets — without any data leaving your boundary.',
  },
  {
    icon: '🇮🇳',
    h3: 'India stack wired in',
    desc: 'GST Portal, Account Aggregator, DigiLocker, MCA21, UPI/NPCI — pre-connected at the data layer. Built for RBI, SEBI, and IRDAI from day one, not retrofitted later.',
  },
  {
    icon: '🏦',
    h3: 'BFSI verticals by default',
    desc: 'Not a horizontal AI with a compliance checkbox. The default prompt templates, workflow library, and corpus schema are designed for NBFC, wealth, lending, insurance, broking, and payments.',
  },
  {
    icon: '📋',
    h3: 'Compliance by construction',
    desc: 'Postgres RLS, per-tenant encryption keys, immutable audit chain, RBI FREE-AI mapping — not features you configure. They are the foundation. You cannot turn them off.',
  },
]

const logoTiles = [
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
  { mono: 'CK', name: 'CKYC', kind: 'Identity' },
]

export default function Platform() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Platform</p>
            <h1 className={styles.heroH1}>
              Four capabilities.<br />
              One sovereign platform.<br />
              Built for India's regulatory stack.
            </h1>
            <p className={styles.heroLede}>
              Search, Chat, Workflows, and Agents — each with an India-stack connector layer,
              RBI-compliant audit trail, and per-tenant data isolation baked in by construction.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Capabilities"
            title="What your analysts can do on day one."
            lede="Four product surfaces, each designed for a specific job a compliance or credit team needs to do."
          />
          {capabilities.map((cap) => (
            <div key={cap.id} className={styles.capRow}>
              <div className={styles.capGrid}>
                <div className={styles.capLeft}>
                  <div className={styles.capTag}>
                    <Tag variant={cap.tagVariant}>{cap.tag}</Tag>
                  </div>
                  <h3 className={styles.capH3}>{cap.h3}</h3>
                  <p className={styles.capDesc}>{cap.desc}</p>
                </div>
                <div className={styles.capRight}>
                  <table className={styles.specsTable}>
                    <thead><tr><th>Spec</th><th>Detail</th></tr></thead>
                    <tbody>
                      {cap.specs.map((row) => (
                        <tr key={row.spec}><td>{row.spec}</td><td>{row.value}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="Moats"
            title="Advantages that compound the longer you use Anvax."
            lede="Each layer deepens with every query, every workflow, every integration added to your instance."
          />
          <div className={styles.moatsGrid}>
            {moats.map((m) => (
              <div key={m.h3} className={styles.moatCard}>
                <div className={styles.moatIcon}>{m.icon}</div>
                <h3 className={styles.moatH3}>{m.h3}</h3>
                <p className={styles.moatDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="India stack"
            title="Every connector your regulated workflows need."
            lede="Pre-built integrations to India's government, regulatory, financial, and SaaS data sources."
          />
          <div className={styles.logoGrid}>
            {logoTiles.map((tile) => (
              <div key={tile.name} className={styles.logoTile}>
                {'mono' in tile ? (
                  <div className={styles.logoMark}>{tile.mono}</div>
                ) : (
                  <Image
                    src={tile.src}
                    alt={tile.name}
                    width={48}
                    height={48}
                    className={styles.logoImg}
                    style={{ objectFit: 'contain' }}
                  />
                )}
                <span className={styles.logoName}>{tile.name}</span>
                <span className={styles.logoKind}>{tile.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Delete old file**

```bash
rm src/pages/Platform.tsx
```

- [ ] **Step 3: Commit**

```bash
git add app/platform/ src/pages/Platform.tsx
git commit -m "feat: migrate platform page, use next/image for logo wall"
```

---

### Task 9: Industries page

**Files:**
- Create: `app/industries/page.tsx`
- Delete: `src/pages/Industries.tsx`

- [ ] **Step 1: Create app/industries/page.tsx**

```tsx
'use client'
import { useState } from 'react'
import type { Metadata } from 'next'
import SectionHead from '@/components/ui/SectionHead'
import Tag from '@/components/ui/Tag'
import styles from '@/pages/Industries.module.css'

export const metadata: Metadata = {
  title: 'Industries — Anvax',
  description: 'NBFC-first vertical packs with RBI circular tracking, credit workflows, and role-based AI.',
  openGraph: { title: 'Industries — Anvax', description: 'NBFC-first vertical packs with RBI circular tracking, credit workflows, and role-based AI.', url: 'https://anvax.in/industries' },
  twitter: { card: 'summary_large_image', title: 'Industries — Anvax', description: 'NBFC-first vertical packs with RBI circular tracking.' },
  alternates: { canonical: 'https://anvax.in/industries' },
}

interface Role { role: string; uc: string }
interface Vertical {
  id: string; tag: string; tagVariant: 'live' | 'next' | 'roadmap'
  title: string; intro: string; roles: Role[]; corpus: string[]
}

const verticals: Vertical[] = [
  {
    id: 'nbfc', tag: 'NBFC', tagVariant: 'live', title: 'NBFC',
    intro: 'India has over 10,000 NBFCs navigating an ever-thickening stack of RBI master directions, circular updates, and AA data obligations. Anvax ships with an NBFC-specific corpus schema, pre-built workflows for circular triage and credit memo drafting, and role packs for every team from compliance to collections.',
    roles: [
      { role: 'Compliance officer', uc: 'Track RBI circulars, draft compliance responses, maintain master direction register' },
      { role: 'Credit analyst', uc: 'Summarise AA data, analyse GST filings, generate underwriting memo' },
      { role: 'Internal auditor', uc: 'Run audit checklists, flag policy deviations, generate audit reports' },
      { role: 'Ops manager', uc: 'Monitor workflow queues, escalate exceptions, produce SLA reports' },
    ],
    corpus: ['RBI circulars', 'NBFC master directions', 'Internal credit policies', 'Loan files', 'GST filings', 'Account Aggregator data'],
  },
  {
    id: 'wealth', tag: 'Wealth management', tagVariant: 'next', title: 'Wealth management',
    intro: 'SEBI-registered advisors manage portfolios under tightening disclosure and suitability rules. Anvax connects to portfolio data and SEBI regulatory feeds, giving relationship managers a single pane to research, comply, and advise — without leaving their corpus.',
    roles: [
      { role: 'Relationship manager', uc: 'Summarise client portfolio, draft suitability note, flag product risks' },
      { role: 'Research analyst', uc: 'Synthesise company filings, generate research briefs, track SEBI disclosures' },
      { role: 'Compliance officer', uc: 'Track SEBI regulations, verify KYC completeness, audit advice trail' },
    ],
    corpus: ['Portfolio data', 'SEBI regulations', 'Research reports', 'Company filings', 'Client KYC'],
  },
  {
    id: 'lending', tag: 'Lending', tagVariant: 'next', title: 'Lending',
    intro: 'Underwriting at scale requires pulling together bank statements, GST returns, ITR filings, bureau reports, and internal credit policy — often across dozens of documents per application. Anvax automates the aggregation and surface anomaly flags so underwriters spend time on decisions, not data gathering.',
    roles: [
      { role: 'Underwriter', uc: 'Aggregate applicant data, flag anomalies, draft credit memo' },
      { role: 'Risk manager', uc: 'Monitor portfolio risk, generate risk reports, track RBI limits' },
      { role: 'Collections officer', uc: 'Summarise account history, draft outreach templates, log contacts' },
    ],
    corpus: ['Bank statements', 'GST returns', 'ITR filings', 'Bureau reports', 'RBI circulars', 'Internal credit policy'],
  },
  {
    id: 'insurance', tag: 'Insurance', tagVariant: 'roadmap', title: 'Insurance',
    intro: 'IRDAI disclosure requirements, proposal processing, and claims assessment all generate large volumes of semi-structured documents. Anvax connects to policy documents and IRDAI regulations so underwriters and claims assessors can work faster without compliance risk.',
    roles: [
      { role: 'Underwriter', uc: 'Analyse proposal forms, assess risk factors, draft terms and conditions' },
      { role: 'Claims assessor', uc: 'Summarise claims files, verify policy coverage, generate assessment report' },
      { role: 'Compliance officer', uc: 'Track IRDAI regulations, verify disclosure completeness, audit trail' },
    ],
    corpus: ['Policy documents', 'IRDAI regulations', 'Proposal forms', 'Claims files', 'Medical records'],
  },
  {
    id: 'broking', tag: 'Broking', tagVariant: 'roadmap', title: 'Broking',
    intro: 'SEBI circular volume has grown 40% in three years. Broking compliance teams drown in classification and triage before they can start impact analysis. Anvax automates circular ingestion, summarisation, and team routing so compliance officers focus on interpretation, not administration.',
    roles: [
      { role: 'Compliance officer', uc: 'Triage SEBI circulars, draft compliance notes, maintain regulatory register' },
      { role: 'Surveillance analyst', uc: 'Analyse trading patterns, flag anomalies, generate surveillance reports' },
      { role: 'Research analyst', uc: 'Synthesise company filings, generate research briefs, track regulatory changes' },
    ],
    corpus: ['SEBI circulars', 'Trading data', 'Company filings', 'Research reports', 'Internal policies'],
  },
  {
    id: 'payments', tag: 'Payments', tagVariant: 'roadmap', title: 'Payments',
    intro: 'RBI PSO regulations, CERT-In incident obligations, and merchant agreement management all require constant compliance monitoring. Anvax gives payment operations teams a single workspace for regulatory compliance, risk monitoring, and merchant governance.',
    roles: [
      { role: 'Compliance officer', uc: 'Track RBI PSO circulars, draft compliance responses, maintain obligations register' },
      { role: 'Risk analyst', uc: 'Monitor transaction logs for anomalies, generate risk reports, flag threshold breaches' },
      { role: 'Ops manager', uc: 'Manage merchant agreements, track SLA compliance, generate ops reports' },
    ],
    corpus: ['RBI PSO circulars', 'CERT-In regulations', 'Transaction logs', 'Merchant agreements', 'GST + MCA data'],
  },
]

export default function Industries() {
  const [open, setOpen] = useState<string>('nbfc')

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Industries</p>
            <h1 className={styles.heroH1}>NBFC first.<br />Then the rest of regulated India.</h1>
            <p className={styles.heroLede}>Each vertical ships with a pre-built corpus schema, workflow library, role packs, and regulatory connector set — not a horizontal AI with a compliance checkbox.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Verticals" title="Regulated India, vertical by vertical." lede="Start with your sector. Get the corpus schema, workflow templates, and regulatory connector set built for your regulator." />
          <div className={styles.accordionList}>
            {verticals.map((v) => {
              const isOpen = open === v.id
              return (
                <div key={v.id} className={styles.accordionItem}>
                  <button
                    className={`${styles.accordionTrigger} ${isOpen ? styles.accordionTriggerOpen : ''}`}
                    onClick={() => setOpen(isOpen ? '' : v.id)}
                    aria-expanded={isOpen}
                  >
                    <Tag variant={v.tagVariant}>{v.tag}</Tag>
                    <span className={styles.accordionTitle}>{v.title}</span>
                    <span className={`${styles.accordionChevron} ${isOpen ? styles.accordionChevronOpen : ''}`}>▾</span>
                  </button>
                  {isOpen && (
                    <div className={styles.accordionBody}>
                      <div className={styles.accordionGrid}>
                        <div>
                          <p className={styles.accordionIntro}>{v.intro}</p>
                          <p className={styles.corpusLabel}>Corpus</p>
                          <div className={styles.corpusPills}>
                            {v.corpus.map((c) => <span key={c} className={styles.corpusPill}>{c}</span>)}
                          </div>
                        </div>
                        <div>
                          <table className={styles.roleTable}>
                            <thead><tr><th>Role</th><th>What they do</th></tr></thead>
                            <tbody>
                              {v.roles.map((r) => <tr key={r.role}><td>{r.role}</td><td>{r.uc}</td></tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
```

**Note:** `export const metadata` at the top of a `'use client'` file is not supported in Next.js App Router — metadata must be in a Server Component. Move metadata to a separate server wrapper:

Replace the above with this two-file approach:

`app/industries/page.tsx` (Server Component — exports metadata, renders client component):
```tsx
import type { Metadata } from 'next'
import IndustriesClient from './IndustriesClient'

export const metadata: Metadata = {
  title: 'Industries — Anvax',
  description: 'NBFC-first vertical packs with RBI circular tracking, credit workflows, and role-based AI.',
  openGraph: { title: 'Industries — Anvax', description: 'NBFC-first vertical packs with RBI circular tracking.', url: 'https://anvax.in/industries' },
  twitter: { card: 'summary_large_image', title: 'Industries — Anvax', description: 'NBFC-first vertical packs with RBI circular tracking.' },
  alternates: { canonical: 'https://anvax.in/industries' },
}

export default function IndustriesPage() {
  return <IndustriesClient />
}
```

`app/industries/IndustriesClient.tsx` (Client Component — all the interactive JSX from above):
```tsx
'use client'
import { useState } from 'react'
import SectionHead from '@/components/ui/SectionHead'
import Tag from '@/components/ui/Tag'
import styles from '@/pages/Industries.module.css'

// ... paste all verticals data and the full component function from the code block above
```

Apply the same two-file pattern to Contact and Trust pages (Tasks 12 and 10).

- [ ] **Step 2: Delete old file**

```bash
rm src/pages/Industries.tsx
```

- [ ] **Step 3: Commit**

```bash
git add app/industries/
git commit -m "feat: migrate industries page to next.js app router"
```

---

### Task 10: Trust page

**Files:**
- Create: `app/trust/page.tsx`
- Create: `app/trust/TrustClient.tsx`
- Delete: `src/pages/Trust.tsx`

Trust has `onSubmit` event handlers on the download forms, so it needs the same server/client split as Industries.

- [ ] **Step 1: Create app/trust/page.tsx**

```tsx
import type { Metadata } from 'next'
import TrustClient from './TrustClient'

export const metadata: Metadata = {
  title: 'Architecture & Trust — Anvax',
  description: 'Full defence-in-depth, RBI FREE-AI mapping, DPDP controls, and honest certification status.',
  openGraph: { title: 'Architecture & Trust — Anvax', description: 'Full defence-in-depth, RBI FREE-AI mapping, DPDP controls.', url: 'https://anvax.in/trust' },
  twitter: { card: 'summary_large_image', title: 'Architecture & Trust — Anvax', description: 'Full defence-in-depth, RBI FREE-AI mapping.' },
  alternates: { canonical: 'https://anvax.in/trust' },
}

export default function TrustPage() {
  return <TrustClient />
}
```

- [ ] **Step 2: Create app/trust/TrustClient.tsx**

```tsx
'use client'
import SectionHead from '@/components/ui/SectionHead'
import StatusPill from '@/components/ui/StatusPill'
import Button from '@/components/ui/Button'
import styles from '@/pages/Trust.module.css'

const subnavLinks = [
  { id: 'platform-glance', label: 'Platform' },
  { id: 'defence', label: 'Defence-in-depth' },
  { id: 'ai-controls', label: 'AI controls' },
  { id: 'free-ai', label: 'RBI FREE-AI' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'dpdp', label: 'DPDP' },
  { id: 'downloads', label: 'Downloads' },
]

const defenceLayers = [
  { code: 'L1', layer: 'Network isolation', controls: 'VPC per tenant, no public DB endpoints, egress allowlist', guarantee: 'No lateral movement between tenant environments' },
  { code: 'L2', layer: 'Authentication', controls: 'OIDC/SAML SSO, MFA enforced on Growth+, session binding', guarantee: 'No credential replay or session hijack' },
  { code: 'L3', layer: 'Authorisation', controls: 'Postgres RLS, row-level policies enforced in DB kernel', guarantee: 'Cross-tenant data access impossible at query level' },
  { code: 'L4', layer: 'Encryption at rest', controls: 'AES-256-GCM, per-tenant DEK, HSM-backed KEK rotation', guarantee: 'Data unreadable without tenant-specific key' },
  { code: 'L5', layer: 'Encryption in transit', controls: 'TLS 1.3 minimum, HSTS, no TLS 1.0/1.1', guarantee: 'No plaintext data on the wire' },
  { code: 'L6', layer: 'Prompt security', controls: 'Input sanitisation, output scanning, injection detection', guarantee: 'No prompt injection or data exfiltration via model' },
  { code: 'L7', layer: 'Audit trail', controls: 'SHA-256 chained log, append-only, CloudTrail-backed', guarantee: 'Tamper-evident record of every action' },
  { code: 'L8', layer: 'PII guard', controls: 'Auto-redact Aadhaar, PAN, IFSC, GSTIN, mobile before LLM', guarantee: 'Regulated identifiers never enter model context' },
]

const aiControls = [
  { control: 'Hallucination guard', detail: 'Model instructed to return "not found in corpus" when retrieval confidence is below threshold. Citation required for every factual claim.' },
  { control: 'Prompt injection detection', detail: 'Input scanned for instruction override attempts before reaching model. Flagged inputs quarantined and alerted.' },
  { control: 'Output content filter', detail: 'Responses scanned for PII, sensitive financial data, and off-topic content before delivery to user.' },
  { control: 'Model access control', detail: 'Per-role model access list. Compliance officers cannot invoke agent-tier models. Spend caps enforced per tenant.' },
  { control: 'Inference trace logging', detail: 'Every model call logged with input hash, output hash, model version, latency, and user ID. Immutable. Queryable by auditors.' },
  { control: 'Context window isolation', detail: 'Each request constructs a fresh context window. No cross-request or cross-tenant context bleed possible.' },
]

const freeAiControls = [
  { ref: 'F1', control: 'Fairness', detail: 'Model outputs evaluated for demographic bias on BFSI test sets. Fairness report available on request.' },
  { ref: 'F2', control: 'Reliability', detail: 'P95 < 1.4s SLA. Fallback model routing on primary model degradation. 99.9% uptime commitment.' },
  { ref: 'E1', control: 'Explainability', detail: 'Every answer includes source citations with document title, page number, and paragraph. Retrieval context surfaced to user.' },
  { ref: 'E2', control: 'Ethics', detail: 'Human-in-the-loop gates on all workflow approvals. Model cannot take external actions without human sign-off.' },
  { ref: 'A1', control: 'Accountability', detail: 'SHA-256 chained audit log of every query, approval, and model call. Exportable for RBI examination.' },
  { ref: 'A2', control: 'Auditability', detail: 'Inference traces retained for 7 years. Auditor read-only access available. SIEM integration supported.' },
  { ref: 'I1', control: 'Integrity', detail: 'Corpus ingestion checksummed. Document versions tracked. Model cannot modify source documents.' },
  { ref: 'I2', control: 'Incident response', detail: 'Security team alert within 15 minutes of anomaly detection. Playbook documented. RBI notification within 6 hours if required.' },
]

const certifications = [
  { name: 'SOC 2 Type II', status: 'wip' as const, note: 'Audit in progress — expected Q3 2026' },
  { name: 'ISO 27001', status: 'wip' as const, note: 'Gap analysis complete — certification Q4 2026' },
  { name: 'RBI FREE-AI self-attestation', status: 'live' as const, note: 'All 8 controls mapped and implemented' },
  { name: 'DPDP self-attestation', status: 'live' as const, note: 'All requirements implemented at platform level' },
  { name: 'CERT-In empanelment', status: 'roadmap' as const, note: 'Planned 2027' },
  { name: 'PCI DSS', status: 'roadmap' as const, note: 'Planned for payments vertical launch' },
]

const engStats = [
  { num: 'P95 < 1.4s', label: 'End-to-end query latency including model call' },
  { num: '99.9%', label: 'Uptime SLA on Growth tier and above' },
  { num: '100%', label: 'Queries logged to immutable audit trail' },
  { num: '0', label: 'Third-party sub-processors with access to customer data' },
  { num: 'India', label: 'All data, embeddings, and inference traces stay in country' },
]

export default function TrustClient() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Architecture & Trust</p>
            <h1 className={styles.heroH1}>What your CISO needs to see.<br />What your examiner needs to read.</h1>
            <p className={styles.heroLede}>Full technical architecture, defence-in-depth layers, RBI FREE-AI control mapping, and honest certification status. No marketing. No vague assurances.</p>
          </div>
        </div>
      </section>

      <nav className={styles.subnav} aria-label="Trust page sections">
        <div className="container">
          <div className={styles.subnavInner}>
            {subnavLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className={styles.subnavLink}>{link.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <section className="section" id="platform-glance">
        <div className="container">
          <SectionHead eyebrow="Platform at a glance" title="The architecture in four numbers." />
          <div className={styles.glanceGrid}>
            {engStats.map((s) => (
              <div key={s.num} className={styles.glanceCell}>
                <div className={styles.glanceStat}>{s.num}</div>
                <div className={styles.glanceLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="defence">
        <div className="container">
          <SectionHead eyebrow="Defence-in-depth" title="Eight independent security guarantees." lede="Each layer operates independently. A failure at one does not cascade to the next — and each guarantee is verifiable by your security team." />
          <table className={styles.dataTable}>
            <thead><tr><th>Layer</th><th>Name</th><th>How it works</th><th>What it guarantees</th></tr></thead>
            <tbody>
              {defenceLayers.map((row) => (
                <tr key={row.code}>
                  <td><span className={styles.layerCode}>{row.code}</span></td>
                  <td style={{ fontWeight: 500, color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>{row.layer}</td>
                  <td>{row.controls}</td>
                  <td style={{ color: 'var(--ink-500)' }}>{row.guarantee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" id="ai-controls">
        <div className="container">
          <SectionHead eyebrow="AI controls" title="Security controls designed for AI, not retrofitted from the last decade." lede="AI systems introduce attack surfaces that traditional security frameworks weren't built for." />
          <table className={styles.dataTable}>
            <thead><tr><th>Control</th><th>Implementation</th></tr></thead>
            <tbody>
              {aiControls.map((row) => (
                <tr key={row.control}><td>{row.control}</td><td>{row.detail}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section alt" id="free-ai">
        <div className="container">
          <SectionHead eyebrow="RBI FREE-AI" title="Eight FREE-AI controls mapped to Anvax implementation." lede="RBI's FREE-AI framework defines governance requirements for AI in regulated financial entities." />
          <table className={styles.dataTable}>
            <thead><tr><th>Ref</th><th>Control</th><th>Anvax implementation</th><th>Status</th></tr></thead>
            <tbody>
              {freeAiControls.map((row) => (
                <tr key={row.ref}>
                  <td><span className={styles.layerCode}>{row.ref}</span></td>
                  <td style={{ fontWeight: 500, color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>{row.control}</td>
                  <td>{row.detail}</td>
                  <td><StatusPill status="live">Live</StatusPill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section dark" id="engineering">
        <div className="container">
          <SectionHead eyebrow="Engineering posture" title="Architecture commitments your security team can hold us to." dark />
          <div className={styles.statGrid}>
            {[
              { num: 'P95 < 1.4s', label: 'End-to-end query latency including model call and audit write' },
              { num: '99.9%', label: 'Uptime SLA on Growth tier and above' },
              { num: 'India', label: 'All data, embeddings, and inference traces stay in country' },
              { num: '0', label: 'Third-party sub-processors with access to your tenant data' },
            ].map((s) => (
              <div key={s.num} className={styles.statCard}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="certifications">
        <div className="container">
          <SectionHead eyebrow="Certifications" title="Honest status. No vanity badges." lede="We list what is live, what is in progress, and when we expect to complete it." />
          <div className={styles.certGrid}>
            {certifications.map((c) => (
              <div key={c.name} className={styles.certCard}>
                <StatusPill status={c.status}>{c.status === 'live' ? 'Live' : c.status === 'wip' ? 'In progress' : 'Planned'}</StatusPill>
                <div className={styles.certName}>{c.name}</div>
                <div className={styles.certNote}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="dpdp">
        <div className="container">
          <SectionHead eyebrow="DPDP Act 2023" title="India's data protection law, implemented by construction." lede="The Digital Personal Data Protection Act 2023 requires data minimisation, purpose limitation, and breach notification." />
          <table className={styles.dataTable} style={{ marginTop: 32 }}>
            <thead><tr><th>DPDP requirement</th><th>Anvax implementation</th></tr></thead>
            <tbody>
              {[
                { req: 'Data minimisation', impl: 'Only required fields ingested; PII auto-redacted before LLM context window' },
                { req: 'Purpose limitation', impl: 'System prompts scoped per role; model cannot deviate from defined purpose' },
                { req: 'Consent record', impl: 'Consent events logged to append-only audit_log with timestamp and session ID' },
                { req: 'Breach notification', impl: 'Real-time anomaly detection; security team alert within 15 minutes of detection' },
                { req: 'Data fiduciary obligations', impl: 'Customer retains ownership; Anvax is data processor; DPA available on request' },
                { req: 'Right to erasure', impl: 'Tenant data deletion pipeline with cryptographic key destruction for DEK-encrypted fields' },
              ].map((row) => (
                <tr key={row.req}><td>{row.req}</td><td>{row.impl}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" id="downloads">
        <div className="container">
          <SectionHead eyebrow="Downloads" title="Technical documentation for your security team." lede="Leave your work email and we'll send the documents directly. No sales call required for security review." />
          <div className={styles.downloadGrid}>
            <div className={styles.downloadCard}>
              <h3 className={styles.downloadTitle}>Security architecture brief</h3>
              <p className={styles.downloadDesc}>12-page PDF covering the full defence-in-depth stack, threat model, encryption architecture, and RBI FREE-AI control mapping.</p>
              <form className={styles.downloadForm} onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Work email" className={styles.downloadInput} required />
                <Button variant="accent" href="/contact">Request PDF</Button>
              </form>
            </div>
            <div className={styles.downloadCard}>
              <h3 className={styles.downloadTitle}>Penetration test summary</h3>
              <p className={styles.downloadDesc}>Executive summary of the most recent third-party penetration test. Available under NDA.</p>
              <form className={styles.downloadForm} onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Work email" className={styles.downloadInput} required />
                <Button variant="accent" href="/contact">Request under NDA</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Delete old file**

```bash
rm src/pages/Trust.tsx
```

- [ ] **Step 4: Commit**

```bash
git add app/trust/
git commit -m "feat: migrate trust page to next.js app router"
```

---

### Task 11: Deployment page

**Files:**
- Create: `app/deployment/page.tsx`
- Delete: `src/pages/Deployment.tsx`

- [ ] **Step 1: Create app/deployment/page.tsx**

Copy `src/pages/Deployment.tsx` in full, then apply these three changes:

1. Remove `import PageMeta from '../components/ui/PageMeta'`
2. Replace all `../components/` imports with `@/components/`
3. Replace `import styles from './Deployment.module.css'` with `import styles from '@/pages/Deployment.module.css'`
4. Remove the `<PageMeta ... />` element from the JSX
5. Add before the `export default function Deployment()` line:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deployment — Anvax',
  description: 'SaaS to air-gapped. Same product, three tiers. All data stays in India.',
  openGraph: { title: 'Deployment — Anvax', description: 'SaaS to air-gapped. Same product, three tiers.', url: 'https://anvax.in/deployment' },
  twitter: { card: 'summary_large_image', title: 'Deployment — Anvax', description: 'SaaS to air-gapped. Same product, three tiers.' },
  alternates: { canonical: 'https://anvax.in/deployment' },
}
```

- [ ] **Step 2: Delete old file**

```bash
rm src/pages/Deployment.tsx
```

- [ ] **Step 3: Commit**

```bash
git add app/deployment/
git commit -m "feat: migrate deployment page to next.js app router"
```

---

### Task 12: Company page

**Files:**
- Create: `app/company/page.tsx`
- Delete: `src/pages/Company.tsx`

- [ ] **Step 1: Create app/company/page.tsx**

Copy `src/pages/Company.tsx` in full, then apply the same pattern as Task 11:

1. Remove `import PageMeta` and its JSX usage
2. Replace `../components/` with `@/components/`
3. Replace `import styles from './Company.module.css'` with `import styles from '@/pages/Company.module.css'`
4. Add at the top:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company — Anvax',
  description: "Who we are, what we're building, and why we started with India's hardest market.",
  openGraph: { title: 'Company — Anvax', description: "Who we are, what we're building.", url: 'https://anvax.in/company' },
  twitter: { card: 'summary_large_image', title: 'Company — Anvax', description: "Who we are, what we're building." },
  alternates: { canonical: 'https://anvax.in/company' },
}
```

- [ ] **Step 2: Delete old file**

```bash
rm src/pages/Company.tsx
```

- [ ] **Step 3: Commit**

```bash
git add app/company/
git commit -m "feat: migrate company page to next.js app router"
```

---

### Task 13: Contact page

**Files:**
- Create: `app/contact/page.tsx`
- Create: `app/contact/ContactClient.tsx`
- Delete: `src/pages/Contact.tsx`

Uses `useState` and `useRef` — requires server/client split like Industries.

- [ ] **Step 1: Create app/contact/page.tsx**

```tsx
import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact — Anvax',
  description: 'Request a demo, ask about deployment options, or get in touch with the Anvax team.',
  openGraph: { title: 'Contact — Anvax', description: 'Request a demo or get in touch.', url: 'https://anvax.in/contact' },
  twitter: { card: 'summary_large_image', title: 'Contact — Anvax', description: 'Request a demo or get in touch.' },
  alternates: { canonical: 'https://anvax.in/contact' },
}

export default function ContactPage() {
  return <ContactClient />
}
```

- [ ] **Step 2: Create app/contact/ContactClient.tsx**

```tsx
'use client'
import { useState, useRef } from 'react'
import styles from '@/pages/Contact.module.css'
```

Then copy the full component body from `src/pages/Contact.tsx` — everything after the imports. The `fetch('/api/contact', ...)` call works without changes since Next.js serves the same route at `/api/contact`.

- [ ] **Step 3: Delete old file**

```bash
rm src/pages/Contact.tsx
```

- [ ] **Step 4: Commit**

```bash
git add app/contact/
git commit -m "feat: migrate contact page to next.js app router"
```

---

### Task 14: Pricing page (new — ported from pricing.html)

**Files:**
- Create: `app/pricing/page.tsx`
- Create: `src/pages/Pricing.module.css`

- [ ] **Step 1: Create src/pages/Pricing.module.css**

```css
.hero {
  position: relative;
  padding: 72px 0 64px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px;
  opacity: 0.04;
  pointer-events: none;
}
.heroRow {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 64px;
  align-items: end;
}
.heroH1 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 52px; line-height: 60px;
  letter-spacing: -0.016em;
  color: var(--ink-900);
  margin-top: 20px;
  max-width: 18ch;
}
.heroEm { color: var(--amber-700); font-style: italic; }
.heroLede {
  margin-top: 22px;
  font-family: var(--font-serif);
  font-size: 19px; line-height: 28px;
  color: var(--ink-500);
  max-width: 52ch;
}
.heroCtaRow {
  margin-top: 28px;
  display: flex; gap: 12px; flex-wrap: wrap;
}
.heroMeta {
  border-left: 1px solid var(--border-strong);
  padding-left: 28px;
  padding-bottom: 6px;
  display: flex; flex-direction: column; gap: 18px;
}
.heroMetaKey {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--amber-700);
  letter-spacing: 0.12em; text-transform: uppercase;
  margin-bottom: 4px;
}
.heroMetaVal {
  font-family: var(--font-sans);
  font-size: 14px; line-height: 22px;
  color: var(--ink-900);
}
.planGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.plan {
  background: var(--paper);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 32px 28px;
  display: flex; flex-direction: column; gap: 14px;
  min-height: 540px;
}
.planFeatured {
  background: var(--ink-900);
  color: var(--bone-100);
  border-color: var(--ink-900);
}
.planTier {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--amber-700);
  letter-spacing: 0.12em; text-transform: uppercase;
}
.planTierFeatured { color: var(--amber-500); }
.planName {
  font-family: var(--font-serif);
  font-size: 28px; line-height: 32px;
  font-weight: 400;
  letter-spacing: -0.005em;
}
.planWho {
  font-size: 13px; line-height: 20px;
  color: var(--ink-500);
  max-width: 28ch;
}
.planWhoFeatured { color: rgba(244, 240, 229, 0.6); }
.planPriceRow {
  margin-top: 8px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
  display: flex; align-items: baseline; gap: 6px;
}
.planPriceRowFeatured { border-top-color: rgba(244, 240, 229, 0.12); }
.planPrice {
  font-family: var(--font-serif);
  font-size: 38px; line-height: 42px;
  letter-spacing: -0.01em;
}
.planPriceUnit {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--fg-3);
  letter-spacing: 0.04em;
}
.planContact {
  font-family: var(--font-serif);
  font-size: 22px; line-height: 28px;
  font-weight: 400;
  color: var(--ink-900);
}
.planContactFeatured { color: var(--bone-100); }
.planNote {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg-3);
  margin-top: -4px;
  letter-spacing: 0.02em;
}
.planFeats {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 10px;
  flex: 1;
}
.planFeat {
  font-size: 13px; line-height: 20px;
  padding-left: 16px; position: relative;
}
.planFeat::before {
  content: ''; position: absolute; left: 0; top: 9px;
  width: 8px; height: 1px; background: var(--amber-600);
}
.planFeatFeatured::before { background: var(--amber-500); }
.planCta { margin-top: 12px; }
.compareWrap {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--paper);
}
.compareTable { width: 100%; border-collapse: collapse; }
.compareTable th, .compareTable td {
  padding: 14px 18px;
  text-align: left;
  font-size: 13px; line-height: 20px;
  border-bottom: 1px solid var(--border);
}
.compareTable thead th {
  background: var(--bone-100);
  font-size: 13px; font-weight: 600;
  color: var(--ink-900);
  border-bottom: 1px solid var(--border-strong);
}
.compareTable tbody tr:last-child td { border-bottom: 0; }
.compareGroupRow td {
  background: var(--bone-50);
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--fg-3);
  letter-spacing: 0.12em; text-transform: uppercase;
  font-weight: 500;
  padding: 10px 18px;
}
.compareTable td:first-child { color: var(--ink-700); }
.yes { color: var(--sage-700); font-family: var(--font-mono); font-size: 12px; }
.no { color: var(--slate-300); font-family: var(--font-mono); font-size: 16px; }
.vmono { font-family: var(--font-mono); font-size: 12px; color: var(--ink-700); }
.faq { border-top: 1px solid var(--border); }
.faqItem { border-bottom: 1px solid var(--border); padding: 22px 0; }
.faqSummary {
  list-style: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px;
  font-family: var(--font-serif);
  font-size: 20px; line-height: 28px;
  color: var(--ink-900);
  font-weight: 400;
  letter-spacing: -0.005em;
}
.faqSummary::-webkit-details-marker { display: none; }
.faqChev {
  font-family: var(--font-mono); font-size: 16px;
  color: var(--fg-3);
  transition: transform var(--dur-base) var(--ease-out);
}
.faqItem[open] .faqChev { transform: rotate(45deg); }
.faqBody {
  margin-top: 12px;
  font-size: 15px; line-height: 24px;
  color: var(--ink-500);
  max-width: 64ch;
}
.ctaBlock {
  background: var(--ink-900);
  color: var(--bone-100);
  border-radius: var(--radius-md);
  padding: 48px 60px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
  position: relative; overflow: hidden;
}
.ctaBlock::before {
  content: ''; position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px;
  opacity: 0.06; pointer-events: none;
}
.ctaEyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--amber-500);
  letter-spacing: 0.12em; text-transform: uppercase;
  position: relative;
}
.ctaH2 {
  position: relative;
  font-family: var(--font-serif);
  font-size: 32px; line-height: 40px;
  font-weight: 400;
  color: var(--bone-100);
  margin-top: 12px;
  max-width: 24ch;
}
.ctaBody {
  position: relative;
  margin-top: 12px;
  font-size: 15px; line-height: 24px;
  color: rgba(244, 240, 229, 0.6);
  max-width: 48ch;
}
.ctaActions {
  position: relative;
  display: flex; flex-direction: column; gap: 12px;
  flex-shrink: 0;
}
@media (max-width: 1080px) { .planGrid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 960px) {
  .heroRow { grid-template-columns: 1fr; gap: 28px; }
  .heroH1 { font-size: 40px; line-height: 48px; }
  .heroMeta { border-left: 0; padding-left: 0; border-top: 1px solid var(--border-strong); padding-top: 24px; }
  .compareWrap { overflow-x: auto; }
  .compareTable { min-width: 800px; }
  .ctaBlock { grid-template-columns: 1fr; padding: 36px; }
}
@media (max-width: 600px) { .planGrid { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Create app/pricing/page.tsx**

```tsx
import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import SectionHead from '@/components/ui/SectionHead'
import Eyebrow from '@/components/ui/Eyebrow'
import styles from '@/pages/Pricing.module.css'

export const metadata: Metadata = {
  title: 'Pricing — Anvax',
  description: 'Starter and Growth shown in full. Business and Sovereign tiers are custom — contact sales.',
  openGraph: { title: 'Pricing — Anvax', description: 'Starter and Growth shown in full. Business and Sovereign tiers are custom.', url: 'https://anvax.in/pricing' },
  twitter: { card: 'summary_large_image', title: 'Pricing — Anvax', description: 'Transparent pricing for sovereign AI.' },
  alternates: { canonical: 'https://anvax.in/pricing' },
}

const plans = [
  {
    tier: 'Tier 1 · SaaS', name: 'Starter', featured: false,
    who: 'Growth-stage fintechs and small teams getting their AI use governed.',
    price: '₹35,000', unit: '/ mo', note: '₹3.5L / yr · billed annually',
    feats: ['25 users', '5M input + 500K output tokens / mo', '5 connectors', 'Shared SaaS · AWS Mumbai', 'Basic workflows', 'Audit logs', 'DPDP self-attestation'],
    cta: { label: 'Start with Starter', href: '/contact', variant: 'secondary' as const },
  },
  {
    tier: 'Tier 1 · SaaS', name: 'Growth', featured: true,
    who: 'Scaling NBFCs and fintechs that need SSO, advanced RBAC and every connector.',
    price: '₹1,00,000', unit: '/ mo', note: '₹10L / yr · billed annually',
    feats: ['100 users', '25M input + 2.5M output tokens / mo', 'All connectors', 'Shared SaaS · AWS Mumbai', 'SSO / SCIM', 'Advanced RBAC', 'Advanced workflows + agents', 'RBI FREE-AI control suite'],
    cta: { label: 'Choose Growth', href: '/contact', variant: 'primary' as const },
  },
  {
    tier: 'Tier 2 · Sovereign', name: 'Business', featured: false,
    who: 'Regulated NBFCs and BFSI needing dedicated infrastructure and SLAs.',
    contact: 'Contact sales', note: 'Custom · scoped to your workloads',
    feats: ['Everything in Growth', 'Dedicated VPC', 'Indian sovereign GPU cloud', 'SLA with support tiers', 'MFA enforced', 'Custom workflow templates', 'Vertical intelligence pack'],
    cta: { label: 'Contact sales', href: '/contact', variant: 'secondary' as const },
  },
  {
    tier: 'Tier 3 · On-prem', name: 'Sovereign', featured: false,
    who: 'Large banks, PSUs and defence-adjacent — the deployment you can unplug.',
    contact: 'Contact sales', note: 'Custom · on-prem / air-gapped',
    feats: ['Everything in Business', 'Customer VPC / on-prem', 'Air-gapped option', 'Full compliance scope', 'Signed Helm bundles + SBOM', 'Dedicated support engineer', 'IndiaAI compute overlay'],
    cta: { label: 'Contact sales', href: '/contact', variant: 'secondary' as const },
  },
]

const faqs = [
  { q: 'How is usage metered?', a: 'By tokens — input and output, metered per tenant. Each plan includes a monthly allotment; overage is billed at the plan\'s per-token rate, visible in your admin console in real time. No surprise invoices.' },
  { q: 'What\'s the difference between Business and Sovereign?', a: 'Business runs on a dedicated VPC in an Indian sovereign GPU cloud (Tier 2). Sovereign runs in your own data centre, optionally air-gapped (Tier 3). Both are quoted directly because the number depends on workload, topology and compliance scope.' },
  { q: 'Does my data stay in India on every plan?', a: 'Yes. All customer data, embeddings and inference traces stay in India regardless of tier — Mumbai (ap-south-1) for SaaS, Indian sovereign cloud for Business, your DC for Sovereign. This is not a configuration flag; it\'s the substrate.' },
  { q: 'Can I move between tiers?', a: 'Up at any time, prorated. Moving from SaaS to a dedicated or on-prem tier is a migration we run with you — your corpus, embeddings and audit chain move intact, in India, the whole way.' },
  { q: 'Is there a free trial?', a: 'We run a scoped pilot instead — your corpus, an isolated demo tenant, 45 minutes with your CISO and CIO. The tenant is deleted afterwards and you keep everything. It\'s more useful than a self-serve trial for a regulated buyer.' },
]

export default function Pricing() {
  return (
    <>
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroRow}>
            <div>
              <Eyebrow>Pricing · Plain rupees, plain terms</Eyebrow>
              <h1 className={styles.heroH1}>Self-serve to sovereign. <span className={styles.heroEm}>No</span> "starting from".</h1>
              <p className={styles.heroLede}>Starter and Growth are listed in full. Business and Sovereign are custom — dedicated infrastructure, deployment topology and compliance scope decide the number, so we quote them directly.</p>
              <div className={styles.heroCtaRow}>
                <Button variant="accent" href="/contact" arrow>Request a demo</Button>
                <Button variant="secondary" href="/deployment">Compare deployment tiers</Button>
              </div>
            </div>
            <aside className={styles.heroMeta}>
              {[
                { k: 'Billing', v: 'Monthly or annual · annual paid up front' },
                { k: 'Residency', v: 'All tiers · data stays in India' },
                { k: 'Currency', v: '₹ INR · GST extra as applicable' },
              ].map(({ k, v }) => (
                <div key={k}>
                  <div className={styles.heroMetaKey}>{k}</div>
                  <div className={styles.heroMetaVal}>{v}</div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.planGrid}>
            {plans.map((p) => (
              <div key={p.name} className={`${styles.plan} ${p.featured ? styles.planFeatured : ''}`}>
                <div className={`${styles.planTier} ${p.featured ? styles.planTierFeatured : ''}`}>{p.tier}</div>
                <div className={styles.planName}>{p.name}</div>
                <p className={`${styles.planWho} ${p.featured ? styles.planWhoFeatured : ''}`}>{p.who}</p>
                <div className={`${styles.planPriceRow} ${p.featured ? styles.planPriceRowFeatured : ''}`}>
                  {p.price
                    ? <><span className={styles.planPrice}>{p.price}</span><span className={styles.planPriceUnit}>{p.unit}</span></>
                    : <span className={`${styles.planContact} ${p.featured ? styles.planContactFeatured : ''}`}>{p.contact}</span>
                  }
                </div>
                <div className={styles.planNote}>{p.note}</div>
                <ul className={styles.planFeats}>
                  {p.feats.map((f) => <li key={f} className={`${styles.planFeat} ${p.featured ? styles.planFeatFeatured : ''}`}>{f}</li>)}
                </ul>
                <div className={styles.planCta}>
                  <Button variant={p.cta.variant} href={p.cta.href}>{p.cta.label}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Compare" title="What changes between tiers." lede="Governance, audit chain and India-residency are identical on every plan. What changes is scale, deployment topology and the depth of compliance scope." />
          <div className={styles.compareWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr><th style={{ width: '30%' }}>Capability</th><th>Starter</th><th>Growth</th><th>Business</th><th>Sovereign</th></tr>
              </thead>
              <tbody>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Scale</td></tr>
                <tr><td>Users</td><td className={styles.vmono}>25</td><td className={styles.vmono}>100</td><td className={styles.vmono}>Custom</td><td className={styles.vmono}>Custom</td></tr>
                <tr><td>Tokens / mo (in + out)</td><td className={styles.vmono}>5M + 500K</td><td className={styles.vmono}>25M + 2.5M</td><td className={styles.vmono}>Custom</td><td className={styles.vmono}>Custom</td></tr>
                <tr><td>Connectors</td><td className={styles.vmono}>5</td><td className={styles.vmono}>All</td><td className={styles.vmono}>All</td><td className={styles.vmono}>All</td></tr>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Deployment</td></tr>
                <tr><td>Hosting</td><td className={styles.vmono}>Shared SaaS</td><td className={styles.vmono}>Shared SaaS</td><td className={styles.vmono}>Dedicated VPC</td><td className={styles.vmono}>On-prem / air-gap</td></tr>
                <tr><td>GPU substrate</td><td className={styles.vmono}>AWS Mumbai</td><td className={styles.vmono}>AWS Mumbai</td><td className={styles.vmono}>Sovereign cloud</td><td className={styles.vmono}>Customer DC</td></tr>
                <tr><td>IndiaAI overlay</td><td className={styles.no}>—</td><td className={styles.no}>—</td><td className={styles.yes}>Optional</td><td className={styles.yes}>Optional</td></tr>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Identity & access</td></tr>
                <tr><td>SSO / SCIM</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>Advanced RBAC</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>MFA enforced</td><td className={styles.no}>—</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Governance & compliance</td></tr>
                <tr><td>Audit logs · SHA-256 chained</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>DPDP self-attestation</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>RBI FREE-AI control suite</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>Full compliance scope</td><td className={styles.no}>—</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr className={styles.compareGroupRow}><td colSpan={5}>Workflows & support</td></tr>
                <tr><td>Workflows</td><td className={styles.vmono}>Basic</td><td className={styles.vmono}>Advanced</td><td className={styles.vmono}>Custom</td><td className={styles.vmono}>Custom</td></tr>
                <tr><td>Agents</td><td className={styles.no}>—</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td><td className={styles.yes}>✓</td></tr>
                <tr><td>Support</td><td className={styles.vmono}>Email</td><td className={styles.vmono}>Priority</td><td className={styles.vmono}>SLA</td><td className={styles.vmono}>Dedicated</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Questions" title="The things procurement asks first." />
          <div className={styles.faq}>
            {faqs.map((f, i) => (
              <details key={f.q} className={styles.faqItem} open={i === 0}>
                <summary className={styles.faqSummary}>
                  {f.q} <span className={styles.faqChev}>+</span>
                </summary>
                <p className={styles.faqBody}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className={styles.ctaBlock}>
            <div>
              <p className={styles.ctaEyebrow}>Get a quote</p>
              <h2 className={styles.ctaH2}>Business or Sovereign? We'll scope it in one call.</h2>
              <p className={styles.ctaBody}>Tell us your user count, your deployment constraints and your compliance scope. We come back with a fixed quote — no "contact us to contact us" loop.</p>
            </div>
            <div className={styles.ctaActions}>
              <Button variant="accent" href="/contact" arrow>Talk to sales</Button>
              <Button variant="secondaryDark" href="/trust#downloads">Get the regulator pack</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/pricing/ src/pages/Pricing.module.css
git commit -m "feat: add pricing page as react component (ported from pricing.html)"
```

---

### Task 15: Contact API route

**Files:**
- Create: `app/api/contact/route.ts`
- Delete: `api/contact.ts`

- [ ] **Step 1: Create app/api/contact/route.ts**

```ts
export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>
  const { name, company, email, role, message } = body

  if (!email || !name) {
    return Response.json({ error: 'Name and email are required' }, { status: 400 })
  }

  if (!process.env.LOOPS_API_KEY) {
    console.error('LOOPS_API_KEY is not set')
    return Response.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const [firstName, ...rest] = String(name).trim().split(' ')
  const lastName = rest.join(' ') || undefined

  try {
    const loopsRes = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        source: 'contact-form',
        userGroup: 'Leads',
        company: company || undefined,
        jobTitle: role || undefined,
        notes: message || undefined,
      }),
    })

    const data = await loopsRes.json() as { success: boolean; message?: string }
    console.log('Loops response:', loopsRes.status, JSON.stringify(data))

    if (!loopsRes.ok && data.message?.toLowerCase().includes('already exists')) {
      return Response.json({ success: true })
    }

    if (!loopsRes.ok) {
      console.error('Loops error:', loopsRes.status, data)
      return Response.json({ error: 'Failed to save contact' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Delete old file**

```bash
rm api/contact.ts
```

- [ ] **Step 3: Commit**

```bash
git add app/api/contact/ api/contact.ts
git commit -m "feat: migrate contact api to next.js route handler"
```

---

### Task 16: Sitemap

**Files:**
- Create: `app/sitemap.ts`
- Delete: `api/sitemap.ts`

- [ ] **Step 1: Create app/sitemap.ts**

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://anvax.in'
  const now = new Date()
  return [
    { url: base,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/platform`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/industries`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/trust`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/deployment`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/pricing`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/company`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
```

- [ ] **Step 2: Delete old file**

```bash
rm api/sitemap.ts
```

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts api/sitemap.ts
git commit -m "feat: replace vercel sitemap handler with native next.js sitemap"
```

---

### Task 17: Cleanup — vercel.json, blog placeholder, delete old files

**Files:**
- Modify: `vercel.json`
- Create: `app/blog/.gitkeep`
- Delete: `src/router.tsx`, `src/App.tsx`, `src/components/ui/PageMeta.tsx`

- [ ] **Step 1: Simplify vercel.json**

```json
{
  "cleanUrls": true
}
```

- [ ] **Step 2: Create blog route placeholder**

```bash
mkdir -p app/blog && touch app/blog/.gitkeep
```

- [ ] **Step 3: Delete obsolete files**

```bash
rm src/router.tsx src/App.tsx src/components/ui/PageMeta.tsx
```

- [ ] **Step 4: Verify no remaining react-router-dom or vite-react-ssg imports**

```bash
grep -r "react-router-dom\|vite-react-ssg" src/ app/ --include="*.tsx" --include="*.ts"
```

Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove obsolete vite/react-router files, simplify vercel.json, reserve /blog route"
```

---

### Task 18: Build verification

- [ ] **Step 1: Run type check**

```bash
npm run typecheck
```

Expected: exits with code 0 and no errors. Fix any errors before proceeding.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected output includes:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    ...
├ ○ /company                             ...
├ ○ /contact                             ...
├ ○ /deployment                          ...
├ ○ /industries                          ...
├ ○ /platform                            ...
├ ○ /pricing                             ...
└ ○ /trust                               ...
```

All routes should be `○` (static). No build errors.

- [ ] **Step 3: Spot check dev server**

```bash
npm run dev
```

Check each of these URLs in a browser:
- http://localhost:3000 — home page with hero animation
- http://localhost:3000/platform — logo wall renders
- http://localhost:3000/industries — accordion opens/closes
- http://localhost:3000/trust — subnav links scroll
- http://localhost:3000/pricing — plans grid and FAQ expand

- [ ] **Step 4: Verify sitemap**

```
http://localhost:3000/sitemap.xml
```

Expected: valid XML with 8 URLs.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete next.js migration — all 8 pages, self-hosted fonts, next/image logo wall"
```
