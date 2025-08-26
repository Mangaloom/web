"use server";

import { fetcher } from "@/lib/fetcher";

interface ComicList {
  comics: {
    title: string;
    href: string;
    thumbnail: string;
    rating: string;
    type: string;
    chapter: string;
  }[];
}

interface RecommenderResponse {
  data: {
    title: string;
    href: string;
    thumbnail: string;
    type: string;
    chapter: string;
    rating: string;
  }[];
}

interface PopularResponse {
  data: {
    title: string;
    href: string;
    thumbnail: string;
    year: string;
    genre: string;
  }[];
}

export interface Genre {
  title: string;
  href: string;
}

export interface Chapter {
  title: string;
  href: string;
  date: string;
}

export interface KomikData {
  title: string;
  altTitle: string;
  thumbnail: string;
  description: string;
  status: string;
  type: string;
  released: string;
  author: string;
  updatedOn: string;
  rating: string;
  genre: Genre[];
  chapter: Chapter[];
}

export interface KomikResponse {
  status: number;
  message: string;
  data: KomikData;
}

export interface ChapterDetail {
  data: {
    title: string;
    prev: string;
    next: string;
    panel: string[];
  };
}

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
