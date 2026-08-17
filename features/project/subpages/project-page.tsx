"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import type { ProjectData } from "@/types/project";
import ProjectPageCta from "@/features/project/components/projects-end-cta";

function Eyebrow({ cmd }: { cmd: string }) {
  return (
    <p className="font-mono text-sm text-muted-foreground">
      <span className="text-primary">$</span> {cmd}
    </p>
  );
}

export const ProjectShowcase: React.FC<{ project: ProjectData }> = ({ project }) => {
  const summary = [
    {
      label: "problem",
      title: project.quickSummary.problem.title,
      detailed: project.quickSummary.problem.detailed,
    },
    {
      label: "solution",
      title: project.quickSummary.solution.title,
      detailed: project.quickSummary.solution.detailed,
    },
    {
      label: "impact",
      title: project.quickSummary.impact.title,
      detailed: project.quickSummary.impact.detailed,
    },
  ];

  return (
    <div className="mb-32 pt-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          all projects
        </Link>

        {/* Header */}
        <div className="mt-10">
          <Eyebrow cmd={`cat projects/${project.title.toLowerCase()}/README.md`} />
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl font-mono text-base leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
        </div>

        {/* Meta */}
        <dl className="mt-10 divide-y divide-border border-y border-border font-mono text-sm">
          <div className="grid grid-cols-[100px_1fr] items-baseline gap-4 py-4">
            <dt className="text-muted-foreground">status</dt>
            <dd className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
              <span className="text-primary">{project.status}</span>
            </dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-baseline gap-4 py-4">
            <dt className="text-muted-foreground">duration</dt>
            <dd>{project.duration}</dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-baseline gap-4 py-4">
            <dt className="text-muted-foreground">role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-baseline gap-4 py-4">
            <dt className="text-muted-foreground">stack</dt>
            <dd className="text-muted-foreground">{project.techStack.join(" · ")}</dd>
          </div>
        </dl>

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.demo && project.links.demo.includes("http") && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border-2 border-primary bg-primary/10 px-4 py-2.5 font-mono text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_22px_-6px_var(--primary)]"
            >
              live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.links.github && project.links.github.includes("http") && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-4 py-2.5 font-mono text-sm text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="h-4 w-4" />
              source
            </a>
          )}
        </div>

        {/* Quick summary */}
        <div className="mt-20">
          <Eyebrow cmd="head summary.md" />
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
            Quick summary
          </h2>

          <div className="mt-8">
            {summary.map((row) => (
              <div
                key={row.label}
                className="grid gap-3 border-t border-border py-8 sm:grid-cols-[8rem_1fr] sm:gap-8"
              >
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary">
                  {row.label}
                </h3>
                <div>
                  <h4 className="font-display text-lg font-semibold tracking-tight">
                    {row.title}
                  </h4>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
                    {row.detailed}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-border" aria-hidden />
          </div>
        </div>

        {/* Key features */}
        <div className="mt-20">
          <Eyebrow cmd="cat features.txt" />
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
            Key features
          </h2>
          <ul className="mt-8 border-t border-border">
            {project.keyFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-baseline gap-3 border-b border-border py-4 font-mono text-sm text-muted-foreground"
              >
                <span className="text-primary">▸</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom link */}
        <div className="mt-16 flex items-center gap-3 font-mono text-sm">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            back to projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ProjectPageCta />
    </div>
  );
};

export default ProjectShowcase;