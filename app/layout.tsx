import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer/footer";
import ScrollToTop from "@/components/ui/backtotop";
import Navbar from "./components/ui/global/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ParhamF",
  description: "ParhamF Portfolio",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className={`${geistSans.className} bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark min-h-screen transition-colors duration-300`}>
          <Navbar />
          {children}
          <ScrollToTop />
          <Footer />
        </body>

      </html>
    </ThemeProvider>
  );
}
