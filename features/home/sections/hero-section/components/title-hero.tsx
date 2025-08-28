import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

type Props = {
  quote?: string;
  author?: string;
  className?: string;
};

// Default export: CuriousQuote
export default function CuriousQuote({
  quote = "Be curious, not judgmental",
  author = "— Ted Lasso",
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);

  // raw motion values (pixels inside the container)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // smooth springs for nicer motion
  const x = useSpring(rawX, { damping: 22, stiffness: 300 });
  const y = useSpring(rawY, { damping: 28, stiffness: 300 });

  function handleMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // cursor relative to container
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    // offset the tooltip a bit above the cursor
    rawX.set(cx + 12);
    rawY.set(cy - 18);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`relative inline-block ${className}`}
      aria-label={`${quote} — ${author}`}
    >
      {/* Main heading: subtle color/scale change on hover */}
      <motion.h1
        id="hero-text"
        className={`text-3xl sm:text-4xl md:text-5xl text-accent font-bold font-serif leading-tight select-none`}
        animate={{
          scale: isHover ? 1.02 : 1,
          // animate a subtle color shift (override Tailwind at runtime)
          color: isHover ? "#F6E05E" : undefined,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        {quote}
      </motion.h1>

      {/* Tooltip that follows cursor */}
      <AnimatePresence>
        {isHover && (
          <motion.div
            // position absolutely to follow cursor via motion values (x/y)
            style={{ x, y }}
            className="pointer-events-none absolute z-0 whitespace-nowrap px-3 py-1 rounded-xl text-sm font-medium bg-gray-900/90 backdrop-blur-sm text-white shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 600, damping: 40 }}
          >
            {author}
          </motion.div>
        )}
      </AnimatePresence>

      {/* small accessible hint for keyboard users (focus shows author) */}
      <button
        className="sr-only"
        onFocus={() => setIsHover(true)}
        onBlur={() => setIsHover(false)}
        aria-hidden
      />
    </div>
  );
}
