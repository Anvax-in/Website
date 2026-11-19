---
title: "What an AI Agent Should Be Allowed to Do on Its Own"
description: "Instructions tell an agent what to do. Permissions decide what it can do. A four-tier framework for scoping what your AI agents are allowed to act on."
pubDate: 2026-11-19
tags: ["AI Governance", "Enterprise AI", "AI Audit", "Model Risk", "GenAI"]
draft: false
---

![Four permission tiers showing what an AI agent should be allowed to do on its own](/assets/blog/what-an-ai-agent-is-allowed-to-do.webp)

# What an AI Agent Should Be Allowed to Do on Its Own

In July 2025, the founder of SaaStr, Jason Lemkin, was nine days into a public experiment building an app with Replit's AI coding agent. He had put the project into a code freeze and told the agent, in capitals, to make no more changes without permission. The agent then ran destructive commands against the live production database, which held records for more than a thousand executives and companies. It went on to say the data could not be recovered. That was wrong. Lemkin restored it with a rollback. Replit's CEO called the deletion unacceptable and said it should never be possible.

The useful lesson is not that the agent misbehaved. It is that the freeze was an instruction, and the agent's permissions said something else. When the two disagreed, the permissions won.

## Instructions Are Not Controls

An agent reads its instructions the way it reads everything else: as text that shapes what it is likely to do next. Most of the time that works. Under pressure, with an unexpected result or a long task, it can stop working. A rule that matters has to live where the agent cannot argue with it: in what its credentials can reach and which actions need someone else's approval.

> **Tell an agent what to do in its instructions. Decide what it can do in its permissions.**

## Four Permission Tiers

**Tier 1 - Read.** Search, read and summarize. The agent changes nothing. A daily digest of new contracts or a summary of open tickets sits here.

**Tier 2 - Draft.** The agent produces something for a person: an email in drafts, a report in a review folder, a proposed change to a record. Nothing reaches anyone outside the firm, and nothing is changed until a person acts.

**Tier 3 - Act with approval.** The agent prepares an action and a named person approves it before it runs: sending the email, updating the record, filing the document. The approval is part of the system, not a line in the instructions.

**Tier 4 - Act alone.** The agent completes the action itself. Reserve this for actions that are reversible, internal, low impact and already proven many times at tier 3, such as tagging a ticket or posting a summary to an internal channel.

## Deciding the Tier

Four questions place almost any action:

1. **Can it be undone?** Deleting, sending and paying cannot be undone easily. Labeling and drafting can.
2. **Who sees the result?** Anything that reaches a client, a regulator or the public starts at tier 3 at most.
3. **What does it touch?** Money, personal data, permissions and production systems start at tier 3 at most.
4. **What is the track record?** An action moves up a tier only after it has run correctly, with approval, enough times to trust it.

## Do's

1. **Do give each agent its own identity and credentials,** scoped to the systems and actions its job needs.
2. **Do start every new agent at read or draft,** and move actions up one at a time.
3. **Do put approvals in the system,** with a named approver, not in the prompt.
4. **Do record every run:** the trigger, each tool call, what it returned, and what the agent did next.
5. **Do set limits:** how many records an agent can change in one run, how much it can spend, how long it can run.
6. **Do keep a stop button** that any owner can press without asking engineering.

## Don'ts

1. **Don't let an agent use a person's own account.** It inherits everything that person can do.
2. **Don't grant write access "for later."** Add it when an approved action needs it.
3. **Don't let agents change their own permissions** or the instructions of other agents.
4. **Don't trust an agent's report of what it did.** Check the record of what it actually ran.

## The Cost of Getting This Wrong

1 - Irreversible actions happen at machine speed. An agent can send, delete or change hundreds of things before a person notices.

2 - The agent's account of events can be wrong. Without an independent record, the firm cannot say what happened.

3 - Accountability lands on the firm. Clients and regulators will not accept that an agent acted on its own as an explanation.

## How To Check Your Vendor

1. **Identity** - Does each agent run with its own scoped credentials, or as a user?
2. **Tiers** - Can we set, per agent and per tool, whether it may read, draft, act with approval or act alone?
3. **Approvals** - Are approvals enforced by the system, with a named approver?
4. **Records** - Does every run record the trigger, tool calls, results and actions?
5. **Limits** - Can we cap the number of changes, spend and run time?
6. **Stopping** - Can an owner pause or stop an agent immediately?

---

Anvax agents run through a tool gateway that gives each agent a defined set of tools. Connectors are read-only by default, and any tool marked as needing approval is blocked rather than run, so today Anvax agents read, reason and hand their drafts to a person. Every run is recorded with its trigger, the tools it called and what they returned.

*If you are deciding which tasks your first agents should take on, we are happy to walk through how we would tier them.*

---
