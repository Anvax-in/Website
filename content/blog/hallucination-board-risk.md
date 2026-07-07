---
title: "Hallucination just became a board-level risk."
description: "RBI's latest draft quietly changes who owns AI hallucinations. What was once considered a product problem is becoming a governance obligation."
pubDate: 2026-07-07
tags: ["RBI", "AI Governance", "Generative AI", "Model Risk", "Hallucinations", "BFSI"]
draft: false
---

![Hallucination just became a board-level risk — RBI draft Model Risk Management guidance](/assets/blog/hallucination-board-risk.png)

For years, hallucinations have been treated as an engineering problem. A chatbot invents a policy. A copilot cites a regulation that doesn't exist. A generative model confidently produces an answer that sounds convincing, but happens to be wrong. The response has almost always been the same: improve the prompt, switch to a better model, wait for the vendor to release another update.

That assumption no longer holds.

Buried inside the Reserve Bank of India's draft **Guidance on Regulatory Principles for Model Risk Management, 2026** is a clause that quietly changes how regulated entities should think about generative AI. Paragraph 54(2) asks institutions to implement **"appropriate control boundaries"** to mitigate hallucination risks, particularly where generative AI influences customer interactions or decision-making. At first glance, it reads like another technical safeguard. It isn't.

It is a governance requirement — and it signals something much bigger. **Hallucination has crossed a regulatory boundary.** It no longer belongs exclusively to product teams. It now sits inside the Model Risk Management Framework, alongside governance, validation, monitoring and board oversight. That distinction changes almost everything.

## The assumption that just broke

Until now, organisations have largely viewed hallucinations as a characteristic of the model itself. Some models hallucinate less, some more. Model providers publish benchmark scores, evaluation reports and model cards explaining continuous improvements. From a product perspective, that makes perfect sense. From a regulator's perspective, it doesn't.

The RBI isn't asking whether your model hallucinates less than another model. It is asking something entirely different.

> **Can you demonstrate that your institution has anticipated hallucination risk, implemented appropriate controls around it, and can produce evidence that those controls actually work?**

That is a governance question, not a technology question. The difference matters because technology improves over time — governance has to work today.

This also explains why paragraph 54 sits inside the broader Model Risk Management Framework instead of appearing in a standalone section on artificial intelligence. The draft is not trying to regulate large language models. It is regulating how financial institutions manage the risks those models create. **The conversation is moving away from AI capability and towards organisational accountability.**

## Why "our vendor handles it" is no longer an answer

The draft becomes even more interesting when read alongside another provision. Earlier in the guidance, the RBI makes it clear that regulated entities remain accountable for model outcomes even when those models are supplied by third-party vendors. Independent validation is expected regardless of whether the vendor has already certified the model.

That principle has significant consequences for generative AI. For years, enterprise procurement has revolved around certifications — SOC 2, ISO 27001, security questionnaires, model cards, independent audits. Those artefacts remain valuable. **They are no longer sufficient.**

A vendor can explain how a model was developed, publish benchmark scores, and describe how hallucination rates have improved across successive versions. None of that demonstrates that your institution has implemented appropriate controls for your own customers, your own approval processes or your own risk appetite. Only you can do that. That is exactly why paragraph 54(2) matters: it extends the same accountability principle into the specific problem of hallucinations. The model may belong to your vendor. The governance never does.

> **A vendor can build your AI. They cannot own your regulatory accountability.**

This changes the question compliance teams should ask. Instead of asking *"Does our vendor have good hallucination benchmarks?"* — they should increasingly be asking:

> **"Can we demonstrate that hallucinations cannot create unmanaged operational risk inside our organisation?"**

Those are very different conversations. One evaluates software. The other evaluates governance.

## What "appropriate control boundaries" actually look like

One of the strengths of the draft is that it avoids prescribing specific technologies. Instead, it describes outcomes — a much more durable way to regulate. Technology evolves quickly; governance principles tend to last much longer. The RBI doesn't tell institutions which model to deploy or which vendor to choose. It asks something more fundamental: **can you demonstrate that you have reduced the likelihood and impact of hallucinations before they affect customers or business decisions?**

For most organisations, that won't require entirely new technology. It will require better governance around technology they already use.

| Control | Why it matters |
| --- | --- |
| **Source citation requirements** | Allow users to verify where an answer originated instead of accepting unsupported outputs. |
| **Confidence thresholds** | Prevent low-confidence responses from automatically reaching customers or employees. |
| **Human review gates** | Require manual approval before AI-generated outputs influence lending, compliance or customer decisions. |
| **Red-teaming** | Deliberately test how the model behaves under adversarial or unusual scenarios before deployment. |
| **Traceability** | Record prompts, outputs, approvals and model versions to support future audits and investigations. |

None of these controls eliminate hallucinations — that isn't the objective. The objective is to ensure hallucinations never become **unmanaged operational risk**.

The rest of paragraph 54 reinforces exactly that philosophy. Where explainability isn't fully achievable, the RBI expects compensating controls rather than abandoning the technology altogether. Where models produce probabilistic outputs, institutions should use confidence scores and similar mechanisms to manage uncertainty. Where generative AI is deployed in higher-risk environments, structured challenge exercises and red-teaming should become part of the validation process before production deployment. Enhanced documentation enables traceability, reproducibility and auditability, and customer-facing AI should clearly disclose that users are interacting with an AI system while explaining its limitations. Viewed individually, these requirements seem incremental. Viewed together, they describe a governance system.

## The bigger shift

The most interesting part of paragraph 54 isn't that the RBI used the word *hallucination*. It's where it used it. Hallucinations don't appear inside technology guidance, cybersecurity guidance, or as a standalone AI requirement. They appear inside **Model Risk Management** — and that placement tells us exactly how the RBI expects institutions to think about generative AI: not as experimental software, not as a productivity tool, but as another source of operational risk that requires governance, oversight and evidence.

That is a profound shift. For years, discussions around AI governance have focused on ethical principles — fairness, transparency, human oversight, accountability. Those principles remain important. This draft begins translating them into operational expectations. Evidence replaces intention. Controls replace promises. Documentation replaces assumptions.

**The question is no longer whether your organisation has an AI policy. The question is whether you can prove your AI governance works.** That is likely to become the defining characteristic of the next phase of enterprise AI adoption.

## Before the guidance is finalised, ask five questions

The consultation remains open until **24 July 2026**, and the wording of individual clauses may still change before the guidance is finalised. The direction of travel, however, is increasingly clear. Every regulated entity experimenting with generative AI should be able to answer five questions today.

1. **AI inventory** — Do we know every generative AI system that influences customer outcomes or internal decision-making?
2. **Control boundaries** — Have we implemented documented controls that reduce the likelihood and impact of hallucinations?
3. **Independent validation** — Could we explain our governance without relying solely on the vendor's model card or certification?
4. **Evidence** — Are our controls documented, tested, monitored and auditable?
5. **Board oversight** — Would our Board Risk Committee recognise hallucination as a model risk, or still view it as a technology issue?

Those are unlikely to remain consultation questions for long. They are the kinds of questions supervisors are increasingly preparing to ask.

---

Across jurisdictions, regulators are gradually moving away from asking whether organisations use AI. They are beginning to ask something much harder.

> **Can you prove that your organisation remains in control when AI is wrong?**

That may turn out to be the most important question in enterprise AI governance. Because software defects belong to engineering teams. **Operational risks belong to boards.**

---

*If you're assessing whether your current generative AI controls would satisfy the direction of this draft, that's a useful conversation to have now, while the framework is still taking shape.*
