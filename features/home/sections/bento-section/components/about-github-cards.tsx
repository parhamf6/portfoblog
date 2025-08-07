"use client";
import { motion } from "motion/react";
import { Github, User, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
export function AboutCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:bg-card/80 cursor-pointer"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                About Me
              </h3>
            </div>
          </div>
          <Button variant="outline" className="flex  items-center justify-center gap-2">
            <p>See who am i ?</p>
            <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          Full-stack developer focus on backend who loves problems. see for the educartion and all of stacks
        </p>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-primary rounded-xl" />
      </div>
    </motion.div>
  );
}

export function GitHubCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:bg-card/80 cursor-pointer"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/20">
              <Github className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                GitHub
              </h3>
            </div>
          </div>
          <Button variant="outline" className="flex  items-center justify-center gap-2">
            <p>Follow me</p>
            <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          Explore my open source projects and contributions to the developer community.
        </p>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-secondary rounded-xl" />
      </div>
    </motion.div>
  );
}
