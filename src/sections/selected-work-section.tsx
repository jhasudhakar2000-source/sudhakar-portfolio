"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MutedVideo } from "@/components/ui/muted-video";
import { projects } from "@/content/projects";
import type { Project } from "@/types/project";

type Film = Project & { media: NonNullable<Project["media"]> };
type FeaturedFilm = Film & { aspectRatio: string };

const featuredFilmOrder = [
  { slug: "sogl", aspectRatio: "9 / 16" },
  { slug: "universal-music", aspectRatio: "4 / 5" },
  { slug: "lifelong", aspectRatio: "9 / 16" },
  { slug: "indiamart-raj-shamani", aspectRatio: "9 / 16" },
] as const;

const featuredFilms = featuredFilmOrder.reduce<FeaturedFilm[]>((films, featuredFilm) => {
  const project = projects.find(({ slug }) => slug === featuredFilm.slug);

  if (project?.media) {
    films.push({ ...project, media: project.media, aspectRatio: featuredFilm.aspectRatio });
  }

  return films;
}, []);

function FilmCard({
  project,
  index,
  isActivePlaybackVideo,
  onPlaybackVisibilityChange,
  onVideoVolumeChange,
}: {
  project: FeaturedFilm;
  index: number;
  isActivePlaybackVideo: (video: HTMLVideoElement) => boolean;
  onPlaybackVisibilityChange: (video: HTMLVideoElement, isVisible: boolean) => void;
  onVideoVolumeChange: (video: HTMLVideoElement) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaybackVisibleRef = useRef(false);
  const [hasRenderedFrame, setHasRenderedFrame] = useState(false);

  const resumePreview = useCallback(() => {
    const preview = videoRef.current;
    if (!preview || !isPlaybackVisibleRef.current || !isActivePlaybackVideo(preview)) return;

    void preview.play().catch(() => undefined);
  }, [isActivePlaybackVideo]);

  useEffect(() => {
    const preview = videoRef.current;
    if (!preview) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isMeaningfullyVisible = (entry?.intersectionRatio ?? 0) >= 0.08;

        if (isMeaningfullyVisible) {
          isPlaybackVisibleRef.current = true;
          onPlaybackVisibilityChange(preview, true);
          resumePreview();
          return;
        }

        isPlaybackVisibleRef.current = false;
        if (!entry?.isIntersecting) {
          onPlaybackVisibilityChange(preview, false);
          preview.pause();
        }
      },
      { threshold: [0, 0.08] },
    );

    observer.observe(preview);

    return () => observer.disconnect();
  }, [onPlaybackVisibilityChange, resumePreview]);

  return (
    <article className="grid min-h-[76svh] items-center gap-8 border-t border-light-text/16 py-20 first:border-t-0 sm:min-h-[82svh] sm:gap-10 sm:py-32 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(18rem,0.5fr)] lg:gap-[clamp(3rem,10vw,12rem)] lg:py-36">
      <div className="order-2 max-w-md lg:order-1">
        <p className="eyebrow text-accent">FILM 0{index + 1}</p>
        <p className="mt-3 text-xs font-medium uppercase leading-none tracking-[0.14em] text-light-text/60 sm:mt-4">{project.category}</p>
        <h3 className="mt-4 font-display text-[clamp(3rem,5.5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.052em] sm:mt-5">
          {project.title}
        </h3>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-light-text/65 sm:mt-6 sm:text-lg">
          {project.summary}
        </p>
        <Link
          href={`/work/${project.slug}`}
          className="editorial-link mt-7 inline-flex min-h-11 items-center gap-2 border-b border-light-text pb-1 text-sm font-medium transition-colors duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:mt-9 sm:min-h-0"
          aria-label={`Watch ${project.title}`}
        >
          Watch Film <span aria-hidden="true" className="text-accent">→</span>
        </Link>
      </div>

      <div className="group relative order-1 block w-full max-w-[34rem] justify-self-center lg:order-2">
        <Link
          href={`/work/${project.slug}`}
          className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-text"
          aria-label={`Watch ${project.title}`}
        />
        <div
          className="relative w-full overflow-hidden rounded-[1.4rem] bg-deep-ink shadow-[0_2rem_5rem_rgba(32,35,31,0.48)]"
          style={{ aspectRatio: project.aspectRatio }}
        >
          <MutedVideo
            ref={videoRef}
            containerClassName="!absolute inset-0"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
            loop
            playsInline
            preload="auto"
            poster={project.media.thumbnail}
            aria-label={`${project.title} reel preview`}
            onCanPlay={resumePreview}
            onLoadedData={resumePreview}
            onPlaying={() => setHasRenderedFrame(true)}
            onEmptied={() => setHasRenderedFrame(false)}
            onError={() => setHasRenderedFrame(false)}
            onVolumeChange={(event) => onVideoVolumeChange(event.currentTarget)}
          >
            <source src={project.media.video} type="video/mp4" />
          </MutedVideo>
          <Image
            src={project.media.thumbnail}
            alt=""
            fill
            unoptimized
            loading="eager"
            sizes="(min-width: 1024px) 34rem, 100vw"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
              hasRenderedFrame ? "opacity-0" : "opacity-100"
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(32,35,31,0.08)_20%,rgba(32,35,31,0.62)_100%)]" />
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-light-text/70">
            <span>{project.category}</span>
            <span className="mr-12 text-light-text opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              Watch →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function SelectedWorkSection() {
  const activeAudioVideoRef = useRef<HTMLVideoElement | null>(null);
  const activePlaybackVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoVolumeChange = useCallback((video: HTMLVideoElement) => {
    if (video.muted || video.volume === 0) {
      if (activeAudioVideoRef.current === video) {
        activeAudioVideoRef.current = null;
      }
      return;
    }

    const previouslyActiveVideo = activeAudioVideoRef.current;
    if (previouslyActiveVideo && previouslyActiveVideo !== video) {
      previouslyActiveVideo.muted = true;
    }

    activeAudioVideoRef.current = video;
  }, []);

  const handlePlaybackVisibilityChange = useCallback((video: HTMLVideoElement, isVisible: boolean) => {
    if (!isVisible) {
      if (activePlaybackVideoRef.current === video) {
        activePlaybackVideoRef.current = null;
      }
      return;
    }

    const previouslyActiveVideo = activePlaybackVideoRef.current;
    if (previouslyActiveVideo && previouslyActiveVideo !== video) {
      previouslyActiveVideo.pause();
    }

    activePlaybackVideoRef.current = video;
  }, []);

  const isActivePlaybackVideo = useCallback(
    (video: HTMLVideoElement) => activePlaybackVideoRef.current === video,
    [],
  );

  return (
    <section
      id="work"
      className="relative z-10 border-t border-light-text/16 bg-deep-ink py-24 text-light-text sm:py-32 lg:static lg:z-auto lg:py-40"
    >
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Portfolio</p>
          <h2 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]">
            SELECTED FILMS
          </h2>
          <p className="mt-7 whitespace-pre-line text-base leading-relaxed text-light-text/65 sm:text-lg">
            {"Four stories.\nFour different creative challenges."}
          </p>
        </div>

        <div className="mt-16 lg:mt-24">
          {featuredFilms.map((project, index) => (
            <FilmCard
              key={project.slug}
              project={project}
              index={index}
              isActivePlaybackVideo={isActivePlaybackVideo}
              onPlaybackVisibilityChange={handlePlaybackVisibilityChange}
              onVideoVolumeChange={handleVideoVolumeChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
