import { RegionCTA } from "@/src/components/regions/RegionCTA"
import { RegionCulture } from "@/src/components/regions/RegionCulture"
import { RegionGallery } from "@/src/components/regions/RegionGallery"
import { RegionHero } from "@/src/components/regions/RegionHero"
import { RegionStory } from "@/src/components/regions/RegionStory"
import { RegionVideoHero } from "@/src/components/regions/RegionVideoHero"
import { CityInfo } from "@/src/components/sections/CityInfo"

export default function NorthPage() {
  return (
    <>
      {/* HERO FULL WIDTH */}
      {/* <RegionHero
        title="North Argentina"
        subtitle="Colors, traditions and ancestral landscapes."
        image="/images/north.webp"
      /> */}
      <RegionVideoHero
        title="North Argentina"
        subtitle="Colors, traditions and ancestral landscapes."
        videoSrc="/videos/north.mp4"
        poster="/images/north/hero.jpg"
      />

      <main className="min-h-screen">
        {/* STORY */}
        <RegionStory
          title="A journey through history"
          text="The north of Argentina is a land of contrasts..."
        />

        {/* CULTURE */}
        <RegionCulture />

        {/* KEY CITIES */}
        <section className="py-24 px-6">
          <h2 className="text-3xl font-bold mb-12">
            Key cities & current conditions
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <CityInfo
              city="Salta"
              timezone="America/Argentina/Buenos_Aires"
              lat={-24.7821}
              lon={-65.4232}
            />
            <CityInfo
              city="Jujuy"
              timezone="America/Argentina/Buenos_Aires"
              lat={-24.1858}
              lon={-65.2995}
            />
            <CityInfo
              city="Tucumán"
              timezone="America/Argentina/Buenos_Aires"
              lat={-26.8083}
              lon={-65.2176}
            />
          </div>
        </section>

        {/* GALLERY */}
        <RegionGallery
          images={[
            "/images/north/galleryNorth/north.webp",
            "/images/north/galleryNorth/north-3.webp",
            "/images/north/galleryNorth/north-2.webp",
            "/images/north/galleryNorth/north.webp",
            "/images/north/galleryNorth/north-3.webp",
            "/images/north/galleryNorth/north-2.webp",
          ]}
        />

        {/* CTA */}
        <RegionCTA label="View North Packages" />
      </main>
    </>
  )
}
