import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
};
