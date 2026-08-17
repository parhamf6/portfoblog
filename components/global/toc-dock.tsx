"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { id: "about", num: "01", label: "about", short: "about" },
  { id: "stack", num: "02", label: "stack", short: "stack" },
  { id: "projects", num: "03", label: "projects", short: "work" },
  { id: "blog", num: "04", label: "blog", short: "blog" },
  { id: "journey", num: "05", label: "journey", short: "path" },
];

export default function TocDock() {
  const [active, setActive] = useState("");
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
          setActive(top.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setAtTop(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (pathname !== "/") return null;

  return (
    <>
      {/* Desktop — left rail */}
      <nav
        aria-label="Sections"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-0.5 md:flex"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "flex cursor-pointer items-center gap-2 py-1 font-mono text-xs transition-colors",
            atTop ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span className={cn("text-primary transition-opacity", !atTop && "opacity-0")}>▍</span>
          <span>~/</span>
        </button>

        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "flex cursor-pointer items-center gap-2 py-1 font-mono text-xs transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "text-primary transition-opacity",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              >
                ▍
              </span>
              <span className={cn("tabular-nums", isActive && "text-primary")}>{item.num}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile — bottom dock */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-4 z-40 flex justify-center md:hidden"
      >
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/90 px-2 py-1.5 shadow-sm backdrop-blur-md">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "cursor-pointer rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors",
                  isActive ? "bg-primary/15 text-primary" : "text-muted-foreground",
                )}
              >
                {item.short}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}