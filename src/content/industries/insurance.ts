import type { Industry } from './types'

export const insurance: Industry = {
  slug: 'insurance',
  name: 'Insurance',
  metaDescription: 'Settle claims faster and underwrite with confidence. Anvax gives claims, underwriting and service teams answers from your own policies, claims history and guidelines.',
  hero: {
    h1: 'Settle Claims Faster. Underwrite With Confidence.',
    lede: 'Give claims, underwriting and service teams an AI assistant that works on your policies, claims history and guidelines, so customers get answers sooner and every decision has the right context.',
    chat: {
      workspace: 'Claims workspace',
      question: 'Is water damage from a burst pipe covered under policy HO-48213, and what is the excess?',
      answer: [
        'Yes. Sudden escape of water is covered under section 3.2 of the Home Plus wording. Gradual leaks and wear are excluded.',
        'This policy carries a $1,000 excess for escape of water claims. The customer has no other open claims this year.',
      ],
      sources: [
        { n: 1, title: 'Home Plus policy wording v7 · section 3.2', system: 'SharePoint' },
        { n: 2, title: 'Policy schedule HO-48213', system: 'Guidewire' },
      ],
      tags: [{ t: '2 personal details redacted', tone: 'ink' }, { t: 'Logged · entry 5,904,118', tone: 'sage' }],
    },
  },
  story: {
    label: 'Customer story · Property & casualty insurer',
    title: 'How a P&C insurer cut claims handling time by 40%.',
    challenge: 'Handlers checked policy wordings, endorsements and claim notes across separate systems for every new claim, and simple claims sat in the queue for days.',
    result: 'Handlers now see the coverage position and next steps for each claim in seconds, and simple claims close the same week.',
    stats: [
      { figure: '40%', label: 'faster claims handling' },
      { figure: '2×', label: 'more queries resolved on the first call' },
      { figure: '88%', label: 'of handlers use it every week' },
    ],
  },
  benefitsEyebrow: 'AI for insurance',
  benefitsTitle: 'Do more with everything your teams already know.',
  benefits: [
    { icon: 'trend', title: 'Remove claims bottlenecks', body: 'Cut manual work in claims, underwriting and servicing so customers get decisions and payouts sooner.' },
    { icon: 'agent', title: 'Let adjusters focus on complex cases', body: 'Take repetitive checks off adjusters and underwriters so they can spend their time on difficult claims and risks.' },
    { icon: 'search', title: 'Price and manage risk better', body: 'Use claims history, customer conversations and market data to sharpen pricing, spot trends and stay compliant.' },
  ],
  teamsTitle: 'One assistant for every team in the insurer.',
  teams: [
    {
      team: 'Claims', title: 'Move every claim to a decision faster',
      body: "Check cover, gather documents and summarise the claim file, so handlers can decide quickly and customers aren't left waiting.",
      points: [
        { t: 'Coverage checks', d: 'Confirm what is covered against the exact policy wording.', icon: 'check' },
        { t: 'Claim file summaries', d: 'Notes, photos and reports condensed into one clear view.', icon: 'file' },
        { t: 'Fraud signals', d: 'Flag claims that look unusual for a closer look.', icon: 'bolt' },
      ],
      tint: 'blue',
      mock: {
        kind: 'timeline', title: 'Claim CL-20931 · Escape of water',
        chips: [{ t: 'Covered · section 3.2', tone: 'sage' }, { t: 'No fraud signals', tone: 'ink' }],
        stats: [{ k: 'Reserve', v: '$8,400' }, { k: 'Excess', v: '$1,000' }, { k: 'Days open', v: '2' }],
        events: [
          { time: 'Mon 09:12', t: 'First notice of loss received' },
          { time: 'Mon 11:40', t: '12 photos and plumber report added' },
          { time: 'Tue 08:05', t: 'Cover confirmed against wording' },
          { time: 'Tue 08:06', t: 'Settlement recommended' },
        ],
        cta: 'Review and approve settlement',
      },
    },
    {
      team: 'Underwriting', title: 'Underwrite with the full picture',
      body: 'Bring submissions, loss history and your guidelines together so underwriters can assess a risk and quote with confidence.',
      points: [
        { t: 'Submission triage', d: 'Sort new submissions by appetite and priority.', icon: 'workflow' },
        { t: 'Guideline checks', d: 'Test any risk against your underwriting rules instantly.', icon: 'check' },
        { t: 'Loss history analysis', d: 'Summarise past claims for any account in seconds.', icon: 'trend' },
      ],
      tint: 'sage',
      mock: {
        kind: 'checklist', title: 'Submission review · Coastal Bakeries Ltd', heading: 'Commercial property', score: 'Appetite match 86%', pct: 86,
        items: [
          { ok: true, t: 'Occupancy', s: 'Food manufacturing · within appetite' },
          { ok: true, t: 'Fire protection', s: 'Fully sprinklered, alarm monitored' },
          { ok: false, t: 'Flood exposure', s: 'Zone B · refer to senior underwriter' },
          { ok: true, t: 'Loss history', s: '5-year loss ratio 38%' },
        ],
        footer: { label: 'Recommendation:', tone: 'blue', text: 'quote with a flood sublimit of $250K, per guideline 7.4.' },
      },
    },
    {
      team: 'Customer service', title: 'Answer every policyholder first time',
      body: 'Give service teams instant, accurate answers on cover, billing and claim status, so fewer calls need escalating.',
      points: [
        { t: 'Policy answers', d: 'Clear answers on cover, straight from the wording.', icon: 'search' },
        { t: 'Claim status updates', d: 'Tell customers exactly where their claim stands.', icon: 'clock' },
        { t: 'Customer letters', d: 'Draft clear, compliant letters and emails in any language.', icon: 'file' },
      ],
      tint: 'bone',
      mock: {
        kind: 'brief', title: 'Service desk · Live call', initials: 'MT', name: 'Policy MT-77120', sub: 'Motor comprehensive · renews 14 Jan',
        quote: "Am I covered if I drive a friend's car?", listTitle: 'Suggested answer',
        answer: "Yes, for third-party damage only, as long as the car is insured and you have the owner's permission. Damage to your friend's car itself is not covered under this policy.",
        chips: ['Motor wording section 5.1'],
      },
    },
    {
      team: 'Legal & compliance', title: 'Review wordings and contracts in minutes',
      body: 'Check policy wordings, broker agreements and contracts for key terms, gaps and compliance issues before they become problems.',
      points: [
        { t: 'Policy answers', d: 'Compare versions and see exactly how cover changed.', icon: 'file' },
        { t: 'Contract checks', d: 'Find key clauses and risks in partner agreements.', icon: 'check' },
        { t: 'Regulatory updates', d: 'See what new rules mean for your products.', icon: 'bolt' },
      ],
      tint: 'blue',
      mock: {
        kind: 'diff', title: 'Wording comparison · Home Plus v6 → v7',
        intro: 'Three changes affect cover. One needs a customer notice before renewal.',
        lines: [
          { type: 'del', t: 'Escape of water excess: $500' },
          { type: 'add', t: 'Escape of water excess: $1,000' },
          { type: 'add', t: 'Added: exclusion for cyber damage to home devices' },
          { type: 'del', t: 'Alternative accommodation capped at 30 days' },
        ],
        affects: ['41,200 policies', 'Renewal letters', 'Claims guide'],
      },
    },
  ],
  quote: {
    text: 'Our handlers used to search three systems to answer one coverage question. Now the answer arrives with the clause next to it, and claims move the same day.',
    role: 'Head of Claims · Property & casualty insurer',
  },
  securityNote: 'Policy numbers, health details and personal IDs are removed before any AI model sees them.',
  faqs: [
    { q: 'How does Anvax help claims teams handle claims faster?', a: 'Anvax checks each claim against the policy wording, pulls notes, photos and reports into one summary and suggests next steps. Handlers review a complete picture instead of piecing it together from several systems.' },
    { q: 'Is our policyholder data used to train AI models?', a: 'No. Your data stays inside your environment and is never used to train models, ours or anyone else\u2019s.' },
    { q: 'Can Anvax connect to our policy admin and claims systems?', a: 'Yes. Anvax connects to policy administration, claims, CRM, document management and collaboration tools. Existing permissions carry over, so people only see what they are already allowed to see.' },
    { q: 'How do we know the answers are accurate?', a: 'Every answer shows the documents it came from. Your team can open the source in one click and check it before acting.' },
    { q: 'Where does Anvax run?', a: 'On your own servers or in your private cloud. Insurers with stricter requirements can run it fully disconnected from the internet.' },
    { q: 'How quickly can we get started?', a: 'Most insurers start with one team, usually claims or service, and two or three workflows, and are up and running within a few weeks. From there it is easy to add more teams.' },
  ],
  cta: { title: 'See Anvax in action for your insurance teams.', body: 'We will walk you through claims, underwriting and service workflows on sample insurance data in 30 minutes.' },
}
