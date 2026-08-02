"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";

const entrance = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
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
    <section className="relative isolate overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_42%,rgba(255,255,255,0.06),transparent_45%),radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.7)_100%)]" />
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
            className="text-xs font-medium uppercase tracking-[0.18em] text-muted"
          >
            Cinematic video editor
          </motion.p>
          <motion.p
            variants={entrance}
            transition={{ duration: 0.6 }}
            className="mt-6 whitespace-nowrap font-display text-[clamp(2.5rem,11vw,6.25rem)] font-bold leading-none tracking-[-0.06em]"
          >
            Sudhakar Jha
          </motion.p>
          <motion.h1
            variants={entrance}
            transition={{ duration: 0.65 }}
            className="mt-10 whitespace-pre-line font-display text-[clamp(2.6rem,8vw,5.7rem)] font-bold leading-[0.88] tracking-[-0.055em] text-ink"
          >
            {"EDITOR.\nSTORYTELLER.\nAI FILMMAKER."}
          </motion.h1>
          <motion.p
            variants={entrance}
            transition={{ duration: 0.6 }}
            className="mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            Crafting cinematic commercials through editing, sound design & AI filmmaking.
          </motion.p>
          <motion.div
            variants={entrance}
            transition={{ duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href="#work"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white px-7 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:text-black hover:shadow-[0_0.8rem_2rem_rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white px-7 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:text-black hover:shadow-[0_0.8rem_2rem_rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start Project
            </Link>
          </motion.div>
          <motion.p
            variants={entrance}
            transition={{ duration: 0.6 }}
            className="mt-7 text-xs leading-relaxed text-muted"
          >
            <span className="mr-2 font-medium text-ink">Worked with</span>
            Lifelong <span aria-hidden="true">•</span> Universal Music{" "}
            <span aria-hidden="true">•</span> IndiaMART
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="[perspective:1200px]"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative mx-auto w-full max-w-[44rem] rounded-[1.2rem] border border-white/20 bg-[#171717] p-[3px] shadow-[0_2.5rem_5rem_rgba(0,0,0,0.7),0_0.35rem_1rem_rgba(255,255,255,0.08)_inset] sm:rounded-[1.4rem]"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-[#050505] sm:rounded-[1.2rem]">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/images/hero-placeholder.svg"
                aria-label="Placeholder showreel video"
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
              className="absolute bottom-[-1.85rem] left-1/2 h-7 w-[56%] -translate-x-1/2 rounded-[100%] bg-black/80 blur-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
