# Security page copy — draft for `/trust` rewrite

*Drop-in copy for the security-reviewer version of the trust page. Written against the v2 positioning brief. Everything here describes the product as it is; where a control is planned rather than shipped, it is marked (planned) so nobody over-claims to a CISO. Review those markers before shipping.*

## Hero

**Eyebrow:** Security & Architecture

**Headline:** Built to pass your security review, not just your demo.

**Sub:** Tenant isolation, read-only connectors, scoped retrieval, and an immutable audit trail — running inside your cloud or your data centre. Nothing leaves your perimeter, and everything the AI does is written down.

**CTAs:** Send this page to your security team · Download the architecture report (PDF)

## Six controls, in plain English

**Deployed inside your perimeter.** Anvax runs in your AWS, Azure, or GCP account, on a sovereign-cloud partner in your region, or on-prem with no outbound network. We never hold your data. There is no Anvax-side copy to breach.

**Read-only connectors by default.** Connectors pull documents and records; they do not write back. Write actions (creating a ticket, drafting into a system of record) are off until an admin enables them per connector, and every enabled write goes through an approval step.

**Tenant and workspace isolation.** Postgres row-level security and per-tenant encryption keys separate every customer and every workspace. Retrieval is scoped by the user's permissions at query time, so a user cannot surface a document through chat that they could not open directly.

**Identity you already run.** SSO via SAML/OIDC, SCIM provisioning, role-based access (Owner, Admin, Member, Guest), and per-workspace connector scoping. A finance workstream sees finance systems; a sales workstream does not.

**Encryption and key control.** TLS in transit, encryption at rest, customer-managed keys on the private-cloud and on-prem tiers. Secrets for connectors are stored encrypted and never exposed to the model.

**No training on your data. Ever.** Models run in your tenant (open-weight self-hosted, or Azure OpenAI / Bedrock inside your own account). Prompts, documents, and outputs are not used to train any model, and there is no shared model across customers to leak into.

## Three real questions

**The CISO asks: "What can the AI actually reach?"**
Only what the signed-in user can already reach. Every retrieval is permission-checked against the source system's ACLs at query time, not at index time, so a revoked permission takes effect immediately. Connector scope is set per workspace by an admin. On the on-prem tier, egress is blocked at the network layer; the model cannot call out even if prompted to.

**The General Counsel asks: "If a regulator asks what the AI said and why, can we answer?"**
Yes, from the audit log. Every query records the user, timestamp, the exact documents retrieved (with versions), the model and prompt template used, the answer, and any approvals on write actions. The log is append-only and exportable. This is the same trail we map to SOC 2, ISO 27001, EU AI Act record-keeping, and RBI FREE-AI.

**The auditor asks: "Show me a control, not a slide."**
Pick one. Retrieval scoping, audit immutability, key custody, and connector write-gating each map to a named control in the framework tabs below, with the implementing component and how to test it. We would rather you test it than trust it.

## Certification status

*Honest, dated, updated as things change.*

| Framework | Status | Note |
| --- | --- | --- |
| GDPR | Ready | DPA available; data stays in-region; DSR support (planned tooling) |
| SOC 2 Type I | In progress | Target date: [set] |
| ISO 27001 | In progress | Target date: [set] |
| EU AI Act | Mapped | Record-keeping, transparency, and human-oversight controls mapped for deployer obligations |
| NIST AI RMF | Mapped | Govern / Map / Measure / Manage mapping available |
| DORA | Mapped | ICT third-party risk controls relevant to self-hosted deployment |
| RBI FREE-AI | Mapped | Full control mapping; origin framework |
| DPDP Act 2023 | Controls implemented | India residency and consent controls |

## Framework mappings

*(Tabs: SOC 2 · ISO 27001 · GDPR · EU AI Act · NIST AI RMF · DORA · RBI FREE-AI · DPDP. Each tab: control → implementing component → how to verify. Reuse the existing FREE-AI mapping table as the template.)*

## FAQ

**Where does our data live?**
In your cloud account, your sovereign-cloud partner's region, or your data centre. Anvax does not host customer data on any tier.

**Does anything leave our environment?**
On the private-cloud and sovereign tiers, only licence heartbeat and, if you opt in, anonymised telemetry (counts, not content). On the on-prem tier, nothing; updates ship as signed bundles you apply.

**Which models run, and where?**
Your choice: open-weight models on your own GPUs, or Azure OpenAI / Amazon Bedrock inside your own subscription so the provider's tenant-isolation and no-training terms apply. Model calls never route through Anvax infrastructure.

**Can Anvax staff see our data?**
No. We have no standing access to any deployment. Support access, when you request it, is time-boxed, logged, and revocable by you.

**How is access controlled?**
SSO (SAML/OIDC), SCIM, four built-in roles, per-workspace connector scoping, and permission-aware retrieval that checks source-system ACLs on every query.

**Is the audit log tamper-evident?**
The log is append-only with hash chaining; entries cannot be edited or deleted through the application. Export to your SIEM (planned: native connectors; today: scheduled export).

**How do you handle PII?**
Configurable redaction at ingest and at prompt time for common identifiers (national IDs, card numbers, health identifiers), with per-region patterns. Redaction events are logged.

**What about prompt injection and data exfiltration through the model?**
Retrieval is scoped before the model sees anything, write actions are approval-gated, and on-prem deployments have no egress. We treat the model as untrusted; the controls sit around it, not inside it.

**Do you sign a DPA? Do you have a subprocessor list?**
Yes to both. On self-hosted tiers the subprocessor list is short because there are almost none. Request both from the link below.

**Can our security team review the architecture before we commit?**
That is the intended path. Download the architecture report, send us your questionnaire, and we will walk your team through a live deployment.

## Closing CTA

**Ready for your security team to review us?**
Download the architecture report · Request DPA and subprocessor list · Book a security walkthrough
