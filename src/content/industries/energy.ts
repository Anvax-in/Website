import type { Industry } from './types'

export const energy: Industry = {
  slug: 'energy',
  name: 'Energy',
  metaDescription: 'Keep assets running and stay compliant. Anvax gives asset, safety and field teams answers from your own maintenance records and systems, inside your own perimeter.',
  hero: {
    h1: 'Keep Assets Running. Stay Compliant. Move Faster In The Field.',
    lede: 'Give asset, safety and field teams an AI assistant that works on your own maintenance records, safety standards and systems, so engineers get answers in seconds and outages are rarer.',
    chat: {
      workspace: 'Operations workspace',
      question: 'Has turbine 14 at the Bellcross site had any vibration alarms in the last 90 days, and what is the recommended action?',
      answer: [
        'Yes. Turbine 14 logged two vibration alarms in the last 90 days, both resolved after bearing lubrication per the standard procedure.',
        'Maintenance policy recommends a full bearing inspection at the next scheduled outage if a third alarm occurs within 12 months.',
      ],
      sources: [
        { n: 1, title: 'Turbine 14 maintenance log', system: 'SAP PM' },
        { n: 2, title: 'Bearing maintenance procedure v6', system: 'SharePoint' },
      ],
      tags: [{ t: '1 technician ID redacted', tone: 'ink' }, { t: 'Logged · entry 4,420,017', tone: 'sage' }],
    },
  },
  story: {
    label: 'Customer story · Regional power generator',
    title: 'How a power generator cut unplanned downtime by 33%.',
    challenge: 'Engineers manually checked maintenance logs, safety procedures and parts inventory across separate systems before every repair decision.',
    result: 'Engineers now see the full equipment history and next steps for any asset in seconds.',
    stats: [
      { figure: '33%', label: 'less unplanned downtime' },
      { figure: '8 hrs', label: 'saved per engineer, every week' },
      { figure: '90%', label: 'of field staff use it every week' },
    ],
  },
  benefitsEyebrow: 'AI for energy',
  benefitsTitle: 'Do more with the asset data you already have.',
  benefits: [
    { icon: 'trend', title: 'Reduce unplanned downtime', body: 'Cut manual work in maintenance, inspection and permitting so assets stay online longer.' },
    { icon: 'agent', title: 'Give engineers their time back', body: 'Free technicians and engineers from repetitive lookups so they can focus on the repairs that matter.' },
    { icon: 'shieldPlain', title: 'Operate with full accountability', body: 'Bring maintenance history, safety standards and incident data together so every decision is defensible.' },
  ],
  teamsTitle: 'One assistant for every team in the operation.',
  teams: [
    {
      team: 'Asset & maintenance', title: 'Get to a maintenance decision faster',
      body: "Pull equipment history, manuals and past repairs into a ready-to-review maintenance recommendation, written in your team's own format.",
      points: [
        { t: 'Maintenance answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Work order drafting', d: 'A complete first draft with every reading linked to its source.', icon: 'file' },
        { t: 'Parts lookup', d: 'Confirm availability and lead time before the crew is dispatched.', icon: 'database' },
      ],
      tint: 'blue',
      mock: {
        kind: 'document', title: 'Work order · Turbine 14, Bellcross site', status: 'Draft ready', meta: 'Built from 5 sources · 2 min ago',
        heading: 'Asset summary',
        body: 'GE 2.5MW turbine, commissioned 2018, two vibration alarms in the last 90 days.',
        table: { head: ['Reading', '30 days ago', 'Today'], rows: [['Vibration (mm/s)', '3.2', '4.8'], ['Bearing temp (C)', '61', '68'], ['Output (MW)', '2.4', '2.3']] },
        heading2: 'Recommendation',
        body2: 'Schedule bearing inspection at next planned outage; monitor weekly until then.',
        sources: ['1 · Turbine 14 maintenance log', '2 · Bearing maintenance procedure v6'],
      },
    },
    {
      team: 'Compliance & safety', title: 'Stay ready for every inspection',
      body: 'Check procedures against current safety standards, see exactly what changed and keep an inspection-ready trail of every incident.',
      points: [
        { t: 'Standard checks', d: 'Test any procedure against the current safety standard instantly.', icon: 'check' },
        { t: 'Incident tracking', d: 'Flag near-misses and unusual patterns for a closer look.', icon: 'bolt' },
        { t: 'Audit prep', d: 'Pull the inspection and incident trail for any site in seconds.', icon: 'auditBook' },
      ],
      tint: 'sage',
      mock: {
        kind: 'checklist', title: 'Safety readiness · Bellcross site', heading: 'Quarterly review', score: '4 of 5 complete', pct: 80,
        items: [
          { ok: true, t: 'Permit to work records', s: 'Reviewed, no gaps' },
          { ok: true, t: 'PPE compliance', s: '100% across site' },
          { ok: false, t: 'Confined space training', s: '3 of 22 overdue' },
          { ok: true, t: 'Emergency drill log', s: 'Completed this quarter' },
          { ok: true, t: 'Incident reports', s: 'All closed out' },
        ],
        footer: { label: '', tone: 'dark', text: 'Send training reminders' },
      },
    },
    {
      team: 'Trading & risk', title: 'Manage exposure with the full picture',
      body: 'Bring market data, contracts and position history together so trading and risk teams can act with confidence.',
      points: [
        { t: 'Contract answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Position summaries', d: 'A one-page view of exposure, ready before the call.', icon: 'file' },
        { t: 'Change tracking', d: 'Compare contract versions and see exactly what moved.', icon: 'bolt' },
      ],
      tint: 'bone',
      mock: {
        kind: 'brief', title: 'Position brief · Thursday 09:00', initials: 'BX', name: 'Bellcross exposure', sub: 'Power generation · Q4 contracts',
        stats: [{ k: 'Net position', v: '42 MW' }, { k: 'Next settlement', v: '6 days' }], listTitle: 'Worth raising',
        list: ['Spot exposure increased 18% versus last review.', 'One counterparty credit limit at 85% utilisation.', 'Hedging ratio below target for Q4.'],
      },
    },
    {
      team: 'Field operations', title: 'Move the field crew faster',
      body: 'Give field engineers instant answers on procedures, parts and site history, so fewer calls need escalating back to the office.',
      points: [
        { t: 'Procedure answers', d: 'Clear answers on procedure, straight from the manual.', icon: 'search' },
        { t: 'Site history', d: 'See every past job and finding for a site at a glance.', icon: 'clock' },
        { t: 'Dispatch notes', d: 'Turn field notes into updates and follow-ups automatically.', icon: 'chat' },
      ],
      tint: 'blue',
      mock: {
        kind: 'timeline', title: 'Field job · Bellcross turbine 14',
        chips: [{ t: 'In progress', tone: 'sage' }, { t: 'No safety flags', tone: 'ink' }],
        stats: [{ k: 'Crew on site', v: '2' }, { k: 'Est. completion', v: '4 hrs' }, { k: 'Days open', v: '1' }],
        events: [
          { time: 'Mon 07:40', t: 'Crew dispatched to site' },
          { time: 'Mon 09:15', t: 'Bearing inspection started' },
          { time: 'Mon 11:30', t: 'Replacement part confirmed on site' },
          { time: 'Mon 11:45', t: 'Repair in progress' },
        ],
        cta: 'Review job status',
      },
    },
  ],
  quote: {
    text: 'Our engineers used to check three systems to make one call on a turbine. Now the answer arrives with the maintenance history next to it, and repairs happen the same day.',
    role: 'Head of Asset Management · Regional power generator',
  },
  securityNote: 'Technician IDs, site access codes and other identifying details are removed before any AI model sees them.',
  faqs: [
    { q: 'How does Anvax help engineers make maintenance decisions faster?', a: 'Anvax pulls equipment history, manuals and past repairs for an asset into a ready-to-review recommendation. Engineers start from a complete, sourced draft instead of checking multiple systems manually.' },
    { q: 'Is our operational data used to train AI models?', a: 'No. Your data stays inside your environment and is never used to train models, ours or anyone else’s.' },
    { q: 'Can Anvax connect to our asset management and SCADA systems?', a: 'Yes. Anvax connects to asset management, maintenance, trading and document systems. Existing permissions carry over, so people only see what they are already allowed to see.' },
    { q: 'How do we know the answers are accurate?', a: 'Every answer shows the documents it came from. Your team can open the source in one click and check it before acting.' },
    { q: 'Where does Anvax run?', a: 'On your own servers or in your private cloud. Sites with stricter requirements can run it fully disconnected from the internet.' },
    { q: 'How quickly can we get started?', a: 'Most operators start with one site and two or three workflows, and are up and running within a few weeks. From there it is easy to add more teams.' },
  ],
  cta: { title: 'See Anvax in action for your operation.', body: 'We will walk you through maintenance, safety and field workflows on sample operational data in 30 minutes.' },
}
