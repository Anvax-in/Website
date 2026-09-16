---
title: "Every Major AI Regime Asks the Same Four Questions"
description: "The EU, Colorado, Singapore and India disagree on scope, penalties and dates. They converge on four questions your AI systems have to answer on demand."
pubDate: 2026-09-16
tags: ["AI Governance", "AI Audit", "Enterprise AI", "Compliance", "Model Risk", "Data Residency"]
draft: false
---

![Every major AI regime asks the same four questions - the EU AI Act, Colorado law, Singapore guidance and India's RBI framework converging on inventory, human review, reconstructable records and incident reporting](/assets/blog/every-ai-regime-four-questions.webp)

Read the EU AI Act, Colorado's replacement AI law, Singapore's supervisory guidance for financial institutions, and India's central bank framework side by side and the first impression is incompatibility. Different scopes, different penalties, different definitions of what counts as high risk, different dates. That impression survives about an hour of reading. Underneath the vocabulary, all four are trying to answer the same evidentiary problem, and they converge on four questions that any organization running AI in production has to be able to answer on demand.

**The regimes disagree about almost everything except what your system has to be able to do.**

## Why The Convergence Is Structural

The convergence is not coordination. These texts were drafted by people who were not reading each other, on different timelines, with different political pressures behind them. They land in the same place because they inherit the same constraint: an automated system influenced a decision about a person, and at some later point somebody, a regulator, a court, the person themselves, has to establish what happened.

That requirement is not negotiable by jurisdiction. Once you accept it, the list of things you must have on hand writes itself. You need to know the system existed. You need to know a human could have intervened. You need a record of the specific decision. You need to have told someone when it went wrong. Every framework that takes the evidentiary requirement seriously arrives at those four, because there is no fifth thing that helps and no way to drop one of the four.

Notice what is absent from that list. Nobody asks how good the model is.

## 1. What Do You Have, And Where Is It Running?

Singapore's supervisory guidance for financial institutions opens on a comprehensive inventory of every AI system in use. The EU regime requires high-risk systems to be registered before they go to market. Colorado's law, which takes effect on 1 January 2027, is narrower but still assumes you can identify which automated decision-making technology touched an employment outcome.

The mechanism problem is that inventories are almost always declared rather than derived. Somebody owns a spreadsheet, and the spreadsheet is updated when a team remembers to update it. Meanwhile the actual population of AI systems grows through a different channel entirely: an engineer adds a client library to a shared internal package, a second team imports that package because it is already approved, and a model call reaches production having passed no procurement event and generated no inventory row. Nobody hid anything. The inventory was simply measuring intent while the systems were being created by dependency.

An inventory that holds up is derived from a chokepoint that cannot be routed around, which in practice means the gateway that issues credentials or the proxy every outbound model call traverses. Anything self-reported is a survey.

> **An inventory built from declarations tells you what teams remember. An inventory built from key issuance tells you what is running.**

## 2. Can A Human Actually Overturn It?

Colorado requires deployers to establish procedures for meaningful human review and to accept reconsideration requests. The EU regime requires human oversight designed into high-risk systems. Singapore's guidance asks for human review of generative outputs specifically, on hallucination and prompt injection grounds.

The word doing the work in all three is meaningful, and it is where implementations quietly fail. A reviewer who sees the model's output and a confirm button is performing ratification, not oversight. For the review to change outcomes, the reviewer has to see what the model saw: the retrieved documents, the fields that drove the score, the version of the policy in force at the time. Without that, the human is being asked to second-guess a conclusion while holding strictly less information than the system that produced it, and the predictable result is a queue of approvals that almost never diverge from the model, reported upward as human oversight.

There is a second half that gets skipped more often than the first. Overturning has to be recorded as an event, with the reason, because the reversal rate is the only real evidence that the review is functioning. A review process that produces no reversals is indistinguishable from no review process, and it is indistinguishable in exactly the way a supervisor will notice.

## 3. Can You Reconstruct One Decision?

Every regime asks for records. They disagree, substantially, about how long.

The EU sets a floor of at least six months on automatically generated logs, carried independently by the provider and the deployer. Colorado requires developers and deployers to retain relevant records for three years. Sector rules in financial services routinely run longer than either. If you operate in more than one market, none of those numbers is your requirement. The longest one is.

This is the point where the architecture decision gets expensive, and it is worth being precise about why. Retention is not a policy you can apply per jurisdiction after the fact, because the system does not know at write time which regime will eventually ask. A decision made in a shared service, for a customer whose residency changes, on a model hosted in a third country, cannot be tagged at creation with the framework that will govern its disclosure. So either you write the richest record you might ever need and keep it for the longest window you are subject to, or you accept that some requests will be unanswerable and decide in advance which ones.

Most organizations do neither deliberately. They pick a retention number from the cheapest applicable rule, discover the gap during an actual request, and then reconstruct by hand from three systems that were never designed to be joined.

> **"Which of our markets has the longest retention window, and is that the one we actually built to?"**

## 4. How Fast Can You Say It Broke?

The EU regime gives providers of high-risk systems fifteen days to report a serious incident, dropping to two days where the incident involves a widespread infringement or a serious safety risk, and ten days where a person has died. Colorado gives deployers thirty days after an adverse outcome to give the affected person a plain-language explanation of the decision and the role the technology played in it.

The important detail in all of these is where the clock starts. It starts when you become aware, not when your monitoring catches it. That moves the binding constraint out of legal and into observability, because the gap between when a system starts producing harmful output and when anyone internally knows is a detection problem that no policy document shortens.

Consider what a two-day window actually requires. You need automated detection, an owner who is reachable, a triage path that does not depend on one person being back from leave, and enough of the record from question three to establish a causal link rather than a suspicion. An organization that first learns of a problem through a customer complaint has typically burned a week before the clock formally starts, and has no reconstruction ready when it does.

The thirty-day explanation requirement is gentler on timing and harder on substance. A plain-language explanation of why a specific decision came out the way it did is not producible from a log that recorded only the outcome.

## The Four Questions And What Answers Them

| The Question | The Artifact That Actually Answers It |
| --- | --- |
| **What do you have, and where does it run?** | An inventory derived from credential issuance or the outbound gateway, with hosting location recorded per system, rather than a spreadsheet teams update voluntarily. |
| **Can a human overturn it?** | A review surface that shows the reviewer the same inputs the model used, plus reversals recorded as first-class events so the reversal rate is measurable. |
| **Can you reconstruct one decision?** | A per-decision record carrying inputs, retrieved sources with versions, the resolved model version and the output, retained to the longest window any of your markets imposes. |
| **How fast can you say it broke?** | Detection wired to a named owner, so the reporting clock starts when the system notices rather than when a customer does. |

The practical consequence of the convergence is that entering a new market should be a mapping exercise, not a build. If the four artifacts exist and are honest, a new regime asks for a different report shape over the same substrate. If they do not exist, every market is a fresh project, and the cost of the fourth one is no lower than the cost of the first.

---

The strategic error is treating governance as a per-jurisdiction compliance function rather than a property of the platform, because the per-jurisdiction version never converges and the platform version does. Anvax is built on that assumption: the inventory, the oversight surface, the per-decision record and the incident path are one system, self-hosted where residency requires it, with the regime-specific reporting sitting on top as a view rather than as a rebuild.

*If you are about to open a second or third market and are trying to work out whether your current setup maps or has to be rebuilt, that is a cheaper question to answer now than after the commitment.*
