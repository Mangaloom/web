// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllComicsForSitemap } from "@/action/comics";
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
  ];

  const comics = await getAllComicsForSitemap();
  const comicRoutes: MetadataRoute.Sitemap = comics.map((comic) => ({
    url: `${siteUrl}/komik/${comic.href}`,
    lastModified: new Date(comic.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...comicRoutes];
}
