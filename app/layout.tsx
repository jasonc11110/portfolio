import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jason Calalo — Full-Stack Developer & AI Engineer',
  description:
    'Portfolio of Jason Calalo, a full-stack developer and AI engineer building geospatial tools, diagnostic systems, and the infrastructure behind them.',
  keywords: ['developer', 'portfolio', 'next.js', 'react', 'typescript', 'full-stack', 'AI', 'ML'],
  authors: [{ name: 'Jason Calalo' }],
  openGraph: {
    title: 'Jason Calalo — Full-Stack Developer & AI Engineer',
    description:
      'Geospatial tools, diagnostic systems, and the infrastructure behind them.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jason Calalo — Full-Stack Developer & AI Engineer',
    description:
      'Geospatial tools, diagnostic systems, and the infrastructure behind them.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
