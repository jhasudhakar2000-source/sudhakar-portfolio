import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, lastModified: new Date() },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
