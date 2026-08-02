import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.seo?.title ?? project.title,
    description: project.seo?.description ?? project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <article className="page-shell py-16 sm:py-24">
      <p className="text-sm uppercase tracking-[0.16em] text-muted">
        {project.client} · {project.year}
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-7xl">{project.title}</h1>
      <p className="mt-8 max-w-2xl text-lg text-muted">{project.summary}</p>
      <div className="mt-16 border-t border-line pt-8 text-sm text-muted">
        Case study content and media are intentionally deferred to the next phase.
      </div>
    </article>
  );
}
