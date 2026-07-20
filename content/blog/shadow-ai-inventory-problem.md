---
title: "You Cannot Govern Models You Have Not Listed"
description: "The shadow AI inventory problem: BFSI institutions can't govern models, prompts, and agents nobody registered. Here is why that gap is now a regulatory exposure."
pubDate: 2026-07-21
tags: ["AI Governance", "Model Risk", "RBI", "BFSI", "AI Audit", "Compliance"]
draft: false
---

![A model inventory ledger with rows of registered models next to a shadow row of unlisted ones, styled in the Anvax editorial palette](/assets/blog/shadow-ai-inventory-problem.webp)

## The Problem Nobody Put On The Risk Register

Here's something that keeps model risk officers up at night: the models they can name are not the ones they should worry about. The fine-tuned classifier in the fraud queue, the vendor's credit model, the chatbot answering EMI questions — those are on a spreadsheet somewhere, reviewed, signed off. What isn't on that spreadsheet is the real exposure.

A product manager wires a prompt template into a support workflow on a Friday afternoon. A data scientist spins up an open-weights model on a personal API key to test an idea before the sprint review. A vendor updates their underlying model version without telling anyone, because the contract never asked them to. None of this shows up in a governance review, because governance reviews only look at what somebody remembered to list.

And the more of these there are, the harder it becomes to say what your institution's AI surface actually is. And the harder that is to say, the less any single control — access review, bias testing, audit logging — can be trusted to have covered everything. The gap between what you govern and what you run gets wider every quarter, quietly, with no alert going off.

A missing entry in a model inventory is not a documentation gap. It is a governance gap wearing a documentation costume.

## First, Let's Be Clear About What We're Talking About

Shadow AI is not "unauthorized ChatGPT use," though that's the version that gets the headlines. It's not just employees pasting customer data into a public LLM, though that happens too. And it's not solved by a policy memo telling staff which tools they're allowed to open.

Shadow AI, properly defined, is any model, prompt chain, fine-tune, or agent making decisions or generating outputs that touch your institution's customers, data, or operations — without appearing in a system your risk function actually monitors. That includes:

- A vendor's embedded model whose version changes are invisible to your contract terms
- An internal fine-tune built for a pilot that quietly became production
- A prompt template in a low-code workflow tool that nobody classified as "a model"
- An agent that calls three other models and a rules engine, none of which were individually registered as "AI"

The common thread is not malice. It's velocity. Model deployment got faster than model governance, and the gap between them is where shadow AI lives.

## Why This Is Different From Traditional Shadow IT

Shadow IT — the unsanctioned SaaS tool, the personal Dropbox — was a data leakage problem. You could eventually find it, because data has to move through logged channels eventually, and access reviews would surface it.

Shadow AI is harder to find because a model doesn't just move data. It makes a decision, and that decision can be indistinguishable from a decision made by a sanctioned system. A collections agent that gets nudged by an unlisted prompt template still produces a normal-looking collections call. A credit decision touched by a vendor's silently-updated model still produces a normal-looking approval or denial. There's no leaked file to trip a DLP alert. There's just an outcome, sitting in your records, that you cannot trace back to a governed source.

That's the reframe worth sitting with: shadow IT is a visibility problem about where data goes. Shadow AI is a visibility problem about where decisions come from. The second one is the one regulators are starting to ask about directly.

## The Three Reasons This Escalates Faster Than Institutions Expect

**Every Team Ships Independently Now.** AI capability is no longer gated behind a central ML platform team. Product, ops, and even compliance teams themselves are building small automations with off-the-shelf models. Each team believes governance is someone else's job, because from where they sit, they're "just using a tool."

**Vendors Change Underneath You Without a Change Request.** A model version bump inside a SaaS product is not a system change from the vendor's perspective — it's a routine update. From your perspective, if that model touches lending, KYC, or servicing decisions, it's a material change to a governed process that happened with zero notice to your risk team.

**Audit Requests Assume You Already Know What You Have.** When an examiner asks for the inventory of AI systems touching credit decisions, the honest first step for most institutions is a scramble across product, engineering, and vendor management — not a query against a system of record. The scramble itself is the finding.

## The Cost of Not Having a Real Inventory

First, there's the immediate audit cost. An examiner who asks "list every model that can affect a customer's credit outcome" and gets an incomplete answer isn't just noting a gap — they're now questioning whether any control you've described actually covers the full surface it claims to.

Second, there's the incident cost. When something goes wrong — a biased outcome, a data leak, a bad automated decision — the first question is always "which model did this, and who approved it." If the answer requires forensic reconstruction instead of a lookup, your response time turns a contained incident into a prolonged one, and a prolonged incident is the kind regulators remember.

Third, and most expensive, is the compounding trust cost. Every unlisted model is a small bet that nothing will go wrong before someone notices it exists. Institutions that carry dozens of these bets simultaneously aren't managing AI risk — they're accumulating it, unpriced, on a balance sheet nobody is reading.

## Closing Thought

Model risk management used to mean reviewing the handful of models a bank built in-house, on a cadence measured in quarters. That world is gone. The realistic AI surface of a modern BFSI institution now includes vendor models, internal fine-tunes, prompt-based workflows, and increasingly, agents that chain several of these together — expanding on a cadence measured in sprints, not quarters.

You cannot govern what you have not listed. Not because governance frameworks are inadequate, but because they were built to review known systems, not to discover unknown ones. The starting point isn't a better review — it's a live, continuously updated inventory of every model, prompt, and agent actually touching your customers, matched against the controls that are supposed to cover them. That's the layer Anvax builds for BFSI institutions: not another policy document, but the system of record that makes "we don't know what we're running" no longer an available answer.
