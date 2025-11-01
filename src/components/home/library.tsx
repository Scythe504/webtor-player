'use client'
import { useEffect, useState } from "react"
import { VideoCard } from "../video/video-cards"
import { Skeleton } from "../ui/skeleton"
import { ScrollArea } from "../ui/scroll-area"
import { NoVideos } from "./no-videos"

interface Video {
  id: string
  magnet_link: string
  status: "processing" | "downloading" | "downloaded" | "failed"
  file_path: string | null
  deleted: boolean
}

export const Library = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`,
          {
            method: "GET",
          }
        )

        if (!res.ok) throw new Error("Failed to fetch videos")

        const data = await res.json()
        setVideos(data)
      } catch (err) {
        console.error("Error fetching videos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])



  return <div>
    <div className="flex md:flex-row flex-col gap-2">
      {loading ? (
        <>
          <Skeleton className="md:h-[300px] h-[250px] md:w-[300px]" />
        </>
      ) : videos && videos.length > 0 ? (
        <ScrollArea className="h-[470px] w-full">
          {
            videos.map((v) => (
              <VideoCard
                key={v.id}
                processing={v.status !== "downloaded"}
                videoId={v.id}
                title={v.file_path?.split('/').pop() || v.id}
                duration={100}
                view_progress={0}
              />
            ))
          }
        </ScrollArea>
      )
        : (
          <NoVideos />
        )}
    </div>
  </div>
}

