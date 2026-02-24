import {
  Wifi,
  Armchair,
  Music,
  Coffee,
  AirVent,
  Bath
} from "lucide-react"

const features = [
  { icon: Armchair, title: "Premium Seats", desc: "Wide reclining seats" },
  { icon: Wifi, title: "Wi-Fi On Board", desc: "Stay connected" },
  { icon: AirVent, title: "Air Conditioning", desc: "Climate-controlled" },
  { icon: Music, title: "Ambient Music", desc: "Curated playlists" },
  { icon: Coffee, title: "Snacks & Drinks", desc: "Refreshments" },
  { icon: Bath, title: "Bathroom", desc: "Long distances" },
]

export function ComfortFeatures() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-4">
      {features.map((f) => (
        <div key={f.title} className="flex flex-col items-center text-center group">
          <div className="mb-4 p-3 rounded-full bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <f.icon className="h-6 w-6" />
          </div>
          <h4 className="font-medium text-sm tracking-tight">{f.title}</h4>
          <p className="mt-1 text-xs text-muted-foreground leading-tight max-w-[120px]">
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  )
}



///////////////////////////////////////////


// import { Card, CardContent } from "@/src/components/ui/card"
// import {
//   Wifi,
//   Armchair,
//   Music,
//   Coffee,
//   AirVent,
//   Bath
// } from "lucide-react"

// const features = [
//   { icon: Armchair, title: "Premium Seats", desc: "Wide reclining seats with extra legroom" },
//   { icon: Wifi, title: "Wi-Fi On Board", desc: "Stay connected throughout the journey" },
//   { icon: AirVent, title: "Air Conditioning", desc: "Climate-controlled comfort" },
//   { icon: Music, title: "Ambient Music", desc: "Relax with curated playlists" },
//   { icon: Coffee, title: "Snacks & Drinks", desc: "Enjoy refreshments on the road" },
//   { icon: Bath, title: "On-board Bathroom", desc: "Comfort even on long distances" },
// ]

// export function ComfortFeatures() {
//   return (
//     <div className="grid gap-6 md:grid-cols-3">
//       {features.map((f) => (
//         <Card key={f.title} className="hover:shadow-lg transition">
//           <CardContent className="p-6 text-center">
//             <f.icon className="mx-auto mb-4 h-8 w-8 text-primary" />
//             <h4 className="font-semibold text-lg">{f.title}</h4>
//             <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }


