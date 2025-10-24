import { MagnetForm } from "@/components/magnet-form/magnet-form"

export default function FetchMagnet() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-primary text-balance">Fetch video from a magnet link</h1>
        <p className="text-sm text-muted-foreground">
          Paste a magnet link below. We’ll request a video ID and take you to its page.
        </p>
      </header>

      <section>
        <MagnetForm />
      </section>
    </main>
  )
}
