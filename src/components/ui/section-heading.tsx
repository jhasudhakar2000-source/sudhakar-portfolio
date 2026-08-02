import type { ReactNode } from "react";

type SectionHeadingProps = { eyebrow?: string; children: ReactNode };

export function SectionHeading({ eyebrow, children }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl tracking-tight sm:text-5xl">{children}</h2>
    </div>
  );
}
