---
title: "How One Company's Data Ends Up in Another Company's AI Answer"
description: "Real cross-tenant AI data leaks at Asana, OpenAI, and Cloudflare, why multi-tenant AI products leak this way, and how to check your vendor's isolation."
pubDate: 2026-11-03
tags: ["AI Security", "Enterprise AI", "AI Governance", "Compliance", "GenAI"]
draft: false
---

![Diagram showing how one company's data can end up in another company's AI answer through shared application, cache, and inference layers](/assets/blog/multi-tenant-ai-data-leaks.webp)

On May 1, 2025, Asana launched a new AI connector that let assistants such as ChatGPT and Claude read and summarize a company's projects and tasks. On June 4, Asana found a bug in it. For about a month, a user at one company asking an AI tool about their own work could be shown projects, tasks and comments belonging to a different company. Asana took the connector offline from June 5 to June 17, fixed the code, and notified every customer whose users had used it. Asana stressed it was not a hack. Nobody broke in. The separation between customers simply failed in one piece of code.

That is how cross-customer leaks in AI usually happen. Not through an attacker, but through an ordinary bug in a shared component that every customer passes through.

## What "Multi-Tenant" Really Means

Most AI products are multi-tenant. Many customers (tenants) share the same application servers, the same databases, the same caches and often the same GPUs. What keeps Company A's data away from Company B is not a wall. It is a rule, enforced by code, at every layer the data passes through.

AI products add layers that traditional software did not have: a search index of document chunks, conversation memory, prompt caches, connectors that let models call other systems, and the model's own working memory on the GPU. Each one is a place where the rule has to be enforced correctly, on every request.

> **Tenant isolation is not a feature that is on or off. It is a promise that every layer keeps, every time.**

## Three Layers, Three Real Leaks

**The application layer.** The Asana case. The connector checked which organization a request belonged to, and a logic flaw in that check let data cross between organizations. The data each user could see was limited to what the connector could reach, which was still other companies' projects, tasks and files.

**The cache layer.** On March 20, 2023, some ChatGPT users saw the titles of other users' conversations in their own history. OpenAI traced it to a bug in redis-py, the open-source library it used to talk to its cache: when a request was canceled at the wrong moment, the connection could return the next user's cached data. The same bug exposed payment-related details (name, email, billing address, card expiry and last four digits) for 1.2% of ChatGPT Plus subscribers active during a nine-hour window.

**The model's working memory.** On October 26, 2026, Cloudflare reported that between August 27 and September 9, 155 responses from one model on its Workers AI platform contained data from other customers' requests. GPU memory used for prompts is shared across requests and not wiped between them. A configuration mismatch plus a bug in the open-source inference engine let very long prompts read another customer's leftover data.

Three companies with serious engineering teams, three different layers, the same outcome. In every case the shared component was working as designed until one edge case made it hand data to the wrong customer.

## Where AI Products Usually Get It Wrong

The most common design for document search in a multi-tenant AI product is one shared search index, with a filter on every query that says "only return chunks where the tenant ID is X." It is cheap and fast. It is also one missing line of code away from a leak. If a single code path forgets the filter, or builds it from a value the request supplied instead of from the logged-in session, results from every tenant become eligible.

The same pattern shows up in caches keyed only by the question text, conversation memory stored in a shared table, and new connectors bolted onto an existing product without the same review as the core.

## Do's

1. **Do give each customer its own storage where you can.** A separate index, collection or namespace per tenant, so a missing filter returns nothing instead of everything.
2. **Do set the tenant from the server side.** Derive it from the authenticated session, never from a field in the request.
3. **Do enforce isolation in the database too.** Row-level security means a forgotten filter in application code fails closed.
4. **Do scope every cache by tenant and user.** Prompt caches, retrieval caches and session caches all included.
5. **Do use per-tenant encryption keys.** A stray read then returns data nobody else can decrypt.
6. **Do test for it continuously.** Automated tests that sign in as tenant A and try to reach tenant B's documents, conversations and cached results by ID.
7. **Do use a dedicated deployment for sensitive work.** If no other customer runs in the same deployment, there is no other customer's data to leak into.

## Don'ts

1. **Don't treat a tenant filter as isolation on its own.** It is one control, and it fails open.
2. **Don't share caches or conversation memory across customers** to save cost or speed up responses.
3. **Don't launch AI connectors faster than you review them.** New ways for models to reach data need the same isolation review as the product they connect to.
4. **Don't accept "we've never had an incident" as evidence.** Each of the three leaks above was found after it had been running for days or weeks.

## The Cost of Getting This Wrong

1 - You cannot prove what was seen. After a cross-tenant bug, a vendor can usually say which requests were affected, but rarely what another customer actually read. Your clients will ask anyway.

2 - Notification lands on you. If personal data crossed to another company, the obligation to assess it, and often to notify, sits with the firm that holds the client relationship, not just the vendor.

3 - The bug is shared, so the exposure is shared. In a multi-tenant system, one flaw touches every customer on that component at once.

## How To Check Your Vendor

1. **Storage** - Is our document index separate from other customers', or shared with a tenant filter?
2. **Tenant identity** - Where does the system get our tenant ID on each request: the session, or the request itself?
3. **Database** - Is row-level security or an equivalent enforced below the application?
4. **Caches** - Are prompt, retrieval and session caches scoped per tenant?
5. **Inference** - Do other customers share the GPUs that process our prompts? Is dedicated capacity available?
6. **Testing** - Do you run automated cross-tenant access tests, and how often?
7. **History** - Have you had a cross-tenant incident, and how would we be told?

---

Anvax is deployed inside each customer's own cloud account, so no other company's data runs in the same deployment. Inside a deployment, workspaces are separated with Postgres row-level security and per-tenant encryption keys, and every search is checked against the user's permissions at the moment of the question. The point is that isolation does not depend on one filter being remembered in one place.

*If you are reviewing an AI vendor's isolation model, we are glad to share the questions we would ask of our own.*
