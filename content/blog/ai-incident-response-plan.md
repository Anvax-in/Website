---
title: "When AI Gets It Wrong: An Incident Response Plan"
description: "A six-step incident response plan for AI: detect, contain, assess, notify, fix, and learn when an AI tool gives a wrong answer, exposes data, or takes the wrong action."
pubDate: 2026-11-25
tags: ["AI Governance", "AI Audit", "Enterprise AI", "Compliance", "AI Security"]
draft: false
---

![An incident response plan diagram for enterprise AI tools](/assets/blog/ai-incident-response-plan.webp)

In January 2024, a customer trying to trace a parcel through DPD's online chat could not get an answer, so he started testing the chatbot instead. Within a few messages it had written a poem about how bad the company was, called DPD the worst delivery firm in the world, and sworn at him. He posted the screenshots and they spread quickly. DPD said the behavior followed a system update, that the AI element of the chat had been disabled immediately, and that it was being updated.

DPD's response is worth noticing. The company could switch off the AI part of its chat without switching off customer service, and it did so quickly. Many firms rolling out AI today could not do either. They have an incident plan for a server outage and a data breach, but not for an AI tool that gives a wrong answer, shows a file to the wrong person, or takes the wrong action.

## What Counts as an AI Incident

**A wrong answer someone acted on.** A coverage question answered from the wrong version of a policy, or a figure that was never in the source.

**Data shown to the wrong person.** An answer that drew on a document the person asking should not have seen.

**Harmful or off-brand output.** Offensive, discriminatory or embarrassing text in front of a client or the public.

**An agent that took the wrong action.** An email sent, a record changed or a file deleted that nobody intended.

**Manipulation.** Someone steering the AI with instructions hidden in a document, an email or a chat message.

## The Six Steps

**1. Detect.** Give people one obvious way to report a bad answer, and look at the reports every week.

**2. Contain.** Turn off the specific assistant, connector or agent involved, without taking everything else down. Decide in advance who may press that switch.

**3. Assess.** Find out what was asked, which documents were used, what was answered, who saw it and what was done with it. This is only possible if those records exist.

**4. Notify.** Tell the people affected and, where it applies, the client, the data protection lead and the regulator. If personal data was exposed, GDPR gives a 72-hour window to notify the supervisory authority where the breach is notifiable.

**5. Fix.** Correct the cause: permissions, source documents, configuration, instructions or the tool itself.

**6. Learn.** Record what happened and what changed, and check whether the same weakness exists anywhere else.

> **The first question in every AI incident is "what exactly did it see and say?" Plan so that question has an answer.**

## Do's

1. **Do name an owner for every AI tool and agent,** who is called first when it goes wrong.
2. **Do build a switch for each assistant, connector and agent,** so one can be turned off without the rest.
3. **Do keep records of each interaction:** user, question, documents used, model and answer.
4. **Do give users a one-click way to flag a bad answer.**
5. **Do rehearse it once.** Walk through one realistic scenario before you need it.
6. **Do fold AI into your existing incident and breach process** rather than inventing a parallel one.

## Don'ts

1. **Don't wait for a public incident** to decide who can turn a tool off.
2. **Don't rely on the AI's own account** of what it did. Check the record.
3. **Don't delete the evidence** while fixing the problem.
4. **Don't treat every bad answer as an incident.** Agree on a threshold based on who saw it and what was done with it.

## The Cost of Getting This Wrong

1 - Slow containment multiplies the damage. Every hour the tool stays on, more people see the same bad answer.

2 - Without records, the scope is unknowable. A firm that cannot say who saw what has to assume the worst.

3 - The response becomes the story. Clients judge how quickly and clearly a firm explains and fixes a problem.

## How To Check Your Setup or Vendor

1. **Switches** - Can we turn off one assistant, connector or agent without turning off everything?
2. **Records** - For any answer, can we see the user, the question, the documents used, the model and the response?
3. **Reporting** - Is there a simple way for users to flag a bad answer?
4. **Agents** - Does every agent run record its trigger, tool calls and actions?
5. **Access** - Who at the vendor can see our data during an investigation, and is that access logged?
6. **Notification** - How and how fast would you tell us about an incident on your side?

---

Anvax records every interaction with the user, the question, the documents retrieved, the model and the answer, and every agent run with its trigger and tool calls, so the first question in an incident has an answer. Vendor support access during an investigation is time-boxed, logged and revocable by the customer.

*If you are writing your first AI incident playbook, we are glad to share the scenarios we would rehearse.*
