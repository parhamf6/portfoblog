// components/GlowingCard.tsx
"use client"
import { motion } from 'framer-motion';
import React from 'react';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.5)', // Default blue glow
}) => {
  return (
    <motion.div
      className={`relative rounded-xl bg-gray-900 p-6 border border-gray-800 ${className}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: {
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
          transition: { duration: 0.3 },
        },
        hover: {
          boxShadow: `0 0 25px 5px ${glowColor}`,
          transition: { duration: 0.3 },
        },
      }}
    >
      {/* Glow effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
      />
      
      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        style={{
          borderColor: glowColor,
          boxShadow: `0 0 15px ${glowColor}`,
          zIndex: -1,
        }}
      />
      
      {children}
    </motion.div>
  );
};

export default GlowingCard;