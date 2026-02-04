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
    <section className="py-24 px-6 bg-muted/30 dark:bg-zinc-900/20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((i, index) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-background border border-border hover:shadow-xl transition-all group"
            >
              <div className="mb-4 inline-block p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <i.icon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold mb-2">{i.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{i.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
