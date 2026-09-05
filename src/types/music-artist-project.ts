export type MusicArtistProject = {
  slug: string;
  artist: string;
  title: string;
  clientOrLabel: string;
  producedVia?: string;
  projectType: string;
  roles: string[];
  year: number;
  duration: string;
  aspectRatio: "9 / 16";
  poster: string;
  previewVideo: string;
  externalUrl?: string;
  audioEnabled: boolean;
};
