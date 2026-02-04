import { Button } from "@/src/components/ui/button"

type Props = {
  label: string
}

export function RegionCTA({ label }: Props) {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-5xl rounded-[3rem] bg-zinc-950 p-12 md:p-20 text-center relative overflow-hidden">
        {/* Decoración abstracta */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 italic font-serif">
            The road is calling.
          </h3>
          <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto">
            Our premium buses are ready to take you to the heart of the North.
          </p>
          <Button size="lg" className="rounded-full px-10 py-7 text-lg hover:scale-105 transition-transform">
            {label}
          </Button>
        </div>
      </div>
    </section>
  )
}