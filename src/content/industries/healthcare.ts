import type { Industry } from './types'

export const healthcare: Industry = {
  slug: 'healthcare',
  name: 'Healthcare',
  metaDescription: 'Draft discharge summaries faster and keep every care plan on track. Anvax gives clinical, care coordination and compliance teams answers from your own records and systems, inside your own perimeter.',
  hero: {
    h1: 'Clear Charts. Faster Discharges. Fewer Gaps In Care.',
    lede: 'Give clinical, care coordination and compliance teams an AI assistant that works on your own records and systems, so clinicians find answers in seconds and spend their time with patients.',
    chat: {
      workspace: 'Clinical workspace',
      question: 'Is it safe to discharge the patient in Bed 12 on their current anticoagulant dose, and what follow-up is required?',
      answer: [
        'Yes. INR is within the target range of 2.0–3.0 and there are no new interactions with the updated medication list.',
        'Discharge protocol requires an anticoagulation clinic follow-up within 7 days and a repeat INR at day 3.',
      ],
      sources: [
        { n: 1, title: 'Anticoagulation discharge protocol v5', system: 'SharePoint' },
        { n: 2, title: 'Patient chart · medication reconciliation', system: 'Epic' },
      ],
      tags: [{ t: '3 health details redacted', tone: 'ink' }, { t: 'Logged · entry 6,214,502', tone: 'sage' }],
    },
  },
  story: {
    label: 'Customer story · Regional hospital network',
    title: 'How a hospital network cut discharge documentation time by 45%.',
    challenge: 'Nurses and residents pulled medication histories, prior notes and protocol references from four different systems before every discharge summary.',
    result: 'Clinicians now start from a complete, sourced draft and spend their time on the clinical judgement call.',
    stats: [
      { figure: '45%', label: 'faster discharge summaries' },
      { figure: '7 hrs', label: 'saved per clinician, every week' },
      { figure: '91%', label: 'of residents use it every week' },
    ],
  },
  benefitsEyebrow: 'AI for healthcare',
  benefitsTitle: 'Do more with the records your hospital already has.',
  benefits: [
    { icon: 'trend', title: 'Clear the documentation backlog', body: 'Cut manual work in discharge, referrals and prior authorisation so patients move through care faster.' },
    { icon: 'agent', title: 'Give clinicians their time back', body: 'Free nurses, residents and case managers from repetitive chart lookups so they can focus on patients.' },
    { icon: 'search', title: 'Decide with the full chart', body: 'Bring history, protocols and labs together so every decision is made with the right context.' },
  ],
  teamsTitle: 'One assistant for every team in the hospital.',
  teams: [
    {
      team: 'Clinical documentation', title: 'Draft discharge summaries in minutes',
      body: "Pull medication history, labs and prior notes into a ready-to-review discharge summary, written in your system's own template.",
      points: [
        { t: 'Note drafting', d: 'A complete first draft with every figure linked to its source.', icon: 'file' },
        { t: 'Chart review', d: 'Surface relevant history and labs without opening five tabs.', icon: 'search' },
        { t: 'Discharge checks', d: 'Confirm every required field is complete before sign-off.', icon: 'check' },
      ],
      tint: 'blue',
      mock: {
        kind: 'document', title: 'Discharge summary · R. Whitfield', status: 'Draft ready', meta: 'Built from 5 sources · 3 min ago',
        heading: 'Patient summary',
        body: '68-year-old, admitted for atrial fibrillation with rapid ventricular response, 4-day stay.',
        table: { head: ['Metric', 'Admission', 'Discharge'], rows: [['Heart rate', '142 bpm', '78 bpm'], ['INR', '1.1', '2.4'], ['Weight', '81 kg', '79 kg']] },
        heading2: 'Recommendation',
        body2: 'Discharge on current anticoagulant dose, subject to a day-3 INR recheck.',
        sources: ['1 · Admission H&P', '2 · Anticoagulation protocol v5'],
      },
    },
    {
      team: 'Care coordination', title: 'Keep every care plan on track',
      body: "Give case managers a live view of each patient's care plan, referrals and next steps so nothing falls through the cracks.",
      points: [
        { t: 'Care plan updates', d: 'Keep every care team aligned on what changed and why.', icon: 'workflow' },
        { t: 'Referral tracking', d: 'See which referrals are open and who is waiting on what.', icon: 'trend' },
        { t: 'Follow-up scheduling', d: 'Know exactly who needs a callback and by when.', icon: 'clock' },
      ],
      tint: 'sage',
      mock: {
        kind: 'timeline', title: 'Care plan · Patient 48213 · Post-op recovery',
        chips: [{ t: 'On track', tone: 'sage' }, { t: 'No overdue tasks', tone: 'ink' }],
        stats: [{ k: 'Open referrals', v: '2' }, { k: 'Next review', v: '3 days' }, { k: 'Days in plan', v: '12' }],
        events: [
          { time: 'Mon 08:10', t: 'Physical therapy referral sent' },
          { time: 'Tue 14:00', t: 'Home health intake completed' },
          { time: 'Thu 09:30', t: 'Follow-up call scheduled' },
          { time: 'Fri 11:00', t: 'Care plan reviewed, no changes' },
        ],
        cta: 'Review care plan',
      },
    },
    {
      team: 'Compliance & HIPAA', title: 'Stay ready for every audit',
      body: 'Check policies against current regulation, see exactly what changed and keep an inspection-ready trail of every access and disclosure.',
      points: [
        { t: 'Policy answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Audit prep', d: 'Pull the access and disclosure trail for any record in seconds.', icon: 'auditBook' },
        { t: 'Incident tracking', d: 'Flag unusual access patterns for a closer look.', icon: 'bolt' },
      ],
      tint: 'bone',
      mock: {
        kind: 'checklist', title: 'HIPAA readiness · Outpatient clinic', heading: 'Quarterly review', score: '4 of 5 complete', pct: 80,
        items: [
          { ok: true, t: 'Access logs', s: 'Reviewed, no anomalies' },
          { ok: true, t: 'Business associate agreements', s: 'All current' },
          { ok: false, t: 'Staff training', s: '2 of 14 overdue' },
          { ok: true, t: 'Breach risk assessment', s: 'Completed this quarter' },
          { ok: true, t: 'Device encryption', s: '100% compliant' },
        ],
        footer: { label: '', tone: 'dark', text: 'Send training reminders' },
      },
    },
    {
      team: 'Clinical research', title: 'Move research forward faster',
      body: 'Check protocol versions, screen patients against trial criteria and keep every site aligned on what changed.',
      points: [
        { t: 'Protocol answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Literature synthesis', d: 'Pull the relevant evidence together in minutes, not days.', icon: 'layers' },
        { t: 'Site coordination', d: 'Keep every site aligned on the current protocol version.', icon: 'chat' },
      ],
      tint: 'blue',
      mock: {
        kind: 'diff', title: 'Protocol comparison · Study 2024-114 v3 → v4',
        intro: 'Two changes affect eligibility. One needs a re-consent for enrolled patients.',
        lines: [
          { type: 'del', t: 'Eligible age range: 18-65' },
          { type: 'add', t: 'Eligible age range: 18-70' },
          { type: 'add', t: 'Added exclusion: uncontrolled hypertension' },
        ],
        affects: ['112 enrolled patients', '3 sites', 'Consent forms'],
      },
    },
  ],
  quote: {
    text: 'We used to spend an hour pulling a chart together before every discharge. Now our residents start from a complete draft and spend their time on the judgement call.',
    role: 'Chief Medical Information Officer · Regional hospital network',
  },
  securityNote: 'Patient names, medical record numbers and other identifiers are removed before any AI model sees them.',
  faqs: [
    { q: 'How does Anvax help clinical teams draft discharge summaries faster?', a: 'Anvax pulls medication history, labs, prior notes and protocol references for a patient into your discharge summary template. Clinicians start from a complete draft where every figure links back to its source, then review and refine it instead of building it from scratch.' },
    { q: 'Is our patient data used to train AI models?', a: 'No. Your data stays inside your environment and is never used to train models, ours or anyone else’s.' },
    { q: 'Can Anvax connect to our EHR and care management systems?', a: 'Yes. Anvax connects to EHR, care management, referral and document systems. Existing permissions carry over, so people only see what they are already allowed to see.' },
    { q: 'How do we know the answers are accurate?', a: 'Every answer shows the documents it came from. Your team can open the source in one click and check it before acting.' },
    { q: 'Where does Anvax run?', a: 'On your own servers or in your private cloud. Hospitals with stricter requirements can run it fully disconnected from the internet.' },
    { q: 'How quickly can we get started?', a: 'Most hospitals start with one department and two or three workflows, and are up and running within a few weeks. From there it is easy to add more teams.' },
  ],
  cta: { title: 'See Anvax in action for your hospital.', body: 'We will walk you through documentation, care coordination and compliance workflows on sample clinical data in 30 minutes.' },
}
