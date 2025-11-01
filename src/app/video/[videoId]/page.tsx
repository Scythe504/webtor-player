'use client'
import { VideoPage } from "@/components/video/video-page"
import { usePathname } from "next/navigation"

export default function Home() {
  const pathname = usePathname()
  const splitPathname = pathname.split('/')
  const videoId = splitPathname[splitPathname.length - 1]

  return (
    <VideoPage videoId={videoId} />
  )
}
