"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/src/components/ui/button"

type Props = {
  src: string
}

export function AmbientMusic({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.volume = 0.15

    if (enabled) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [enabled])

  return (
    <>
      <audio ref={audioRef} src={src} loop />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setEnabled(!enabled)}
        className="fixed bottom-6 right-6 z-50 backdrop-blur bg-background/70"
        aria-label="Toggle ambient music"
      >
        {enabled ? <Volume2 /> : <VolumeX />}
      </Button>
    </>
  )
}
