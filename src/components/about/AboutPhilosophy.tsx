"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutPhilosophy() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      {/* IMAGE */}
      <Image
        src="/images/route.jpg"
        alt="Argentine roads"
        fill
        className="object-cover"
        priority
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Why travel by road?
          </h2>

          <p className="mt-6 text-lg text-white/80">
            Because the road shows what airplanes hide. Landscapes, towns,
            routes, traditions and people. Traveling by bus is traveling
            consciously.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
