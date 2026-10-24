import type { Metadata } from 'next'
import IndustryShell from '@/components/industries/IndustryShell'

const sector = 'Wealth & asset management'

export const metadata: Metadata = {
  title: `${sector} | Anvax`,
  description: 'A governed AI workspace for wealth and asset managers: portfolio review, research, and compliance over client data that never leaves the firm.',
  openGraph: {
    title: `${sector} | Anvax`,
    description: 'A governed AI workspace for wealth and asset managers: portfolio review, research, and compliance over client data that never leaves the firm.',
    url: 'https://www.anvax.in/industries/wealth-asset-management',
  },
  twitter: { card: 'summary_large_image', title: `${sector} | Anvax`, description: 'Portfolio review and investment research over client data that stays inside your own infrastructure.' },
  alternates: {
    canonical: 'https://www.anvax.in/industries/wealth-asset-management',
    languages: { 'x-default': 'https://www.anvax.in/industries/wealth-asset-management', en: 'https://www.anvax.in/industries/wealth-asset-management' },
  },
}

export default function WealthAssetManagementPage() {
  return (
    <IndustryShell
      sector={sector}
      // placeholder — Sprint 2 fills in real copy
      useCases={[
        'Portfolio review: synthesise research and generate client-ready portfolio summaries and suitability notes.',
        'Compliance: track regulatory guidance across the FCA, SEC, and MAS, and maintain the suitability and advice audit trail.',
        'Research: cross-reference filings, analyst notes, and market data for investment committee briefings.',
      ]}
      // placeholder — Sprint 2 fills in real copy
      deploymentNote="Anvax runs inside the firm's own infrastructure, so client portfolios and proprietary research never pass through a third-party model."
    />
  )
}
