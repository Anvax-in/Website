# Anvax GTM Pivot — September 2026

*Decision log plus the file-by-file website audit. Companion to `Anvax_Positioning_Brief_v2_Global.md`, which is now the canonical positioning. The May 2026 `Anvax_Positioning_Brief.docx` is superseded and kept for history.*

## The decision

Anvax tried the India BFSI GTM (NBFC compliance and technology leaders, RBI FREE-AI / DPDP framing, Notion Lead CRM + LinkedIn outreach) through mid-2026 and found it hard to crack. From September 2026, revenue focus shifts to global markets.

What was decided on 3 September 2026:

- **Markets:** US, UK/EU, Middle East (UAE/KSA), Southeast Asia/APAC — all four in scope. Sequencing is not yet decided; the positioning brief recommends Gulf + UK/EU first, US second, SEA third.
- **Vertical:** horizontal enterprise AI. The buyer is defined by constraint ("cannot put data into public AI"), not by industry. BFSI becomes one vertical pack among several.
- **Wedge:** all three angles stay in play — self-hosted / sovereign governed AI, the AI governance and audit layer, and the governed AI workspace (search, chat, workflows, agents). The brief folds them into one sentence with the workspace as the product, governance as the moat, and self-hosting as the deployment story.

## What India becomes

Not deleted, demoted. India is one jurisdiction pack (RBI FREE-AI, DPDP, CERT-In), one set of connectors (GST, MCA21, Account Aggregator, DigiLocker, Tally), and the origin story ("built under one of the hardest data-residency regimes"). Existing India leads in the Notion CRM stay open but are no longer the pipeline.

## Documents in this project — status after the pivot

| **Doc / file** | **Status** | **Action** |
| --- | --- | --- |
| `Anvax_Positioning_Brief.docx` (May 2026) | Superseded | Keep for history; do not use in outreach |
| `Anvax_Positioning_Brief_v2_Global.md` | Canonical | Use for all new copy, decks, outreach |
| `Opnin Big Vision.pdf` + Sovereignty Addendum | Partly valid | Vision holds; deployment section is India-tiered (Yotta, IndiaAI) — rewrite when the deck is next touched |
| `Opnin Industries 1.pdf` | India-specific | Becomes the BFSI vertical pack appendix; needs a global industries doc |
| `Platform Roadmap.pdf` | Review | Check for India-stack connector priorities vs. global connectors (M365, Google Workspace, Jira) |
| `Anvax_Architecture_for_Regulators.pdf` | Reusable | Structure is fine; regulator mapping needs EU AI Act / DORA / NIST AI RMF / PDPL columns alongside RBI |
| `Security Architecture Audit Report.pdf` | Reusable | Global buyers will ask for exactly this; keep |
| RBI FREE-AI report, RBI draft guidance PDFs | Reference only | India jurisdiction pack source material |
| `Opnin_LD_updated.xlsx` | Review | If this is the India lead list, archive; start a global list |
| `Enterprises Problems AI.pdf`, a16z PDF, images | Still valid | Market-agnostic |

## Memory updated

`/profile.md` and `/areas/anvax-gtm.md` now describe Anvax as a governed enterprise AI platform targeting global markets, with the India BFSI phase recorded as history. `/areas/linkedin-outreach.md` (outreach style, CRM, banned phrases) is market-agnostic and unchanged, but the target list behind it needs rebuilding for the new regions.

## Skills that carry India assumptions

These live outside this project but will keep producing India-flavoured output until touched: `bfsi-founder-writer` (voice is fine, topic bank is BFSI/India), `publish-anvax-blog` (Sovereign Stack blog is framed as India-regulator analysis), `quora-answers` and `reddit-short-replies` (subreddit / topic lanes are likely India-BFSI). Worth a separate pass once positioning is locked.

---

# Website audit — `anvax-website` (Next.js)

Roughly 140 India-specific references across 18 source files. Nothing has been edited. Grouped by what the change actually is, then by file.

## Type A — Positioning copy (rewrite against the v2 brief)

These are the pages where the India-first identity lives. They need new copy, not find-and-replace.

**`src/app/page.tsx`** — page metadata (title, OG, Twitter) all read "Sovereign AI for India's regulated enterprises" / "the AI workspace BFSI and NBFCs can run past their regulator." Replace with the v2 one-sentence and hero variant.

**`src/components/sections/HeroSection.tsx`** — eyebrow "Sovereign AI · Built for India's regulators", headline "Governed AI for India's…", compliance badge row `['RBI','SEBI','IRDAI','DPDP-aware','SOC 2','ISO 27001','CERT-In (in progress)']`, and a diagram label "Knowledge core: corpus, India stack". New badge row should lead with SOC 2, ISO 27001, GDPR, then EU AI Act / DORA / NIST AI RMF as "mapped"; RBI moves to the trust page.

**`src/components/sections/PillarsSection.tsx`** — three pillars mention DPDP compliance, Indian data residency, India-stack connectors, "fully managed SaaS on Indian infrastructure", "Your data never leaves India." Rewrite to the v2 pillars: governed workspace / governance layer / three deployment tiers, "your data never leaves your perimeter."

**`src/components/sections/VisionSection.tsx`** — one paragraph, entirely India-framed ("Every AI tool available to Indian compliance teams…"). Rewrite to the "built under the hardest regime, sold everywhere data cannot leave" story.

**`src/components/sections/ComplianceStrip.tsx`** — "stay in India at every tier", "RBI compliance" card with FREE-AI / DPDP / CERT-In. Becomes "data residency of your choice" and a jurisdiction-packs card.

**`src/app/company/page.tsx`** — values ("as though an RBI examiner will ask"), location "Mumbai / Bengaluru", metadata "why we started with India's hardest market", story paragraphs about Indian NBFCs and the India stack. The founding story can stay as origin story; the framing line becomes "started in the hardest market, now selling everywhere data cannot leave." Location can stay factual.

**`src/components/layout/Footer.tsx`** — tagline "The sovereign AI platform for India's regulated enterprises. Built in India, governed for India", "Data residency · India" badge, trust links "RBI FREE-AI" and "DPDP & CERT-In". Tagline → v2 sentence; residency badge → "Data residency · your region"; trust links → "Compliance mappings" and "Data residency".

## Type B — Product pages (re-localise, keep structure)

**`src/app/platform/page.tsx`** (21 refs) — capability descriptions use RBI circulars, NBFC policies, RBI/SEBI/IRDAI feed-watching agents, workflow templates "RBI circular triage, credit memo, audit checklist", a moat card "India stack wired in", RBI FREE-AI mapping in the security card, page metadata "purpose-built for India's regulated enterprises", hero "Built for India's regulatory stack", and an "India stack" logo wall. Changes: examples become generic-regulated ("regulatory feeds, policy manuals, contracts, tickets"); the agents card becomes "watch the regulatory feeds for your jurisdiction"; the India-stack moat card becomes "jurisdiction packs + enterprise connectors"; the logo wall splits into "Enterprise stack" (Slack, Confluence, SharePoint, Drive, Salesforce, Snowflake, Zoho — logos already in `public/assets/logos/`) and a smaller "Regional packs" row where the RBI/SEBI/IRDAI/GST/MCA/NPCI logos live.

**`src/app/deployment/page.tsx`** (9 refs) — tiers say "Hosted in India", "All India-stack connectors", "Customer VPC in India region", "All data stays in India", the DPDP Act 2023 residency strip. Tiers become private cloud (any hyperscaler, any region) / sovereign cloud partners / on-prem; residency strip becomes "in-region by default, in-country on request; GDPR, DPDP, PDPL residency options."

**`src/app/trust/TrustClient.tsx`** + `trust/page.tsx` (17 refs) — a tab and a whole section titled "RBI FREE-AI" with a control mapping, a "DPDP Act 2023 — live" certification row, stat tiles "India — all data stays in country", copy "All inference routed within India". The mapping section is the most reusable asset on the site: turn it into a "Framework mappings" section with tabs (SOC 2, ISO 27001, GDPR, EU AI Act, NIST AI RMF, DORA, RBI FREE-AI, DPDP). Stat tile becomes "In-region — all data, embeddings and inference stay where you choose." Metadata drops "RBI FREE-AI mapping" as the headline.

**`src/app/industries/page.tsx`** + **`IndustriesClient.tsx`** (26 refs) and **`src/components/sections/IndustriesGrid.tsx`** (7 refs) — six verticals, all Indian (NBFC, wealth under SEBI, lending with GST/ITR, insurance under IRDAI, broking under SEBI, payments under RBI PSO), headline "NBFC first. Then the rest of regulated India." Biggest rewrite on the site. New grid: Financial services (banks, asset managers, insurers, fintech), Healthcare & life sciences, Legal & professional services, Public sector & government, Defence & critical infrastructure, Technology & SaaS (security-conscious). Metadata "NBFC-first vertical packs" goes.

**`src/app/pricing/page.tsx`** (18 refs) — prices in ₹ (₹35,000 / ₹1,00,000 per month), "Shared SaaS · AWS Mumbai", "Indian sovereign GPU cloud", "IndiaAI compute overlay", "DPDP self-attestation", "RBI FREE-AI control suite", FAQ "Does my data stay in India on every plan?", currency row "₹ INR · GST extra". Needs USD pricing (not yet set), tier names mapped to the new deployment tiers, GPU substrate row → "your cloud / partner sovereign cloud / your DC", compliance rows → SOC 2 report, GDPR DPA, framework mappings. **Blocked on a pricing decision.**

## Type C — Architecture diagram and blog

**`src/components/sections/ArchDiagram.tsx`** — PII redaction node lists "Aadhaar · PAN · UPI" (→ "PII · PCI · PHI"); an "India stack" node "GST · MCA · AA · Tally" (→ "Enterprise stack: M365 · Slack · Salesforce · Snowflake" with regional packs as a sub-node); residency footer "stay in India" (→ "stay in your perimeter").

**`src/app/blog/page.tsx`**, **`blog/page/[page]/page.tsx`**, **`blog/rss.xml/route.ts`** — blog is branded "Sovereign Stack: AI Governance & Regulation for Indian BFSI", h1 "AI governance for India's regulators", subtitle about RBI FREE-AI / DPDP / SEBI. Rebrand to "Sovereign Stack: AI governance for enterprises that self-host" and widen the subtitle. The 13 existing posts stay published; roughly half are explicitly Indian (`india-public-data-lake-financial-ai`, `rbi-democratising-ai-compute`, others cite RBI) — leave them, tag as "India" if the blog has tags, and make the next several posts global (EU AI Act obligations, DORA and AI vendors, NIST AI RMF for CISOs, self-hosting vs. SaaS AI).

## Type D — Assets and metadata

`public/assets/logos/` has RBI, SEBI, IRDAI, NPCI, GST, MCA, Account Aggregator, DigiLocker, Tally logos. Keep them for the regional-packs row; add hyperscaler and framework marks if the new hero badge row uses logos. Structured data / sitemap / OG images should be checked after copy changes since several `description` strings are duplicated three times per page (metadata, OG, Twitter).

## Suggested order of work

1. Lock the one-sentence and pillars from the v2 brief (done, pending Yogesh's sign-off).
2. Homepage + footer + hero + pillars + compliance strip (Type A) — one PR, changes the first impression.
3. Trust page mapping tabs — reusable across every security review, and the strongest global proof asset.
4. Industries rewrite and platform page re-localisation.
5. Deployment page.
6. Pricing — after USD pricing is decided.
7. Blog rebrand + first global posts.

Each step is a separate PR so the site can deploy incrementally through Vercel.

---

# Maturity pass — elements that make the site read as a shipping company

Added 3 Sept 2026 after benchmarking against gonimbus.ai (overview, product, governance, security, compliance, pricing, partners pages). The gap is not polish; it is missing *surfaces* that a buyer's security and procurement teams expect to find. In priority order.

## 1. Product screenshots and a screen recording (Yogesh, later)

The single biggest difference. Every benchmark product page shows the UI; anvax.in never does. Capture from the running Anvax/Onyx build: search results with citations, a chat answer with source panel, the audit log with a query's trace, the admin console (connectors, RBAC, tenant settings), a workflow run. One 20-second recording of a governed query with the audit entry appearing. Placeholders should be reserved in the layout now (see 5) so the pages don't need a second restructure.

## 2. Security page for the security reviewer

Rework `/trust` into a page written for the person filling in a vendor questionnaire, not the regulator. Structure, top to bottom: one-line architecture claim in the hero ("Tenant isolation, read-only connectors, scoped retrieval, immutable audit trail — deployed inside your perimeter."); controls in plain English (isolation, RBAC/SSO/SCIM, encryption + CMEK, PII redaction, no model training on customer data, egress control on air-gap); a "Three real questions" block answering the CISO, the GC/compliance lead, and the auditor; the honest certification tracker (move it up, add GDPR); the framework-mappings tabs (SOC 2, ISO 27001, GDPR, EU AI Act, DORA, NIST AI RMF, RBI FREE-AI, DPDP); an 8–10 question FAQ; closing CTA "Send this to your security team" with the architecture PDF download and "DPA and subprocessor list on request." Draft copy is in `docs/positioning/Security_Page_Copy.md`.

## 3. Legal and operational pages

Create `/terms`, `/privacy`, `/subprocessors`, a status page (Better Stack / Instatus free tier, linked as `status.anvax.in`), and `/docs` starting with a public deployment guide for the private-cloud tier. Short is fine; absent is what procurement notices.

## 4. One page per capability

Split `/platform` into `/platform/search`, `/platform/chat`, `/platform/workflows`, `/platform/agents`, `/platform/governance`. Each page: hero, three feature blocks, one screenshot slot, "how it's governed" strip, links to the four sibling pages. `/platform` becomes the overview with a capability grid. Governance gets the most weight — it is the moat.

## 5. Name the memory moat

Give "organisational memory" a product name, a diagram, and a section on `/platform/governance` or its own page. It currently reads as a bullet. (Do not reuse the benchmark's name.)

## 6. Sharpen the problem section

`ProblemSection.tsx` should open on the global fear, not features: your data leaves the building, your experts' judgement trains someone else's model, and there is no audit trail when the regulator asks. No regulator named on the homepage.

## 7. FAQs where objections happen

Add 6–8 questions each on `/trust` (draft in Security_Page_Copy.md) and `/deployment` (which tier, who runs the GPUs, upgrade path, air-gap update mechanism, data export). Keep the pricing FAQ.

## 8. Footer as a site map

Columns: Product (five capability pages, deployment, integrations), Company (about, blog, contact, careers), Trust (security, compliance mappings, status, subprocessors, DPA), Legal (terms, privacy). Add `/llms.txt`. Replace "Data residency · India" badge with the certification tracker summary ("SOC 2 in progress · ISO 27001 in progress · GDPR-ready").

## 9. Integrations page

`/integrations` with a filterable grid: Enterprise (M365, Google Workspace, Slack, Confluence, SharePoint, Salesforce, Snowflake, Jira, Zoho), Regional packs (India: GST, MCA21, AA, DigiLocker, Tally; others as they ship), Models (self-hosted open-weight, Azure OpenAI in-tenant, Bedrock in-account). Logos already in `public/assets/logos/`.

## 10. Deployment partners page (when there is one)

`/partners` listing sovereign-cloud and SI partners by region. Supports Pillar 3. Not before the first partner exists.

## Not copying from the benchmark

Per-token credit pricing and self-serve checkout (wrong for a self-hosted product sold through a security review); "for users, not builders" positioning; seven product modules (dilutes the constraint-based story); the 2,000-integrations number game.

## Sequence

Screenshots and recording (blocks nothing else, but upgrades everything) → security page rewrite + legal pages → capability pages + footer → integrations page → FAQs on deployment → memory-moat naming → partners when real.
