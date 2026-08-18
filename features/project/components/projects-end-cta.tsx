import { ArrowRight } from "@phosphor-icons/react";

export default function ProjectPageCta() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="rounded-2xl border border-border bg-card/50 p-12 text-center backdrop-blur-sm">
        <h3 className="font-display text-3xl font-bold tracking-tight">
          Interested in working together?
        </h3>
        <p className="mx-auto mt-4 mb-8 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          I&apos;m always open to discussing new opportunities and interesting projects.
          Let&apos;s create something amazing together.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:parhamfdev@proton.me"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            get in touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}