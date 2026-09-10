---
title: "Why Regulators Stopped Asking About Accuracy and Started Asking About Audit Trails"
description: "Regulators set no accuracy threshold but a hard floor on log retention. What an audit trail has to contain, and why a chat log does not qualify."
pubDate: 2026-09-10
tags: ["AI Governance", "AI Audit", "EU AI Act", "Enterprise AI", "Compliance", "Model Risk"]
draft: false
---

![Why regulators stopped asking about accuracy and started asking about audit trails - the query, retrieved chunks, access checks, model version and completion an audit record has to carry](/assets/blog/audit-trails-not-accuracy.webp)

For three years the deciding question in an enterprise AI review was some version of *"How accurate is it?"* Vendors answered with a benchmark table, buyers copied the number into a slide, and the review moved on. That question has quietly stopped being the one that clears procurement, and the reason sits in the structure of the rules rather than in anyone's opinion about them. The EU AI Act sets no accuracy threshold anywhere. It does set a hard floor on how long you have to keep the logs.

**Accuracy is a property you declare. Auditability is a capability you have to produce on demand.**

## What The Rules Actually Require

On accuracy, the obligation is to achieve an appropriate level and then declare the level and the metric you used in the instructions for use. Appropriate is not defined and no number appears. You choose the benchmark, you choose the metric, you disclose both. That is the whole of it.

The record-keeping side is built the other way around. High-risk systems have to technically permit automatic recording of events across the lifetime of the system, and those events are tied to three named downstream uses: identifying when a system presents a risk, feeding post-market monitoring, and supporting the deployer's own monitoring of operation. The provider then has to retain those automatically generated logs for at least six months. The deployer carries the same six-month floor independently. Two different parties, same minimum, same records.

> **The rules never say how good the model has to be. They say how long you have to remain able to explain what it did.**

The timelines moved and the shape did not. High-risk obligations for standalone systems shifted to December 2027, and to August 2028 for AI embedded in regulated products. The transparency obligations took effect in August 2026 and are live now. What the deferral bought was time to do the conformity work. It did not change what the work is.

## Why Accuracy Stopped Being A Useful Question

An accuracy figure is a measurement of one fixed model against one frozen evaluation set. An enterprise deployment is neither of those things, and it fails to be both of them in two independent ways.

The model is not fixed. Hosted endpoints are usually addressed by a moving alias, and the weights behind that alias change on the provider's schedule, not yours. A tokenizer revision alone is enough to shift chunk boundaries and change what fits in a context window. So a figure measured in March describes a system that stopped existing in June, and a conversation log that records the alias rather than the resolved version cannot tell you which of the two answered.

The input is not fixed either. In any retrieval system, the real input to the model is the corpus as it stood at query time, and the corpus changes every night when the connectors sync. Run the identical prompt against the identical model six weeks later and you get a different answer because someone edited a Confluence page. The benchmark measured the model. Production behavior is model plus corpus plus entitlement filter plus prompt template, and only one of those four was on the benchmark.

The number was never wrong. It was just never about the deployed system.

## An Audit Trail Is Not A Chat History

It is not a chat history. It is not an access log showing who signed in. It is not a conversation export with timestamps attached. An audit trail is a record sufficient to reconstruct one specific decision end to end, months after the people involved have forgotten it happened.

The gap is almost entirely in the retrieval step. A chat log stores the prompt and the completion. It does not store which chunks the retriever returned, which of those survived the entitlement filter, which document version each chunk was cut from before that document was edited, or which chunks the model ignored. The prompt and the answer sit on either side of the part that carries the exposure.

Here is what that looks like in practice. A nightly ingest job runs under a service account provisioned during the pilot, when there were four users and read scope was set to the whole tenant because scoping it properly was a two-week ticket nobody wanted. Eleven months later, a chunk from a deal team folder surfaces inside an answer shown to a contractor. Security asks the obvious question. The chat log holds the question and it holds the answer. It does not hold the chunk, the folder it came from, or the account that indexed it. The reconstruction gets done by hand, across three systems that never agreed on a timestamp format, and it takes a week to reach a conclusion that is still qualified.

> **"If someone asks us to reconstruct one specific answer from nine months ago, what do we actually produce?"**

A record that can answer that carries six things per turn: the query, the retrieved set with document identifiers and versions, the entitlement decision taken on each chunk, a hash of the prompt template in force, the model identifier resolved to a concrete version, and the completion. Anything less and the reconstruction is an argument rather than a record.

## The Six-Month Floor Is A Storage Decision

1. **Cardinality** - Conversation-level logging is one row per turn. Reconstructable logging is one row per retrieved chunk per turn. At ten chunks a query that is an order of magnitude more rows, which is not a code change so much as a different storage tier, a different index strategy, and a different line in next year's budget.
2. **Immutability** - A log that satisfies an auditor has to be write-once, which means it cannot live in the same mutable application database that an on-call engineer can reach at two in the morning. Object storage with a retention lock costs more than a Postgres column, and it introduces a conflict the rules themselves acknowledge, because the retention floor gives way where data protection law says otherwise. Somebody has to own that decision before the request arrives. Deciding it under a thirty-day clock is how organizations end up doing neither properly.
3. **Sampling** - Most teams that capture chunk-level provenance sample it, because of the first two points. Sampling works for quality monitoring, where you want a representative picture. It is useless for audit, because an audit request is never about a representative answer. It is about one answer, named, and the named answer is almost never in the sample.

Sampled provenance is a monitoring feature wearing an audit trail's job title.

## How To Check

Five questions. Each one is answerable yes or no by someone at your company this week, on your own stack or on a vendor's.

1. **Single-answer reconstruction** - For one named answer from six months ago, can we produce the retrieved chunks, their document versions, and the model version that generated it?
2. **Entitlement decisions** - Do we log the access decision made on each chunk, or only the answer that survived those decisions?
3. **Version pinning** - Does the log record a resolved model version, or an alias that will point at different weights next quarter?
4. **Log immutability** - Could an administrator with production access alter or delete an audit record without leaving evidence that they did?
5. **Retention conflict** - When an erasure request lands on a conversation inside the retention window, do we know which obligation wins and who signs off?

---

The uncomfortable part of this shift is that it moves the burden from the model vendor to the deployer. An accuracy claim is something a vendor hands you. A reconstruction is something you have to perform, in your environment, about your data, under a deadline set by someone else. Anvax is built around that asymmetry: the retrieval, entitlement, and generation path is instrumented so that a single answer can be reconstructed from its stored record rather than reassembled from three systems and an engineer's memory.

*If you are working out whether your current setup could produce that reconstruction before the deadline rather than after the first request for one, that is a useful conversation to have while the timeline still has slack in it.*
