"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Cerrar menú mobile al presionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) {
      document.addEventListener("keydown", handleEscape)
      // Prevenir scroll cuando el menú está abierto
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [open])

  const navLinks = [
    { href: "/destinations/north", label: "North" },
    { href: "/destinations/south", label: "South" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "#packages", label: "Packages" },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link 
          href="/" 
          className="text-xl font-bold hover:opacity-80 transition-opacity"
        >
          ARGENTINE ROUTE
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-background border-t animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Button className="mt-4 w-full" asChild>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

// "use client"

// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { Menu, X } from "lucide-react"
// import { Button } from "@/src/components/ui/button"

// export function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 50)
//     window.addEventListener("scroll", onScroll)
//     return () => window.removeEventListener("scroll", onScroll)
//   }, [])

//   return (
//     <header
//       className={`fixed top-0 z-50 w-full transition-all ${
//         scrolled
//           ? "bg-background/90 backdrop-blur border-b"
//           : "bg-transparent"
//       }`}
//     >
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         {/* LOGO */}
//         <Link href="/" className="text-xl font-bold">
//           ARGENTINE ROUTE
//         </Link>

//         {/* DESKTOP */}
//         <div className="hidden md:flex items-center gap-8">
//           <Link href="/destinations/north">North</Link>
//           <Link href="/destinations/south">South</Link>
//           <Link href="#packages">Packages</Link>

//           <Button size="sm">Contact</Button>
//         </div>

//         {/* MOBILE */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden"
//           aria-label="Toggle menu"
//         >
//           {open ? <X /> : <Menu />}
//         </button>
//       </nav>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden bg-background border-t">
//           <div className="flex flex-col gap-4 px-6 py-6">
//             <Link href="/destinations/north" onClick={() => setOpen(false)}>
//               North
//             </Link>
//             <Link href="/destinations/south" onClick={() => setOpen(false)}>
//               South
//             </Link>
//             <Link href="#packages" onClick={() => setOpen(false)}>
//               Packages
//             </Link>

//             <Button className="mt-4">Contact</Button>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }
