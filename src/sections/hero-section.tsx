"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";

const entrance = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 24, mass: 0.7 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 24, mass: 0.7 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateX.set(-vertical * 4);
    rotateY.set(horizontal * 4);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section className="relative isolate overflow-hidden bg-sage text-deep-ink">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_42%,rgba(32,35,31,0.035),transparent_45%),radial-gradient(ellipse_at_center,transparent_42%,rgba(32,35,31,0.09)_100%)]" />
      <div className="page-shell grid min-h-[calc(100svh-4rem)] items-center gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          className="max-w-2xl"
        >
          <motion.p
            variants={entrance}
            transition={{ duration: 0.5 }}
            className="eyebrow text-deep-sage"
          >
            Cinematic video editor
          </motion.p>
          <motion.p
            variants={entrance}
            transition={{ duration: 0.6 }}
            className="mt-6 whitespace-nowrap font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
          >
            Sudhakar Jha
          </motion.p>
          <motion.h1
            variants={entrance}
            transition={{ duration: 0.65 }}
            className="mt-9 whitespace-pre-line font-display text-[clamp(2.6rem,8vw,5.7rem)] font-bold leading-[0.9] tracking-[-0.052em] text-deep-ink"
          >
            {"EDITOR.\nSTORYTELLER.\nAI FILMMAKER."}
          </motion.h1>
          <motion.p
            variants={entrance}
            transition={{ duration: 0.6 }}
            className="mt-7 max-w-md text-base leading-relaxed text-muted-ink sm:text-lg"
          >
            Crafting cinematic commercials through editing, sound design & AI filmmaking.
          </motion.p>
          <motion.div
            variants={entrance}
            transition={{ duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="#work"
              className="inline-flex h-14 items-center justify-center rounded-full border border-deep-ink px-7 text-sm font-medium tracking-[0.01em] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-soft-sage hover:text-deep-ink hover:shadow-[0_0.8rem_2rem_rgb(var(--color-deep-ink)_/_0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-sage"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-14 items-center justify-center rounded-full border border-deep-ink px-7 text-sm font-medium tracking-[0.01em] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-deep-ink hover:shadow-[0_0.8rem_2rem_rgb(var(--color-accent)_/_0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-sage"
            >
              Start Project
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="[perspective:1200px]"
        >
          <div className="lg:scale-[1.16]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(12px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={shouldReduceMotion ? { y: 0 } : { y: [0, -3, 1, 0] }}
                transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetTilt}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative mx-auto w-full max-w-[44rem] rounded-[1.2rem] border border-deep-ink/28 bg-light-sage p-[3px] shadow-[0_2.5rem_5rem_rgba(32,35,31,0.3),0_0.35rem_1rem_rgba(242,239,230,0.35)_inset] sm:rounded-[1.4rem]"
              >
                <div className="relative aspect-video overflow-hidden rounded-[1rem] bg-deep-ink sm:rounded-[1.2rem]">
                  <Image
                    src="/images/hero/hero-sudhakar.png"
                    alt="Sudhakar Jha"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.17)_0%,rgba(255,255,255,0.035)_18%,transparent_42%,rgba(255,255,255,0.03)_100%)]"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -bottom-2 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-full bg-white/15 blur-[2px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-[-1.85rem] left-1/2 h-7 w-[56%] -translate-x-1/2 rounded-[100%] bg-deep-ink/80 blur-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
