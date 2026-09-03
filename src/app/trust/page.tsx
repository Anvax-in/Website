import type { Metadata } from 'next'
import TrustClient from './TrustClient'

export const metadata: Metadata = {
  title: 'Architecture & Trust | Anvax',
  description: 'Full defence-in-depth, framework control mappings across SOC 2, ISO 27001, GDPR, EU AI Act, DORA, NIST AI RMF, and honest certification status.',
  openGraph: {
    title: 'Architecture & Trust | Anvax',
    description: 'Full defence-in-depth, framework control mappings across SOC 2, ISO 27001, GDPR, EU AI Act, DORA, NIST AI RMF, and honest certification status.',
    url: 'https://www.anvax.in/trust',
  },
  twitter: { card: 'summary_large_image', title: 'Architecture & Trust | Anvax', description: 'Defence-in-depth, framework mappings, and honest certification status. No vague assurances.' },
  alternates: { canonical: 'https://www.anvax.in/trust' },
}

export default function TrustPage() {
  return <TrustClient />
}
