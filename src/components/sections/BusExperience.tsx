
import { ComfortFeatures } from "./ConfortFeatures"
import { ScenicRoute } from "./ScenicRoute"

export function BusExperience() {
  return (
    <section className="py-32 px-6 bg-muted/50">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          The Bus Experience
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
          Traveling by luxury bus is not just transportation — it’s part of the
          adventure. Discover landscapes, cultures and stories along the way.
        </p>

        <div className="mt-20">
          <ScenicRoute />
        </div>

        <div className="mt-24">
          <ComfortFeatures />
        </div>
      </div>
    </section>
  )
}
