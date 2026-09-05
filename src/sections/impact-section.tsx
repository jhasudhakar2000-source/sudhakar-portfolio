"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { impactDisciplines, impactMetrics } from "@/content/impact";
import { useReplayOnReentry } from "@/hooks/use-replay-on-reentry";

function CountUpValue({
  value,
  active,
  delay,
  shouldReduceMotion,
}: {
  value: string;
  active: boolean;
  delay: number;
  shouldReduceMotion: boolean | null;
}) {
  const target = Number.parseInt(value, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    if (!active) {
      setCount(0);
      return;
    }

    const controls = animate(0, target, {
      duration: 0.92,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCount(Math.min(target, Math.round(latest))),
    });

    return () => controls.stop();
  }, [active, delay, shouldReduceMotion, target]);

  return (
    <span className="relative inline-grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 motion-reduce:visible">
        {value.slice(0, -1)}<span className="text-accent">{value.slice(-1)}</span>
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1 motion-reduce:hidden">
        {count}<span className="text-accent">+</span>
      </span>
    </span>
  );
}

export function ImpactSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const capabilityRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const headingActive = useReplayOnReentry(headingRef, shouldReduceMotion, 0.5);
  const metricsActive = useReplayOnReentry(metricsRef, shouldReduceMotion, 0.35);
  const capabilityActive = useReplayOnReentry(capabilityRef, shouldReduceMotion, 0.6);

  return (
    <section
      className="border-t border-deep-ink/16 bg-mid-sage py-24 text-deep-ink sm:py-32 lg:py-40"
      aria-labelledby="impact-title"
    >
      <div className="page-shell">
        <motion.div
          ref={headingRef}
          animate={
            shouldReduceMotion || headingActive
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <p className="eyebrow text-deep-sage">
            Selected results
          </p>
          <h2
            id="impact-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            IMPACT
          </h2>
        </motion.div>

        <div
          ref={metricsRef}
          className="mt-20 grid grid-cols-2 lg:mt-28 lg:grid-cols-4"
        >
          {impactMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`py-8 ${
                index < 2 ? "border-b border-deep-ink/16" : ""
              } ${
                index % 2 === 0 ? "border-r border-deep-ink/16 pr-5" : "pl-5"
              } sm:px-8 sm:py-6 lg:border-b-0 lg:border-r-0 lg:px-10 lg:py-4 ${
                index > 0 ? "lg:border-l lg:border-deep-ink/16" : ""
              } ${index === 0 ? "lg:pl-0" : ""}`}
            >
              <motion.p
                animate={
                  shouldReduceMotion || metricsActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.42,
                  delay: shouldReduceMotion ? 0 : index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-label={metric.value}
                className="font-display text-[clamp(3rem,14vw,4rem)] font-bold leading-[0.9] tracking-[-0.065em] sm:text-[clamp(4rem,7vw,7rem)]"
              >
                <CountUpValue
                  value={metric.value}
                  active={metricsActive}
                  delay={index * 0.07}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.p>
              <motion.p
                animate={
                  shouldReduceMotion || metricsActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 6 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.38,
                  delay: shouldReduceMotion ? 0 : 0.2 + index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-4 text-xs font-medium uppercase leading-[1.2] tracking-[0.1em] text-muted-ink sm:mt-5 sm:leading-none sm:tracking-[0.14em]"
              >
                {metric.label}
              </motion.p>
            </div>
          ))}
        </div>

        <motion.p
          ref={capabilityRef}
          animate={
            shouldReduceMotion || capabilityActive
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.16 }}
          className="mt-16 border-t border-deep-ink/16 pt-7 text-sm leading-relaxed text-muted-ink sm:mt-20"
        >
          {impactDisciplines}
        </motion.p>
      </div>
    </section>
  );
}
