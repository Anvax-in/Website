import type { CompareContent, FlaggedPoint } from './types'
import { buildDetailedGroups } from './shared'

const competitorPoints: Record<string, [FlaggedPoint, FlaggedPoint]> = {
  'Where it runs': [
    { text: 'Glean’s cloud, or Customer Hosted in your AWS or GCP account.', ok: false },
    { text: 'Customer Hosted is operated by Glean. No on-premises or air-gapped option.', ok: false },
  ],
  'Data residency': [
    { text: 'Customer Hosted keeps data in your cloud account.', ok: true },
    { text: 'Glean Hosted keeps it in Glean’s.', ok: false },
  ],
  'Vendor dependency': [
    { text: 'Broad model choice reduces model lock-in.', ok: true },
    { text: 'The platform is still operated by Glean.', ok: false },
  ],
  'Sensitive data': [
    { text: 'Glean Protect and an AI gateway govern AI use.', ok: true },
    { text: 'Controls run inside a platform Glean operates.', ok: false },
  ],
  'Prompt and model controls': [
    { text: 'Guardrails configured in Glean’s platform.', ok: true },
    { text: 'No local models for the most sensitive requests.', ok: false },
  ],
  'Audit trail': [
    { text: 'Admin insights and activity logs.', ok: true },
    { text: 'Logs live in Glean’s platform unless exported.', ok: false },
  ],
  Permissions: [
    { text: 'Mature, permission-aware retrieval across sources.', ok: true },
    { text: 'Permission changes sync in near real time.', ok: true },
  ],
  'Model choice': [
    { text: 'A hub of hosted models from several providers.', ok: true },
    { text: 'No open-weight models on your own hardware.', ok: false },
  ],
  'Enterprise search': [
    { text: 'A mature index with a very wide connector library.', ok: true },
    { text: 'Knowledge graph built from activity signals.', ok: true },
  ],
  'Workflows and agents': [
    { text: 'Agent builder and a library of prebuilt agents.', ok: true },
    { text: 'Horizontal, not built around regulated workflows.', ok: false },
  ],
  'Pricing model': [
    { text: 'Per-user seats plus usage credits.', ok: false },
    { text: 'No published price.', ok: false },
  ],
  'Time to value': [
    { text: 'Guided setup with real-time sync.', ok: true },
    { text: 'Customer Hosted adds cloud-account setup with Glean.', ok: false },
  ],
}

export const glean: CompareContent = {
  slug: 'anvax-vs-glean',
  competitorName: 'Glean',
  metaTitle: 'Anvax vs. Glean',
  metaDescription:
    'Glean is excellent at enterprise search. But even its customer-hosted option is deployed and operated by Glean in your public cloud, and priced per seat. Anvax runs wherever you need it, including fully air-gapped.',
  heroLede:
    'Glean is excellent at enterprise search. But even its customer-hosted option is deployed and operated by Glean in your public cloud, and priced per seat. Anvax runs wherever you need it, including fully air-gapped.',
  competitorLogo: { kind: 'image', src: '/compare/glean-logo.png', alt: 'Glean' },
  atAGlanceTitle: 'Strong search. Different deployment model.',
  atAGlanceAnvax: [
    { text: 'Runs on-premises, in your VPC or air-gapped', ok: true },
    { text: 'Data never leaves your perimeter', ok: true },
    { text: 'Open-weight models on your hardware', ok: true },
    { text: 'Redaction and audit in the data path', ok: true },
    { text: 'Platform pricing, not per seat', ok: true },
    { text: 'Permission-aware search across your systems', ok: true },
  ],
  atAGlanceCompetitor: [
    { text: 'Glean’s cloud or your AWS/GCP, operated by Glean', ok: false },
    { text: 'Depends on the deployment', ok: false },
    { text: 'Hosted models only', ok: false },
    { text: 'Controls inside Glean’s platform', ok: false },
    { text: 'Per seat plus usage credits', ok: false },
    { text: 'Glean’s core strength', ok: true },
  ],
  detailedTitle: 'Twelve questions a regulated buyer should ask.',
  detailedLede: 'Grouped the way risk, security and procurement teams review an AI platform.',
  detailedGroups: buildDetailedGroups(competitorPoints),
  sourcesNote:
    'Glean details from Glean’s website and documentation and independent pricing reviews, checked October 2026. Glean does not publish pricing; confirm current terms with Glean.',
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
    heading: 'Glean is best for',
    items: [
      'Companies whose main need is search across many SaaS apps',
      'Organisations happy for the vendor to operate the platform',
      'Teams running on AWS or GCP',
      'Buyers who don’t need air-gapped deployment',
    ],
  },
  faqs: [
    {
      q: 'Isn’t Glean’s customer-hosted option the same as self-hosting?',
      a: 'No. Customer Hosted runs in your AWS or GCP account, but Glean deploys and operates it as a managed service. It does not run on-premises or on a network with no internet access. Anvax does both.',
    },
    {
      q: 'Glean already supports multiple models. What is different?',
      a: 'Glean lets you choose among hosted providers. Anvax also runs open-weight models on your own hardware, so sensitive requests never reach a third-party model at all.',
    },
    {
      q: 'How does pricing compare?',
      a: 'Glean sells per-user seats plus usage credits, and does not publish prices. Anvax is priced as a platform, so rolling out to every employee does not multiply the bill.',
    },
    {
      q: 'Is Anvax search as good as Glean’s?',
      a: 'Glean has a mature search product. Anvax covers permission-aware search across your systems and adds what regulated teams need on top: redaction before inference, model routing and an audit record on every answer.',
    },
    {
      q: 'Can we move our Glean connectors across?',
      a: 'Anvax connects to the same kinds of systems and keeps their existing permissions. Most teams are live with their first department within a few weeks.',
    },
  ],
  ctaTitle: 'Search your knowledge without leaving your perimeter.',
  ctaBody:
    'We will run the same searches on your kind of corpus, with every answer cited and logged inside your environment.',
}
