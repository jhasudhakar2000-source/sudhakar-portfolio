"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import type { Project } from "@/types/project";

type ProcessProject = Project & {
  media: NonNullable<Project["media"]>;
  process: NonNullable<Project["process"]>;
};

const processProjects = projects.filter(
  (project): project is ProcessProject =>
    project.featured && project.media !== undefined && project.process !== undefined,
);

function ProjectProcess({ project, index }: { project: ProcessProject; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6 }}
      className="grid min-h-[70svh] items-center gap-14 border-t border-ink/16 py-24 first:border-t-0 sm:py-32 lg:grid-cols-2 lg:gap-24 lg:py-36"
    >
      <div className={`${reversed ? "lg:order-2" : "lg:order-1"} max-w-xl`}>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">FILM 0{index + 1}</p>
        <h3 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.055em]">
          {project.title}
        </h3>
        <div className="mt-10 space-y-3">
          {project.process.map((stage, stageIndex) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: stageIndex * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md border border-ink/16 bg-elevated sm:h-20 sm:w-32">
                <Image src={stage.image} alt="" fill sizes="128px" className="object-cover" />
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{stage.label}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: project.process.length * 0.1 }}
            className="flex items-center gap-4 pt-2"
          >
            <span
              aria-hidden="true"
              className="ml-11 h-6 border-l border-ink/28 sm:ml-[3.75rem]"
            />
            <p className="text-xs uppercase tracking-[0.16em] text-ink">Final Reel</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className={`${reversed ? "lg:order-1" : "lg:order-2"} justify-self-center`}
      >
        <div className="relative aspect-[9/16] h-[min(68svh,46rem)] overflow-hidden rounded-[1.4rem] bg-elevated shadow-[0_2rem_5rem_rgba(0,0,0,0.48)] sm:h-[min(74svh,52rem)]">
          <video
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.media.thumbnail}
            aria-label={`${project.title} final reel`}
          >
            <source src={project.media.video} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.62)_100%)]" />
          <p className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.16em] text-white/75">
            Final Reel
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function BehindTheEditSection() {
  return (
    <section
      className="border-t border-ink/16 bg-canvas py-24 sm:py-32 lg:py-40"
      aria-labelledby="behind-the-edit-title"
    >
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Process</p>
          <h2
            id="behind-the-edit-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            BEHIND THE EDIT
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-muted sm:text-xl">
            Every finished film begins long before the final export.
          </p>
        </motion.div>

        <div className="mt-16 lg:mt-24">
          {processProjects.map((project, index) => (
            <ProjectProcess key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
