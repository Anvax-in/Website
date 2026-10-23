import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ProblemSection from '@/components/sections/ProblemSection'
import ProductSection from '@/components/sections/ProductSection'
import ConnectorsSection from '@/components/sections/ConnectorsSection'
import DeploymentSection from '@/components/sections/DeploymentSection'
import JurisdictionSection from '@/components/sections/JurisdictionSection'
import PillarsSection from '@/components/sections/PillarsSection'
import FAQSection from '@/components/sections/FAQSection'
import CtaSection from '@/components/sections/CtaSection'

const ogImageUrl = `https://www.anvax.in/api/og?title=${encodeURIComponent('Governed AI Workspace')}`

export const metadata: Metadata = {
  title: 'Anvax | Governed AI Workspace',
  description: "The AI workspace for enterprises that cannot put their data into ChatGPT, Glean, or Copilot. Search, chat, agents, and governance, audited, inside your own perimeter.",
  openGraph: {
    title: 'Anvax | Governed AI Workspace',
    description: "The AI workspace for enterprises that cannot put their data into ChatGPT, Glean, or Copilot. Search, chat, agents, and governance, audited, inside your own perimeter.",
    url: 'https://www.anvax.in',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'Anvax' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvax | Governed AI Workspace',
    description: "The AI workspace for enterprises that cannot put their data into ChatGPT, Glean, or Copilot. Audited and inside your perimeter.",
    images: [ogImageUrl],
  },
  alternates: { canonical: 'https://www.anvax.in', languages: { 'x-default': 'https://www.anvax.in', en: 'https://www.anvax.in' } },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <ProductSection />
      <ConnectorsSection />
      <DeploymentSection />
      <JurisdictionSection />
      <PillarsSection />
      <FAQSection />
      <CtaSection />
    </>
  )
}
