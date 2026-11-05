---
title: "Client A's Files in Client B's Answer"
description: "AI assistants search everything a person can open, not what they should use. Here is how client confidentiality breaks inside one firm, and how to stop it."
pubDate: 2026-11-05
tags: ["AI Governance", "Enterprise AI", "AI Security", "Compliance", "GenAI"]
draft: false
---

![A diagram showing team-level permissions, a single shared assistant, carried-over memory and multi-client agents all converging on one insight: access isn't permission to use. Below, the fixes: map conflicts, scope by client, show every source, and test with conflict pairs.](/assets/blog/ai-client-confidentiality-walls.webp)

# Client A's Files in Client B's Answer

An account executive at a mid-sized insurance broker is preparing a renewal for a restaurant group. She asks the firm's new AI assistant: draft a renewal summary using the approach we took for similar clients last year. The answer is good. It is good because the assistant found the most similar file in the system, which belongs to a competing restaurant group the broker also places. Her team has access to both, because the same team handles the hospitality sector. Nobody did anything wrong. The assistant just did what similarity search does.

Leaks between companies make headlines. Inside one firm, the quieter risk is one client's information turning up in work for another client. For brokers, accountants, consultants and lawyers, that is a confidentiality breach even if nothing ever leaves the building.

## Why Client Walls Used To Work

Most firms rely on a mix of formal and informal walls between clients. Some are real permissions: a separate site or folder per client, a matter-based document system. Many are discretion. The hospitality team can technically open every hospitality client's folder, but people only open the one they are working on, and they would never copy one client's terms into another client's proposal.

An AI assistant has no discretion. It searches everything the person asking is allowed to open and ranks results by how similar they are to the question. It does not know that two clients compete, that a file was shared with the team for one engagement only, or that "similar clients" is exactly the phrase that should stop it.

> **Permissions decide what a person can open. Client walls decide what a person should use. AI only sees the first.**

## How It Leaks

**Team-level permissions.** Access is granted per team or per sector, not per client, so the assistant can draw on every client the team has ever handled.

**One assistant over everything.** A single company-wide assistant connected to the whole document store, built so it "knows everything," mixes every client into one search.

**Conversation memory.** A chat that started on Client A and moved to Client B carries A's details forward. Memory features that remember facts across conversations do the same over weeks.

**Agents working across clients.** A scheduled agent that processes several clients in one run, with shared state between them, can carry one client's figures into the next client's output.

**Prompt instructions as the barrier.** Telling the model "only use documents for this client" is a request, not a control. The documents are already in front of it.

## Do's

1. **Do map your walls before connecting any source.** Write down which clients compete or conflict, and which teams must never see which clients.
2. **Do set permissions at the client level in the source systems.** If the walls only exist in people's heads, the AI cannot respect them.
3. **Do scope assistants and workspaces per client or per conflict group.** Retrieval should only search the sources that workspace is connected to.
4. **Do show sources on every answer.** If each answer lists the documents it used, an employee can see at a glance that a competitor's file was drawn on.
5. **Do run agents one client at a time.** Separate runs, separate state, credentials scoped to that client's data.
6. **Do test with conflict pairs.** Sign in as someone on Client A's team and ask questions that Client B's files would answer well. Whatever comes back is your real wall.

## Don'ts

1. **Don't build one assistant over the whole document store** and rely on permissions alone.
2. **Don't use the prompt as the wall.** "Only use this client's files" belongs in the retrieval scope, not in the instructions.
3. **Don't carry conversations across clients.** Start a new conversation per client, and be careful with memory features that persist between sessions.
4. **Don't assume anonymizing by hand is enough.** A competitor's renewal terms are identifiable from the numbers alone.

## The Cost of Getting This Wrong

1 - The breach is invisible to the client until it isn't. A competitor's pricing or claims history in a proposal is the kind of thing a client notices, and it is very hard to explain.

2 - It undermines the reason clients trust you. Brokers, accountants and advisers are hired partly because they handle competing clients' information without mixing it. An AI tool that blurs that line erodes the core promise.

3 - The audit question has no answer. Without a record of which documents fed which answer, the firm cannot show whether a client's information was used elsewhere.

## How To Check Your Setup or Vendor

1. **Scope** - Can an assistant or workspace be limited to specific clients' sources, not just to what the user can open?
2. **Permissions** - Are permissions checked per document at the moment of each question?
3. **Citations** - Does every answer show which documents it used?
4. **Memory** - Can conversation memory be turned off, or limited to one workspace?
5. **Agents** - Does each agent run keep its own state, with access limited to one client?
6. **Records** - Can we see, months later, which documents were used to produce a given answer?

---

Anvax lets an admin build workspaces and assistants scoped to selected sources, so a team working on one client searches only that client's material. Permissions are checked against the source system on every question, every answer cites the documents it used, and each request is recorded with the documents retrieved, so a firm can later show which client's files fed which piece of work.

*If you are mapping client walls before an AI rollout, we are happy to compare notes on how other firms structure them.*
