import { RegionVideoHero } from "@/src/components/regions/RegionVideoHero"
import { RegionStory } from "@/src/components/regions/RegionStory"
import { RegionCulture } from "@/src/components/regions/RegionCulture"
import { RegionGallery } from "@/src/components/regions/RegionGallery"
import { RegionCTA } from "@/src/components/regions/RegionCTA"
import { CityInfo } from "@/src/components/sections/CityInfo"
import { MEDIA } from "@/src/constants/media"
import { getMediaUrl } from "@/src/lib/media"

export default function SouthPage() {
  return (
    <>
      <RegionVideoHero
        title="South Argentina"
        subtitle="Glaciers, lakes and the end of the world."
        videoSrc={getMediaUrl("video", MEDIA.home.video.heroSouth)}
        poster="/images/south/hero.jpg"
      />

      <main className="min-h-screen">
        <RegionStory
          title="Patagonia, raw and unforgettable"
          text="Southern Argentina offers vast landscapes, crystal lakes, ancient glaciers and a deep connection with nature."
        />

        <RegionCulture />

        <section className="py-24 px-6">
          <h2 className="text-3xl font-bold mb-12">
            Key cities & current conditions
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <CityInfo
              city="Bariloche"
              timezone="America/Argentina/Buenos_Aires"
              lat={-41.1335}
              lon={-71.3103}
            />
            <CityInfo
              city="El Calafate"
              timezone="America/Argentina/Buenos_Aires"
              lat={-50.3379}
              lon={-72.2648}
            />
            <CityInfo
              city="Ushuaia"
              timezone="America/Argentina/Buenos_Aires"
              lat={-54.8019}
              lon={-68.3030}
            />
          </div>
        </section>

        <RegionGallery
          images={MEDIA.home.images.south.map((img: string) =>
           getMediaUrl("image", img)
          )}
        />

        {/* <RegionGallery
          images={[
            "/images/south/gallerySouth/1.jpeg",
            "/images/south/gallerySouth/2.jpeg",
            "/images/south/gallerySouth/3.jpeg",
            "/images/south/gallerySouth/4.jpeg",
            "/images/south/gallerySouth/1.jpeg",
            "/images/south/gallerySouth/2.jpeg",
          ]}
        /> */}

        <RegionCTA label="View Patagonia Packages" />
      </main>
    </>
  )
}
