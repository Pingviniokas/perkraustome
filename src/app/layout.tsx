import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { MapsProvider } from '@/context/MapsContext';

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
    <html lang="lt" dir="ltr" className="antialiased">
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <MapsProvider>
          <Navbar />
          <main className="flex-grow relative overflow-visible">
            {children}
          </main>
          <Footer />
        </MapsProvider>
      </body>
    </html>
  );
}