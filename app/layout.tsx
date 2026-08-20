import type { Metadata } from "next";
import { Archivo, Space_Mono,Zilla_Slab, VT323, Press_Start_2P, JetBrains_Mono, Anton, Bricolage_Grotesque, Instrument_Serif, Special_Gothic, Special_Elite, IBM_Plex_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/global/client-layout";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const zilla_Slab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zilla_Slab",
  display: "swap",
});


const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const iBM_Plex_Mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm",
  display: "swap",
});

const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetBrains_Mono",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parham Forati — Developer & Biologist",
  description:
    "Self-taught developer, molecular biologist and tech enthusiast. Building practical tools and writing honest notes — part portfolio, part lab notebook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${archivo.variable} ${spaceMono.variable} ${pressStart.variable} ${jetBrains_Mono.variable} ${zilla_Slab.variable} ${iBM_Plex_Mono.variable} ${vt323.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}