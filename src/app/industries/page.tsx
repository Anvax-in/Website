import type { Metadata } from 'next'
import IndustriesClient from './IndustriesClient'

export const metadata: Metadata = {
  title: 'Industries | Anvax',
  description: 'Vertical packs for enterprises that cannot use public AI, financial services, healthcare, legal, public sector, defence, and technology.',
  openGraph: {
    title: 'Industries | Anvax',
    description: 'Vertical packs for enterprises that cannot use public AI, financial services, healthcare, legal, public sector, defence, and technology.',
    url: 'https://www.anvax.in/industries',
  },
  twitter: { card: 'summary_large_image', title: 'Industries | Anvax', description: 'Six vertical packs for enterprises where data cannot leave the building.' },
  alternates: { canonical: 'https://www.anvax.in/industries' },
}

export default function IndustriesPage() {
  return <IndustriesClient />
}
