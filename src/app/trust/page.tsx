import type { Metadata } from 'next'
import TrustClient from './TrustClient'

export const metadata: Metadata = {
  title: 'Architecture & Trust — Anvax',
  description: 'Full defence-in-depth, RBI FREE-AI mapping, DPDP controls, and honest certification status.',
  openGraph: {
    title: 'Architecture & Trust — Anvax',
    description: 'Full defence-in-depth, RBI FREE-AI mapping, DPDP controls.',
    url: 'https://www.anvax.in/trust',
  },
  twitter: { card: 'summary_large_image', title: 'Architecture & Trust — Anvax', description: 'Full defence-in-depth, RBI FREE-AI mapping.' },
  alternates: { canonical: 'https://www.anvax.in/trust' },
}

export default function TrustPage() {
  return <TrustClient />
}
