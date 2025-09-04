"use client";

import { Bookmark } from "lucide-react";
import { useState, useEffect } from "react";

type FavoriteComic = {
  href: string;
  title: string;
  thumbnail: string;
};

interface FavoriteButtonProps {
  comic: FavoriteComic;
}

const FAVORITES_KEY = "favoriteComics";

export const FavoriteButton = ({ comic }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const favoriteComics: FavoriteComic[] = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    );
    const comicExists = favoriteComics.some((fav) => fav.href === comic.href);
    setIsFavorite(comicExists);
  }, [comic.href]);

  const handleToggleFavorite = () => {
    const favoriteComics: FavoriteComic[] = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    );
    let updatedFavorites: FavoriteComic[];

    if (isFavorite) {
      updatedFavorites = favoriteComics.filter(
        (fav) => fav.href !== comic.href
      );
    } else {
      updatedFavorites = [...favoriteComics, comic];
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-semibold
        ${
          isFavorite
            ? "bg-yellow-500 text-white hover:bg-yellow-600"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
    >
      <Bookmark size={16} fill={isFavorite ? "currentColor" : "none"} />
      {isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
    </button>
  );
};
