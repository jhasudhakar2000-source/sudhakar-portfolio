import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

type PlaceholderSectionProps = { id: string; title: string; children?: ReactNode };

export function PlaceholderSection({ id, title, children }: PlaceholderSectionProps) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-28">
      <div className="page-shell">
        <SectionHeading eyebrow="Portfolio">{title}</SectionHeading>
        <div className="mt-8 max-w-2xl text-muted">
          {children ?? "Section content will be developed in a later phase."}
        </div>
      </div>
    </section>
  );
}
