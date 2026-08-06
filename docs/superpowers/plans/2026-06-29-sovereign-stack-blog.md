# Sovereign Stack Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fully SEO-optimised, statically-generated MDX blog at `/blog` to the Anvax Next.js marketing site, serving as the canonical home for "Sovereign Stack," a weekly AI-governance newsletter for Indian BFSI.

**Architecture:** MDX content lives in `content/blog/*.mdx`. Frontmatter is parsed with `gray-matter`. MDX is rendered in Server Components with `next-mdx-remote/rsc`. All blog routes are statically generated at build time via `generateStaticParams`. The blog index uses path-segment pagination at `/blog/page/[page]` for SSG compatibility. SEO is handled through Next.js `generateMetadata`, inline JSON-LD `<script>` tags, a dynamic `app/sitemap.ts`, a `feed`-powered Route Handler for RSS, and a `next/og` edge Route Handler for branded OG images.

**Tech Stack:** Next.js 15 App Router (SSG), TypeScript, CSS Modules + CSS custom properties (no Tailwind), `gray-matter` ^4, `next-mdx-remote` ^5, `feed` ^4

## Global Constraints

- Next.js 15 App Router, React 18, TypeScript strict mode.
- Styling: CSS Modules + CSS custom properties from `src/styles/tokens.css` only. No Tailwind. No hardcoded hex values in CSS — use token vars (`var(--ink-900)`, `var(--amber-600)`, etc.).
- Fonts: `var(--font-sans)` (General Sans), `var(--font-serif)` (Source Serif 4), `var(--font-mono)` (GeistMono).
- CSS pattern: page-level CSS modules live in `src/pages/PageName.module.css` (NOT co-located with the page component). Component-level CSS co-located with component.
- All blog pages: `export const dynamicParams = false` + `generateStaticParams`. No per-request server rendering.
- `metadataBase` is already `https://www.anvax.in` in root layout — all relative URLs will resolve against it.
- `POSTS_PER_PAGE = 12`. Blog index page 1 at `/blog`; subsequent pages at `/blog/page/2`, `/blog/page/3`, etc.
- Draft posts (`draft: true`) excluded in production; included in development.
- Tags are display-only (no `/blog/tag/[tag]` pages).
- `public/sitemap.xml` must be deleted — replaced by `src/app/sitemap.ts`.
- `src/app/blog/.gitkeep` must be deleted when real files land in that directory.
- `public/robots.txt` already allows `*` on all paths — no change needed.

---

## File Map

### New files
```
content/blog/
  test-post.mdx                            # test post, deleted in Task 10

src/lib/
  blog.ts                                  # getAllPosts(), getPostBySlug(), types

src/app/blog/
  page.tsx                                 # Blog index, page 1
  page/[page]/
    page.tsx                               # Blog index, pages 2+
  [slug]/
    page.tsx                               # Individual post (SSG)
  rss.xml/
    route.ts                               # RSS feed Route Handler (feed pkg)

src/app/api/og/
  route.ts                                 # OG image edge Route Handler (next/og)

src/app/
  sitemap.ts                               # Dynamic sitemap (replaces public/sitemap.xml)

src/components/blog/
  JsonLd.tsx                               # BlogPosting JSON-LD <script> tag
  BlogCard.tsx                             # Post card for index listing
  BlogCard.module.css
  Pagination.tsx                           # Page nav (prev / numbers / next)
  Pagination.module.css
  Prose.module.css                         # MDX body typography (uses :global() selectors)

src/pages/
  Blog.module.css                          # Blog index page styles
  BlogPost.module.css                      # Blog post page styles
```

### Modified files
```
src/components/layout/Nav.tsx              # Add "Blog" link
src/components/layout/Footer.tsx          # Add Blog to Company column
public/sitemap.xml                         # DELETE
src/app/blog/.gitkeep                      # DELETE (replaced by real files)
```

---

## Task 1: Dependencies + content scaffold + test post

**Files:**
- Run: `npm install gray-matter next-mdx-remote feed`
- Run: `npm install -D @types/mdx`
- Create: `content/blog/test-post.mdx`
- Delete: `src/app/blog/.gitkeep`

**Interfaces:**
- Produces: `content/blog/` directory with one valid MDX post used by all subsequent tasks.

- [ ] **Step 1: Install runtime packages**

```bash
cd /path/to/repo
npm install gray-matter next-mdx-remote feed
npm install -D @types/mdx
```

Expected: exits 0, packages appear in `node_modules/`.

- [ ] **Step 2: Create content directory and test post**

Create `content/blog/test-post.mdx`:

```mdx
---
title: "FREE-AI reads like a green light. For you it's a checklist."
description: "What RBI's FREE-AI framework actually asks compliance officers to prove."
pubDate: 2026-06-30
tags: ["regulation", "free-ai", "rbi"]
draft: false
---

RBI's FREE-AI framework landed in May 2026. Most compliance teams read the headline —
*Fairness, Reliability, Explainability, Ethics, AI governance* — and filed it under "noted."

That was a mistake.

## What FREE-AI actually demands

FREE-AI is not a principles statement. It is a **control inventory**. Each pillar maps to
specific artefacts a regulated entity must be able to produce on demand:

- **Fairness**: demographic parity reports across loan decision models, tested quarterly.
- **Reliability**: SLA evidence — uptime, latency P99, error rates — retained for 24 months.
- **Explainability**: per-decision explanations for any AI-driven customer outcome.

## The checklist your team needs to run today

Before your next board meeting, answer these three questions:

1. Can you produce a model card for every AI system touching a credit or insurance decision?
2. Do your audit logs capture the model version *and* input features for every inference?
3. Is there a documented human override path for every automated customer-facing decision?

If any answer is "not yet," that is the gap FREE-AI targets.

## Internal link example

As covered in [our earlier piece on data residency](/blog/test-post), the audit trail
requirement connects directly to where inference happens.
```

- [ ] **Step 3: Delete the gitkeep placeholder**

```bash
rm src/app/blog/.gitkeep
```

- [ ] **Step 4: Verify TypeScript still passes**

```bash
npm run typecheck
```

Expected: no errors (new packages not yet imported — this just confirms baseline).

- [ ] **Step 5: Commit**

```bash
git add content/blog/test-post.mdx package.json package-lock.json
git rm src/app/blog/.gitkeep
git commit -m "feat(blog): install deps, add content dir and test post"
```

---

## Task 2: Blog utilities — `src/lib/blog.ts`

**Files:**
- Create: `src/lib/blog.ts`

**Interfaces:**
- Produces:
  - `PostFrontmatter` — shape of parsed frontmatter
  - `Post` — `{ slug, frontmatter, readingTime }`
  - `PostWithContent` — `Post & { content: string }` (MDX body without frontmatter)
  - `getAllPosts(): Post[]` — reads all non-draft posts, sorted newest-first
  - `getPostBySlug(slug: string): PostWithContent | null`

- [ ] **Step 1: Create `src/lib/blog.ts`**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export interface PostFrontmatter {
  title: string
  description: string
  pubDate: Date
  updatedDate?: Date
  tags: string[]
  canonicalURL?: string
  draft: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: number // minutes, minimum 1
}

export interface PostWithContent extends Post {
  content: string // MDX body, frontmatter already stripped
}

function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, '')
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: {
      title: data.title as string,
      description: data.description as string,
      pubDate: new Date(data.pubDate as string),
      updatedDate: data.updatedDate ? new Date(data.updatedDate as string) : undefined,
      tags: (data.tags as string[]) ?? [],
      canonicalURL: data.canonicalURL as string | undefined,
      draft: (data.draft as boolean) ?? false,
    },
    readingTime: calculateReadingTime(content),
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const files = fs.readdirSync(CONTENT_DIR).filter(f => /\.mdx?$/.test(f))
  const isDev = process.env.NODE_ENV === 'development'
  return files
    .map(parsePost)
    .filter(p => isDev || !p.frontmatter.draft)
    .sort((a, b) => b.frontmatter.pubDate.getTime() - a.frontmatter.pubDate.getTime())
}

export function getPostBySlug(slug: string): PostWithContent | null {
  for (const ext of ['mdx', 'md']) {
    const filepath = path.join(CONTENT_DIR, `${slug}.${ext}`)
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        frontmatter: {
          title: data.title as string,
          description: data.description as string,
          pubDate: new Date(data.pubDate as string),
          updatedDate: data.updatedDate ? new Date(data.updatedDate as string) : undefined,
          tags: (data.tags as string[]) ?? [],
          canonicalURL: data.canonicalURL as string | undefined,
          draft: (data.draft as boolean) ?? false,
        },
        readingTime: calculateReadingTime(content),
        content,
      }
    }
  }
  return null
}
```

- [ ] **Step 2: Verify types**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat(blog): add blog utility library (getAllPosts, getPostBySlug)"
```

---

## Task 3: Nav + Footer updates

**Files:**
- Modify: `src/components/layout/Nav.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `/blog` appears in primary nav and footer.

- [ ] **Step 1: Add Blog to Nav links array**

In `src/components/layout/Nav.tsx`, change the `links` array:

```ts
// BEFORE
const links = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/trust',      label: 'Trust' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/company',    label: 'Company' },
]

// AFTER
const links = [
  { to: '/platform',   label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/trust',      label: 'Trust' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/company',    label: 'Company' },
  { to: '/blog',       label: 'Blog' },
]
```

- [ ] **Step 2: Add Blog to Footer company column**

In `src/components/layout/Footer.tsx`, change the `company` array:

```ts
// BEFORE
const company = [
  { to: '/company',          label: 'About' },
  { to: '/company',          label: 'Team' },
  { to: '/company#careers',  label: 'Careers' },
  { to: '/contact',          label: 'Contact' },
]

// AFTER
const company = [
  { to: '/company',          label: 'About' },
  { to: '/company',          label: 'Team' },
  { to: '/company#careers',  label: 'Careers' },
  { to: '/blog',             label: 'Sovereign Stack' },
  { to: '/contact',          label: 'Contact' },
]
```

- [ ] **Step 3: Verify types and commit**

```bash
npm run typecheck
git add src/components/layout/Nav.tsx src/components/layout/Footer.tsx
git commit -m "feat(blog): add Blog link to nav and footer"
```

---

## Task 4: BlogCard + Pagination components

**Files:**
- Create: `src/components/blog/BlogCard.tsx`
- Create: `src/components/blog/BlogCard.module.css`
- Create: `src/components/blog/Pagination.tsx`
- Create: `src/components/blog/Pagination.module.css`

**Interfaces:**
- Consumes: `Post` from `@/lib/blog`
- Produces:
  - `<BlogCard post={Post} />` — renders title, date, description, reading time, tags
  - `<Pagination currentPage={number} totalPages={number} basePath={string} />` — renders prev/number/next links; page 1 links to `basePath`, page N links to `${basePath}/page/${N}`

- [ ] **Step 1: Create `src/components/blog/BlogCard.tsx`**

```tsx
import Link from 'next/link'
import type { Post } from '@/lib/blog'
import styles from './BlogCard.module.css'

interface BlogCardProps {
  post: Post
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter, readingTime } = post
  return (
    <article className={styles.card}>
      <Link href={`/blog/${slug}`} className={styles.link}>
        <div className={styles.meta}>
          <time dateTime={frontmatter.pubDate.toISOString()} className={styles.date}>
            {formatDate(frontmatter.pubDate)}
          </time>
          <span className={styles.sep}>·</span>
          <span className={styles.readTime}>{readingTime} min read</span>
        </div>
        <h2 className={styles.title}>{frontmatter.title}</h2>
        <p className={styles.desc}>{frontmatter.description}</p>
        {frontmatter.tags.length > 0 && (
          <div className={styles.tags}>
            {frontmatter.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        <span className={styles.readMore}>Read more →</span>
      </Link>
    </article>
  )
}
```

- [ ] **Step 2: Create `src/components/blog/BlogCard.module.css`**

```css
.card {
  background: var(--bg-inset);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.card:hover {
  box-shadow: var(--shadow-pop);
  border-color: var(--border-strong);
}
.link {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 28px 24px;
  text-decoration: none;
  color: inherit;
  height: 100%;
}
.meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.date {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.sep { color: var(--border-strong); font-size: 12px; }
.readTime {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  color: var(--ink-900);
  text-wrap: balance;
  transition: color var(--dur-base) var(--ease-out);
}
.card:hover .title { color: var(--amber-700); }
.desc {
  font-size: 14px;
  line-height: 22px;
  color: var(--fg-2);
  flex: 1;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
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
.readMore {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--amber-600);
  margin-top: 4px;
}
```

- [ ] **Step 3: Create `src/components/blog/Pagination.tsx`**

```tsx
import Link from 'next/link'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number   // 1-based
  totalPages: number
  basePath: string      // e.g. "/blog"
}

function pageHref(basePath: string, page: number): string {
  return page === 1 ? basePath : `${basePath}/page/${page}`
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav className={styles.nav} aria-label="Pagination">
      <Link
        href={pageHref(basePath, currentPage - 1)}
        className={`${styles.arrow} ${!hasPrev ? styles.disabled : ''}`}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? 0 : -1}
      >
        ← Prev
      </Link>

      <div className={styles.pages}>
        {pages.map(page => (
          <Link
            key={page}
            href={pageHref(basePath, page)}
            className={`${styles.page} ${page === currentPage ? styles.current : ''}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={pageHref(basePath, currentPage + 1)}
        className={`${styles.arrow} ${!hasNext ? styles.disabled : ''}`}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? 0 : -1}
      >
        Next →
      </Link>
    </nav>
  )
}
```

- [ ] **Step 4: Create `src/components/blog/Pagination.module.css`**

```css
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
}
.arrow {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-900);
  text-decoration: none;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-button);
  background: var(--bg-inset);
  transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.arrow:hover:not(.disabled) { background: var(--bone-100); border-color: var(--border-strong); }
.disabled { opacity: 0.35; pointer-events: none; }
.pages { display: flex; gap: 4px; }
.page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--fg-2);
  text-decoration: none;
  border-radius: var(--radius-button);
  border: 1px solid transparent;
  transition: background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);
}
.page:hover { background: var(--bone-100); color: var(--ink-900); }
.current {
  background: var(--ink-900);
  color: var(--bone-100);
  border-color: var(--ink-900);
  pointer-events: none;
}
```

- [ ] **Step 5: Verify types**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/blog/
git commit -m "feat(blog): add BlogCard and Pagination components"
```

---

## Task 5: Blog index pages — `/blog` (page 1) + `/blog/page/[page]` (pages 2+)

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/page/[page]/page.tsx`
- Create: `src/pages/Blog.module.css`

**Interfaces:**
- Consumes: `getAllPosts()`, `BlogCard`, `Pagination`
- Produces: SSG blog listing at `/blog` and `/blog/page/N`

- [ ] **Step 1: Create `src/pages/Blog.module.css`**

```css
/* Blog index page */
.hero {
  padding: 60px 0 72px;
  border-bottom: 1px solid var(--border);
  background: var(--ink-900);
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px;
  opacity: 0.06;
  pointer-events: none;
}
.heroInner {
  position: relative;
  max-width: 680px;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--amber-500);
  margin-bottom: 20px;
}
.h1 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 48px;
  line-height: 58px;
  letter-spacing: -0.015em;
  color: var(--bone-100);
  margin-bottom: 20px;
}
.lede {
  font-family: var(--font-serif);
  font-size: 18px;
  line-height: 28px;
  color: var(--fg-on-dark-dim);
  max-width: 54ch;
  margin-bottom: 28px;
}
.rssLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--amber-500);
  text-decoration: none;
  border: 1px solid rgba(201,152,88,0.3);
  border-radius: var(--radius-pill);
  padding: 4px 12px;
  transition: border-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);
}
.rssLink:hover { color: var(--amber-100); border-color: var(--amber-500); }

/* Post grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

@media (max-width: 960px) {
  .h1 { font-size: 36px; line-height: 46px; }
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Create `src/app/blog/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import Pagination from '@/components/blog/Pagination'
import styles from '@/pages/Blog.module.css'

const POSTS_PER_PAGE = 12

export const metadata: Metadata = {
  title: 'Sovereign Stack — AI Governance & Regulation for Indian BFSI',
  description: "Weekly analysis of AI governance, RBI regulations, and compliance strategy for risk officers in India's regulated financial sector.",
  openGraph: {
    title: 'Sovereign Stack — AI Governance & Regulation for Indian BFSI',
    description: "Weekly analysis of AI governance, RBI regulations, and compliance strategy for risk officers in India's regulated financial sector.",
    url: 'https://www.anvax.in/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Stack — AI Governance & Regulation for Indian BFSI',
    description: "Weekly analysis on RBI, SEBI, IRDAI and what they mean for BFSI compliance teams.",
  },
  alternates: { canonical: 'https://www.anvax.in/blog' },
}

export default function BlogIndex() {
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const posts = allPosts.slice(0, POSTS_PER_PAGE)

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Sovereign Stack</p>
            <h1 className={styles.h1}>AI governance for India's regulators.</h1>
            <p className={styles.lede}>
              Weekly analysis on RBI FREE-AI, DPDP, SEBI circulars, and what they actually
              mean for compliance officers in BFSI.
            </p>
            <a href="/blog/rss.xml" className={styles.rssLink} aria-label="Subscribe via RSS">
              RSS feed
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <p style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              No posts yet — check back soon.
            </p>
          ) : (
            <>
              <div className={styles.grid}>
                {posts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
              <Pagination currentPage={1} totalPages={totalPages} basePath="/blog" />
            </>
          )}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Create `src/app/blog/page/[page]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import Pagination from '@/components/blog/Pagination'
import styles from '@/pages/Blog.module.css'

const POSTS_PER_PAGE = 12

export const dynamicParams = false

export async function generateStaticParams() {
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  // Page 1 is at /blog — only generate params for pages 2+
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }))
}

type Props = { params: Promise<{ page: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params
  const pageNum = Number(page)
  return {
    title: `Sovereign Stack — Page ${pageNum} · Anvax`,
    alternates: { canonical: `https://www.anvax.in/blog/page/${pageNum}` },
  }
}

export default async function BlogPage({ params }: Props) {
  const { page } = await params
  const pageNum = Number(page)

  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  if (pageNum < 2 || pageNum > totalPages || !Number.isInteger(pageNum)) {
    notFound()
  }

  const start = (pageNum - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE)

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Sovereign Stack</p>
            <h1 className={styles.h1}>AI governance for India's regulators.</h1>
            <p className={styles.lede}>
              Weekly analysis on RBI FREE-AI, DPDP, SEBI circulars, and what they actually
              mean for compliance officers in BFSI.
            </p>
            <a href="/blog/rss.xml" className={styles.rssLink} aria-label="Subscribe via RSS">
              RSS feed
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={pageNum} totalPages={totalPages} basePath="/blog" />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Verify typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/page.tsx src/app/blog/page/ src/pages/Blog.module.css
git commit -m "feat(blog): add blog index with SSG pagination"
```

---

## Task 6: JSON-LD component + Prose styles + individual post page

**Files:**
- Create: `src/components/blog/JsonLd.tsx`
- Create: `src/components/blog/Prose.module.css`
- Create: `src/pages/BlogPost.module.css`
- Create: `src/app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getPostBySlug()`, `PostFrontmatter`, `compileMDX` from `next-mdx-remote/rsc`
- Produces:
  - `<JsonLd ... />` — renders `<script type="application/ld+json">` with BlogPosting schema
  - `/blog/[slug]` — SSG post page with H1, prose, JSON-LD, per-post meta tags, canonical

- [ ] **Step 1: Create `src/components/blog/JsonLd.tsx`**

```tsx
interface JsonLdProps {
  title: string
  description: string
  pubDateISO: string
  updatedDateISO?: string
  postUrl: string // canonical URL for this post
}

export default function JsonLd({ title, description, pubDateISO, updatedDateISO, postUrl }: JsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: pubDateISO,
    dateModified: updatedDateISO ?? pubDateISO,
    author: {
      '@type': 'Organization',
      name: 'Anvax',
      url: 'https://www.anvax.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Anvax',
      url: 'https://www.anvax.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.anvax.in/assets/anvax-wordmark-ink.svg',
      },
    },
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 2: Create `src/components/blog/Prose.module.css`**

The `:global()` selectors style HTML elements rendered by compileMDX (which has no className props).

```css
/* Prose — styles MDX-rendered HTML. All selectors use :global() so they
   target the raw HTML elements emitted by compileMDX. The .prose class
   provides the scope; elements outside .prose are unaffected. */

.prose {
  font-size: 17px;
  line-height: 28px;
  color: var(--fg-2);
  max-width: 66ch;
}

/* Headings — H1 is rendered by the page layout, not inside .prose */
.prose :global(h2) {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 400;
  line-height: 36px;
  color: var(--ink-900);
  margin-top: 48px;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}
.prose :global(h3) {
  font-family: var(--font-serif);
  font-size: 21px;
  font-weight: 400;
  line-height: 30px;
  color: var(--ink-900);
  margin-top: 36px;
  margin-bottom: 12px;
}
.prose :global(h4) {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-900);
  margin-top: 28px;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}

/* Paragraph */
.prose :global(p) {
  margin-bottom: 20px;
}
.prose :global(p):last-child { margin-bottom: 0; }

/* Links */
.prose :global(a) {
  color: var(--amber-700);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color var(--dur-base) var(--ease-out);
}
.prose :global(a:hover) { color: var(--amber-600); }

/* Lists */
.prose :global(ul),
.prose :global(ol) {
  padding-left: 24px;
  margin-bottom: 20px;
}
.prose :global(li) { margin-bottom: 8px; }
.prose :global(li):last-child { margin-bottom: 0; }

/* Blockquote */
.prose :global(blockquote) {
  margin: 28px 0;
  padding: 16px 24px;
  border-left: 3px solid var(--amber-600);
  background: var(--bone-100);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  color: var(--ink-700);
  font-style: italic;
}
.prose :global(blockquote p) { margin-bottom: 0; }

/* Inline code */
.prose :global(code) {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--bone-100);
  border: 1px solid var(--border);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  color: var(--ink-900);
}

/* Code block */
.prose :global(pre) {
  background: var(--ink-900);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  overflow-x: auto;
  margin: 28px 0;
}
.prose :global(pre code) {
  background: transparent;
  border: none;
  padding: 0;
  font-size: 13.5px;
  color: var(--bone-100);
  line-height: 22px;
}

/* Horizontal rule */
.prose :global(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 40px 0;
}

/* Strong + em */
.prose :global(strong) { color: var(--ink-900); font-weight: 600; }
.prose :global(em) { font-style: italic; }

/* Table */
.prose :global(table) {
  width: 100%;
  margin: 28px 0;
  font-size: 14px;
}
.prose :global(th) {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-3);
  text-align: left;
  padding: 0 0 10px;
  border-bottom: 1px solid var(--border);
}
.prose :global(td) {
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  color: var(--fg-2);
  vertical-align: top;
}
.prose :global(tr:last-child td) { border-bottom: none; }
```

- [ ] **Step 3: Create `src/pages/BlogPost.module.css`**

```css
/* Blog post page */
.header {
  padding: 60px 0 64px;
  border-bottom: 1px solid var(--border);
  background: var(--ink-900);
  position: relative;
  overflow: hidden;
}
.header::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url('/assets/lattice.svg');
  background-size: 220px 220px;
  opacity: 0.06;
  pointer-events: none;
}
.headerInner {
  position: relative;
  max-width: 760px;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--amber-500);
  margin-bottom: 20px;
}
.h1 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 44px;
  line-height: 54px;
  letter-spacing: -0.016em;
  color: var(--bone-100);
  margin-bottom: 24px;
  text-wrap: balance;
}
.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fg-on-dark-dim);
}
.sep { opacity: 0.4; }
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 20px;
}
.tag {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(244,240,229,0.18);
  background: rgba(244,240,229,0.06);
  color: var(--fg-on-dark-dim);
  white-space: nowrap;
}

/* Body layout */
.body {
  padding: 64px 0 96px;
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

/* Back link */
.backLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fg-3);
  text-decoration: none;
  margin-bottom: 40px;
  transition: color var(--dur-base) var(--ease-out);
}
.backLink:hover { color: var(--ink-900); }

@media (max-width: 960px) {
  .h1 { font-size: 32px; line-height: 42px; }
}
```

- [ ] **Step 4: Create `src/app/blog/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import JsonLd from '@/components/blog/JsonLd'
import styles from '@/pages/BlogPost.module.css'
import proseStyles from '@/components/blog/Prose.module.css'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const { frontmatter } = post
  const canonicalUrl = frontmatter.canonicalURL ?? `https://www.anvax.in/blog/${slug}`
  const ogImageUrl = `https://www.anvax.in/api/og?title=${encodeURIComponent(frontmatter.title)}`

  return {
    title: `${frontmatter.title} — Sovereign Stack`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://www.anvax.in/blog/${slug}`,
      type: 'article',
      publishedTime: frontmatter.pubDate.toISOString(),
      modifiedTime: frontmatter.updatedDate?.toISOString(),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImageUrl],
    },
    alternates: { canonical: canonicalUrl },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { content } = await compileMDX({ source: post.content })

  const { frontmatter, readingTime } = post
  const canonicalUrl = frontmatter.canonicalURL ?? `https://www.anvax.in/blog/${slug}`

  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <>
      <JsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        pubDateISO={frontmatter.pubDate.toISOString()}
        updatedDateISO={frontmatter.updatedDate?.toISOString()}
        postUrl={canonicalUrl}
      />

      <article>
        <header className={styles.header}>
          <div className="container">
            <div className={styles.headerInner}>
              <p className={styles.eyebrow}>Sovereign Stack</p>
              {/* Single H1 — never also rendered by layout */}
              <h1 className={styles.h1}>{frontmatter.title}</h1>
              <div className={styles.meta}>
                <time dateTime={frontmatter.pubDate.toISOString()}>
                  {formatDate(frontmatter.pubDate)}
                </time>
                <span className={styles.sep}>·</span>
                <span>{readingTime} min read</span>
              </div>
              {frontmatter.tags.length > 0 && (
                <div className={styles.tags}>
                  {frontmatter.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="container">
          <div className={styles.body}>
            <div>
              <Link href="/blog" className={styles.backLink}>← All posts</Link>
              <div className={proseStyles.prose}>{content}</div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
```

- [ ] **Step 5: Verify typecheck + build**

```bash
npm run typecheck
npm run build
```

Expected: typecheck clean; build succeeds; `/blog/test-post` appears in build output as a static page.

- [ ] **Step 6: Commit**

```bash
git add src/components/blog/JsonLd.tsx src/components/blog/Prose.module.css \
        src/pages/BlogPost.module.css src/app/blog/[slug]/
git commit -m "feat(blog): add post page with JSON-LD, prose styles, SSG"
```

---

## Task 7: OG image edge route — `next/og`

**Files:**
- Create: `src/app/api/og/route.ts`

**Interfaces:**
- Produces: `GET /api/og?title=...` returns a 1200×630 PNG branded OG card.
- Consumed by: `generateMetadata` in Task 6 for all post og:image URLs.

- [ ] **Step 1: Create `src/app/api/og/route.ts`**

```ts
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const title = new URL(request.url).searchParams.get('title') ?? 'Sovereign Stack'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px 72px',
          background: '#0B1A2A',       // --ink-900
          position: 'relative',
        }}
      >
        {/* Amber accent bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '4px',
            background: '#B8843E',     // --amber-600
          }}
        />

        {/* Publication label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#C99858',   // --amber-500
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#C99858',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Sovereign Stack · Anvax
          </span>
        </div>

        {/* Post title */}
        <div
          style={{
            fontFamily: 'serif',
            fontSize: title.length > 70 ? '38px' : '50px',
            fontWeight: '400',
            color: '#F4F0E5',          // --bone-100
            lineHeight: '1.25',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
```

- [ ] **Step 2: Verify the route builds**

```bash
npm run build
```

Expected: build succeeds. Route `/api/og` appears in build output.

- [ ] **Step 3: Smoke-test in dev**

```bash
npm run dev
# Open: http://localhost:3000/api/og?title=FREE-AI+reads+like+a+green+light
```

Expected: a dark navy 1200×630 PNG with the title in bone text.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/og/
git commit -m "feat(blog): add next/og branded OG image edge route"
```

---

## Task 8: RSS feed — `/blog/rss.xml`

**Files:**
- Create: `src/app/blog/rss.xml/route.ts`

**Interfaces:**
- Consumes: `getAllPosts()`
- Produces: valid RSS 2.0 XML at `/blog/rss.xml` including all published posts.

- [ ] **Step 1: Create `src/app/blog/rss.xml/route.ts`**

```ts
import { Feed } from 'feed'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPosts()

  const feed = new Feed({
    title: 'Sovereign Stack by Anvax',
    description:
      "Weekly analysis of AI governance, RBI regulations, and compliance strategy for India's regulated financial sector.",
    id: 'https://www.anvax.in/blog',
    link: 'https://www.anvax.in/blog',
    language: 'en',
    favicon: 'https://www.anvax.in/favicon.svg',
    copyright: `© ${new Date().getFullYear()} Anvax Technologies Pvt. Ltd.`,
    feedLinks: { rss2: 'https://www.anvax.in/blog/rss.xml' },
    author: { name: 'Anvax', link: 'https://www.anvax.in' },
  })

  for (const post of posts) {
    const url = `https://www.anvax.in/blog/${post.slug}`
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      date: post.frontmatter.pubDate,
      published: post.frontmatter.pubDate,
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
```

- [ ] **Step 2: Verify**

```bash
npm run build
npm run dev
# Open: http://localhost:3000/blog/rss.xml
```

Expected: valid XML starting with `<?xml version="1.0"` and containing `<item>` for the test post.

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/rss.xml/
git commit -m "feat(blog): add RSS 2.0 feed at /blog/rss.xml"
```

---

## Task 9: Dynamic sitemap — replace `public/sitemap.xml`

**Files:**
- Create: `src/app/sitemap.ts`
- Delete: `public/sitemap.xml`

**Interfaces:**
- Produces: `/sitemap.xml` auto-generated by Next.js, including all static pages + all published blog posts + `/blog` index.

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://www.anvax.in',            lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 1.0 },
    { url: 'https://www.anvax.in/platform',   lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.9 },
    { url: 'https://www.anvax.in/industries', lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/trust',      lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/deployment', lastModified: new Date('2026-06-03'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://www.anvax.in/pricing',    lastModified: new Date('2026-06-03'), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.anvax.in/company',    lastModified: new Date('2026-06-03'), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.anvax.in/contact',    lastModified: new Date('2026-06-03'), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.anvax.in/blog',       lastModified: new Date(),             changeFrequency: 'weekly',  priority: 0.8 },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map(post => ({
    url: `https://www.anvax.in/blog/${post.slug}`,
    lastModified: post.frontmatter.updatedDate ?? post.frontmatter.pubDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}
```

- [ ] **Step 2: Delete static sitemap (would shadow the dynamic one)**

```bash
git rm public/sitemap.xml
```

- [ ] **Step 3: Verify**

```bash
npm run build
npm run dev
# Open: http://localhost:3000/sitemap.xml
```

Expected: XML includes `https://www.anvax.in/blog/test-post` in addition to all existing pages.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(blog): replace static sitemap with dynamic app/sitemap.ts"
```

---

## Task 10: Acceptance check + remove test post

This task verifies every SEO requirement from the spec, then removes the test post.

**Files:**
- Delete: `content/blog/test-post.mdx`

- [ ] **Step 1: Start dev server and open test post**

```bash
npm run dev
# Open: http://localhost:3000/blog/test-post
```

Verify:
- Page renders without errors.
- H1 shows the post title (only one H1 on the page — the layout `<Nav>` and `<Footer>` don't add H1s).
- Date, reading time, and tags are visible in the header.
- Body prose is readable with constrained width.
- "← All posts" back link works.

- [ ] **Step 2: Inspect meta tags in DevTools**

Open DevTools → Elements → `<head>`. Confirm:

```html
<title>FREE-AI reads like a green light. For you it's a checklist. — Sovereign Stack</title>
<meta name="description" content="What RBI's FREE-AI framework actually asks compliance officers to prove.">
<meta property="og:title" content="FREE-AI reads like a green light. For you it's a checklist.">
<meta property="og:type" content="article">
<meta property="og:image" content="https://www.anvax.in/api/og?title=FREE-AI+reads+like+a+green+light.+For+you+it's+a+checklist.">
<link rel="canonical" href="https://www.anvax.in/blog/test-post">
```

- [ ] **Step 3: Validate JSON-LD**

In DevTools → Elements, find `<script type="application/ld+json">`. Copy the JSON. Paste into [validator.schema.org](https://validator.schema.org/) or check manually. Confirm:
- `@type: "BlogPosting"`
- `headline` matches post title
- `datePublished` = `"2026-06-30T00:00:00.000Z"`
- `author.name` = `"Anvax"`
- `publisher.name` = `"Anvax"`
- `url` = `"https://www.anvax.in/blog/test-post"`

- [ ] **Step 4: Check /blog index**

```
http://localhost:3000/blog
```

Confirm: test post card is visible with title, date, description, reading time, tags.

- [ ] **Step 5: Check /blog/rss.xml**

```
http://localhost:3000/blog/rss.xml
```

Confirm: valid XML, `<item>` contains the test post title and link.

- [ ] **Step 6: Check /sitemap.xml**

```
http://localhost:3000/sitemap.xml
```

Confirm: contains `https://www.anvax.in/blog/test-post`.

- [ ] **Step 7: Check /blog is crawlable**

```
http://localhost:3000/robots.txt
```

Confirm: `Allow: /` — /blog is not blocked.

- [ ] **Step 8: Check the OG image route**

```
http://localhost:3000/api/og?title=FREE-AI+reads+like+a+green+light
```

Confirm: returns a dark navy PNG with the title text and amber "Sovereign Stack · Anvax" label.

- [ ] **Step 9: Run build to confirm SSG**

```bash
npm run build
```

Confirm in output:
- `○ /blog` (static)
- `● /blog/[slug]` (static, 1 path)
- `GET /blog/rss.xml` in routes

- [ ] **Step 10: Remove test post**

```bash
git rm content/blog/test-post.mdx
```

- [ ] **Step 11: Final build check without test post**

```bash
npm run build
```

Expected: build succeeds. Blog index shows "No posts yet" since there are no published posts.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat(blog): sovereign stack blog — complete SEO-optimised implementation"
```

---

## Self-review checklist

| Spec requirement | Covered by |
|---|---|
| `/blog` index, reverse-chron | Task 5 |
| `/blog/[slug]` individual post | Task 6 |
| `/blog/rss.xml` RSS feed | Task 8 |
| Frontmatter schema (title, description, pubDate, updatedDate, tags, canonicalURL, draft) | Task 2 |
| Per-post meta title + description | Task 6 `generateMetadata` |
| JSON-LD BlogPosting (headline, datePublished, dateModified, author, publisher) | Task 6 `JsonLd.tsx` |
| One H1 per post | Task 6 — only in `<h1 className={styles.h1}>`, nav/footer have none |
| Canonical link tag (own URL default, frontmatter override) | Task 6 `generateMetadata` |
| Sitemap including blog posts | Task 9 |
| robots.txt /blog crawlable | Task 10 verification (already `Allow: /`) |
| OG image with branded fallback | Task 7 `/api/og` edge route |
| Internal links via markdown | Standard `[text](/blog/slug)` in MDX — compileMDX emits `<a>` |
| SSG (not SSR) | `dynamicParams = false` + `generateStaticParams` in Tasks 5 + 6 |
| Design system typography/colours | All CSS uses design token vars; no new colours or fonts |
| Nav + Footer inherit existing layout | Root layout in `src/app/layout.tsx` unchanged; blog pages live inside it |
| Numbered pagination | Tasks 4 + 5 |
| Tags display-only | Tags rendered as `<span>` badges, not links |
| Draft posts excluded in prod | `getAllPosts()` filter in Task 2 |
