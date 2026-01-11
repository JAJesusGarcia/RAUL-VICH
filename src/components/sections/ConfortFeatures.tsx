import { Card, CardContent } from "@/src/components/ui/card"
import {
  Wifi,
  Armchair,
  Music,
  Coffee,
  AirVent,
  Bath
} from "lucide-react"

const features = [
  { icon: Armchair, title: "Premium Seats", desc: "Wide reclining seats with extra legroom" },
  { icon: Wifi, title: "Wi-Fi On Board", desc: "Stay connected throughout the journey" },
  { icon: AirVent, title: "Air Conditioning", desc: "Climate-controlled comfort" },
  { icon: Music, title: "Ambient Music", desc: "Relax with curated playlists" },
  { icon: Coffee, title: "Snacks & Drinks", desc: "Enjoy refreshments on the road" },
  { icon: Bath, title: "On-board Bathroom", desc: "Comfort even on long distances" },
]

export function ComfortFeatures() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((f) => (
        <Card key={f.title} className="hover:shadow-lg transition">
          <CardContent className="p-6 text-center">
            <f.icon className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h4 className="font-semibold text-lg">{f.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


