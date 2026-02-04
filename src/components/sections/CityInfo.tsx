"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Clock, Thermometer, MapPin } from "lucide-react"

type CityInfoProps = {
  city: string
  timezone: string
  lat: number
  lon: number
}

export function CityInfo({ city, timezone, lat, lon }: CityInfoProps) {
  const [time, setTime] = useState("--:--")
  const [temp, setTemp] = useState<number | null>(null)

  useEffect(() => {
    const updateTime = () => {
      setTime(new Intl.DateTimeFormat("en-US", {
        timeZone: timezone, hour: "2-digit", minute: "2-digit", hour12: false 
      }).format(new Date()))
    }
    updateTime();
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [timezone])

  return (
    <Card className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Coordinates</p>
            <p className="text-[10px] font-mono">{lat.toFixed(2)}, {lon.toFixed(2)}</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
          {city}
        </h3>

        <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{temp ?? "--"}°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

///////////////////////////

// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/src/components/ui/card"

// type CityInfoProps = {
//   city: string
//   timezone: string
//   lat: number
//   lon: number
// }

// export function CityInfo({ city, timezone, lat, lon }: CityInfoProps) {
//   const [time, setTime] = useState("")
//   const [temp, setTemp] = useState<number | null>(null)

//   // Clock
//  useEffect(() => {
//   const updateTime = () => {
//     try {
//       const formatter = new Intl.DateTimeFormat("en-US", {
//         timeZone: timezone,
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//       setTime(formatter.format(new Date()))
//     } catch {
//       // fallback seguro
//       setTime(
//         new Intl.DateTimeFormat("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }).format(new Date())
//       )
//     }
//   }

//   updateTime()
//   const interval = setInterval(updateTime, 60000)
//   return () => clearInterval(interval)
// }, [timezone])


//   // Weather (mock for now)
//   useEffect(() => {
//     // API READY – después conectamos OpenWeather
//     setTemp(Math.floor(Math.random() * 15) + 10)
//   }, [lat, lon])

//   return (
//     <Card className="w-full">
//       <CardContent className="p-6">
//         <h3 className="text-xl font-bold">{city}</h3>
//         <p className="mt-2 text-muted-foreground">
//           Local time: <span className="font-medium">{time}</span>
//         </p>
//         <p className="mt-1 text-muted-foreground">
//           Temperature:{" "}
//           <span className="font-medium">
//             {temp !== null ? `${temp}°C` : "--"}
//           </span>
//         </p>
//       </CardContent>
//     </Card>
//   )
// }

// //"feat: city clock and weather info components"