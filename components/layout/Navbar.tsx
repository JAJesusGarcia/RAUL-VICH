"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-bold text-lg">
          INSTITUTO RAUL VICH
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/destinations/north">North</Link>
          <Link href="/destinations/south">South</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/contact">
            <Button size="sm">Contact</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
