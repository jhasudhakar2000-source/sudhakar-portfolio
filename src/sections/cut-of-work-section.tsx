"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./cut-of-work-section.module.css";

const reels = [
  { src: "/reels/reel-01.mp4", aspectRatio: "9 / 16" },
  { src: "/reels/reel-02.mp4", aspectRatio: "9 / 16" },
  { src: "/reels/reel-03.mp4", aspectRatio: "9 / 16" },
  { src: "/reels/reel-04.mp4", aspectRatio: "9 / 16" },
  { src: "/reels/reel-05.mp4", aspectRatio: "4 / 5" },
  { src: "/reels/reel-09.mp4", aspectRatio: "9 / 16" },
  { src: "/reels/reel-10.mp4", aspectRatio: "9 / 16" },
  { src: "/reels/reel-06.mp4", aspectRatio: "4 / 5" },
  { src: "/reels/reel-07.mp4", aspectRatio: "9 / 16" },
  { src: "/reels/reel-08.mp4", aspectRatio: "9 / 16" },
] as const;

type Reel = (typeof reels)[number];

function ReelVideo({
  reel,
  index,
  duplicate,
  onAudioChange,
}: {
  reel: Reel;
  index: number;
  duplicate: boolean;
  onAudioChange: (video: HTMLVideoElement, isMuted: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaybackVisibleRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldPreload, setShouldPreload] = useState(false);

  const resumePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isPlaybackVisibleRef.current) return;

    void video.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting) && (entry?.intersectionRatio ?? 0) >= 0.1;

        isPlaybackVisibleRef.current = isVisible;
        setShouldPreload(isVisible);

        if (isVisible) {
          resumePlayback();
        } else {
          video.pause();
        }
      },
      { rootMargin: "128px 96px", threshold: [0, 0.1] },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [resumePlayback]);

  function syncMuted(video: HTMLVideoElement, nextMuted: boolean) {
    setIsMuted(nextMuted);
    onAudioChange(video, nextMuted);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    syncMuted(video, nextMuted);

    if (!nextMuted) {
      void video.play().catch(() => {
        video.muted = true;
        syncMuted(video, true);
      });
    }
  }

  return (
    <div className={styles.reel} style={{ aspectRatio: reel.aspectRatio }}>
      <video
        ref={videoRef}
        className={styles.video}
        muted={isMuted}
        loop
        playsInline
        preload={shouldPreload ? "metadata" : "none"}
        aria-label={duplicate ? undefined : `Work reel ${index + 1}`}
        onCanPlay={resumePlayback}
        onVolumeChange={(event) => {
          syncMuted(
            event.currentTarget,
            event.currentTarget.muted || event.currentTarget.volume === 0,
          );
        }}
      >
        <source src={reel.src} type="video/mp4" />
      </video>
      <button
        type="button"
        tabIndex={duplicate ? -1 : undefined}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          toggleMute();
        }}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        aria-pressed={!isMuted}
        className={`absolute bottom-4 right-4 z-20 inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:size-9 ${
          isMuted
            ? "border-light-text/35 bg-deep-ink/60 text-light-text hover:bg-deep-ink/80"
            : "border-accent/60 bg-accent/15 text-accent hover:bg-accent/25"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden="true">
          <path d="M4 10v4h4l5 4V6l-5 4H4Z" strokeLinecap="round" strokeLinejoin="round" />
          {isMuted ? (
            <path d="m17 9 4 6m0-6-4 6" strokeLinecap="round" />
          ) : (
            <path d="M17 9.5a4 4 0 0 1 0 5m2.5-7.5a7.5 7.5 0 0 1 0 10" strokeLinecap="round" />
          )}
        </svg>
      </button>
    </div>
  );
}

function ReelSequence({
  duplicate = false,
  onAudioChange,
}: {
  duplicate?: boolean;
  onAudioChange: (video: HTMLVideoElement, isMuted: boolean) => void;
}) {
  return (
    <div className={styles.sequence} aria-hidden={duplicate || undefined}>
      {reels.map((reel, index) => (
        <ReelVideo
          key={`${duplicate ? "duplicate" : "primary"}-${reel.src}`}
          reel={reel}
          index={index}
          duplicate={duplicate}
          onAudioChange={onAudioChange}
        />
      ))}
    </div>
  );
}

export function CutOfWorkSection() {
  const activeAudioVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleAudioChange = useCallback((video: HTMLVideoElement, isMuted: boolean) => {
    if (isMuted) {
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

  return (
    <section className="border-t border-deep-ink/16 bg-soft-sage py-24 text-deep-ink sm:py-32 lg:py-40" aria-labelledby="cut-of-work-title">
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-deep-sage">Reel</p>
          <h2
            id="cut-of-work-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            A CUT OF THE WORK
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-ink sm:text-lg">
            Motion, AI, music, brands, and everything in between.
          </p>
        </div>
      </div>

      <div className={`mt-10 sm:mt-14 ${styles.viewport}`}>
        <div className={styles.track}>
          <ReelSequence onAudioChange={handleAudioChange} />
          <ReelSequence duplicate onAudioChange={handleAudioChange} />
        </div>
      </div>
    </section>
  );
}
