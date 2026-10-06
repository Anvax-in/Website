---
title: "The EU AI Act's High-Risk Classification, Decoded"
description: "The EU AI Act classifies AI by workflow, not platform. How Annex III, the Article 6(3) exception, and the profiling carve-out decide high-risk status."
pubDate: 2026-10-06
tags: ["EU AI Act", "AI Governance", "Model Risk", "Compliance", "GDPR", "Enterprise AI"]
draft: false
---

![The EU AI Act's High-Risk Classification, Decoded](/assets/blog/eu-ai-act-high-risk-classification.webp)

Most summaries of the **EU AI Act (Regulation (EU) 2024/1689)** present high-risk as a category of system: hiring tools, credit scoring, biometrics. That framing is why teams get the answer wrong. The Act classifies by use, by the role an organization plays, and by a set of exceptions with a carve-out inside them. The same assistant can be high-risk in one workflow and out of scope in another. **High-risk is not a property of the model. It is a property of what a specific deployment is used for, and who is deploying it.**

## What the Classification Chain Actually Is

**Article 6** sets two routes into high-risk. The first covers AI systems that are safety components of products already regulated under the Union legislation listed in **Annex I**, where that product requires third-party conformity assessment. The second covers the use cases listed in **Annex III**.

Annex III lists eight areas, including biometrics, critical infrastructure, education and vocational training, employment and worker management, access to essential private and public services such as creditworthiness evaluation, law enforcement, migration and border control, and the administration of justice and democratic processes.

A system lands in Annex III by what it is used for. An internal assistant is not in Annex III because it uses a large language model. It is in Annex III if a workflow it runs falls inside one of those areas.

> **The unit of classification is the workflow, not the platform.**

## The Derogation in Article 6(3), and the Carve-Out Inside It

A system that falls under Annex III is not automatically high-risk. **Article 6(3)** provides that it is not high-risk where it does not pose a significant risk of harm to health, safety, or fundamental rights, including by not materially influencing the outcome of decision-making, and where it meets one or more conditions: it performs a narrow procedural task, it improves the result of a previously completed human activity, it detects decision patterns or deviations from prior patterns without replacing or influencing the previous human assessment without proper human review, or it performs a preparatory task to an assessment relevant to an Annex III use case.

The carve-out sits at the end of the same provision. Where the system performs **profiling of natural persons**, it is always high-risk. Profiling here has the meaning used in EU data protection law: automated processing of personal data to evaluate personal aspects of a person.

This is where internal tools change category. An assistant that retrieves and summarizes documents for a recruiter is arguably preparatory. The same assistant, asked to rank candidates by their fit for a role, is evaluating personal aspects of individuals.

## Role: Provider or Deployer, and How That Changes

The Act assigns different obligations to providers and deployers. A company using a vendor's AI system in its own operations is normally a deployer, with obligations under **Article 26**, including human oversight by competent persons, input data relevance to the extent it controls it, and log retention.

**Article 25** changes that. A deployer becomes a provider of a high-risk system when it puts its own name or trademark on the system, makes a substantial modification to it, or modifies the intended purpose of a system in a way that makes it high-risk. An internal AI assistant branded as a company product and extended with custom workflows is worth examining against that article before assuming the vendor carries provider obligations.

| Step | What it decides |
| --- | --- |
| **Is it an AI system under the Act** | Whether the Regulation applies to this component at all. |
| **Annex I or Annex III route** | Whether classification comes from product safety law or from a listed use case. |
| **Article 6(3) conditions** | Whether an Annex III use case escapes high-risk as narrow, preparatory, or non-determinative. |
| **Profiling carve-out** | Whether the derogation is unavailable because the system evaluates personal aspects of people. |
| **Article 25 role test** | Whether the organization is acting as deployer or has become a provider. |

## The Cost of Classifying Late

First, classification is per use case, and platforms host many. A single internal assistant can run a marketing workflow that is out of scope, an HR workflow in Annex III, and a credit workflow in Annex III. One classification for "the platform" is not a usable answer, and a late one means retrofitting controls to workflows already in production.

Second, the derogation is not free. Where a provider concludes a system is not high-risk under Article 6(3), **Article 6(4)** requires that assessment to be documented before the system is placed on the market or put into service, and **Article 49(2)** requires registration in the EU database for such cases. A conclusion recorded in a meeting is not the artifact the Act asks for.

Third, controls have to be enforceable per workflow, which is an architectural requirement, not a policy one. If the system cannot distinguish an HR query from a marketing query, it cannot apply human oversight to one and not the other, and the only compliant option left is to apply the strictest controls everywhere.

> **A platform that cannot tell its workflows apart has one classification: the strictest one that applies to any of them.**

## Transparency Applies Even Outside High-Risk

Classification work often stops once a team concludes a system is not high-risk. **Article 50** sets transparency obligations that apply regardless, including informing people that they are interacting with an AI system where this is not obvious, and marking certain synthetic content. A customer-facing assistant outside Annex III can still carry obligations under that article.

## How To Check

List the workflows running on the AI platform, not the platform itself. For each one, record the Annex III area if any, the Article 6(3) condition being relied on if the conclusion is not high-risk, whether personal aspects of individuals are being evaluated, and whether the organization is acting as deployer or provider under Article 25. Any workflow where that record cannot be completed is the one to look at first. The conclusion for a specific system is a legal determination, and this record is what makes that determination possible rather than a substitute for it.

---

Anvax is built so that workflows are separable: each one carries its own retrieval scope, oversight configuration, and audit record, which is what makes a per-workflow classification enforceable rather than aspirational.

---

*If a classification exercise is underway and the current answer covers "the platform" rather than each workflow, that is usually the first thing worth splitting.*
