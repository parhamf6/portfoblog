"use client";

import { motion, MotionConfig } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden">
        <div className="relative mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-sm text-muted-foreground"
          >
            <span className="text-primary">~/portfolio</span> $ whoami
          </motion.p>

          <h1 className="mt-6 font-display font-black leading-[0.92] tracking-tight text-[clamp(3.2rem,10vw,7.5rem)]">
            <motion.span variants={fadeUp} initial="hidden" animate="visible" className="block">
              Parham
            </motion.span>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="block text-primary"
            >
              Forati
              <span className="cursor-blink ml-2 inline-block h-[0.85em] w-[0.5ch] align-baseline bg-primary" />
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 font-mono text-base text-muted-foreground sm:text-lg"
          >
            Developer · Molecular Biologist · Tech Enthusiast
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground/80"
          >
            Self-taught developer building practical tools and writing honest notes
            about what I learn — part portfolio, part lab notebook.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border-2 border-primary bg-primary/10 px-4 py-2.5 font-mono text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_22px_-6px_var(--primary)]"
            >
              <Download className="h-4 w-4" />
              resume.pdf
            </a>
            <a
              href="mailto:parhamfdev@proton.me"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-4 py-2.5 font-mono text-sm text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              say hi
            </a>
            <span className="ml-auto hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:inline-flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
              open to work
            </span>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          scroll <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </motion.a>
      </section>
    </MotionConfig>
  );
}