import type { Metadata } from 'next'
import PricingHero from '@/components/pricing/PricingHero'
import SavingsCalculator from '@/components/pricing/SavingsCalculator'
import CostCurveChart from '@/components/pricing/CostCurveChart'
import BeyondSeatPrice from '@/components/pricing/BeyondSeatPrice'
import OneFeePanel from '@/components/pricing/OneFeePanel'
import PricingFaq from '@/components/pricing/PricingFaq'
import CtaSection from '@/components/sections/CtaSection'

const title = 'Pricing | Anvax'
const description =
  'One flat annual fee for every employee. See what Microsoft 365 Copilot, ChatGPT Enterprise, Claude Enterprise and Glean would cost your organisation instead.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://www.anvax.in/pricing' },
  openGraph: { title, description, url: 'https://www.anvax.in/pricing' },
}
// No `robots` key: the old page set `{ index: false, follow: false }` (it was an orphaned,
// unlinked India-tier page). This replacement is the real global page, so it should inherit
// the indexable default from `src/app/layout.tsx`'s root metadata. Do not carry the old noindex over.

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <SavingsCalculator />
      <section className="section">
        <div className="container">
          <CostCurveChart />
        </div>
      </section>
      <BeyondSeatPrice />
      <OneFeePanel />
      <PricingFaq />
      <CtaSection
        title="Get a quote for your whole organisation."
        body="Tell us your headcount and where you want Anvax to run. We will come back with one annual figure and the infrastructure it needs."
        primary={{ label: 'Talk to us', href: '/contact' }}
        secondary={{ label: 'See deployment options', href: '/deployment' }}
      />
    </>
  )
}
