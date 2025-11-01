import { Header } from "@/components/home/header"
import { Library } from "@/components/home/library"
import { MagnetForm } from "@/components/magnet-form/magnet-form"

export default function FetchMagnet() {

  return (
    <main className="flex min-h-screen sm:flex-row flex-col md:p-8 gap-2">
      <div className="w-full max-w-5xl mx-auto py-10 px-2 space-y-2">
        <Header />
        <Library/>
      </div>
    </main>
  )
}
