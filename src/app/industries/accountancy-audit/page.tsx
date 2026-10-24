import type { Metadata } from 'next'
import IndustryShell from '@/components/industries/IndustryShell'

const sector = 'Accountancy & audit'

export const metadata: Metadata = {
  title: `${sector} | Anvax`,
  description: 'A governed AI workspace for accountancy and audit firms: fieldwork, tax advisory, and engagement management over client data that stays in-house.',
  openGraph: {
    title: `${sector} | Anvax`,
    description: 'A governed AI workspace for accountancy and audit firms: fieldwork, tax advisory, and engagement management over client data that stays in-house.',
    url: 'https://www.anvax.in/industries/accountancy-audit',
  },
  twitter: { card: 'summary_large_image', title: `${sector} | Anvax`, description: 'Audit fieldwork, tax advisory, and engagement management over client ledgers that never leave the firm.' },
  alternates: {
    canonical: 'https://www.anvax.in/industries/accountancy-audit',
    languages: { 'x-default': 'https://www.anvax.in/industries/accountancy-audit', en: 'https://www.anvax.in/industries/accountancy-audit' },
  },
}

export default function AccountancyAuditPage() {
  return (
    <IndustryShell
      sector={sector}
      // placeholder — Sprint 2 fills in real copy
      useCases={[
        'Audit fieldwork: cross-reference client ledgers against prior-year workpapers and flag anomalies for partner review.',
        'Tax advisory: research changing tax code across jurisdictions, draft client memos, and keep a full citation trail.',
        'Engagement management: summarise engagement files, draft management letters, and track independence and conflict requirements.',
      ]}
      // placeholder — Sprint 2 fills in real copy
      deploymentNote="Anvax runs inside the firm's own environment, keeping client ledgers, workpapers, and engagement files off any shared AI platform, in line with the confidentiality obligations audit partners are bound by."
    />
  )
}
