import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LoadingScreenProvider } from '@/components/loading-screen'
import './globals.css'

const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Jason Calalo | Portfolio',
  description: 'Personal portfolio of Jason Calalo — crafting digital experiences that blend thoughtful design with robust engineering.',
  keywords: ['developer', 'portfolio', 'next.js', 'react', 'typescript', 'full-stack', 'AI', 'ML'],
  authors: [{ name: 'Jason Calalo' }],
  openGraph: {
    title: 'Jason Calalo | Portfolio',
    description: 'Crafting digital experiences that blend thoughtful design with robust engineering.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jason Calalo | Portfolio',
    description: 'Crafting digital experiences that blend thoughtful design with robust engineering.',
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
    <html lang="en" className="bg-background scroll-smooth snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-hide">
      <body className={`${geistMono.className} antialiased bg-background text-foreground`}>
        <LoadingScreenProvider>
          {children}
        </LoadingScreenProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
