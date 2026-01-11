"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"

type CityInfoProps = {
  city: string
  timezone: string
  lat: number
  lon: number
}

export function CityInfo({ city, timezone, lat, lon }: CityInfoProps) {
  const [time, setTime] = useState("")
  const [temp, setTemp] = useState<number | null>(null)

  // Clock
 useEffect(() => {
  const updateTime = () => {
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
      })
      setTime(formatter.format(new Date()))
    } catch {
      // fallback seguro
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date())
      )
    }
  }

  updateTime()
  const interval = setInterval(updateTime, 60000)
  return () => clearInterval(interval)
}, [timezone])


  // Weather (mock for now)
  useEffect(() => {
    // API READY – después conectamos OpenWeather
    setTemp(Math.floor(Math.random() * 15) + 10)
  }, [lat, lon])

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{city}</h3>
        <p className="mt-2 text-muted-foreground">
          Local time: <span className="font-medium">{time}</span>
        </p>
        <p className="mt-1 text-muted-foreground">
          Temperature:{" "}
          <span className="font-medium">
            {temp !== null ? `${temp}°C` : "--"}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

//"feat: city clock and weather info components"