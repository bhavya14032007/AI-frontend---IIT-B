import Hero from '../components/Hero'
import FeatureShowcase from '../components/FeatureShowcase'
import PricingMatrix from '../components/PricingMatrix'
import SocialProof from '../components/SocialProof'

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <FeatureShowcase />
      <PricingMatrix />
    </main>
  )
}
