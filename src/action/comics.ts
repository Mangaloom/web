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
  const data = await fetcher<KomikResponse>(`/detail/${href}`);

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
      console.log(`Fetching page ${currentPage} for sitemap...`);
      const pageComics = await getComicList(String(currentPage));

      if (pageComics && pageComics.length > 0) {
        allComics.push(...pageComics);
        currentPage++;
      } else {
        hasMorePages = false;
      }
    } catch (error) {
      console.error(`Failed to fetch page ${currentPage}:`, error);
      hasMorePages = false;
    }
  } while (hasMorePages);

  console.log(`Total comics fetched for sitemap: ${allComics.length}`);

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
    console.error("Failed to fetch genres:", error);
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
    console.error(`Failed to fetch comics for genre ${genre}:`, error);
    return null;
  }
};
