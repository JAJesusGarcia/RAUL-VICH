"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import { MapPin, Bus, ArrowRight } from "lucide-react"
import { cn } from "@/src/lib/utils" // Asumiendo que usas shadcn o una utilidad de clases similar

// Datos extraídos para mejor mantenimiento
const destinations = [
  { 
    name: "Buenos Aires", 
    position: 0, 
    mapCoords: { x: 180, y: 60 },
    description: "La capital vibrante, donde el tango y la cultura convergen en cada esquina."
  },
  { 
    name: "Córdoba", 
    position: 0.18, 
    mapCoords: { x: 155, y: 105 },
    description: "Puerta a las sierras, herencia jesuita y vida universitaria."
  },
  { 
    name: "Mendoza", 
    position: 0.36, 
    mapCoords: { x: 130, y: 150 },
    description: "Tierra del sol y del buen vino, con el Aconcagua de fondo."
  },
  { 
    name: "Salta", 
    position: 0.54, 
    mapCoords: { x: 110, y: 195 },
    description: "La linda. Arquitectura colonial y paisajes norteños coloridos."
  },
  { 
    name: "Bariloche", 
    position: 0.75, 
    mapCoords: { x: 110, y: 240 },
    description: "Lagos cristalinos, chocolate artesanal y bosques patagónicos."
  },
  { 
    name: "Ushuaia", 
    position: 1, 
    mapCoords: { x: 145, y: 340 },
    description: "El fin del mundo, donde comienza tu próxima gran aventura."
  },
]

export function BusJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Suavizamos el scroll para que el bus no vibre
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Sincronizar el paso activo con el progreso del scroll
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // Calculamos qué destino está más cerca del progreso actual
    const currentStep = destinations.findIndex((dest, index) => {
      const nextDest = destinations[index + 1]
      if (!nextDest) return true
      // Ajuste fino para disparar el cambio un poco antes de llegar
      return latest >= dest.position && latest < nextDest.position
    })
    
    if (currentStep !== -1 && currentStep !== activeStep) {
      setActiveStep(currentStep)
    }
  })

  // Transformaciones para el bus y la línea
  const busPosition = useTransform(smoothProgress, [0, 1], [0, 100])

  return (
    <section 
      ref={containerRef} 
      className="relative bg-zinc-950 text-zinc-100 py-20 md:py-32 overflow-hidden"
    >
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-32 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Bus className="w-4 h-4" /> Viaje por Argentina
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            Tu Ruta Comienza Aquí
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Recorre los destinos más impresionantes en una experiencia visual única.
            Haz scroll para iniciar el viaje.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* COLUMNA IZQUIERDA: Mapa Sticky */}
          <div className="relative md:sticky md:top-32 h-[500px] w-full max-w-md mx-auto md:max-w-none">
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* SVG MAP CONTAINER */}
              <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-2xl filter overflow-visible">
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" /> {/* Indigo-500 */}
                    <stop offset="100%" stopColor="#ec4899" /> {/* Pink-500 */}
                  </linearGradient>
                </defs>

                {/* Silueta Argentina (Fondo) */}
                <path
                  d="M150 20 C180 30, 200 50, 210 80 C220 110, 230 140, 220 170 C210 200, 200 230, 190 260 C180 290, 170 320, 160 350 C155 370, 150 385, 145 390 C140 385, 135 370, 130 350 C120 320, 110 290, 100 260 C90 230, 80 200, 70 170 C60 140, 70 110, 80 80 C90 50, 110 30, 150 20Z"
                  className="fill-zinc-900/50 stroke-zinc-800"
                  strokeWidth="1"
                />

                {/* Ruta Base (Línea punteada) */}
                <path
                  d="M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
                  className="stroke-zinc-800/80"
                  strokeWidth="4"
                  strokeDasharray="4 6"
                  fill="none"
                />

                {/* Ruta Activa (Línea coloreada que se dibuja) */}
                <motion.path
                  d="M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
                  stroke="url(#pathGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  style={{ pathLength: smoothProgress }}
                />

                {/* Puntos de las ciudades en el mapa */}
                {destinations.map((city, index) => {
                   const isActive = index <= activeStep;
                   return (
                    <motion.g key={city.name}>
                      <motion.circle
                        cx={city.mapCoords.x}
                        cy={city.mapCoords.y}
                        r={isActive ? 6 : 3}
                        className={cn(
                          "transition-colors duration-500",
                          isActive ? "fill-white stroke-indigo-500" : "fill-zinc-800 stroke-zinc-700"
                        )}
                        strokeWidth={isActive ? 3 : 1}
                        animate={{ scale: isActive ? 1.2 : 1 }}
                      />
                      {/* Efecto Pulse para la ciudad actual */}
                      {index === activeStep && (
                        <motion.circle
                          cx={city.mapCoords.x}
                          cy={city.mapCoords.y}
                          r="12"
                          className="stroke-indigo-500/50 fill-none"
                          initial={{ opacity: 1, scale: 0.5 }}
                          animate={{ opacity: 0, scale: 1.5 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.g>
                  )
                })}

                {/* EL BUS */}
                <motion.foreignObject
                   width="40" height="40"
                   x="-20" y="-20" // Centrar
                   style={{
                     offsetPath: `path("M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340")`,
                     offsetDistance: useTransform(busPosition, (v) => `${v}%`),
                   }}
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <div className="relative">
                       <div className="absolute inset-0 bg-indigo-500 blur-md rounded-full opacity-50"></div>
                       <div className="relative bg-white text-indigo-600 p-2 rounded-xl shadow-lg transform -rotate-12 z-10">
                         <Bus size={18} fill="currentColor" />
                       </div>
                    </div>
                  </div>
                </motion.foreignObject>
              </svg>
            </div>
          </div>

          {/* COLUMNA DERECHA: Lista de tarjetas */}
          <div className="relative pt-10 pb-40 space-y-24">
            {/* Línea conectora vertical de fondo */}
            <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-zinc-800" />
            
            {/* Línea de progreso vertical */}
            <motion.div 
              className="absolute left-6 top-14 w-0.5 bg-gradient-to-b from-indigo-500 to-pink-500 origin-top"
              style={{ height: "100%", scaleY: smoothProgress }} 
            />

            {destinations.map((destination, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <motion.div
                  key={destination.name}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "relative pl-16 group transition-all duration-500",
                    isActive ? "scale-105" : "scale-100 opacity-60"
                  )}
                >
                  {/* Icono lateral */}
                  <div className={cn(
                    "absolute left-2 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300 bg-zinc-950",
                    isActive ? "border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]" : 
                    isPast ? "border-indigo-500/50 text-indigo-500/50" : "border-zinc-700 text-zinc-700"
                  )}>
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>

                  {/* Tarjeta de Contenido */}
                  <div className={cn(
                    "p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm",
                    isActive 
                      ? "bg-zinc-900/80 border-indigo-500/30 shadow-2xl shadow-indigo-500/10" 
                      : "bg-zinc-900/20 border-white/5 hover:bg-zinc-900/40"
                  )}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={cn(
                        "text-2xl font-bold tracking-tight",
                        isActive ? "text-white" : "text-zinc-400"
                      )}>
                        {destination.name}
                      </h3>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-indigo-500/20 p-1.5 rounded-full"
                        >
                          <MapPin className="w-4 h-4 text-indigo-400" />
                        </motion.div>
                      )}
                    </div>
                    
                    <p className="text-zinc-400 leading-relaxed">
                      {destination.description}
                    </p>

                    <div className={cn(
                      "mt-4 flex items-center text-sm font-medium transition-all overflow-hidden",
                      isActive ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <span className="text-indigo-400 flex items-center gap-2">
                        Explorar destino <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


/////////////////////////////////////////////////////////.   V0.IO


// "use client"

// import { useRef } from "react"
// import { motion, useScroll, useTransform } from "framer-motion"
// import { MapPin, Bus } from "lucide-react"

// const destinations = [
//   { name: "Buenos Aires", position: 0 },
//   { name: "Córdoba", position: 20 },
//   { name: "Mendoza", position: 40 },
//   { name: "Salta", position: 60 },
//   { name: "Bariloche", position: 80 },
//   { name: "Ushuaia", position: 100 },
// ]

// export function BusJourney() {
//   const containerRef = useRef<HTMLDivElement>(null)

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   })

//   // El bus avanza del 0% al 100% de la ruta según el scroll
//   const busProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100])
//   const pathDraw = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-32 px-6 bg-gradient-to-b from-muted/30 to-background overflow-hidden"
//     >
//       <div className="mx-auto max-w-6xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold">
//             Your Journey Awaits
//           </h2>
//           <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
//             Follow the route through Argentina&apos;s most breathtaking destinations
//           </p>
//         </motion.div>

//         <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
//           {/* Mapa estilizado de Argentina */}
//           <div className="relative w-full md:w-1/2 aspect-[3/4] max-w-md mx-auto">
//             <svg
//               viewBox="0 0 300 400"
//               className="w-full h-full"
//               fill="none"
//             >
//               {/* Silueta simplificada de Argentina */}
//               <motion.path
//                 d="M150 20 
//                    C180 30, 200 50, 210 80
//                    C220 110, 230 140, 220 170
//                    C210 200, 200 230, 190 260
//                    C180 290, 170 320, 160 350
//                    C155 370, 150 385, 145 390
//                    C140 385, 135 370, 130 350
//                    C120 320, 110 290, 100 260
//                    C90 230, 80 200, 70 170
//                    C60 140, 70 110, 80 80
//                    C90 50, 110 30, 150 20Z"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 className="text-muted-foreground/30"
//               />

//               {/* Ruta del bus - línea punteada de fondo */}
//               <path
//                 d="M180 60 
//                    C170 90, 140 120, 130 150
//                    C120 180, 100 210, 110 240
//                    C120 270, 140 300, 145 340"
//                 stroke="currentColor"
//                 strokeWidth="3"
//                 strokeDasharray="8 8"
//                 className="text-muted-foreground/20"
//               />

//               {/* Ruta del bus - línea animada */}
//               <motion.path
//                 d="M180 60 
//                    C170 90, 140 120, 130 150
//                    C120 180, 100 210, 110 240
//                    C120 270, 140 300, 145 340"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 strokeLinecap="round"
//                 className="text-primary"
//                 style={{
//                   pathLength: pathDraw,
//                 }}
//               />

//               {/* Puntos de destino */}
//               {[
//                 { x: 180, y: 60, label: "Buenos Aires" },
//                 { x: 155, y: 105, label: "Córdoba" },
//                 { x: 130, y: 150, label: "Mendoza" },
//                 { x: 110, y: 195, label: "Salta" },
//                 { x: 110, y: 240, label: "Bariloche" },
//                 { x: 145, y: 340, label: "Ushuaia" },
//               ].map((city, index) => (
//                 <motion.g key={city.label}>
//                   <motion.circle
//                     cx={city.x}
//                     cy={city.y}
//                     r="8"
//                     className="fill-background stroke-primary"
//                     strokeWidth="3"
//                     initial={{ scale: 0 }}
//                     whileInView={{ scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.1 }}
//                   />
//                   <motion.text
//                     x={city.x + (index % 2 === 0 ? 15 : -15)}
//                     y={city.y + 5}
//                     className="fill-foreground text-xs font-medium"
//                     textAnchor={index % 2 === 0 ? "start" : "end"}
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.1 + 0.2 }}
//                   >
//                     {city.label}
//                   </motion.text>
//                 </motion.g>
//               ))}
//             </svg>

//             {/* Bus animado */}
//             <motion.div
//               className="absolute w-12 h-12 -ml-6 -mt-6"
//               style={{
//                 offsetPath: `path("M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340")`,
//                 offsetDistance: useTransform(busProgress, (v) => `${v}%`),
//               }}
//             >
//               <div className="relative">
//                 <motion.div
//                   className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg"
//                   animate={{
//                     scale: [1, 1.05, 1],
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <Bus className="w-6 h-6 text-primary-foreground" />
//                 </motion.div>
//                 {/* Estela del bus */}
//                 <motion.div
//                   className="absolute inset-0 bg-primary/30 rounded-xl blur-md -z-10"
//                   animate={{
//                     scale: [1, 1.2, 1],
//                     opacity: [0.5, 0.3, 0.5],
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 />
//               </div>
//             </motion.div>
//           </div>

//           {/* Lista de destinos con indicador de progreso */}
//           <div className="w-full md:w-1/2 space-y-6">
//             {destinations.map((destination, index) => (
//               <motion.div
//                 key={destination.name}
//                 className="relative pl-12"
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 {/* Línea conectora */}
//                 {index < destinations.length - 1 && (
//                   <div className="absolute left-[19px] top-10 w-0.5 h-full bg-border" />
//                 )}

//                 {/* Icono de destino */}
//                 <motion.div
//                   className="absolute left-0 top-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center"
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   <MapPin className="w-5 h-5 text-primary" />
//                 </motion.div>

//                 {/* Contenido */}
//                 <div className="pb-8">
//                   <h3 className="text-xl font-semibold">{destination.name}</h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     {getDestinationDescription(destination.name)}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Indicador de scroll */}
//         <motion.div
//           className="mt-16 text-center"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//         >
//           <p className="text-sm text-muted-foreground">
//             Scroll to explore the journey
//           </p>
//           <motion.div
//             className="mt-4 w-6 h-10 mx-auto border-2 border-muted-foreground/30 rounded-full flex justify-center"
//             initial={{ opacity: 0.5 }}
//           >
//             <motion.div
//               className="w-1.5 h-3 bg-primary rounded-full mt-2"
//               animate={{ y: [0, 12, 0] }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// function getDestinationDescription(name: string): string {
//   const descriptions: Record<string, string> = {
//     "Buenos Aires": "The vibrant capital, where tango and culture meet.",
//     "Córdoba": "Gateway to the sierras and colonial heritage.",
//     "Mendoza": "Wine country with stunning Andean views.",
//     "Salta": "Colonial charm and colorful northern landscapes.",
//     "Bariloche": "Lakes, chocolate, and Patagonian wilderness.",
//     "Ushuaia": "The end of the world, beginning of adventure.",
//   }
//   return descriptions[name] || ""
// }

/////////////////////////////////////////////////////////////////. chat GPT

// "use client"

// import { useRef } from "react"
// import { motion, useScroll, useTransform } from "framer-motion"
// import { MapPin, Bus } from "lucide-react"

// const destinations = [
//   { name: "Buenos Aires", position: 0 },
//   { name: "Córdoba", position: 20 },
//   { name: "Mendoza", position: 40 },
//   { name: "Salta", position: 60 },
//   { name: "Bariloche", position: 80 },
//   { name: "Ushuaia", position: 100 },
// ]

// export function BusJourney() {
//   const containerRef = useRef<HTMLDivElement>(null)

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   })

//   const busProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100])
//   const pathDraw = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-40 px-6 overflow-hidden bg-gradient-to-b from-muted/40 via-background to-background"
//     >
//       <div className="mx-auto max-w-7xl">
//         {/* HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-24"
//         >
//           <h2 className="text-4xl md:text-6xl font-bold">
//             Your Journey Awaits
//           </h2>
//           <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
//             Discover Argentina slowly, consciously, and beautifully — by road.
//           </p>
//         </motion.div>

//         <div className="relative flex flex-col md:flex-row items-center gap-16">
//           {/* MAP */}
//           <div className="relative w-full md:w-1/2 aspect-[3/4] max-w-md mx-auto">
//             <svg viewBox="0 0 300 400" className="w-full h-full">
//               {/* Argentina silhouette */}
//               <path
//                 d="M150 20 
//                    C180 30, 200 50, 210 80
//                    C220 110, 230 140, 220 170
//                    C210 200, 200 230, 190 260
//                    C180 290, 170 320, 160 350
//                    C155 370, 150 385, 145 390
//                    C140 385, 135 370, 130 350
//                    C120 320, 110 290, 100 260
//                    C90 230, 80 200, 70 170
//                    C60 140, 70 110, 80 80
//                    C90 50, 110 30, 150 20Z"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 className="text-muted-foreground/30"
//               />

//               {/* Background route */}
//               <path
//                 d="M180 60 
//                    C170 90, 140 120, 130 150
//                    C120 180, 100 210, 110 240
//                    C120 270, 140 300, 145 340"
//                 stroke="currentColor"
//                 strokeWidth="3"
//                 strokeDasharray="6 10"
//                 className="text-muted-foreground/20"
//               />

//               {/* Animated route */}
//               <motion.path
//                 d="M180 60 
//                    C170 90, 140 120, 130 150
//                    C120 180, 100 210, 110 240
//                    C120 270, 140 300, 145 340"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 strokeLinecap="round"
//                 className="text-primary"
//                 style={{ pathLength: pathDraw }}
//               />

//               {/* Destinations */}
//               {[
//                 { x: 180, y: 60, label: "Buenos Aires" },
//                 { x: 155, y: 105, label: "Córdoba" },
//                 { x: 130, y: 150, label: "Mendoza" },
//                 { x: 110, y: 195, label: "Salta" },
//                 { x: 110, y: 240, label: "Bariloche" },
//                 { x: 145, y: 340, label: "Ushuaia" },
//               ].map((city, index) => (
//                 <motion.g key={city.label}>
//                   {/* Pulse */}
//                   <motion.circle
//                     cx={city.x}
//                     cy={city.y}
//                     r="16"
//                     className="fill-primary/20"
//                     animate={{
//                       scale: [0.8, 1.4, 0.8],
//                       opacity: [0.4, 0, 0.4],
//                     }}
//                     transition={{
//                       duration: 2.5,
//                       repeat: Infinity,
//                       delay: index * 0.4,
//                     }}
//                   />

//                   {/* Dot */}
//                   <motion.circle
//                     cx={city.x}
//                     cy={city.y}
//                     r="7"
//                     className="fill-background stroke-primary"
//                     strokeWidth="3"
//                     initial={{ scale: 0 }}
//                     whileInView={{ scale: 1 }}
//                     viewport={{ once: true }}
//                   />

//                   {/* Label */}
//                   <text
//                     x={city.x + (index % 2 === 0 ? 18 : -18)}
//                     y={city.y + 5}
//                     textAnchor={index % 2 === 0 ? "start" : "end"}
//                     className="fill-foreground text-xs font-medium"
//                   >
//                     {city.label}
//                   </text>
//                 </motion.g>
//               ))}
//             </svg>

//             {/* BUS */}
//             <motion.div
//               className="absolute w-14 h-14 -ml-7 -mt-7"
//               style={{
//                 offsetPath: `path("M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340")`,
//                 offsetDistance: useTransform(busProgress, (v) => `${v}%`),
//               }}
//             >
//               <motion.div
//                 className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-xl"
//                 animate={{
//                   y: [0, -4, 0],
//                   rotate: [0, 2, -2, 0],
//                 }}
//                 transition={{
//                   duration: 1.8,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <Bus className="w-7 h-7 text-primary-foreground" />
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* LIST */}
//           <div className="w-full md:w-1/2 space-y-10">
//             {destinations.map((destination, index) => {
//               const isActive = useTransform(
//                 busProgress,
//                 (v) => v >= destination.position
//               )

//               return (
//                 <motion.div
//                   key={destination.name}
//                   className="relative pl-14"
//                   initial={{ opacity: 0, x: 30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <motion.div
//                     className="absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center"
//                     style={{
//                       backgroundColor: isActive.get()
//                         ? "hsl(var(--primary))"
//                         : "hsl(var(--muted))",
//                     }}
//                   >
//                     <MapPin className="w-5 h-5 text-background" />
//                   </motion.div>

//                   <h3 className="text-xl font-semibold">
//                     {destination.name}
//                   </h3>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {getDestinationDescription(destination.name)}
//                   </p>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>

//         {/* SCROLL HINT */}
//         <motion.div
//           className="mt-32 text-center"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//         >
//           <p className="text-sm text-muted-foreground mb-4">
//             Scroll to continue the journey
//           </p>
//           <motion.div
//             className="w-6 h-10 mx-auto border border-muted-foreground/30 rounded-full flex justify-center"
//             animate={{ opacity: [0.4, 1, 0.4] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <motion.div
//               className="w-1.5 h-3 bg-primary rounded-full mt-2"
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 1.4, repeat: Infinity }}
//             />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// function getDestinationDescription(name: string) {
//   const descriptions: Record<string, string> = {
//     "Buenos Aires": "The vibrant capital where tango and culture meet.",
//     "Córdoba": "Mountains, history and student life.",
//     "Mendoza": "Wine routes beneath the Andes.",
//     "Salta": "Colonial soul and northern colors.",
//     "Bariloche": "Lakes, forests and Patagonia.",
//     "Ushuaia": "The end of the world, the start of adventure.",
//   }

//   return descriptions[name]
// }
