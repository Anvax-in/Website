---
title: "Your Vendor's Certification Does Not Discharge Your Obligation"
description: "A vendor's SOC 2 or ISO 27001 report is evidence about the vendor, not a compliance claim about your organization. Here is what to actually check."
pubDate: 2026-09-29
tags: ["AI Governance", "AI Audit", "Compliance", "SOC 2", "GDPR", "DORA"]
draft: false
---

![Header image for Your Vendor's Certification Does Not Discharge Your Obligation](/assets/blog/vendor-certification-not-compliance.webp)

A **SOC 2 Type II** report is an independent auditor's opinion on whether a service organization's controls were suitably designed and operated effectively over a defined period. An **ISO/IEC 27001** certificate confirms that an organization runs an information security management system within a stated scope. Both are useful. Neither is a statement about the customer. They describe the vendor's controls, inside boundaries the vendor defined, during a period that has usually already ended. **A vendor's certification is evidence about the vendor. Compliance is a claim about the organization using it.**

## What a Certification Actually Covers

Procurement often treats a current SOC 2 report as a pass. The report itself is more careful than that. It has a system description that defines what was examined, a list of controls the customer is expected to operate, a treatment of the vendor's own suppliers, and the auditor's test results, including any exceptions found.

Regulators put accountability with the organization regardless. Under **GDPR Article 28(1)**, a controller may only use processors that provide sufficient guarantees, and the controller stays responsible for the processing. Under **DORA Article 28(1)**, financial entities remain fully responsible for compliance with their obligations when they use ICT third-party services. A certificate can support that responsibility. It cannot take it over.

> **The question is not whether the vendor passed an audit. It is which of the controls that matter were in the audit at all.**

## Scope: What the System Description Leaves Out

Every SOC 2 report begins with a description of the system under examination: its services, infrastructure, software, people, and data. Controls outside that boundary were not tested.

AI features are often where scope falls behind. A vendor may have held a SOC 2 report on its core platform for years and added an AI assistant, a hosted embedding service, or a new inference region since the last examination period. The report is current. The AI feature was never in it. Reading the system description for the specific components that will process the organization's data is the only way to know.

## Complementary User Entity Controls: The Customer's Half

SOC 2 reports list **complementary user entity controls**: controls the auditor assumed the customer would operate for the vendor's controls to achieve their objectives. Typical entries cover reviewing user access, configuring authentication, and protecting credentials issued by the vendor.

For an AI platform, the customer's half carries most of the data exposure. A retrieval connector runs under a service account that the customer creates and scopes. If that account has read access to every shared drive in the organization, the platform can index everything it can reach, and every control in the vendor's report can still be operating as described. The report is accurate. The exposure is on the customer's side of the line.

> **A connector with organization-wide read access is not a vendor control failure. It is a customer control the report told you to own.**

## Subservice Organizations: The Model Behind the Report

Vendors rely on their own suppliers: cloud hosting, and for AI platforms, often a third-party model provider. A SOC 2 report can either include those suppliers' controls or carve them out. Under the **carve-out method**, the subservice organization's controls are excluded from the examination, and the report lists what the vendor expects of that supplier.

When the model provider is carved out, the report says nothing tested about how prompts are handled once they leave the vendor. Retention of prompts, use of data for training, and the processing location at the model provider all sit outside the opinion.

## Timing: A Report About the Past

A Type II report covers a review period that has already ended by the time the report is issued, and it may be months old by the time procurement reads it. Vendors often supply a **bridge letter** stating that no material changes have occurred since the period ended. A bridge letter is the vendor's own statement, not the auditor's.

AI platforms change quickly. A new model provider, a new region, or a new logging pipeline added after the period ended is outside both the report and, unless it is mentioned, the bridge letter.

## The Cost of Treating the Report as a Pass

First, untested components go into production. The AI feature processing the most sensitive data may be the one component the report never examined.

Second, customer controls go unassigned. Complementary user entity controls only work if someone at the customer owns each one. When the report is filed as a vendor matter, nobody does, and the connector keeps its broad scope indefinitely.

Third, the evidence gap arrives during an examination. When a regulator or customer asks how the organization governs a specific AI system, the vendor's report answers a different question. Assembling the organization's own evidence at that point means reconstructing access reviews and configuration decisions after the fact, which is slower and less convincing than having kept them.

## How To Check

Take the current SOC 2 report for one AI vendor and answer five questions.

1. **Scope** - Does the system description name the AI components, model endpoints, and regions that will process your data?
2. **Your controls** - Is each complementary user entity control assigned to a named owner inside your organization?
3. **Carved-out suppliers** - Is the model provider carved out, and if so, what separate evidence covers its handling of prompts?
4. **Exceptions** - Did the auditor report exceptions in the test results, and do any touch access, change management, or logging?
5. **Currency** - When did the review period end, and what has changed in the AI features since?

---

Anvax is designed to be deployed in the organization's own environment, so that the controls an examiner asks about, including connector scope, access to retrieved content, and the audit record, are operated and evidenced by the organization itself rather than inferred from a vendor report.

---

*If a SOC 2 report is currently standing in for an AI vendor review, reading its complementary user entity controls against your own configuration is a practical first step.*
