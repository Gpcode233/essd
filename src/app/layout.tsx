import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TextureOverlay from "@/components/texture-overlay";

export const metadata: Metadata = {
  metadataBase: new URL("https://essd.ng"),
  title: "ESSD 2026 | Enugu State Secondary Schools Debate Championship",
  description:
    "Official championship website for the Enugu State Secondary Schools Debate Championship. Theme: 'Beyond the Algorithm: Reimagining Education in the Age of AI'. 16th & 17th October 2026.",
  keywords: [
    "ESSD",
    "Enugu State Debate Championship",
    "Secondary Schools Debate",
    "Beyond the Algorithm",
    "Education in the Age of AI",
    "Enugu Students",
    "Debate Tournament",
  ],
  authors: [
    { name: "The Placee Educational Consult" },
    { name: "House on the Rock Church, Enugu" },
  ],
  icons: {
    icon: "/images/essd-logo.jpg",
    shortcut: "/images/essd-logo.jpg",
    apple: "/images/essd-logo.jpg",
  },
  openGraph: {
    title: "ESSD 2026 | Enugu State Secondary Schools Debate Championship",
    description:
      "Where brilliant young minds challenge ideas, sharpen their reasoning, and debate the future of education in an AI-driven world. 16th & 17th October 2026.",
    images: [
      {
        url: "/images/essd-poster.jpg",
        width: 1200,
        height: 630,
        alt: "ESSD 2026 Poster",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=JetBrains+Mono:wght@400;700&family=Oswald:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Space+Grotesk:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-essd-black text-essd-cream antialiased flex flex-col selection:bg-essd-orange selection:text-white">
        <TextureOverlay />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
