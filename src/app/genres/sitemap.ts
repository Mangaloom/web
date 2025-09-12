import { getAllGenres, getComicsByGenre } from "@/action/comics";
import { siteUrl } from "@/app/sitemap";
import { MetadataRoute } from "next";

export default async function sitemap() {
  const genres = await getAllGenres();

  const genresRoutes: MetadataRoute.Sitemap = [
    ...genres.map((genre) => ({
      url: `${siteUrl}/genres${genre.href}1`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [...genresRoutes];
}
