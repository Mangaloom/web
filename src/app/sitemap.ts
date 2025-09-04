import { MetadataRoute } from "next";
import {
  getAllComicsForSitemap,
  getAllGenres,
  getComicsByGenre,
} from "@/action/comics";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mangaloom.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/daftar-komik`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${siteUrl}/genres`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
  const comics = await getAllComicsForSitemap();
  const comicRoutes: MetadataRoute.Sitemap = comics.map((comic) => ({
    url: `${siteUrl}/komik${comic.href}`,
    lastModified: new Date(comic.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const genres = await getAllGenres();

  const genrePagesPromises = genres.map(async (genre) => {
    const slug = genre.href.replace(/\//g, "");
    if (!slug) return [];

    const genreData = await getComicsByGenre(slug, 1);
    if (!genreData || !genreData.length_page) return [];

    const totalPages = genreData.length_page;
    const pageUrls: MetadataRoute.Sitemap = [];

    for (let i = 1; i <= totalPages; i++) {
      pageUrls.push({
        url: `${siteUrl}/genres/${slug}/${i}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.6,
      });
    }
    return pageUrls;
  });

  const genreRoutesArrays = await Promise.all(genrePagesPromises);
  const genreRoutes = genreRoutesArrays.flat();

  return [...staticRoutes, ...comicRoutes, ...genreRoutes];
}
