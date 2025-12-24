import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter, Electrolize } from "next/font/google";
import "./globals.css";
import { Container } from "./components/Container";
import { Navbar } from "./components/Navbar";


const electrolize = Electrolize({
  weight: "400",
  variable: "--font-electrolize",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rohit | Web Engineer & Developer",
    template: "%s | Rohit",
  },
  description: "Web Engineer crafting pixel-perfect, retro-futuristic digital experiences. Specializing in React, Next.js, TypeScript, and modern web technologies.",
  keywords: ["Web Developer", "Frontend Engineer", "React", "Next.js", "TypeScript", "Portfolio", "Rohit"],
  authors: [{ name: "Rohit" }],
  creator: "Rohit",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohitvince.in",
    title: "Rohit | Web Engineer & Developer",
    description: "Web Engineer crafting pixel-perfect, retro-futuristic digital experiences.",
    siteName: "Rohit's Portfolio",
    images: [
      {
        url: "/images/profile/avatar.png",
        width: 1200,
        height: 630,
        alt: "Rohit - Web Engineer & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit | Web Engineer & Developer",
    description: "Web Engineer crafting pixel-perfect, retro-futuristic digital experiences.",
    creator: "@rohitcpp",
    images: "/images/profile/avatar.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1108",
};

export const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]"></div>
  )
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${electrolize.variable} antialiased`}

      >
        <BackgroundPattern />
        <Container>
          <Navbar />
          <div className="pt-20">
            {children}
          </div>
        </Container>
      </body>
    </html>
  );
}
