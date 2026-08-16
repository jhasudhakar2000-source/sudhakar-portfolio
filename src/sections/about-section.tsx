"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useReplayOnReentry } from "@/hooks/use-replay-on-reentry";

export function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const aboutActive = useReplayOnReentry(aboutRef, shouldReduceMotion, 0.3);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="border-t border-deep-ink/16 bg-sage py-24 text-deep-ink sm:py-32 lg:py-40"
      aria-labelledby="about-title"
    >
      <div className="page-shell">
        <div className="max-w-5xl">
          <motion.p
            animate={shouldReduceMotion || aboutActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
            className="eyebrow text-deep-sage"
          >
            About
          </motion.p>
          <motion.h2
            id="about-title"
            animate={
              shouldReduceMotion || aboutActive
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.52, delay: shouldReduceMotion ? 0 : 0.05 }}
            className="mt-6 font-display text-[clamp(3rem,13vw,3.5rem)] font-bold leading-[0.9] tracking-[-0.06em] sm:text-[clamp(3.5rem,8vw,8.25rem)]"
          >
            SUDHAKAR JHA
          </motion.h2>
          <motion.p
            animate={
              shouldReduceMotion || aboutActive
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.42, delay: shouldReduceMotion ? 0 : 0.13 }}
            className="mt-7 font-display text-xl font-medium leading-[1.05] tracking-[-0.03em] sm:mt-8 sm:text-[2rem]"
          >
            Cinematic Video Editor &amp; AI Filmmaker
          </motion.p>
        </div>

        <div className="mt-12 max-w-2xl sm:mt-20">
          <motion.p
            animate={
              shouldReduceMotion || aboutActive
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.44, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="text-lg leading-relaxed text-muted-ink sm:text-xl"
          >
            Self-taught video editor and AI filmmaker, creating since 2024. I turn raw footage,
            sound and AI-led visuals into films built around rhythm, emotion and story.
          </motion.p>
          <motion.p
            animate={
              shouldReduceMotion || aboutActive
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.44, delay: shouldReduceMotion ? 0 : 0.28 }}
            className="mt-6 text-lg leading-relaxed text-muted-ink sm:text-xl"
          >
            From commercial films and product campaigns to music, founder content and AI filmmaking,
            my work is shaped by one idea — make every frame earn its place.
          </motion.p>
          <motion.a
            animate={
              shouldReduceMotion || aboutActive
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 6 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.38, delay: shouldReduceMotion ? 0 : 0.36 }}
            className="editorial-link mt-10 inline-flex min-h-11 items-center gap-3 border-b border-deep-ink pb-2 text-base font-medium transition-colors duration-300 hover:border-deep-sage/50 hover:text-deep-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-sage sm:mt-11 sm:min-h-0"
            href="#contact"
          >
            Start a Project <span aria-hidden="true" className="text-deep-sage">→</span>
          </motion.a>
        </div>

        <motion.p
          animate={
            shouldReduceMotion || aboutActive
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.14 }}
          className="mt-16 border-t border-deep-ink/16 pt-7 text-xs font-medium uppercase leading-relaxed tracking-[0.14em] text-muted-ink sm:mt-28"
        >
          45+ Brands <span aria-hidden="true">•</span> 500+ Creative Deliverables{" "}
          <span aria-hidden="true">•</span> 30+ Million-View Reels
        </motion.p>
      </div>
    </section>
  );
}
