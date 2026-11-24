---
title: "What a Company Brain Actually Needs"
description: "What a 'company brain' AI actually needs to work: reach across systems, live permissions, freshness, linked data, and cited sources on every answer."
pubDate: 2026-11-24
tags: ["Enterprise AI", "AI Governance", "Compliance", "AI Security", "GenAI"]
draft: false
---

![Diagram showing a company brain hub connected to email, documents, chat, tags and permissions icons, feeding a search panel with a cited answer](/assets/blog/what-a-company-brain-actually-needs.webp)

A senior account manager retires after eighteen years. Her clients are handed over with a folder each. What does not get handed over is why the terms with one client are what they are, which carrier quietly stopped writing a certain kind of risk, and who to call when a particular finance director goes quiet. That knowledge was never in one place. Some of it was in email, some in meeting notes, some in contracts, and most of it in her head.

Every firm has a version of this problem. A 2012 McKinsey Global Institute report estimated that knowledge workers spend about 19% of their time searching for and gathering information. The information usually exists. It is spread across a dozen systems and a few hundred people.

"Company brain" is the phrase now used for an AI that fixes this: a system that can answer questions about the firm the way an experienced colleague would. What do we know, where is it, who decided what and why, and what has changed since. It is a useful idea. It is also easy to sell as something simpler than it is.

## Five Things a Company Brain Needs

**Reach.** It has to be connected to where work actually happens: the document store, email, chat, tickets, the CRM, the systems specific to the firm. A brain connected to one shared drive knows one shared drive.

**Permissions.** It has to know who can see what, at the moment of each question. A brain that tells everyone everything is not intelligence. It is a leak with a search box.

**Freshness.** It has to stay current. Documents change, policies are superseded and people move roles. An answer drawn from last year's version is confidently wrong.

**Relationships.** A firm's knowledge is connected: a client has contracts, projects, contacts, claims and a history with particular people. Similarity search finds passages that sound like the question. Understanding that a contract, a client and a person are linked takes more, and this is where most tools still fall short.

**Sources.** Every answer has to show where it came from. A brain you cannot check is a brain nobody will trust with real work.

> **A company brain is not a model that has read everything. It is a system that knows where everything is, who may see it, and what it says today.**

## What a Company Brain Is Not

**It is not a model trained on your documents.** Training bakes in a snapshot. It cannot respect per-person permissions, it goes stale the day after, and it cannot point to a source.

**It is not one big folder.** Copying everything into a single store breaks the permissions that lived in the original systems.

**It is not a replacement for your experts.** It makes their written knowledge reachable, so their time goes to judgment instead of repeating answers.

## Do's

1. **Do start with the systems where answers are actually hunted for,** not the ones that are easiest to connect.
2. **Do keep permissions from the source systems** and check them on every question.
3. **Do decide how superseded documents are handled** before connecting them, so old versions do not win.
4. **Do require a source on every answer,** with a link to the passage.
5. **Do capture decisions where they are made:** a short note of what was decided and why, in a place the system can reach.
6. **Do measure it by questions answered,** such as time to find a policy or onboard a new joiner.

## Don'ts

1. **Don't fine-tune a model on company documents to make it "know the business."** Use retrieval with permissions and sources.
2. **Don't connect everything on day one.** Start with three or four systems people search most.
3. **Don't let the brain answer from general knowledge** when a question is about your firm and nothing internal was found.
4. **Don't treat it as a project that finishes.** Systems, people and documents change every month.

## The Cost of Getting This Wrong

1 - Knowledge keeps walking out of the door. Every retirement and resignation takes context the firm paid years to build.

2 - A brain without permissions becomes a liability. One answer that exposes salaries, client terms or HR files can end the project.

3 - Stale answers erode trust fast. After a few confidently wrong answers, people go back to asking colleagues.

## How To Check Your Vendor

1. **Reach** - Which of our systems can you connect to today, and how often do you sync each one?
2. **Permissions** - Are permissions checked against the source system at the moment of each question?
3. **Freshness** - How are deleted or superseded documents handled?
4. **Relationships** - How does the system link clients, projects, people and documents, beyond text similarity?
5. **Sources** - Does every answer cite the passages it used?
6. **Records** - Can we see later what was asked, what was used and what was answered?

---

Anvax is built as that layer for a firm. It connects to the systems where knowledge lives, checks each user's permissions at the moment of every question, cites the documents behind each answer, and runs assistants and agents on the same connected knowledge, with every interaction recorded inside the customer's own deployment.

*If you are mapping where your firm's knowledge actually lives, we are glad to share the first questions we ask.*
