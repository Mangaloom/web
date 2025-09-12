import { MetadataRoute } from "next";
import {
  getAllChaptersForSitemap,
  getAllComicsForSitemap,
  getAllGenres,
  getComicsByGenre,
  getDetailComic, // pastikan ini sudah tersedia
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
      url: `${siteUrl}/daftar-komik/1`,
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
  const genrePagesPromises = genres.map(async (genre: { href: string }) => {
    const slug = genre.href.replace(/\//g, "");
    if (!slug) return [];

    const genreData = await getComicsByGenre(slug, 1);
    if (!genreData || !genreData.totalPages) return [];

    const totalPages = genreData.totalPages;
    const pageUrls: MetadataRoute.Sitemap = [];

    for (let i = 1; i <= totalPages; i++) {
      pageUrls.push({
        url: `${siteUrl}/genres/${slug}/${i}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.6,
      });
    }

    return pageUrls;
  });

  const genreRoutesArrays = await Promise.all(genrePagesPromises);
  const genreRoutes = genreRoutesArrays.flat();

  const onePieceSlug = "/one-piece";
  const onePieceDetail = await getDetailComic(onePieceSlug);
  const onePieceChapters = onePieceDetail?.chapter.slice(0, 5);

  const onePieceSitemap: MetadataRoute.Sitemap =
    onePieceChapters?.map((chapter) => ({
      url: `${siteUrl}/baca/${chapter.href
        .replace("/chapter/", "")
        .replace(/\//g, "")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })) || [];

  return [...staticRoutes, ...comicRoutes, ...genreRoutes, ...onePieceSitemap];
}
