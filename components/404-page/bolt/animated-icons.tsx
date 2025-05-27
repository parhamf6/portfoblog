"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FrownIcon, SearchIcon, FileQuestionIcon, MousePointerClick } from 'lucide-react';

const AnimatedIllustration: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };
  
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto" onClick={handleClick}>
      {/* Background circle */}
      <motion.div 
        className="absolute inset-0 bg-indigo-100 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 0.6 
        }}
      />
      
      {/* Orbiting elements */}
      <OrbittingElement 
        Icon={SearchIcon}
        delay={0}
        duration={12}
        distance={120}
        size={32}
        color="text-blue-500"
      />
      
      <OrbittingElement 
        Icon={FileQuestionIcon}
        delay={0.2}
        duration={15}
        distance={120}
        size={28}
        color="text-purple-500"
        reverse={true}
      />
      
      {/* Center sad face that turns happy when clicked */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {clicked ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-indigo-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div className="text-indigo-500">
            <FrownIcon size={80} />
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MousePointerClick size={24} className="text-indigo-600" />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Hint text */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        Click me
      </motion.div>
    </div>
  );
};

interface OrbittingElementProps {
  Icon: React.ElementType;
  delay: number;
  duration: number;
  distance: number;
  size: number;
  color: string;
  reverse?: boolean;
}

const OrbittingElement: React.FC<OrbittingElementProps> = ({ 
  Icon, 
  delay, 
  duration, 
  distance, 
  size, 
  color,
  reverse = false 
}) => {
  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 ${color}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        x: Array.from({ length: 72 }).map((_, i) => 
          Math.cos(i * 5 * Math.PI / 180) * distance
        ),
        y: Array.from({ length: 72 }).map((_, i) => 
          Math.sin(i * 5 * Math.PI / 180) * distance
        )
      }}
      transition={{
        delay,
        duration: 0.3,
        x: {
          duration,
          repeat: Infinity,
          ease: "linear",
          times: Array.from({ length: 72 }).map((_, i) => i / 72),
          ...(reverse && { repeatType: "reverse" })
        },
        y: {
          duration,
          repeat: Infinity,
          ease: "linear",
          times: Array.from({ length: 72 }).map((_, i) => i / 72),
          ...(reverse && { repeatType: "reverse" })
        }
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
};

export default AnimatedIllustration;