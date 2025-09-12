// src/app/daftar-komik/sitemap.ts

import { getAllComicsForSitemap } from "@/action/comics";
import { siteUrl } from "@/app/sitemap";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const comics = await getAllComicsForSitemap();

    if (!comics || comics.length === 0) {
      console.warn("No comics found for sitemap generation");
      return [];
    }

    const comicRoutes: MetadataRoute.Sitemap = comics.map((comic) => ({
      url: `${siteUrl}/komik${comic.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return comicRoutes;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";
