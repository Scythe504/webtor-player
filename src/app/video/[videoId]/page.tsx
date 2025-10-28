'use client'
import { VideosList } from "@/components/video/video-lists"
import VideoPlayer from "@/components/video/video-player"
import { usePathname } from "next/navigation"

export default function Home() {
  const pathname = usePathname()
  const splitPathname = pathname.split('/')
  const videoId = splitPathname[splitPathname.length - 1]

  return (
    <main className="flex min-h-screen sm:flex-row flex-col items-center p-4 md:p-8 gap-2">
      <div className="w-full max-w-5xl mx-auto py-10">
        {
          videoId &&
          <div className="rounded-xl overflow-hidden shadow-2xl border">
            <VideoPlayer videoUrl={`http://localhost:8080/video/stream/${videoId}`} />
          </div>
        }
      </div>
      <div className="sm:w-[550px] h-full">
        <VideosList/>
      </div>
    </main>
  )
}
