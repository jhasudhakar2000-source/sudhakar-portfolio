"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MutedVideo } from "@/components/ui/muted-video";
import { musicArtistProjects } from "@/content/music-artist-content";
import { useReplayOnReentry } from "@/hooks/use-replay-on-reentry";
import type { MusicArtistProject } from "@/types/music-artist-project";
import styles from "./music-artist-content-section.module.css";

type MusicProjectCardProps = {
  project: MusicArtistProject;
  supportsHover: boolean;
  shouldReduceMotion: boolean | null;
  isActivePlaybackVideo: (video: HTMLVideoElement) => boolean;
  onActivateVideo: (video: HTMLVideoElement) => void;
  onPauseVideo: (video: HTMLVideoElement) => void;
  onVideoVolumeChange: (video: HTMLVideoElement) => void;
};

function MusicProjectCard({
  project,
  supportsHover,
  shouldReduceMotion,
  isActivePlaybackVideo,
  onActivateVideo,
  onPauseVideo,
  onVideoVolumeChange,
}: MusicProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasRenderedFrame, setHasRenderedFrame] = useState(false);
  const [shouldPreload, setShouldPreload] = useState(false);

  const playIfActive = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isActivePlaybackVideo(video)) return;

    void video.play().catch(() => undefined);
  }, [isActivePlaybackVideo]);

  const activate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setShouldPreload(true);
    onActivateVideo(video);
  }, [onActivateVideo]);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    onPauseVideo(video);
  }, [onPauseVideo]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || supportsHover || shouldReduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibility = entry?.intersectionRatio ?? 0;

        if (visibility >= 0.6) {
          activate();
        } else if (visibility < 0.25) {
          pause();
        }
      },
      { threshold: [0, 0.25, 0.6] },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [activate, pause, shouldReduceMotion, supportsHover]);

  return (
    <article
      ref={cardRef}
      className={`group w-[82vw] shrink-0 snap-start sm:w-[min(48vw,23rem)] lg:w-auto ${styles.card}`}
      onPointerEnter={(event) => {
        if (!shouldReduceMotion && supportsHover && event.pointerType === "mouse") activate();
      }}
      onPointerLeave={(event) => {
        if (!shouldReduceMotion && supportsHover && event.pointerType === "mouse") pause();
      }}
    >
      <div
        className={`${styles.cardFrame} rounded-[1.1rem] ${
          shouldReduceMotion
            ? ""
            : "lg:transition-transform lg:duration-300 lg:ease-out lg:group-hover:-translate-y-1"
        }`}
        style={{ aspectRatio: project.aspectRatio }}
        onClick={activate}
      >
        <div className="relative z-[1] h-full overflow-hidden rounded-[inherit] bg-deep-ink shadow-[0_1rem_2.5rem_rgba(36,24,17,0.22)]">
          <MutedVideo
            ref={videoRef}
            containerClassName="!absolute inset-0"
            className={`absolute inset-0 h-full w-full object-cover ${
              shouldReduceMotion
                ? ""
                : "lg:transition-transform lg:duration-500 lg:ease-out lg:group-hover:scale-[1.012]"
            }`}
            loop
            playsInline
            preload={shouldPreload ? "metadata" : "none"}
            poster={project.poster}
            aria-label={`${project.artist} — ${project.title} preview`}
            onCanPlay={playIfActive}
            onLoadedData={playIfActive}
            onPlaying={() => setHasRenderedFrame(true)}
            onEmptied={() => setHasRenderedFrame(false)}
            onError={() => setHasRenderedFrame(false)}
            onVolumeChange={(event) => onVideoVolumeChange(event.currentTarget)}
          >
            <source src={project.previewVideo} type="video/mp4" />
          </MutedVideo>
          <Image
            src={project.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) min(31vw, 25rem), (min-width: 640px) min(48vw, 23rem), 82vw"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              hasRenderedFrame ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </div>

      <div className="pt-6 sm:pt-7">
        <p className="eyebrow text-accent">{project.artist}</p>
        <h3 className="mt-3 font-display text-[clamp(2rem,3vw,3.15rem)] font-bold leading-[0.94] tracking-[-0.045em] text-light-text">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-light-text/65">{project.projectType}</p>

        <p className="mt-5 border-t border-light-text/16 pt-4 text-xs leading-relaxed text-light-text/62">
          {project.clientOrLabel} <span aria-hidden="true">·</span> {project.year}
        </p>

        {project.externalUrl ? (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link mt-6 inline-flex min-h-11 items-center border-b border-light-text/55 pb-1 text-sm font-medium text-light-text transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-0"
          >
            View Reel <span className="ml-2 text-accent" aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function MusicArtistContentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const activePlaybackVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeAudioVideoRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [supportsHover, setSupportsHover] = useState(false);
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);
  const isCardRevealActive = useReplayOnReentry(projectsRef, shouldReduceMotion, 0.15, 0.05);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const updateSupportsHover = () => setSupportsHover(mediaQuery.matches);

    updateSupportsHover();
    mediaQuery.addEventListener("change", updateSupportsHover);

    return () => mediaQuery.removeEventListener("change", updateSupportsHover);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktopLayout = () => setIsDesktopLayout(mediaQuery.matches);

    updateDesktopLayout();
    mediaQuery.addEventListener("change", updateDesktopLayout);

    return () => mediaQuery.removeEventListener("change", updateDesktopLayout);
  }, []);

  const resetActiveVideo = useCallback(() => {
    const activePlaybackVideo = activePlaybackVideoRef.current;
    if (activePlaybackVideo) {
      activePlaybackVideo.pause();
      activePlaybackVideo.muted = true;
    }

    activePlaybackVideoRef.current = null;
    activeAudioVideoRef.current = null;
  }, []);

  const activateVideo = useCallback((video: HTMLVideoElement) => {
    const previousPlaybackVideo = activePlaybackVideoRef.current;

    if (previousPlaybackVideo && previousPlaybackVideo !== video) {
      previousPlaybackVideo.pause();
      previousPlaybackVideo.muted = true;
    }

    activePlaybackVideoRef.current = video;
    void video.play().catch(() => undefined);
  }, []);

  const pauseVideo = useCallback((video: HTMLVideoElement) => {
    if (activePlaybackVideoRef.current !== video) return;

    video.pause();
    activePlaybackVideoRef.current = null;
  }, []);

  const handleVideoVolumeChange = useCallback(
    (video: HTMLVideoElement) => {
      if (video.muted || video.volume === 0) {
        if (activeAudioVideoRef.current === video) {
          activeAudioVideoRef.current = null;
        }
        return;
      }

      const previousAudioVideo = activeAudioVideoRef.current;
      if (previousAudioVideo && previousAudioVideo !== video) {
        previousAudioVideo.muted = true;
      }

      activeAudioVideoRef.current = video;
      activateVideo(video);
    },
    [activateVideo],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) resetActiveVideo();
      },
      { threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [resetActiveVideo]);

  useEffect(() => resetActiveVideo, [resetActiveVideo]);

  const revealInitial = shouldReduceMotion ? false : { opacity: 0, y: 18 };
  const revealWhileInView = shouldReduceMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-light-text/16 bg-editorial-secondary py-24 text-light-text sm:py-32 lg:py-40"
      aria-labelledby="music-artist-content-title"
    >
      <motion.div
        className="page-shell"
        initial={revealInitial}
        whileInView={revealWhileInView}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Music</p>
          <h2
            id="music-artist-content-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            MUSIC &amp; ARTIST CONTENT
          </h2>
        </div>

        <div
          ref={projectsRef}
          className="mt-14 -mr-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-16 sm:-mr-8 sm:gap-8 sm:pr-8 lg:mt-20 lg:mr-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 lg:overflow-visible lg:pb-0 lg:pr-0 lg:snap-none [&::-webkit-scrollbar]:hidden"
        >
          {musicArtistProjects.map((project, index) => {
            const shouldStagger = isDesktopLayout && !shouldReduceMotion;

            return (
              <motion.div
                key={project.slug}
                className="shrink-0 snap-start lg:min-w-0"
                initial={shouldStagger ? "hidden" : false}
                animate={shouldStagger ? (isCardRevealActive ? "visible" : "hidden") : "visible"}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.62,
                  delay: index * 0.075,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MusicProjectCard
                  project={project}
                  supportsHover={supportsHover}
                  shouldReduceMotion={shouldReduceMotion}
                  isActivePlaybackVideo={(video) => activePlaybackVideoRef.current === video}
                  onActivateVideo={activateVideo}
                  onPauseVideo={pauseVideo}
                  onVideoVolumeChange={handleVideoVolumeChange}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
