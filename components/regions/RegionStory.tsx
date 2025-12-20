import { Reveal } from "@/components/animations/Reveal"

type Props = {
  title: string
  text: string
}

export function RegionStory({ title, text }: Props) {
  return (
    <section className="py-24 px-6">
      <Reveal>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {text}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
