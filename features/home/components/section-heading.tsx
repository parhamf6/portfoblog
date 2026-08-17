import type { ReactNode } from "react";

export function SectionHeading({
  cmd,
  title,
  right,
}: {
  cmd: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">$</span> {cmd}
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}