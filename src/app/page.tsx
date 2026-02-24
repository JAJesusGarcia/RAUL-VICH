import { VideoHero } from "@/src/components/media/VideoHero"
import { BusExperience } from "@/src/components/sections/BusExperience"
import { Destinations } from "@/src/components/sections/Destinations"
import { BusJourney } from "../components/animations/BusJourney"

export default function Home() {
  return (
    <>
      <main className="pt-16">
        <VideoHero />
        <BusExperience />
        <Destinations />
        {/* <BusJourney />  */}
      </main>
    </>
  )
}
