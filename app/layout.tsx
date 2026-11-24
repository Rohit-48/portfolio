import type { Metadata, Viewport } from 'next'
import {
  Bricolage_Grotesque,
  Silkscreen,
  Space_Grotesk,
  Space_Mono,
} from 'next/font/google'
import './globals.css'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/anim/ScrollProgress'
import { Cursor } from './components/anim/Cursor'
import { Analytics } from '@vercel/analytics/next'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['400', '600', '800'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const silkscreen = Silkscreen({
  variable: '--font-silkscreen',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: {
    default: 'Rohit | Web Engineer & Developer',
    template: '%s | Rohit',
  },
  description:
    'Web Engineer crafting pixel-perfect, retro-futuristic digital experiences. Specializing in React, Next.js, TypeScript, and modern web technologies.',
  keywords: [
    'Web Developer',
    'Frontend Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Rohit',
  ],
  authors: [{ name: 'Rohit' }],
  creator: 'Rohit',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rohitvince.in',
    title: 'Rohit | Web Engineer & Developer',
    description:
      'Web Engineer crafting pixel-perfect, retro-futuristic digital experiences.',
    siteName: "Rohit's Portfolio",
    images: [
      {
        url: 'https://rohitvince.in/images/profile/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Rohit - Web Engineer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohit | Web Engineer & Developer',
    description:
      'Web Engineer crafting pixel-perfect, retro-futuristic digital experiences.',
    creator: '@rohitcpp',
    images: 'https://rohitvince.in/images/profile/avatar.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#fff4e0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* flag JS early so [data-reveal] content can start hidden without a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${silkscreen.variable} retro-grid min-h-screen overflow-x-hidden font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="grain" aria-hidden="true" />
        <ScrollProgress />
        <Cursor />
        <Navbar />
        <Container>
          <main className="pt-24 sm:pt-28">{children}</main>
        </Container>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
