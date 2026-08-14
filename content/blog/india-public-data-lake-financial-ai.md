---
title: "India Is Building a Public Data Lake for Financial AI. Here Is What It Changes."
description: "RBI's FREE-AI report proposed a publicly governed financial sector data lake. Why that is a market structure decision, not an infrastructure one."
pubDate: 2026-08-14
tags: ["RBI", "FREE-AI", "AI Governance", "BFSI", "Compliance"]
draft: false
---

![India is building a public data lake for financial AI - diagram showing banks, NBFCs, fintechs, regulators and academia feeding a shared public data lake](/assets/blog/india-public-data-lake-financial-ai.webp)

Ask a mid-size NBFC why its fraud model underperforms a large private bank's, and you will usually get a technical answer. Better features. Better tuning. More GPUs, eventually.

That answer is wrong, or at least it is the third most important reason. The bank has decades of labeled default, fraud, and recovery outcomes across millions of accounts. The NBFC has four years across ninety thousand. No amount of engineering closes that gap, because it is not an engineering gap. Data asymmetry is not a technology problem. It is a market structure.

Which is why the least discussed recommendation in the RBI's FREE-AI report is the one that will end up mattering most. The report turned a year old this week, and most of the commentary it generated was about the risk side: board-approved AI policies, red teaming, incident reporting. Fair enough. But Recommendation 1 was not about risk at all.

## What the RBI Actually Recommended

The FREE-AI Committee proposed that India establish a publicly governed financial sector data infrastructure, described in the report as a data lake, built as digital public infrastructure and integrated with AI Kosh, the India Datasets Platform being set up under the IndiaAI Mission by MeitY.

The reasoning in the report is unusually blunt about the current state. Financial data sits fragmented across institutions, registries, and platforms. Availability is asymmetric, with large incumbents holding datasets that smaller regulated entities simply cannot assemble. Formats are non-standard, so most of the effort in any AI project goes into collecting, cleaning, and transforming data before anyone gets to modeling.

The recommendation carries conditions worth reading twice. Privacy-enhancing technologies, anonymization, and aggregation where personal or confidential data is involved. Respect for intellectual property in proprietary datasets. Access governed by usage obligations and accountability norms in line with the National Data Sharing and Accessibility Policy. Neutral, multi-stakeholder governance shared between regulators, industry, and academia rather than a single owner. And one clause that almost nobody has picked up on: entities that train on the public data may be required to release the resulting models as open source.

It was tagged short term, addressed to regulators and government.

## A Data Lake Is Not a Dataset

This is where most of the conversation goes wrong, so it is worth clearing.

What is being proposed is not a data dump. It is not a portal where you download a CSV of aggregate credit statistics. It is not open banking under a different name, and it is not the Account Aggregator framework extended, because AA moves a specific customer's data with that customer's consent for a specific purpose. That is plumbing for individual transactions.

A sectoral data lake is a different object. It is standardized, versioned, jointly governed training substrate: consistent metadata, enforced formats, validation standards, and access rules that survive a change of government. AA answers "can I see this borrower's bank statements." A data lake answers "what does default actually look like across the Indian credit market."

Those are not the same question. Only one of them changes who can build.

## What Actually Changes

**1. The Cold Start Problem Stops Being Terminal.**

Today, a new lender's first two years are spent buying data, renting scores, or writing rules that pretend to be models. Underwriting quality is gated on portfolio vintage. A shared, standardized base layer does not hand anyone a production model, but it changes the starting line from zero to something. The gap between a five-branch cooperative and a national NBFC stops being a gap in raw access and becomes a gap in execution. That is a much fairer fight, and a much more competitive market.

**2. Standardization Is the Real Payload.**

The lake is the headline. The schema is the substance.

Anyone who has merged two lenders' loan books knows why. One institution codes a settlement as a closure reason. Another codes it as the terminal stage of delinquency. Merge them without reconciling the taxonomy and your model quietly learns that settlements are good outcomes, then goes on to approve exactly the wrong cohort with confidence. Nobody catches it in validation because the AUC looks fine.

Enforced metadata, formats, and validation standards across the sector fix a class of failure that no individual institution can fix alone. If the data lake shipped nothing but a mandatory sectoral schema and never held a single row, it would still be worth building.

**3. The Open Source Clause Reprices the Model Layer.**

Read Recommendation 1 next to Recommendation 4, which asks for indigenous financial sector models developed and offered as a public good, and a strategy comes into focus. Public data goes in. Models trained on it come back out under open licenses. The base layer becomes commodity, deliberately.

If that holds, the defensible value in Indian financial AI moves decisively away from model weights and toward everything downstream: the institution's own proprietary data, its workflow integration, its deployment posture, its ability to prove to a supervisor what a system did and why. Anyone building a business on "our model is better" should read that clause carefully.

**4. Governance Becomes the Thing Worth Fighting Over.**

Neutral multi-stakeholder governance is easy to write into a report and hard to operate. Who sits on the committee. What happens when a large bank's contributed data becomes the basis for a competitor's product. Whether contribution is voluntary or eventually mandated. How a startup with no compliance team gets access on terms it can actually meet, versus how a large group gets access on terms its legal department will sign.

Those decisions will be made in working groups over the next couple of years, largely unnoticed, and they will determine whether this ends up as genuine public infrastructure or as a shared resource that mostly benefits the institutions large enough to shape its rules.

## What It Does Not Change

Worth saying plainly, because there will be vendors this year claiming otherwise.

A public data lake gives you better training substrate. It does not give you a deployment path. Your customers' data still cannot leave your boundary, DPDP obligations still apply to every inference you run, and consent still has to be captured at the point of collection rather than reconstructed later.

None of that gets easier. If anything it gets harder, because a supervisor's follow-up question stops being "do you use AI" and becomes "which model version declined this applicant, on what inputs, and who approved that version into production." The draft guidance on model risk management the RBI circulated in June points in exactly that direction, with risk-based model tiering, model inventories, documented validation, and specific treatment for third-party models. Better raw material raises the ceiling on what you can build. It does nothing about the floor you have to prove you are standing on.

## Closing Thought

Every piece of Indian digital public infrastructure has looked underwhelming at announcement and obvious in hindsight. UPI was a settlement rail nobody outside NPCI found interesting in 2016. The interesting part was never the rail. It was that a two-person team could build a payments product on day one without negotiating with a single bank.

A financial sector data lake is that same bet, aimed at intelligence instead of payments. If it is built well, the question a lending founder asks in 2029 will not be "how do we get data to train on." It will be "what do we do that the shared layer cannot." The institutions that start answering that question now, while the schema committees are still meeting, will be a long way ahead of the ones that wait for the lake to go live and then start planning.

The part that stays yours either way is what happens inside your own boundary: your documents, your workflows, your audit trail, your proof. That is the layer we have been building Anvax for, on the assumption that the public substrate arrives eventually and the governed layer on top of it is what regulated institutions will actually be judged on.
