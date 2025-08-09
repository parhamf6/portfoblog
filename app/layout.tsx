import type { Metadata } from "next";
import { Geist, Geist_Mono , Chivo, Lora , Roboto_Mono , Raleway , Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/navbar";
import React from "react";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';

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


// export default async function LocaleLayout({
//   children,
//   params
// }: {
//   children: React.ReactNode;
//   params: Promise<{locale: string}>;
// }) {
//   // Ensure that the incoming `locale` is valid
//   const {locale} = await params;
//   if (!hasLocale(routing.locales, locale)) {
//     notFound();
//   }
//   // setRequestLocale(locale);
 
//   return (
//     <html lang={locale} dir={locale === 'fa' ? 'rtl' :'ltr'}>
//       <body className={` ${chivo.variable} ${lora.variable} ${robotoMono.variable} antialiased`}>
//         <Navbar />
//         <main className="px-4 md:px-8">
//           <NextIntlClientProvider>{children}</NextIntlClientProvider>
//         </main>
//       </body>
//     </html>
//   );
// }
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${chivo.variable} ${lora.variable} ${robotoMono.variable} antialiased`}>
        <Navbar />
        <main className="px-4 md:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
