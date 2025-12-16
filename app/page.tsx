import { Navbar } from "@/components/layout/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center">
            Discover Argentina by Road
          </h1>
        </section>
      </main>
    </>
  )
}

