"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/src/components/ui/card"

const destinations = [
  {
    title: "North Argentina",
    description: "Mountains, deserts and ancestral cultures.",
    image: "/images/north.webp",
    href: "/destinations/north",
  },
  {
    title: "South Argentina",
    description: "Glaciers, lakes and endless Patagonia.",
    image: "/images/south.webp",
    href: "/destinations/south",
  },
]

export function Destinations() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-4xl font-bold text-center">
          Choose Your Journey
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {destinations.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <Link href={d.href}>
                <Card className="group overflow-hidden cursor-pointer">
                  <CardContent className="relative h-80 p-0">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="text-2xl font-bold">{d.title}</h3>
                      <p className="mt-2 text-white/90">{d.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
