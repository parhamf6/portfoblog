"use client";

import React from "react";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import TocDock from "@/components/global/toc-dock";
import { ScrollProgress } from "../scroll-oprogress";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <ScrollProgress position="top" thickness={2} />
      <TocDock />

      <main className="min-h-screen pt-14">{children}</main>

      <Footer />
    </>
  );
}