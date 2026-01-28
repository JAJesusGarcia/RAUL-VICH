"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutFounder() {
  return (
    <section className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <Image
          src="/images/dario.jpg"
          alt="Darío El Chino"
          width={600}
          height={600}
          className="rounded-xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold">Darío “El Chino”</h2>
        <p className="mt-6 text-muted-foreground">
          Teaching, driving and sharing the road. Darío believes that
          every journey is an opportunity to learn and connect.
        </p>
      </motion.div>
    </section>
  )
}


// "use client"

// import { motion } from "framer-motion"

// export function AboutFounder() {
//   return (
//     <section className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2 items-center">
//       <motion.div
//         initial={{ opacity: 0, x: -40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         className="aspect-square rounded-xl bg-muted"
//       />

//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//       >
//         <h2 className="text-3xl font-semibold">
//           Darío “El Chino”
//         </h2>
//         <p className="mt-6 text-muted-foreground">
//           Teacher, driver and passionate about sharing knowledge. Darío believes
//           that driving a bus is not just a job, but a responsibility towards
//           people, culture and the journey itself.
//         </p>
//       </motion.div>
//     </section>
//   )
// }
