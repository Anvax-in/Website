import type { Metadata } from 'next'
import IndustryShell from '@/components/industries/IndustryShell'

const sector = 'Architecture, engineering & construction'

export const metadata: Metadata = {
  title: `${sector} | Anvax`,
  description: 'A governed AI workspace for AEC firms: project documentation, code compliance, and bid preparation over drawings and specifications that stay on-site.',
  openGraph: {
    title: `${sector} | Anvax`,
    description: 'A governed AI workspace for AEC firms: project documentation, code compliance, and bid preparation over drawings and specifications that stay on-site.',
    url: 'https://www.anvax.in/industries/architecture-engineering-construction',
  },
  twitter: { card: 'summary_large_image', title: `${sector} | Anvax`, description: 'Project documentation and code compliance over drawings and specifications that never leave the firm.' },
  alternates: {
    canonical: 'https://www.anvax.in/industries/architecture-engineering-construction',
    languages: { 'x-default': 'https://www.anvax.in/industries/architecture-engineering-construction', en: 'https://www.anvax.in/industries/architecture-engineering-construction' },
  },
}

export default function ArchitectureEngineeringConstructionPage() {
  return (
    <IndustryShell
      sector={sector}
      // placeholder — Sprint 2 fills in real copy
      useCases={[
        'Project documentation: search drawings, specifications, and RFIs across a live project corpus, without re-uploading anything.',
        'Compliance: cross-reference building codes and planning conditions against design documents before submission.',
        'Bid preparation: draft tender responses and summarise technical specifications for non-technical stakeholders.',
      ]}
      // placeholder — Sprint 2 fills in real copy
      deploymentNote="Anvax deploys on-site or inside the firm's own cloud tenancy, keeping drawings, specifications, and client project data off any shared AI platform."
    />
  )
}
