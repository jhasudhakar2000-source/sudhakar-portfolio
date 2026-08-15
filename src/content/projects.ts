import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "sogl",
    title: "SoGL",
    client: "School of Global Leadership",
    category: "Motion / Editorial Film",
    summary: "An editorial film shaped through editing, motion design and visual storytelling.",
    featured: false,
    media: {
      video: "/projects/sogl/final-video.mp4",
      thumbnail: "/projects/sogl/thumbnail.jpg",
    },
  },
  {
    slug: "lifelong",
    title: "Lifelong",
    client: "Lifelong",
    year: 2026,
    category: "Commercial Film",
    summary: "In-house campaign inspired by the viral Kumar Edit trend.",
    featured: true,
    creativeStat: "AI Frames Generated",
    roles: ["Shoot Support", "Video Editing", "AI Frame Generation", "AI Animation"],
    media: {
      video: "/projects/lifelong/final-video.mp4",
      thumbnail: "/projects/lifelong/thumbnail.jpg",
    },
    process: [
      { label: "Original Shot", image: "/images/process-placeholder.svg" },
      { label: "AI Generated Frame", image: "/images/process-placeholder.svg" },
      { label: "AI Animation", image: "/images/process-placeholder.svg" },
    ],
  },
  {
    slug: "universal-music",
    title: "Universal Music",
    client: "Universal Music",
    year: 2026,
    category: "Music Film",
    summary: "Cinematic music storytelling powered by editing rhythm and AI visuals.",
    featured: true,
    creativeStat: "Music Visual",
    roles: ["Editing", "AI Filmmaking"],
    media: {
      video: "/projects/universal-music/final-video.mp4",
      thumbnail: "/projects/universal-music/thumbnail.jpg",
    },
    process: [
      { label: "Raw Footage", image: "/images/process-placeholder.svg" },
      { label: "Edit", image: "/images/process-placeholder.svg" },
    ],
  },
  {
    slug: "indiamart-raj-shamani",
    title: "IndiaMART × Raj Shamani",
    client: "IndiaMART",
    year: 2026,
    category: "Founder Story",
    summary: "Founder content edited into a high-retention Instagram reel.",
    featured: true,
    creativeStat: "Instagram Reel",
    roles: ["Video Editing", "Storytelling"],
    media: {
      video: "/projects/indiamart-raj-shamani/final-video.mp4",
      thumbnail: "/projects/indiamart-raj-shamani/thumbnail.jpg",
    },
    process: [
      { label: "Podcast Clip", image: "/images/process-placeholder.svg" },
      { label: "Story Structure", image: "/images/process-placeholder.svg" },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
