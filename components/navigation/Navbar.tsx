"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-background/90 backdrop-blur border-b"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          Instituto Raul Vich
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/destinations/north">North</Link>
          <Link href="/destinations/south">South</Link>
          <Link href="#packages">Packages</Link>

          <Button size="sm">Contact</Button>
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-background border-t">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link href="/destinations/north" onClick={() => setOpen(false)}>
              North
            </Link>
            <Link href="/destinations/south" onClick={() => setOpen(false)}>
              South
            </Link>
            <Link href="#packages" onClick={() => setOpen(false)}>
              Packages
            </Link>

            <Button className="mt-4">Contact</Button>
          </div>
        </div>
      )}
    </header>
  )
}
