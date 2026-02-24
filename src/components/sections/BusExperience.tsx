"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BusFront, Coffee, Map, ArrowRight } from "lucide-react"

// Importa aquí tus componentes reales
import { ScenicRoute } from "./ScenicRoute"
import { ComfortFeatures } from "./ConfortFeatures"

const EXPERIENCES = [
  {
    title: "Vistas Panorámicas",
    category: "Naturaleza",
    description: "Nuestras unidades cuentan con ventanales de doble vidrio diseñados para ofrecer una visión total del paisaje, sin distorsiones ni reflejos.",
    icon: <Map className="w-5 h-5" />,
    component: <ScenicRoute /> // Usamos tu componente
  },
  {
    title: "Servicio Premium Class",
    category: "Confort",
    description: "Disfruta de una selección de cortesía durante tu viaje. Butacas ergonómicas con 160° de reclinación y atención personalizada a bordo.",
    icon: <Coffee className="w-5 h-5" />,
    component: <ComfortFeatures /> // Usamos tu componente
  }
]

export function BusExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-background text-foreground transition-colors duration-500">
      
      <div className="mx-auto max-w-7xl px-6 relative">
        
        {/* HEADER */}
        <header className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Experiencia de Viaje</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-end">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-medium tracking-tight leading-tight"
            >
              Cada detalle importa <br /> 
              <span className="text-muted-foreground font-light">cuando el viaje es largo.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-md leading-relaxed pb-2"
            >
              Combinamos ingeniería de confort con las rutas más bellas para transformar el traslado en un momento de pausa.
            </motion.p>
          </div>
        </header>

        {/* LÍNEA GUÍA CENTRAL (Sutil) */}
        <div className="absolute left-1/2 top-[400px] bottom-0 w-[1px] bg-border/40 -translate-x-1/2 hidden md:block">
          <motion.div style={{ height: lineHeight }} className="w-full bg-primary/60 origin-top" />
        </div>

        {/* BLOQUES DE EXPERIENCIA */}
        <div className="space-y-48">
          {EXPERIENCES.map((item, index) => {
            const isEven = index % 2 === 0
            return (
              <div 
                key={index}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-24 items-center`}
              >
                {/* TEXTO */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex-1 w-full"
                >
                  <div className={`max-w-md space-y-6 ${isEven ? 'md:ml-0' : 'md:ml-auto'}`}>
                    <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground/60 tracking-widest uppercase">
                      <span>0{index + 1}</span>
                      <span className="h-px w-4 bg-border" />
                      <span>{item.category}</span>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-light">
                      {item.description}
                    </p>
                    <button className="group flex items-center gap-2 text-sm font-bold pt-4 hover:text-primary transition-colors">
                      DESCUBRIR MÁS
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>

                {/* VISUAL (Aquí es donde entran tus componentes) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 w-full"
                >
                  <div className="relative group">
                    {/* El marco que da el padding y el estilo delicado */}
                    <div className="bg-card border border-border/60 shadow-sm rounded-[2.5rem] p-6 md:p-10 transition-all duration-700 group-hover:shadow-xl group-hover:border-primary/30 group-hover:bg-card/80">
                      
                      {/* Contenedor interno donde vive tu componente */}
                      <div className="overflow-hidden rounded-2xl bg-muted/5 flex items-center justify-center">
                        <div className="w-full h-full transition-transform duration-1000 group-hover:scale-[1.02] ease-out">
                          {item.component}
                        </div>
                      </div>

                    </div>
                    
                    {/* Icono flotante delicado */}
                    <div className={`absolute -top-3 ${isEven ? '-right-3' : '-left-3'} w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-sm text-primary z-20`}>
                      {item.icon}
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


//////////////////////////////////////////////////

// "use client"

// import { useRef } from "react"
// import { motion, useScroll, useTransform } from "framer-motion"
// import { BusFront, Coffee } from "lucide-react"
// import { ComfortFeatures } from "./ConfortFeatures"
// import { ScenicRoute } from "./ScenicRoute"

// export function BusExperience() {
//   const containerRef = useRef<HTMLDivElement>(null)

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   })

//   const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-24 md:py-32 bg-background text-foreground transition-colors duration-500 overflow-hidden"
//     >
//       {/* Fondo atmosférico adaptable */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

//       <div className="mx-auto max-w-7xl px-6 relative z-10">

//         {/* LÍNEA CENTRAL */}
//         <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block bg-border">
//           <motion.div
//             style={{ height }}
//             className="w-full bg-gradient-to-b from-primary via-primary/50 to-transparent"
//           />
//         </div>

//         {/* HEADER */}
//         <div className="text-center mb-24 max-w-3xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-card border border-border text-muted-foreground text-sm backdrop-blur-md"
//           >
//             <BusFront className="w-4 h-4" />
//             <span>Premium Class</span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
//           >
//             Más que un viaje,<br />es parte de la experiencia
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-lg text-muted-foreground leading-relaxed"
//           >
//             Diseñamos cada kilómetro para que disfrutes tanto del trayecto
//             como del destino.
//           </motion.p>
//         </div>

//         {/* BLOQUE 1 */}
//         <div className="space-y-32 md:space-y-48">

//           <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="md:text-right"
//             >
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-2xl blur opacity-20 group-hover:opacity-40 transition" />
//                 <div className="relative bg-card border border-border rounded-xl overflow-hidden">
//                   <ScenicRoute />
//                 </div>
//               </div>
//             </motion.div>

//             <div className="hidden md:flex justify-center">
//               <div className="w-4 h-4 rounded-full bg-background border-4 border-border" />
//             </div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-2xl font-bold mb-4">
//                 Paisajes inolvidables
//               </h3>
//               <p className="text-muted-foreground">
//                 Rutas pensadas para atravesar los escenarios más impactantes
//                 del país.
//               </p>
//             </motion.div>
//           </div>

//           {/* BLOQUE 2 */}
//           <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="md:text-right order-2 md:order-1"
//             >
//               <h3 className="text-2xl font-bold mb-4">
//                 Confort de primera clase
//               </h3>
//               <p className="text-muted-foreground">
//                 Butacas reclinables, servicio a bordo y conectividad para
//                 disfrutar sin interrupciones.
//               </p>
//             </motion.div>

//             <div className="hidden md:flex justify-center order-1 md:order-2">
//               <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
//                 <Coffee className="w-5 h-5 text-primary" />
//               </div>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="order-3"
//             >
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition" />
//                 <div className="relative bg-card border border-border rounded-xl overflow-hidden p-1">
//                   <ComfortFeatures />
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }



//////////////////////////////////////////////


// "use client"

// import { useRef } from "react"
// import { motion, useScroll, useTransform } from "framer-motion"
// import { BusFront, Coffee } from "lucide-react"
// import { ComfortFeatures } from "./ConfortFeatures"
// import { ScenicRoute } from "./ScenicRoute"
// import { cn } from "@/src/lib/utils"

// export function BusExperience() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   })

//   // Animación suave para la línea vertical
//   const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

//   return (
//     <section 
//       ref={containerRef}
//       className="relative py-24 md:py-32 bg-zinc-950 text-zinc-100 overflow-hidden"
//     >
//       {/* Fondo decorativo sutil */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950/50 to-zinc-950 pointer-events-none" />
      
//       <div className="mx-auto max-w-7xl px-6 relative z-10">
        
//         {/* LÍNEA CONECTORA CENTRAL (The Thread) */}
//         {/* Visible solo en desktop para guiar el ojo */}
//         <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 h-full bg-zinc-800/50 hidden md:block">
//             <motion.div 
//                 style={{ height }}
//                 className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent opacity-50"
//             />
//         </div>

//         {/* --- HEADER --- */}
//         <div className="relative text-center mb-24 max-w-3xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-medium backdrop-blur-md relative z-20"
//           >
//             <BusFront className="w-4 h-4" />
//             <span>Premium Class</span>
//           </motion.div>

//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400"
//           >
//             Más que un viaje,<br /> es parte de la experiencia
//           </motion.h2>

//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="text-lg text-zinc-400 leading-relaxed bg-zinc-950/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-xl"
//           >
//             Olvídate de lo que sabes sobre viajar en bus. Diseñamos cada kilómetro 
//             para que disfrutes tanto del trayecto como del destino.
//           </motion.p>
//         </div>

//         {/* --- BLOQUES DE CONTENIDO --- */}
//         <div className="space-y-32 md:space-y-48">
          
//           {/* Bloque 1: Ruta Escénica */}
//           <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
//             {/* Contenido (ScenicRoute se asume que trae imagen o mapa) */}
//             <motion.div 
//                initial={{ opacity: 0, x: -50 }}
//                whileInView={{ opacity: 1, x: 0 }}
//                viewport={{ once: true, margin: "-20%" }}
//                transition={{ duration: 0.8 }}
//                className="md:col-start-1 md:text-right"
//             >
//                {/* Envolvemos el componente hijo para darle estilo 
//                   sin tocar el código interno de ScenicRoute 
//                */}
//                <div className="relative group">
//                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//                  <div className="relative bg-zinc-900 ring-1 ring-white/10 rounded-xl overflow-hidden">
//                     <ScenicRoute />
//                  </div>
//                </div>
//             </motion.div>

//             {/* Punto central en la línea */}
//             <div className="hidden md:flex justify-center relative z-20">
//                <div className="w-4 h-4 rounded-full bg-zinc-950 border-4 border-zinc-800 ring-4 ring-zinc-950" />
//             </div>

//             {/* Texto descriptivo lateral (opcional si ScenicRoute no tiene texto) */}
//             <motion.div 
//                initial={{ opacity: 0, x: 50 }}
//                whileInView={{ opacity: 1, x: 0 }}
//                viewport={{ once: true, margin: "-20%" }}
//                transition={{ duration: 0.8, delay: 0.2 }}
//                className="md:col-start-3"
//             >
//               <h3 className="text-2xl font-bold text-white mb-4">Paisajes Inolvidables</h3>
//               <p className="text-zinc-400">
//                 Nuestras rutas están planificadas para cruzar los escenarios más impactantes de Argentina durante las horas de luz dorada.
//               </p>
//             </motion.div>
//           </div>


//           {/* Bloque 2: Confort (Invertido para dinamismo) */}
//           <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
//              {/* Texto Izquierda */}
//              <motion.div 
//                initial={{ opacity: 0, x: -50 }}
//                whileInView={{ opacity: 1, x: 0 }}
//                viewport={{ once: true, margin: "-20%" }}
//                transition={{ duration: 0.8, delay: 0.2 }}
//                className="md:col-start-1 md:text-right order-2 md:order-1"
//             >
//               <h3 className="text-2xl font-bold text-white mb-4">Confort de Primera Clase</h3>
//               <p className="text-zinc-400">
//                 Butacas reclinables 160°, servicio a bordo y conectividad Starlink para que sigas conectado en medio de la nada.
//               </p>
//             </motion.div>

//             {/* Punto central */}
//             <div className="hidden md:flex justify-center relative z-20 order-1 md:order-2">
//                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 shadow-xl">
//                   <Coffee className="w-5 h-5 text-indigo-400" />
//                </div>
//             </div>

//             {/* Componente ComfortFeatures */}
//             <motion.div 
//                initial={{ opacity: 0, x: 50 }}
//                whileInView={{ opacity: 1, x: 0 }}
//                viewport={{ once: true, margin: "-20%" }}
//                transition={{ duration: 0.8 }}
//                className="md:col-start-3 order-3"
//             >
//                 <div className="relative group">
//                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//                  <div className="relative bg-zinc-900 ring-1 ring-white/10 rounded-xl overflow-hidden p-1">
//                     <ComfortFeatures />
//                  </div>
//                </div>
//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }


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
