import { CityInfo } from "@/components/sections/CityInfo"

export default function SouthPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <h1 className="text-5xl font-bold">South Argentina</h1>

      <p className="mt-6 max-w-2xl text-lg">
        Travel through Patagonia, glaciers, lakes and some of the
        most breathtaking landscapes on Earth.
      </p>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
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

      </section>
    </main>
  )
}
