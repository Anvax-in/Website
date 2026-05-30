import PageMeta from '../components/ui/PageMeta'
import HeroSection from '../components/sections/HeroSection'
import ProblemSection from '../components/sections/ProblemSection'
import PillarsSection from '../components/sections/PillarsSection'
import ArchDiagram from '../components/sections/ArchDiagram'
import IndustriesGrid from '../components/sections/IndustriesGrid'
import ComplianceStrip from '../components/sections/ComplianceStrip'
import VisionSection from '../components/sections/VisionSection'
import CtaSection from '../components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <PageMeta
        title="Anvax — Sovereign AI for India's regulated enterprises"
        description="The AI workspace BFSI and NBFCs can run past their regulator. Search, chat, workflows — on your corpus, auditable by design."
      />
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
