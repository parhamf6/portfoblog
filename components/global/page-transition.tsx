"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

// Animation variants for different transition types
const transitionVariants = {
  // Smooth slide with scale
  slideScale: {
    initial: { 
      opacity: 0, 
      x: 100, 
      scale: 0.95,
      filter: "blur(4px)"
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      filter: "blur(0px)"
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      scale: 1.05,
      filter: "blur(4px)"
    }
  },
  
  // Smooth vertical slide with rotation
  verticalFlow: {
    initial: { 
      opacity: 0, 
      y: 60, 
      rotateX: -15,
      transformPerspective: 1000
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transformPerspective: 1000
    },
    exit: { 
      opacity: 0, 
      y: -60, 
      rotateX: 15,
      transformPerspective: 1000
    }
  },
  
  // Modern fade with subtle movement
  modernFade: {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98,
      filter: "blur(2px)"
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)"
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 1.02,
      filter: "blur(2px)"
    }
  },
  
  // Dynamic elastic effect
  elastic: {
    initial: { 
      opacity: 0, 
      x: -80, 
      skewX: 8,
      transformOrigin: "left"
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      skewX: 0,
      transformOrigin: "center"
    },
    exit: { 
      opacity: 0, 
      x: 80, 
      skewX: -8,
      transformOrigin: "right"
    }
  }
}

// Easing functions for smooth animations
const easingFunctions = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bouncy: [0.68, -0.55, 0.265, 1.55],
  elegant: [0.4, 0, 0.2, 1],
  dynamic: [0.17, 0.67, 0.83, 0.67]
}

interface PageTransitionProps {
  children: React.ReactNode
  variant?: keyof typeof transitionVariants
  duration?: number
  className?: string
}

export function PageTransition({ 
  children, 
  variant = "modernFade",
  duration = 0.5,
  className = ""
}: PageTransitionProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  
  // Add loading state for better UX
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 100)
    return () => clearTimeout(timer)
  }, [pathname])

  const selectedVariant = transitionVariants[variant]

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={{
          duration,
          ease: easingFunctions.elegant,
          opacity: { duration: duration * 0.8 },
          y: { duration },
          x: { duration },
          scale: { duration: duration * 1.2 },
          filter: { duration: duration * 0.6 }
        }}
        className={`
          min-h-screen 
          w-full 
          will-change-transform
          ${className}
        `}
        style={{
          // Optimize for smooth animations
          backfaceVisibility: 'hidden',
          perspective: 1000,
          transformStyle: 'preserve-3d'
        }}
        onAnimationComplete={() => setIsLoading(false)}
      >
        {/* Optional loading overlay for instant feedback */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-gradient-to-br from-slate-50/20 to-slate-100/20 backdrop-blur-sm z-50 pointer-events-none"
            />
          )}
        </AnimatePresence>
        
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Advanced version with stagger animations for child elements
export function StaggerPageTransition({ 
  children, 
  variant = "modernFade",
  duration = 0.6,
  staggerDelay = 0.1,
  className = ""
}: PageTransitionProps & { staggerDelay?: number }) {
  const pathname = usePathname()
  const selectedVariant = transitionVariants[variant]

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: selectedVariant.initial,
          animate: {
            ...selectedVariant.animate,
            transition: {
              duration,
              ease: easingFunctions.elegant,
              staggerChildren: staggerDelay,
              delayChildren: 0.1
            }
          },
          exit: selectedVariant.exit
        }}
        transition={{
          duration: duration * 0.8,
          ease: easingFunctions.elegant
        }}
        className={`
          min-h-screen 
          w-full 
          will-change-transform
          ${className}
        `}
        style={{
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Hook for programmatic transitions
export function usePageTransition() {
  const pathname = usePathname()
  
  return {
    currentPath: pathname,
    isTransitioning: false // Could be enhanced with router events
  }
}

// Preset configurations for common use cases
export const transitionPresets = {
  portfolio: {
    variant: "slideScale" as const,
    duration: 0.6,
    className: "bg-gradient-to-br from-slate-50 to-white"
  },
  blog: {
    variant: "modernFade" as const,
    duration: 0.4,
    className: "bg-white"
  },
  gallery: {
    variant: "verticalFlow" as const,
    duration: 0.7,
    className: "bg-slate-50"
  },
  dynamic: {
    variant: "elastic" as const,
    duration: 0.8,
    className: "bg-gradient-to-br from-indigo-50 to-purple-50"
  }
}