---
title: "The Connector Account That Can Read Everything"
description: "AI connectors to SharePoint or Google Workspace often get tenant-wide application access on one credential, far more than any single user has."
pubDate: 2026-11-12
tags: ["AI Security", "AI Governance", "Enterprise AI", "Compliance", "GenAI"]
draft: false
---

![A diagram showing how an AI connector's application access can read an entire tenant, versus the delegated access a single signed-in user has](/assets/blog/connector-account-read-everything.webp)

# The Connector Account That Can Read Everything

To connect SharePoint to a new AI tool, an IT admin follows the setup guide and clicks "Accept" on a Microsoft consent screen. The app asks to read all sites. From that moment, the app can read every document in every SharePoint site in the company, whoever is asking, at any time. The AI tool then promises to show each user only what they are allowed to see. That promise is now the only thing standing between any employee and the entire tenant.

Most conversations about AI data access focus on what each user can see. The connector that feeds the AI usually has far more access than any user, and it gets much less scrutiny.

## How Connectors Get Their Access

There are two broad ways an app can reach Microsoft 365 or Google Workspace data.

**Delegated access** works on behalf of a signed-in person. The app can only reach what that person can reach.

**Application access** works without any signed-in person. The app has its own identity and its own permissions. In Microsoft 365, permissions like Sites.Read.All or Files.Read.All granted as application permissions cover the whole tenant. In Google Workspace, domain-wide delegation lets a service account act as any user in the domain.

AI search tools often need application access, because they index documents in the background. That is reasonable. The problem is how much they ask for, and that the access sits on one credential.

## How It Leaks

**Tenant-wide read when a few sites would do.** The tool needs the policy library and three client sites. It is granted every site.

**Write access nobody needed.** Read-write permissions requested "for future features" turn an AI connector into something that can change or delete documents.

**One secret, kept somewhere ordinary.** The connector's client secret sits in a configuration file or environment variable. Anyone who gets it gets the connector's access, with no user sign-in and often no multi-factor prompt.

**One connector shared across everything.** A single connection serves every workspace, team or client, so a scoping mistake anywhere exposes everything the connector can read.

**The permission layer above it fails.** The AI product re-applies user permissions on top of the connector's broad access. If that layer has a bug, as in the cross-tenant incidents covered last week, the connector's full reach is what leaks.

> **The AI shows each user only what they can see. The connector behind it can see everything. Plan for the day those two disagree.**

## Do's

1. **Do grant access to specific sites, not the whole tenant.** In Microsoft 365, the Sites.Selected permission gives an app no SharePoint access by default. An admin then grants it read access to named sites only.
2. **Do grant read-only access** unless a specific, approved feature needs write.
3. **Do use certificates instead of client secrets** where the platform supports it, and rotate credentials on a schedule.
4. **Do use a separate connection per environment and, where it matters, per workspace or client group,** so one mistake has a limited reach.
5. **Do review consented apps quarterly** in Entra ID or the Google Admin console, and remove what is no longer used.
6. **Do monitor the connector's sign-ins.** An app identity reading at unusual times or from unusual places is an early warning.

## Don'ts

1. **Don't connect sources using a global admin's own account.** The connector inherits everything that person can reach, and stops working when they leave.
2. **Don't grant domain-wide delegation with broad scopes** to a service account that only needs a few mailboxes or drives.
3. **Don't accept a vendor's default permission request without reading it.** Ask why each permission is needed.
4. **Don't share one connector credential** across unrelated teams, clients or test and production.

## The Cost of Getting This Wrong

1 - The blast radius is the whole tenant. If the connector's credential leaks or the permission layer above it fails, the exposure is everything the connector could read, not what one user could read.

2 - Nobody notices quietly broad access. Application permissions do not show up in any user's access review. They sit in the app registration until someone looks.

3 - Write access turns a leak into an incident. A read-only connector can expose data. A read-write connector can also change or destroy it.

## How To Check Your Vendor

1. **Permissions** - Exactly which permissions does your connector request, and why is each one needed?
2. **Scope** - Can it work with Sites.Selected or equivalent, limited to sites we choose?
3. **Read or write** - Is the connector read-only by default? What would require write access?
4. **Credentials** - Where is the connector's secret or certificate stored, and who can reach it?
5. **Separation** - Can we use separate connections for different teams or client groups?
6. **Exposure** - If your permission-checking layer failed, what is the most a user could see?

---

Anvax connectors are read-only by default. Write actions stay off until an admin enables them for a specific connector, and each workspace is scoped by an admin to the connectors it needs, so a finance workspace never searches the systems a sales workspace uses. Connector secrets are stored encrypted and are never exposed to the model, and permissions are checked against the source system on every question.

*If you are reviewing what your AI connectors can reach, we are happy to walk through the permission list with your team.*
