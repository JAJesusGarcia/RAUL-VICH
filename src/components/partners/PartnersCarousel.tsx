"use client"

import { motion } from "framer-motion"

const partners = [
  { name: "Hotel Salta", url: "#" },
  { name: "Patagonia Lodge", url: "#" },
  { name: "Jujuy Suites", url: "#" },
  { name: "Bariloche Resort", url: "#" },
  { name: "Ushuaia Inn", url: "#" },
  { name: "Córdoba Plaza", url: "#" },
  { name: "Mendoza Wine Hotel", url: "#" },
  { name: "Iguazú Falls Hotel", url: "#" },
]

export function PartnersCarousel() {
  return (
    <section className="relative border-y border-border bg-muted/20 py-12 transition-colors duration-500 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          Nuestros Aliados en el Camino
        </h3>
      </div>

      {/* CONTENEDOR CON MÁSCARA DE DEGRADADO */}
      <div className="relative flex overflow-hidden">
        {/* Capas de degradado para bordes suaves */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />

        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-24 px-12"
          animate={{
            x: ["0%", "-50%"], // Se mueve exactamente la mitad de la lista duplicada
          }}
          transition={{
            ease: "linear",
            duration: 30, // Controla la velocidad aquí
            repeat: Infinity,
          }}
        >
          {/* Duplicamos la lista para que el bucle sea infinito y perfecto */}
          {[...partners, ...partners].map((partner, i) => (
            <a
              key={`${partner.name}-${i}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-lg md:text-2xl font-medium text-muted-foreground/70 transition-all hover:text-foreground"
            >
              {/* Decoración tipo bullet premium */}
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              <span className="tracking-tight italic font-serif">
                {partner.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// "use client"

// const partners = [
//   { name: "Hotel Salta", url: "https://example.com" },
//   { name: "Patagonia Lodge", url: "https://example.com" },
//   { name: "Jujuy Suites", url: "https://example.com" },
//   { name: "Bariloche Resort", url: "https://example.com" },
//   { name: "Ushuaia Inn", url: "https://example.com" },
//   { name: "Córdoba Plaza", url: "https://example.com" },
//   { name: "Mendoza Wine Hotel", url: "https://example.com" },
// ]

// export function PartnersCarousel() {
//   return (
//     <section className="overflow-hidden border-t bg-muted/30 py-16">
//       <div className="mx-auto max-w-7xl px-6">
//         <h3 className="mb-10 text-center text-sm uppercase tracking-widest text-muted-foreground">
//           Trusted accommodation partners
//         </h3>
//       </div>

//       <div className="relative">
//         <div className="flex w-max animate-marquee gap-12 px-6">
//           {[...partners, ...partners].map((partner, i) => (
//             <a
//               key={i}
//               href={partner.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="whitespace-nowrap text-xl font-semibold text-muted-foreground opacity-70 transition hover:opacity-100 hover:text-foreground hover:underline underline-offset-4"

//             >
//               {partner.name}
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

