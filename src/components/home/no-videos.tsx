"use client"
import Animation from '../../../public/dragon-walking.gif'
// import { useState } from "react"
// import { PlusCircle } from "lucide-react"
// import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog"
// import { MagnetForm } from "../magnet-form/magnet-form"
import Image from "next/image"

export const NoVideos = () => {
  // const [open, setOpen] = useState(false)

  return (
    <Card className="w-[360px] h-[300px] flex flex-col justify-center items-center border-2 border-muted-foreground/30 hover:border-muted-foreground/50 transition-all">
      <CardHeader className="w-full">
        <CardTitle className="text-lg text-center font-semibold ">
          More Things Coming Soon!
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="flex items-center gap-2"
            >
              Stream Now <PlusCircle className="w-4 h-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Torrent</DialogTitle>
              <DialogDescription>
                Paste a magnet link to start streaming instantly.
              </DialogDescription>
            </DialogHeader>

            <MagnetForm/>
          </DialogContent>
        </Dialog> */}
        <Image
          alt='walking-dragon'
          src={Animation}
          height={300}
          width={350}
        />
      </CardContent>
    </Card>
  )
}
