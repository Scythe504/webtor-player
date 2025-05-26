"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2, Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  videoUrl: string
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Check if the video URL is accessible
        const response = await fetch(videoUrl, { method: "HEAD" })

        if (!response.ok) {
          throw new Error(`Failed to load video: ${response.status} ${response.statusText}`)
        }

        setIsLoading(false)
      } catch (err) {
        setError(`Error loading video: ${err instanceof Error ? err.message : "Unknown error"}`)
        setIsLoading(false)
      }
    }

    fetchVideo()
  }, [videoUrl])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    if (isHovering || isPlaying) {
      setShowControls(true)
      controlsTimeoutRef.current = setTimeout(() => {
        if (!isHovering && isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    } else {
      setShowControls(true)
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isHovering, isPlaying])

  const handleVideoLoaded = () => {
    setIsLoading(false)
    setDuration(videoRef.current?.duration || 0)
  }

  const handleVideoError = () => {
    setError("Failed to load video. Please check the URL and try again.")
    setIsLoading(false)
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    setVolume(newVolume)
    video.volume = newVolume

    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume || 1
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    const container = videoContainerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const skipForward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.min(video.currentTime + 10, video.duration)
  }

  const skipBackward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(video.currentTime - 10, 0)
  }

  return (
    <div
      ref={videoContainerRef}
      className="relative w-full rounded-lg overflow-hidden bg-zinc-900 shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-10">
          <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
          <span className="mt-4 text-zinc-400 font-medium">Loading video...</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-10 p-6">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <h3 className="text-red-500 font-semibold text-lg mb-2">Error Loading Video</h3>
          <p className="text-zinc-400 text-center max-w-md">{error}</p>
        </div>
      )}

      <video
        ref={videoRef}
        className={cn("w-full cursor-pointer aspect-video bg-black", isLoading || error ? "opacity-0" : "opacity-100")}
        onClick={togglePlay}
        onLoadedData={handleVideoLoaded}
        onError={handleVideoError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls Overlay */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/40 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0",
          (isLoading || error) && "hidden",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with title */}
        <div className="p-4 flex items-center">
          <h2 className="text-white font-medium text-lg truncate">Video from backend</h2>
        </div>

        {/* Center play button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {!isPlaying && (
            <button
              className="w-20 h-20 bg-zinc-800/80 rounded-full flex items-center justify-center text-white pointer-events-auto transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              onClick={togglePlay}
            >
              <Play className="w-10 h-10 fill-white" />
            </button>
          )}
        </div>

        {/* Bottom controls */}
        <div className="p-4 space-y-2">
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-300 font-medium min-w-[40px]">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="flex-1 cursor-pointer [&>span:first-child]:h-1.5 [&>span:first-child]:bg-zinc-600 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-0 [&_[role=slider]]:bg-white [&>span:first-child_span]:bg-zinc-300"
            />
            <span className="text-xs text-zinc-300 font-medium min-w-[40px]">{formatTime(duration)}</span>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-zinc-300 hover:text-white rounded-full focus:outline-none"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                className="p-2 text-zinc-300 hover:text-white rounded-full focus:outline-none"
                onClick={skipBackward}
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                className="p-2 text-zinc-300 hover:text-white rounded-full focus:outline-none"
                onClick={skipForward}
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1 group relative">
                <button
                  className="p-2 text-zinc-300 hover:text-white rounded-full focus:outline-none"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <div className="w-0 overflow-hidden transition-all duration-200 group-hover:w-24">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-zinc-600 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-0 [&_[role=slider]]:bg-white [&>span:first-child_span]:bg-zinc-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <button
                className="p-2 text-zinc-300 hover:text-white rounded-full focus:outline-none"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
