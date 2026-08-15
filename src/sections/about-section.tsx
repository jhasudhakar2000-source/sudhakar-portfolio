"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-white/10 bg-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="about-title"
    >
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="max-w-5xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">About</p>
          <h2
            id="about-title"
            className="mt-6 font-display text-[clamp(3.5rem,8vw,8.25rem)] font-bold leading-[0.86] tracking-[-0.065em]"
          >
            SUDHAKAR JHA
          </h2>
          <p className="mt-8 font-display text-2xl leading-tight tracking-[-0.035em] sm:text-4xl">
            Cinematic Video Editor &amp; AI Filmmaker
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-14 max-w-2xl sm:mt-20"
        >
          <p className="text-lg leading-relaxed text-muted sm:text-xl">
            Self-taught and creating since September 2024, I shape raw footage, sound and AI-led
            visuals into films with a clear point of view.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            My work moves between commercial films, music campaigns, product films, AI filmmaking
            and storytelling—always in service of a moment people remember.
          </p>
          <a
            className="mt-11 inline-flex items-center gap-3 border-b border-white pb-2 text-base font-medium transition-colors duration-300 hover:border-white/40 hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#contact"
          >
            Start a Project <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-20 border-t border-white/10 pt-7 text-xs uppercase leading-relaxed tracking-[0.15em] text-muted sm:mt-28"
        >
          15+ Brands <span aria-hidden="true">•</span> 500+ Creative Deliverables{" "}
          <span aria-hidden="true">•</span> 30+ Million-View Reels
        </motion.p>
      </div>
    </section>
  );
}
