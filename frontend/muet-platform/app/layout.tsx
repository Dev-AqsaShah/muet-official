import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "MUET Training Programs",
  description: "Mehran University of Engineering & Technology — Government-funded training programs and projects for Sindh.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable)}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
