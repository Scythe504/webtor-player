"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const MagnetForm = () => {
  const [magnet, setMagnet] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    // Basic validation for magnet links
    if (!magnet || !magnet.toLowerCase().startsWith("magnet:")) {
      setError("Please enter a valid magnet link starting with magnet:.")
      return
    }

    setSubmitting(true)

    try {
      const resp = await fetch("http://localhost:8080/video/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ magnet_link: magnet }),
      })

      if (!resp.ok) {
        const text = await resp.text().catch(() => "")
        throw new Error("Request failed. Please try again.")
      }

      const data = (await resp.json()) as { video_id?: string }
      const videoId = data?.video_id
      if (!videoId) {
        throw new Error("No video_id returned from server.")
      }

      // Redirect to the video page
      window.location.href = `http://localhost:3000/video/${encodeURIComponent(videoId)}`
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-3">
        <label htmlFor="magnet" className="block text-sm font-semibold text-foreground">
          Magnet Link
        </label>
        <Input
          id="magnet"
          name="magnet"
          placeholder="magnet:?xt=urn:btih:..."
          value={magnet}
          onChange={(e) => setMagnet(e.target.value)}
          required
          aria-invalid={!!error}
          aria-describedby={error ? "magnet-error" : undefined}
          className="border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
        />
        {error ? (
          <p id="magnet-error" role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">Paste a valid magnet link to stream content</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-10"
      >
        {submitting ? "Processing..." : "Get Video"}
      </Button>
    </form>
  )
}
