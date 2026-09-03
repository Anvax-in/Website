import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import PillarsSection from '@/components/sections/PillarsSection'
import ArchDiagram from '@/components/sections/ArchDiagram'
import IndustriesGrid from '@/components/sections/IndustriesGrid'
import ComplianceStrip from '@/components/sections/ComplianceStrip'
import VisionSection from '@/components/sections/VisionSection'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = {
  title: 'Anvax — Self-hosted governed AI workspace for regulated enterprises',
  description: "The AI workspace for enterprises that cannot put their data into ChatGPT, Glean, or Copilot. Search, chat, workflows and agents — audited, inside your own perimeter.",
  openGraph: {
    title: 'Anvax — Self-hosted governed AI workspace for regulated enterprises',
    description: "The AI workspace for enterprises that cannot put their data into ChatGPT, Glean, or Copilot. Search, chat, workflows and agents — audited, inside your own perimeter.",
    url: 'https://www.anvax.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvax — Self-hosted governed AI workspace for regulated enterprises',
    description: "The AI workspace for enterprises that cannot put their data into ChatGPT, Glean, or Copilot. Audited and inside your perimeter.",
  },
  alternates: { canonical: 'https://www.anvax.in' },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <PillarsSection />
      <ArchDiagram />
      <IndustriesGrid />
      <ComplianceStrip />
      <VisionSection />
      <CtaSection />
    </>
  )
}
