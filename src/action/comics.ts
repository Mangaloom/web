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
  const data = await fetcher<ComicList>("/comics/newest");
  return data.comics.slice(0, 12);
};

export const getRecommenderComics = async () => {
  const data = await fetcher<RecommenderResponse>("/recommended");

  return data.data.slice(0, 6);
};

export const getPopularComics = async () => {
  const data = await fetcher<PopularResponse>("/popular");

  return data.data;
};

export const getDetailComic = async (href: string) => {
  const cleanedHref = href.replace(/^\/|\/$/g, ""); // hapus slash di awal & akhir
  const data = await fetcher<KomikResponse>(`/detail/${cleanedHref}`);
  return data.data;
};

export const getChapterDetail = async (chapter: string) => {
  const data = await fetcher<ChapterDetail>(`/read/${chapter}`);

  return data.data;
};

export const getComicList = async (page: string) => {
  const data = await fetcher<ComicList>(`/comics/${page}`);

  return data.comics;
};

export const getSearchComics = async (query: string) => {
  const data = await fetcher<KomikResponse>(`/search?keyword=${query}`);

  return data.data;
};

export const getAllComicsForSitemap = async (): Promise<
  { href: string; updatedAt: string }[]
> => {
  let allComics: { href: string; chapter: string }[] = [];
  let currentPage = 1;
  let hasMorePages = true;

  do {
    try {
      const pageComics = await getComicList(String(currentPage));

      if (pageComics && pageComics.length > 0) {
        allComics.push(...pageComics);
        currentPage++;
      } else {
        hasMorePages = false;
      }
    } catch (error) {
      hasMorePages = false;
    }
  } while (hasMorePages);

  return allComics.map((comic) => ({
    href: comic.href,

    updatedAt: new Date().toISOString(),
  }));
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
    console.error(
      `[DEBUG] Gagal fetch getComicsByGenre untuk ${genre}/${page}:`,
      error
    );
    return null;
  }
};

export const getAllChaptersForSitemap = async (): Promise<
  { chapterHref: string; updatedAt: string }[]
> => {
  let allChapters: { chapterHref: string; updatedAt: string }[] = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const comics = await getComicList(String(currentPage));
      if (!comics || comics.length === 0) {
        hasMore = false;
        break;
      }

      for (const comic of comics) {
        try {
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
        } catch (err) {
          continue;
        }
      }

      currentPage++;
    } catch (err) {
      hasMore = false;
    }
  }

  return allChapters;
};
