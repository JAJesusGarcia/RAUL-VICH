"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BusFront, Coffee } from "lucide-react"
import { ComfortFeatures } from "./ConfortFeatures"
import { ScenicRoute } from "./ScenicRoute"
import { cn } from "@/src/lib/utils"

export function BusExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Animación suave para la línea vertical
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-zinc-950 text-zinc-100 overflow-hidden"
    >
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950/50 to-zinc-950 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* LÍNEA CONECTORA CENTRAL (The Thread) */}
        {/* Visible solo en desktop para guiar el ojo */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 h-full bg-zinc-800/50 hidden md:block">
            <motion.div 
                style={{ height }}
                className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent opacity-50"
            />
        </div>

        {/* --- HEADER --- */}
        <div className="relative text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-medium backdrop-blur-md relative z-20"
          >
            <BusFront className="w-4 h-4" />
            <span>Premium Class</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400"
          >
            Más que un viaje,<br /> es parte de la experiencia
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 leading-relaxed bg-zinc-950/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-xl"
          >
            Olvídate de lo que sabes sobre viajar en bus. Diseñamos cada kilómetro 
            para que disfrutes tanto del trayecto como del destino.
          </motion.p>
        </div>

        {/* --- BLOQUES DE CONTENIDO --- */}
        <div className="space-y-32 md:space-y-48">
          
          {/* Bloque 1: Ruta Escénica */}
          <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            {/* Contenido (ScenicRoute se asume que trae imagen o mapa) */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-20%" }}
               transition={{ duration: 0.8 }}
               className="md:col-start-1 md:text-right"
            >
               {/* Envolvemos el componente hijo para darle estilo 
                  sin tocar el código interno de ScenicRoute 
               */}
               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                 <div className="relative bg-zinc-900 ring-1 ring-white/10 rounded-xl overflow-hidden">
                    <ScenicRoute />
                 </div>
               </div>
            </motion.div>

            {/* Punto central en la línea */}
            <div className="hidden md:flex justify-center relative z-20">
               <div className="w-4 h-4 rounded-full bg-zinc-950 border-4 border-zinc-800 ring-4 ring-zinc-950" />
            </div>

            {/* Texto descriptivo lateral (opcional si ScenicRoute no tiene texto) */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-20%" }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="md:col-start-3"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Paisajes Inolvidables</h3>
              <p className="text-zinc-400">
                Nuestras rutas están planificadas para cruzar los escenarios más impactantes de Argentina durante las horas de luz dorada.
              </p>
            </motion.div>
          </div>


          {/* Bloque 2: Confort (Invertido para dinamismo) */}
          <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
             {/* Texto Izquierda */}
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-20%" }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="md:col-start-1 md:text-right order-2 md:order-1"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Confort de Primera Clase</h3>
              <p className="text-zinc-400">
                Butacas reclinables 160°, servicio a bordo y conectividad Starlink para que sigas conectado en medio de la nada.
              </p>
            </motion.div>

            {/* Punto central */}
            <div className="hidden md:flex justify-center relative z-20 order-1 md:order-2">
               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 shadow-xl">
                  <Coffee className="w-5 h-5 text-indigo-400" />
               </div>
            </div>

            {/* Componente ComfortFeatures */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-20%" }}
               transition={{ duration: 0.8 }}
               className="md:col-start-3 order-3"
            >
                <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                 <div className="relative bg-zinc-900 ring-1 ring-white/10 rounded-xl overflow-hidden p-1">
                    <ComfortFeatures />
                 </div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}


/////////////////////////////////////////////////



// import { ComfortFeatures } from "./ConfortFeatures"
// import { ScenicRoute } from "./ScenicRoute"

// export function BusExperience() {
//   return (
//     <section className="py-32 px-6 bg-muted/50">
//       <div className="mx-auto max-w-6xl">
//         <h2 className="text-4xl md:text-5xl font-bold text-center">
//           The Bus Experience
//         </h2>

//         <p className="mt-6 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
//           Traveling by luxury bus is not just transportation — it’s part of the
//           adventure. Discover landscapes, cultures and stories along the way.
//         </p>

//         <div className="mt-20">
//           <ScenicRoute />
//         </div>

//         <div className="mt-24">
//           <ComfortFeatures />
//         </div>
//       </div>
//     </section>
//   )
// }
