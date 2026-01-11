"use client"

import { motion } from "framer-motion"
import { Music, Drumstick, Flame } from "lucide-react"

const items = [
  {
    icon: Music,
    title: "Traditional Music",
    desc: "Folk rhythms that tell ancient stories."
  },
  {
    icon: Drumstick,
    title: "Local Gastronomy",
    desc: "Flavors passed down through generations."
  },
  {
    icon: Flame,
    title: "Cultural Celebrations",
    desc: "Festivals full of color, dance and identity."
  }
]

export function RegionCulture() {
  return (
    <section className="py-24 px-6 bg-muted/50">
      <motion.div
        className="mx-auto max-w-6xl grid gap-12 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {items.map((i) => (
          <motion.div
            key={i.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <i.icon className="mx-auto h-8 w-8 text-primary" />
            <h4 className="mt-4 font-semibold text-lg">{i.title}</h4>
            <p className="mt-2 text-muted-foreground">{i.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
