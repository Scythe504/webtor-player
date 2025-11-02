'use client'
import { useCallback, useEffect, useState } from "react"
import VideoPlayer, { VideoMetadata } from "./video-player"
import { toast } from "sonner"
import { formatFileSize } from "@/lib/utils"
import { Download } from "lucide-react"
import { Button } from "../ui/button"

export const VideoPage = ({ videoId }: {
  videoId: string
}) => {
  const [metadata, setMetadata] = useState<VideoMetadata>()

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch(`${backendURL}/videos/${videoId}/metadata`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        })

        if (!res.ok) {
          throw new Error(`VIDEO METADATA FETCH FAILED ${res}`)
        }

        const data: VideoMetadata = await res.json()

        setMetadata(data)

      } catch (error) {
        setMetadata({
          name: "Video",
          path: "-",
          length: 0,
          extension: ".mkv",
          is_video: true,
        })
        console.error(error)
      }
    }
    fetchMetadata()
  }, [backendURL, videoId])


  const handleDownload = useCallback(() => {
    toast("Coming Soon!", {
      description: "The download feature will come soon, for now just stream torrents as you go!"
    })

    // const body = {
    //   video_id: videoId
    // }

    // fetch(`${backendURL}/videos/${videoId}/save`, {
    //   method: "POST",
    //   body: JSON.stringify(body),
    // }).then(res => {
    //   if (!res.ok) {
    //     throw new Error(`error occured while saving video ${res}`)
    //   }

    //   res.json().then(val => {
    //     toast("Download started" as string, {
    //       description: val.message
    //     })
    //   })
    // }).catch((err) => {
    //   toast("Download couldnt start", {
    //     description: "Some error occured check the logs from \"fluxstream start\" command"
    //   })
    //   console.error(err)
    // })
  }, [])

  return <main className="flex min-h-screen sm:flex-row flex-col items-center md:p-8 gap-2">
    <div className="w-full max-w-5xl mx-auto py-10 px-2 space-y-2">
      {
        videoId && metadata && <>
          <div className="mt-2 w-full flex justify-between gap-2">
            <h1 className="sm:text-xl truncate md:whitespace-normal font-semibold">
              {metadata.name}
            </h1>
            <Button
              variant={"outline"}

              onClick={handleDownload}
            >
              <Download />{metadata.length !== 0 ? formatFileSize(metadata.length) : "-"}
            </Button >
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border">
            <VideoPlayer videoId={videoId} videoUrl={`${backendURL}/videos/${videoId}/stream`} metadata={metadata} />
          </div>
        </>
      }
    </div>
  </main>
}