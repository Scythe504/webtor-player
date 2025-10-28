'use client'
import { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface VideoProps {
  videoId: string;
  duration: number;
  title: string;
  view_progress: number;
  thumbnail: string;
  processing: boolean;
}

const VideoCard = ({
  videoId,
  duration,
  title,
  view_progress,
  thumbnail,
  processing
}: VideoProps) => {
  return <Card
    key={videoId}
    className="flex flex-col items-start justify-center h-[120px] border-0 p-0 shadow-transparent">
    <CardContent className="flex flex-1 w-full gap-2">
      {/* Thumbnail container */}
      <div className="relative aspect-video w-60 rounded-md overflow-hidden">
        {processing ? (
          <Image
            src={thumbnail}
            alt="thumbnail"
            fill
            className="object-cover"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300/50">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(view_progress / duration) * 100}%` }}
          />
        </div>
      </div>
      <div className="w-[65%]">
        <h1>
          {title}
        </h1>
      </div>
    </CardContent>
  </Card>
}

export const VideosList = () => {
  const [videoList, setVideoList] = useState<VideoProps | null>(null)

  return <Card className="max-h-full relative w-full">
    <CardHeader>
      <CardTitle>
        Watch List
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ScrollArea className="h-[370px]">
        <div className="flex flex-col gap-2">
          <VideoCard
            processing={false}
            videoId="2ifns8-"
            title="Video#1"
            duration={100}
            view_progress={30}
            thumbnail="https://google.com/favicon.ico"
          />
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
}