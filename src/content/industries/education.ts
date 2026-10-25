import type { Industry } from './types'

export const education: Industry = {
  slug: 'education',
  name: 'Education',
  metaDescription: 'Clear answers for students and faster admissions decisions. Anvax gives student services, admissions and compliance teams answers from your own policies and systems, inside your own perimeter.',
  hero: {
    h1: 'Clear Answers For Students. Faster Admissions. Full Compliance.',
    lede: 'Give student services, admissions and compliance teams an AI assistant that works on your own policies and systems, so students get answers sooner and every decision is accountable.',
    chat: {
      workspace: 'Student services workspace',
      question: 'Is a student with 2 outstanding credits in their final semester eligible to graduate under the new curriculum requirements?',
      answer: [
        'No. The new curriculum requires all core credits to be completed before the final semester begins, per Academic Policy 7.3.',
        'The student qualifies for a one-semester extension under the transition provision, since they enrolled before the policy change.',
      ],
      sources: [
        { n: 1, title: 'Academic Policy 7.3 · Graduation requirements', system: 'SharePoint' },
        { n: 2, title: 'Student record · enrolment history', system: 'Banner' },
      ],
      tags: [{ t: '1 student ID redacted', tone: 'ink' }, { t: 'Logged · entry 1,774,902', tone: 'sage' }],
    },
  },
  story: {
    label: 'Customer story · Public university',
    title: 'How a university cut advising response time by 60%.',
    challenge: 'Advisors manually checked academic policy, degree audits and enrolment history across separate systems for every student query.',
    result: 'Advisors now see the full academic picture and next steps for any student in seconds.',
    stats: [
      { figure: '60%', label: 'faster advising responses' },
      { figure: '9 hrs', label: 'saved per advisor, every week' },
      { figure: '89%', label: 'of advisors use it every week' },
    ],
  },
  benefitsEyebrow: 'AI for education',
  benefitsTitle: 'Do more with the records your institution already has.',
  benefits: [
    { icon: 'trend', title: 'Clear the advising backlog', body: 'Cut manual work in advising, admissions and accreditation so students get answers sooner.' },
    { icon: 'agent', title: 'Give advisors their time back', body: 'Free advisors and admissions officers from repetitive policy lookups so they can focus on students.' },
    { icon: 'search', title: 'Decide with the full record', body: 'Bring policy, enrolment history and prior decisions together so every answer has the right context.' },
  ],
  teamsTitle: 'One assistant for every team on campus.',
  teams: [
    {
      team: 'Student services & advising', title: 'Answer every student question faster',
      body: 'Check academic policy and a student’s record together, and give a clear, sourced answer instead of a multi-day email chain.',
      points: [
        { t: 'Policy answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Degree audits', d: 'See exactly what a student needs to graduate, in seconds.', icon: 'check' },
        { t: 'Case notes', d: 'Turn advising notes into updates and follow-ups automatically.', icon: 'chat' },
      ],
      tint: 'blue',
      mock: {
        kind: 'document', title: 'Advising note · Graduation eligibility review', status: 'Draft ready', meta: 'Built from 4 sources · 2 min ago',
        heading: 'Student summary',
        body: 'Final-semester student, 2 outstanding core credits under the new curriculum.',
        table: { head: ['Requirement', 'Status', 'Note'], rows: [['Core credits', '2 outstanding', 'Transition provision applies'], ['GPA minimum', 'Met', '3.4 cumulative'], ['Residency credits', 'Met', 'Completed Year 2']] },
        heading2: 'Recommendation',
        body2: 'Approve a one-semester extension under the transition provision.',
        sources: ['1 · Academic Policy 7.3', '2 · Enrolment history record'],
      },
    },
    {
      team: 'Admissions', title: 'Review applications with the full picture',
      body: 'Bring transcripts, test scores and supporting documents together so admissions teams can decide with confidence.',
      points: [
        { t: 'Application triage', d: 'Sort new applications by program fit and completeness.', icon: 'workflow' },
        { t: 'Transcript checks', d: 'Confirm prerequisite coursework instantly.', icon: 'check' },
        { t: 'Decision summaries', d: 'A one-page view of any applicant, ready for committee.', icon: 'file' },
      ],
      tint: 'sage',
      mock: {
        kind: 'checklist', title: 'Application review · J. Alvarez', heading: 'Admissions checklist', score: '4 of 5 complete', pct: 80,
        items: [
          { ok: true, t: 'Transcript received', s: 'Verified, meets prerequisites' },
          { ok: true, t: 'Test scores', s: 'Above program minimum' },
          { ok: false, t: 'Recommendation letters', s: '1 of 2 received' },
          { ok: true, t: 'Personal statement', s: 'Reviewed, no flags' },
          { ok: true, t: 'Application fee', s: 'Paid' },
        ],
        footer: { label: '', tone: 'dark', text: 'Send reminder for second letter' },
      },
    },
    {
      team: 'Compliance & accreditation', title: 'Stay ready for every review',
      body: 'Check policies against accreditation standards, see exactly what changed and keep a review-ready trail of every decision.',
      points: [
        { t: 'Standard checks', d: 'Test any program against current accreditation standards instantly.', icon: 'check' },
        { t: 'Change tracking', d: 'Compare policy versions and see exactly what moved.', icon: 'bolt' },
        { t: 'Audit prep', d: 'Pull the decision trail for any case in seconds.', icon: 'auditBook' },
      ],
      tint: 'bone',
      mock: {
        kind: 'diff', title: 'Accreditation update · Program standards v8 to v9',
        intro: 'Two changes affect curriculum. One needs catalog updates before next intake.',
        lines: [
          { type: 'del', t: 'Internship hours: 120 minimum' },
          { type: 'add', t: 'Internship hours: 150 minimum' },
          { type: 'add', t: 'Added: annual learning outcomes review' },
        ],
        affects: ['3 programs', 'Course catalog', 'Faculty handbook'],
      },
    },
    {
      team: 'Faculty & research support', title: 'Support faculty and research faster',
      body: 'Give faculty instant answers on policy, funding and compliance, so research moves without waiting on email replies.',
      points: [
        { t: 'Grant answers', d: 'Ask any question and get the answer with its source.', icon: 'search' },
        { t: 'Literature synthesis', d: 'Pull the relevant research together in minutes, not days.', icon: 'layers' },
        { t: 'IRB status', d: 'See exactly where a research protocol stands in review.', icon: 'clock' },
      ],
      tint: 'blue',
      mock: {
        kind: 'brief', title: 'Faculty brief · Grant renewal', initials: 'RL', name: 'Dr. R. Lindqvist', sub: 'Biology department · NSF grant',
        stats: [{ k: 'Funding remaining', v: '$84K' }, { k: 'Renewal due', v: '21 days' }], listTitle: 'Worth raising',
        list: ['Progress report draft is due before the renewal deadline.', 'One co-investigator’s IRB approval expires next month.', 'Budget underspend flagged in last review.'],
      },
    },
  ],
  quote: {
    text: 'Our advisors used to check three systems to answer one policy question. Now the answer arrives with the record next to it, and students get a response the same day.',
    role: 'Dean of Student Services · Public university',
  },
  securityNote: 'Student names, ID numbers and other identifying details are removed before any AI model sees them.',
  faqs: [
    { q: 'How does Anvax help advisors answer student questions faster?', a: 'Anvax checks academic policy against a student’s record and drafts a sourced recommendation. Advisors start from a complete answer instead of checking multiple systems manually.' },
    { q: 'Is our student data used to train AI models?', a: 'No. Your data stays inside your environment and is never used to train models, ours or anyone else’s.' },
    { q: 'Can Anvax connect to our student information and LMS systems?', a: 'Yes. Anvax connects to student information systems, learning management systems, and document and collaboration tools. Existing permissions carry over, so people only see what they are already allowed to see.' },
    { q: 'How do we know the answers are accurate?', a: 'Every answer shows the documents it came from. Your team can open the source in one click and check it before acting.' },
    { q: 'Where does Anvax run?', a: 'On your own servers or in your private cloud. Institutions with stricter requirements can run it fully disconnected from the internet.' },
    { q: 'How quickly can we get started?', a: 'Most institutions start with one department and two or three workflows, and are up and running within a few weeks. From there it is easy to add more teams.' },
  ],
  cta: { title: 'See Anvax in action for your institution.', body: 'We will walk you through advising, admissions and compliance workflows on sample academic data in 30 minutes.' },
}
