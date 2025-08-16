// contact-hero-background.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Generate random positions for particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--sidebar)] to-[var(--background)]" />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--primary)]/5 to-transparent"
        style={{ opacity }}
        animate={{ 
          background: [
            "linear-gradient(to top right, transparent, rgba(248,223,11,0.05), transparent)",
            "linear-gradient(to top right, transparent, rgba(248,223,11,0.1), transparent)",
            "linear-gradient(to top right, transparent, rgba(248,223,11,0.05), transparent)"
          ]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Grid pattern with parallax */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(248,223,11,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(248,223,11,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        style={{ y: y1 }}
      />
      
      {/* Floating orbs with different parallax speeds */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--primary)]/10 blur-3xl"
        style={{ y: y2 }}
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full bg-[var(--secondary)]/10 blur-3xl"
        style={{ y: y3 }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[var(--primary)]/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Subtle pulse effect */}
      <motion.div 
        className="absolute inset-0 rounded-full border border-[var(--primary)]/20"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </div>
  );
};

export default HeroBackground;