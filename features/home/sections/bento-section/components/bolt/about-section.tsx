"use client";

import { motion } from "framer-motion";
import { User, ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <motion.div 
      className="bento-card h-full group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        // Navigate to about page
        window.location.href = "/about";
      }}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                About Me
              </h3>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            Full-stack developer passionate about building exceptional digital experiences with modern technologies.
          </p>
        </div>
        
        <div className="pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Available for new projects
          </div>
        </div>
      </div>
    </motion.div>
  );
}