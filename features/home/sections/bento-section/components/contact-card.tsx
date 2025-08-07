"use client";
import { motion } from "framer-motion";
import { Globe } from "./globe";
import { ArrowUpRight } from 'lucide-react';

export function ContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:bg-card/80 cursor-pointer h-full"
    >
      <div className="relative h-full p-6 flex flex-col">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                Let's Connect
              </h3>
              <p className="text-sm text-muted-foreground">
                Ready to collaborate worldwide
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
        
        {/* Globe - positioned to be visible */}
        <div className="flex-1 relative flex items-center justify-center min-h-[200px]">
          <div className="w-full h-full max-w-[250px] max-h-[250px] opacity-60 group-hover:opacity-80 transition-opacity duration-500">
            <Globe />
          </div>
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
