---
title: "The Model Is Rented. Here Is What You Actually Own."
description: "An enterprise AI system has a rented model layer and an owned layer around it: context, permissions, audit records, and workflows."
pubDate: 2026-09-24
tags: ["Sovereign AI", "Enterprise AI", "AI Governance", "Model Risk", "AI Audit"]
draft: false
---

![Split diagram showing a rented model card on the left and four owned layers, context and index, permissions, audit record, and workflows, stacked on the right](/assets/blog/the-model-is-rented.webp)

# The Model Is Rented. Here Is What You Actually Own.

An enterprise AI system has two layers. The model layer, meaning the weights and the inference capacity that runs them, is usually rented, and it changes every few months as providers release new versions. The layer around the model holds the organization's documents, its access rules, its record of what happened, and the workflows that turn outputs into decisions. That layer changes slowly and carries most of the institutional value. **The model is not the asset. The layer that makes any model useful inside the organization is.**

## What Ownership Actually Means

Ownership here is not about licensing. It is about whether the organization can take a layer, move it to a different model or a different environment, and keep it working. A layer that can only run inside one vendor's platform is rented, whatever the contract calls it.

Renting the model is a reasonable decision. Frontier models improve faster than most organizations could track on their own, and inference capacity is expensive to hold idle. The problem appears when the rented model quietly pulls the surrounding layer into the same rental agreement. Four parts of that layer are where it happens.

## Context: The Corpus and the Index

The corpus is the organization's documents. The index is how those documents become retrievable: chunking rules, metadata, and the vectors produced by an embedding model.

The lock-in sits in the vectors. An index is tied to the embedding model that created it, and vectors from one model cannot be searched with another. If the embedding model is the vendor's, the organization owns its documents but rents the only working form of them. Changing embedding models means re-processing the entire corpus, and retrieval quality has to be checked again afterwards because chunk rankings will shift.

> **Owning the documents is not the same as owning the index. Only one of them answers questions.**

## Permissions: Who May See What

Retrieval has to respect the same access rules as the source systems. That requires a mapping from each document and chunk to the groups entitled to read it, kept current as permissions change in the source systems.

This mapping is slow to build and easy to lose. It encodes the organization's access model, including the exceptions nobody documented. When it lives inside a vendor platform in a proprietary form, moving to another platform means rebuilding it from the source systems and re-verifying that no chunk became visible to someone who should not see it.

## Audit: The Record of What Happened

The audit record captures, per request, the query, the retrieved context, the model version, the output, the reviewer, and the timestamps. It is the organization's evidence for regulators, customers, and internal review.

It is also the layer with the longest retention requirement. A vendor change does not end the obligation to answer questions about decisions made on the old system. If audit records exist only in the vendor's console, the organization's evidence depends on continued access to a service it may no longer use.

## Workflows: Prompts, Tools, Evaluations, and Review Gates

Workflows are the prompt templates, the tool definitions a model can call, the review gates before an output is released, and the evaluation sets that show whether the system still behaves correctly.

Prompts and tool schemas are partly model-specific, so some adaptation is always needed after a model change. The evaluation set is what makes that adaptation safe. With a stable set of test questions and expected behaviors, a new model can be measured before it goes live. Without one, a model change is a guess followed by a period of user reports.

| Layer | What locks it in |
| --- | --- |
| **Context** | Vectors produced by a vendor-owned embedding model, which no other system can search. |
| **Permissions** | Entitlement mappings stored in a proprietary format that cannot be exported and re-verified. |
| **Audit** | Records held only in the vendor console, with retention tied to the subscription. |
| **Workflows** | Prompts and evaluation sets that exist only inside the platform's configuration screens. |

## The Cost of Renting the Whole Stack

First, switching cost rises with every month of use. Each document indexed, permission mapped, and prompt tuned inside the platform adds to what a move would have to rebuild.

Second, model choice narrows. When a better or cheaper model appears, adopting it depends on whether the platform supports it, not on whether the organization's evaluations show it performs better.

Third, evidence becomes conditional. An audit record that lives in a rented service is available only while the rental continues, which is the opposite of what a retention requirement assumes.

## How To Check

Ask the current platform to export four things in documented formats: the index with the name and version of its embedding model, the permission mappings, the audit records for one quarter, and the prompt templates with their evaluation sets. Then run the evaluation set against a second model. If the export is incomplete, or the evaluation set does not exist, the organization is renting more than the model.

---

We designed Anvax around this split: the model is swappable, and the context, permissions, audit record, and workflows stay in the organization's own environment in formats it can export and re-run.

---

*If a model change is on your roadmap this year, running the four-part export test first will show how much of the stack is actually yours to move.*
