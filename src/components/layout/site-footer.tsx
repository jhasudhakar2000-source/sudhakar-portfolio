import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-light-text/16 bg-deep-ink" id="footer">
      <div className="page-shell flex min-h-20 items-center justify-between gap-4 pb-[env(safe-area-inset-bottom)] text-sm text-light-text/60">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a className="transition-colors hover:text-accent" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
