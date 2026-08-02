import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-black">
      <div className="page-shell flex min-h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-[-0.08em]"
          aria-label={`${siteConfig.name} home`}
        >
          SJ
        </Link>
        <nav className="hidden items-center gap-7 sm:flex" aria-label="Primary navigation">
          <a className="text-sm text-muted transition-colors hover:text-ink" href="#work">
            Projects
          </a>
          <a className="text-sm text-muted transition-colors hover:text-ink" href="#services">
            Services
          </a>
          <a className="text-sm text-muted transition-colors hover:text-ink" href="#about">
            About
          </a>
        </nav>
        <a
          className="inline-flex h-10 items-center rounded-full border border-white/75 px-4 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-11 sm:px-5 sm:text-sm"
          href="#contact"
        >
          Start Project
        </a>
      </div>
    </header>
  );
}
