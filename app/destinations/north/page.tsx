import { CityInfo } from "@/components/sections/CityInfo"

export default function NorthPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <h1 className="text-5xl font-bold">North Argentina</h1>

      <p className="mt-6 max-w-2xl text-lg">
        Discover the cultural heart of Argentina through mountains,
        colorful villages and ancestral traditions.
      </p>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <CityInfo
          city="Salta"
          timezone="America/Argentina/Salta"
          lat={-24.7821}
          lon={-65.4232}
        />
        <CityInfo
          city="Jujuy"
          timezone="America/Argentina/Jujuy"
          lat={-24.1858}
          lon={-65.2995}
        />
        <CityInfo
          city="Tucumán"
          timezone="America/Argentina/Tucuman"
          lat={-26.8083}
          lon={-65.2176}
        />
      </section>
    </main>
  )
}
