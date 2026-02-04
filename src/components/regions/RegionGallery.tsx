"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/src/lib/utils"

type Props = {
  images: string[]
}

export function RegionGallery({ images }: Props) {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold mb-12 uppercase tracking-tighter">Capturing the Spirit</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-border",
                i === 0 && "md:col-span-2 md:row-span-2", // Primera imagen grande
                i === 1 && "md:row-span-2",               // Segunda imagen alta
              )}
            >
              <Image 
                src={img} 
                alt="North Argentina" 
                fill 
                className="object-cover hover:scale-110 transition-transform duration-700" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// export function RegionGallery({ images }: Props) {
//   return (
//     <section className="py-24 px-6">
//       <motion.div
//         className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={{
//           visible: { transition: { staggerChildren: 0.15 } },
//         }}
//       >
//         {images.map((img, i) => (
//           <motion.div
//             key={i}
//             className="relative h-72"
//             variants={{
//               hidden: { opacity: 0, scale: 0.95 },
//               visible: { opacity: 1, scale: 1 },
//             }}
//             transition={{ duration: 0.4 }}
//           >
//             <Image
//               src={img}
//               alt="Gallery image"
//               fill
//               className="object-cover rounded-xl"
//             />
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   )
// }
