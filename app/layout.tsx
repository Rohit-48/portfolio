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
  title: "Portfolio",
  description: "Web Engineer crafting pixel-perfect, retro-futuristic digital experiences.",
};

export const viewport: Viewport = {
  themeColor: "#0f1108",
};

export const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
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
