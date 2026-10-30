import type { CompareContent, FlaggedPoint } from './types'
import { buildDetailedGroups } from './shared'

const competitorPoints: Record<string, [FlaggedPoint, FlaggedPoint]> = {
  'Where it runs': [
    { text: 'Runs in Microsoft’s cloud on Azure.', ok: false },
    { text: 'No on-premises or air-gapped deployment.', ok: false },
  ],
  'Data residency': [
    { text: 'Covered by Microsoft 365 residency commitments, including the EU Data Boundary.', ok: true },
    { text: 'Where models process requests depends on Microsoft’s routing.', ok: false },
  ],
  'Vendor dependency': [
    { text: 'Optimised for Microsoft 365 adoption.', ok: false },
    { text: 'Harder to leave once workflows depend on it.', ok: false },
  ],
  'Sensitive data': [
    { text: 'Purview sensitivity labels and DLP apply.', ok: true },
    { text: 'Only effective with a mature Purview set-up.', ok: false },
  ],
  'Prompt and model controls': [
    { text: 'Microsoft-managed safety and jailbreak filtering.', ok: true },
    { text: 'No per-request model routing rules you define.', ok: false },
  ],
  'Audit trail': [
    { text: 'Copilot interactions are logged in Purview audit.', ok: true },
    { text: 'Depth of audit depends on your Purview licence tier.', ok: false },
  ],
  Permissions: [
    { text: 'Inherits Microsoft 365 permissions.', ok: true },
    { text: 'Over-shared SharePoint content surfaces to anyone with access.', ok: false },
  ],
  'Model choice': [
    { text: 'OpenAI and Anthropic models, chosen by Microsoft.', ok: false },
    { text: 'No open-weight or self-hosted models.', ok: false },
  ],
  'Enterprise search': [
    { text: 'Deep in Outlook, Teams, SharePoint and OneDrive.', ok: true },
    { text: 'Thinner coverage of non-Microsoft systems.', ok: false },
  ],
  'Workflows and agents': [
    { text: 'Custom agents through Copilot Studio.', ok: true },
    { text: 'Separate licensing and configuration.', ok: false },
  ],
  'Pricing model': [
    { text: '$30 per user per month, billed annually.', ok: false },
    { text: 'Charged on top of a required Microsoft 365 base licence.', ok: false },
  ],
  'Time to value': [
    { text: 'Already familiar to Microsoft 365 users.', ok: true },
    { text: 'Often needs partner support and a permissions clean-up first.', ok: false },
  ],
}

export const microsoftCopilot: CompareContent = {
  slug: 'anvax-vs-microsoft-copilot',
  competitorName: 'Microsoft 365 Copilot',
  metaTitle: 'Anvax vs. Microsoft 365 Copilot',
  metaDescription:
    'Microsoft 365 Copilot is deeply embedded in Office apps. But it runs only in Microsoft’s cloud, on models Microsoft picks, and it surfaces whatever your SharePoint permissions allow. Anvax runs inside your perimeter, with governance before the model.',
  heroLede:
    'Microsoft 365 Copilot is deeply embedded in Office apps. But it runs only in Microsoft’s cloud, on models Microsoft picks, and it surfaces whatever your SharePoint permissions allow. Anvax runs inside your perimeter, with governance before the model.',
  competitorLogo: { kind: 'image', src: '/compare/copilot-logo.png', alt: 'Microsoft 365 Copilot' },
  atAGlanceTitle: 'An Office assistant, or a governed AI workspace.',
  atAGlanceAnvax: [
    { text: 'Runs on-premises, in your VPC or air-gapped', ok: true },
    { text: 'Data never leaves your perimeter', ok: true },
    { text: 'Open-weight and any-provider models', ok: true },
    { text: 'Redaction and audit in the data path', ok: true },
    { text: 'Platform pricing, not per seat', ok: true },
    { text: 'Permission-aware search across your systems', ok: true },
  ],
  atAGlanceCompetitor: [
    { text: 'Microsoft’s cloud only', ok: false },
    { text: 'Inside Microsoft 365 boundaries', ok: false },
    { text: 'Models chosen by Microsoft', ok: false },
    { text: 'Purview labels, DLP and audit', ok: true },
    { text: '$30 per user on top of a base licence', ok: false },
    { text: 'Strongest inside Microsoft 365', ok: false },
  ],
  detailedTitle: 'Twelve questions a regulated buyer should ask.',
  detailedLede: 'Grouped the way risk, security and procurement teams review an AI platform.',
  detailedGroups: buildDetailedGroups(competitorPoints),
  sourcesNote:
    'Microsoft 365 Copilot details from Microsoft’s published pricing and independent licensing guides, checked October 2026. Licensing changes often; confirm with Microsoft or your reseller.',
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
    heading: 'Microsoft 365 Copilot is best for',
    items: [
      'Organisations standardised on Microsoft 365',
      'Teams whose work happens mostly in Outlook, Teams and Office',
      'Companies with a mature Purview and permissions set-up',
      'Buyers comfortable with Microsoft-hosted AI',
    ],
  },
  faqs: [
    {
      q: 'Doesn’t Copilot already respect our Microsoft 365 permissions?',
      a: 'Yes, and that is the risk. Copilot surfaces anything a user can technically access, so over-shared SharePoint sites and Teams files become answers. Anvax also inherits permissions, and adds redaction, prompt checks and an audit entry before any model sees the request.',
    },
    {
      q: 'Can Copilot run on our own infrastructure?',
      a: 'No. Microsoft 365 Copilot runs in Microsoft’s cloud. Anvax runs on your servers, in your private cloud or fully disconnected from the internet.',
    },
    {
      q: 'How does Copilot pricing compare?',
      a: 'Microsoft 365 Copilot is $30 per user per month on an annual commitment, on top of a qualifying Microsoft 365 licence. Anvax is priced as a platform, so rolling out to every employee does not multiply the bill.',
    },
    {
      q: 'Can Anvax work alongside Microsoft 365?',
      a: 'Yes. Anvax connects to SharePoint, OneDrive, Teams and Outlook, keeps their permissions, and can be used inside Teams. Many teams keep Copilot for Office drafting and use Anvax for regulated work.',
    },
    {
      q: 'How long does it take to get started with Anvax?',
      a: 'Most teams start with one department and two or three workflows, and are live within a few weeks.',
    },
  ],
  ctaTitle: 'See how Anvax works with Microsoft 365 apps',
  ctaBody:
    'We will show you Anvax answering from SharePoint and Teams content, with redaction and an audit record on every request.',
}
