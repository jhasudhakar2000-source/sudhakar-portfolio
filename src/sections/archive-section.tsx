"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { archiveProjects } from "@/content/archive";

type PreviewPosition = { x: number; y: number };

export function ArchiveSection() {
  const [activeProject, setActiveProject] = useState<(typeof archiveProjects)[number] | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition>({ x: 0, y: 0 });

  function movePreview(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") return;

    setPreviewPosition({
      x: Math.max(24, Math.min(event.clientX + 28, window.innerWidth - 230)),
      y: Math.max(24, Math.min(event.clientY - 190, window.innerHeight - 380)),
    });
  }

  return (
    <section
      className="border-t border-white/10 bg-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="archive-title"
    >
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Selected work
          </p>
          <h2
            id="archive-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            ARCHIVE
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-muted sm:text-xl">
            A growing collection of films, campaigns and visual stories.
          </p>
        </div>

        <div className="mt-16 border-t border-white/10 lg:mt-24">
          {archiveProjects.map((project) => {
            const isOpen = openSlug === project.slug;

            return (
              <div key={project.slug} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? null : project.slug)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActiveProject(project);
                  }}
                  onPointerMove={movePreview}
                  onPointerLeave={() => setActiveProject(null)}
                  className="group flex w-full items-center gap-4 py-7 text-left sm:gap-8 sm:py-9 lg:py-11"
                  aria-expanded={isOpen}
                  aria-controls={`archive-preview-${project.slug}`}
                >
                  <span className="min-w-0 flex-1 font-display text-[clamp(1.8rem,3.5vw,3.75rem)] font-medium leading-none tracking-[-0.045em] transition-colors duration-300 group-hover:text-muted">
                    {project.title}
                  </span>
                  <span className="hidden w-32 text-sm text-muted md:block">{project.client}</span>
                  <span className="hidden w-36 text-sm text-muted lg:block">
                    {project.category}
                  </span>
                  <span className="hidden w-12 text-right text-sm text-muted sm:block">
                    {project.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-2xl leading-none text-muted transition-colors duration-300 group-hover:text-ink"
                  >
                    →
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`archive-preview-${project.slug}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden md:hidden"
                    >
                      <div className="pb-8">
                        <div className="relative mx-auto aspect-[9/16] h-[min(62svh,36rem)] overflow-hidden rounded-[1.15rem] bg-[#121212]">
                          <video
                            className="h-full w-full object-cover"
                            muted
                            loop
                            playsInline
                            autoPlay
                            preload="metadata"
                            poster={project.thumbnail}
                            aria-label={`${project.title} preview`}
                          >
                            <source src={project.previewVideo} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ left: previewPosition.x, top: previewPosition.y }}
            className="pointer-events-none fixed z-50 hidden aspect-[9/16] h-[22rem] overflow-hidden rounded-[1rem] bg-[#121212] shadow-[0_1.5rem_4rem_rgba(0,0,0,0.5)] md:block"
            aria-hidden="true"
          >
            <video
              key={activeProject.slug}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              poster={activeProject.thumbnail}
            >
              <source src={activeProject.previewVideo} type="video/mp4" />
            </video>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
