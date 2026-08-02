export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: string;
  summary: string;
  featured: boolean;
  media?: {
    video: string;
    thumbnail: string;
  };
  creativeStat?: string;
  roles?: string[];
  process?: Array<{
    label: string;
    image: string;
  }>;
  seo?: { title: string; description: string };
};
