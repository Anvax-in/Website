# SEO Sprint 1 — Design

**Owner:** Yogesh. **Source:** Sprint 1 SEO doc (pasted in chat 2026-10-24), amended per
the one change below. This document is the spec the implementation plan argues from.

## Intent

Close the gap between what the site publishes and what Google (and LLM answer engines)
can attribute to the Anvax brand. The blog currently reads as a separate "Sovereign
Stack" property with no structured data, no visible authorship, no internal link
graph, and a single-page `/industries` that can't rank any one sector.

## Amendment to the original doc

Every reference to a named-person author ("Yogesh Shirsath", personal LinkedIn,
individual bio) is replaced with the org voice: **"Team Anvax"**. No personal bio
paragraph, no personal LinkedIn link. This already matches how `JsonLd.tsx` and
`rss.xml/route.ts` attribute content today (`Organization` named "Anvax", not a
person) — the byline/bio work extends that existing convention to the UI instead of
introducing a new, inconsistent one.

## Current state (verified against the repo 2026-10-24)

- Post title: `` `${frontmatter.title} - Sovereign Stack` `` in
  `src/app/blog/[slug]/page.tsx`. OG image label also reads `'Sovereign Stack · Anvax'`.
- Blog index title: `'Sovereign Stack | AI Governance for Regulated Enterprises'`
  (`src/app/blog/page.tsx`), no "Anvax" anywhere in it.
- `openGraph.siteName: 'Anvax'` is **already set globally** in `src/app/layout.tsx` —
  no change needed there.
- No `twitter.site` handle is set anywhere in the codebase.
- `JsonLd.tsx` already emits `BlogPosting` with `author`/`publisher` as the
  `Organization` "Anvax" — already compliant with the author-is-org decision, just
  missing an `image` field.
- `OrganizationJsonLd.tsx` renders sitewide already, but has no `sameAs`.
- No `ByLine`, `AuthorBio`, or `RelatedPosts` component exists.
- All 25 posts in `content/blog/*.md` already have non-empty `description`
  frontmatter, but `PostFrontmatter.description` has **no runtime validation** — a
  future post with a missing description would silently ship `undefined`, not fail
  the build.
- Homepage meta description is 169 characters (over the ~155 target).
- `permission-aware-retrieval-query-time-acls.md` body opens with a `# ` heading
  identical to its title, rendered as a second `<h1>` beneath the page's real `<h1>`.
  Other posts need the same check before assuming they're clean.
- Logo `alt=""` in both `Nav.tsx` and `Footer.tsx`. Connector tile logos in
  `ConnectorsSection.tsx` already use `alt={name}` (e.g. "SharePoint") — not empty as
  the original doc assumed, but still short of the brand-qualified form requested.
- `/industries` is one client component (`IndustriesClient.tsx`) with React-state
  tabs, not real anchors — `/industries#healthcare` does not work today.
- `claude/Landing_Insurance_Brokers_MGAs.md` does not exist in the repo. All six
  industry pages ship as placeholder shells in this PR; the drafted insurance copy
  doesn't exist to pull in.
- `src/app/sitemap.ts` lists static routes by hand; needs the six new industry URLs
  added. Paginated blog pages (`/blog/page/[page]`) are already absent from the
  sitemap — out of scope, not introduced by this work.

## Decisions

1. **Titles.** Post title template becomes `` `${frontmatter.title} - Anvax` ``. OG
   image label becomes `'Anvax'` (it's rendered text on the shareable image itself,
   so it carries the same brand-consistency problem as the `<title>` tag). Blog index
   title becomes `'AI Governance & Compliance Insights | Anvax'` — new copy, since the
   old title's "Sovereign Stack" prefix has to go per the brand rule and there's no
   existing alternative to fall back to. **Flagged for Yogesh to edit if he wants
   different wording** — this is the one piece of net-new marketing copy in this
   section.
2. **`twitter:site`.** Needs the actual Anvax X/Twitter handle. **Blocked on Yogesh**
   — not guessed.
3. **Organization `sameAs`.** Needs real URLs: LinkedIn company page, Substack,
   Medium, GitHub (if public). **Blocked on Yogesh** — not guessed. Ships as a
   follow-up task once supplied; the rest of Sprint 1 doesn't depend on it.
4. **Article JSON-LD `image`.** Reuse the same per-post `ogImageUrl` already computed
   in `page.tsx` (the dynamic `/api/og` route) rather than requiring a new per-post
   `ogImage` frontmatter field — one less thing for future posts to remember to set.
5. **ByLine.** "Team Anvax" + role string "Enterprise AI Research" + publish date +
   read time, rendered under the post `<h1>`. Copy is a judgment call, flagged.
6. **AuthorBio.** End-of-post block, org-voiced, no personal link:
   > **Team Anvax** writes about enterprise AI governance, audit, and self-hosted
   > deployment for regulated industries. — [About Anvax](https://www.anvax.in/company)
7. **`/company#team`.** No team section exists today. Add a short org-voiced block
   (3–4 lines) with `id="team"`, linked from the byline. Not a leadership bio list
   (no named people to list) — a short "who's behind this" paragraph.
8. **RelatedPosts.** 3 posts sharing at least one tag with the current post,
   excluding it, newest `pubDate` first. Pure function over `getAllPosts()` — no new
   data source.
9. **Meta description enforcement.** Hard-fail the build (throw in `src/lib/blog.ts`)
   only when `description` is missing/empty — matches the original doc's explicit
   instruction. Length (140–155 chars) outside that hard fail: `console.warn` at
   build time listing offending slugs, **and** a one-time pass in this PR to bring
   any of the current 25 posts that are outside the range back into it (cheap
   front-matter edits, not a hard build-breaker for content that predates the rule).
10. **Duplicate H1.** Full repo grep of `content/blog/*.md` for a leading `# ` line
    matching the post's title; delete that line in every post where it's found (the
    page template already renders the real `<h1>` — the markdown copy doesn't need a
    second heading with the same text, converting it to `<h2>` would just leave a
    redundant subheading).
11. **Industries pages.** Six new routes, each a ~150-word shell (template: H1 =
    sector name, 2–3 use cases as placeholder bullets, one deployment-note sentence,
    links to `/contact` and to any existing blog posts tagged for that sector — most
    will have none yet, that's fine). The existing `/industries` overview page's
    accordion entries get a "Read more →" link to the matching new URL each, so the
    hub links to the spokes — this wasn't explicitly in the original doc but is
    necessary for the fix's own stated goal ("no single sector can rank" implies the
    hub should point at the spokes). `sitemap.ts` gets the six new URLs added.
12. **Alt text.** Nav + Footer logo `alt=""` → `"Anvax — governed AI workspace"`.
    Connector tile `alt={name}` → `` alt={`${name} integration — Anvax`} ``. Decorative
    image audit: grep `src/` for `<Image`/`<img` usages, confirm each either carries
    meaningful alt text or is marked `alt="" role="presentation"` — fix only what's
    actually found decorative-but-unmarked.
13. **Canonical/robots.** Audit only, per route: canonical vs. `og:url` parity,
    `robots: index, follow`, trailing-slash consistency. Code changes only where the
    audit finds an actual mismatch — the doc itself says "not broken, worth
    confirming."
14. **Search Console steps.** Manual, not code. Delivered as a checklist in the plan
    for Yogesh to run after merge, not a task.

## Non-goals (explicitly out of scope for this PR, per the original doc)

- Backfilling 2–3 contextual body links into the 27 existing posts (separate backlog
  pass, Yogesh drafts the specific link suggestions later).
- Full content for the five non-insurance industry pages (Sprint 2).
- Any redesign of the `/industries` accordion UI itself beyond adding the spoke links.
