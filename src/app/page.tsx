import { FeaturesCarousel } from "@/components/landing/features";
import { HeroSection } from "@/components/landing/hero-section";

export default function Home() {
  return <main className="relative min-h-screen overflow-hidden">
    <HeroSection />
    <FeaturesCarousel/>
  </main>
}