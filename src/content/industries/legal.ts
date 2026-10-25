import type { Industry } from './types'

export const legal: Industry = {
  slug: 'legal',
  name: 'Legal & Professional Services',
  metaDescription: 'Research faster and review contracts with confidence. Anvax gives associates, partners and compliance teams answers from your own matter files and precedent library, inside your own perimeter.',
  hero: {
    h1: 'Research Faster. Draft With Confidence. Protect Privilege.',
    lede: 'Give associates, partners and compliance teams an AI assistant that works on your own matter files and precedent library, so research takes minutes and every answer stays privileged.',
    chat: {
      workspace: 'Matter workspace',
      question: 'What is the limitation period for a breach of contract claim under the Jones Manufacturing supply agreement, and has it been triggered?',
      answer: [
        'The supply agreement is governed by a 6-year limitation period from the date of breach under the Limitation Act, consistent with clause 14.2.',
        'Based on the delivery failure logged 14 March 2023, the limitation period runs to 14 March 2029 and has not yet been triggered.',
      ],
      sources: [
        { n: 1, title: 'Jones Manufacturing supply agreement · cl. 14.2', system: 'iManage' },
        { n: 2, title: 'Matter file · delivery incident log', system: 'SharePoint' },
      ],
      tags: [{ t: '2 client names redacted', tone: 'ink' }, { t: 'Logged · entry 3,318,204', tone: 'sage' }],
    },
  },
  story: {
    label: 'Customer story · Mid-size commercial law firm',
    title: 'How a commercial firm cut due diligence review time in half.',
    challenge: 'Associates spent days manually reviewing contracts clause by clause for every disclosure exercise, often duplicating work across deal teams.',
    result: 'Associates now start from a flagged, sourced review and spend their time on judgement calls that matter.',
    stats: [
      { figure: '50%', label: 'faster due diligence reviews' },
      { figure: '11 hrs', label: 'saved per associate, every week' },
      { figure: '92%', label: 'of associates use it every week' },
    ],
  },
  benefitsEyebrow: 'AI for legal & professional services',
  benefitsTitle: 'Do more with the matter files your firm already has.',
  benefits: [
    { icon: 'trend', title: 'Clear the review backlog', body: 'Cut manual work in due diligence, discovery and matter intake so deals and disputes move faster.' },
    { icon: 'agent', title: 'Give associates their time back', body: 'Free associates and paralegals from repetitive document review so they can focus on judgement and strategy.' },
    { icon: 'search', title: 'Research with the full picture', body: 'Bring precedent, case law and matter history together so every answer is made with the right context.' },
  ],
  teamsTitle: 'One assistant for every team in the firm.',
  teams: [
    {
      team: 'Litigation & research', title: 'Get to a research answer faster',
      body: 'Search precedent, case law and matter files in one place, and draft a sourced research note instead of starting from a blank page.',
      points: [
        { t: 'Precedent search', d: 'Find the clause or ruling you need across every matter.', icon: 'search' },
        { t: 'Research memos', d: 'A complete first draft with every citation linked to its source.', icon: 'file' },
        { t: 'Case timeline', d: 'See every filing and deadline for a matter at a glance.', icon: 'clock' },
      ],
      tint: 'blue',
      mock: {
        kind: 'document', title: 'Research memo · Jones Manufacturing v. Atlas Freight', status: 'Draft ready', meta: 'Built from 7 sources · 4 min ago',
        heading: 'Issue summary',
        body: 'Breach of contract claim arising from late delivery under a fixed-term supply agreement.',
        table: { head: ['Issue', 'Precedent', 'Strength'], rows: [['Limitation period', 'Smith v. Harcourt (2019)', 'Strong'], ['Causation', 'Bell Freight Ltd (2021)', 'Moderate'], ['Damages', 'Regional Supply Co (2022)', 'Strong']] },
        heading2: 'Recommendation',
        body2: 'Proceed on breach of contract grounds; limitation period has not expired.',
        sources: ['1 · Supply agreement cl. 14.2', '2 · Smith v. Harcourt (2019)'],
      },
    },
    {
      team: 'Transactions', title: 'Close deals with fewer surprises',
      body: 'Review contracts and disclosure documents at speed, with every risky clause flagged before it becomes a closing issue.',
      points: [
        { t: 'Contract review', d: 'Find key clauses, gaps and risks across a full data room.', icon: 'check' },
        { t: 'Redline summaries', d: 'See exactly what changed between drafts, in plain language.', icon: 'bolt' },
        { t: 'Closing checklists', d: 'Track every condition precedent to signature in one place.', icon: 'workflow' },
      ],
      tint: 'sage',
      mock: {
        kind: 'checklist', title: 'Closing checklist · Atlas Freight acquisition', heading: 'Conditions precedent', score: '5 of 6 complete', pct: 83,
        items: [
          { ok: true, t: 'Regulatory approval', s: 'Received 2 Oct' },
          { ok: true, t: 'Disclosure schedule', s: 'Finalised and agreed' },
          { ok: false, t: 'Third-party consents', s: '1 of 4 outstanding' },
          { ok: true, t: 'Financing confirmation', s: 'Confirmed by lender' },
          { ok: true, t: 'Board resolutions', s: 'Executed both parties' },
        ],
        footer: { label: '', tone: 'dark', text: 'Chase outstanding consent' },
      },
    },
    {
      team: 'Risk & compliance', title: 'Know what every regulatory change means',
      body: 'When a rule or professional obligation changes, see what is different, which matters it touches and what needs updating.',
      points: [
        { t: 'Policy answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Change tracking', d: 'Compare versions and see exactly what moved.', icon: 'bolt' },
        { t: 'Conflict checks', d: 'Screen new matters against existing clients in seconds.', icon: 'shieldPlain' },
      ],
      tint: 'bone',
      mock: {
        kind: 'diff', title: 'Regulatory update · SRA Code of Conduct',
        intro: 'Two changes affect client onboarding. One needs a policy update before next intake.',
        lines: [
          { type: 'del', t: 'Enhanced due diligence: high-risk clients only' },
          { type: 'add', t: 'Enhanced due diligence: high-risk and cross-border clients' },
          { type: 'add', t: 'Added: annual conflict register review' },
        ],
        affects: ['Client onboarding', 'Conflicts policy', '3 practice groups'],
      },
    },
    {
      team: 'Knowledge management', title: 'Put precedent to work for every matter',
      body: 'Keep the precedent library current and let every lawyer find the right clause or template without asking around.',
      points: [
        { t: 'Template answers', d: 'Find the right precedent clause instantly.', icon: 'search' },
        { t: 'Matter briefs', d: 'A one-page summary of any matter, ready before the call.', icon: 'file' },
        { t: 'Know-how capture', d: 'Turn closed matters into searchable precedent automatically.', icon: 'layers' },
      ],
      tint: 'blue',
      mock: {
        kind: 'brief', title: 'Matter brief · Thursday 14:00', initials: 'AF', name: 'Atlas Freight Ltd', sub: 'Client since 2019 · Corporate',
        stats: [{ k: 'Open matters', v: '3' }, { k: 'Next deadline', v: '9 days' }], listTitle: 'Worth raising',
        list: ['Standard terms haven’t been reviewed since 2022.', 'Asked about a framework agreement in the last call.', 'One invoice query still open with billing.'],
      },
    },
  ],
  quote: {
    text: 'We used to spend days on a due diligence review. Now our associates start from a flagged draft and spend their time on the calls that actually need judgement.',
    role: 'Managing Partner · Commercial law firm',
  },
  securityNote: 'Client names, matter numbers and privileged details are removed before any AI model sees them.',
  faqs: [
    { q: 'How does Anvax help associates research faster?', a: 'Anvax searches precedent, case law and matter files together and drafts a sourced research memo. Associates start from a complete draft where every citation links back to its source, then review and refine it instead of starting from a blank page.' },
    { q: 'Is our client data used to train AI models?', a: 'No. Your data stays inside your environment and is never used to train models, ours or anyone else’s.' },
    { q: 'Can Anvax connect to our document management and matter systems?', a: 'Yes. Anvax connects to document management, matter management, billing and collaboration tools. Existing permissions carry over, so people only see what they are already allowed to see.' },
    { q: 'How do we protect privilege?', a: 'Every answer shows the documents it came from, and access follows your existing matter-level permissions, so privilege is preserved exactly as it is today.' },
    { q: 'Where does Anvax run?', a: 'On your own servers or in your private cloud. Firms with stricter requirements can run it fully disconnected from the internet.' },
    { q: 'How quickly can we get started?', a: 'Most firms start with one practice group and two or three workflows, and are up and running within a few weeks. From there it is easy to add more teams.' },
  ],
  cta: { title: 'See Anvax in action for your firm.', body: 'We will walk you through research, review and compliance workflows on sample matter data in 30 minutes.' },
}
