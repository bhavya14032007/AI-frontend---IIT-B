import Navbar from '../components/Navbar'
import AnimatedBackground from '../components/AnimatedBackground'
import Hero from '../components/Hero'
import SocialProof from '../components/SocialProof'
import FeatureShowcase from '../components/FeatureShowcase'
import HowItWorks from '../components/HowItWorks'
import PricingMatrix from '../components/PricingMatrix'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <FeatureShowcase />
        <HowItWorks />
        <PricingMatrix />
      </main>
      <Footer />
    </>
  )
}
