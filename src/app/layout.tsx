import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const robotoMono = Roboto_Mono({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jerry's Portfolio & Shop",
  description: "Portfolio and shop featuring Jerry's creative work",
  icons: {
    icon: '/jerrylesterstudioslogo.svg',
    apple: '/jerrylesterstudioslogo.svg',
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
