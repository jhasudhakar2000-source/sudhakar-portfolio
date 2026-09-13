"use client";

import { useEffect, type ReactNode } from "react";

type AnimationProviderProps = { children: ReactNode };

/**
 * Reserved integration boundary for Lenis, GSAP ScrollTrigger, Framer Motion,
 * and React Three Fiber.
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const target = document.getElementById(decodeURIComponent(hash));
      target?.scrollIntoView({ block: "start", behavior: "auto" });
    };

    const scheduleHashScroll = () => {
      if (!window.location.hash) return;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollToHash);
      });
    };

    scheduleHashScroll();
    window.addEventListener("load", scheduleHashScroll);
    window.addEventListener("hashchange", scheduleHashScroll);
    window.addEventListener("popstate", scheduleHashScroll);

    return () => {
      window.removeEventListener("load", scheduleHashScroll);
      window.removeEventListener("hashchange", scheduleHashScroll);
      window.removeEventListener("popstate", scheduleHashScroll);
    };
  }, []);

  return children;
}
