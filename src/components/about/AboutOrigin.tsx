"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutOrigin() {
  return (
    <section className="grid md:grid-cols-2">
      <Image
        src="/images/institute.jpg"
        alt="Raúl Vich Institute"
        width={1200}
        height={800}
        className="h-full w-full object-cover"
      />

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-col justify-center px-8 py-16"
      >
        <h2 className="text-3xl font-semibold">
          Where everything started
        </h2>
        <p className="mt-6 text-muted-foreground">
          Argentine Route was born at Raúl Vich Instituto de Choferes de
          Colectivos, where driving is taught as a craft and a responsibility.
        </p>
      </motion.div>
    </section>
  )
}


// "use client"

// import { motion } from "framer-motion"

// export function AboutOrigin() {
//   return (
//     <section className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2 items-center">
//       <motion.div
//         initial={{ opacity: 0, x: -40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//       >
//         <h2 className="text-3xl font-semibold">
//           Born at Raúl Vich Institute
//         </h2>
//         <p className="mt-6 text-muted-foreground">
//           Argentine Route was born from the experience of Raúl Vich Instituto de
//           Choferes de Colectivos, where professional drivers are trained with
//           discipline, responsibility and passion for the road.
//         </p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         className="aspect-video rounded-xl bg-muted"
//       >
//         {/* futura imagen / video */}
//       </motion.div>
//     </section>
//   )
// }
