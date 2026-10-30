import type { CompareContent, FlaggedPoint } from './types'
import { buildDetailedGroups } from './shared'

const competitorPoints: Record<string, [FlaggedPoint, FlaggedPoint]> = {
  'Where it runs': [
    { text: 'Runs only as OpenAI’s hosted service.', ok: false },
    { text: 'No on-premises, private-cloud or air-gapped option.', ok: false },
  ],
  'Data residency': [
    { text: 'At-rest residency in selected regions for in-scope content.', ok: true },
    { text: 'Authentication, routing and some processing may happen elsewhere.', ok: false },
  ],
  'Vendor dependency': [
    { text: 'Tied to OpenAI’s models, roadmap and pricing.', ok: false },
    { text: 'Leaving means re-platforming every workflow.', ok: false },
  ],
  'Sensitive data': [
    { text: 'No built-in redaction before content reaches the model.', ok: false },
    { text: 'Sensitive-data control relies on third-party DLP tools.', ok: false },
  ],
  'Prompt and model controls': [
    { text: 'Safety filtering is set by OpenAI, not by your policy.', ok: false },
    { text: 'No per-request routing rules you define.', ok: false },
  ],
  'Audit trail': [
    { text: 'Compliance API exports conversation logs to your tools.', ok: true },
    { text: 'You assemble the audit trail yourself.', ok: false },
  ],
  Permissions: [
    { text: 'Connected apps follow source permissions.', ok: true },
    { text: 'Over-shared source content surfaces to anyone with access.', ok: false },
  ],
  'Model choice': [
    { text: 'OpenAI models only.', ok: false },
    { text: 'No open-weight or self-hosted models.', ok: false },
  ],
  'Enterprise search': [
    { text: 'Company knowledge across a limited set of synced apps.', ok: false },
    { text: 'Other apps are queried live at question time.', ok: false },
  ],
  'Workflows and agents': [
    { text: 'Custom GPTs and agents with API actions.', ok: true },
    { text: 'General-purpose, not built for regulated workflows.', ok: false },
  ],
  'Pricing model': [
    { text: 'Per-seat annual contracts, negotiated with sales.', ok: false },
    { text: 'Credits-based billing for advanced features.', ok: false },
  ],
  'Time to value': [
    { text: 'Quick to start for general use.', ok: true },
    { text: 'Regulated rollouts wait on risk review of a hosted service.', ok: false },
  ],
}

export const chatgptEnterprise: CompareContent = {
  slug: 'anvax-vs-chatgpt-enterprise',
  competitorName: 'ChatGPT Enterprise',
  metaTitle: 'Anvax vs. ChatGPT Enterprise',
  metaDescription:
    'ChatGPT Enterprise is a strong general assistant. But it only runs as OpenAI’s hosted service, on OpenAI’s models. Anvax runs inside your own perimeter, on the models you approve.',
  heroLede:
    'ChatGPT Enterprise is a strong general assistant. But it only runs as OpenAI’s hosted service, on OpenAI’s models. Anvax runs inside your own perimeter, on the models you approve.',
  competitorLogo: { kind: 'image', src: '/compare/chatgpt-logo.png', alt: 'ChatGPT Enterprise' },
  atAGlanceTitle: 'Built for different buyers.',
  atAGlanceAnvax: [
    { text: 'Runs on-premises, in your VPC or air-gapped', ok: true },
    { text: 'Data never leaves your perimeter', ok: true },
    { text: 'Open-weight and any-provider models', ok: true },
    { text: 'Redaction and audit in the data path', ok: true },
    { text: 'Platform pricing, not per seat', ok: true },
    { text: 'Permission-aware search across your systems', ok: true },
  ],
  atAGlanceCompetitor: [
    { text: 'OpenAI’s cloud only', ok: false },
    { text: 'Regional storage, with processing exceptions', ok: false },
    { text: 'OpenAI models only', ok: false },
    { text: 'Admin controls and log export', ok: false },
    { text: 'Per-seat annual contracts', ok: false },
    { text: 'A limited set of synced apps', ok: false },
  ],
  detailedTitle: 'Twelve questions a regulated buyer should ask.',
  detailedLede: 'Grouped the way risk, security and procurement teams review an AI platform.',
  detailedGroups: buildDetailedGroups(competitorPoints),
  sourcesNote:
    'ChatGPT Enterprise details from OpenAI’s help centre and release notes and independent reviews, checked October 2026. Features change often; confirm with OpenAI before relying on them.',
  bestForAnvax: {
    heading: 'Anvax is best for',
    items: [
      'Regulated teams whose data cannot leave their perimeter',
      'Organisations that need on-premises or air-gapped AI',
      'Teams that must show an examiner how every answer was produced',
      'Companies that want model choice without lock-in',
    ],
  },
  bestForCompetitor: {
    heading: 'ChatGPT Enterprise is best for',
    items: [
      'Teams that mainly need writing, coding and analysis help',
      'Organisations comfortable with a cloud-only service',
      'Companies standardising on OpenAI models',
      'Low-risk work that never touches regulated data',
    ],
  },
  faqs: [
    {
      q: 'Doesn’t ChatGPT Enterprise data residency solve the sovereignty problem?',
      a: 'Only in part. Residency stores in-scope customer content at rest in your chosen region, and in-region inference is available in a few regions. Authentication, routing and some processing can still happen elsewhere, and the service always runs in OpenAI’s cloud. Anvax runs entirely inside your environment.',
    },
    {
      q: 'Does OpenAI train on ChatGPT Enterprise data?',
      a: 'Not by default. The question for regulated teams is different: where the data is processed, who operates the infrastructure, and whether you can show an examiner every step. Anvax answers all three inside your own perimeter.',
    },
    {
      q: 'Can we use GPT models with Anvax?',
      a: 'Yes, if your policy allows it. The Anvax gateway can route approved requests to OpenAI or any other provider, after redaction, while keeping open-weight models local for everything else.',
    },
    {
      q: 'We already pay for ChatGPT Enterprise. Can we run both?',
      a: 'Yes. Many teams keep a general assistant for low-risk work and use Anvax for anything involving customer, regulated or confidential data.',
    },
    {
      q: 'How long does it take to move to Anvax?',
      a: 'Most teams start with one department and two or three workflows, and are live within a few weeks.',
    },
  ],
  ctaTitle: 'See Anvax run inside your own perimeter.',
  ctaBody:
    'We will show you the same tasks you use ChatGPT for, with redaction, routing and an audit record on every request.',
}
