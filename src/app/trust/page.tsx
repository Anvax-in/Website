import type { Metadata } from 'next'
import TrustClient from './TrustClient'

export const metadata: Metadata = {
  title: 'Security & Architecture | Anvax',
  description: 'Tenant isolation, read-only connectors, scoped retrieval, and an immutable audit trail — running inside your cloud or your data centre. Controls, certifications, and framework mappings for SOC 2, ISO 27001, GDPR, EU AI Act, DORA, NIST AI RMF, RBI FREE-AI, and DPDP.',
  openGraph: {
    title: 'Security & Architecture | Anvax',
    description: 'Built to pass your security review, not just your demo. Tenant isolation, read-only connectors, scoped retrieval, immutable audit trail — deployed inside your perimeter.',
    url: 'https://www.anvax.in/trust',
  },
  twitter: { card: 'summary_large_image', title: 'Security & Architecture | Anvax', description: 'Built to pass your security review, not just your demo. Controls, certifications, and framework mappings.' },
  alternates: { canonical: 'https://www.anvax.in/trust' },
}

export default function TrustPage() {
  return <TrustClient />
}
