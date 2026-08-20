"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Envelope, GithubLogoIcon } from "@phosphor-icons/react";

const socials = [
  { name: "GitHub", href: "https://github.com/parhamf6", icon: GithubLogoIcon },
  { name: "Email", href: "mailto:parhamfdev@proton.me", icon: Envelope },
];

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  // Keep the Konami-code easter egg: ↑↑↓↓←→←→BA → /well-done
  const triggerEasterEgg = useCallback(() => {
    router.push("/well-done");
  }, [router]);

  useEffect(() => {
    let keys: string[] = [];
    const konami = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    const handler = (e: KeyboardEvent) => {
      keys = [...keys, e.key].slice(-10);
      if (JSON.stringify(keys) === JSON.stringify(konami)) {
        keys = [];
        triggerEasterEgg();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [triggerEasterEgg]);

  return (
    <footer className="relative z-20 border-t border-border">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + bio */}
          <div className="max-w-sm space-y-4">
            <p className="font-mono text-sm">
              <span className="text-primary">~/</span>
              <span className="font-medium">parham</span>
              <span className="text-muted-foreground"> — developer & biologist</span>
            </p>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              Building practical tools and writing honest notes about what I learn.
              Part portfolio, part lab notebook.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <social.icon className="h-3.5 w-3.5" />
                  {social.name}
                  {social.href.startsWith("http") && <ArrowUpRight className="h-3 w-3" />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav className="font-mono text-sm" aria-label="Footer">
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">sitemap</p>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground transition-colors hover:text-primary">
                  projects
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground transition-colors hover:text-primary">
                  blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row">
          <span>© {currentYear} Parham Forati</span>
          <div className="flex items-center gap-5">
            <span>built with love, coffee and help of AI</span>
            <button
              onClick={triggerEasterEgg}
              className="cursor-pointer opacity-40 transition-opacity hover:opacity-100"
              aria-label="Easter egg"
            >
              for the curious
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}