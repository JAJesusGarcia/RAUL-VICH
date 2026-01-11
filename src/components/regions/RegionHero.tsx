import Image from "next/image"

type Props = {
  title: string
  subtitle: string
  image: string
}

export function RegionHero({ title, subtitle, image }: Props) {
  return (
    <section className="relative h-[90vh]">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg mx-auto">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}
