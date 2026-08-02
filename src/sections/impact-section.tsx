"use client";

import { motion } from "framer-motion";
import { impactDisciplines, impactMetrics } from "@/content/impact";

export function ImpactSection() {
  return (
    <section
      className="border-t border-white/10 bg-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="impact-title"
    >
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Selected results
          </p>
          <h2
            id="impact-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            IMPACT
          </h2>
        </motion.div>

        <div className="mt-20 grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:mt-28 lg:grid-cols-4">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="py-10 sm:px-8 sm:py-4 sm:first:pl-0 lg:px-10 lg:first:pl-0"
            >
              <p className="font-display text-[clamp(4rem,7vw,7rem)] font-bold leading-none tracking-[-0.07em]">
                {metric.value}
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-16 border-t border-white/10 pt-7 text-sm leading-relaxed text-muted sm:mt-20"
        >
          {impactDisciplines}
        </motion.p>
      </div>
    </section>
  );
}
