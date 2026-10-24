import type { Metadata } from 'next'
import IndustryShell from '@/components/industries/IndustryShell'

const sector = 'Insurance brokers & MGAs'

export const metadata: Metadata = {
  title: `${sector} | Anvax`,
  description: 'A governed AI workspace for brokers and MGAs: underwriting, claims, and compliance over policy and claims data that never leaves your perimeter.',
  openGraph: {
    title: `${sector} | Anvax`,
    description: 'A governed AI workspace for brokers and MGAs: underwriting, claims, and compliance over policy and claims data that never leaves your perimeter.',
    url: 'https://www.anvax.in/industries/insurance-brokers-mgas',
  },
  twitter: { card: 'summary_large_image', title: `${sector} | Anvax`, description: 'Underwriting, claims, and compliance workflows over data that stays inside your own infrastructure.' },
  alternates: {
    canonical: 'https://www.anvax.in/industries/insurance-brokers-mgas',
    languages: { 'x-default': 'https://www.anvax.in/industries/insurance-brokers-mgas', en: 'https://www.anvax.in/industries/insurance-brokers-mgas' },
  },
}

export default function InsuranceBrokersMgasPage() {
  return (
    <IndustryShell
      sector={sector}
      // placeholder — Sprint 2 fills in real copy
      useCases={[
        'Underwriting support: triage new submissions, cross-reference policy wordings and reinsurance treaties, and draft underwriting notes for referral.',
        'Claims handling: summarise claims files, cross-reference policy terms and prior rulings, and draft adjuster reports for faster turnaround.',
        'Compliance: track FCA, IRDAI, and local conduct-of-business rules, and maintain an audit trail of the advice given to each client.',
      ]}
      // placeholder — Sprint 2 fills in real copy
      deploymentNote="Anvax runs inside the broker's or MGA's own infrastructure, so policyholder data, claims files, and reinsurance treaties never leave the perimeter or pass through a shared model."
    />
  )
}
