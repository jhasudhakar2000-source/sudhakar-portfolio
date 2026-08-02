"use client";

import { motion } from "framer-motion";
import { contactDetails } from "@/content/contact";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-black py-24 sm:py-32 lg:py-40"
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
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Contact</p>
          <h2
            id="contact-title"
            className="mt-6 whitespace-pre-line font-display text-[clamp(3.5rem,8vw,8.25rem)] font-bold leading-[0.86] tracking-[-0.065em]"
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
          <p className="whitespace-pre-line text-lg leading-relaxed text-muted sm:text-xl">
            {
              "Whether it's a commercial,\nmusic campaign,\nAI film,\nor cinematic reel—\n\nlet's build something worth watching."
            }
          </p>
          <a
            className="mt-11 inline-flex items-center gap-3 border-b border-white pb-2 text-base font-medium transition-colors duration-300 hover:border-white/40 hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href={`mailto:${contactDetails.email}`}
          >
            Start a Project <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-24 flex flex-col gap-8 border-t border-white/10 pt-8 sm:mt-32 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="space-y-3 text-sm">
            <p className="uppercase tracking-[0.16em] text-muted">Email</p>
            <a
              className="transition-colors hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={`mailto:${contactDetails.email}`}
            >
              {contactDetails.email}
            </a>
          </div>
          <div className="flex gap-7 text-sm">
            <a
              className="transition-colors hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={contactDetails.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="transition-colors hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
          className="mt-12 whitespace-pre-line text-xs leading-relaxed text-muted"
        >
          {"Currently accepting selected\nfreelance & brand collaborations."}
        </motion.p>
      </div>
    </section>
  );
}
