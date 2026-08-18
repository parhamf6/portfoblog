"use client";

import { SectionHeading } from "@/features/home/components/section-heading";
import { Reveal } from "@/features/home/components/reveal";

const categories: { label: string; techs: { name: string; color: string }[] }[] = [
  {
    label: "primary",
    techs: [
      { name: "Python", color: "#3776ab" },
      { name: "TypeScript", color: "#3178c6" },
    ],
  },
  {
    label: "frontend",
    techs: [
      { name: "Next.js", color: "#9ca3af" },
      { name: "React", color: "#61dafb" },
    ],
  },
  {
    label: "backend",
    techs: [
      { name: "FastAPI", color: "#009688" },
      { name: "PostgreSQL", color: "#336791" },
    ],
  },
  {
    label: "tools & devops",
    techs: [
      { name: "Docker", color: "#2496ed" },
      { name: "Linux", color: "#fcc624" },
    ],
  },
];

export default function StackSection() {
  return (
    <section id="stack" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading cmd="which stack" title="The tools I reach for." />

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.label}>
                <p className="border-b border-border pb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {category.label}
                </p>
                <ul className="mt-4 space-y-2.5 font-mono text-sm">
                  {category.techs.map((tech) => (
                    <li key={tech.name} className="group flex items-center gap-2.5">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
                        style={{ backgroundColor: tech.color }}
                        aria-hidden
                      />
                      <span className="text-foreground/90 transition-colors group-hover:text-primary">
                        {tech.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}