import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact — Anvax',
  description: 'Request a demo, ask about deployment options, or get in touch with the Anvax team.',
  openGraph: {
    title: 'Contact — Anvax',
    description: 'Request a demo or get in touch.',
    url: 'https://www.anvax.in/contact',
  },
  twitter: { card: 'summary_large_image', title: 'Contact — Anvax', description: 'Request a demo or get in touch.' },
  alternates: { canonical: 'https://www.anvax.in/contact' },
}

export default function ContactPage() {
  return <ContactClient />
}
