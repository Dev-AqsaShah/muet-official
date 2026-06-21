import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Providers from "@/components/Providers"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: 'BBSHRRDB × MUET — Skills Development Programme',
    template: '%s | BBSHRRDB × MUET — Skills Development Programme',
  },
  description: "Mehran University of Engineering & Technology — Certified digital skills training programmes across 12 Sindh districts.",
  metadataBase: new URL('https://training.muet.edu.pk'),
  openGraph: {
    siteName: 'BBSHRRDB × MUET — Skills Development Programme',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, spaceGrotesk.variable)}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
