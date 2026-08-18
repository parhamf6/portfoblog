"use client";

import { m } from "motion/react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { projects as allProjects } from "@/lib/data/projects/projects-list";
import type { Project } from "@/types/project";
import { SectionHeading } from "@/features/home/components/section-heading";
import { Reveal } from "@/features/home/components/reveal";

function StatusBadge({ status }: { status: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs">
      <span
        className={`h-2 w-2 rounded-full ${status ? "animate-pulse bg-primary" : "bg-muted-foreground/50"}`}
        aria-hidden
      />
      <span className={status ? "text-primary" : "text-muted-foreground"}>
        {status ? "live" : "archived"}
      </span>
    </span>
  );
}

function Row({ project, index }: { project: Project; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group grid grid-cols-[3rem_1fr_auto] items-center gap-x-4 border-t border-border py-7 transition-colors hover:bg-muted/40 sm:grid-cols-[3rem_1fr_auto] sm:px-4"
      >
        <span className="flex items-center gap-2 font-mono text-sm tabular-nums text-muted-foreground">
          <span className="hidden text-primary opacity-0 transition-opacity group-hover:opacity-100 sm:inline">
            ▍
          </span>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold tracking-tight transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex">
            <StatusBadge status={project.status} />
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </Link>
    </m.div>
  );
}

export default function ProjectSection() {
  const featured = allProjects[0];
  const rows = allProjects.slice(1, 4);

  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            cmd="ls projects/"
            title="Selected work."
            right={
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                view all <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          {featured && (
            <article className="group mt-14 grid gap-6 border-t border-border pt-10 lg:grid-cols-12 lg:gap-8">
              <span className="font-mono text-sm tabular-nums text-muted-foreground">01</span>
              <div className="lg:col-span-11">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-primary sm:text-5xl">
                    {featured.title}
                  </h3>
                  <StatusBadge status={featured.status} />
                </div>
                <p className="mt-4 max-w-2xl font-mono text-[15px] leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-6 font-mono text-sm">
                  <Link
                    href={`/projects/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 transition-all hover:translate-x-0.5 hover:text-primary"
                  >
                    case study <ArrowRight className="h-4 w-4" />
                  </Link>
                  {featured.demoUrl && (
                    <a
                      href={featured.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                    >
                      live demo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {featured.githubUrl && (
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                    >
                      source <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          )}

          <div className="mt-6">
            {rows.map((project, index) => (
              <Row key={project.id} project={project} index={index + 1} />
            ))}
            <div className="border-t border-border" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}