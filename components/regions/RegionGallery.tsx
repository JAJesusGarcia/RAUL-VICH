"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type Props = {
  images: string[]
}

export function RegionGallery({ images }: Props) {
  return (
    <section className="py-24 px-6">
      <motion.div
        className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative h-72"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={img}
              alt="Gallery image"
              fill
              className="object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
