"use client";

import type { ReactNode } from "react";

type AnimationProviderProps = { children: ReactNode };

/**
 * Reserved integration boundary for Lenis, GSAP ScrollTrigger, Framer Motion,
 * and React Three Fiber. This phase deliberately adds no animation behavior.
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  return children;
}
