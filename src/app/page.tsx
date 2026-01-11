import { Navbar } from "@/src/components/layout/Navbar"
import { VideoHero } from "@/src/components/media/VideoHero"
import { BusExperience } from "@/src/components/sections/BusExperience"
import { Destinations } from "@/src/components/sections/Destinations"

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
