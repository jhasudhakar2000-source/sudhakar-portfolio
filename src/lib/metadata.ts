import type { Metadata } from "next";
import type { Project } from "@/types/project";
import { siteConfig } from "@/lib/site";

const homepageTitle = `${siteConfig.metadataName} — ${siteConfig.title}`;
const socialImage = {
  url: "/images/og/sudhakar-jha-og.png",
  width: 1200,
  height: 630,
  alt: "Sudhakar Jha — Video Editor & AI Filmmaker",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homepageTitle,
    template: `%s — ${siteConfig.metadataName}`,
  },
  description: siteConfig.description,
  alternates: { canonical: `${siteConfig.url}/` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.metadataName,
    title: homepageTitle,
    description: siteConfig.description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: siteConfig.description,
    images: [socialImage],
  },
};

export function createProjectMetadata(project: Project): Metadata {
  const title = project.seo?.title ?? `${project.title} — ${project.category} Case Study`;
  const fullTitle = `${title} — ${siteConfig.metadataName}`;
  const description = project.seo?.description ?? project.summary;
  const canonical = `/work/${project.slug}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: siteConfig.metadataName,
      title: fullTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}
