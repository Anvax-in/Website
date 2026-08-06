import type { Metadata } from 'next'
import IndustriesClient from './IndustriesClient'

export const metadata: Metadata = {
  title: 'Industries | Anvax',
  description: 'NBFC-first vertical packs with RBI circular tracking, credit workflows, and role-based AI.',
  openGraph: {
    title: 'Industries | Anvax',
    description: 'NBFC-first vertical packs with RBI circular tracking, credit workflows, and role-based AI.',
    url: 'https://www.anvax.in/industries',
  },
  twitter: { card: 'summary_large_image', title: 'Industries | Anvax', description: 'NBFC-first vertical packs with RBI circular tracking.' },
  alternates: { canonical: 'https://www.anvax.in/industries' },
}

export default function IndustriesPage() {
  return <IndustriesClient />
}
