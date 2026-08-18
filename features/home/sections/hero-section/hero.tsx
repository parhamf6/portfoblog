"use client";

import { m, type Variants } from "motion/react";
import { ArrowDown, DownloadSimple, Envelope } from "@phosphor-icons/react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <m.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <m.p variants={fadeUp} className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">~/portfolio</span> $ whoami
        </m.p>

        <h1 className="mt-6 font-display font-black leading-[0.92] tracking-tight text-[clamp(3.2rem,10vw,7.5rem)]">
          <m.span variants={fadeUp} className="block">
            Parham
          </m.span>
          <m.span variants={fadeUp} className="block text-primary">
            Forati
            <span className="cursor-blink ml-2 inline-block h-[0.85em] w-[0.5ch] align-baseline bg-primary" />
          </m.span>
        </h1>

        <m.p variants={fadeUp} className="mt-6 font-mono text-base text-muted-foreground sm:text-lg">
          Developer · Molecular Biologist · Tech Enthusiast
        </m.p>

        <m.p
          variants={fadeUp}
          className="mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground/80"
        >
          Self-taught developer building practical tools and writing honest notes
          about what I learn — part portfolio, part lab notebook.
        </m.p>

        <m.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md border-2 border-primary bg-primary/10 px-4 py-2.5 font-mono text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_22px_-6px_var(--primary)]"
          >
            <DownloadSimple className="h-4 w-4" />
            resume.pdf
          </a>
          <a
            href="mailto:parhamfdev@proton.me"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-4 py-2.5 font-mono text-sm text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          >
            <Envelope className="h-4 w-4" />
            say hi
          </a>
          <span className="ml-auto hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:inline-flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
            open to work
          </span>
        </m.div>
      </div>

      <m.a
        href="#about"
        variants={fadeUp}
        className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        scroll <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </m.a>
    </m.section>
  );
}
