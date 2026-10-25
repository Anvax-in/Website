import type { Industry } from './types'

export const financialServices: Industry = {
  slug: 'financial-services',
  name: 'Financial Services',
  metaDescription: 'Turn financial complexity into clarity. Anvax gives credit, compliance and relationship teams answers from your own documents and systems, inside your own perimeter.',
  hero: {
    h1: 'Turn Financial Complexity Into Clarity',
    lede: "Give credit, compliance and relationship teams an AI assistant that works on your bank's own documents and systems, so they find answers in seconds and spend their time where it counts.",
    chat: {
      workspace: 'Credit workspace',
      question: 'Which SME facilities breached a financial covenant in Q3, and what does our policy require next?',
      answer: [
        'Four facilities in the SME book breached a covenant in Q3. Three breached DSCR below 1.20x and one breached leverage above 3.5x.',
        'Credit Policy 4.7 requires a watch-list review within 10 business days and a waiver or remediation plan approved at the next delegated authority level.',
      ],
      sources: [
        { n: 1, title: 'Covenant monitoring report · Q3', system: 'nCino' },
        { n: 2, title: 'Credit Policy v12 · section 4.7', system: 'SharePoint' },
      ],
      tags: [{ t: '4 account numbers redacted', tone: 'ink' }, { t: 'Logged · entry 8,201,377', tone: 'sage' }],
    },
  },
  story: {
    label: 'Customer story · Regional commercial bank',
    title: 'How a regional bank halved the time to a credit decision.',
    challenge: 'Analysts spent most of every application gathering financials, past approvals and policy references from six different systems before they could write a word.',
    result: 'Every analyst now starts from a complete, sourced draft and spends their time on the judgement call.',
    stats: [
      { figure: '52%', label: 'faster credit memos' },
      { figure: '9 hrs', label: 'saved per analyst, every week' },
      { figure: '94%', label: 'of analysts use it every week' },
    ],
  },
  benefitsEyebrow: 'AI for banking',
  benefitsTitle: 'Do more with the knowledge your bank already has.',
  benefits: [
    { icon: 'trend', title: 'Clear the paperwork backlog', body: 'Cut the manual work in credit, onboarding and servicing so applications move and customers hear back sooner.' },
    { icon: 'agent', title: 'Give experts their time back', body: 'Free analysts, underwriters and compliance officers from repetitive lookups so they can focus on the cases that need them.' },
    { icon: 'search', title: 'Decide with the full picture', body: 'Bring client history, policies and market data together so every decision is made with the right context.' },
  ],
  teamsTitle: 'One assistant for every team in the bank.',
  teams: [
    {
      team: 'Credit & lending', title: 'Get to a credit decision faster',
      body: "Pull financials, bureau data and past approvals into a ready-to-review credit memo, written in your bank's own template.",
      points: [
        { t: 'Credit memo drafting', d: 'A complete first draft with every figure linked to its source.', icon: 'file' },
        { t: 'Covenant monitoring', d: 'Spot breaches the day a compliance certificate arrives.', icon: 'clock' },
        { t: 'Approval routing', d: 'Know instantly who can sign off on any deal.', icon: 'workflow' },
      ],
      tint: 'blue',
      mock: {
        kind: 'document', title: 'Credit memo · Northfield Components', status: 'Draft ready', meta: 'Built from 6 sources · 2 min ago',
        heading: 'Borrower summary',
        body: 'Mid-market manufacturer, 14 years trading. Requesting a $4.5M term loan to fund a second production line.',
        table: { head: ['Metric', 'FY24', 'FY25'], rows: [['Revenue', '$38.2M', '$44.9M'], ['EBITDA margin', '14.1%', '15.6%'], ['DSCR', '1.42x', '1.58x']] },
        heading2: 'Recommendation',
        body2: 'Within appetite. Approve at Level 2 authority, subject to a 1.25x DSCR covenant.',
        sources: ['1 · Audited financials FY25', '2 · Credit policy section 4.2'],
      },
    },
    {
      team: 'Compliance & KYC', title: 'Keep every customer file current',
      body: 'Check KYC files against your current requirements, see exactly what is missing and send the customer one clear request.',
      points: [
        { t: 'KYC refresh', d: 'Find gaps in a file in seconds, not hours.', icon: 'shieldPlain' },
        { t: 'Alert investigations', d: 'Draft the case narrative from notes and account history.', icon: 'search' },
        { t: 'Screening summaries', d: 'Sanctions and adverse media results in plain language.', icon: 'auditBook' },
      ],
      tint: 'sage',
      mock: {
        kind: 'checklist', title: 'KYC refresh · Harbor Logistics', heading: 'Periodic review', score: '3 of 5 complete', pct: 60,
        items: [
          { ok: true, t: 'Identity documents', s: 'Valid until Aug 2029' },
          { ok: false, t: 'Proof of address', s: 'Expired Mar 2026 · new copy needed' },
          { ok: false, t: 'Beneficial owners', s: '2 of 3 verified' },
          { ok: true, t: 'Sanctions screening', s: 'No matches · run today' },
          { ok: true, t: 'Risk rating', s: 'Medium · unchanged' },
        ],
        footer: { label: '', tone: 'dark', text: 'Draft request to customer' },
      },
    },
    {
      team: 'Relationship management', title: 'Walk into every meeting prepared',
      body: 'Give relationship managers a one-page brief on any client, with exposure, recent activity and what to raise next.',
      points: [
        { t: 'Client briefs', d: 'Everything you need to know before the call.', icon: 'file' },
        { t: 'Renewal pipeline', d: 'See which facilities are coming up and who to call first.', icon: 'trend' },
        { t: 'Call notes to CRM', d: 'Turn notes into updates and follow-ups automatically.', icon: 'chat' },
      ],
      tint: 'bone',
      mock: {
        kind: 'brief', title: 'Client brief · Thursday 10:00', initials: 'HL', name: 'Harbor Logistics', sub: 'Client since 2017 · Commercial banking',
        stats: [{ k: 'Total exposure', v: '$12.4M' }, { k: 'Next renewal', v: '42 days' }], listTitle: 'Worth raising',
        list: ['Working capital line is 91% drawn, up from 64% last quarter.', 'Asked about FX hedging in their last two calls.', 'One open service request on statement formats.'],
      },
    },
    {
      team: 'Risk & policy', title: 'Know what every policy change means',
      body: 'When a policy or regulation changes, see what is different, who it affects and which procedures need updating.',
      points: [
        { t: 'Policy answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Change tracking', d: 'Compare versions and see exactly what moved.', icon: 'bolt' },
        { t: 'Committee summaries', d: 'Decisions and actions from every pack, in minutes.', icon: 'auditBook' },
      ],
      tint: 'blue',
      mock: {
        kind: 'diff', title: 'Policy assistant', intro: 'Two things changed in version 9. The maximum tenor is shorter, and income verification is now required for every application above $50K.',
        lines: [
          { type: 'del', t: 'Maximum tenor: 84 months' },
          { type: 'add', t: 'Maximum tenor: 60 months' },
          { type: 'add', t: 'Income verification required above $50K' },
        ],
        affects: ['Retail lending', '3 procedures', 'Branch scripts'],
      },
    },
  ],
  quote: {
    text: 'We used to spend days pulling a credit file together. Now our analysts start from a complete draft and spend their time on the decision itself.',
    role: 'Head of Credit · Commercial bank',
  },
  securityNote: 'Account numbers and personal IDs are removed before any AI model sees them.',
  faqs: [
    { q: 'How does Anvax help credit teams prepare credit memos faster?', a: 'Anvax pulls the financials, bureau reports, past approvals and policy references for an application into your credit memo template. Analysts start from a complete draft where every figure links back to its source, then review and refine it instead of building it from scratch.' },
    { q: 'Is our customer data used to train AI models?', a: 'No. Your data stays inside your environment and is never used to train models, ours or anyone else\u2019s.' },
    { q: 'Can Anvax connect to our core banking, loan origination and CRM systems?', a: 'Yes. Anvax connects to core banking, loan origination, CRM, document management and collaboration tools. Existing permissions carry over, so people only see what they are already allowed to see.' },
    { q: 'How do we know the answers are accurate?', a: 'Every answer shows the documents it came from. Your team can open the source in one click and check it before acting.' },
    { q: 'Where does Anvax run?', a: 'On your own servers or in your private cloud. Banks with stricter requirements can run it fully disconnected from the internet.' },
    { q: 'How quickly can we get started?', a: 'Most banks start with one team and two or three workflows, and are up and running within a few weeks. From there it is easy to add more teams.' },
  ],
  cta: { title: 'See Anvax in action for your bank.', body: 'We will walk you through credit, KYC and client workflows on sample banking data in 30 minutes.' },
}
