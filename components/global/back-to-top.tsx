import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
      
      // Reset hover state when we're at the top (or very close to it)
      if (scrollY < 50) {
        setIsHovered(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            boxShadow: isHovered 
              ? `0 0 20px 2px var(--primary), 0 0 30px 5px rgba(248, 223, 11, 0.3)` 
              : '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              type: 'spring', 
              stiffness: 300, 
              damping: 20 
            }
          }}
          exit={{ 
            opacity: 0, 
            y: 20, 
            scale: 0.8,
            transition: { duration: 0.2 }
          }}
          whileHover={{ 
            scale: 1.1,
            transition: { 
              type: 'spring', 
              stiffness: 400, 
              damping: 10 
            }
          }}
          whileTap={{ 
            scale: 0.95,
            rotate: 15
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          aria-label="Back to top"
        >
          <motion.div
            animate={{ 
              y: isHovered ? -3 : 0,
              rotate: isHovered ? 360 : 0
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 15,
              rotate: {
                duration: 0.6,
                ease: "easeInOut"
              }
            }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: 'var(--primary)' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1.2 : 1, 
              opacity: isHovered ? 0.6 : 0.3 
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{ 
              background: 'var(--primary)',
              opacity: 0.2 
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1.3 : 1, 
              opacity: isHovered ? 0.1 : 0 
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;