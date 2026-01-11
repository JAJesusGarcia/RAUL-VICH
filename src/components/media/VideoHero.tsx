"use client"

import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"

export function VideoHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Argentina by Road
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/90">
            Travel through landscapes, cultures and routes that airplanes can’t show.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Explore Destinations</Button>
            <Button size="lg" variant="outline">
              View Packages
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
