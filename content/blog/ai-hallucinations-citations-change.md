---
title: "Why AI Makes Things Up at Work, and What Citations Change"
description: "Real hallucination cases at a law firm, Deloitte, and Air Canada, why language models fabricate facts, and what requiring citations actually changes."
pubDate: 2026-11-10
tags: ["AI Governance", "Model Risk", "Enterprise AI", "AI Audit", "Compliance"]
draft: false
---

![Diagram contrasting a sourced AI answer with a citation back to the original document against an unsourced claim flagged "No source found"](/assets/blog/ai-hallucinations-citations-change.webp)

In 2023, two New York lawyers filed a brief in a personal injury case against the airline Avianca. It cited earlier court decisions, complete with quotes and case numbers. None of those decisions existed. One of the lawyers had used ChatGPT for research, and when he asked it whether the cases were real, it said they were. In June 2023 the judge fined the lawyers and their firm $5,000 and ordered them to write to each judge whose name had been attached to a fake opinion.

Two years later it happened at a larger firm. In July 2025, Deloitte Australia delivered a 237-page report to the Australian government's Department of Employment and Workplace Relations. A university researcher found fabricated references in it, including a quote attributed to a federal court judge and academic papers that did not exist. The revised report disclosed that a generative AI tool had been used in drafting, and Deloitte agreed to refund the final payment under a contract worth about A$440,000.

Neither case involved an unusual failure. The model did what language models do. The people involved sent the output without checking it.

## Why Models Make Things Up

A language model writes by predicting the next word from patterns in the text it has seen. It is very good at producing text that has the shape of a correct answer: a citation in the right format, a clause in the right tone, a figure in a plausible range. It has no built-in sense of whether a particular fact is true, and it does not reliably know when it does not know.

That is why hallucinations sound confident. A made-up case citation reads exactly like a real one, because the model learned the format from thousands of real ones.

Three situations make it more likely at work:

**The answer is not in the documents.** When an assistant searches company files and finds nothing relevant, the model still tends to answer, filling the gap from general knowledge or invention.

**The question asks for specifics.** Names, dates, figures, clause numbers, quotes and citations. These are exactly the details people copy into client work.

**Someone asks the model to confirm itself.** As in the Avianca case, asking "are these real?" produces another generated answer, not a check.

## What Citations Change

Most enterprise AI assistants use retrieval: they fetch relevant passages from the firm's own documents and give them to the model along with the question. Citations show which of those passages the answer relied on.

Citations do not make a model accurate. They make it checkable. A reader can open the source and see whether it says what the answer claims. A claim with no source attached becomes visible as a claim the system could not support.

> **Citations do not stop a model from being wrong. They let a person see when it is.**

Checkability matters because the responsibility does not move to the tool. In February 2024, a Canadian tribunal ordered Air Canada to pay a customer CA$812.02 after the chatbot on its website told him he could claim a bereavement fare discount after traveling, which contradicted the airline's actual policy. Air Canada argued the chatbot was responsible for its own words. The tribunal rejected that, finding the airline responsible for all the information on its website, whether it came from a static page or a chatbot.

## Do's

1. **Do require a source for every factual claim in client-facing work.** If the assistant cannot point to a document, the claim gets checked or removed.
2. **Do let the assistant say it does not know.** For questions about your firm, clients or policies, "I could not find this in the documents" is a better answer than a guess from general knowledge.
3. **Do open the citation, not just confirm it exists.** A real document cited for something it does not say is still an error.
4. **Do keep a person on high-risk outputs.** Anything that goes to a client, a court, a regulator or a board gets reviewed before it leaves.
5. **Do keep a record of what the AI produced and what it was based on,** so an error found later can be traced to its source.
6. **Do tell people where hallucinations cluster:** names, numbers, dates, quotes and citations.

## Don'ts

1. **Don't ask the model to verify its own answer.** That produces more generated text, not a check.
2. **Don't use a general chatbot for research that needs sources.** Use a tool that searches defined sources and shows them.
3. **Don't treat fluent and confident as accurate.** The style of an answer says nothing about whether it is true.
4. **Don't assume a disclaimer moves the responsibility.** The firm that sends or publishes the answer owns it.

## The Cost of Getting This Wrong

1 - The consequences land on the person who signed. Courts, clients and regulators hold the professional responsible, not the tool they used.

2 - Refunds and rework. A reissued report and a returned fee cost far more than the time it would have taken to check the references.

3 - Trust is slow to rebuild. One fabricated reference makes a client question every other line of the work.

## How To Check Your AI Tool

1. **Sources** - Does every answer show which documents it used, with a link to the passage?
2. **Grounding** - Can the assistant be limited to answering from our own documents?
3. **Gaps** - When it cannot find an answer, does it say so or fill the gap?
4. **Records** - Can we see later what was asked, what was retrieved and what was answered?
5. **Review** - Can high-risk outputs be routed to a person before they go out?

---

Anvax answers from a firm's own documents, with permission checks on every question, and every answer cites the passages it used. Each request is recorded with the user, the question, the documents retrieved, the model and the response, so when an answer is questioned months later, the firm can see exactly what it was based on.

*If you are setting review rules for AI-drafted client work, we are glad to share the checklist we start from.*
