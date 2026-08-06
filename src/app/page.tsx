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
  title: "Anvax: Sovereign AI for India's regulated enterprises",
  description: "The AI workspace BFSI and NBFCs can run past their regulator. Search, chat, workflows, on your corpus, auditable by design.",
  openGraph: {
    title: "Anvax: Sovereign AI for India's regulated enterprises",
    description: "The AI workspace BFSI and NBFCs can run past their regulator. Search, chat, workflows, on your corpus, auditable by design.",
    url: 'https://www.anvax.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anvax: Sovereign AI for India's regulated enterprises",
    description: "The AI workspace BFSI and NBFCs can run past their regulator.",
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
