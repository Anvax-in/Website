import type { CompareContent, FlaggedPoint } from './types'
import { buildDetailedGroups } from './shared'

const competitorPoints: Record<string, [FlaggedPoint, FlaggedPoint]> = {
  'Where it runs': [
    { text: 'Runs only as Anthropic’s hosted service.', ok: false },
    { text: 'No on-premises, private-cloud or air-gapped option for the Claude app.', ok: false },
  ],
  'Data residency': [
    { text: 'Data is stored in the US.', ok: false },
    { text: 'A US-only inference option, with limited regional choice elsewhere.', ok: false },
  ],
  'Vendor dependency': [
    { text: 'Tied to Anthropic’s models and roadmap.', ok: false },
    { text: 'Leaving means re-platforming every workflow.', ok: false },
  ],
  'Sensitive data': [
    { text: 'No built-in redaction before content reaches the model.', ok: false },
    { text: 'Sensitive-data control relies on policy and user behaviour.', ok: false },
  ],
  'Prompt and model controls': [
    { text: 'Safety behaviour is set by Anthropic, not by your policy.', ok: false },
    { text: 'No per-request routing rules you define.', ok: false },
  ],
  'Audit trail': [
    { text: 'Audit logs and a Compliance API.', ok: true },
    { text: 'You assemble the full trail in your own tools.', ok: false },
  ],
  Permissions: [
    { text: 'Connectors follow source permissions.', ok: true },
    { text: 'Not a dedicated, permission-synced index.', ok: false },
  ],
  'Model choice': [
    { text: 'Claude models only.', ok: false },
    { text: 'No other providers and no open-weight or self-hosted models.', ok: false },
  ],
  'Enterprise search': [
    { text: 'Connectors for Google, Microsoft, Slack, GitHub and others.', ok: true },
    { text: 'Queried through connectors, not a dedicated enterprise index.', ok: false },
  ],
  'Workflows and agents': [
    { text: 'Projects, skills and agentic coding tools.', ok: true },
    { text: 'General-purpose, not built for regulated workflows.', ok: false },
  ],
  'Pricing model': [
    { text: '$20 per seat per month, billed annually, 20-seat minimum.', ok: false },
    { text: 'All usage billed on top at API rates.', ok: false },
  ],
  'Time to value': [
    { text: 'Quick to start for general use.', ok: true },
    { text: 'Regulated rollouts wait on review of a hosted, US-based service.', ok: false },
  ],
}

export const claudeEnterprise: CompareContent = {
  slug: 'anvax-vs-claude-enterprise',
  competitorName: 'Claude Enterprise',
  metaTitle: 'Anvax vs. Claude Enterprise',
  metaDescription:
    'Claude Enterprise is a capable assistant with good admin controls. But it runs only as Anthropic’s hosted service, on Claude models, with every token billed on top of the seat. Anvax runs inside your perimeter, on the models you choose.',
  heroLede:
    'Claude Enterprise is a capable assistant with good admin controls. But it runs only as Anthropic’s hosted service, on Claude models, with every token billed on top of the seat. Anvax runs inside your perimeter, on the models you choose.',
  competitorLogo: { kind: 'image', src: '/compare/claude-logo.png', alt: 'Claude Enterprise' },
  atAGlanceTitle: 'One model family, or any model you approve.',
  atAGlanceAnvax: [
    { text: 'Runs on-premises, in your VPC or air-gapped', ok: true },
    { text: 'Data never leaves your perimeter', ok: true },
    { text: 'Open-weight and any-provider models', ok: true },
    { text: 'Redaction and audit in the data path', ok: true },
    { text: 'Platform pricing, not per seat', ok: true },
    { text: 'Permission-aware search across your systems', ok: true },
  ],
  atAGlanceCompetitor: [
    { text: 'Anthropic’s cloud only', ok: false },
    { text: 'Hosted, mainly in the US', ok: false },
    { text: 'Claude models only', ok: false },
    { text: 'Audit logs and log export', ok: false },
    { text: 'Per seat plus all usage', ok: false },
    { text: 'Through workplace connectors', ok: false },
  ],
  detailedTitle: 'Twelve questions a regulated buyer should ask.',
  detailedLede: 'Grouped the way risk, security and procurement teams review an AI platform.',
  detailedGroups: buildDetailedGroups(competitorPoints),
  sourcesNote:
    'Claude Enterprise details from Anthropic’s published pricing and independent reviews, checked October 2026. Plans changed during 2026; confirm current terms with Anthropic.',
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
    heading: 'Claude Enterprise is best for',
    items: [
      'Teams that want Claude models for writing, analysis and coding',
      'Organisations comfortable with a US-hosted service',
      'Developer-heavy teams using agentic coding',
      'Low-risk work that never touches regulated data',
    ],
  },
  faqs: [
    {
      q: 'Is Claude Enterprise data used to train models?',
      a: 'Anthropic says it does not train on business customer data. For regulated teams the bigger questions are where the data is processed and who operates the infrastructure. With Anvax, both stay with you.',
    },
    {
      q: 'Can we use Claude models with Anvax?',
      a: 'Yes, if your policy allows it. The Anvax gateway can route approved requests to Claude after redaction, and keep open-weight models local for everything sensitive.',
    },
    {
      q: 'How does Claude Enterprise pricing work?',
      a: 'The published price is $20 per seat per month, billed annually, with all usage billed on top at API rates. Costs rise with headcount and with how much people use it. Anvax is priced as a platform.',
    },
    {
      q: 'Claude Enterprise has audit logs. Isn’t that enough?',
      a: 'Audit logs record what happened after the model saw the data. Anvax redacts sensitive data and checks prompts before anything reaches a model, then logs every step.',
    },
    {
      q: 'How long does it take to get started with Anvax?',
      a: 'Most teams start with one department and two or three workflows, and are live within a few weeks.',
    },
  ],
  ctaTitle: 'Use any model. Keep every request inside your walls.',
  ctaBody:
    'We will show you Anvax routing between open-weight and hosted models, with redaction and an audit record on every request.',
}
