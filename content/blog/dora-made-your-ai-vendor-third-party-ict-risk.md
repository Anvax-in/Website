---
title: "DORA Made Your AI Vendor a Third-Party ICT Risk"
description: "DORA treats AI vendors as third-party ICT dependencies. Five contract gaps — data location, subcontracting, versioning, and exit — financial entities miss."
pubDate: 2026-09-22
tags: ["AI Governance", "AI Audit", "Compliance", "DORA", "Enterprise AI", "Model Risk"]
draft: false
---

![DORA Made Your AI Vendor a Third-Party ICT Risk](/assets/blog/dora-made-your-ai-vendor-third-party-ict-risk.webp)

The **Digital Operational Resilience Act (Regulation (EU) 2022/2554)** has applied to EU financial entities since **17 January 2025**. It treats the technology services a financial entity depends on as a source of operational risk to be governed by contract, registered, and exited on demand. A hosted AI model, an AI platform, or an embedding API will typically fall within DORA's broad definition of ICT services. That changes what the contract behind an AI deployment has to say. **An AI vendor is not a software purchase under DORA. It is a third-party ICT dependency, with obligations attached.**

## What Third-Party ICT Risk Actually Means

The naive reading treats DORA as a resilience rule for core banking systems and payment rails. The text is wider. **Article 28** requires financial entities to manage ICT third-party risk as part of their ICT risk framework, to keep a **register of information** on all contractual arrangements for ICT services, and to have exit strategies. **Article 30** lists the provisions those contracts must contain, with a longer list where the service supports critical or important functions.

Contracts signed before DORA applied were often not written with those provisions in mind, and AI contracts in particular were frequently signed as pilots under standard online terms. A pilot that later moved into production can carry pilot terms into a regulated workflow. Four places are where AI contracts diverge most from what **Article 30** expects.

## Data Location: Where Prompts Are Processed

**Article 30(2)(b)** requires contracts to state the locations, meaning regions or countries, where services are provided and where data is processed, including storage location, and to require notice before those change.

For an AI service, storage location is the easy part. The harder part is processing. A retrieval-augmented system copies passages from internal documents into every prompt it sends to the model. If the vendor routes inference across regions for capacity, the contract can name an EU storage region while prompts carrying customer data are processed somewhere else. The clause has to cover inference, embedding, logging, and support access, not only the database.

## Subcontracting: The Model Behind the Platform

Many AI platforms do not run their own models. They call a model provider, which may itself run on a cloud provider. DORA expects financial entities to understand that chain; **Article 29** asks them to assess concentration risk including subcontracting arrangements, and **Article 30(2)(a)** requires the contract to say whether subcontracting of a service supporting a critical or important function is permitted, and on what conditions.

The mechanism that matters is change. A platform can switch its underlying model provider with no change to its own interface. From the financial entity's side, the service description is unchanged. From a risk perspective, a new processor now receives the prompts. A contract that does not require notice of changes to the model provider does not let the entity detect that.

## Service Description: A Model Version Is Part of the Service

**Article 30(2)(a)** requires a clear and complete description of the functions and services provided, and **Article 30(3)(a)** requires service level descriptions with precise performance targets for services supporting critical or important functions.

For conventional software, the service description is stable between releases. For a hosted model, behavior can change when the provider updates the model behind the same endpoint name. An AI contract that describes the service as "access to the model API" leaves the most consequential variable, which model version answers, outside the agreement. Version pinning, deprecation notice periods, and a right to test before a forced migration belong in the service description.

## Exit: What Data Actually Comes Back

**Article 30(2)(d)** requires provisions ensuring access, recovery, and return of data in an easily accessible format if the arrangement ends, and **Article 30(3)(f)** requires exit strategies with a mandatory adequate transition period for critical or important functions.

This is where AI contracts are least prepared, because "the data" is ambiguous. Returning the source documents is simple. An AI deployment also produces an index of embeddings, chunking configuration, prompt templates, evaluation sets, and audit records. Embeddings are only usable with the embedding model that produced them. If that model belongs to the vendor, a returned vector index cannot be queried anywhere else, and the practical exit path is re-embedding the full corpus with a new model.

> **A returned vector index without its embedding model is a file, not a working system.**

## The Cost of Leaving These Gaps

First, the register of information is incomplete. An entity cannot accurately record a service whose processing locations and subcontractors the contract does not disclose.

Second, silent change. Model updates and provider switches happen on the vendor's schedule. Without notice obligations, the first sign of a change is a difference in outputs that someone has to notice.

Third, the exit that takes longer than the transition period. Re-embedding a large document corpus, re-tuning prompts for a different model, and re-running evaluations to confirm behavior is a project measured in weeks, not days. It also has to happen while the outgoing service is still running. An exit plan that assumes data return is enough underestimates the work, because the data that returns is not the system that ran.

## How To Check

Take one AI contract that supports a production workflow and look for five things.

1. **Processing locations** - Does the contract name where inference, embedding, and logging run, not only where data is stored?
2. **Model provider disclosure** - Is the underlying model provider named, with notice required before it changes?
3. **Version control** - Can the entity pin a model version, and how much notice is given before a version is retired?
4. **Returnable artifacts** - Does "data return" include embeddings, prompt templates, evaluation sets, and audit records, in a documented format?
5. **Exit feasibility** - Is the transition period long enough to re-embed the corpus and re-validate outputs on a replacement model?

---

Anvax is built so the financial entity holds the parts that DORA's exit provisions depend on: the index, the embedding model choice, the prompts, the evaluation sets, and the audit record, all deployable in the entity's own environment. That makes the exit plan something that can be tested, not only documented.

---

*If AI services are going into your DORA register of information this cycle, it may be worth checking these five contract points before the register entries are finalized.*
