"use client"

import { motion } from "framer-motion"

type Props = {
  title: string
  subtitle: string
  videoSrc: string
  poster?: string
}

export function RegionVideoHero({
  title,
  subtitle,
  videoSrc,
  poster,
}: Props) {
  return (
    <section className="relative h-[100vh] overflow-hidden pt-20">
      {/* VIDEO */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <h1 className="text-5xl md:text-6xl font-bold">{title}</h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg">{subtitle}</p>
        </div>
      </motion.div>
    </section>
  )
}
