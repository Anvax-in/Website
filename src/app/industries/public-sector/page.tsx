import type { Metadata } from 'next'
import IndustryShell from '@/components/industries/IndustryShell'

const sector = 'Public sector & government'

export const metadata: Metadata = {
  title: `${sector} | Anvax`,
  description: 'A governed AI workspace for government agencies and public bodies: policy research, procurement, and governance on sovereign infrastructure.',
  openGraph: {
    title: `${sector} | Anvax`,
    description: 'A governed AI workspace for government agencies and public bodies: policy research, procurement, and governance on sovereign infrastructure.',
    url: 'https://www.anvax.in/industries/public-sector',
  },
  twitter: { card: 'summary_large_image', title: `${sector} | Anvax`, description: 'Policy research and procurement review on sovereign infrastructure, with no outbound network dependency.' },
  alternates: {
    canonical: 'https://www.anvax.in/industries/public-sector',
    languages: { 'x-default': 'https://www.anvax.in/industries/public-sector', en: 'https://www.anvax.in/industries/public-sector' },
  },
}

export default function PublicSectorPage() {
  return (
    <IndustryShell
      sector={sector}
      // placeholder — Sprint 2 fills in real copy
      useCases={[
        'Policy & legislative research: cross-reference legislation, regulations, and precedent across departments.',
        'Procurement: supplier assessment, contract review, and compliance verification against public procurement frameworks.',
        'Governance: maintain an audit trail for every AI-assisted decision, satisfying data sovereignty and FOI obligations.',
      ]}
      // placeholder — Sprint 2 fills in real copy
      deploymentNote="Anvax deploys fully on-premises or on sovereign cloud infrastructure, with no outbound network dependency, so citizen data never leaves the jurisdiction."
    />
  )
}
