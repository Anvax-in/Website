---
title: "Banning ChatGPT Moves the Problem. Here Is What to Give People Instead."
description: "A ChatGPT ban moves the work, not the risk. What an approved AI alternative needs: sign-in, signed data terms, live permission checks, and a full record."
pubDate: 2026-10-29
tags: ["AI Governance", "Compliance", "Enterprise AI", "AI Security", "GDPR"]
draft: false
---

![A navy and blue diagram showing that blocking ChatGPT does not stop the work, and the four tests an approved AI replacement must pass: company sign-in, signed data terms, permissions checked live, and a full record](/assets/blog/banning-chatgpt-approved-alternative.webp)

# Banning ChatGPT Moves the Problem. Here Is What to Give People Instead.

On Monday, October 26, staff at Sweden's Government Offices, the body that runs the prime minister's office and every ministry, found ChatGPT and Claude blocked on their work computers. According to Sveriges Radio's Ekot, which reported the decision the previous Friday, staff were pointed to Microsoft Copilot instead. The reason given internally was that using AI services without a contract could have consequences for information security.

The detail worth noticing is the reason. The decision did not rest on which model is better, or on whether staff should use AI at all. It rested on whether a contract governs what happens to the data once it is typed in. A 500-person firm can ask that question without a government's procurement team.

## What a Ban Actually Does

A ban stops a domain on managed devices. It does not stop the work. The client summary is still due at nine, so the work moves to a personal phone, where the firm had little visibility before and now has none. Deloitte's UK research, reported in September 2026, found almost one in ten UK workers had already used an AI tool their employer had banned or would disapprove of, and half of workers using AI had received no formal guidance.

Sweden did two things on the same day: it removed the unapproved tools and named an approved one. The second step is what makes the first one hold. A block with no replacement is, in practice, a request for people to hide what they are doing.

> **The useful question about any AI tool is whether a contract covers the data, and whether anyone can see what was asked.**

## What an Approved Alternative Has To Do

An approved tool only replaces shadow use if it is safer for the firm and at least as useful to the person. In practice that comes down to four things.

**Company sign-in.** Access goes through the firm's identity provider with single sign-on. Every question is tied to a named person rather than a personal email address, and a leaver loses access the moment their account is disabled, not when someone remembers to cancel a subscription.

**Data terms in a signed contract.** A written answer to three questions: is our data used to train models, how long are prompts and responses kept, and in which country are they stored. Business tiers of the main AI services offer terms that consumer accounts do not. The point is to have those terms signed, not assumed.

**Answers from company documents, with permissions checked.** Much of the value comes from asking about the firm's own material: the policy wording, the engagement letter, last year's file. The tool must only use documents the person asking could already open, and it must check that at the moment of each question. If permissions are copied once when documents are indexed, a colleague removed from a client team can keep getting answers from that client's files until the next sync.

There is a second, subtler failure. A tool that faithfully respects permissions will also faithfully surface everything that was overshared: the HR folder shared with the whole company in 2019, the salary spreadsheet with an anyone-with-the-link setting. Microsoft's own deployment guidance for Copilot puts an oversharing review ahead of rollout for this reason. Permission checks are only as good as the permissions they check.

**A record of every question and answer.** Who asked, when, which documents were used, which model ran, and what came back. Without it, the firm is in the same position as with shadow AI the first time a client, auditor or regulator asks how a piece of advice was produced.

## Then There Is Speed

The four requirements above are what the firm needs. The tool also has to be what the person wants. If the approved option is slower, clumsier or less capable than the free one on a phone, people go back to the phone, and the firm is paying for a tool while the data still leaves. This is the requirement most often skipped in an IT evaluation, and the one that decides whether the other four matter.

## The Cost of Getting This Wrong

First, an approved tool rolled out over messy permissions turns a hidden risk into a visible one. Staff get accurate answers built from documents they should never have been able to open, and the tool is blamed for a sharing problem that predates it.

Second, an approved tool without a full answer record leaves the firm unable to reconstruct a decision made with AI help. That is a smaller gap than shadow AI, but it is the same kind of gap.

Third, the quickest route is usually the AI that ships with the office suite, and for many firms it is a sensible start. The tradeoff is that the firm's AI governance (which models run, how long logs are kept, what a record contains) then follows that one vendor's roadmap and license tiers. That is worth deciding deliberately rather than by default.

## How To Check Any Approved-AI Option

1. **Identity** - Does it sign in only through our identity provider, and does disabling an account end access immediately?
2. **Training and retention** - Where in the contract does it say our data is not used for training, and how long are prompts kept?
3. **Location** - In which country are prompts, responses and document indexes stored?
4. **Permissions** - Are document permissions checked at the moment of each question, or copied once at indexing?
5. **Oversharing** - Given our current sharing settings, what will it surface on day one?
6. **Record** - For a single question, can we export the user, time, documents used, model and answer?

---

Anvax is a governed AI workspace designed around those six answers. It runs in the firm's own cloud account or on its own servers, signs in through the firm's identity provider, checks source-system permissions at query time so a revoked permission applies on the next question, and keeps an append-only, exportable record of every question, the documents retrieved and the answer. It works alongside the existing office suite rather than replacing it.

*If you are weighing a block against an approved alternative, we are happy to compare notes on how each option tends to play out.*
