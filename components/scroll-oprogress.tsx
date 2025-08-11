'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  position?: 'top' | 'right' | 'left';
  thickness?: number;
  className?: string;
}

export const ScrollProgress = ({ 
  position = 'top', 
  thickness = 3,
  className = '' 
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setIsVisible(latest > 0.01); // Show when scrolled more than 1%
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const getPositionStyles = () => {
    switch (position) {
      case 'right':
        return {
          position: 'fixed' as const,
          top: 0,
          right: 0,
          width: thickness,
          height: '100vh',
          transformOrigin: 'top',
          scaleY: scaleX, // Use scaleX value for vertical progress
          scaleX: 1,
        };
      case 'left':
        return {
          position: 'fixed' as const,
          top: 0,
          left: 0,
          width: thickness,
          height: '100vh',
          transformOrigin: 'top',
          scaleY: scaleX,
          scaleX: 1,
        };
      default: // top
        return {
          position: 'fixed' as const,
          top: 0,
          left: 0,
          right: 0,
          height: thickness,
          transformOrigin: 'left',
          scaleX,
          scaleY: 1,
        };
    }
  };

  return (
    <motion.div
      className={`bg-primary z-50 ${className}`}
      style={getPositionStyles()}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};