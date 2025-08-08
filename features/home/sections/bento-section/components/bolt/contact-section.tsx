"use client";

import { motion } from "framer-motion";
import { Globe } from "./globe";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Status , StatusIndicator, StatusLabel } from "@/components/ui/kibo-ui/status";
export function ContactSection() {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl border border-border backdrop-blur-sm bg-card/50 hover:bg-card/60 transition-all duration-300 hover:border-border/60  h-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      id="contact-card"
    >
      <div className="relative z-10 h-full p-6 flex flex-col">
        <div className="flex justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 border border-primary/20">
              <Mail className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                Get in Touch
              </h3>
            </div>
          </div>
            <p className="text-sm bg-gradient-to-r from-green-400 via-green-200 to-red-400 inline-block text-transparent bg-clip-text">From Tehran/Iran</p>
          </div>
          <Button variant="outline" className="flex  items-center justify-center gap-2">
            <p>Reach out</p>
            <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>
        <div className="text-center">
          <Status
              className="gap-4 rounded-full px-6 py-2 text-sm"
              status="degraded"
              variant="outline"
            >
            <StatusIndicator />
            <StatusLabel className="font-mono">Bussy At the moment</StatusLabel>
          </Status>
        </div>
        {/* Globe Container */}
        <div className="flex-1 relative min-h-[200px]">
          <Globe className="scale-75 md:scale-100" />
        </div>
        
        
      </div>
      
      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0  pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}