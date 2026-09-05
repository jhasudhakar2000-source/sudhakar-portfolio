"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clients } from "@/content/clients";
import styles from "./select-clients-section.module.css";

const topRowClients = clients.slice(0, 6);
const bottomRowClients = clients.slice(6);

type ClientEntry = (typeof clients)[number];

function ClientLogo({
  client,
  duplicate = false,
}: {
  client: ClientEntry;
  duplicate?: boolean;
}) {
  return (
    <div className={styles.logo}>
      <div className={styles.logoMedia}>
        <Image
          src={client.logo}
          alt={duplicate ? "" : client.name}
          fill
          loading={duplicate ? "lazy" : "eager"}
          sizes="(min-width: 1280px) 15vw, (min-width: 640px) 20vw, 44vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function ClientSequence({
  row,
  duplicate = false,
}: {
  row: ClientEntry[];
  duplicate?: boolean;
}) {
  return (
    <div className={styles.logoSequence} aria-hidden={duplicate || undefined}>
      {row.map((client) => (
        <ClientLogo
          key={`${duplicate ? "duplicate" : "primary"}-${client.name}`}
          client={client}
          duplicate={duplicate}
        />
      ))}
    </div>
  );
}

export function SelectClientsSection() {
  return (
    <section
      className="border-t border-deep-ink/16 bg-light-sage pb-16 pt-24 text-deep-ink sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40"
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
          <p className="eyebrow text-deep-sage">
            Collaborators
          </p>
          <h2
            id="select-clients-title"
            className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            SELECT CLIENTS
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-ink sm:text-lg">
            Selected brands, artists and companies I&apos;ve created for.
          </p>
        </motion.div>

        <div className={`mt-12 sm:mt-14 lg:mt-16 ${styles.marqueeViewport}`}>
          <div className={styles.marqueeRows}>
            <div className={`${styles.marqueeTrack} ${styles.topTrack}`}>
              <ClientSequence row={topRowClients} />
              <ClientSequence row={topRowClients} duplicate />
            </div>
            <div className={`${styles.marqueeTrack} ${styles.bottomTrack}`}>
              <ClientSequence row={bottomRowClients} />
              <ClientSequence row={bottomRowClients} duplicate />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
