import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Syne } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Providers from "@/components/Providers"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: 'MUET Training Programs',
    template: '%s | MUET Training Programs',
  },
  description: "Mehran University of Engineering & Technology — Certified digital skills training programmes across 12 Sindh districts.",
  metadataBase: new URL('https://training.muet.edu.pk'),
  openGraph: {
    siteName: 'MUET Training Programs',
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
    <html lang="en" className={cn(jakarta.variable, syne.variable)}>
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
