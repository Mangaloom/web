import { MetadataRoute } from "next";
import {
  getDetailComic, // pastikan ini sudah tersedia
} from "@/action/comics";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mangaloom.app";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    {
      url: `${siteUrl}/daftar-komik/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/genres/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

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

  return [...staticRoutes, ...onePieceSitemap];
}
