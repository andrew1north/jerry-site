import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jerry's Portfolio & Shop",
  description: "Portfolio and shop featuring Jerry's creative work",
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
      </body>
    </html>
  );
}
