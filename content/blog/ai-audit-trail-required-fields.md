---
title: "What an AI Audit Trail Actually Needs to Contain"
description: "A real AI audit trail records six fields — assembled prompt, retrieved context, model version, exact output, reviewer, and multiple timestamps — most systems keep fewer."
pubDate: 2026-09-17
tags: ["AI Audit", "AI Governance", "Compliance", "Enterprise AI", "Model Risk"]
draft: false
---

![Six fields an AI audit trail must capture: the assembled query, retrieved context with provenance, model version, exact output, reviewer, and timestamps](/assets/blog/ai-audit-trail-required-fields.webp)

An AI audit trail is not a chat history. It is not an access log showing who signed in, and it is not an observability trace built to debug latency. It is a record, written at the moment an answer is produced, that lets someone who was not present rebuild why that answer came out the way it did. Most systems store the question and the answer and discard everything in between. The part that gets discarded is the part an auditor asks for.

## What an Audit Trail Actually Means

A chat history is built for the user, so they can pick up a conversation later. An observability trace is built for engineers: timing, errors, token counts, usually retained for days. An audit trail is built for a third party who arrives months later with one question about one output. That changes what must be kept, how it is keyed, and how long it survives.

Six fields cover what that third party needs. Each looks obvious. Each has a way of being recorded that looks complete and is not.

### 1. The Query, as the Model Received It

The user's typed text is not the query. By the time a request reaches the model, it has been wrapped in a system prompt, possibly rewritten by a query-expansion step, and joined with conversation history. A record that stores only the typed text cannot show what the model was actually asked.

Store the fully assembled prompt, or store the user input plus the version identifier of every template and rewrite step so the prompt can be rebuilt exactly. The second option is cheaper, and it only works if templates are versioned and never edited in place.

### 2. The Context Retrieved

This is the field most systems lack. The retriever returns a ranked set of chunks, the permission filter removes some, and the rest are packed into the context window until it is full. Each step drops material, and none of it is usually written down.

For each chunk that reached the model, the record needs the source document identifier, the document version, the chunk position, and the result of the entitlement check at query time. The version matters because documents change. A reference to "lending-policy.pdf, chunk 14" proves nothing if the file was re-uploaded last month and chunk 14 now holds different text. Store a content hash next to the reference, and the record can show whether today's chunk 14 is the one the model saw.

> A pointer to a document is not evidence. A pointer plus a hash of what it said at the time is.

### 3. The Model and Its Version

Record the resolved model version returned by the serving layer, not the alias in the configuration file. Include the decoding parameters and the tool definitions exposed to the model, since a change in available tools shifts behavior as much as a model swap. For self-hosted models, the weights checksum and the serving image tag complete the picture.

### 4. The Output, Exactly

Store the full generated output and a hash of it. If the output passed through post-processing such as redaction, formatting, or citation insertion, store what the model produced and what the user received as two separate values. When they differ, the difference is often what is under review.

### 5. The Reviewer and What They Saw

Where a person approves an output, bind the reviewer's identity to the hash of the exact text they approved, along with the decision and any edits. An approval stored as a flag on the conversation cannot show that the approved text is the text that was sent.

### 6. The Timestamps

One timestamp is not enough. Record when the request arrived, when retrieval ran, when the model responded, and when the output was approved and delivered. Retrieval time matters most, because it is the moment the entitlement check was evaluated. If a user's access was revoked at 10:02 and retrieval ran at 10:04, the record should show whether the revoked document still appeared. Use one time source across services so the ordering can be trusted.

| Field | The version that looks complete but is not |
|---|---|
| Query | The user's typed text, without the assembled prompt. |
| Context retrieved | Document names, with no versions, hashes, or entitlement results. |
| Model and version | The configured alias instead of the resolved version. |
| Output | Only the delivered text, so post-processing changes are invisible. |
| Reviewer | An approval flag on the conversation rather than on an output hash. |
| Timestamps | A single created-at value, with no retrieval time. |

## The Cost of Running This Properly

First, storage. Chunk-level records mean several rows per request instead of one. Storing hashes and references instead of chunk text keeps rows small, but only if the source documents are kept in versioned form for as long as the audit records are.

Second, erasure. A record that preserves what a document said becomes a copy of personal data if the document contained any, which puts the audit store in scope for deletion requests. The workable pattern keeps identifiers and hashes in the audit record and the content in a store where it can be deleted, leaving a verifiable tombstone. Where the line falls is a legal decision for each jurisdiction, but the architecture has to allow both outcomes.

Third, the write path. Writing the record synchronously adds time to every response. Writing it asynchronously risks losing records when a service restarts. The usual answer is a durable queue with the request ID as the idempotency key, which trades latency cost for operational cost.

> An audit record that can be lost in a restart is a best-effort log with a better name.

## How To Check

Choose one answer from at least 90 days ago and ask for the six fields by request ID. Then ask a follow-up: has any source document behind that answer changed since, and can the record prove what the old version said? A system that can answer the first request but not the follow-up has a log, not an audit trail.

Anvax writes this record for every answer at request time, keyed by a single request ID, with chunk-level provenance, entitlement results, and output hashes, so a reconstruction request becomes a query rather than a project.

If an upcoming security review will ask about AI-generated outputs, running the 90-day check on the current system first is a practical place to start.
