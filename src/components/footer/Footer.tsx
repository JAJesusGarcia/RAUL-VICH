import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        {/* BRAND */}
        <div>
          <h4 className="text-xl font-bold">ARGENTINE ROUTE</h4>
          <p className="mt-4 text-sm text-muted-foreground">
            Travel through Argentina with curated routes, local culture and
            unforgettable experiences.
          </p>
        </div>

        {/* DESTINATIONS */}
        <div>
          <h5 className="font-semibold mb-4">Destinations</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="/destinations/north">North</Link></li>
            <li><Link href="/destinations/south">South</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h5 className="font-semibold mb-4">Company</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Packages</Link></li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h5 className="font-semibold mb-4">Start your journey</h5>
          <p className="text-sm text-muted-foreground">
            Book your experience and explore Argentina like never before.
          </p>

          <Link
            href="https://wa.me/549XXXXXXXXXX"
            className="inline-block mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Contact via WhatsApp
          </Link>
        </div>
      </div>

      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Argentine Route. All rights reserved.
      </div>
    </footer>
  )
}
