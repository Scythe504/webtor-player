'use client'
import { ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import GradientBlinds from "../ui/gradient"
import { useRouter } from "next/navigation"

export const HeroSection = () => {
  const router = useRouter()
  const routeToMagnetLinkForm = ()=> {
    router.push("/video")
  }

  return <div className="relative min-h-screen overflow-hidden">
    {/* Animated Gradient Background */}
    <div className="fixed inset-0 w-full h-full flex items-center justify-center">
      <GradientBlinds
        gradientColors={["#0f1629", "#1e3a8a", "#2563eb", "#1d4ed8"]}
        angle={10}
        noise={0.25}
        blindCount={13}
        blindMinWidth={50}
        spotlightRadius={0.38}
        spotlightSoftness={1.6}
        spotlightOpacity={0.42}
        mouseDampening={0.15}
        distortAmount={0}
        shineDirection="left"
        mixBlendMode="overlay"
      />
    </div>
    <div className="relative z-10 flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen w-full px-5 sm:px-20">
          <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-7xl text-balance drop-shadow-2xl">
              Stream Torrents Instantly
            </h1>
            <p className="text-sm sm:text-xl text-white/90 max-w-3xl text-pretty drop-shadow-lg">
              FluxStream transforms torrents into living streams watch instantly while data flows in. No waiting, no setup, just pure playback magic.
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="w-40"
              onClick={routeToMagnetLinkForm}
            >Stream Now</Button>
            <Button variant={"secondary"}
              className="max-w-40"
              onClick={() => {
                const el = document.getElementById("features")
                el?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
            >
              Explore Features <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
}