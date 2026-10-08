---
title: "Self-Hosted Is Not a Deployment Preference. It Is a Procurement Requirement."
description: "Self-hosted deployment is often a mandatory tender filter, not a scored preference. What buyers actually test, the real cost, and the offline install proof."
pubDate: 2026-10-08
tags: ["Self-Hosted AI", "Sovereign AI", "Enterprise AI", "Data Residency", "Compliance"]
draft: false
---

![Self-Hosted Is Not a Deployment Preference. It Is a Procurement Requirement.](/assets/blog/self-hosted-procurement-requirement.webp)

Vendors tend to treat deployment model as a commercial conversation: multi-tenant by default, private deployment for larger contracts, on-premises if someone insists. Inside many buying organizations it is not a conversation at all. It is a mandatory requirement in the tender, written before any vendor was contacted, derived from a data classification policy that predates the AI project. **When deployment model is a pass or fail requirement, feature comparison never happens, because the comparison starts after the requirement is met.**

## What a Mandatory Requirement Actually Means

Tenders usually separate mandatory requirements from scored criteria. Scored criteria produce a ranking. Mandatory requirements produce a filter, applied before scoring, often by someone who never sees the product.

Deployment model ends up in the mandatory column for reasons that have nothing to do with the AI project. A data classification policy says material of a given classification is processed only on infrastructure the organization controls. An existing control framework assumes customer-managed encryption keys, network segmentation, and log delivery into the organization's own monitoring. Contracts with the organization's own customers flow obligations down. These predate the project and outlive it.

A vendor that reads the requirement as a preference will answer it with reassurance: strong isolation, regional hosting, a strict security program. The requirement is not asking about the strength of the vendor's controls. It is asking who operates them.

## What Buyers Actually Test

"Self-hosted" gets claimed more often than it gets tested. Where it is tested, the questions are specific.

**Does it install from artifacts the buyer holds?** Container images and deployment manifests the organization can pull into its own registry, pin, scan, and deploy. A proprietary installer that fetches components at runtime moves the dependency back to the vendor.

**Does it run without outbound connections?** License validation, telemetry, model downloads, and error reporting are the four that usually fail. A system that starts only when it can reach a vendor endpoint is not deployable in a restricted environment.

**Whose keys, whose logs, whose identity provider?** Customer-managed keys, logs delivered into the organization's own monitoring, and authentication through the organization's identity provider with its existing group structure.

**Where does inference run?** This is the AI-specific one. A platform deployed in the buyer's environment that still calls a hosted model API has moved the application in-region and left the data path where it was. For a self-hosted requirement, the model has to run on the buyer's infrastructure, which makes supported open-weight models and GPU requirements part of the answer.

## The Honest Cost of Running It Yourself

First, capacity. Self-hosted inference means GPU capacity planned for peak concurrency rather than rented per token. Idle capacity is paid for, and the sizing question has to be answered before anyone knows the usage pattern.

Second, upgrades. Model updates, platform releases, and security patches arrive as artifacts the organization has to test and roll out itself, in an environment where downloading them may require an approved transfer path.

Third, operations. Someone is paged when retrieval slows down or an inference node fails. A self-hosted deployment needs a support model that defines what the vendor can see, which is often very little, and how diagnostic information is shared when the vendor cannot connect to the system at all.

These costs are the reason self-hosting is not the right default for every buyer. For the buyers whose tender makes it mandatory, they are not a comparison. They are the price of being eligible.

## How To Check

Ask for an offline install. The test is simple: deploy into an environment with no outbound internet access, using only artifacts handed over in advance, authenticate through the organization's own identity provider, and run one retrieval-backed query end to end. Every dependency that reaches outward will announce itself during that exercise, and the result is a factual answer rather than a claim in a response document.

---

Anvax is distributed as artifacts the organization deploys in its own environment, with its own keys, its own identity provider, and models running on its own infrastructure, so the offline install test is the expected way to evaluate it rather than an exception.

---

*If a tender with a mandatory deployment requirement is coming up, running the offline install test early tends to shorten the evaluation more than any feature discussion.*
