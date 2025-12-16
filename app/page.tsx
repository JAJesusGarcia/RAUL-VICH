import { Navbar } from "@/components/layout/Navbar"
import { VideoHero } from "@/components/media/VideoHero"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <VideoHero />
      </main>
    </>
  )
}
