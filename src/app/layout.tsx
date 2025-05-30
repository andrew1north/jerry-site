import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"


const robotoMono = Roboto_Mono({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jerry-lester.com'),
  title: "Jerry Lester",
  description: "Jerry Lester is a multidisciplinary artist blending fine art, fashion design, and creative storytelling. With roots in Philadelphia and a background in chemical engineering, Jerry brings a unique perspective to his work—drawing inspiration from his upbringing, personal journey, and the environments that shaped him. Explore a portfolio that spans drawing, painting, sewing, and more, all under the creative vision of Jerry Lester Studios.",
  icons: {
    icon: '/jerrylesterstudioslogo.svg',
    shortcut: '/jerrylesterstudioslogo.svg',
    apple: '/jerrylester-iphone.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerry-lester.com',
    title: 'Jerry Lester',
    description: 'Jerry Lester is a multidisciplinary artist blending fine art, fashion design, and creative storytelling.',
    siteName: 'Jerry Lester Studios',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 1200,
      alt: 'Jerry Lester Studios Logo'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    images: '/og-image.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/jerrylesterstudioslogo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/jerrylester-iphone.svg" type="image/svg+xml" />
      </head>
      <body className={`${robotoMono.className} uppercase text-black`}>
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
