import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, Noto_Nastaliq_Urdu } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
})

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  variable: '--font-urdu',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: { default: 'MUET LMS Portal', template: '%s | MUET LMS' },
  description: 'MUET Student Learning Management Portal — PITP, BBSHRRDB & NFTP Programmes',
  keywords: ['MUET', 'LMS', 'PITP', 'BBSHRRDB', 'NFTP', 'Sindh', 'Training'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${notoNastaliq.variable}`}>
      <body style={{ fontFamily: 'var(--font-sans), sans-serif', background: '#020B18', color: '#E8F4FF' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
