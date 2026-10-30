import type { ApartCard, DetailedGroup, FlaggedPoint } from './types'

// Verbatim from handoff/compare/*.dc.html — identical across all four mockups.
export const apartCards: ApartCard[] = [
  {
    icon: 'residency',
    title: 'Runs where your data lives',
    body: 'On your servers, your private cloud or fully air-gapped. The same product in every deployment.',
  },
  {
    icon: 'shieldPlain',
    title: 'Governance in the data path',
    body: 'Redaction, prompt checks and model routing run before any model sees a request, with an audit entry for each.',
  },
  {
    icon: 'layers',
    title: 'Any model, no lock-in',
    body: 'Open-weight models on your hardware, or approved hosted providers, chosen per request by your policy.',
  },
]

type SharedParameter = { name: string; anvax: [FlaggedPoint, FlaggedPoint] }

// The Anvax side of each of the 12 detailed-comparison parameters — identical
// across all four mockups (verified byte-for-byte). Only the competitor side
// differs per competitor file.
const sharedGroups: { title: string; parameters: SharedParameter[] }[] = [
  {
    title: 'Deployment & data sovereignty',
    parameters: [
      {
        name: 'Where it runs',
        anvax: [
          { text: 'Runs on your servers, in your private cloud or fully air-gapped.', ok: true },
          { text: 'The same product in every deployment, not a reduced on-prem edition.', ok: true },
        ],
      },
      {
        name: 'Data residency',
        anvax: [
          { text: 'Index, prompts, outputs and logs stay in infrastructure you control.', ok: true },
          { text: 'Nothing leaves your perimeter unless a policy you wrote allows it.', ok: true },
        ],
      },
      {
        name: 'Vendor dependency',
        anvax: [
          { text: 'Keeps working if a model provider changes its terms, prices or regions.', ok: true },
          { text: 'Swap models or infrastructure without re-platforming.', ok: true },
        ],
      },
    ],
  },
  {
    title: 'Governance & security',
    parameters: [
      {
        name: 'Sensitive data',
        anvax: [
          { text: 'Personal data and account identifiers are redacted before any model sees them.', ok: true },
          { text: 'Redactions are shown to the user, so nothing disappears silently.', ok: true },
        ],
      },
      {
        name: 'Prompt and model controls',
        anvax: [
          { text: 'Prompt-injection checks run on every request.', ok: true },
          { text: 'The model gateway enforces which model may see which data.', ok: true },
        ],
      },
      {
        name: 'Audit trail',
        anvax: [
          { text: 'An immutable audit entry for every answer: sources, model and redactions.', ok: true },
          { text: 'Records an examiner can read, exported from storage you own.', ok: true },
        ],
      },
      {
        name: 'Permissions',
        anvax: [
          { text: 'Inherits permissions from every source system.', ok: true },
          { text: 'Anvax can narrow access further, never widen it.', ok: true },
        ],
      },
    ],
  },
  {
    title: 'Knowledge & models',
    parameters: [
      {
        name: 'Model choice',
        anvax: [
          { text: 'Run open-weight models on your own hardware.', ok: true },
          { text: 'Route approved requests to any hosted provider, after redaction.', ok: true },
        ],
      },
      {
        name: 'Enterprise search',
        anvax: [
          { text: 'Permission-aware search across documents, tickets, CRM and data platforms.', ok: true },
          { text: 'Every answer cites the source it came from.', ok: true },
        ],
      },
      {
        name: 'Workflows and agents',
        anvax: [
          { text: 'Ready-made workflows for regulated teams, editable by your staff.', ok: true },
          { text: 'Agents run inside the same governance pipeline as chat.', ok: true },
        ],
      },
    ],
  },
  {
    title: 'Cost & rollout',
    parameters: [
      {
        name: 'Pricing model',
        anvax: [
          { text: 'Platform pricing, not per seat.', ok: true },
          { text: 'Roll out to every employee without headcount driving the bill.', ok: true },
        ],
      },
      {
        name: 'Time to value',
        anvax: [
          { text: 'First team live within a few weeks.', ok: true },
          { text: 'Start with one department and two or three workflows, then expand.', ok: true },
        ],
      },
    ],
  },
]

/** All 12 parameter names, in display order, for competitor content files to key off. */
export const detailedParameterNames: string[] = sharedGroups.flatMap(g => g.parameters.map(p => p.name))

export function buildDetailedGroups(
  competitorPoints: Record<string, [FlaggedPoint, FlaggedPoint]>
): DetailedGroup[] {
  return sharedGroups.map(group => ({
    title: group.title,
    parameters: group.parameters.map(p => ({
      name: p.name,
      anvax: p.anvax,
      competitor: competitorPoints[p.name],
    })),
  }))
}
