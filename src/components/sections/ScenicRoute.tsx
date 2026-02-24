import { Mountain, Camera, Route } from "lucide-react"

const routes = [
  {
    icon: Mountain,
    title: "Scenic Landscapes",
    desc: "Mountains, deserts, lakes and glaciers right outside your window."
  },
  {
    icon: Route,
    title: "Authentic Routes",
    desc: "Experience Argentina the way locals do with curated paths."
  },
  {
    icon: Camera,
    title: "Photo Moments",
    desc: "Unique stops designed for capturing unforgettable memories."
  }
]

export function ScenicRoute() {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto space-y-8 py-2">
      {routes.map((item, index) => (
        <div key={index} className="flex items-start gap-6 group">
          <div className="flex-shrink-0 mt-1">
            <item.icon className="h-5 w-5 text-primary/70 transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-medium text-base tracking-tight">{item.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
            {index !== routes.length - 1 && (
              <div className="h-px w-full bg-border/40 mt-6" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}



////////////////////////////////////////////////



// import { Mountain, Camera, Route } from "lucide-react"

// export function ScenicRoute() {
//   return (
//     <div className="grid gap-6 md:grid-cols-3">
//       <div className="flex gap-4">
//         <Mountain className="h-6 w-6 text-primary" />
//         <div>
//           <h4 className="font-semibold">Scenic Landscapes</h4>
//           <p className="text-sm text-muted-foreground">
//             Mountains, deserts, lakes and glaciers right outside your window.
//           </p>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <Route className="h-6 w-6 text-primary" />
//         <div>
//           <h4 className="font-semibold">Authentic Routes</h4>
//           <p className="text-sm text-muted-foreground">
//             Experience Argentina the way locals do.
//           </p>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <Camera className="h-6 w-6 text-primary" />
//         <div>
//           <h4 className="font-semibold">Photo Moments</h4>
//           <p className="text-sm text-muted-foreground">
//             Unique stops for unforgettable photos.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
