"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubLogoIcon, Envelope } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/global/theme-toggle";

const navLinks = [
  { name: "projects", href: "/projects" },
  { name: "blog", href: "/blogs" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Home"
          className="group flex items-center"
        >
          <img
            src="/logo-transparent.png"
            alt="Parham Forati"
            className="h-8 w-auto transition-transform group-hover:scale-105"
          />
        </Link>

        <nav className="flex items-center gap-0.5 font-mono text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 transition-colors",
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive(link.href) && (
                <span className="text-primary" aria-hidden>
                  ▍
                </span>
              )}
              <span className="opacity-50">./</span>
              {link.name}
            </Link>
          ))}

          <span className="mx-1 hidden h-4 w-px bg-border sm:block" aria-hidden />

          <a
            href="https://github.com/parhamf6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 items-center justify-center px-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <GithubLogoIcon className="h-4 w-4" />
          </a>
          <a
            href="mailto:parhamfdev@proton.me"
            aria-label="Email"
            className="flex h-8 items-center justify-center px-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Envelope className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}