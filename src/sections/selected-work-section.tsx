"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/content/projects";
import type { Project } from "@/types/project";

type Film = Project & { media: NonNullable<Project["media"]> };

const featuredFilms = projects.filter(
  (project): project is Film => project.featured && project.media !== undefined,
);

function FilmCard({ project, index }: { project: Film; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preview = videoRef.current;
    if (!preview) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void preview.play().catch(() => undefined);
          return;
        }

        preview.pause();
      },
      { threshold: 0.55 },
    );

    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="grid min-h-[82svh] items-center gap-10 border-t border-white/10 py-24 first:border-t-0 sm:py-32 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(18rem,0.5fr)] lg:gap-[clamp(3rem,10vw,12rem)] lg:py-36">
      <div className="order-2 max-w-md lg:order-1">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">FILM 0{index + 1}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">{project.category}</p>
        <h3 className="mt-5 font-display text-[clamp(3rem,5.5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.055em]">
          {project.title}
        </h3>
        <p className="mt-6 max-w-sm text-base leading-relaxed text-muted sm:text-lg">
          {project.summary}
        </p>
        <Link
          href={`/work/${project.slug}`}
          className="mt-9 inline-flex items-center gap-2 border-b border-white pb-1 text-sm font-medium transition-colors duration-300 hover:border-white/40 hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-label={`Watch ${project.title}`}
        >
          Watch Film <span aria-hidden="true">→</span>
        </Link>
      </div>

      <Link
        href={`/work/${project.slug}`}
        className="group order-1 block justify-self-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:order-2"
        aria-label={`Watch ${project.title}`}
      >
        <div className="relative aspect-[9/16] h-[min(72svh,33rem)] overflow-hidden rounded-[1.4rem] bg-[#121212] shadow-[0_2rem_5rem_rgba(0,0,0,0.48)] sm:h-[min(86svh,60rem)]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.media.thumbnail}
            aria-label={`${project.title} reel preview`}
          >
            <source src={project.media.video} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_20%,rgba(0,0,0,0.62)_100%)]" />
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/70">
            <span>{project.category}</span>
            <span className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              Watch →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function SelectedWorkSection() {
  return (
    <section id="work" className="border-t border-white/10 bg-black py-24 sm:py-32 lg:py-40">
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Portfolio</p>
          <h2 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]">
            SELECTED FILMS
          </h2>
          <p className="mt-7 whitespace-pre-line text-lg leading-relaxed text-muted sm:text-xl">
            {"Three stories.\nThree different creative challenges."}
          </p>
        </div>

        <div className="mt-16 lg:mt-24">
          {featuredFilms.map((project, index) => (
            <FilmCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
