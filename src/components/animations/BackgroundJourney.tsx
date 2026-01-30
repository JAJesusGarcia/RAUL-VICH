"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Bus } from "lucide-react"
import { usePathname } from "next/navigation"

export function BackgroundJourney() {
  const pathname = usePathname()
  const { scrollYProgress } = useScroll()
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const busPosition = useTransform(smoothProgress, [0, 1], [0, 100])
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])
  
  // Opacidad adaptativa según la página
  const isHome = pathname === "/"
  const baseOpacity = isHome ? 0.15 : 0.08 // Más sutil en páginas internas

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ opacity: baseOpacity }}
    >
      {/* Gradiente de profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80" />
      
      <div className="absolute right-0 top-0 h-full w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
        <svg 
          viewBox="0 0 400 1000" 
          preserveAspectRatio="xMidYMid slice" 
          className="h-full w-full opacity-60 md:opacity-100 transition-opacity duration-700"
        >
          <defs>
            {/* Gradiente más sutil y moderno */}
            <linearGradient id="bg-route-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>

            {/* Glow suave */}
            <filter id="bg-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Patrón de textura sutil */}
            <pattern id="noise" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="hsl(var(--muted))" opacity="0.02"/>
            </pattern>
          </defs>

          {/* Silueta de Argentina (Super sutil) */}
          <motion.path
            d="M200 80 
               C240 120, 270 200, 260 320 
               C250 440, 270 560, 240 680 
               C210 800, 190 900, 230 980"
            fill="none"
            stroke="currentColor"
            strokeWidth="120"
            strokeLinecap="round"
            className="text-muted/5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />

          {/* Ruta base (línea punteada) */}
          <path
            d="M200 80 
               C240 120, 270 200, 260 320 
               C250 440, 270 560, 240 680 
               C210 800, 190 900, 230 980"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 15"
            className="text-muted-foreground/10"
          />

          {/* Ruta progresiva (se dibuja con scroll) */}
          <motion.path
            d="M200 80 
               C240 120, 270 200, 260 320 
               C250 440, 270 560, 240 680 
               C210 800, 190 900, 230 980"
            fill="none"
            stroke="url(#bg-route-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#bg-glow)"
            style={{ pathLength }}
          />

          {/* Puntos de ciudades (más discretos) */}
          {[
            { y: 80, size: 2.5 },   // Buenos Aires
            { y: 200, size: 2 },    // Córdoba
            { y: 320, size: 2 },    // Mendoza
            { y: 560, size: 2 },    // Salta
            { y: 800, size: 2.5 },  // Bariloche
            { y: 980, size: 2 }     // Ushuaia
          ].map((city, i) => (
            <motion.circle 
              key={i} 
              cx={200 + (i % 2 === 0 ? -10 : 10)} 
              cy={city.y} 
              r={city.size}
              className="fill-muted-foreground/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            />
          ))}

          {/* EL BUS animado */}
          <motion.g
            style={{
              offsetPath: `path("M200 80 C240 120, 270 200, 260 320 C250 440, 270 560, 240 680 C210 800, 190 900, 230 980")`,
              offsetDistance: useTransform(busPosition, v => `${v}%`),
            }}
          >
            {/* Pulso del bus */}
            <motion.circle 
              r="16" 
              className="fill-primary/5 stroke-primary/10"
              strokeWidth="2"
              animate={{ 
                r: [16, 28, 16], 
                opacity: [0.4, 0, 0.4] 
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Contenedor del bus */}
            <g transform="translate(-10, -10)">
              <motion.circle 
                r="10" 
                cx="10" 
                cy="10" 
                className="fill-background/90 stroke-primary/40 backdrop-blur-sm" 
                strokeWidth="2"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Bus 
                className="w-4 h-4 text-primary" 
                style={{ transform: "translate(3px, 3px)" }}
              />
            </g>
          </motion.g>
        </svg>
      </div>
      
      {/* Máscara radial adaptativa */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent w-full md:w-3/4 lg:w-2/3" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
    </div>
  )
}

// "use client"

// import { motion, useScroll, useTransform, useSpring } from "framer-motion"
// import { Bus } from "lucide-react"

// export function BackgroundJourney() {
//   // Detectamos el scroll de toda la ventana
//   const { scrollYProgress } = useScroll()
  
//   // Suavizamos el movimiento para que el bus no vibre al scrollear rápido
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   })

//   // Mapeamos el progreso del scroll (0 a 1) al porcentaje del path SVG (0 a 100)
//   const busPosition = useTransform(smoothProgress, [0, 1], [0, 100])
//   const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])
  
//   // Hacemos que el mapa sea más visible cuando scrolleas
//   const mapOpacity = useTransform(smoothProgress, [0, 0.1], [0.3, 0.6])

//   return (
//     <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-background">
//       {/* Gradiente sutil para dar profundidad al fondo general */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      
//       <div className="absolute right-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 opacity-20 md:opacity-100 transition-opacity duration-1000">
//         <svg 
//           viewBox="0 0 400 900" 
//           preserveAspectRatio="xMidYMid slice" 
//           className="h-full w-full"
//         >
//           <defs>
//             <linearGradient id="route-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
//               <stop offset="50%" stopColor="var(--primary)" />
//               <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
//             </linearGradient>
//             {/* Efecto de brillo para la ruta */}
//             <filter id="glow">
//               <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
//               <feMerge>
//                 <feMergeNode in="coloredBlur"/>
//                 <feMergeNode in="SourceGraphic"/>
//               </feMerge>
//             </filter>
//           </defs>

//           {/* 1. Silueta de Argentina (Muy sutil) */}
//           <motion.path
//             d="M200 50 C240 80, 260 150, 250 250 C240 350, 260 450, 230 550 C200 650, 180 750, 220 850"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="150"
//             strokeLinecap="round"
//             className="text-muted/5"
//             initial={{ pathLength: 0 }}
//             animate={{ pathLength: 1 }}
//             transition={{ duration: 2, ease: "easeInOut" }}
//           />

//           {/* 2. La Ruta (Línea base) */}
//           <path
//             id="journey-path"
//             d="M200 50 C240 80, 260 150, 250 250 C240 350, 260 450, 230 550 C200 650, 180 750, 220 850"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeDasharray="8 8"
//             className="text-muted-foreground/20"
//           />

//           {/* 3. La Ruta recorrida (Se llena con el scroll) */}
//           <motion.path
//             d="M200 50 C240 80, 260 150, 250 250 C240 350, 260 450, 230 550 C200 650, 180 750, 220 850"
//             fill="none"
//             stroke="url(#route-gradient)"
//             strokeWidth="4"
//             strokeLinecap="round"
//             filter="url(#glow)"
//             style={{ pathLength }}
//           />

//           {/* 4. Ciudades (Puntos estáticos) */}
//           {[
//             { y: 50, label: "BA" },
//             { y: 250, label: "CBA" },
//             { y: 450, label: "MDZ" },
//             { y: 650, label: "BRC" },
//             { y: 850, label: "USH" }
//           ].map((city, i) => (
//              <circle key={i} cx={200} cy={city.y} r="3" className="fill-muted-foreground/30" />
//           ))}

//           {/* 5. EL BUS */}
//           <motion.g
//             style={{
//               offsetPath: `path("M200 50 C240 80, 260 150, 250 250 C240 350, 260 450, 230 550 C200 650, 180 750, 220 850")`,
//               offsetDistance: useTransform(busPosition, v => `${v}%`),
//             }}
//           >
//             {/* Círculo pulsante alrededor del bus */}
//             <motion.circle 
//               r="20" 
//               className="fill-primary/10"
//               animate={{ r: [20, 35, 20], opacity: [0.5, 0, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//             {/* Icono del bus */}
//             <g transform="translate(-12, -12)"> {/* Centrar el icono */}
//               <circle r="12" cx="12" cy="12" className="fill-background stroke-primary stroke-2" />
//               <Bus className="w-5 h-5 text-primary translate-x-[2px] translate-y-[2px]" />
//             </g>
//           </motion.g>
//         </svg>
//       </div>
      
//       {/* Máscara radial para que el mapa se desvanezca hacia el contenido principal */}
//       <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-2/3" />
//     </div>
//   )
// }