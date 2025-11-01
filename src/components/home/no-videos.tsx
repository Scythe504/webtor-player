"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { MagnetForm } from "../magnet-form/magnet-form"

export const NoVideos = () => {
  const [open, setOpen] = useState(false)

  return (
    <Card className="w-[300px] h-[300px] flex flex-col justify-center items-center border-dashed border-2 border-muted-foreground/30 hover:border-muted-foreground/50 transition-all">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          No Videos Found
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
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

            <MagnetForm onSubmitSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
