---
title: "What Your Employees Are Actually Pasting Into AI"
description: "Shadow AI hides in personal accounts, phones, self-authorized apps and meeting bots, not just a blocked domain. How to find it in one afternoon, and what UK GDPR requires."
pubDate: 2026-10-27
tags: ["AI Governance", "Compliance", "GDPR", "AI Security", "Enterprise AI"]
draft: false
---

![What Your Employees Are Actually Pasting Into AI](/assets/blog/what-employees-paste-into-ai.webp)

It is 5:40 on a Thursday at a 400-person insurance broker. An account executive has a renewal meeting at nine the next morning and a forty-message email thread with the client, covering two claims, a premium figure and a named contact's mobile number. She copies the thread, opens ChatGPT on her phone, and asks for a one-page summary with the open questions at the top. It takes eleven seconds. Nothing in the firm's security stack saw it happen.

That scene is now ordinary. In a survey of 1,250 office workers at large companies in the US, UK, Australia and Japan, run by Wakefield Research for PagerDuty and published in June 2026, **66%** said they had used AI tools at work that they believed their company did not permit, and **88%** said they had shared work information with public tools such as ChatGPT, Claude or Gemini. PagerDuty sells into this problem, so treat the exact figures with some care, but the shape matches what IT teams describe.

Shadow AI is usually framed as a discipline problem. It is more useful to read it as a map. It shows which work people want help with, and where company data is leaving without a record.

## What Actually Gets Pasted

The same survey asked what people shared. Emails and correspondence came first at 43%, then meeting notes and summaries at 40%, customer data at 34%, and financial information or confidential documents at 31%.

None of that is exotic. It is the ordinary material of a working day: summarize this thread, tidy these notes, draft a reply to this client. Two things follow. The data is the most sensitive kind a professional-services firm holds, because it is about clients. And the demand is steady, so a ban does not remove it. It moves it.

Samsung learned this early. In 2023, within about three weeks of lifting an internal ban on ChatGPT, it found three cases of employees pasting confidential material, including source code and meeting notes, and responded by capping prompts at 1,024 bytes.

## Where It Hides

Most firms look for shadow AI in one place, web traffic logs, and find a fraction of it. There are four routes worth knowing.

**The browser on a work laptop.** DNS or proxy logs will show traffic to chatgpt.com, claude.ai or gemini.google.com. What they cannot show is whether the person was signed into a company account or a personal one, which is the difference that matters. A personal account sits under the individual's own consumer terms, and on consumer ChatGPT, conversations can be used to improve the model unless the user has switched that setting off. The firm is not a party to that agreement.

**The phone.** The renewal summary above never touched the corporate network. Content reaches a phone by being forwarded to a personal inbox, photographed off a screen, or copied through a synced clipboard. The only trace a firm usually has is the forward, visible in mail flow logs to anyone who looks for rules that auto-forward to external addresses.

**Apps that people connected themselves.** This is the route most firms miss. An AI email assistant or note tool asks the user to "Sign in with Microsoft" and requests permission to read their mail or files. If user consent is allowed in the tenant, one click gives a third party standing, delegated access to that mailbox. None of it shows up as web traffic. In Microsoft Entra ID it appears under Enterprise applications, with the permissions granted, such as Mail.Read or Files.Read.All. Google Workspace shows the equivalent under its API controls.

**Meeting bots and browser extensions.** An AI notetaker joins a client call as an attendee and sends the recording and transcript to its own servers. An AI browser extension can read every page the user opens, including the web versions of the CRM and email. Both are visible, in calendar attendee lists and in the browser management console, but only to someone who checks.

> **A block on chatgpt.com covers one of four routes, and pushes the work onto the one route with no logs at all.**

## The Cost of Getting This Wrong

First, there is no record. If a client asks what the firm did with their information, or a subject access request arrives, the firm cannot say what was sent, by whom, or where it sits now. Under **UK GDPR** the firm stays responsible for client personal data its employees pass to a third party, whether or not anyone approved the tool.

Second, the obvious fix makes visibility worse. Blocking the domain shifts use from the work laptop, where there was at least a log line, to the phone, where there is nothing. Deloitte's UK research, reported by Bloomberg in September 2026, found that half of workers using AI had received no formal guidance or training. A block without guidance or a replacement mostly teaches people to be quieter.

Third, the firm throws away the signal. The pasted material is a precise list of the tasks employees want help with. Treated only as a violation, it is lost. Treated as input, it is the best requirements document the firm will get for an approved tool.

## How To Check, In One Afternoon

None of this needs new software. An IT team can get a first honest picture with what it already runs.

1. **Web logs** - Which AI domains appear in DNS or proxy logs over the last 30 days, and how many distinct users reach each one?
2. **User-consented apps** - In Entra ID or Google Workspace, which AI apps have users approved, and do any hold mail or file permissions?
3. **Consent settings** - Can a user grant a new app access to company data without an admin approving it?
4. **Extensions** - Which AI browser extensions are installed across managed browsers?
5. **Meetings** - Which notetaker bots have joined internal or client calls this month?
6. **Forwarding** - Are any mailbox rules forwarding mail to personal addresses?
7. **Ask** - A five-question anonymous survey, sent with a clear no-blame message, asking what people use AI for and what they paste in.

The first six show where data is going. The seventh shows why, and that answer decides what an approved alternative has to do. Thursday's post covers that alternative.

---

Anvax is a governed AI workspace that firms run in their own cloud account or on their own servers. Employees sign in with their company account and ask questions over the firm's own documents, with source-system permissions checked on every query, and each question and answer is written to an append-only audit record the firm controls. It is built for the work that shows up in step seven.

*If the afternoon check turns up more than expected, we are glad to talk through what the results usually point to.*
