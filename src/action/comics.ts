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
} from "@/types";

export const getNewestComics = async () => {
  try {
    const data = await fetcher<ComicList>("/newest");
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
    const data = await fetcher<KomikResponse>(`/search?keyword=${query}`);
    return data.data;
  } catch (error) {
    return null;
  }
};

export const getAllComicsForSitemap = async (): Promise<
  { href: string; updatedAt: string }[]
> => {
  try {
    let allComics: { href: string; chapter: string }[] = [];
    let currentPage = 1;
    let hasMorePages = true;

    do {
      const pageComics = await getComicList(String(currentPage));
      if (pageComics && pageComics.length > 0) {
        allComics.push(...pageComics);
        currentPage++;
      } else {
        hasMorePages = false;
      }
    } while (hasMorePages);

    return allComics.map((comic) => ({
      href: comic.href,
      updatedAt: new Date().toISOString(),
    }));
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
