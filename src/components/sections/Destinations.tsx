"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Mountain, Trees } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { MEDIA } from "@/src/constants/media"
import { getMediaUrl } from "@/src/lib/media"
import { cn } from "@/src/lib/utils"

type DestinationKey = "north" | "south"

const destinations = [
  {
    key: "north",
    title: "Norte Argentino",
    subtitle: "Tierra de colores y ancestros",
    description: "Montañas de siete colores, desiertos de sal y una cultura viva.",
    href: "/destinations/north",
    icon: Mountain,
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    key: "south",
    title: "Patagonia Sur",
    subtitle: "El fin del mundo",
    description: "Glaciares milenarios, lagos cristalinos y bosques infinitos.",
    href: "/destinations/south",
    icon: Trees,
    color: "from-sky-500/20 to-cyan-500/20",
  },
]

export function Destinations() {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER - Este sí debe cambiar de color (Negro en Light, Blanco en Dark) */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Elige tu Aventura
          </motion.h2>
          <motion.p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Dos extremos, un mismo país. Descubre los contrastes de Argentina.
          </motion.p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 lg:gap-12 md:grid-cols-2">
          {destinations.map((d, i) => (
            <motion.div key={d.key} transition={{ delay: i * 0.2 }}>
              <Link href={d.href} className="block h-full">
                <Card className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <CardContent className="p-0 h-[500px] md:h-[600px] relative">

                    {/* IMAGEN DE FONDO */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={getMediaUrl("image", MEDIA.destinations[d.key as DestinationKey].cover)}
                        alt={d.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={cn("absolute inset-0 bg-gradient-to-br mix-blend-overlay opacity-30", d.color)} />
                    </div>

                    {/* OVERLAY OSCURO FIJO 
                        Usamos 'from-black' en lugar de 'from-background' para que 
                        SIEMPRE haya sombra oscura bajo el texto, incluso en modo claro.
                    */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                    {/* CONTENIDO 
                        Forzamos 'text-white' para que no le haga caso al ThemeToggle 
                        dentro de esta tarjeta.
                    */}
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">

                      {/* Icono con fondo que no desaparece */}
                      <div className="mb-auto opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                          <d.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Textos - Usamos colores fijos (zinc-100, white) */}
                      <div className="space-y-4 transition-transform group-hover:-translate-y-2">
                        <span className="text-orange-400 dark:text-orange-300 font-bold text-sm uppercase tracking-wider">
                          {d.subtitle}
                        </span>

                        <h3 className="text-3xl md:text-4xl font-bold text-white">
                          {d.title}
                        </h3>

                        <p className="text-zinc-200 max-w-md text-lg opacity-90">
                          {d.description}
                        </p>
                      </div>

                      {/* CTA - Botón con contraste fijo */}
                      <div className="mt-8 flex items-center gap-2 font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-white">Comenzar exploración</span>
                        <span className="rounded-full bg-white text-black p-1">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}




/////////////////////////////////



// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import { ArrowUpRight, Mountain, Trees } from "lucide-react" // Íconos para dar contexto
// import { Card, CardContent } from "@/src/components/ui/card"
// import { MEDIA } from "@/src/constants/media"
// import { getMediaUrl } from "@/src/lib/media"
// import { cn } from "@/src/lib/utils"

// type DestinationKey = "north" | "south";

// const destinations: {
//   key: DestinationKey;
//   title: string;
//   subtitle: string;
//   description: string;
//   href: string;
//   icon: React.ElementType;
//   color: string;
// }[] = [
//   {
//     key: "north",
//     title: "Norte Argentino",
//     subtitle: "Tierra de colores y ancestros",
//     description: "Montañas de siete colores, desiertos de sal y una cultura viva que late en cada pueblo.",
//     href: "/destinations/north",
//     icon: Mountain,
//     color: "from-orange-500/20 to-amber-500/20" // Un toque cálido sutil
//   },
//   {
//     key: "south",
//     title: "Patagonia Sur",
//     subtitle: "El fin del mundo",
//     description: "Glaciares milenarios, lagos cristalinos y bosques infinitos en el extremo del continente.",
//     href: "/destinations/south",
//     icon: Trees,
//     color: "from-blue-500/20 to-cyan-500/20" // Un toque frío sutil
//   },
// ]

// export function Destinations() {
//   return (
//     <section className="py-24 md:py-32 bg-zinc-950 text-zinc-100">
//       <div className="mx-auto max-w-7xl px-6">
        
//         {/* Header de Sección */}
//         <div className="text-center mb-16 space-y-4">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400"
//           >
//             Elige tu Aventura
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-zinc-400 max-w-2xl mx-auto text-lg"
//           >
//             Dos extremos, un mismo país. Descubre los contrastes que hacen de Argentina un destino único.
//           </motion.p>
//         </div>

//         <div className="grid gap-8 lg:gap-12 md:grid-cols-2">
//           {destinations.map((d, i) => (
//             <motion.div
//               key={d.key}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2, duration: 0.5 }}
//             >
//               <Link href={d.href} className="block h-full">
//                 <Card className="group relative h-full overflow-hidden border-0 bg-zinc-900/50 rounded-3xl cursor-pointer ring-1 ring-white/10 hover:ring-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
//                   <CardContent className="p-0 h-[500px] md:h-[600px] relative">
                    
//                     {/* 1. IMAGEN OPTIMIZADA CON NEXT/IMAGE */}
//                     <div className="absolute inset-0 overflow-hidden">
//                       <Image
//                         src={getMediaUrl("image", MEDIA.destinations[d.key].cover)}
//                         alt={d.title}
//                         fill
//                         className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                         sizes="(max-width: 768px) 100vw, 50vw"
//                         priority={i === 0} // Prioriza la carga de la primera imagen
//                       />
                      
//                       {/* Tinte de color sutil según región (cálido/frío) */}
//                       <div className={cn("absolute inset-0 bg-gradient-to-br mix-blend-overlay opacity-30 group-hover:opacity-40 transition-opacity", d.color)} />
//                     </div>

//                     {/* 2. OVERLAY MEJORADO (Degradado profesional) */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

//                     {/* 3. CONTENIDO FLOTANTE */}
//                     <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                      
//                       {/* Ícono decorativo */}
//                       <div className="mb-auto transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
//                         <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
//                           <d.icon className="w-6 h-6 text-white" />
//                         </div>
//                       </div>

//                       {/* Textos */}
//                       <div className="space-y-4 transform transition-transform duration-500 group-hover:-translate-y-2">
//                         <div className="space-y-1">
//                           <span className="text-indigo-400 font-medium text-sm tracking-wider uppercase">
//                             {d.subtitle}
//                           </span>
//                           <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
//                             {d.title}
//                           </h3>
//                         </div>
                        
//                         <p className="text-zinc-300 leading-relaxed max-w-md opacity-90 text-lg">
//                           {d.description}
//                         </p>
//                       </div>

//                       {/* Botón CTA que aparece en hover */}
//                       <div className="mt-8 flex items-center gap-2 text-white font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
//                         <span>Comenzar exploración</span>
//                         <div className="bg-white text-black rounded-full p-1">
//                           <ArrowUpRight className="w-4 h-4" />
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }



// "use client"

// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/src/components/ui/card"
// import { MEDIA } from "@/src/constants/media"
// import { getMediaUrl } from "@/src/lib/media"

// type DestinationKey = "north" | "south";

// const destinations: {
//   key: DestinationKey;
//   title: string;
//   description: string;
//   href: string;
// }[] = [
//   {
//     key: "north",
//     title: "North Argentina",
//     description: "Mountains, deserts and ancestral cultures.",
//     href: "/destinations/north",
//   },
//   {
//     key: "south",
//     title: "South Argentina",
//     description: "Glaciers, lakes and endless Patagonia.",
//     href: "/destinations/south",
//   },
// ]

// export function Destinations() {
//   return (
//     <section className="py-24 bg-background">
//       <div className="mx-auto max-w-7xl px-6">
//         <h2 className="mb-12 text-4xl font-bold text-center">
//           Choose Your Journey
//         </h2>

//         <div className="grid gap-8 md:grid-cols-2">
//           {destinations.map((d, i) => (
//             <motion.div
//               key={d.key}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//             >
//               <Link href={d.href}>
//                 <Card className="group overflow-hidden cursor-pointer">
//                   <CardContent className="relative h-80 p-0">
//                     <img
//                       src={getMediaUrl(
//                         "image",
//                         MEDIA.destinations[d.key].cover
//                       )}
//                       alt={d.title}
//                       className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black/40" />
//                     <div className="absolute bottom-0 p-6 text-white">
//                       <h3 className="text-2xl font-bold">{d.title}</h3>
//                       <p className="mt-2 text-white/90">{d.description}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


/////////////////////////////////////////////////

// "use client"

// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/src/components/ui/card"

// const destinations = [
//   {
//     title: "North Argentina",
//     description: "Mountains, deserts and ancestral cultures.",
//     image: "/images/north.webp",
//     href: "/destinations/north",
//   },
//   {
//     title: "South Argentina",
//     description: "Glaciers, lakes and endless Patagonia.",
//     image: "/images/south.webp",
//     href: "/destinations/south",
//   },
// ]

// export function Destinations() {
//   return (
//     <section className="py-24 bg-background">
//       <div className="mx-auto max-w-7xl px-6">
//         <h2 className="mb-12 text-4xl font-bold text-center">
//           Choose Your Journey
//         </h2>

//         <div className="grid gap-8 md:grid-cols-2">
//           {destinations.map((d, i) => (
//             <motion.div
//               key={d.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//             >
//               <Link href={d.href}>
//                 <Card className="group overflow-hidden cursor-pointer">
//                   <CardContent className="relative h-80 p-0">
//                     <img
//                       src={d.image}
//                       alt={d.title}
//                       className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black/40" />
//                     <div className="absolute bottom-0 p-6 text-white">
//                       <h3 className="text-2xl font-bold">{d.title}</h3>
//                       <p className="mt-2 text-white/90">{d.description}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
