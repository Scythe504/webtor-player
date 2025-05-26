import VideoPlayer from "@/components/video/video-player"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-zinc-100 dark:bg-zinc-900">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Video Player</h1>
          <ThemeToggle />
        </div>

        <div className="rounded-xl overflow-hidden shadow-2xl">
          <VideoPlayer videoUrl="http://localhost:8080/test-video" />
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Features</h2>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              <span>Custom video controls with modern design</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              <span>Skip forward/backward 10 seconds</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              <span>Volume control with mute toggle</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              <span>Fullscreen support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              <span>Auto-hiding controls during playback</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
