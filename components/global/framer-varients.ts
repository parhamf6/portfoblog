// motionVariants.ts
import { Variants } from 'framer-motion';

// Fade in with slight upward motion
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};

// Slide in from left with stagger effect
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

// Slide in from right with stagger effect
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

// Scale up with spring effect
export const scaleUp: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 15 
    }
  }
};

// Stagger container for animating children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Pop in with bounce effect
export const popIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  }
};

// Draw SVG path
export const drawPath: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// Fade in with slight rotation
export const fadeInRotate: Variants = {
  hidden: { 
    opacity: 0, 
    rotate: -5 
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    }
  }
};

// Slide up with blur effect
export const slideUpBlur: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    filter: "blur(10px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
};

// Scale up with rotation
export const scaleRotate: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0, 
    rotate: -180 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 15 
    }
  }
};

// Pulse effect for drawing attention
export const pulse: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};