---
title: "The era of AI policy is ending. The era of AI evidence is beginning."
description: "Inside RBI's draft Guidance on Model Risk Management - what the shift from AI policy to AI evidence means for regulated entities."
pubDate: 2026-06-30
tags: ["RBI", "AI Governance", "Model Risk", "Regulation", "BFSI"]
draft: false
---

![The era of AI policy is ending. The era of AI evidence is beginning - RBI Model Risk Management infographic](/assets/blog/era-of-ai-policy-ending.png)

Last August, the RBI told regulated entities something simple: **you are accountable for what your AI systems do, whether you built them or bought them.**

That was **FREE-AI**.

It established the principles. Trust. Human oversight. Fairness. Governance. A board-approved AI policy. It set the direction without prescribing every control.

Most regulated entities responded. AI policies were drafted, approved by boards, and placed alongside existing governance documents. They articulated the right intent and established a foundation for responsible AI adoption.

The **draft Guidance on Regulatory Principles for Model Risk Management**, released in late June with comments open until **24 July**, is the natural next step.

It asks a different question.

Not *"Do you have an AI policy?"*

Instead:

> **Can you demonstrate that your governance actually works?**
>
> Can you show every model in production? Who approved it? Who validated it? When it changed? How it was monitored? What happened when it failed?

This is where AI governance moves beyond policy into evidence. It is also where many institutions will discover that documentation alone is no longer enough.

## The shift nobody is pricing in yet

Principle-based regulation is comfortable until the implementation guidance arrives.

FREE-AI encouraged regulated entities to establish governance. This draft explains what governance should look like in practice.

The **Board remains accountable** for the overall framework.

A dedicated risk committee is expected to oversee implementation and approve high-risk models. Responsibility cannot quietly disappear into operational teams.

Every model relied upon by the institution - whether internally developed or sourced from a third party - is expected to exist within a **central model inventory**. Each model should have clearly assigned ownership, development responsibility, independent validation, approval records, and ongoing monitoring.

Perhaps the most overlooked requirement is **retention**.

Decommissioning a model no longer closes the file. Institutions are expected to preserve model records, supporting documentation, validation evidence, monitoring history, and governance decisions for **up to ten years**. The expectation is straightforward: years later, a supervisor should still be able to reconstruct how a model operated, why it was approved, and who remained accountable throughout its lifecycle.

**Retirement is no longer the end of accountability. It simply marks another stage of the audit trail.**

## The loophole that just closed

Many organisations classify AI systems by technical sophistication.

The draft makes it clear that this is no longer sufficient.

A model's risk classification should reflect its **overall risk profile**, not merely its technical complexity. A relatively simple implementation cannot receive a lower risk tier simply because the underlying architecture appears uncomplicated.

**Materiality takes precedence.**

If a customer outcome, lending decision, fraud investigation, pricing decision, or regulatory obligation depends on the model, the governance expectations increase accordingly - regardless of whether the implementation is technically simple.

This has important implications for generative AI.

Many deployments today consist of lightweight applications sitting in front of foundation models. They may contain relatively little proprietary code, yet they increasingly influence customer interactions, operational decisions, and internal workflows.

The draft suggests that institutions should evaluate these systems **based on the consequences of their decisions** rather than the apparent simplicity of their architecture.

That represents a significant shift in how AI portfolios will need to be assessed.

## Vendor certifications no longer answer the regulator's question

This may become one of the most consequential sections of the draft.

For several years, procurement discussions around AI have often centred on certifications. **SOC 2. ISO 27001.** Independent audits. Vendor assurance reports.

Those remain valuable.

**They are no longer sufficient.**

The draft makes it clear that a regulated entity's obligation to validate a model exists independently of any certification provided by the vendor.

**The responsibility cannot be outsourced.**

Institutions are expected to establish their own evidence that a model performs as intended, operates within approved risk limits, and remains appropriate for its intended use. Vendor documentation may support that process, but it does not replace it.

This changes procurement conversations considerably.

The question is no longer *"Which certifications do you hold?"*

It becomes:

> **"What evidence can you provide that allows us to independently validate your model, document our assessment, and satisfy our own governance obligations?"**

Vendors that can provide transparent validation artefacts, version history, performance evidence, decision rationale, testing outputs, and governance documentation will be significantly better positioned than those relying primarily on certification logos.

## Generative AI is no longer treated as an exception

FREE-AI introduced important concepts such as **explainability, hallucinations, transparency, and human oversight**.

The draft translates those principles into operational expectations.

**Hallucinations** are no longer treated as an inherent limitation that institutions simply acknowledge. Regulated entities are expected to implement controls that actively reduce their likelihood and minimise their impact.

**Explainability** is addressed with similar pragmatism.

The RBI recognises that not every model can be fully interpretable. That acknowledgement does not reduce governance expectations. Where explainability is limited, institutions are expected to compensate through stronger validation, more frequent monitoring, tighter deployment controls, and enhanced oversight.

Customer-facing AI receives equally explicit treatment.

Customers should be informed when they are interacting with AI systems. They should also be able to access meaningful human assistance whenever required.

**Human oversight extends well beyond maintaining an emergency shutdown mechanism.**

The expectation is for appropriately qualified people who understand how the model operates, regularly review its outputs, challenge decisions when necessary, and intervene where appropriate.

In other words, **human oversight is expected to function as an active governance control**, not merely as a technical fallback.

## What this means for leadership

| Role | What changes |
|---|---|
| **Board** | Accountability for AI governance cannot be delegated away |
| **Chief Risk Officer** | Higher standard for model inventories, validation, monitoring, and governance evidence |
| **Chief Technology Officer** | Production readiness now includes governance, documentation, traceability, and oversight |
| **Procurement leaders** | Third-party AI solutions must now be evaluated for independent validation capability |
| **AI vendors** | The bar shifts from demonstrating compliance to enabling independent validation by customers |

Perhaps most importantly, it aligns AI governance with a principle that financial institutions already understand well.

> If an institution cannot explain how a decision was made, demonstrate how it was controlled, and produce evidence supporting its governance - **it should expect that decision to be challenged.**

**AI is no longer an exception. It is becoming another regulated capability.**

## Before 24 July, ask four questions

As the consultation period closes, every regulated entity should be able to answer these four questions with confidence:

1. **Model inventory** - Do we have a complete inventory of every model influencing customer outcomes, including systems that may not traditionally have been classified as models?

2. **Risk tiering** - Would our current model tiering withstand independent regulatory scrutiny, particularly where business impact is significantly higher than technical complexity?

3. **Third-party validation** - Can we independently validate every third-party model we rely upon, even without additional vendor involvement?

4. **GenAI guardrails** - For every customer-facing generative AI system, have we implemented effective hallucination controls, meaningful human oversight, transparent customer disclosures, and auditable governance processes?

These are unlikely to remain consultation questions for long.

They are the questions institutions should expect supervisors to ask once the guidance is finalised.

---

The organisations that begin building evidence today will be considerably better prepared than those still relying on policy documents when that conversation arrives.

This draft does not introduce a fundamentally new philosophy for AI governance. It operationalises one that already exists.

**FREE-AI established the principle. This guidance explains what proving it looks like.**
