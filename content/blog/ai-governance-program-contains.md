---
title: "What an AI Governance Program Actually Contains"
description: "AI governance sounds like a large program with a committee and a framework. For a few hundred people, it needs six things that work."
pubDate: 2026-11-05
tags: ["AI Governance", "Enterprise AI", "AI Audit", "Compliance", "GenAI"]
draft: false
---

![A diagram showing the six parts of an AI governance program: an AI inventory with owners, risk, and status for each tool; a one-page usage policy; and controls including company sign-in, permission checks, retention settings, and a record of every answer.](/assets/blog/ai-governance-program-contains.webp)

At the end of a board meeting, a director turns to the IT director of a 500-person firm and asks: what is our AI governance? The honest answer, at most firms that size, is a policy document from last year, a Copilot pilot, and a sense that people are probably using ChatGPT. The question will come back next quarter, and the answer will need to be better.

AI governance sounds like a large program with a committee and a framework. For a firm of a few hundred people, it does not need to be. It needs six things that work, kept up to date. Most of the public frameworks, including the NIST AI Risk Management Framework and the ISO/IEC 42001 standard for AI management systems, describe a larger version of the same core.

## What Governance Is For

AI governance answers three questions at any moment: what AI is in use, who is responsible for each use, and how the firm would know if something went wrong. A program that answers those three clearly is governance. A program that cannot is a policy document.

A policy says what people should do. Governance shows what the firm actually knows and controls.

## The Six Parts

1. An inventory. A list of every AI tool and use in the firm: approved assistants, AI features inside existing software, agents, and the main unapproved tools people are known to use. For each one, the owner, the users, what data it touches, and where that data goes. Everything else depends on this list.

2. A short usage policy. One page that people will read. What data may go into which tools, what may never go into any public tool, and where to ask when unsure. Long policies are written for auditors. Short ones change behavior.

3. Named owners. One accountable executive for AI overall, and one named owner for each tool or agent. The owner approves changes, reviews access, and answers when something goes wrong.

4. Risk tiers. Not every use needs the same controls. A tool that drafts internal meeting notes is low risk. An agent that sends documents to clients, or an assistant used for advice that clients rely on, is high risk. Two or three tiers, decided by what data is involved and what the output affects, keep effort where it matters.

5. Controls inside the tools. This is where governance becomes real. Company sign-in, permission checks on what each person can reach, data kept within agreed boundaries, retention settings, and a record of what was asked and answered. A rule that is not backed by a setting in the tool is a request.

6. Records and review. A log of incidents and near misses, a review of the inventory and access every quarter, and a short report to leadership. This is what lets the IT director answer the board question with facts instead of reassurance.

## Do's

1. Do start with the inventory, even if it is incomplete. A list with gaps is better than no list.
2. Do tie each rule in the policy to a control in a tool wherever possible.
3. Do scale controls to the risk tier, so low-risk uses are easy and high-risk uses are checked.
4. Do train people briefly and often. Since February 2025 the EU AI Act has required organizations that use AI to take measures supporting their staff's AI literacy. The July 2026 Digital Omnibus amendment softened the wording but kept the duty, and short, practical guidance is what changes behavior anywhere.
5. Do report to leadership on a fixed schedule, with the same few measures each time.

## Don'ts

1. Don't start with a committee and a 40-page policy. Start with the list and the owners.
2. Don't govern only the approved tools. The unapproved ones belong in the inventory too.
3. Don't buy a governance platform before you know what you are governing.
4. Don't treat governance as a one-off project. Tools, teams and models change every quarter.

## The Cost of Getting This Wrong

1 - The board question has no answer. Without an inventory and records, every answer to "what is our AI exposure?" is a guess.

2 - Rules without controls fail quietly. People follow a policy until it is inconvenient. Settings in the tools hold either way.

3 - Clients and regulators ask before you are ready. Security questionnaires, client due diligence and regulators increasingly ask how AI is governed. A firm that has to build its answer on demand loses time and credibility.

## How To Check Where You Stand

1. **Inventory** - Could we list every AI tool in use, with an owner, by the end of this week?
2. **Policy** - Is there a one-page usage policy that most employees have actually seen?
3. **Ownership** - Does every AI tool and agent have a named owner?
4. **Tiers** - Do we know which uses are high risk, and are they controlled differently?
5. **Controls** - Which rules in the policy are enforced by a setting in a tool?
6. **Records** - Could we show the last quarter's incidents, access reviews and changes?

---

Anvax covers the controls part of that list for the AI work it runs. Assistants and agents sit in one workspace, each with its own scope of sources and tools. Access goes through company sign-in with permission checks on every question, and every interaction is recorded with the user, the question, the documents used, the model and the answer. That makes parts 1, 5 and 6 a matter of reading what the system already holds.

*If you are preparing an answer to the board's AI question, we are happy to walk through what a useful first inventory looks like.*
