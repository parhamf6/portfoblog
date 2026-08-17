"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { projects } from "@/lib/data/projects/projects-list";
import ProjectBackground from "./components/project-background";

export default function ProjectIndex() {
  const [query, setQuery] = useState("");

  const filtered = projects.filter((project) => {
    const q = query.toLowerCase();
    return (
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="relative mb-32 pt-20">
      <ProjectBackground />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <header>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> ls projects/
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            All projects
          </h1>
          <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
            A log of things I&apos;ve built — tools, experiments and long-running
            obsessions.
          </p>

          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-9 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </header>

        <div className="mt-12">
          {filtered.length > 0 ? (
            filtered.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 border-t border-border py-7 transition-colors hover:bg-muted/30 sm:grid-cols-[3rem_1fr_auto] sm:px-4"
              >
                <span className="font-mono text-sm tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                      {project.title}
                    </h2>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {project.type}
                    </span>
                  </div>
                  <p className="mt-1 max-w-2xl font-mono text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4 font-mono text-xs">
                    <span
                      className={
                        project.status ? "text-primary" : "text-muted-foreground"
                      }
                    >
                      ● {project.status ? "live" : "archived"}
                    </span>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                      >
                        demo <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                      >
                        source <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))
          ) : (
            <p className="border-t border-border py-16 text-center font-mono text-sm text-muted-foreground">
              no projects match “{query}”.
            </p>
          )}
          <div className="border-t border-border" aria-hidden />
        </div>
      </div>
    </div>
  );
}