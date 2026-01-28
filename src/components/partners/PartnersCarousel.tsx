"use client"

const partners = [
  { name: "Hotel Salta", url: "https://example.com" },
  { name: "Patagonia Lodge", url: "https://example.com" },
  { name: "Jujuy Suites", url: "https://example.com" },
  { name: "Bariloche Resort", url: "https://example.com" },
  { name: "Ushuaia Inn", url: "https://example.com" },
  { name: "Córdoba Plaza", url: "https://example.com" },
  { name: "Mendoza Wine Hotel", url: "https://example.com" },
]

export function PartnersCarousel() {
  return (
    <section className="overflow-hidden border-t bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="mb-10 text-center text-sm uppercase tracking-widest text-muted-foreground">
          Trusted accommodation partners
        </h3>
      </div>

      <div className="relative">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {[...partners, ...partners].map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-xl font-semibold text-muted-foreground opacity-70 transition hover:opacity-100 hover:text-foreground hover:underline underline-offset-4"

            >
              {partner.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}


// "use client"

// const partners = [
//   "Hotel Salta",
//   "Patagonia Lodge",
//   "Jujuy Suites",
//   "Bariloche Resort",
//   "Ushuaia Inn",
//   "Córdoba Plaza",
//   "Mendoza Wine Hotel",
// ]

// export function PartnersCarousel() {
//   return (
//     <section className="overflow-hidden border-t bg-muted/30 py-16">
//       <div className="mx-auto max-w-7xl px-6">
//         <h3 className="mb-10 text-center text-sm uppercase tracking-widest text-muted-foreground">
//           Trusted accommodation partners
//         </h3>
//       </div>

//       {/* TRACK */}
//       <div className="relative">
//         <div className="flex w-max animate-marquee gap-12 px-6">
//           {[...partners, ...partners].map((name, i) => (
//             <div
//               key={i}
//               className="whitespace-nowrap text-xl font-semibold text-muted-foreground opacity-70 hover:opacity-100 transition"
//             >
//               {name}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


// "use client"

// import Image from "next/image"

// const partners = [
//   { name: "Hotel Salta", logo: "/partners/salta.png" },
//   { name: "Patagonia Lodge", logo: "/partners/patagonia.png" },
//   { name: "Jujuy Suites", logo: "/partners/jujuy.png" },
//   { name: "Bariloche Resort", logo: "/partners/bariloche.png" },
// ]

// export function PartnersCarousel() {
//   return (
//     <section className="border-t py-16 bg-muted/30">
//       <div className="mx-auto max-w-7xl px-6">
//         <h3 className="mb-8 text-center text-sm uppercase tracking-widest text-muted-foreground">
//           Trusted by hotels across Argentina
//         </h3>

//         <div className="flex flex-wrap items-center justify-center gap-10">
//           {partners.map((partner) => (
//             <div key={partner.name} className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition">
//               <Image
//                 src={partner.logo}
//                 alt={partner.name}
//                 width={140}
//                 height={60}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
