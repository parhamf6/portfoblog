import type { Metadata } from "next";
import { Geist, Geist_Mono , Chivo, Lora , Roboto_Mono , Raleway , Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/navbar";
import React from "react";
import { ScrollProgress } from "@/components/scroll-oprogress";
import Footer from "@/components/global/footer";
import { PageTransition } from "@/components/global/page-transition";
const chivo = Chivo({
  subsets: ['latin'],
  variable: '--font-chivo',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Parham Forati",
  description: "My PortfoBlog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${chivo.variable} ${lora.variable} ${robotoMono.variable} antialiased `}>
        <Navbar />
        <ScrollProgress position="top" thickness={2} />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
