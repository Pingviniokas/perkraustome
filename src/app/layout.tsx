import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Mes Jau Čia",
  description: "Profesionalios pervežimo paslaugos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}