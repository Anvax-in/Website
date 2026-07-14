---
title: "Can You Reconstruct One AI Decision From 90 Days Ago?"
description: "RBI's FREE-AI audit framework turns AI governance policy into governance proof. Most institutions can't reconstruct a single AI-assisted decision today."
pubDate: 2026-07-14
tags: ["RBI", "FREE-AI", "AI Audit", "AI Governance", "Model Risk", "BFSI"]
draft: false
---

![Can You Reconstruct One AI Decision From 90 Days Ago? — RBI FREE-AI audit trail infographic](/assets/blog/ai-audit-trail-90-days.webp)

## The Question That Finds Every Institution Eventually

Here's a scenario that compliance leaders in Indian financial institutions should sit with for a minute.

It is a Tuesday in October. An examiner is in your office reviewing a customer complaint from July. A loan application was declined, the customer escalated, and somewhere in that journey an AI system was involved — a document summarizer that fed the credit analyst, a scoring model, a chatbot that handled the first interaction. The examiner asks a simple question: walk me through what the AI did in this case.

Not what your AI policy says. Not what the vendor's brochure promises. What actually happened — in this one case, on that one day, for this one customer.

For most institutions, the honest answer today is silence. The chat happened in a browser tab. The summary was pasted from a public tool. The model version that scored the application has been updated twice since July, and nobody recorded which version ran that day.

This is the gap the RBI's FREE-AI framework was written to close. And of its 26 recommendations, the AI audit framework is the one that turns every other commitment — the board policy, the governance structure, the ethical principles — into something you can either prove or not prove.

An AI audit is not a paperwork exercise. It is the difference between a governance framework and a governance claim.

## First, Let's Be Clear About What an AI Audit Is Not

An AI audit is not your existing IT audit with a new column added. It's not your vendor's SOC 2 report forwarded to the inspection team. It's not a folder of system logs that show the application was running.

Traditional audits work because traditional systems are deterministic. The same input produces the same output, so you can test the logic once and trust it until it changes. AI systems break that assumption. They are, as the FREE-AI report itself puts it, non-deterministic, adaptive, and opaque. Two similar inputs can produce different outputs. The model's behavior drifts as data shifts. The decision logic is not a rule you can read — it is a set of weights you can only observe from the outside.

Which is why the framework defines an AI audit across three distinct layers:

- **Input data audit** — certifying that the data used for training and inference is accurate, unbiased, and collected in conformity with data regulations
- **Model and algorithm audit** — certifying that the architecture, training methods, and decision logic align with the intended purpose and resist manipulation
- **Output and behavior audit** — certifying that the decisions the model actually made were explainable, fair, consistent, and compliant

Notice what all three layers have in common. Every one of them presupposes a record. You cannot audit inference data that was never logged. You cannot audit a decision that left no trace. The audit framework is downstream of a much less glamorous capability: capturing what your AI did, at the moment it did it, in a form that survives.

## The Chain That Makes This Urgent

The framework is deliberately proportionate — internal audits for low-risk uses like document summarization can be light, while high-risk applications like credit decisioning demand detailed audits, and the highest-risk cases call for independent third-party assurance.

That sounds reasonable. It is reasonable. But follow the chain.

Risk-proportionate auditing requires knowing which risk tier each AI use case sits in. And knowing the risk tier requires knowing the use case exists at all. And most institutions today cannot produce a complete list of their AI use cases — because a meaningful share of actual AI usage happens in tools no one sanctioned, on accounts no one provisioned, leaving records no one holds.

So the audit obligation quietly becomes an inventory obligation. And the inventory obligation quietly becomes a visibility obligation. The framework's recommendations are not 26 separate tasks. They are one architecture, and the audit is where it gets tested.

There is a second reason the clock matters. The FREE-AI report also asks supervisors to develop AI-specific audit checklists and model risk templates — standardized guidance on what to inspect and how institutions demonstrate compliance. Supervisory capability is being built in parallel with institutional obligation. The examiner across the table is preparing for this conversation. The only question is whether you are.

## The Cost of Not Being Able to Answer

First, there is the inspection itself. An institution that cannot reconstruct an AI-assisted decision is not presenting a gap in one control. It is demonstrating that its board-approved AI policy — if one exists — is not connected to its operational reality. That reframes every other answer given that day.

Second, there is the customer dispute. When a complaint alleges an unfair AI-driven outcome, the institution that holds a decision trace can investigate, explain, and if needed compensate with confidence. The institution that holds nothing can only argue from policy documents. One of these positions survives scrutiny. The other becomes the finding.

Third — and this is the one that compounds — every quarter without decision-level records is a quarter of history that can never be recovered. Controls can be built next year. Evidence cannot be backfilled. The gap between institutions that started recording early and those that waited is not a maturity gap. It is a permanent asymmetry in what they can prove.

## What Getting Ahead of This Actually Looks Like

The institutions moving early on this are not buying an audit. They are building auditability — which is an architectural property, not an annual event.

In practice that means AI interactions flowing through a governed layer where logging happens at the moment of use, not reconstructed afterward. It means records that capture the question, the context retrieved, the model and version that ran, the output produced, and the human who reviewed it. It means logs that are tamper-evident, because a record that can be silently edited is not evidence — it is a liability with timestamps. And it means the sanctioned path being genuinely usable, because the alternative is usage that flees to unsanctioned tools and takes its evidence with it.

None of this is exotic engineering. All of it is deliberate architecture. And almost none of it can be added retroactively to a stack of disconnected public AI tools.

## Closing Thought

The deeper shift in the FREE-AI framework is easy to miss because it is distributed across 26 recommendations: Indian financial regulation is moving from trusting what institutions say about their AI to examining what their AI actually did. Policy documents answer the first standard. Only evidence answers the second.

So the question is worth asking internally, long before an examiner asks it for you: pick one AI-assisted decision from 90 days ago — any one — and try to reconstruct it. What you find in that exercise is your real AI governance posture. Everything else is intention.

If the reconstruction takes ten minutes, you are ahead of nearly everyone. If it cannot be done at all, the good news is that this is the single most fixable gap in the entire framework — and the institutions fixing it now will spend their first inspection discussing findings, not explaining absences.
