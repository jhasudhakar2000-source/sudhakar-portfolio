"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative border-b border-deep-ink/16 bg-sage text-deep-ink">
      <div className="page-shell flex min-h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-[-0.06em]"
          aria-label={`${siteConfig.name} home`}
        >
          SJ
        </Link>
        <nav className="hidden items-center gap-7 sm:flex" aria-label="Primary navigation">
          <a className="text-sm font-medium tracking-[0.01em] text-muted-ink transition-colors hover:text-deep-sage" href="#work">
            Projects
          </a>
          <a className="text-sm font-medium tracking-[0.01em] text-muted-ink transition-colors hover:text-deep-sage" href="#services">
            Services
          </a>
          <a className="text-sm font-medium tracking-[0.01em] text-muted-ink transition-colors hover:text-deep-sage" href="#about">
            About
          </a>
        </nav>
        <a
          className="hidden h-10 items-center rounded-full border border-deep-ink/28 px-4 text-xs font-medium tracking-[0.01em] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-deep-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-sage sm:inline-flex sm:h-11 sm:px-5 sm:text-sm"
          href="#contact"
        >
          Start Project
        </a>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center text-sm font-medium tracking-[0.01em] text-muted-ink transition-colors hover:text-deep-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-sage sm:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="absolute inset-x-0 top-full z-50 border-b border-deep-ink/16 bg-sage px-[clamp(1.25rem,4vw,4rem)] py-4 sm:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col">
            <a
              className="flex min-h-11 items-center text-sm font-medium tracking-[0.01em] text-muted-ink transition-colors hover:text-deep-sage"
              href="#work"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a
              className="flex min-h-11 items-center text-sm font-medium tracking-[0.01em] text-muted-ink transition-colors hover:text-deep-sage"
              href="#about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              className="flex min-h-11 items-center text-sm font-medium tracking-[0.01em] text-muted-ink transition-colors hover:text-deep-sage"
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Project
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
