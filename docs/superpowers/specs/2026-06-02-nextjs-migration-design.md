# Next.js Migration Design

**Date:** 2026-06-02  
**Scope:** Migrate Anvax website from Vite + vite-react-ssg + React Router DOM v6 to Next.js 15 App Router  
**Goal:** Fast, reliable, SEO-optimised foundation for a growing marketing site (blog, newsletter, and more features planned)

---

## Context

The Anvax website is a 7-page marketing + trust site for a sovereign AI platform targeting India's regulated enterprises. It is the primary business door — SEO performance, reliability, and page speed are first-class requirements. The site is deployed on Vercel via GitHub.

Current stack: React 18 + Vite + `vite-react-ssg` + React Router DOM v6 + TypeScript + CSS Modules.

The migration is Option A: clean 1:1 framework swap with targeted improvements to metadata, fonts, and images. No new features. Blog routing reserved but empty. Full redesign or feature additions are out of scope.

---

## Architecture

### File structure

```
app/
├── layout.tsx            ← root layout (Nav + Footer, global CSS, fonts)
├── page.tsx              ← Home
├── platform/page.tsx
├── industries/page.tsx
├── trust/page.tsx
├── deployment/page.tsx
├── pricing/page.tsx      ← new: migrated from orphaned pricing.html
├── company/page.tsx
├── contact/page.tsx
├── blog/
│   └── .gitkeep          ← reserved, empty, no implementation yet
├── api/
│   └── contact/
│       └── route.ts      ← replaces api/contact.ts
└── sitemap.ts            ← replaces api/sitemap.ts + vercel.json rewrite

src/components/           ← unchanged
src/styles/               ← unchanged
styles/                   ← legacy HTML stylesheets, untouched
```

### Rendering strategy

All 7 pages are statically generated at build time by default (Next.js default behaviour). No `output: 'export'` is set — this preserves the ability to opt individual routes into SSR or ISR later without a framework change.

---

## Routing & Navigation

`src/router.tsx` is deleted. App Router folder structure replaces it entirely.

**Nav.tsx changes (only file with routing logic):**
- `import { Link, useLocation } from 'react-router-dom'` → `import Link from 'next/link'` + `import { usePathname } from 'next/navigation'`
- `'use client'` directive added at top (required for `usePathname`)

**All other components using `<Link>`** (ArchDiagram, IndustriesGrid, PillarsSection, ComplianceStrip, Footer): import swap from `react-router-dom` to `next/link` only — no logic changes.

**App.tsx** is replaced by `app/layout.tsx`. `<Outlet />` becomes `{children: React.ReactNode}` prop.

All page components remain Server Components (no `useState`, `useEffect`, or browser APIs).

---

## Metadata & SEO

`src/components/ui/PageMeta.tsx` is deleted.

Each page exports a `metadata` constant (or `generateMetadata` function for dynamic routes):

```ts
export const metadata: Metadata = {
  title: 'Page Title | Anvax',
  description: '...',
  openGraph: {
    title: '...',
    description: '...',
    url: 'https://anvax.in/page',
    siteName: 'Anvax',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '...',
    description: '...',
  },
  alternates: {
    canonical: 'https://anvax.in/page',
  },
}
```

`app/layout.tsx` exports base metadata inherited by all pages:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://anvax.in'),
  applicationName: 'Anvax',
  robots: { index: true, follow: true },
}
```

---

## Fonts

Current approach: `<link>` tags in HTML files pointing to Google Fonts and Fontshare CDNs — adds a third-party DNS lookup on every page load.

New approach: `next/font` self-hosts all font files. Fonts are declared once in `app/layout.tsx` and injected as CSS variables matching the existing token names:

| Font | Token | Source |
|---|---|---|
| Source Serif 4 | `--font-serif` | `next/font/google` |
| General Sans | `--font-sans` | `next/font/local` (Fontshare) |
| Geist Mono | `--font-mono` | `next/font/local` or `geist` package |

No changes to `tokens.css` or any component — only how fonts are loaded changes. This directly improves LCP.

---

## Images

**Logo wall (platform page):** 18 raw `<img>` tags replaced with `next/image`. Benefits: automatic WebP conversion, lazy loading, layout-shift prevention (CLS improvement).

**SVG assets** (wordmarks, lattice): remain as-is — `next/image` is not beneficial for small SVGs used as UI elements.

**No other image changes.**

---

## API Routes

### Contact (`app/api/contact/route.ts`)

Logic unchanged (Loops.so integration, field validation, error handling). Function signature updated to Next.js route handler format:

```ts
// Before
export default async function handler(req: VercelRequest, res: VercelResponse) { ... }

// After
export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ ... }, { status: 200 })
}
```

`@vercel/node` dev dependency removed.

### Sitemap (`app/sitemap.ts`)

Replaces `api/sitemap.ts` and the `vercel.json` rewrite rule. Returns a plain array; Next.js generates the XML:

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://anvax.in', lastModified: new Date() },
    { url: 'https://anvax.in/platform', lastModified: new Date() },
    // ...
  ]
}
```

---

## Pricing Page Gap

`pricing.html` exists as a standalone HTML file but has no corresponding React component. During migration, `app/pricing/page.tsx` is created from the `pricing.html` markup, closing this gap so all 7 pages are React-native.

---

## Vercel Configuration

`vercel.json` simplifies significantly:

```json
{
  "cleanUrls": true
}
```

`buildCommand`, `outputDirectory`, and the sitemap rewrite are all handled automatically by Vercel's Next.js integration. `cleanUrls: true` is kept explicitly to preserve existing URL structure.

---

## Dependencies

**Remove:**
- `vite`
- `vite-react-ssg`
- `@vitejs/plugin-react`
- `react-router-dom`
- `@vercel/node`

**Delete files:**
- `src/main.tsx` (Vite entry point, replaced by Next.js)
- `src/vite-env.d.ts` (Vite type declarations)
- `vite.config.ts`
- `tsconfig.node.json` (Vite-specific TS config)
- `src/router.tsx`
- `src/App.tsx`
- `src/components/ui/PageMeta.tsx`

**Replace:**
- `tsconfig.json` → Next.js requires its own TypeScript config (`compilerOptions.jsx: 'preserve'`, `moduleResolution: 'bundler'`, `paths: { '@/*': ['./src/*'] }`). Generated by `create-next-app` or written manually — existing settings for `strict`, `target`, etc. are carried over.

**Add:**
- `next`

**Keep:**
- `react`, `react-dom`
- `lucide-react`
- `typescript` + type packages

---

## What Does Not Change

- All CSS Modules (`.module.css` files) — identical in Next.js
- `tokens.css` and `global.css` — imported in `layout.tsx` instead of `main.tsx`
- All component JSX and logic
- All assets (`assets/`, `public/`, `assets/logos/`)
- Legacy `styles/` folder (used by old HTML files)
- `.env.local` and environment variables

---

## Out of Scope

- Blog content or CMS implementation (route reserved only)
- Newsletter feature
- OG image generation (`next/og`)
- JSON-LD structured data
- A/B testing or personalisation
- Any visual or content changes to existing pages
