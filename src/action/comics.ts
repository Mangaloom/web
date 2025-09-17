// src/actions/comics.ts

"use server";

import { fetcher } from "@/lib/fetcher";
import {
  KomikResponse,
  ChapterDetail,
  ComicList,
  PopularResponse,
  RecommenderResponse,
  ComicsByGenreResponse,
  GenreListResponse,
  Genre,
  FilterParams,
  FiltersResponse,
} from "@/types";

export const getNewestComics = async () => {
  try {
    const data = await fetcher<ComicList>("/newest?page=1");
    return data.data;
  } catch (error) {
    return [];
  }
};

export const getRecommenderComics = async () => {
  try {
    const data = await fetcher<RecommenderResponse>("/recommended");
    return data.data.slice(0, 6);
  } catch (error) {
    return [];
  }
};

export const getPopularComics = async () => {
  try {
    const data = await fetcher<PopularResponse>("/popular");
    return data.data;
  } catch (error) {
    return [];
  }
};

export const getDetailComic = async (href: string) => {
  try {
    const cleanedHref = href.replace(/^\/|\/$/g, "");
    const data = await fetcher<KomikResponse>(`/detail/${cleanedHref}`);
    return data.data;
  } catch (error) {
    return null;
  }
};

export const getChapterDetail = async (chapter: string) => {
  try {
    const data = await fetcher<ChapterDetail>(`/read/${chapter}`);
    return data.data;
  } catch (error) {
    return null;
  }
};

export const getComicList = async (page: string) => {
  try {
    const data = await fetcher<ComicList>(`/comics/${page}`);
    return data.data;
  } catch (error) {
    return [];
  }
};

export const getSearchComics = async (query: string) => {
  try {
    const data = await fetcher<KomikResponse>(
      `/search?keyword=${encodeURIComponent(query)}`
    );
    return data.data;
  } catch (error) {
    return [];
  }
};

export const getAllComicsForSitemap = async (): Promise<
  { href: string; updatedAt: string }[]
> => {
  try {
    const overallStartTime = Date.now();
    let allComics: { href: string; chapter: string }[] = [];
    let currentPage = 1;
    const concurrencyLimit = 10; // Batasi concurrent requests
    let totalFetched = 0;
    let totalPages = 0;

    const fetchPage = async (page: number) => {
      const startTime = Date.now();

      try {
        const pageComics = await getComicList(String(page));
        const duration = Date.now() - startTime;

        if (pageComics && pageComics.length > 0) {
          totalFetched += pageComics.length;
          totalPages++;
          return pageComics;
        } else {
          return null;
        }
      } catch (error) {
        const duration = Date.now() - startTime;
        return null;
      }
    };

    // Fetch halaman pertama untuk mengetahui ada data atau tidak
    const firstPage = await fetchPage(currentPage);
    if (!firstPage) {
      return [];
    }

    allComics.push(...firstPage);
    currentPage++;

    while (true) {
      const pagePromises = [];
      for (let i = 0; i < concurrencyLimit; i++) {
        pagePromises.push(fetchPage(currentPage + i));
      }

      const results = await Promise.all(pagePromises);
      const validResults = results.filter((result) => result !== null);

      if (validResults.length === 0) {
        break;
      }

      validResults.forEach((comics) => allComics.push(...comics!));
      currentPage += concurrencyLimit;
    }

    const result = allComics.map((comic) => ({
      href: comic.href,
      updatedAt: new Date().toISOString(),
    }));

    const overallDuration = Date.now() - overallStartTime;
    return result;
  } catch (error) {
    return [];
  }
};

export const getAllGenres = async (): Promise<Genre[]> => {
  try {
    const response = await fetcher<GenreListResponse>("/genre");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getComicsByGenre = async (
  genre: string,
  page: number
): Promise<ComicsByGenreResponse | null> => {
  try {
    const response = await fetcher<ComicsByGenreResponse>(
      `/comic/${genre}/${page}`
    );
    return response;
  } catch (error) {
    return null;
  }
};

export const getAllChaptersForSitemap = async (): Promise<
  { chapterHref: string; updatedAt: string }[]
> => {
  try {
    let allChapters: { chapterHref: string; updatedAt: string }[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const comics = await getComicList(String(currentPage));
      if (!comics || comics.length === 0) {
        hasMore = false;
        break;
      }
      for (const comic of comics) {
        const detail = await getDetailComic(comic.href);
        if (!detail?.chapter) continue;
        for (const chapter of detail.chapter) {
          allChapters.push({
            chapterHref: chapter.href
              .replace("/chapter/", "")
              .replace(/\//g, ""),
            updatedAt: new Date().toISOString(),
          });
        }
      }
      currentPage++;
    }
    return allChapters;
  } catch (error) {
    return [];
  }
};

export const getComicsByFilters = async (params: FilterParams = {}) => {
  try {
    const page =
      Number.isFinite(params.page) && params.page! > 0 ? params.page! : 1;

    const norm = {
      status: params.status ? String(params.status).toLowerCase() : undefined,
      type: params.type ? String(params.type).toLowerCase() : undefined,
      genre: params.genre
        ? String(params.genre).toLowerCase().trim()
        : undefined,
    } as FilterParams;

    let genreSlug: string | undefined = undefined;
    if (norm.genre) {
      const genres = await getAllGenres();
      const match = genres.find((g: any) => {
        const slugFromHref =
          typeof g.href === "string" ? g.href.replace(/\//g, "") : "";
        const nameLower =
          typeof g.name === "string" ? g.name.toLowerCase().trim() : "";
        return slugFromHref === norm.genre || nameLower === norm.genre;
      });
      genreSlug = match ? String(match.href).replace(/\//g, "") : norm.genre;
    }

    const qs = new URLSearchParams();
    if (genreSlug) qs.set("genre", genreSlug);
    if (norm.status) qs.set("status", norm.status);
    if (norm.type) qs.set("type", norm.type);
    if (page !== 1) qs.set("page", String(page));

    const url = `/filters${qs.toString() ? `?${qs.toString()}` : ""}`;
    const res = await fetcher<FiltersResponse>(url);

    return {
      totalPages: res.totalPages ?? 0,
      currentPage: res.currentPage ?? page,
      nextPage: res.nextPage ?? null,
      items: res.data ?? [],
    };
  } catch (_e) {
    return {
      totalPages: 0,
      currentPage: 1,
      nextPage: null,
      items: [],
    };
  }
};
