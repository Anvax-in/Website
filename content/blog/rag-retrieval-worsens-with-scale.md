---
title: "Why Your RAG System Gets Worse as You Add Documents"
description: "A fixed retrieval budget against a growing corpus means duplicates, stale versions and boilerplate crowd out the right passage. What actually fixes it."
pubDate: 2026-10-20
tags: ["Enterprise AI", "GenAI", "Model Risk", "AI Governance", "AI Security"]
draft: false
---

![Why Your RAG System Gets Worse as You Add Documents](/assets/blog/rag-retrieval-worsens-with-scale.webp)

A retrieval system launches with two hundred documents and it is excellent. Six months later it holds eighty thousand and people have started saying it has "gotten dumber". Nothing was downgraded. No model changed. The corpus grew, and that was enough.

This is the most common failure pattern in internal AI deployments, and it is not a model problem. It is what happens when a fixed retrieval budget meets an expanding candidate set.

**The system did not get worse at answering. It got worse at choosing what to read.**

## The Budget Nobody Revisits

Almost every pipeline retrieves a fixed number of passages per query. Ten, twenty, fifty. That number was chosen early, usually by whoever tuned the first prototype against a small corpus, and it is rarely revisited.

With two hundred documents, there were maybe four passages in the whole index capable of answering a given question, and all four fit comfortably inside the budget. With eighty thousand, there are two hundred passages that look plausible for the same question, the correct one is competing against the other hundred and ninety-nine, and only the top ten reach the model.

The model's behavior is unchanged. Its input is now worse.

## Three Things That Crowd the Budget

**Near-duplicates.** Enterprise document sets are full of them: the same policy exported to PDF and DOCX, the template that was copied for each region with three lines changed, the deck that was re-sent with a new date. Vector search is a similarity function, so the ten most similar passages to a query can easily be ten copies of the same paragraph. The budget is spent, and only one fact arrives.

**Versions.** Last year's pricing policy and this year's are, as text, almost identical. Nothing in a plain vector index knows which one supersedes the other. If both rank, the model receives two conflicting passages with equal authority and no way to choose, and the answer it writes depends on which one it weights, not on which one is current.

**Boilerplate.** Headers, footers, confidentiality notices, address blocks. These appear in thousands of documents, and queries that contain any of the same generic language will pull them. They are the cheapest kind of context to eliminate and often the last anyone looks at.

> **Retrieval quality is not how good your best passage is. It is how many bad passages sit between it and the model.**

## Dilution Hides From Your Spot Checks

The reason this is noticed late is that the failure is probabilistic and the testing is anecdotal.

Someone asks three questions, gets three good answers, and concludes the system is fine. The questions that fail are the ones where the relevant passage sits at rank twelve with a budget of ten, and nobody asks exactly those questions on demo day.

Worse, the degradation is gradual and correlates with adoption. The system gets more documents because people like it, and it gets worse because it has more documents. Teams routinely read this as model drift and go looking in the wrong place entirely.

## What Actually Fixes It

**Deduplicate before indexing, not after retrieving.** Hash normalized text at the passage level, so identical content indexes once with multiple source references. The references matter: a user still needs to know the paragraph exists in four places, but the model only needs to read it once.

**Make currency a property, not a guess.** Carry effective dates and supersession in metadata, and either filter by them at query time or make them visible so an answer can say which version it used. A system that cannot distinguish current from historical will eventually answer a question about today using a document from two years ago, confidently.

**Separate the recall step from the precision step.** Retrieve a wide candidate set, then rerank it with a model that scores query and passage together, and pass only the top few onward. This is more accurate than a single-stage search because the reranker compares candidates against each other rather than against a fixed vector. The cost is latency and compute on every query, which is the real tradeoff and should be measured rather than assumed.

**Favor diversity in what survives.** Selection methods that penalize redundancy, so the final set covers different content rather than ten angles on the same paragraph, make better use of a fixed budget than pure similarity ranking does.

**Strip boilerplate at ingestion.** Detect repeated blocks across documents and exclude them from indexed passages while keeping them in the stored original.

## What It Costs To Run Properly

First, ingestion gets slower and more opinionated. Deduplication, boilerplate detection and metadata extraction all happen on the write path, and they need to run again whenever documents change. Ingestion stops being a one-time job and becomes a pipeline with its own failure modes.

Second, reranking adds a model call per query. On a wide candidate set this is a real latency line, and the usual answer is a smaller reranker, a narrower candidate set, or caching for repeated queries, each of which trades accuracy somewhere else.

Third, metadata is only as good as its source. Effective dates have to come from somewhere, and in most document sets that means either the source system's fields or an extraction step that will sometimes be wrong. A date extracted incorrectly is worse than no date, because filters will trust it.

## How To See It In Your Own System

Take fifty real questions with known correct source passages. For each, record the rank at which the correct passage appears, not just whether the final answer looked right.

Then run the same fifty against a snapshot of the index from several months ago, if you keep snapshots, or against a subset filtered to older documents.

If the answers look similar but the ranks have drifted down, you are watching dilution in progress, and you have a measurement that will keep working after the next ten thousand documents arrive.

---

Anvax treats ingestion as a first-class part of retrieval: passage-level deduplication, boilerplate removal, and version metadata carried through to the answer, so the system can say which document version it used and why that one.

---

*If a retrieval system has grown an order of magnitude since it was tuned, the retrieval budget is worth revisiting before the model is.*
