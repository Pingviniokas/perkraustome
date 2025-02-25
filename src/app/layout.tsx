import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Mes Jau Čia",
  description: "Profesionalios pervežimo paslaugos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="lt" dir="ltr" className={`${poppins.variable} ${spaceGrotesk.variable} font-['TT_Firs_Neue'] antialiased`}>
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex-grow relative">
          {children}
        </main>
        <Footer />
      
      </body>
    </html>
  );
}