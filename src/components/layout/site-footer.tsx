import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line" id="footer">
      <div className="page-shell flex min-h-20 items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a className="hover:text-ink" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
