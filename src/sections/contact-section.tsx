"use client";

import { motion } from "framer-motion";
import { contactDetails } from "@/content/contact";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-light-text/16 bg-deep-ink py-24 text-light-text sm:py-32 lg:py-40"
      aria-labelledby="contact-title"
    >
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-5xl"
        >
          <p className="eyebrow text-accent">Contact</p>
          <h2
            id="contact-title"
            className="mt-6 whitespace-pre-line font-display text-[clamp(3.1rem,14vw,3.5rem)] font-bold leading-[0.9] tracking-[-0.06em] sm:text-[clamp(3.5rem,8vw,8.25rem)]"
          >
            {"LET'S CREATE\nWORK PEOPLE\nREMEMBER."}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-14 max-w-xl sm:mt-20"
        >
          <p className="whitespace-pre-line text-base leading-relaxed text-light-text/65 sm:text-lg">
            {
              "Whether it's a commercial,\nmusic campaign,\nAI film,\nor cinematic reel—\n\nlet's build something worth watching."
            }
          </p>
          <a
            className="editorial-link mt-11 inline-flex min-h-11 items-center gap-3 border-b border-light-text pb-2 text-base font-medium transition-colors duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-0"
            href={`mailto:${contactDetails.email}`}
          >
            Start a Project <span aria-hidden="true" className="text-accent">→</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-24 flex flex-col gap-8 border-t border-light-text/16 pt-8 sm:mt-32 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="space-y-3 text-sm">
            <p className="uppercase tracking-[0.16em] text-light-text/60">Email</p>
            <a
              className="transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href={`mailto:${contactDetails.email}`}
            >
              {contactDetails.email}
            </a>
          </div>
          <div className="flex gap-7 text-sm">
            <a
              className="transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href={contactDetails.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href={contactDetails.linkedInUrl}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-12 whitespace-pre-line text-xs leading-relaxed text-light-text/60"
        >
          {"Currently accepting selected\nfreelance & brand collaborations."}
        </motion.p>
      </div>
    </section>
  );
}
