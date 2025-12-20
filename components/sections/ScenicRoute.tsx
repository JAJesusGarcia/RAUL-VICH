import { Mountain, Camera, Route } from "lucide-react"

export function ScenicRoute() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="flex gap-4">
        <Mountain className="h-6 w-6 text-primary" />
        <div>
          <h4 className="font-semibold">Scenic Landscapes</h4>
          <p className="text-sm text-muted-foreground">
            Mountains, deserts, lakes and glaciers right outside your window.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Route className="h-6 w-6 text-primary" />
        <div>
          <h4 className="font-semibold">Authentic Routes</h4>
          <p className="text-sm text-muted-foreground">
            Experience Argentina the way locals do.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Camera className="h-6 w-6 text-primary" />
        <div>
          <h4 className="font-semibold">Photo Moments</h4>
          <p className="text-sm text-muted-foreground">
            Unique stops for unforgettable photos.
          </p>
        </div>
      </div>
    </div>
  )
}
