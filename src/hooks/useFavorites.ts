"use client";

import { useState, useEffect, useCallback } from "react";
import type { FavoriteComic } from "@/types";

const FAVORITES_KEY = "favoriteComics";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteComic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFavorite = useCallback(
    (href: string) => {
      const updatedFavorites = favorites.filter((fav) => fav.href !== href);
      setFavorites(updatedFavorites);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    },
    [favorites]
  );

  return { favorites, isLoading, removeFavorite };
};
