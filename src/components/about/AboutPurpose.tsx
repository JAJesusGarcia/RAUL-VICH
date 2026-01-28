"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function AboutPurpose() {
  return (
    <section className="mx-auto max-w-5xl px-6 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold"
      >
        Our purpose
      </motion.h2>

      <p className="mt-6 text-muted-foreground">
        To connect people with Argentina through meaningful journeys, trained
        professionals and unforgettable routes.
      </p>

      <Link
        href="/destinations/north"
        className="inline-block mt-10 rounded-md bg-primary px-6 py-3 text-primary-foreground"
      >
        Explore destinations
      </Link>
    </section>
  )
}
