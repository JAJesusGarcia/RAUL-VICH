"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/road-argentina.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Born on the road
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Argentine Route was created from the passion for teaching,
            driving and discovering the true Argentina.
          </p>
        </motion.div>
      </div>
    </section>
  )
}


// "use client"

// import { motion } from "framer-motion"

// export function AboutHero() {
//   return (
//     <section className="relative mx-auto max-w-5xl px-6 text-center">
//       <motion.h1
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-5xl md:text-6xl font-bold"
//       >
//         A journey born on the road
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className="mt-8 text-lg text-muted-foreground"
//       >
//         Argentine Route is more than travel. It’s a way of understanding the
//         country through its roads, people and stories.
//       </motion.p>
//     </section>
//   )
// }
