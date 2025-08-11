'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollHintProps {
  text?: string;
  showIcon?: boolean;
  hideAfterScroll?: boolean;
  hideDelay?: number; // seconds
  position?: 'center' | 'left' | 'right';
  className?: string;
}

export const ScrollHint = ({
  text = 'Scroll to explore',
  showIcon = true,
  hideAfterScroll = true,
  hideDelay = 4, // Hide after 4 seconds if no scroll
  position = 'center',
  className = ''
}: ScrollHintProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (!hasScrolled && hideAfterScroll) {
        setHasScrolled(true);
        setIsVisible(false);
      }
    };

    // Hide after delay if no scroll
    if (hideDelay > 0) {
      timeoutId = setTimeout(() => {
        if (!hasScrolled) {
          setIsVisible(false);
        }
      }, hideDelay * 1000);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hasScrolled, hideAfterScroll, hideDelay]);

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-8';
      case 'right':
        return 'right-8';
      default:
        return 'left-1/2 -translate-x-1/2';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed bottom-8 ${getPositionClasses()} z-40 flex flex-col items-center gap-2 ${className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.span
            className="text-sm text-muted-foreground font-light tracking-wider"
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {text}
          </motion.span>
          
          {showIcon && (
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
            >
              <ChevronDown 
                className="w-5 h-5 text-primary" 
                strokeWidth={1.5}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};