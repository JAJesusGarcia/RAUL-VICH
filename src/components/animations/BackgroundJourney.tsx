"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Bus } from "lucide-react"

export function BackgroundJourney() {
  // Detectamos el scroll de toda la ventana
  const { scrollYProgress } = useScroll()
  
  // Suavizamos el movimiento para que el bus no vibre al scrollear rápido
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Mapeamos el progreso del scroll (0 a 1) al porcentaje del path SVG (0 a 100)
  const busPosition = useTransform(smoothProgress, [0, 1], [0, 100])
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])
  
  // Hacemos que el mapa sea más visible cuando scrolleas
  const mapOpacity = useTransform(smoothProgress, [0, 0.1], [0.3, 0.6])

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-background">
      {/* Gradiente sutil para dar profundidad al fondo general */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      
      <div className="absolute right-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 opacity-20 md:opacity-100 transition-opacity duration-1000">
        <svg 
          viewBox="0 0 400 900" 
          preserveAspectRatio="xMidYMid slice" 
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            {/* Efecto de brillo para la ruta */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 1. Silueta de Argentina (Muy sutil) */}
          <motion.path
            d="M200 50 C240 80, 260 150, 250 250 C240 350, 260 450, 230 550 C200 650, 180 750, 220 850"
            fill="none"
            stroke="currentColor"
            strokeWidth="150"
            strokeLinecap="round"
            className="text-muted/5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* 2. La Ruta (Línea base) */}
          <path
            id="journey-path"
            d="M200 50 C240 80, 260 150, 250 250 C240 350, 260 450, 230 550 C200 650, 180 750, 220 850"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="text-muted-foreground/20"
          />

          {/* 3. La Ruta recorrida (Se llena con el scroll) */}
          <motion.path
            d="M200 50 C240 80, 260 150, 250 250 C240 350, 260 450, 230 550 C200 650, 180 750, 220 850"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ pathLength }}
          />

          {/* 4. Ciudades (Puntos estáticos) */}
          {[
            { y: 50, label: "BA" },
            { y: 250, label: "CBA" },
            { y: 450, label: "MDZ" },
            { y: 650, label: "BRC" },
            { y: 850, label: "USH" }
          ].map((city, i) => (
             <circle key={i} cx={200} cy={city.y} r="3" className="fill-muted-foreground/30" />
          ))}

          {/* 5. EL BUS */}
          <motion.g
            style={{
              offsetPath: `path("M200 50 C240 80, 260 150, 250 250 C240 350, 260 450, 230 550 C200 650, 180 750, 220 850")`,
              offsetDistance: useTransform(busPosition, v => `${v}%`),
            }}
          >
            {/* Círculo pulsante alrededor del bus */}
            <motion.circle 
              r="20" 
              className="fill-primary/10"
              animate={{ r: [20, 35, 20], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Icono del bus */}
            <g transform="translate(-12, -12)"> {/* Centrar el icono */}
              <circle r="12" cx="12" cy="12" className="fill-background stroke-primary stroke-2" />
              <Bus className="w-5 h-5 text-primary translate-x-[2px] translate-y-[2px]" />
            </g>
          </motion.g>
        </svg>
      </div>
      
      {/* Máscara radial para que el mapa se desvanezca hacia el contenido principal */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-2/3" />
    </div>
  )
}