import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const robotoMono = Roboto_Mono({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jerry-lester.com'),
  title: "Jerry Lester",
  description: "Jerry Lester is a multidisciplinary artist blending fine art, fashion design, and creative storytelling. With roots in Philadelphia and a background in chemical engineering, Jerry brings a unique perspective to his work—drawing inspiration from his upbringing, personal journey, and the environments that shaped him. Explore a portfolio that spans drawing, painting, sewing, and more, all under the creative vision of Jerry Lester Studios.",
  icons: {
    icon: '/logo.png', // This is for favicon and tab icon
    // If you want Apple-specific icons, you can also add:
    apple: '/logo.png',
  },
  openGraph: {
    images: ['/logo.png'], // Using same logo for social previews
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} uppercase text-black`}>
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
