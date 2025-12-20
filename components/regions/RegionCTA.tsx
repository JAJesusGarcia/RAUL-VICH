import { Button } from "@/components/ui/button"

type Props = {
  label: string
}

export function RegionCTA({ label }: Props) {
  return (
    <section className="py-24 px-6 text-center">
      <h3 className="text-3xl font-bold">Ready for the journey?</h3>
      <p className="mt-4 text-muted-foreground">
        Discover our curated travel packages.
      </p>

      <Button size="lg" className="mt-8">
        {label}
      </Button>
    </section>
  )
}
