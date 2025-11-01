"use client"

import { useState, useEffect, useRef } from "react"

const features = [
  {
    title: "Stream Instantly, No Waiting",
    desc: "Paste a magnet link and start watching within seconds — FluxStream begins playback as soon as the first chunks arrive.",
    icon: "⚡",
  },
  {
    title: "Save Once, Watch Anywhere",
    desc: "Add videos to your 'Save for Later' list and continue seamlessly across all your devices.",
    icon: "⭐",
  },
  {
    title: "Adaptive Cloud Delivery",
    desc: "Powered by distributed object storage, every video is optimized and delivered in real time — no buffering, no delay.",
    icon: "☁️",
  },
  {
    title: "Private & Secure by Design",
    desc: "Every stream is tokenized and isolated. Only you — or your app — can access your stored content.",
    icon: "🔒",
  },
]

export function FeaturesCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(true)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setShowLeftFade(container.scrollLeft > 0)
      setShowRightFade(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }

    container.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  // const scroll = (direction: "left" | "right") => {
  //   const container = scrollContainerRef.current
  //   if (!container) return

  //   const scrollAmount = 450
  //   container.scrollBy({
  //     left: direction === "left" ? -scrollAmount : scrollAmount,
  //     behavior: "smooth",
  //   })
  // }

  return (
    <section id="features" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Watch Anything, Anytime
          </h2>
          <p className="text-lg text-blue-200/60 text-balance">
            Experience the future of content delivery with FluxStream
          </p>
        </div>

        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-8 pt-2 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="shrink-0 w-full sm:w-80 md:w-96 group/card"
                onMouseEnter={() => setFocusedIndex(index)}
                onMouseLeave={() => setFocusedIndex(null)}
              >
                <div className="relative h-full bg-linear-to-br from-blue-900/30 via-blue-950/40 to-slate-950/50 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 overflow-visible transition-all duration-300 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 group-hover/card:scale-105">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-600/0 via-blue-500/0 to-blue-400/0 group-hover/card:from-blue-600/5 group-hover/card:via-blue-500/5 group-hover/card:to-blue-400/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-blue-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-balance leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-blue-100/70 leading-relaxed grow text-balance">
                      {feature.desc}
                    </p>

                    <div className="mt-6 pt-6 border-t border-blue-500/10">
                      {/* <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div> */}
                      <div
                        className="left-0 h-1.5 bg-linear-to-r from-blue-400 via-blue-500 to-transparent rounded-2xl transition-all duration-500 ease-out"
                        style={{
                          width: focusedIndex === index ? "100%" : "20%",
                          borderTopRightRadius: focusedIndex === index ? "0.5rem" : "0.5rem",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showLeftFade && (
            <div className="absolute left-0 top-2 bottom-8 w-24 sm:w-32 bg-linear-to-r from-slate-950/60 to-transparent pointer-events-none z-20 rounded-2xl"></div>
          )}

          {showRightFade && (
            <div className="absolute right-0 top-2 bottom-8 w-24 sm:w-32 bg-linear-to-l from-slate-950/60 to-transparent pointer-events-none z-20 rounded-2xl"></div>
          )}
        </div>

        <p className="text-center text-sm text-blue-300/40 mt-8">Scroll or use arrows to explore features</p>
      </div>
    </section>
  )
}
