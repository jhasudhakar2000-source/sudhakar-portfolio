"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { archiveProjects } from "@/content/archive";

type PreviewPosition = { x: number; y: number };

const previewDimensions = {
  "9 / 16": { width: 198, height: 352, mobileMaxWidth: "20.25rem" },
  "16 / 9": { width: 448, height: 252, mobileMaxWidth: "36rem" },
} as const;

function ArchiveHoverPreviewVideo({
  project,
  onVideoActive,
}: {
  project: (typeof archiveProjects)[number];
  onVideoActive: (video: HTMLVideoElement) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isActive = true;
    onVideoActive(video);
    video.muted = false;

    void video.play().catch(() => {
      if (!isActive) return;

      video.muted = true;
      void video.play().catch(() => undefined);
    });

    return () => {
      isActive = false;
      video.pause();
      video.muted = true;
    };
  }, [onVideoActive, project.slug]);

  return (
    <video
      ref={videoRef}
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
  );
}

export function ArchiveSection() {
  const [activeProject, setActiveProject] = useState<(typeof archiveProjects)[number] | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition>({ x: 0, y: 0 });
  const activePreviewVideoRef = useRef<HTMLVideoElement | null>(null);

  const stopActivePreview = useCallback(() => {
    const activeVideo = activePreviewVideoRef.current;
    if (activeVideo) {
      activeVideo.pause();
      activeVideo.muted = true;
    }
    activePreviewVideoRef.current = null;
  }, []);

  const setActivePreviewVideo = useCallback((video: HTMLVideoElement) => {
    const previousVideo = activePreviewVideoRef.current;
    if (previousVideo && previousVideo !== video) {
      previousVideo.pause();
      previousVideo.muted = true;
    }

    activePreviewVideoRef.current = video;
  }, []);

  const closePreview = useCallback(() => {
    stopActivePreview();
    setActiveProject(null);
  }, [stopActivePreview]);

  useEffect(() => {
    return stopActivePreview;
  }, [stopActivePreview]);

  function movePreview(event: React.PointerEvent<HTMLButtonElement>, aspectRatio: (typeof archiveProjects)[number]["aspectRatio"]) {
    if (event.pointerType !== "mouse") return;

    const { width, height } = previewDimensions[aspectRatio];

    setPreviewPosition({
      x: Math.max(24, Math.min(event.clientX + 28, window.innerWidth - width - 24)),
      y: Math.max(24, Math.min(event.clientY - height / 2, window.innerHeight - height - 24)),
    });
  }

  return (
    <section
      className="border-t border-deep-ink/16 bg-light-sage py-24 text-deep-ink sm:py-32 lg:py-40"
      aria-labelledby="archive-title"
    >
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-deep-sage">
            Selected work
          </p>
          <h2
            id="archive-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            ARCHIVE
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-ink sm:text-lg">
            A growing collection of films, campaigns and visual stories.
          </p>
        </div>

        <div className="mt-16 border-t border-deep-ink/16 lg:mt-24">
          {archiveProjects.map((project) => {
            const isOpen = openSlug === project.slug;
            const hasPreview = project.previewVideo !== undefined;

            return (
              <div key={project.slug} className="border-b border-deep-ink/16">
                <button
                  type="button"
                  onClick={() => {
                    if (hasPreview) setOpenSlug(isOpen ? null : project.slug);
                  }}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse" && hasPreview) {
                      stopActivePreview();
                      movePreview(event, project.aspectRatio);
                      setActiveProject(project);
                    }
                  }}
                  onPointerMove={(event) => {
                    if (hasPreview) movePreview(event, project.aspectRatio);
                  }}
                  onPointerLeave={closePreview}
                  className="group flex w-full items-center gap-4 py-7 text-left sm:gap-8 sm:py-9 lg:py-11"
                  aria-expanded={hasPreview ? isOpen : undefined}
                  aria-controls={hasPreview ? `archive-preview-${project.slug}` : undefined}
                >
                  <span className="min-w-0 flex-1 font-display text-[clamp(1.8rem,3.5vw,3.75rem)] font-semibold leading-[0.92] tracking-[-0.05em] transition-colors duration-300 group-hover:text-muted-ink">
                    {project.title}
                  </span>
                  {project.client ? <span className="hidden w-32 text-xs font-medium leading-none tracking-[0.04em] text-muted-ink md:block">{project.client}</span> : null}
                  {project.category ? (
                    <span className="hidden w-36 text-xs font-medium leading-none tracking-[0.04em] text-muted-ink lg:block">{project.category}</span>
                  ) : null}
                  {project.year ? (
                    <span className="block w-10 text-right text-xs font-medium leading-none tracking-[0.04em] text-muted-ink sm:w-12">{project.year}</span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="text-2xl leading-none text-muted-ink transition-colors duration-300 group-hover:text-deep-sage"
                  >
                    →
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && project.previewVideo ? (
                    <motion.div
                      id={`archive-preview-${project.slug}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden md:hidden"
                    >
                      <div className="pb-8">
                        <div
                          className="relative mx-auto w-full overflow-hidden rounded-[1.15rem] bg-soft-sage"
                          style={{
                            aspectRatio: project.aspectRatio,
                            maxWidth: previewDimensions[project.aspectRatio].mobileMaxWidth,
                          }}
                        >
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
        {activeProject?.previewVideo ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              left: previewPosition.x,
              top: previewPosition.y,
              width: `${previewDimensions[activeProject.aspectRatio].width}px`,
              aspectRatio: activeProject.aspectRatio,
            }}
            className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-[1rem] bg-soft-sage shadow-[0_1.5rem_4rem_rgba(32,35,31,0.5)] md:block"
            aria-hidden="true"
          >
            <ArchiveHoverPreviewVideo
              key={activeProject.slug}
              project={activeProject}
              onVideoActive={setActivePreviewVideo}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
