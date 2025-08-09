import { motion } from "framer-motion";


// CTA 1: Read What I'm Learning (Supabase-inspired)
export const LearningCTA = () => {
  return (
    <motion.a
      href="/blog"
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/80 px-6 py-4 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center gap-2 font-medium">
        <span>Use What I'm Building </span>
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-30 blur-sm transition-all duration-300 group-hover:opacity-50" />
    </motion.a>
  );
};

// CTA 2: Use What I'm Building (Raycast-inspired)
export const BuildingCTA = () => {
  return (
    <motion.a
      href="/projects"
      className="group relative inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-4 text-card-foreground transition-all duration-300 hover:bg-card/90 hover:shadow-lg hover:shadow-secondary/10"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center gap-2 font-medium">
        <span>Read What I'm Learning</span>
        <motion.span
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </motion.span>
      </span>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-secondary to-primary transition-all duration-300 group-hover:w-full" />
    </motion.a>
  );
};