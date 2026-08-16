"use client";

import {
  forwardRef,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type MutableRefObject,
} from "react";

type MutedVideoProps = Omit<ComponentPropsWithoutRef<"video">, "controls" | "muted"> & {
  containerClassName?: string;
};

function setForwardedRef(ref: ForwardedRef<HTMLVideoElement>, node: HTMLVideoElement | null) {
  if (typeof ref === "function") {
    ref(node);
  } else if (ref) {
    (ref as MutableRefObject<HTMLVideoElement | null>).current = node;
  }
}

export const MutedVideo = forwardRef<HTMLVideoElement, MutedVideoProps>(function MutedVideo(
  { children, className, containerClassName = "", onVolumeChange, ...videoProps },
  forwardedRef,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      void video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
      });
    }
  }

  return (
    <div className={`relative ${containerClassName}`}>
      <video
        {...videoProps}
        ref={(node) => {
          videoRef.current = node;
          setForwardedRef(forwardedRef, node);
        }}
        className={className}
        muted={isMuted}
        onVolumeChange={(event) => {
          setIsMuted(event.currentTarget.muted || event.currentTarget.volume === 0);
          onVolumeChange?.(event);
        }}
      >
        {children}
      </video>
      <button
        type="button"
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
});
