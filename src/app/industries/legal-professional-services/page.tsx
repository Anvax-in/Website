import type { Metadata } from 'next'
import IndustryShell from '@/components/industries/IndustryShell'

const sector = 'Legal & professional services'

export const metadata: Metadata = {
  title: `${sector} | Anvax`,
  description: 'A governed AI workspace for law firms and professional services: matter research, due diligence, and compliance with full privilege protection.',
  openGraph: {
    title: `${sector} | Anvax`,
    description: 'A governed AI workspace for law firms and professional services: matter research, due diligence, and compliance with full privilege protection.',
    url: 'https://www.anvax.in/industries/legal-professional-services',
  },
  twitter: { card: 'summary_large_image', title: `${sector} | Anvax`, description: 'Matter research and due diligence over privileged documents that never leave the firm.' },
  alternates: {
    canonical: 'https://www.anvax.in/industries/legal-professional-services',
    languages: { 'x-default': 'https://www.anvax.in/industries/legal-professional-services', en: 'https://www.anvax.in/industries/legal-professional-services' },
  },
}

export default function LegalProfessionalServicesPage() {
  return (
    <IndustryShell
      sector={sector}
      // placeholder — Sprint 2 fills in real copy
      useCases={[
        'Matter research: search precedents, draft documents, and cross-reference matter files and case law.',
        'Due diligence: summarise contracts and disclosure documents for M&A and transactional work.',
        'Compliance: track regulatory guidance and maintain the privilege-protected audit trail bar councils require.',
      ]}
      // placeholder — Sprint 2 fills in real copy
      deploymentNote="Anvax deploys within the firm's own perimeter, preserving privilege over every document the workspace touches."
    />
  )
}
