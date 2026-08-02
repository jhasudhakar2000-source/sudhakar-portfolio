"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clients } from "@/content/clients";

export function SelectClientsSection() {
  return (
    <section
      className="border-t border-white/10 bg-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="select-clients-title"
    >
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Collaborators
          </p>
          <h2
            id="select-clients-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            SELECT CLIENTS
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-muted sm:text-xl">
            Brands and creators I&apos;ve had the privilege to work with.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-16 lg:mt-28 lg:grid-cols-4 lg:gap-x-16 lg:gap-y-20 xl:grid-cols-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.56 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex min-h-16 items-center justify-center transition-opacity duration-300 hover:opacity-100"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={360}
                height={120}
                sizes="(min-width: 1280px) 13vw, (min-width: 1024px) 19vw, (min-width: 640px) 27vw, 42vw"
                className="h-auto w-full max-w-[11rem] brightness-75 grayscale transition-[filter] duration-300 hover:brightness-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
