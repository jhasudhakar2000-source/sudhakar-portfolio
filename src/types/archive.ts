export type ArchiveProject = {
  slug: string;
  title: string;
  client?: string;
  category?: string;
  year?: number;
  aspectRatio: "9 / 16" | "16 / 9";
  thumbnail?: string;
  previewVideo?: string;
};
