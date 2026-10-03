---
title: "Permission-Aware Retrieval: Query-Time ACLs, Not Index-Time"
description: "Permission-aware retrieval has to check access at the moment of the question, not rely on access lists copied into the index at ingestion."
pubDate: 2026-10-01
tags: ["AI Governance", "AI Audit", "AI Security", "Enterprise AI", "Compliance"]
draft: false
---

![Side-by-side diagram comparing index-time ACLs, which go stale, with query-time ACLs, which check access at the moment of the question](/assets/blog/permission-aware-retrieval-query-time-acls.webp)

# Permission-Aware Retrieval: Query-Time ACLs, Not Index-Time

A retrieval system answers questions by searching an index built from an organization's documents. Those documents come with access rules, and the answer a user receives must respect them. Most systems copy each document's access list into the index when the document is ingested and filter against that copy. The copy ages from the moment it is written. **Permission-aware retrieval is not a property of the index. It is a check that has to be current at the moment a question is asked.**

## What Permission-Aware Actually Means

The naive version filters search results by a list of allowed groups stored on each chunk. It looks correct in a demo, because the demo runs right after ingestion, when the stored lists match the source systems.

The failure appears when permissions change. A document is unshared, an employee changes teams, a contractor's access is removed. The source system reflects the change immediately. The index reflects it on the next sync, and until then the retrieval system enforces access rules that no longer exist.

## Index-Time ACLs: Where the Staleness Comes From

At ingestion, the connector reads a document, splits it into chunks, and stores each chunk with metadata that includes the document's access control list. At query time, the search filters to chunks whose stored list intersects the user's groups.

Two things can go stale. The first is the document's access list, which is only as fresh as the last permission sync. Connectors often sync content and permissions on the same schedule, and full re-syncs of large repositories run infrequently because they are expensive. The second is the user's group membership. If the retrieval system reads group memberships from its own cached copy instead of the identity provider, a user removed from a group keeps that group's access until the cache refreshes.

The result is an exposure window: the time between a permission change in the source system and the moment retrieval stops returning the affected content.

> **Every permission change opens an exposure window. The architecture decides how long it stays open.**

## Query-Time ACLs: Checking at the Moment of the Question

A query-time design moves the decisive checks to when the question is asked. The user's group memberships are resolved from the identity provider at query time, including nested groups. The document access lists stored in the index are updated from permission change events as they happen, instead of waiting for the next content sync. For the final set of chunks that will reach the model, the system can check access against the source system directly.

The stored metadata still matters. It narrows the search to chunks the user can probably see. The query-time check confirms it for the chunks that are actually used.

## Pre-Filter and Post-Filter: Where the Check Runs

There are two places to apply the permission filter during search, and they fail differently.

A **pre-filter** applies the permission condition inside the vector search, so only permitted chunks are ranked. Results stay complete, but the filter can only use what is stored in the index, so it inherits the index's freshness.

A **post-filter** retrieves the top results first and removes the ones the user cannot see. It can apply a fresh check, but it loses recall. If a search returns 20 chunks and 15 are removed, the model answers from 5, and a user with narrow access may get an answer built from weaker matches, or no answer at all, without any sign that relevant content was filtered out.

The workable combination is a pre-filter on stored metadata to keep recall, followed by a query-time check on the final candidates to close the freshness gap.

| Check | What it protects against |
| --- | --- |
| **Groups resolved at query time** | A user removed from a group keeping that group's access through a cached membership. |
| **Event-driven ACL updates** | A document unshared in the source system staying retrievable until the next full sync. |
| **Pre-filter in vector search** | Recall loss when many top results belong to documents the user cannot see. |
| **Source check on final chunks** | Any remaining staleness in stored metadata for the content that actually reaches the model. |
| **Permission-scoped answer cache** | A cached answer built for one user being served to another with narrower access. |

## The Cost of Checking at Query Time

First, latency. A source-system permission check for each final chunk adds calls to every request. With tens of candidate chunks and a permissions API that responds in tens of milliseconds, the checks have to be batched or parallelized to stay inside a response-time budget.

Second, caching brings staleness back. Caching permission lookups reduces load, but the cache lifetime becomes the new maximum exposure window. The value has to be chosen deliberately, and it is a security decision, not a performance setting.

Third, derived content. Permission checks on chunks do not cover content built from them. A semantic cache keyed only by the question text can serve an answer generated for one user to another user who could not read the underlying documents. Summaries and generated reports stored for reuse have the same problem. Each derived artifact needs the access conditions of its sources attached to it.

## How To Check

Run two tests on the current system. First, pick a document that alone answers a specific question, remove a test user's access to it in the source system, and ask that question as the test user every minute. The time until the content stops appearing is the exposure window. Second, ask the same question as two users with different access, one after the other, and confirm the second user does not receive an answer built from documents only the first user can read.

---

Anvax resolves group membership and checks document access at query time, scopes cached answers to the permissions of their sources, and records the entitlement result for every chunk in the audit record, so the exposure window is something that can be measured and shown.

---

*If your retrieval system was set up with permissions synced alongside content, the revocation test is a quick way to find out how long its exposure window actually is.*
