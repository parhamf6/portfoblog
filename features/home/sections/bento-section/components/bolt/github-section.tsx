"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, GitBranch } from "lucide-react";

export function GitHubSection() {
  return (
    <motion.div 
      className="bento-card h-full group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        window.open("https://github.com/yourusername", "_blank");
      }}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                GitHub
              </h3>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Explore my open source projects and contributions.
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              <span>50+ repos</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Active contributor</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          @yourusername
        </div>
      </div>
    </motion.div>
  );
}