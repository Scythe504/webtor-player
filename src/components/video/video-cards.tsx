'use client'
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { Download, Play } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface VideoProps {
  videoId: string
  duration: number
  title: string
  view_progress: number
  processing: boolean
}

export const VideoCard = ({ videoId, title, processing }: VideoProps) => {
  const router = useRouter()

  return (
    <Card
      onClick={() => {
        if (!processing) {
          router.push(`/video/${videoId}`)
        } else {
          toast("Downloading...", {
            description: "Video is being downloaded, please try again later"
          })
        }
      }}
      key={videoId}
      className="relative flex flex-col 
      md:h-[300px] md:w-[300px] h-[250px]
       overflow-hidden border-0
        bg-linear-to-br 
        from-secondary/90
        via-primary/20 
         to-foreground/20
         transition-all hover:scale-[1.02] drop-shadow-sm shadow-foreground-1"
    >
      <CardContent className="flex-1 flex items-center justify-center px-4">
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <CardTitle className="text-lg dark:text-white text-zinc-950 truncate">{title}</CardTitle>
        <Button size="icon" variant="secondary" className="rounded-full shrink-0">
          {!processing ? <Play className="w-4 h-4 fill-accent-foreground stroke-accent-foreground" /> : <Download className="w-4 h-4 fill-accent-foreground stroke-accent-foreground" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
