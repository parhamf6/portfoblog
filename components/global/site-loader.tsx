"use client";

/**
 * SiteLoader
 * ------------------------------------------------------------------
 * A minimal, fast one-shot loader: a terminal prompt line with a
 * blinking block cursor, plus a thin boot-style progress bar that
 * fills up underneath. Pure CSS animation (no intervals, no grid), so
 * it mounts instantly and fades out quickly.
 * ------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) return;
    const timer = setTimeout(() => setGone(true), 350);
    return () => clearTimeout(timer);
  }, [visible]);

  if (gone) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden
    >
      <div className="flex w-56 flex-col gap-3">
        <video
          src="/logo-loading.webm"
          autoPlay
          muted
          loop
          playsInline
          className="mx-auto"
        />

        <div className="h-2 w-full overflow-hidden rounded-sm border border-border bg-muted/40">
          <div
            className="h-full bg-primary"
            style={{ animation: "loader-fill 0.8s cubic-bezier(0.22,1,0.36,1) forwards" }}
          />
        </div>
        <p className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">portfoblog@dev Loading</span>:~$
              <span className="cursor-blink ml-1 inline-block h-[1.1em] w-[0.6ch] translate-y-[0.15em] bg-primary align-baseline" />
            </p>
        <style>{`
          @keyframes loader-fill {
            from { width: 4%; }
            to { width: 96%; }
          }
        `}</style>
      </div>
    </div>
  );
}
