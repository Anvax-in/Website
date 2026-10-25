import type { Industry } from './types'

export const publicSectorGovernment: Industry = {
  slug: 'public-sector-government',
  name: 'Public Sector & Government',
  metaDescription: 'Clear policy answers and faster procurement. Anvax gives policy, procurement and service teams answers from your own legislation and systems, inside your own perimeter.',
  hero: {
    h1: 'Clear Policy Answers. Faster Procurement. Full Accountability.',
    lede: 'Give policy, procurement and service teams an AI assistant that works on your own legislation, frameworks and case files, so citizens get answers sooner and every decision is accountable.',
    chat: {
      workspace: 'Policy workspace',
      question: 'Does the new procurement framework allow single-source contracts above $250,000, and what approval is required?',
      answer: [
        'Single-source contracts above $250,000 are permitted only under Schedule 3 exemptions, such as proven market exclusivity.',
        'These require written justification and sign-off from the Head of Procurement plus a post-award disclosure within 30 days.',
      ],
      sources: [
        { n: 1, title: 'Procurement framework v9 · Schedule 3', system: 'SharePoint' },
        { n: 2, title: 'Delegated authority register', system: 'Oracle' },
      ],
      tags: [{ t: '1 applicant detail redacted', tone: 'ink' }, { t: 'Logged · entry 2,047,118', tone: 'sage' }],
    },
  },
  story: {
    label: 'Customer story · State government department',
    title: 'How a government department cut procurement approval time by 38%.',
    challenge: 'Procurement officers manually cross-referenced frameworks, delegated authority registers and past approvals for every contract above threshold.',
    result: 'Officers now start from a sourced recommendation and spend their time on the judgement call.',
    stats: [
      { figure: '38%', label: 'faster procurement approvals' },
      { figure: '6 hrs', label: 'saved per officer, every week' },
      { figure: '87%', label: 'of staff use it every week' },
    ],
  },
  benefitsEyebrow: 'AI for public sector & government',
  benefitsTitle: 'Do more with the records your department already has.',
  benefits: [
    { icon: 'trend', title: 'Clear the case backlog', body: 'Cut manual work in procurement, case review and constituent requests so services move faster.' },
    { icon: 'agent', title: 'Give caseworkers their time back', body: 'Free policy analysts and caseworkers from repetitive lookups so they can focus on the decisions that matter.' },
    { icon: 'residency', title: 'Decide with full accountability', body: 'Bring legislation, frameworks and past decisions together so every outcome can be explained and defended.' },
  ],
  teamsTitle: 'One assistant for every team in the department.',
  teams: [
    {
      team: 'Policy & research', title: 'Get to a policy answer faster',
      body: 'Search legislation, regulations and past guidance in one place, and draft a sourced briefing instead of starting from scratch.',
      points: [
        { t: 'Policy answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Briefing notes', d: 'A complete first draft with every reference linked to its source.', icon: 'file' },
        { t: 'Precedent tracking', d: 'See how similar policy questions were resolved before.', icon: 'layers' },
      ],
      tint: 'blue',
      mock: {
        kind: 'document', title: 'Briefing note · Procurement threshold review', status: 'Draft ready', meta: 'Built from 6 sources · 5 min ago',
        heading: 'Issue summary',
        body: 'Review of single-source contract thresholds following an internal audit finding.',
        table: { head: ['Option', 'Risk', 'Recommendation'], rows: [['Keep threshold', 'Low', 'Retain'], ['Lower threshold', 'Medium', 'Review Q2'], ['Remove exemption', 'High', 'Not recommended']] },
        heading2: 'Recommendation',
        body2: 'Retain current threshold; tighten disclosure timelines to 14 days.',
        sources: ['1 · Procurement framework v9', '2 · Internal audit finding 2026-04'],
      },
    },
    {
      team: 'Procurement', title: 'Approve contracts with the full picture',
      body: 'Check submissions against the framework and delegated authority in seconds, so approvals move without the back-and-forth.',
      points: [
        { t: 'Framework checks', d: 'Test any contract against procurement rules instantly.', icon: 'check' },
        { t: 'Supplier risk', d: 'Summarise past performance and flags for any supplier.', icon: 'shieldPlain' },
        { t: 'Approval routing', d: 'Know instantly who can sign off on any contract.', icon: 'workflow' },
      ],
      tint: 'sage',
      mock: {
        kind: 'checklist', title: 'Contract review · Northbridge Logistics', heading: 'Procurement check', score: '4 of 5 complete', pct: 80,
        items: [
          { ok: true, t: 'Framework compliance', s: 'Within Schedule 3 exemption' },
          { ok: true, t: 'Budget confirmation', s: 'Confirmed by finance' },
          { ok: false, t: 'Conflict of interest check', s: 'Awaiting declaration' },
          { ok: true, t: 'Insurance certificate', s: 'Valid until 2027' },
          { ok: true, t: 'Past performance', s: 'No flags on record' },
        ],
        footer: { label: '', tone: 'dark', text: 'Request conflict declaration' },
      },
    },
    {
      team: 'Case & constituent services', title: 'Answer every constituent faster',
      body: 'Give frontline staff instant, accurate answers on entitlements, applications and case status, so fewer queries need escalation.',
      points: [
        { t: 'Entitlement answers', d: 'Clear answers on eligibility, straight from the legislation.', icon: 'search' },
        { t: 'Case status updates', d: 'Tell constituents exactly where their application stands.', icon: 'clock' },
        { t: 'Correspondence drafting', d: 'Draft clear, compliant letters and emails in any language.', icon: 'file' },
      ],
      tint: 'bone',
      mock: {
        kind: 'brief', title: 'Case brief · Live enquiry', initials: 'NL', name: 'Case NL-77240', sub: 'Housing support · opened 14 days ago',
        quote: 'Why was my application put on hold?', listTitle: 'Suggested answer',
        answer: 'Your application is on hold pending proof of residency. Once the document is received, a decision is issued within 10 business days.',
        chips: ['Housing support guideline section 2.3'],
      },
    },
    {
      team: 'Security & compliance', title: 'Know what every policy change means',
      body: 'When legislation or a security standard changes, see what is different, who it affects and which procedures need updating.',
      points: [
        { t: 'Regulatory updates', d: 'See what new rules mean for your services.', icon: 'bolt' },
        { t: 'Audit prep', d: 'Pull the access and decision trail for any case in seconds.', icon: 'auditBook' },
        { t: 'Incident tracking', d: 'Flag unusual access patterns for a closer look.', icon: 'shieldPlain' },
      ],
      tint: 'blue',
      mock: {
        kind: 'diff', title: 'Policy update · Data sharing standard v4 to v5',
        intro: 'Two changes affect case handling. One needs staff notification before go-live.',
        lines: [
          { type: 'del', t: 'Data retention: 5 years' },
          { type: 'add', t: 'Data retention: 7 years' },
          { type: 'add', t: 'Added: mandatory breach notification within 72 hours' },
        ],
        affects: ['Case management system', '214 staff', 'Training materials'],
      },
    },
  ],
  quote: {
    text: 'We used to cross-reference three systems to approve one contract. Now the answer arrives with the clause next to it, and procurement moves the same week.',
    role: 'Director of Procurement · State government department',
  },
  securityNote: 'Applicant names, case numbers and other identifying details are removed before any AI model sees them.',
  faqs: [
    { q: 'How does Anvax help procurement teams approve contracts faster?', a: 'Anvax checks each submission against the procurement framework and delegated authority register, and drafts a recommendation with every reference linked to its source. Officers review a complete picture instead of cross-referencing systems manually.' },
    { q: 'Is our constituent data used to train AI models?', a: 'No. Your data stays inside your environment and is never used to train models, ours or anyone else’s.' },
    { q: 'Can Anvax connect to our case management and procurement systems?', a: 'Yes. Anvax connects to case management, procurement, finance and document systems. Existing permissions carry over, so people only see what they are already allowed to see.' },
    { q: 'How do we know the answers are accurate?', a: 'Every answer shows the documents it came from. Your team can open the source in one click and check it before acting.' },
    { q: 'Where does Anvax run?', a: 'On your own servers or in your sovereign cloud. Departments with stricter requirements can run it fully disconnected from the internet.' },
    { q: 'How quickly can we get started?', a: 'Most departments start with one team and two or three workflows, and are up and running within a few weeks. From there it is easy to add more teams.' },
  ],
  cta: { title: 'See Anvax in action for your department.', body: 'We will walk you through policy, procurement and case workflows on sample government data in 30 minutes.' },
}
