export interface ComicList {
  comics: {
    title: string;
    href: string;
    thumbnail: string;
    rating: string;
    type: string;
    chapter: string;
  }[];
}

export interface RecommenderResponse {
  data: {
    title: string;
    href: string;
    thumbnail: string;
    type: string;
    chapter: string;
    rating: string;
  }[];
}

export interface PopularResponse {
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

export type FavoriteComic = {
  href: string;
  title: string;
  thumbnail: string;
};

export interface Genre {
  title: string;
  href: string;
}
export interface GenreListResponse {
  status: number;
  message: string;
  data: Genre[];
}
export interface ComicByGenre {
  title: string;
  href: string;
  thumbnail: string;
  type: string;
  chapter: string;
  rating: string;
}

export interface ComicsByGenreResponse {
  current_page: number;
  data: ComicByGenre[];
  length_page: number;
  message: string;
  status: number;
}
