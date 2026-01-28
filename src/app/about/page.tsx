import { AboutFounder } from "@/src/components/about/AboutFounder";
import { AboutHero } from "@/src/components/about/AboutHero";
import { AboutOrigin } from "@/src/components/about/AboutOrigin";
import { AboutPhilosophy } from "@/src/components/about/AboutPhilosophy";
import { AboutPurpose } from "@/src/components/about/AboutPurpose";



export default function AboutPage() {
  return (
    <main className="flex flex-col gap-32 py-24">
      <AboutHero />
      <AboutOrigin />
      <AboutFounder />
      <AboutPhilosophy />
      <AboutPurpose />
    </main>
  )
}
