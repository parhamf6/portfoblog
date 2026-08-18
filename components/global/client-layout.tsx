"use client";

import React from "react";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import TocDock from "@/components/global/toc-dock";
import { ScrollProgress } from "../scroll-oprogress";
import SiteLoader from "@/components/global/site-loader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteLoader />
      <Navbar />
      <ScrollProgress position="top" thickness={2} />
      <TocDock />

      <main className="min-h-screen pt-14">{children}</main>

      <Footer />
    </>
  );
}