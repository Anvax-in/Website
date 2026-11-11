---
title: "What Changes When AI Runs in Your Own Cloud Account"
description: "Deployed in your own cloud is a real difference from a shared service. Here is what it actually changes, what it does not, and the questions to ask your vendor."
pubDate: 2026-11-11
tags: ["Enterprise AI", "Self-Hosted AI", "Sovereign AI", "AI Governance", "Compliance"]
draft: false
---

![What changes when AI runs in your own cloud account](/assets/blog/what-changes-when-ai-runs-in-your-own-cloud-account.webp)

"Deployed in your own cloud" has become a standard line in enterprise AI sales. It is a real difference from a vendor's shared service. It is also easy to read too much into. Running an AI platform in your own AWS or Azure account changes some things a great deal and leaves others exactly where they were.

A security reviewer who hears the phrase should ask what it covers. The documents and the search index, almost certainly. The model, the logs, the support tooling and the update channel, not necessarily.

## Four Ways AI Is Deployed

**Vendor-hosted, shared.** The vendor runs one service for many customers. Your documents, search index, logs and chat history live in the vendor's account alongside other customers', separated by software.

**Vendor-hosted, dedicated.** The vendor runs a separate instance for you, but still in the vendor's own account.

**In your own cloud account.** The platform runs in an AWS, Azure or Google Cloud account your firm owns. The vendor supplies and updates the software.

**On your own servers.** The platform runs in your data center, sometimes with no outbound connection at all.

## What Actually Changes

**Where the data sits.** Documents, search indexes, embeddings, logs and conversation history live in storage your firm owns, in a region you choose.

**Who holds the keys.** Encryption keys can sit in your own key management service, where you can rotate or revoke them.

**Who can get in.** Vendor staff need your permission to reach the deployment, and your cloud provider's activity logs show when they did.

**Which controls apply.** The network rules, monitoring, backups and security tools you already run cover the AI platform too.

**Who else is there.** No other customer runs in the deployment, so a bug in a shared component cannot hand your data to another company.

**How you leave.** The data is already in your account. Ending the contract does not depend on a vendor returning or deleting it.

## What It Does Not Change

**The model may still run somewhere else.** If the platform calls a model API, prompts leave your account for the model provider. Using Azure OpenAI or Amazon Bedrock in your own subscription keeps those calls under your own cloud agreement, but the provider's terms on processing and retention still apply, and they differ by model. Only open-weight models on your own hardware keep inference entirely in-house.

**Who inside the firm can read what.** Hosting location does nothing about whether an employee can see another client's files. That is decided by permission checks at the moment of each question.

**Who maintains it.** Patching, capacity and compute costs move at least partly onto your team and your cloud bill, depending on what the vendor manages.

**Whose code it is.** A bug in the software is still the vendor's bug. It just runs in your account.

> **Your own cloud account decides where the data lives. It does not decide where the model runs, or who inside the firm can read what.**

## Do's

1. **Do ask for a list of every outbound connection** from the deployment: model calls, telemetry, license checks, updates and support tools.
2. **Do choose model routing deliberately.** A provider endpoint in your own subscription for most work, open-weight models on your own hardware for the most sensitive.
3. **Do hold the encryption keys** in your own key management service.
4. **Do agree in writing who patches what,** and how fast security fixes are applied.
5. **Do approve and log vendor support access case by case.**
6. **Do budget for infrastructure separately.** Compute, GPUs and storage now appear on your own cloud bill.

## Don'ts

1. **Don't assume "in your cloud" means "nothing leaves."** Check the outbound list.
2. **Don't skip permission design because the data is in-house.** Internal oversharing is still oversharing.
3. **Don't give the vendor standing admin rights to your account** for convenience.
4. **Don't pick a region without checking where the model endpoint runs.** Data stored in Frankfurt with model calls processed in the US is not EU-only processing.

## The Cost of Getting This Wrong

1 - You pay for control you do not get. A self-hosted platform that sends every prompt to a shared model endpoint in another region carries much of the cost of self-hosting and little of the benefit.

2 - Security reviews stall. Reviewers ask for the data-flow diagram first. A firm that cannot produce it waits.

3 - Responsibility shifts quietly. Once the platform runs in your account, an unpatched server or a misconfigured storage bucket is your incident, not the vendor's.

## How To Check Your Vendor

1. **Placement** - Which components run in our account, and which, if any, stay in yours?
2. **Outbound** - What leaves our account: model calls, telemetry, license checks, updates?
3. **Models** - Can we use a model in our own subscription, or an open-weight model on our own hardware?
4. **Keys** - Can encryption use keys we hold and can revoke?
5. **Access** - Do your staff have any standing access, and how is support access granted and logged?
6. **Operations** - Who applies updates and security patches, and how quickly?

---

Anvax deploys inside the customer's own AWS or Azure account. Models run either through Azure OpenAI or Amazon Bedrock in the customer's own subscription or as open-weight models on the customer's own hardware, and model calls never route through Anvax infrastructure. Anvax staff have no standing access, and support access is time-boxed, logged and revocable by the customer. Inside the deployment, every search is still checked against each user's permissions, because where data lives and who may read it are separate questions.

*If your security team is mapping where an AI platform's data actually flows, we are glad to walk through ours.*
