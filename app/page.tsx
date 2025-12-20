import { Navbar } from "@/components/layout/Navbar"
import { VideoHero } from "@/components/media/VideoHero"
import { BusExperience } from "@/components/sections/BusExperience"
import { Destinations } from "@/components/sections/Destinations"

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="pt-16">
        <VideoHero />
        <BusExperience />
        <Destinations />
      </main>
    </>
  )
}
