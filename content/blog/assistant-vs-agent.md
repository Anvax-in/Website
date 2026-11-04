---
title: "An Assistant Answers. An Agent Does the Work."
description: "The word 'agent' now covers everything from a chatbot to a system that rewrites your files. Here is what actually separates the two and why it matters for governance."
pubDate: 2026-11-04
tags: ["AI Governance", "Enterprise AI", "AI Audit", "Model Risk"]
draft: false
---

![A diagram contrasting an AI assistant (answers questions) with an AI agent (takes actions across systems)](/assets/blog/assistant-vs-agent.webp)

There is a word that gets used for almost every AI product right now: agent. A chatbot that answers questions is called an agent. A tool that drafts an email when you ask is called an agent. A system that watches a calendar, reschedules conflicting meetings, emails the affected people, and updates the project plan is also called an agent. These are not the same thing, and the difference matters when you are deciding what to buy, what to build, and what to let run without supervision.

## What an Assistant Actually Does

An assistant waits for a question and answers it. It reads documents, summarizes them, drafts replies, explains things. Every action it takes is in response to something you typed. When the conversation ends, it stops.

The value is real. A person who would have spent an hour reading a contract can read a summary in two minutes and ask follow-up questions. A person who would have drafted a policy document from scratch can start from a structured draft and edit it. The assistant does work. But it does it only when asked, only in that moment, and only in text.

## What an Agent Actually Does

An agent takes a goal, breaks it into steps, and executes them using tools. It can read and write files, call APIs, send emails, update records, trigger other systems, and loop until the goal is done or it gets stuck.

The difference is not the interface. It is what happens after the first step.

An assistant stops after generating text. An agent uses the text to decide what to do next, does it, checks the result, and continues. When it finishes, something in the world has changed: a file is updated, a ticket is closed, a report has been sent.

## Why the Distinction Matters in Practice

**Supervision requirements are different.** An assistant produces a draft you review before anything happens. An agent acts on your systems directly. A missed instruction or an unexpected edge case in an assistant produces a bad draft. In an agent, it produces a real action that may be hard to reverse.

**Failure modes are different.** An assistant that misunderstands a question gives you a wrong answer. An agent that misunderstands a goal may complete several steps before anyone notices, and some of those steps may have changed things outside the system.

**The right question changes.** For an assistant: is the output accurate and useful? For an agent: what can it touch, how far can it go, what triggers a pause for human review, and what does the audit record say it did?

## Do's

1. **Do use assistants for work where a human reviews the output before acting.** Drafts, summaries, analysis, answers to questions.
2. **Do use agents for work that is repetitive, rules-based, and well-defined.** The fewer the edge cases, the safer the automation.
3. **Do set explicit boundaries for agents.** Which systems can it write to? Which can it only read? What requires a human approval step?
4. **Do keep a full audit log of agent actions.** Every tool call, every system it touched, every decision point.
5. **Do start agents on low-stakes tasks.** Run them in read-only mode first. Expand permissions after the behavior is understood.

## Don'ts

1. **Don't call something an agent because it uses a large language model.** A chatbot with a better prompt is still a chatbot.
2. **Don't give agents write access to production systems until the failure modes are mapped.** Read access first.
3. **Don't assume an agent that works in testing will behave the same in production.** Real data has edge cases that test data does not.
4. **Don't skip the approval step for consequential actions.** An agent that can send an email to a client, update a contract, or close a ticket should pause for confirmation on anything outside normal parameters.

## The Governance Question

The question is not whether to use agents. It is what a specific agent is allowed to do, what it must ask before doing it, and what record it leaves of what it did.

An assistant that answers questions has a simple governance model: review the answer before acting on it. An agent that takes actions across your systems needs a different model: defined scope, logged actions, approval gates on consequential steps, and a way to see after the fact exactly what ran and why.

---

Anvax separates assistants and agents in the product. Assistants answer questions from your documents. Agents can be triggered by a schedule, an event, or an API call, run through a defined set of tool calls, and require a human approval step before any action that changes a system. Every agent run is logged: which tools were called, what they returned, what the agent decided to do next.

*If you are mapping what governance looks like for agents in a regulated environment, we are glad to compare notes on what approval gates and audit records others have found useful.*
