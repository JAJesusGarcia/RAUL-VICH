"use client"

import { useRef, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion"
import { MapPin, Bus, ArrowRight, Compass } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"

const MAP_PATHS = {
  silhouette: "M150 20 C180 30, 200 50, 210 80 C220 110, 230 140, 220 170 C210 200, 200 230, 190 260 C180 290, 170 320, 160 350 C155 370, 150 385, 145 390 C140 385, 135 370, 130 350 C120 320, 110 290, 100 260 C90 230, 80 200, 70 170 C60 140, 70 110, 80 80 C90 50, 110 30, 150 20Z",
  route: "M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
}

const RAW_DESTINATIONS = [
  { name: "Buenos Aires", mapCoords: { x: 180, y: 60 }, description: "La capital vibrante, donde el tango y la cultura convergen.", highlight: "Capital cultural" },
  { name: "Córdoba", mapCoords: { x: 155, y: 105 }, description: "Puerta a las sierras, herencia jesuita y vida universitaria.", highlight: "Corazón serrano" },
  { name: "Mendoza", mapCoords: { x: 130, y: 150 }, description: "Tierra del sol y del buen vino, con el Aconcagua de fondo.", highlight: "Capital del vino" },
  { name: "Salta", mapCoords: { x: 110, y: 195 }, description: "La linda. Arquitectura colonial y paisajes norteños coloridos.", highlight: "Salta la linda" },
  { name: "Bariloche", mapCoords: { x: 110, y: 240 }, description: "Lagos cristalinos, chocolate artesanal y bosques patagónicos.", highlight: "Patagonia argentina" },
  { name: "Ushuaia", mapCoords: { x: 145, y: 340 }, description: "El fin del mundo, donde comienza tu próxima gran aventura.", highlight: "Fin del mundo" },
]

export function BusJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const destinations = useMemo(() => {
    return RAW_DESTINATIONS.map((dest, i) => ({
      ...dest,
      position: (i / (RAW_DESTINATIONS.length - 1)) * 0.95 
    }))
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 20 })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (isPaused) return
    const stepIndex = destinations.reduce((lastIndex, dest, index) => {
      return latest >= dest.position - 0.05 ? index : lastIndex
    }, 0)
    if (stepIndex !== activeStep) setActiveStep(stepIndex)
  })

  const busPosition = useTransform(smoothProgress, [0, 1], [0, 100])

  return (
    <section 
      ref={containerRef} 
      className="relative bg-background text-foreground transition-colors duration-500 py-20 overflow-clip"
    >
      {/* BACKGROUND DECORATIVO - ADAPTADO */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <Compass className="w-4 h-4" />
            <span>Explora Argentina</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            Tu Ruta Comienza Aquí
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[480px_1fr] gap-8 lg:gap-16">
          
          {/* ==================== MAPA (Sticky) ==================== */}
          <div className="relative hidden lg:block h-full">
            <div className="sticky top-24 h-[calc(100vh-8rem)] min-h-[600px] flex flex-col">
              
              <div className="relative flex-1 bg-card/50 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col">
                
                {/* Status Bar */}
                <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {destinations[activeStep].name}
                    </span>
                  </div>
                </div>

                {/* SVG MAP - TOTALMENTE ADAPTADO */}
                <div className="flex-1 w-full relative flex items-center justify-center p-8">
                  <svg viewBox="0 0 300 400" className="w-full h-full max-h-[500px]">
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      {/* El degradado de la silueta cambia según el modo claro/oscuro */}
                      <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className="stop-color-muted/40 dark:stop-color-zinc-800" />
                        <stop offset="100%" className="stop-color-muted/20 dark:stop-color-zinc-900" />
                      </linearGradient>
                    </defs>

                    {/* Silueta del mapa */}
                    <path 
                      d={MAP_PATHS.silhouette} 
                      className="fill-muted/20 dark:fill-zinc-900/50 stroke-border transition-colors duration-500" 
                      strokeWidth="1.5" 
                    />

                    {/* Ruta Base */}
                    <path d={MAP_PATHS.route} className="stroke-muted dark:stroke-zinc-800" strokeWidth="2" strokeDasharray="4 6" fill="none" />

                    {/* Ruta Activa */}
                    <motion.path
                      d={MAP_PATHS.route}
                      stroke="url(#pathGradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      style={{ pathLength: smoothProgress }}
                    />

                    {/* Ciudades */}
                    {destinations.map((city, index) => {
                       const isActive = index === activeStep
                       return (
                        <g key={city.name}>
                          <motion.circle
                            cx={city.mapCoords.x}
                            cy={city.mapCoords.y}
                            r={isActive ? 6 : 3}
                            className={cn("transition-colors duration-300", isActive ? "fill-primary" : "fill-muted-foreground")}
                            animate={{ scale: isActive ? 1.2 : 1 }}
                          />
                          
                          {isActive && (
                            <motion.circle
                              cx={city.mapCoords.x}
                              cy={city.mapCoords.y}
                              r="8"
                              className="stroke-primary fill-none"
                              initial={{ scale: 0.5, opacity: 1 }}
                              animate={{ scale: 2.5, opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}

                          <text
                            x={city.mapCoords.x + (index % 2 === 0 ? 12 : -12)}
                            y={city.mapCoords.y + 3}
                            className={cn(
                              "text-[10px] font-bold uppercase transition-colors duration-500",
                              isActive ? "fill-foreground" : "fill-muted-foreground/60"
                            )}
                            textAnchor={index % 2 === 0 ? "start" : "end"}
                          >
                            {city.name}
                          </text>
                        </g>
                      )
                    })}

                    {/* Bus Animado - Fondo blanco en dark, negro en light para contraste */}
                    <motion.foreignObject
                       width="40" height="40" x="-20" y="-20"
                       style={{
                         offsetPath: `path("${MAP_PATHS.route}")`,
                         offsetDistance: useTransform(busPosition, (v) => `${v}%`),
                       }}
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="p-1.5 bg-foreground text-background rounded-lg shadow-xl ring-2 ring-background">
                           <Bus className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.foreignObject>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== LISTA DE TARJETAS ==================== */}
          <div className="relative space-y-32 pb-40">
            {destinations.map((destination, index) => {
              const isActive = index === activeStep
              return (
                <motion.div
                  key={destination.name}
                  className={cn(
                    "relative pl-12 lg:pl-0 transition-all duration-500",
                    isActive ? "opacity-100 scale-100" : "opacity-30 scale-95"
                  )}
                >
                  <div className={cn(
                    "group p-8 rounded-[2.5rem] border transition-all duration-500",
                    isActive 
                      ? "bg-card border-border shadow-2xl" 
                      : "bg-transparent border-transparent"
                  )}>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-sm font-mono text-primary font-bold">0{index + 1}</span>
                      <h3 className="text-4xl font-bold">
                        {destination.name}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-xl leading-relaxed mb-8 max-w-lg">
                      {destination.description}
                    </p>

                    <Button 
                      size="lg"
                      className={cn(
                        "rounded-full transition-all duration-500",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                    >
                      Explorar Destino
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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

/////////////////////////


// "use client"

// import { useRef, useState } from "react"
// import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
// import { MapPin, Bus, ArrowRight, Compass } from "lucide-react"
// import { cn } from "@/src/lib/utils"
// import { Button } from "@/src/components/ui/button"

// const destinations = [
//   { 
//     name: "Buenos Aires", 
//     position: 0, 
//     mapCoords: { x: 180, y: 60 },
//     description: "La capital vibrante, donde el tango y la cultura convergen en cada esquina.",
//     highlight: "Capital cultural"
//   },
//   { 
//     name: "Córdoba", 
//     position: 0.18, 
//     mapCoords: { x: 155, y: 105 },
//     description: "Puerta a las sierras, herencia jesuita y vida universitaria.",
//     highlight: "Corazón serrano"
//   },
//   { 
//     name: "Mendoza", 
//     position: 0.36, 
//     mapCoords: { x: 130, y: 150 },
//     description: "Tierra del sol y del buen vino, con el Aconcagua de fondo.",
//     highlight: "Capital del vino"
//   },
//   { 
//     name: "Salta", 
//     position: 0.54, 
//     mapCoords: { x: 110, y: 195 },
//     description: "La linda. Arquitectura colonial y paisajes norteños coloridos.",
//     highlight: "Salta la linda"
//   },
//   { 
//     name: "Bariloche", 
//     position: 0.75, 
//     mapCoords: { x: 110, y: 240 },
//     description: "Lagos cristalinos, chocolate artesanal y bosques patagónicos.",
//     highlight: "Patagonia argentina"
//   },
//   { 
//     name: "Ushuaia", 
//     position: 1, 
//     mapCoords: { x: 145, y: 340 },
//     description: "El fin del mundo, donde comienza tu próxima gran aventura.",
//     highlight: "Fin del mundo"
//   },
// ]

// export function BusJourney() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [activeStep, setActiveStep] = useState(0)
//   const [isPaused, setIsPaused] = useState(false)

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   })

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   })

//   useMotionValueEvent(smoothProgress, "change", (latest) => {
//     if (isPaused) return
    
//     const currentStep = destinations.findIndex((dest, index) => {
//       const nextDest = destinations[index + 1]
//       if (!nextDest) return true
//       return latest >= dest.position && latest < nextDest.position
//     })
    
//     if (currentStep !== -1 && currentStep !== activeStep) {
//       setActiveStep(currentStep)
//     }
//   })

//   const busPosition = useTransform(smoothProgress, [0, 1], [0, 100])

//   return (
//     // ⚠️ IMPORTANTE: NO usar overflow-hidden aquí
//     <section 
//       ref={containerRef} 
//       className="relative bg-gradient-to-b from-background via-zinc-950/95 to-background text-zinc-100 py-20 md:py-28 lg:py-32"
//     >
//       {/* Fondos decorativos */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950/95 to-zinc-950 pointer-events-none" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />

//       {/* ⚠️ IMPORTANTE: Container sin overflow */}
//       <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16 md:mb-24 space-y-6"
//         >
//           <motion.div 
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium"
//             whileHover={{ scale: 1.05 }}
//           >
//             <Compass className="w-4 h-4" />
//             <span>Viaje Interactivo por Argentina</span>
//           </motion.div>
          
//           <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
//               Tu Ruta Comienza Aquí
//             </span>
//           </h2>
          
//           <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
//             Descubre los destinos más impresionantes de Argentina en una experiencia visual única.
//             <span className="block mt-2 text-sm text-zinc-500">
//               Haz scroll para iniciar el viaje ↓
//             </span>
//           </p>
//         </motion.div>

//         {/* ⚠️ GRID CONFIGURADO PARA STICKY */}
//         <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] lg:gap-16 xl:gap-24 gap-12">
          
//           {/* ========================================
//               COLUMNA IZQUIERDA - MAPA STICKY
//               ======================================== */}
//           <div>
//             {/* Wrapper sticky - Este es el elemento que se pega */}
//             <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
//               {/* Contenido del mapa */}
//               <div className="h-[500px] md:h-[600px] lg:h-full w-full max-w-md mx-auto lg:max-w-none">
                
//                 {/* Indicador de progreso */}
//                 <div className="relative z-20 flex items-center justify-between px-4 py-3 mb-4 bg-zinc-900/80 backdrop-blur-sm rounded-t-xl border border-zinc-800/50">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                     <span className="text-xs font-medium text-zinc-400">
//                       En ruta: {destinations[activeStep].name}
//                     </span>
//                   </div>
//                   <span className="text-xs text-zinc-500">
//                     {activeStep + 1}/{destinations.length}
//                   </span>
//                 </div>

//                 {/* Contenedor del SVG */}
//                 <div className="relative w-full h-[calc(100%-4rem)] flex items-center justify-center bg-zinc-900/30 backdrop-blur-sm rounded-b-xl border border-zinc-800/50 p-6 lg:p-8">
                  
//                   <svg 
//                     viewBox="0 0 300 400" 
//                     className="w-full h-full"
//                     style={{ filter: "drop-shadow(0 0 40px rgba(99, 102, 241, 0.15))" }}
//                   >
//                     <defs>
//                       <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
//                         <feGaussianBlur stdDeviation="5" result="blur" />
//                         <feComposite in="SourceGraphic" in2="blur" operator="over" />
//                       </filter>
                      
//                       <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                         <stop offset="0%" stopColor="#818cf8" />
//                         <stop offset="50%" stopColor="#6366f1" />
//                         <stop offset="100%" stopColor="#ec4899" />
//                       </linearGradient>

//                       <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                         <stop offset="0%" stopColor="#27272a" />
//                         <stop offset="100%" stopColor="#18181b" />
//                       </linearGradient>
//                     </defs>

//                     {/* Silueta Argentina */}
//                     <path
//                       d="M150 20 C180 30, 200 50, 210 80 C220 110, 230 140, 220 170 C210 200, 200 230, 190 260 C180 290, 170 320, 160 350 C155 370, 150 385, 145 390 C140 385, 135 370, 130 350 C120 320, 110 290, 100 260 C90 230, 80 200, 70 170 C60 140, 70 110, 80 80 C90 50, 110 30, 150 20Z"
//                       fill="url(#mapGradient)"
//                       stroke="#3f3f46"
//                       strokeWidth="1.5"
//                     />

//                     {/* Ruta Base */}
//                     <path
//                       d="M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
//                       className="stroke-zinc-700"
//                       strokeWidth="3"
//                       strokeDasharray="6 8"
//                       fill="none"
//                     />

//                     {/* Ruta Activa */}
//                     <motion.path
//                       d="M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
//                       stroke="url(#pathGradient)"
//                       strokeWidth="5"
//                       fill="none"
//                       strokeLinecap="round"
//                       style={{ pathLength: smoothProgress }}
//                       filter="url(#glow-strong)"
//                     />

//                     {/* Puntos de Ciudades */}
//                     {destinations.map((city, index) => {
//                        const isActive = index === activeStep
//                        const isPast = index < activeStep
                       
//                        return (
//                         <motion.g key={city.name}>
//                           <motion.circle
//                             cx={city.mapCoords.x}
//                             cy={city.mapCoords.y}
//                             r={isActive ? 8 : 4}
//                             className={cn(
//                               "transition-all duration-500",
//                               isActive 
//                                 ? "fill-white stroke-indigo-400" 
//                                 : isPast 
//                                   ? "fill-indigo-500 stroke-indigo-400"
//                                   : "fill-zinc-700 stroke-zinc-600"
//                             )}
//                             strokeWidth={isActive ? 3 : 2}
//                             animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
//                             transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
//                           />
                          
//                           {isActive && (
//                             <>
//                               <motion.circle
//                                 cx={city.mapCoords.x}
//                                 cy={city.mapCoords.y}
//                                 r="16"
//                                 className="stroke-indigo-400/60 fill-none"
//                                 strokeWidth="2"
//                                 initial={{ opacity: 1, scale: 0.5 }}
//                                 animate={{ opacity: 0, scale: 2 }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               />
//                               <motion.circle
//                                 cx={city.mapCoords.x}
//                                 cy={city.mapCoords.y}
//                                 r="12"
//                                 className="fill-indigo-500/20"
//                                 animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               />
//                             </>
//                           )}

//                           <text
//                             x={city.mapCoords.x + (index % 2 === 0 ? 15 : -15)}
//                             y={city.mapCoords.y + 4}
//                             className={cn(
//                               "text-[10px] font-semibold transition-all duration-300",
//                               isActive ? "fill-white" : "fill-zinc-500"
//                             )}
//                             textAnchor={index % 2 === 0 ? "start" : "end"}
//                           >
//                             {city.name}
//                           </text>
//                         </motion.g>
//                       )
//                     })}

//                     {/* EL BUS */}
//                     <motion.foreignObject
//                        width="50" height="50" x="-25" y="-25"
//                        style={{
//                          offsetPath: `path("M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340")`,
//                          offsetDistance: useTransform(busPosition, (v) => `${v}%`),
//                        }}
//                     >
//                       <div className="w-full h-full flex items-center justify-center">
//                         <motion.div 
//                           className="relative"
//                           animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }}
//                           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                         >
//                           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 blur-xl rounded-full opacity-60 scale-150" />
//                           <div className="relative bg-gradient-to-br from-white to-zinc-100 p-3 rounded-2xl shadow-2xl border-2 border-white/20">
//                             <Bus className="w-6 h-6 text-indigo-600" fill="currentColor" />
//                           </div>
//                           <motion.div
//                             className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
//                             animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
//                             transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
//                           />
//                         </motion.div>
//                       </div>
//                     </motion.foreignObject>
//                   </svg>
//                 </div>

//                 {/* Control de pausa */}
//                 <div className="mt-4 text-center">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setIsPaused(!isPaused)}
//                     className="bg-zinc-900/80 backdrop-blur-sm border-zinc-700 hover:bg-zinc-800 text-xs"
//                   >
//                     {isPaused ? "▶ Reanudar" : "⏸ Pausar"} viaje
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ========================================
//               COLUMNA DERECHA - LISTA SCROLLEABLE
//               ======================================== */}
//           <div className="relative space-y-20 md:space-y-24 pb-20 lg:pb-[800px] min-h-[150vh]">
            
//             {/* Líneas verticales */}
//             <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-800 via-zinc-700 to-transparent" />
//             <motion.div 
//               className="absolute left-6 top-0 w-px bg-gradient-to-b from-indigo-500 via-indigo-400 to-pink-500 origin-top"
//               style={{ height: "100%", scaleY: smoothProgress }} 
//             />

//             {destinations.map((destination, index) => {
//               const isActive = index === activeStep
//               const isPast = index < activeStep
//               const isFuture = index > activeStep

//               return (
//                 <motion.div
//                   key={destination.name}
//                   initial={{ opacity: 0, x: 50 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ margin: "-15% 0px" }}
//                   transition={{ duration: 0.5, delay: index * 0.05 }}
//                   className={cn("relative pl-16 group", isActive && "scale-[1.02]")}
//                 >
//                   {/* Número */}
//                   <motion.div 
//                     className={cn(
//                       "absolute left-2 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 font-bold text-sm",
//                       isActive 
//                         ? "border-indigo-400 bg-indigo-500 text-white shadow-lg shadow-indigo-500/50 scale-110" 
//                         : isPast
//                           ? "border-indigo-500/70 bg-indigo-950 text-indigo-400"
//                           : "border-zinc-700 bg-zinc-900 text-zinc-600"
//                     )}
//                     whileHover={{ scale: 1.15 }}
//                   >
//                     {isPast ? "✓" : index + 1}
//                   </motion.div>

//                   {/* Tarjeta */}
//                   <motion.div 
//                     className={cn(
//                       "p-6 md:p-8 rounded-2xl border transition-all duration-500 backdrop-blur-sm",
//                       isActive 
//                         ? "bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-indigo-950/30 border-indigo-500/40 shadow-2xl shadow-indigo-500/10" 
//                         : isPast
//                           ? "bg-zinc-900/50 border-zinc-800/70"
//                           : "bg-zinc-900/20 border-zinc-800/30 hover:bg-zinc-900/40 hover:border-zinc-700/50"
//                     )}
//                     whileHover={{ y: isFuture ? 0 : -4 }}
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className={cn(
//                             "text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
//                             isActive ? "text-white" : "text-zinc-400"
//                           )}>
//                             {destination.name}
//                           </h3>
//                           {isActive && (
//                             <motion.div
//                               initial={{ opacity: 0, scale: 0, rotate: -180 }}
//                               animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                               className="flex-shrink-0"
//                             >
//                               <div className="bg-gradient-to-br from-indigo-500 to-pink-500 p-2 rounded-xl">
//                                 <MapPin className="w-4 h-4 text-white" fill="white" />
//                               </div>
//                             </motion.div>
//                           )}
//                         </div>
                        
//                         <span className={cn(
//                           "inline-block text-xs font-medium px-3 py-1 rounded-full transition-all duration-300",
//                           isActive 
//                             ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
//                             : "bg-zinc-800/50 text-zinc-500"
//                         )}>
//                           {destination.highlight}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <p className={cn(
//                       "leading-relaxed transition-colors duration-300 mb-4",
//                       isActive ? "text-zinc-300" : "text-zinc-500"
//                     )}>
//                       {destination.description}
//                     </p>

//                     <motion.div 
//                       className={cn(
//                         "flex items-center gap-2 text-sm font-medium transition-all overflow-hidden",
//                         isActive ? "max-h-12 opacity-100 mt-4" : "max-h-0 opacity-0"
//                       )}
//                     >
//                       <Button 
//                         variant="ghost" 
//                         size="sm"
//                         className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 group/btn"
//                       >
//                         <span>Explorar {destination.name}</span>
//                         <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
//                       </Button>
//                     </motion.div>
//                   </motion.div>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>

//         {/* CTA Final */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mt-20 md:mt-32"
//         >
//           <h3 className="text-2xl md:text-3xl font-bold mb-4">
//             ¿Listo para comenzar tu aventura?
//           </h3>
//           <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
//             Explora nuestros paquetes personalizados o contáctanos para diseñar tu viaje ideal.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500">
//               Ver Paquetes
//             </Button>
//             <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800">
//               Contactar
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

///////////////////////. CLAUDE //////////////////


// "use client"

// import { useRef, useState, useEffect } from "react"
// import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
// import { MapPin, Bus, ArrowRight, Compass } from "lucide-react"
// import { cn } from "@/src/lib/utils"
// import { Button } from "@/src/components/ui/button"

// const destinations = [
//   { 
//     name: "Buenos Aires", 
//     position: 0, 
//     mapCoords: { x: 180, y: 60 },
//     description: "La capital vibrante, donde el tango y la cultura convergen en cada esquina.",
//     highlight: "Capital cultural",
//     image: "/destinations/buenos-aires.jpg" // Opcional
//   },
//   { 
//     name: "Córdoba", 
//     position: 0.18, 
//     mapCoords: { x: 155, y: 105 },
//     description: "Puerta a las sierras, herencia jesuita y vida universitaria.",
//     highlight: "Corazón serrano"
//   },
//   { 
//     name: "Mendoza", 
//     position: 0.36, 
//     mapCoords: { x: 130, y: 150 },
//     description: "Tierra del sol y del buen vino, con el Aconcagua de fondo.",
//     highlight: "Capital del vino"
//   },
//   { 
//     name: "Salta", 
//     position: 0.54, 
//     mapCoords: { x: 110, y: 195 },
//     description: "La linda. Arquitectura colonial y paisajes norteños coloridos.",
//     highlight: "Salta la linda"
//   },
//   { 
//     name: "Bariloche", 
//     position: 0.75, 
//     mapCoords: { x: 110, y: 240 },
//     description: "Lagos cristalinos, chocolate artesanal y bosques patagónicos.",
//     highlight: "Patagonia argentina"
//   },
//   { 
//     name: "Ushuaia", 
//     position: 1, 
//     mapCoords: { x: 145, y: 340 },
//     description: "El fin del mundo, donde comienza tu próxima gran aventura.",
//     highlight: "Fin del mundo"
//   },
// ]

// export function BusJourney() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [activeStep, setActiveStep] = useState(0)
//   const [isPaused, setIsPaused] = useState(false)

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   })

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   })

//   // Sincronizar paso activo con scroll
//   useMotionValueEvent(smoothProgress, "change", (latest) => {
//     if (isPaused) return
    
//     const currentStep = destinations.findIndex((dest, index) => {
//       const nextDest = destinations[index + 1]
//       if (!nextDest) return true
//       return latest >= dest.position && latest < nextDest.position
//     })
    
//     if (currentStep !== -1 && currentStep !== activeStep) {
//       setActiveStep(currentStep)
//     }
//   })

//   const busPosition = useTransform(smoothProgress, [0, 1], [0, 100])

//   return (
//     <section 
//       ref={containerRef} 
//       className="relative bg-gradient-to-b from-background via-zinc-950/95 to-background text-zinc-100 py-24 md:py-32 overflow-hidden"
//     >
//       {/* Fondo con efecto de profundidad */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950/95 to-zinc-950" />
      
//       {/* Grid sutil de fondo */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

//       <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
//         {/* Header mejorado */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16 md:mb-24 space-y-6"
//         >
//           <motion.div 
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium"
//             whileHover={{ scale: 1.05 }}
//           >
//             <Compass className="w-4 h-4" />
//             <span>Viaje Interactivo por Argentina</span>
//           </motion.div>
          
//           <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
//               Tu Ruta Comienza Aquí
//             </span>
//           </h2>
          
//           <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
//             Descubre los destinos más impresionantes de Argentina en una experiencia visual única.
//             <span className="block mt-2 text-sm text-zinc-500">
//               Haz scroll para iniciar el viaje ↓
//             </span>
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          
//           {/* MAPA STICKY - Columna Izquierda */}
//           <div className="relative lg:sticky lg:top-24 h-[450px] md:h-[550px] w-full max-w-md mx-auto lg:max-w-none">
            
//             {/* Indicador de progreso */}
//             <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-zinc-900/50 backdrop-blur-sm rounded-t-2xl border-b border-zinc-800/50">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                 <span className="text-xs font-medium text-zinc-400">
//                   En ruta: {destinations[activeStep].name}
//                 </span>
//               </div>
//               <span className="text-xs text-zinc-500">
//                 {activeStep + 1}/{destinations.length}
//               </span>
//             </div>

//             <div className="relative w-full h-full flex items-center justify-center bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
              
//               {/* SVG MAPA */}
//               <svg 
//                 viewBox="0 0 300 400" 
//                 className="w-full h-full drop-shadow-2xl"
//                 style={{ filter: "drop-shadow(0 0 40px rgba(99, 102, 241, 0.2))" }}
//               >
//                 <defs>
//                   <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
//                     <feGaussianBlur stdDeviation="5" result="blur" />
//                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
//                   </filter>
                  
//                   <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#818cf8" />
//                     <stop offset="50%" stopColor="#6366f1" />
//                     <stop offset="100%" stopColor="#ec4899" />
//                   </linearGradient>

//                   <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#27272a" />
//                     <stop offset="100%" stopColor="#18181b" />
//                   </linearGradient>
//                 </defs>

//                 {/* Silueta Argentina */}
//                 <path
//                   d="M150 20 C180 30, 200 50, 210 80 C220 110, 230 140, 220 170 C210 200, 200 230, 190 260 C180 290, 170 320, 160 350 C155 370, 150 385, 145 390 C140 385, 135 370, 130 350 C120 320, 110 290, 100 260 C90 230, 80 200, 70 170 C60 140, 70 110, 80 80 C90 50, 110 30, 150 20Z"
//                   fill="url(#mapGradient)"
//                   stroke="#3f3f46"
//                   strokeWidth="1.5"
//                 />

//                 {/* Ruta Base */}
//                 <path
//                   d="M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
//                   className="stroke-zinc-700"
//                   strokeWidth="3"
//                   strokeDasharray="6 8"
//                   fill="none"
//                 />

//                 {/* Ruta Activa Animada */}
//                 <motion.path
//                   d="M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
//                   stroke="url(#pathGradient)"
//                   strokeWidth="5"
//                   fill="none"
//                   strokeLinecap="round"
//                   style={{ pathLength: smoothProgress }}
//                   filter="url(#glow-strong)"
//                 />

//                 {/* Puntos de Ciudades */}
//                 {destinations.map((city, index) => {
//                    const isActive = index === activeStep
//                    const isPast = index < activeStep
                   
//                    return (
//                     <motion.g key={city.name}>
//                       {/* Círculo principal */}
//                       <motion.circle
//                         cx={city.mapCoords.x}
//                         cy={city.mapCoords.y}
//                         r={isActive ? 8 : 4}
//                         className={cn(
//                           "transition-all duration-500",
//                           isActive 
//                             ? "fill-white stroke-indigo-400" 
//                             : isPast 
//                               ? "fill-indigo-500 stroke-indigo-400"
//                               : "fill-zinc-700 stroke-zinc-600"
//                         )}
//                         strokeWidth={isActive ? 3 : 2}
//                         animate={{ 
//                           scale: isActive ? [1, 1.2, 1] : 1 
//                         }}
//                         transition={{ 
//                           duration: 1.5, 
//                           repeat: isActive ? Infinity : 0 
//                         }}
//                       />
                      
//                       {/* Pulse para ciudad activa */}
//                       {isActive && (
//                         <>
//                           <motion.circle
//                             cx={city.mapCoords.x}
//                             cy={city.mapCoords.y}
//                             r="16"
//                             className="stroke-indigo-400/60 fill-none"
//                             strokeWidth="2"
//                             initial={{ opacity: 1, scale: 0.5 }}
//                             animate={{ opacity: 0, scale: 2 }}
//                             transition={{ duration: 2, repeat: Infinity }}
//                           />
//                           <motion.circle
//                             cx={city.mapCoords.x}
//                             cy={city.mapCoords.y}
//                             r="12"
//                             className="fill-indigo-500/20"
//                             animate={{ 
//                               scale: [1, 1.3, 1],
//                               opacity: [0.5, 0.2, 0.5]
//                             }}
//                             transition={{ duration: 2, repeat: Infinity }}
//                           />
//                         </>
//                       )}

//                       {/* Label de ciudad */}
//                       <text
//                         x={city.mapCoords.x + (index % 2 === 0 ? 15 : -15)}
//                         y={city.mapCoords.y + 4}
//                         className={cn(
//                           "text-[10px] font-semibold transition-all duration-300",
//                           isActive ? "fill-white" : "fill-zinc-500"
//                         )}
//                         textAnchor={index % 2 === 0 ? "start" : "end"}
//                       >
//                         {city.name}
//                       </text>
//                     </motion.g>
//                   )
//                 })}

//                 {/* EL BUS MEJORADO */}
//                 <motion.foreignObject
//                    width="50" 
//                    height="50"
//                    x="-25" 
//                    y="-25"
//                    style={{
//                      offsetPath: `path("M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340")`,
//                      offsetDistance: useTransform(busPosition, (v) => `${v}%`),
//                    }}
//                 >
//                   <div className="w-full h-full flex items-center justify-center">
//                     <motion.div 
//                       className="relative"
//                       animate={{ 
//                         y: [0, -3, 0],
//                         rotate: [-2, 2, -2]
//                       }}
//                       transition={{ 
//                         duration: 2, 
//                         repeat: Infinity, 
//                         ease: "easeInOut" 
//                       }}
//                     >
//                       {/* Glow del bus */}
//                       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 blur-xl rounded-full opacity-60 scale-150" />
                      
//                       {/* Bus container */}
//                       <div className="relative bg-gradient-to-br from-white to-zinc-100 p-3 rounded-2xl shadow-2xl border-2 border-white/20">
//                         <Bus className="w-6 h-6 text-indigo-600" fill="currentColor" />
//                       </div>

//                       {/* Sparkles */}
//                       <motion.div
//                         className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
//                         animate={{ 
//                           scale: [0, 1, 0],
//                           opacity: [0, 1, 0]
//                         }}
//                         transition={{ 
//                           duration: 1.5, 
//                           repeat: Infinity,
//                           repeatDelay: 0.5
//                         }}
//                       />
//                     </motion.div>
//                   </div>
//                 </motion.foreignObject>
//               </svg>
//             </div>

//             {/* Controles de pausa (opcional) */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setIsPaused(!isPaused)}
//                 className="bg-zinc-900/80 backdrop-blur-sm border-zinc-700 hover:bg-zinc-800 text-xs"
//               >
//                 {isPaused ? "Reanudar" : "Pausar"} viaje
//               </Button>
//             </div>
//           </div>

//           {/* LISTA DE DESTINOS - Columna Derecha */}
//           <div className="relative pt-8 pb-32 space-y-20 md:space-y-24">
            
//             {/* Línea vertical de fondo */}
//             <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-zinc-800 via-zinc-700 to-transparent" />
            
//             {/* Línea de progreso */}
//             <motion.div 
//               className="absolute left-6 top-12 w-px bg-gradient-to-b from-indigo-500 via-indigo-400 to-pink-500 origin-top"
//               style={{ 
//                 height: "calc(100% - 3rem)", 
//                 scaleY: smoothProgress 
//               }} 
//             />

//             {destinations.map((destination, index) => {
//               const isActive = index === activeStep
//               const isPast = index < activeStep
//               const isFuture = index > activeStep

//               return (
//                 <motion.div
//                   key={destination.name}
//                   initial={{ opacity: 0, x: 50 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ margin: "-15% 0px" }}
//                   transition={{ duration: 0.5, delay: index * 0.05 }}
//                   className={cn(
//                     "relative pl-16 group",
//                     isActive && "scale-[1.02]"
//                   )}
//                 >
//                   {/* Número del paso */}
//                   <motion.div 
//                     className={cn(
//                       "absolute left-2 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 font-bold text-sm",
//                       isActive 
//                         ? "border-indigo-400 bg-indigo-500 text-white shadow-lg shadow-indigo-500/50 scale-110" 
//                         : isPast
//                           ? "border-indigo-500/70 bg-indigo-950 text-indigo-400"
//                           : "border-zinc-700 bg-zinc-900 text-zinc-600"
//                     )}
//                     whileHover={{ scale: 1.15 }}
//                   >
//                     {isPast ? "✓" : index + 1}
//                   </motion.div>

//                   {/* Tarjeta de destino */}
//                   <motion.div 
//                     className={cn(
//                       "p-6 md:p-8 rounded-2xl border transition-all duration-500 backdrop-blur-sm",
//                       isActive 
//                         ? "bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-indigo-950/30 border-indigo-500/40 shadow-2xl shadow-indigo-500/10" 
//                         : isPast
//                           ? "bg-zinc-900/50 border-zinc-800/70"
//                           : "bg-zinc-900/20 border-zinc-800/30 hover:bg-zinc-900/40 hover:border-zinc-700/50"
//                     )}
//                     whileHover={{ y: isFuture ? 0 : -4 }}
//                   >
//                     {/* Header de la tarjeta */}
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className={cn(
//                             "text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
//                             isActive ? "text-white" : "text-zinc-400"
//                           )}>
//                             {destination.name}
//                           </h3>
//                           {isActive && (
//                             <motion.div
//                               initial={{ opacity: 0, scale: 0, rotate: -180 }}
//                               animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                               className="flex-shrink-0"
//                             >
//                               <div className="bg-gradient-to-br from-indigo-500 to-pink-500 p-2 rounded-xl">
//                                 <MapPin className="w-4 h-4 text-white" fill="white" />
//                               </div>
//                             </motion.div>
//                           )}
//                         </div>
                        
//                         {/* Highlight badge */}
//                         <span className={cn(
//                           "inline-block text-xs font-medium px-3 py-1 rounded-full transition-all duration-300",
//                           isActive 
//                             ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
//                             : "bg-zinc-800/50 text-zinc-500"
//                         )}>
//                           {destination.highlight}
//                         </span>
//                       </div>
//                     </div>
                    
//                     {/* Descripción */}
//                     <p className={cn(
//                       "leading-relaxed transition-colors duration-300 mb-4",
//                       isActive ? "text-zinc-300" : "text-zinc-500"
//                     )}>
//                       {destination.description}
//                     </p>

//                     {/* CTA */}
//                     <motion.div 
//                       className={cn(
//                         "flex items-center gap-2 text-sm font-medium transition-all overflow-hidden",
//                         isActive ? "max-h-12 opacity-100 mt-4" : "max-h-0 opacity-0"
//                       )}
//                     >
//                       <Button 
//                         variant="ghost" 
//                         size="sm"
//                         className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 group/btn"
//                       >
//                         <span>Explorar {destination.name}</span>
//                         <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
//                       </Button>
//                     </motion.div>
//                   </motion.div>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>

//         {/* CTA Final */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mt-20 md:mt-32"
//         >
//           <h3 className="text-2xl md:text-3xl font-bold mb-4">
//             ¿Listo para comenzar tu aventura?
//           </h3>
//           <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
//             Explora nuestros paquetes personalizados o contáctanos para diseñar tu viaje ideal.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500">
//               Ver Paquetes
//             </Button>
//             <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800">
//               Contactar
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

//////////////////////////////////////////////////////////

// "use client"

// import { useRef, useState, useEffect } from "react"
// import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
// import { MapPin, Bus, ArrowRight } from "lucide-react"
// import { cn } from "@/src/lib/utils" // Asumiendo que usas shadcn o una utilidad de clases similar

// // Datos extraídos para mejor mantenimiento
// const destinations = [
//   { 
//     name: "Buenos Aires", 
//     position: 0, 
//     mapCoords: { x: 180, y: 60 },
//     description: "La capital vibrante, donde el tango y la cultura convergen en cada esquina."
//   },
//   { 
//     name: "Córdoba", 
//     position: 0.18, 
//     mapCoords: { x: 155, y: 105 },
//     description: "Puerta a las sierras, herencia jesuita y vida universitaria."
//   },
//   { 
//     name: "Mendoza", 
//     position: 0.36, 
//     mapCoords: { x: 130, y: 150 },
//     description: "Tierra del sol y del buen vino, con el Aconcagua de fondo."
//   },
//   { 
//     name: "Salta", 
//     position: 0.54, 
//     mapCoords: { x: 110, y: 195 },
//     description: "La linda. Arquitectura colonial y paisajes norteños coloridos."
//   },
//   { 
//     name: "Bariloche", 
//     position: 0.75, 
//     mapCoords: { x: 110, y: 240 },
//     description: "Lagos cristalinos, chocolate artesanal y bosques patagónicos."
//   },
//   { 
//     name: "Ushuaia", 
//     position: 1, 
//     mapCoords: { x: 145, y: 340 },
//     description: "El fin del mundo, donde comienza tu próxima gran aventura."
//   },
// ]

// export function BusJourney() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [activeStep, setActiveStep] = useState(0)

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   })

//   // Suavizamos el scroll para que el bus no vibre
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   })

//   // Sincronizar el paso activo con el progreso del scroll
//   useMotionValueEvent(smoothProgress, "change", (latest) => {
//     // Calculamos qué destino está más cerca del progreso actual
//     const currentStep = destinations.findIndex((dest, index) => {
//       const nextDest = destinations[index + 1]
//       if (!nextDest) return true
//       // Ajuste fino para disparar el cambio un poco antes de llegar
//       return latest >= dest.position && latest < nextDest.position
//     })
    
//     if (currentStep !== -1 && currentStep !== activeStep) {
//       setActiveStep(currentStep)
//     }
//   })

//   // Transformaciones para el bus y la línea
//   const busPosition = useTransform(smoothProgress, [0, 1], [0, 100])

//   return (
//     <section 
//       ref={containerRef} 
//       className="relative bg-zinc-950 text-zinc-100 py-20 md:py-32 overflow-hidden"
//     >
//       {/* Fondo decorativo sutil */}
//       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

//       <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-20 md:mb-32 space-y-4"
//         >
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
//             <Bus className="w-4 h-4" /> Viaje por Argentina
//           </div>
//           <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
//             Tu Ruta Comienza Aquí
//           </h2>
//           <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
//             Recorre los destinos más impresionantes en una experiencia visual única.
//             Haz scroll para iniciar el viaje.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          
//           {/* COLUMNA IZQUIERDA: Mapa Sticky */}
//           <div className="relative md:sticky md:top-32 h-[500px] w-full max-w-md mx-auto md:max-w-none">
//             <div className="relative w-full h-full flex items-center justify-center">
              
//               {/* SVG MAP CONTAINER */}
//               <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-2xl filter overflow-visible">
//                 <defs>
//                   <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
//                     <feGaussianBlur stdDeviation="4" result="blur" />
//                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
//                   </filter>
//                   <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#6366f1" /> {/* Indigo-500 */}
//                     <stop offset="100%" stopColor="#ec4899" /> {/* Pink-500 */}
//                   </linearGradient>
//                 </defs>

//                 {/* Silueta Argentina (Fondo) */}
//                 <path
//                   d="M150 20 C180 30, 200 50, 210 80 C220 110, 230 140, 220 170 C210 200, 200 230, 190 260 C180 290, 170 320, 160 350 C155 370, 150 385, 145 390 C140 385, 135 370, 130 350 C120 320, 110 290, 100 260 C90 230, 80 200, 70 170 C60 140, 70 110, 80 80 C90 50, 110 30, 150 20Z"
//                   className="fill-zinc-900/50 stroke-zinc-800"
//                   strokeWidth="1"
//                 />

//                 {/* Ruta Base (Línea punteada) */}
//                 <path
//                   d="M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
//                   className="stroke-zinc-800/80"
//                   strokeWidth="4"
//                   strokeDasharray="4 6"
//                   fill="none"
//                 />

//                 {/* Ruta Activa (Línea coloreada que se dibuja) */}
//                 <motion.path
//                   d="M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340"
//                   stroke="url(#pathGradient)"
//                   strokeWidth="4"
//                   fill="none"
//                   strokeLinecap="round"
//                   style={{ pathLength: smoothProgress }}
//                 />

//                 {/* Puntos de las ciudades en el mapa */}
//                 {destinations.map((city, index) => {
//                    const isActive = index <= activeStep;
//                    return (
//                     <motion.g key={city.name}>
//                       <motion.circle
//                         cx={city.mapCoords.x}
//                         cy={city.mapCoords.y}
//                         r={isActive ? 6 : 3}
//                         className={cn(
//                           "transition-colors duration-500",
//                           isActive ? "fill-white stroke-indigo-500" : "fill-zinc-800 stroke-zinc-700"
//                         )}
//                         strokeWidth={isActive ? 3 : 1}
//                         animate={{ scale: isActive ? 1.2 : 1 }}
//                       />
//                       {/* Efecto Pulse para la ciudad actual */}
//                       {index === activeStep && (
//                         <motion.circle
//                           cx={city.mapCoords.x}
//                           cy={city.mapCoords.y}
//                           r="12"
//                           className="stroke-indigo-500/50 fill-none"
//                           initial={{ opacity: 1, scale: 0.5 }}
//                           animate={{ opacity: 0, scale: 1.5 }}
//                           transition={{ duration: 1.5, repeat: Infinity }}
//                         />
//                       )}
//                     </motion.g>
//                   )
//                 })}

//                 {/* EL BUS */}
//                 <motion.foreignObject
//                    width="40" height="40"
//                    x="-20" y="-20" // Centrar
//                    style={{
//                      offsetPath: `path("M180 60 C170 90, 140 120, 130 150 C120 180, 100 210, 110 240 C120 270, 140 300, 145 340")`,
//                      offsetDistance: useTransform(busPosition, (v) => `${v}%`),
//                    }}
//                 >
//                   <div className="w-10 h-10 flex items-center justify-center">
//                     <div className="relative">
//                        <div className="absolute inset-0 bg-indigo-500 blur-md rounded-full opacity-50"></div>
//                        <div className="relative bg-white text-indigo-600 p-2 rounded-xl shadow-lg transform -rotate-12 z-10">
//                          <Bus size={18} fill="currentColor" />
//                        </div>
//                     </div>
//                   </div>
//                 </motion.foreignObject>
//               </svg>
//             </div>
//           </div>

//           {/* COLUMNA DERECHA: Lista de tarjetas */}
//           <div className="relative pt-10 pb-40 space-y-24">
//             {/* Línea conectora vertical de fondo */}
//             <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-zinc-800" />
            
//             {/* Línea de progreso vertical */}
//             <motion.div 
//               className="absolute left-6 top-14 w-0.5 bg-gradient-to-b from-indigo-500 to-pink-500 origin-top"
//               style={{ height: "100%", scaleY: smoothProgress }} 
//             />

//             {destinations.map((destination, index) => {
//               const isActive = index === activeStep;
//               const isPast = index < activeStep;

//               return (
//                 <motion.div
//                   key={destination.name}
//                   initial={{ opacity: 0, x: 50 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ margin: "-20% 0px -20% 0px" }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className={cn(
//                     "relative pl-16 group transition-all duration-500",
//                     isActive ? "scale-105" : "scale-100 opacity-60"
//                   )}
//                 >
//                   {/* Icono lateral */}
//                   <div className={cn(
//                     "absolute left-2 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300 bg-zinc-950",
//                     isActive ? "border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]" : 
//                     isPast ? "border-indigo-500/50 text-indigo-500/50" : "border-zinc-700 text-zinc-700"
//                   )}>
//                     <span className="text-xs font-bold">{index + 1}</span>
//                   </div>

//                   {/* Tarjeta de Contenido */}
//                   <div className={cn(
//                     "p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm",
//                     isActive 
//                       ? "bg-zinc-900/80 border-indigo-500/30 shadow-2xl shadow-indigo-500/10" 
//                       : "bg-zinc-900/20 border-white/5 hover:bg-zinc-900/40"
//                   )}>
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className={cn(
//                         "text-2xl font-bold tracking-tight",
//                         isActive ? "text-white" : "text-zinc-400"
//                       )}>
//                         {destination.name}
//                       </h3>
//                       {isActive && (
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           className="bg-indigo-500/20 p-1.5 rounded-full"
//                         >
//                           <MapPin className="w-4 h-4 text-indigo-400" />
//                         </motion.div>
//                       )}
//                     </div>
                    
//                     <p className="text-zinc-400 leading-relaxed">
//                       {destination.description}
//                     </p>

//                     <div className={cn(
//                       "mt-4 flex items-center text-sm font-medium transition-all overflow-hidden",
//                       isActive ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
//                     )}>
//                       <span className="text-indigo-400 flex items-center gap-2">
//                         Explorar destino <ArrowRight className="w-4 h-4" />
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


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
